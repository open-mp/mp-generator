

exports.generate = async function (pageDir, mpDefinition) {

    let tpl = await fs.readFile(path.resolve(__dirname, 'tpl/index.wxss'));
    await fs.writeFile(path.resolve(pageDir, 'index.wxss'), tpl);
}
