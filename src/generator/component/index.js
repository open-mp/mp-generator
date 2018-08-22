const download = require('mvn-artifact-download');


exports.generate = async function (mpDir, mpDefinition) {

    let articfactPath = download('org.apache.commons:commons-lang3:3.4', null, 'http://alternative.repo')
}
