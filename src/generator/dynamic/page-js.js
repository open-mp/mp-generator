const template = require('lodash/template');
const fs = require('fs-extra');
const path = require('path');

exports.generate = async function (pageDir, dynamic, tabIndex) {

    let tpl = await fs.readFile(path.resolve(__dirname, 'tpl/index.js'));
    let compiled = template(tpl);

    let pageData = {
        instanceList: []
    };
    if (tabIndex > -1) {
        pageData.tabIndex = tabIndex;
    }

    let components = [];
    let bundleList = dynamic.bundleList;
    for (let i = 0; i < bundleList.length; i++) {
        let bundle = bundleList[i];
        let coordinate = bundle.coordinate;
        //  let idStr = `${coordinate.groupId}_${coordinate.artifactId}_${coordinate.version}_${i}`;
        let idStr = `${coordinate.groupId}_${coordinate.artifactId}_${i}`;
        components.push({
            name: idStr
        })
    }

    let content = compiled({
        pageData,
        components
    });
    await fs.writeFile(path.resolve(pageDir, 'index.js'), content);
    /**
     * onLoad
     * onShow
     * onReady
     * onHide
     * onUnload
     */

    /**
     * onPullDownRefresh
     * onReachBottom
     * onPageScroll
     * onShareAppMessage
     * onTabItemTap
     */

}
