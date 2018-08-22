exports.generate = async function (pageDir, mpDefinition) {
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
    let tpl = await fs.readFile(path.resolve(__dirname, 'tpl/index.js'));
    await fs.writeFile(path.resolve(pageDir, 'index.js'), tpl);
}
