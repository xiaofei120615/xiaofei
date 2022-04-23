<template>
  <div
    class="photo"
    :style="active ? 'color:#fff' : 'color:#000'"
    id="imgTooles"
  >
    <h1>Photos</h1>
    <waterfall :col="col" :data="photos">
      <template>
        <div v-for="(item, index) in photos" :key="index" class="card">
          <img
            :lazy-src="item.path"
            alt=""
            class="image"
            :data-original="item.path"
          />
        </div>
      </template>
    </waterfall>
  </div>
</template>

<script>
import Viewer from "viewerjs";
import "viewerjs/dist/viewer.css";
var viewer = {};
export default {
  name: "Photo",
  data() {
    return {
      photos: [],
      col: 4,
      screenWidth: window.innerWidth,
    };
  },
  computed: {
    active() {
      return this.$store.state["tabActive"].active;
    },
  },
  destroyed() {},
  mounted() {
    this.$axios
      .get("getPhotos")
      .then((response) => {
        this.photos = response.data.photos;
        //将回调延迟到下次 DOM 更新循环之后执行。
        this.$nextTick(() => {
          this.initImageTools();
        });
      })
      .catch((reject) => {
        alert("Photos loaded fail");
        console.log(reject);
      });

    // 初始化列数
    this.setCol(this.screenWidth);
    window.addEventListener(
      "resize",
      () => {
        this.screenWidth = window.innerWidth;
      },
      false
    );
    window.addEventListener("scroll", this.handleScroll);
  },
  methods: {
    handleScroll() {
      //滚动事件监听处理
      //是否滚动到底部的判断
      let scrolltop =
        document.documentElement.scrollTop ||
        document.body.scrollTop ||
        window.pageYOffset;
      // Vue移动端中document.documentElement.scrollTop的值总为零，兼容写法
      // console.log('-------------------');
      // console.log(scrolltop);
      // console.log(window.innerHeight);
      // console.log(document.body.offsetHeight);
      if (scrolltop + window.innerHeight == document.body.offsetHeight) {
        // console.log("========");

        this.$axios
          .get("getPhotos")
          .then((response) => {
            this.photos = this.photos.concat(response.data.photos);
            //将回调延迟到下次 DOM 更新循环之后执行。
            this.$nextTick(() => {
              // this.initImageTools();
              viewer.update();
            });
          })
          .catch((reject) => {
            alert("Photos loaded fail");
            console.log(reject);
          });
      }
    },
    setCol(width) {
      if (width > 1920) {
        this.col = 5;
      } else if (width > 1560) {
        this.col = 4;
      } else if (width > 1200) {
        this.col = 3;
      } else if (width > 750) {
        this.col = 2;
      } else {
        this.col = 1;
      }
    },
    initImageTools() {
      //初始化 viewerjs
      viewer = new Viewer(document.getElementById("imgTooles"), {
        url: "data-original",
        button: false, //是否显示右上角关闭按钮
        navbar: false, //是否显示缩略图导航
        title: false, //是否显示图片的标题
        toolbar: true, //是否显示工具栏
        movable: false, //是否可移动
        build: function () {
          viewer.update();
        },
      });
      
    },
  },
  watch: {
    // 监听屏幕宽度
    screenWidth(val) {
      // 为了避免频繁触发resize函数导致页面卡顿，使用定时器
      if (!this.timer) {
        // 一旦监听到的screenWidth值改变，就将其重新赋给data里的screenWidth
        this.screenWidth = val;
        this.timer = true;
        // let that = this;
        setTimeout(() => {
          // 打印screenWidth变化的值
          // console.log(this.screenWidth)
          this.setCol(this.screenWidth);
          this.timer = false;
        }, 300);
      }
    },
  },
};
</script>

<style scoped>
.photo {
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
.image {
  width: calc(100% - 8px);
  margin-bottom: 4px;
  margin-left: 4px;
}
.image:hover {
  cursor: pointer;
}

p {
  font-size: 16px;
  color: #77787b;
  font-weight: 550;
  letter-spacing: 1px;
  margin-top: 45px;
}
@media screen and (max-width: 1200px) {
  .photo {
    width: 80%;
    margin: 40px 10% 40px;
  }
}
@media screen and (max-width: 750px) {
  .photo {
    width: 90%;
    margin: 40px 5% 40px;
  }
}
</style>
