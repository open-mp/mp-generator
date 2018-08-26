const fs = require('fs-extra');
const path = require('path');
const StructureConstant = require('../../utils/structure');
const pageJson = require('./page-json');
const pageJs = require('./page-js');
const pageWxss = require('./page-wxss');
const pageWxml = require('./page-wxml');

exports.generate = async function (mpDir, dynamic, tabIndex) {


    let pageName = `dynamic`;
    if (tabIndex > -1) {
        pageName = `${pageName}-${tabIndex}`;
    }
    // 创建页面目录
    let pageDir = path.resolve(mpDir, StructureConstant.pagesDir, pageName);
    await fs.mkdir(pageDir);
    // 1. index.json生成
    await pageJson.generate(pageDir, dynamic);
    // 2. index.js生成
    await pageJs.generate(pageDir, dynamic, tabIndex);
    // 3. index.wxml生成
    await pageWxml.generate(pageDir, dynamic);
    // 4. index.wxss生成
    await pageWxss.generate(pageDir, dynamic);

};
