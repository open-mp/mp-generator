const fs = require('fs-extra');
const jsonFile = require('../../utils/json-file');
const StructureConstant = require('../../utils/structure');

exports.generate = async function (pageDir, pageDefinition) {

    let usingComponents = {};
    let bundleList = [];
    if (pageDefinition.structure == 'static') {
        bundleList = pageDefinition.instanceList;

    } else if (pageDefinition.structure == 'dynamic') {
        bundleList = pageDefinition.bundleList;
    }
    for (let bundle of bundleList) {
        let bundleId = bundle.bundleId;
        let name = `${bundleId.groupId}_${bundleId.artifactId}_${bundleId.version}`;
        usingComponents[name] = `${StructureConstant.componentsDir}/${name}`;
    }

    let config = {
        "navigationBarBackgroundColor": pageDefinition.navigationBarBackgroundColor || "#ffffff",
        "navigationBarTextStyle": pageDefinition.navigationBarTextStyle || "black",
        "navigationBarTitleText": pageDefinition.navigationBarTitleText || "微信接口功能演示",
        "backgroundColor": pageDefinition.backgroundColor || "#eeeeee",
        "backgroundTextStyle": pageDefinition.backgroundTextStyle || "light",
        "enablePullDownRefresh": pageDefinition.enablePullDownRefresh || false,
        "onReachBottomDistance": pageDefinition.onReachBottomDistance || 50,
        "disableScroll": pageDefinition.disableScroll || false,
        usingComponents
    };

    await jsonFile.writeJSON(path.resolve(pageDir, 'index.json'), config);
}

