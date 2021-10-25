<script>
import app from "module/app";

function loadAppConfig() {
  uni.showLoading({
    mask: true,
    title: "检查配置中...",
  });
  app
    .loadConfig()
    .then((res) => {
      uni.hideLoading();
      if (!window.appJsObject) {
        uni.showModal({
          showCancel: false,
          content: "当前运行环境不是app,\n部分功能将无法使用!",
        });
      }
      if (!res.data.success) {
        uni.showModal({
          showCancel: false,
          content: "检查配置失败，请重试!",
          success: function (res) {
            if (res.confirm) {
              loadAppConfig();
            }
          },
        });
        return false;
      }

      window.codefgApp.config = res.data.data;
      var config = JSON.stringify(window.codefgApp.config.properties);
      console.info(config);
      window.appJsObject.setConfig(config);
      return true;
    })
    .catch(function (err) {
      uni.showModal({
        showCancel: false,
        content: "检查配置失败，请重试!" + err,
        success: function (res) {
          if (res.confirm) {
            loadAppConfig();
          }
        },
      });
    });
}

function checkPermissions() {
  if (!window.appJsObject.checkExternalStorePermission()) {
    uni.showModal({
      showCancel: false,
      content: "需要申请读写权限!",
      success: function (res) {
        if (res.confirm) {
          window.appJsObject.requestExternalStorePermission();
        }
      },
    });
  }
}
window.requestExternalStorePermissionSuccessful = function () {
  console.log("申请读写外部存储权限成功！");
  uni.showToast({
    title: "已申请读写sd卡文件权限",
    duration: 2000,
  });
};

export default {
  onLaunch: async function () {
    console.log("App Launch");
    window.codefgApp = window.codefgApp || {};
    window.codefgApp.config = window.codefgApp.config || {};
    loadAppConfig();
    checkPermissions();
  },
  onShow: function () {
    console.log("App Show");
  },
  onHide: function () {
    console.log("App Hide");
  },
};
</script>

<style>
/*每个页面公共css */
</style>
