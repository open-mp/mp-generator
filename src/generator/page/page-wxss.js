const fs = require('fs-extra');
const path = require('path');

exports.generate = async function (pageDir, pageDefinition) {

    let tpl = await fs.readFile(path.resolve(__dirname, 'tpl/index.wxss'));
    await fs.writeFile(path.resolve(pageDir, 'index.wxss'), tpl);
}
