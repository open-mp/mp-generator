/**
 * 调用generator生成小程序的各个部分
 */
const projectGenerator = require('./src/generator/project');
const appGenerator = require('./src/generator/app');
const pageGenerator = require('./src/generator/page');
const dynamicGenerator = require('./src/generator/dynamic');
const path = require('path');
const StructureConstant = require('./src/utils/structure');

/**
 * 生成小程序
 * @param mpDir 小程序目录
 * @param mpDefinition 小程序定义
 */
exports.generate = async function (projectDir, mpDefinition) {
    await projectGenerator.generate(projectDir, mpDefinition);
    let mpDir = path.resolve(projectDir, StructureConstant.mpDir);
    await appGenerator.generate(mpDir, mpDefinition);
    await pageGenerator.generate(mpDir, mpDefinition);

    let {dynamic, mp} = mpDefinition;
    let tabBarButtons = mp.tabBarButtons;
    await dynamicGenerator.generate(mpDir, dynamic);
    // 生成tab中的动态页 TODO  pagename-tarbar-index
    for (let i = 0; i < tabBarButtons.length; i++) {
        let tabBar = tabBarButtons[i];
        if (tabBar.pageType == 'dynamic') {
            await dynamicGenerator.generate(mpDir, dynamic, i);
        }
    }
}


process.on('unhandledRejection', (reason, p) => {
    console.log('Unhandled Rejection at:', p, 'reason:', reason);
    // application specific logging, throwing an error, or other logic here
});