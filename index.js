/**
 * 调用generator生成小程序的各个部分
 */
const projectGenerator = require('./generator/project');
const appGenerator = require('./generator/app');
const componentGenerator = require('./generator/component');
const dynamicPageGenerator = require('./generator/dynamic-page');
const staticPageGenerator = require('./generator/static-page');

/**
 * 生成小程序
 * @param mpDir 小程序目录
 * @param mpDefinition 小程序定义
 */
exports.generate = async function (mpDir, mpDefinition) {
    await projectGenerator.generate(mpDir, mpDefinition);
    await componentGenerator.generate(mpDir, mpDefinition);
    await dynamicPageGenerator.generate(mpDir, mpDefinition);
    await staticPageGenerator.generate(mpDir, mpDefinition);
    await appGenerator.generate(mpDir, mpDefinition);
}
