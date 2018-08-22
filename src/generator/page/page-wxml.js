

exports.generate = async function (pageDir, mpDefinition) {

    let tpl = await fs.readFile(path.resolve(__dirname, 'tpl/index.js'));
    await fs.writeFile(path.resolve(pageDir, 'app.js'), tpl);
}
