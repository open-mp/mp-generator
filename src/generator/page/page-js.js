const template = require('lodash/template');

exports.generate = async function (pageDir, pageDefinition) {

    let tpl = await fs.readFile(path.resolve(__dirname, 'tpl/index.js'));
    let compiled = template(tpl);

    let pageData = {
        instanceList: []
    };
    let instanceList = pageDefinition.instanceList;
    for (let i = 0; i < instanceList.length; i++) {
        let instance = instanceList[i];
        let bundleId = instance.bundleId;
        let idStr = `${bundleId.groupId}_${bundleId.artifactId}_${bundleId.version}_${i}`;
        let copyIns = JSON.parse(JSON.stringify(instance));
        delete copyIns['bundleId'];
        pageData[idStr] = copyIns;
    }
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
    let content = compiled({pageData});
    await fs.writeFile(path.resolve(pageDir, 'index.js'), content);
}
