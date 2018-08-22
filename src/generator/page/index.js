const fs = require('fs-extra');
const path = require('path');
const StructureConstant = require('../../utils/structure');
const pageJson = require('./page-json');
const pageJs = require('./page-js');
const pageWxss = require('./page-wxss');
const pageWxml = require('./page-wxml');

exports.generate = async function (mpDir, mpDefinition) {
    /**
     *
     */
    let {pageList} = mpDefinition;
    for (let page of pageList) {
        // 创建页面目录
        let pageDir = path.resolve(mpDir, StructureConstant.pagesDir, page.name);
        await fs.mkdir(pageDir);
        // 1. index.json生成
        await pageJson.generate(pageDir, page);
        // 2. index.js生成
        await pageJs.generate(pageDir, page);
        // 3. index.wxml生成
        await pageWxml.generate(pageDir, page);
        // 4. index.wxss生成
        await pageWxss.generate(pageDir, page);
    }

};
