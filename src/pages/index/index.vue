<template>
  <view class="content">
    <view>
      <text class="title">{{ title }}</text>
      <button type="default" @click="initMtpClient">初始化mtp</button>
      <button type="default" @click="showConfig">显示config</button>
    </view>
  </view>
</template>

<script>
export default {
  data() {
    return {
      title: "Hello",
    };
  },
  computed: {},
  onLoad() {},
  methods: {
    showConfig() {
      window.appJsObject.showConfig();
    },
    initMtpClient() {
      var configs = window.codefgApp.config.properties;
      if (!window.appJsObject) {
        uni.showModal({
          showCancel: false,
          content: "当前运行环境不是app,\n无法使用使用mtpClient!",
        });
      } else if (configs.mtpServerHost && configs.mtpServerPort) {
        uni.showToast({
          title: "正在初始化mtpClient:" + JSON.stringify(configs),
        });
        window.appJsObject.initMtpClient(JSON.stringify(configs));
      } else {
        uni.showModal({
          showCancel: false,
          content:
            "初始化参数异常!\n请联系管理员(ab@codefg.com)\n参数:" +
            JSON.stringify(configs),
        });
      }
    },
  },
};
</script>

<style>
.content {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}

.logo {
  height: 200rpx;
  width: 200rpx;
  margin: 200rpx auto 50rpx auto;
}

.text-area {
  display: flex;
  justify-content: center;
}

.title {
  font-size: 36rpx;
  color: #8f8f94;
}
</style>
