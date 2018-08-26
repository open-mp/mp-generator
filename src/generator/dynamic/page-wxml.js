const template = require('lodash/template');
const fs = require('fs-extra');
const path = require('path');

exports.generate = async function (pageDir, pageDefinition) {

    let content = '';

    let tpl = await fs.readFile(path.resolve(__dirname, 'tpl/index.wxml'));
    let compiled = template(tpl);
    let bundleList = pageDefinition.bundleList;
    let components = [];
    for (let bundle of bundleList) {
        let coordinate = bundle.coordinate;
        // let idStr = `${coordinate.groupId}_${coordinate.artifactId}_${coordinate.version}`;
        let idStr = `${coordinate.groupId}_${coordinate.artifactId}`;
        components.push({
            name: idStr,
        })
    }
    content = compiled({components});

    await fs.writeFile(path.resolve(pageDir, 'index.wxml'), content);
};

