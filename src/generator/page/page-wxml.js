const template = require('lodash/template');

exports.generate = async function (pageDir, pageDefinition) {

    let content = '';
    if (pageDefinition.structure == "static") {
        let tpl = await fs.readFile(path.resolve(__dirname, 'tpl/index-static.wxml'));
        let compiled = template(tpl);
        let instanceList = pageDefinition.instanceList;
        let components = [];
        for (let i = 0; i < instanceList.length; i++) {
            let instance = instanceList[i];
            let bundleId = instance.bundleId;
            let idStr = `${bundleId.groupId}_${bundleId.artifactId}_${bundleId.version}`;
            components.push({
                name: idStr,
                dataConfigKey: `${idStr}_${i}`
            })
        }
        content = compiled({components});
    } else if (pageDefinition.structure == "dynamic") {
        let tpl = await fs.readFile(path.resolve(__dirname, 'tpl/index-dynamic.wxml'));
        let compiled = template(tpl);
        let bundleList = pageDefinition.bundleList;
        let components = [];
        for (let bundle of bundleList) {
            let bundleId = bundle.bundleId;
            let idStr = `${bundleId.groupId}_${bundleId.artifactId}_${bundleId.version}`;
            components.push({
                name: idStr,
            })
        }
        content = compiled({components});
    }

    await fs.writeFile(path.resolve(pageDir, 'index.wxml'), content);
};

