<template>
  <div class="video" :style="active ? 'color:#fff' : 'color:#000'">
    <h1>{{ $route.query.title }}</h1>
    <video-player
      class="video-player vjs-custom-skin"
      ref="videoPlayer"
      :playsinline="true"
      :options="video"
    ></video-player>
  </div>
</template>

<script>
export default {
  name: "Video",
  data() {
    return {
      video: {},
    };
  },
  computed: {
    active() {
      return this.$store.state["tabActive"].active;
    },
  },
  mounted() {
    // console.log(this.$route.query);
    this.video = {
      playbackRates: [0.5, 1.0, 1.5, 2.0], // 可选的播放速度
      autoplay: true, // 如果为true,浏览器准备好时开始回放。
      muted: false, // 默认情况下将会消除任何音频。
      loop: true, // 是否视频一结束就重新开始。
      preload: "auto", // 建议浏览器在<video>加载元素后是否应该开始下载视频数据。auto浏览器选择最佳行为,立即开始加载视频（如果浏览器支持）
      language: "zh-CN",
      aspectRatio: "16:9", // 将播放器置于流畅模式，并在计算播放器的动态大小时使用该值。值应该代表一个比例 - 用冒号分隔的两个数字（例如"16:9"或"4:3"）
      fluid: true, // 当true时，Video.js player将拥有流体大小。换句话说，它将按比例缩放以适应其容器。
      sources: [
        {
          type: "video/mp4", // 类型
          src: this.$route.query.videoPath, // url地址
        },
      ],
      poster: '', // 封面地址
      notSupportedMessage: "此视频暂无法播放，请稍后再试", // 允许覆盖Video.js无法播放媒体源时显示的默认信息。
      controlBar: {
        timeDivider: true, // 当前时间和持续时间的分隔符
        durationDisplay: true, // 显示持续时间
        remainingTimeDisplay: false, // 是否显示剩余时间功能
        fullscreenToggle: true, // 是否显示全屏按钮
      },
    };
  },
  methods: {
  },
};
</script>

<style scoped>
.video {
  position: relative;
  background-color: transparent;
  width: 60%;
  text-align: left;
  margin: 40px 20% 40px;
}
h1 {
  font-size: 30px;
  margin-bottom: 40px;
}
.video-player {
  align-items: left;
  margin-bottom: 30px;
}
.vjs-custom-skin /deep/ .video-js .vjs-big-play-button {
  font-size: 3em;
  /* opacity: 0; */
  /* transition: all 0.3s; */
  border-radius: 4px;
}
p {
  font-size: 16px;
  color: #77787b;
  font-weight: 550;
  letter-spacing: 1px;
  margin-top: 45px;
}
@media screen and (max-width: 1200px) {
  .video {
    width: 80%;
    margin: 40px 10% 40px;
  }
}
@media screen and (max-width: 750px) {
  .video {
    width: 90%;
    margin: 40px 5% 40px;
  }
}
</style>
