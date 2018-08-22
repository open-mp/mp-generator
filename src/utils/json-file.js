const jsonfile = require('jsonfile')

module.exports.writeJSON = function (file, obj) {
    return new Promise((resolve, reject) => {
        jsonfile.writeFile(file, obj, {spaces: 2}, function (err) {
            if (err) {
                reject(err);
            } else {
                resolve();
            }
        })
    });
};

module.exports.readJSON = function (file, obj) {
    return new Promise((resolve, reject) => {
        jsonfile.readFile(file, function (err, obj) {
            if (err) {
                reject(err);
            } else {
                resolve(obj);
            }
        })
    });
};
