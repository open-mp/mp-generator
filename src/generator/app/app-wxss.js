const fs = require('fs-extra');
const path = require('path');

exports.generate = async function (appDir, mpDefinition) {
    let tpl = await fs.readFile(path.resolve(__dirname, 'tpl/app.wxss'));
    await fs.writeFile(path.resolve(appDir, 'app.wxss'), tpl);
}
