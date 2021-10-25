export default {

    getAppVersion: function () {
        return '1.0.20210906';
    },
    getAppCode: function () {
        return 'codefgApp';
    },
    loadConfig: async function () {
        console.log('loadConfigggggggggggggggggggggggg');
        var url = `http://api.memorycat.com/api/module/config/app/${this.getAppCode()}/${this.getAppVersion()}`;
        return new Promise((resolve, reject) => {
            uni.request({
                url: url,
                success: (res) => {
                    resolve(res);
                },
                error: (err) => {
                    reject(err);
                }
            });
        });
    }
}