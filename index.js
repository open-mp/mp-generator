/**
 * 调用generator生成小程序的各个部分
 */
console.log(require.resolve('./src/generator/project/index.js'), '---------------')
const projectGenerator = require('./src/generator/project');
const appGenerator = require('./src/generator/app');
const pageGenerator = require('./src/generator/page');

/**
 * 生成小程序
 * @param mpDir 小程序目录
 * @param mpDefinition 小程序定义
 */
exports.generate = async function (mpDir, mpDefinition) {
    await projectGenerator.generate(mpDir, mpDefinition);
    await appGenerator.generate(mpDir, mpDefinition);
    await pageGenerator.generate(mpDir, mpDefinition);
}
