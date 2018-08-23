const PageUtil = require("../../page-util/index.js")


Page({
    data: <%= JSON.stringify(pageData, null , 2) %>,
    pageUtil: null,
    onInited(event) {
        let {instance} = event.detail;
        let pageUtil = this.getPageUtil(event.detail);
        pageUtil.registerComponent(event.detail);
        instance.start({pageUtil})
    },
    getPageUtil() {
        if (!this.pageUtil) {
            this.pageUtil = new PageUtil();
        }
        return this.pageUtil;
    },
    // 页面声明周期响应函数
    onLoad() {
    },
    onReady() {
    },
    onShow() {
    },
    onHide() {
    },
    onUnload() {
    },
    onPullDownRefresh() {
        let pageUtil = this.getPageUtil();
        pageUtil.callComponentMethod("onPullDownRefresh");
    },
    onReachBottom() {
    },
    onShareAppMessage() {
    },
    onPageScroll() {
    },
    onTabItemTap() {
    },
    // end
})
