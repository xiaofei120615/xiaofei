<template>
  <div class="">
    <header
      :style="{
        'background-image': bg,
        'background-size': '6000px',
        'background-position': 'center center',
      }"
    >
      <div class="headerContent">
        <el-carousel trigger="click" @change="change">
          <el-carousel-item v-for="item in carouselImages" :key="item">
            <img class="carouselImg" :src="item" alt="" />
          </el-carousel-item>
        </el-carousel>
        <div class="download">
          <a class="downloadImage" href=""></a>
          <p class="downloadText">PC 安卓 iPhone WP iPad Mac 六大客户端</p>
        </div>
      </div>
    </header>

    <div class="container">
      <div class="left">
        <div class="hot">
          <div class="hotTitle">
            <div class="titleLeft">
              <i
                class="iconfont icon-yuanquan0"
                style="color: #c20c0c; font-size: 24px"
              ></i>
              <span style="font-size: 20px">热门推荐</span>
              <a href="">华语</a>
              <a href="">流行</a>
              <a href="">摇滚</a>
              <a href="">民谣</a>
              <a href="">电子</a>
            </div>
            <div class="titleRight">
              <span style="font-size: 12px; color: #666; margin-right: 8px"
                >更多</span
              >
              <i
                class="iconfont icon-arrowRight"
                style="color: #c20c0c; font-size: 12px"
              ></i>
            </div>
          </div>
          <div class="line"></div>
          <div class="hotContent">
            <div class="hotItem" v-for="item in hotImages" :key="item.path">
              <img :src="item.path" alt="" />
              <div class="hotItemInfo">
                  <div class="hotInfoLeft">
                      <i class="iconfont icon-erji" style="color:white;font-size:15px"></i>
                      <span style="color:white;font-size:12px;margin-left:6px">{{item.num}}</span>
                  </div>
                  <div class="hotInfoRight">
                      <i class="iconfont icon-bofang" style="color:white;font-size:22px"></i>
                  </div>
              </div>
              <p>{{ item.name }}</p>
            </div>
          </div>
        </div>
        <div class="new"></div>
        <div class="rank"></div>
      </div>
      <div class="right"></div>
    </div>
  </div>
</template>

<script>
export default {
  name: "",
  data() {
    return {
      carouselImages: [
        "http://p1.music.126.net/YyLOT3h8YAZ9Gu84jVll8w==/109951167321776720.jpg?imageView&quality=89",
        "http://p1.music.126.net/BrNBTgNbnYptH23yarprkQ==/109951167321786433.jpg?imageView&quality=89",
        "http://p1.music.126.net/KOuvEOcSaWHjMJpmmXqeVQ==/109951167321784708.jpg?imageView&quality=89",
        "http://p1.music.126.net/eOOlDEgvAqrW5HngdtCtKA==/109951167321050666.jpg?imageView&quality=89",
        "http://p1.music.126.net/X29hA_uVr9F1q1zOVnemnw==/109951167321807005.jpg?imageView&quality=89",
        "http://p1.music.126.net/auqikZ2nPrnJR-e18taceg==/109951167321828696.jpg?imageView&quality=89",
        "http://p1.music.126.net/UnAXAKgKjkoxZ7mQGKxq3Q==/109951167321837123.jpg?imageView&quality=89",
        "http://p1.music.126.net/yzXhp2UBwfXySeo56tVeQQ==/109951167321062098.jpg?imageView&quality=89",
        "http://p1.music.126.net/YbDBSq9vaffrOA2AaUmAmA==/109951167321835939.jpg?imageView&quality=89",
      ],
      bg: "url(http://p1.music.126.net/YbDBSq9vaffrOA2AaUmAmA==/109951167321835939.jpg?imageView&blur=40x20)",
      hotImages: [
        {
          path: "http://p2.music.126.net/I2sunVE3Zy0zkdt3D3CXUA==/109951165905391465.jpg?param=140y140",
          name: "永远活在自卑和负罪感中",
          num: '83万'
        },
        {
          path: "http://p2.music.126.net/MMuvCpXByLnCge62opmg9w==/109951166373207818.jpg?param=140y140",
          name: "好心情营业ing，笑迎生活点滴温暖",
          num: '45万'
        },
        {
          path: "http://p2.music.126.net/R0xGKsxTVc8kldP8fGAHrw==/109951165808821096.jpg?param=140y140",
          name: "(极嗨) ~蹦迪/开车硬曲、车载低音炮",
          num: '14万'
        },
        {
          path: "http://p1.music.126.net/LEABfDRPK7nvyXPgEx6MwA==/109951167319131137.jpg?param=140y140",
          name: "锦零归来：云归去，思念未来",
          num: '16546'
        },
        {
          path: "http://p2.music.126.net/-ShCoe12zt2C2mPQgaq0ZQ==/109951162915837220.jpg?param=140y140",
          name: "世界级古典钢琴曲经典珍藏",
          num: '364万'
        },
        {
          path: "http://p1.music.126.net/bQUbvg0wCh1R_th_YxkFcg==/109951167188623177.jpg?param=140y140",
          name: "参加前任的婚礼：走到了必须告别的时点，我们如何理清...",
          num: '7924'
        },
        {
          path: "http://p2.music.126.net/8WiQ8y6zgNcpO0IoiBVbzg==/109951166884472394.jpg?param=140y140",
          name: "短视频变装神曲【舞曲卡点 慢摇】",
          num: '38万'
        },
        {
          path: "http://p2.music.126.net/nHrv_LCS1RqB_547dtZfBA==/109951167248116566.jpg?param=140y140",
          name: "IVE - LOVE DIVE",
          num: '144万'
        },
      ],
    };
  },
  mounted() {},
  methods: {
    change(e) {
      //   console.log(e);
      this.bg =
        "url(" +
        this.carouselImages[e].substring(0, 71) +
        "?imageView&blur=40x20)";
    },
  },
};
</script>

