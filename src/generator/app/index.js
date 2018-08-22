const fs = require('fs-extra');
const path = require('path');
const packageResolver = require('../../package-resolver/index');
const StructureConstant = require('../../utils/structure');
const appJson = require('./app-json');
const appJs = require('./app-js');
const appWxss = require('./app-wxss');

exports.generate = async function (appDir, mpDefinition) {

    // 找出所有使用的组件,页面
    let componentIdsMap = {};

    let pageList = mpDefinition.pageList;
    for (let page of pageList) {
        pageSet.add(page.name);
        if (page.structure == "static") {
            for (let component of page.instanceList) {
                let bundleId = component.bundleId;
                let idStr = `${bundleId.groupId}_${bundleId.artifactId}_${bundleId.version}`;
                componentIdsMap[idStr] = bundleId;
            }
        } else if (page.structure == "dynamic") {
            for (let component of page.bundleList) {
                let bundleId = component.bundleId;
                let idStr = `${bundleId.groupId}_${bundleId.artifactId}_${bundleId.version}`;
                componentIdsMap[idStr] = bundleId;
            }
        }

    }
    // 复制小程序组件
    await fs.mkdir(path.resolve(appDir, StructureConstant.componentsDir));
    let idList = Object.keys(componentIdsMap);
    for (let id of idList) {
        let bundleId = componentIdsMap[id];
        let componentDir = path.resolve(appDir, StructureConstant.componentsDir, id);
        await fs.mkdir(componentDir);
        await packageResolver.copyComponent(bundleId, componentDir);
    }

    // 复制page utils
    let pageUtilsDir = page.resolve(appDir, StructureConstant.pageUtilDir);
    await fs.mkdir(pageUtilsDir);
    await packageResolver.copyPageUtil(mpDefinition.mp.config.pageUtil, pageUtilsDir);

    // app.json生成
    await appJson.generate(appDir, mpDefinition);
    // app.js生成
    await appJs.generate(appDir, mpDefinition);
    // app.wxss
    await appWxss.generate(appDir, mpDefinition);
};