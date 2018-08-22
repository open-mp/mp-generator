const PageUtil = require("../../page-util/index.js")
// 记录生命周期事件要通知的组件

Page({
    data: {
        richText:  {
            color: '#f9f9f9',
            content: '<div class="div_class" style="line-height: 60px; color: red;">Hello&nbsp;World!</div>',
            fullscreen: 0,
        },
        imageAd: {
            size: 1,
            images: ['imageurl'],
        },
        whitespace: {
            height: 200,
        }
    },
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
