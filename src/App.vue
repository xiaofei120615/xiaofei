<template>
  <div
    id="app"
    :style="{
      'background-color': active ? '#000' : '#fff',
    }"
    ref="box"
    class="app"
  >
    <!-- 背景梅花树的画布 -->
    <canvas
      ref="canvas"
      id="canvas"
      width="500"
      height="500"
      :style="active ? 'background-color:#000' : 'background-color:#fff'"
    ></canvas>
    <Header> </Header>
    <transition name="slide-left" mode="out-in"> <router-view /> </transition>
    <el-backtop
      :style="{
        color: active ? 'white' : 'black',
        'background-color': active ? 'black' : 'white',
        'box-shadow': active ? '0 2px 12px 0 rgba(255, 255, 255, 0.9)' : '0 2px 12px 0 0 2px 12px 0 rgba(0, 0, 0, 0.1)',
      }"
      :visibility-height="120"
      :bottom="80"
    ></el-backtop>
    <span
      v-if="$route.path != '/home'"
      :style="{ color: active ? '#fff' : '#000' }"
      class="goBack"
      @click="goBack"
      >cd..</span
    >
    <p class="copyright">CC BY-NC-SA 4.0 2022-PRESENT © Tim Zhang</p>
  </div>
</template>

<script>
// 绘制背景梅花树的变量
var ctx;
const windowWidth = window.innerWidth;
const windowHeight = window.innerHeight;
var eventArray = [];
var frameCount = 0;
var depth = 0;
//------------------------------------

import Header from "./components/Header.vue";

export default {
  name: "App",
  components: {
    Header,
  },
  data() {
    return {};
  },
  computed: {
    active() {
      return this.$store.state["tabActive"].active;
    },
  },
  watch: {
    active: function (newVal) {
      var bgcStr = newVal ? "background-color:#000" : "background-color:#fff";
      document.querySelector("body").setAttribute("style", bgcStr);
    },
  },
  methods: {
    //回到顶部
    goTop() {
      cancelAnimationFrame(this.timer);
      const self = this;
      self.timer = requestAnimationFrame(function fn() {
        const oTop =
          document.body.scrollTop || document.documentElement.scrollTop;
        if (oTop > 0) {
          document.body.scrollTop = document.documentElement.scrollTop =
            oTop - 200; //这个200就是回到顶部的速度，越大越快
          self.timer = requestAnimationFrame(fn);
        } else {
          cancelAnimationFrame(self.timer);
        }
      });
    },
    // 初始化canvas
    init() {
      const canvas = this.$refs.canvas;
      ctx = canvas.getContext("2d");
      canvas.width = windowWidth;
      canvas.height = windowHeight;
      ctx.strokeStyle = "#a1a3a6";
      ctx.globalAlpha = 0.3;

      var randomX1 = Math.random() * (0.6 * canvas.width) + 0.2 * canvas.width;
      var randomX2 = Math.random() * (0.6 * canvas.width) + 0.2 * canvas.width;
      var randowY1 =
        Math.random() * (0.6 * canvas.height) + 0.2 * canvas.height;
      var randowY2 =
        Math.random() * (0.6 * canvas.height) + 0.2 * canvas.height;

      const line1 = {
        startPoint: { x: randomX1, y: 0 },
        length: 3,
        angle: Math.PI / 2,
      };
      const line2 = {
        startPoint: { x: randomX2, y: windowHeight },
        length: 3,
        angle: -Math.PI / 2,
      };
      const line3 = {
        startPoint: { x: 0, y: randowY1 },
        length: 3,
        angle: Math.PI * 2,
      };
      const line4 = {
        startPoint: { x: windowWidth, y: randowY2 },
        length: 3,
        angle: Math.PI,
      };
      this.step(line1, depth);
      this.step(line2, depth);
      this.step(line3, depth);
      this.step(line4, depth);
      this.startFrame();
    },

    step(line, depth) {
      let endPoint = this.getEndPoint(line);
      this.drawLine(line);
      if (depth < 5 || Math.random() < 0.5) {
        const leftLine = {
          startPoint: endPoint,
          length: line.length * (Math.random() * 0.4 + 0.8),
          angle: line.angle - 0.2 * Math.random(),
        };
        eventArray.push(() => this.step(leftLine, depth + 1));
      }
      if (depth < 5 || Math.random() < 0.5) {
        const rightLine = {
          startPoint: endPoint,
          length: line.length * (Math.random() * 0.4 + 0.8),
          angle: line.angle + 0.2 * Math.random(),
        };
        eventArray.push(() => this.step(rightLine, depth + 1));
      }
    },

    frame() {
      const tasks = [...eventArray];
      eventArray = [];
      tasks.forEach((fn) => fn());
    },
    startFrame() {
      requestAnimationFrame(() => {
        frameCount += 1;
        if (frameCount % 5 === 0) {
          this.frame();
        }

        this.startFrame();
      });
    },

    // 画一条线
    lineTo(start, end) {
      ctx.beginPath();
      ctx.moveTo(start.x, start.y);
      ctx.lineTo(end.x, end.y);
      ctx.stroke();
    },

    drawLine(line) {
      const { startPoint, length, angle } = line;
      const endPoint = {
        x: startPoint.x + length * Math.cos(angle),
        y: startPoint.y + length * Math.sin(angle),
      };
      this.lineTo(startPoint, endPoint);
    },
    // 根据线获得终点，起点，长度，角度就能得到终点
    getEndPoint(line) {
      return {
        x: line.startPoint.x + line.length * Math.cos(line.angle),
        y: line.startPoint.y + line.length * Math.sin(line.angle),
      };
    },
    goBack() {
      if (this.$route.path == "/article") {
        this.$router.push("/blogs");
      } else if (this.$route.path == "/video") {
        this.$router.push("/vlogs");
      } else if (
        this.$route.path == "/blogs" ||
        this.$route.path == "/vlogs" ||
        this.$route.path == "/photos" ||
        this.$route.path == "/projects"
      ) {
        this.$router.push("/home");
      } else {
        this.$router.push("/projects");
      }
    },
  },
  mounted() {
    this.init();
    var that = this;
    window.onresize = function windowResize() {};
    window.addEventListener(
      "resize",
      () => {
        // 通过捕获系统的onresize事件触发我们需要执行的事件
        var bgcStr = that.$store.state["tabActive"].active
          ? "background-color:#000"
          : "background-color:#fff";
        document.querySelector("body").setAttribute("style", bgcStr);
      },
      false
    );
  },
};
</script>

