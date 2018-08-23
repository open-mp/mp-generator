const fs = require('fs-extra');
const path = require('path');
let pathMap = {
    "tsxuehu-config-1.0.0": 'config',
    "tsxuehu-image-ad-1.0.0": 'image-ad',
    "tsxuehu-richtext-1.0.0": 'richtext',
    "tsxuehu-line-1.0.0": 'line',
    "tsxuehu-whitespace-1.0.0": 'whitespace',
    "tsxuehu-goods-action-1.0.0": 'goods-action',
    "tsxuehu-goods-detail-1.0.0": 'goods-detail',
}

/**
 * 包解析
 */
class PackageResolver {
    /**
     * 返回bundle在本地的路径 ****.zip
     */
    async loadBundle(bundleId) {

    }

    async getDecompressionBundle(bundleId) {

    }

    /**
     * 将bundleId中的pageUtil复制到distDir中
     */
    async copyPageUtil(bundleId, distDir) {
        let {groupId, artifactId, version} = bundleId;
        let bundlePath = path.resolve(__dirname, '../../mp-demo');
        let bundle = await fs.readJSON(path.resolve(__dirname, 'bundle.json'));
        let pageUtilPath = path.resolve(bundlePath, bundle.pageUtil);
        await fs.copy(pageUtilPath, distDir);
    }

    /**
     * 将bundleId中的小城序组件复制到distDir中
     */
    async copyComponent(bundleId, distDir) {
        let {groupId, artifactId, version} = bundleId;
        let bundleDir = path.resovle(__dirname, '../../bundle',
            pathMap[`${groupId}-${artifactId}-${version}`]);
        let bundle = await fs.readJSON(path.resolve(bundleDir, 'bundle.json'));
        let componentPath = path.resolve(bundlePath, bundle.mpComponent);
        await fs.copy(componentPath, distDir);
    }
}


module.exports = new PackageResolver();
