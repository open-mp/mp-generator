const fs = require('fs-extra');
const jsonFile = require('../../utils/json-file');
const path = require('src/generator/project/index');
const StructureConstant = require('../../utils/structure');
/**
 * 在mpDir目录下生成小程序代码
 * 1. 工程目录结构
 * 2. project.config.json文件
 * 3. 通用工具类 PageUtil
 */

exports.generate = async function (projectDir, mpDefinition) {
    let projectConfig = {
        "client": StructureConstant.mpDir,
        "miniprogramRoot": StructureConstant.mpDir,
        "setting": {
            "newFeature": true
        },
        "appid": "wxb4c985cee82d9cc1",
        "projectname": mpDefinition.mp.name,
        "compileType": "miniprogram",
        "condition": {}
    };
    await jsonFile.writeJSON(path.resolve(projectDir, StructureConstant.projectConfigFile), projectConfig);
    await fs.mkdir(path.resolve(projectDir, StructureConstant.mpDir));
}
