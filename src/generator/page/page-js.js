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
exports.generate = async function (pageDir, mpDefinition) {

    let tpl = await fs.readFile(path.resolve(__dirname, 'tpl/app.js'));
    await fs.writeFile(path.resolve(appDir, 'app.js'), tpl);
}