<style>
* {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
  font-family: Arial;
}
/* 隐藏滚动条 */
::-webkit-scrollbar {
  display: none; /* Chrome Safari */
}
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  background-color: #000;
  /* 隐藏滚动条 */
  scrollbar-width: none; /* firefox */
  -ms-overflow-style: none; /* IE 10+ */
  overflow-x: hidden;
  overflow-y: auto;
  padding-bottom: 30px;
}
* {
  -webkit-touch-callout: none; /*系统默认菜单被禁用*/
  -webkit-user-select: none; /*webkit浏览器*/
  -khtml-user-select: none; /*早期浏览器*/
  -moz-user-select: none; /*火狐*/
  -ms-user-select: none; /*IE10*/
  user-select: none;
}

#canvas {
  position: fixed;
  left: 0;
  top: 0;
  background-color: #000;
  z-index: 0;
}
.up {
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background-color: transparent;
  position: fixed;
  right: 30px;
  bottom: 180px;
  color: #77787b;
  border: 2px solid #77787b;
  display: none;
}
.up:hover {
  cursor: pointer;
  color: #e5e7eb;
  border: 3px solid #e5e7eb;
}

.slide-left-enter {
  opacity: 0;
  -webkit-transform: translate(30px, 0);
  transform: translate(30px, 0);
}
.slide-left-enter-active {
  transition: all 0.3s ease;
}
.slide-left-leave-to {
  opacity: 0;
  -webkit-transform: translate(-30px, 0);
  transform: translate(-30px, 0);
}
.slide-left-leave-active {
  transition: all 0.3s ease;
}
.copyright {
  font-size: 16px;
  color: #77787b;
  font-weight: 550;
  letter-spacing: 1px;
  margin-top: 35px;
  position: relative;
}
.goBack {
  cursor: pointer;
  opacity: 0.6;
  position: relative;
}
.goBack:hover {
  text-decoration: underline;
  opacity: 1;
}
</style>
