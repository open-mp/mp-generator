const path = require('path');
const mpGenerator = require('../index.js');
const fs = require('fs-extra');

let def = fs.readJsonSync(path.resolve(__dirname, 'def.json')).data;
let project = path.resolve(__dirname, 'project');

fs.removeSync(project);
fs.mkdirsSync(project);

mpGenerator.generate(project, def);