const StructureConstant = require('../../utils/structure');
const fs = require('fs-extra');
const jsonFile = require('../../utils/json-file');
const path = require('path');
const download = require('download');

exports.generate = async function (appDir, mpDefinition) {
    let {mp} = mpDefinition;
    let pageSet = new Set();
    for (let page of mpDefinition.pageList) {
        pageSet.add(page.name);
    }

    // 1. pages
    let pages = [
        `${StructureConstant.pagesDir}/dynamic/index`
    ];
    for (let page of pageSet.entries()) {
        pages.push(`${StructureConstant.pagesDir}/${page[0]}/index`)
    }
    let tabBars = mp.tabBarButtons;
    for (let i = 0; i < tabBars.length; i++) {
        let tabBar = tabBars[i];
        if (tabBar.pageType == 'dynamic') {
            pages.push(`${StructureConstant.pagesDir}/dynamic-${i}/index`)
        }
    }

    // 2. tabBar
    let tabBarIconDir = path.resolve(appDir, StructureConstant.tabBarIconDir);
    await fs.mkdir(tabBarIconDir);
    let tabBarButtons = [];
    for (let i = 0; i < mpDefinition.mp.tabBarButtons.length; i++) {
        let tab = mpDefinition.mp.tabBarButtons[i];
        let iconPath = null;
        let selectedIconPath = null;
        let index = tabBarButtons.length;
        // 下载icon
        if (tab.iconUrl) {
            let name = `${index}${path.extname(tab.iconUrl)}`;
            await download(tab.iconUrl, tabBarIconDir, {
                filename: name
            });
            iconPath = `${StructureConstant.tabBarIconDir}/${name}`;
        }
        if (tab.selectedIconUrl) {
            let name = `${index}-selected${path.extname(tab.iconUrl)}`;
            await download(tab.selectedIconUrl, tabBarIconDir, {
                filename: name
            });
            selectedIconPath = `${StructureConstant.tabBarIconDir}/${name}`;
        }
        let tabDef = {};
        if (tab.pageType == "static") {
            tabDef = {
                pagePath: `${StructureConstant.pagesDir}/${tab.pageName}/index`,
                text: tab.text,
                iconPath: iconPath,
                selectedIconPath: selectedIconPath
            }
        } else if (tab.pageType == "dynamic") {
            tabDef = {
                pagePath: `${StructureConstant.pagesDir}/dynamic-${i}/index`,
                text: tab.text,
                iconPath: iconPath,
                selectedIconPath: selectedIconPath
            }
        }

        if (!iconPath) {
            delete tabDef['iconPath']
        }
        if (!selectedIconPath) {
            delete tabDef['selectedIconPath']
        }
        tabBarButtons.push(tabDef);
    }
    let tabBar = {
        color: mp.tabBar.color,
        selectedColor: mp.tabBar.selectedColor,
        backgroundColor: mp.tabBar.backgroundColor,
        borderStyle: mp.tabBar.borderStyle,
        position: mp.tabBar.position,
        list: tabBarButtons
    };

    let window = {
        "backgroundColor": "#F6F6F6",
        "backgroundTextStyle": "light",
        "navigationBarBackgroundColor": mp.window.navigationBarBackgroundColor,
        "navigationBarTitleText": mp.window.navigationBarTitleText,
        "navigationBarTextStyle": mp.window.navigationBarTextStyle,
    };
    await jsonFile.writeJSON(path.resolve(appDir, 'app.json'), {
        window,
        pages,
        tabBar,
    });
}
