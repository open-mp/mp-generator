let config = {
    "navigationBarBackgroundColor": "#ffffff",
    "navigationBarTextStyle": "black",
    "navigationBarTitleText": "微信接口功能演示",
    "backgroundColor": "#eeeeee",
    "backgroundTextStyle": "light",
    "enablePullDownRefresh": false,
    "onReachBottomDistance": 50,
    "disableScroll": false
}

exports.generate = async function (pageDir, mpDefinition) {

    let tpl = await fs.readFile(path.resolve(__dirname, 'tpl/app.js'));
    await fs.writeFile(path.resolve(appDir, 'app.js'), tpl);
}

