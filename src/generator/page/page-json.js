const fs = require('fs-extra');
const jsonFile = require('../../utils/json-file');
const StructureConstant = require('../../utils/structure');
const path = require('path');
exports.generate = async function (pageDir, pageDefinition) {

    let usingComponents = {};
    let bundleList = [];
    if (pageDefinition.structure == 'static') {
        bundleList = pageDefinition.instanceList.filter((instance, index) => {
            return index > 0;
        });

    } else if (pageDefinition.structure == 'dynamic') {
        bundleList = pageDefinition.bundleList;
    }
    for (let bundle of bundleList) {
        let coordinate = bundle.coordinate;
        // let name = `${coordinate.groupId}_${coordinate.artifactId}_${coordinate.version}`;
        let name = `${coordinate.groupId}_${coordinate.artifactId}`;
        usingComponents[name] = `/${StructureConstant.componentsDir}/${name}/index`;
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