<style scoped>
header {
  position: relative;
  width: 100%;
  height: 284px;
  display: flex;
  /* filter: blur(50px); */
  transition: all 0.3s;
}
.line {
  width: 100%;
  height: 2px;
  background-color: #c20c0c;
  margin: 8px 0;
}
.headerContent {
  margin: 0 auto;
  display: flex;
}
.carouselImg {
  width: 100%;
}
.download {
  position: relative;
}
.downloadText {
  position: absolute;
  bottom: 15px;
  left: 0;
  width: 100%;
  font-size: 12px;
  color: #8d8d8d;
  text-align: center;
}
.downloadImage {
  display: block;
  position: relative;
  width: 250px;
  height: 285px;
  overflow: hidden;
  background-image: url(https://s2.music.126.net/style/web2/img/index/download.png?97cc1446338740c5bf8ed0e5d20e2822);
}
.container {
  position: relative;
  width: 980px;
  height: 1200px;
  margin: 0 auto;
  /* background-color: pink; */
  display: flex;
}
.container .left {
  width: 730px;
  border: 1px solid #e3e3e3;
  border-right: none;
  border-top: none;
  padding: 20px;
}
.hotTitle {
  display: flex;
  align-items: center;
  justify-content: space-between;
}
.hotTitle .titleLeft span {
  margin: 0 12px 0 6px;
}
.hotTitle .titleLeft a {
  text-decoration: none;
  padding: 0 12px;
  font-size: 12px;
  color: #666;
  border-left: 2px solid #ccc;
}
.hotTitle .titleLeft a:hover {
  text-decoration: underline;
  cursor: pointer;
}
.hotTitle .titleLeft a:first-of-type {
  border: none;
}
.hotTitle .titleRight span:hover {
  cursor: pointer;
  text-decoration: underline;
}
.hotContent {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
}
.hotItem {
    margin: 12px 0 30px;
    position: relative;
}
.hotItem:hover {
    cursor: pointer;
}
.hotItemInfo {
    position: absolute;
    width: 100%;
    height: 27px;
    background-color: black;
    left: 0;
    top: 113px;
    opacity: 0.7;
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0 8px;
}
/* 多行文本溢出 */
.hotContent p {
  display: -webkit-box;
  -webkit-box-orient: vertical;
  text-overflow: ellipsis; 
  -webkit-line-clamp: 3;
  overflow: hidden;
  width: 140px;
  font-size: 14px;
  text-align: left;
  margin-top: 4px;
}
.hotContent p:hover {
    text-decoration: underline;
    cursor: pointer;
}
.container .right {
  width: 250px;
  border: 1px solid #e3e3e3;
}
.el-carousel {
  width: 730px;
  height: 285px;
  overflow: hidden;
}

</style>
