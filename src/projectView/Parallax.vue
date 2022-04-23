<template>
  <div class="home">
    <div class="content-item">
      <span :style="translateX1">LET'S GO</span>
      <span :style="translateX2">OUTSIDE</span>
    </div>
    <div
      class="activebg fisrtbg"
      id="pic1"
      v-bind:style="{
        'background-position-x': positionX,
        'background-position-y': positionY1 + 'px',
      }"
    ></div>
    <div class="content-item item1">
      <span :style="translateX3">WELLCOME</span>
      <span :style="translateX4">BACK</span>
    </div>
    <!-- <div
      class="activebg secondbg"
      id="pic2"
      v-bind:style="{
        'background-position-x': positionX,
        'background-position-y': positionY2 + 'px',
      }"
    ></div>
    <div class="content-item">内容3</div>
    <div
      class="activebg thirdbg"
      id="pic3"
      v-bind:style="{
        'background-position-x': positionX,
        'background-position-y': positionY3 + 'px',
      }"
    ></div>
    <div class="content-item">内容4</div> -->
  </div>
</template>

<script>
export default {
  name: "home",
  data() {
    return {
      ratio: 0.1,
      positionX: "50%",
      positionY1: 50,
      // positionY2: 100,
      // positionY3: 150,
      Y1: 0,
      Y2: 0,
      Y3: 0,
      translateX1: "",
      translateX2: "",
      translateX3: "",
      translateX4: "",
    };
  },
  components: {},
  mounted() {
    window.addEventListener("scroll", this.handleScroll);
    window.onload = () => {
      let pic1 = document.getElementById("pic1");
      // let pic2 = document.getElementById("pic2");
      // let pic3 = document.getElementById("pic3");
      this.positionY1 = this.Y1 = pic1.offsetTop * this.ratio;
      // this.positionY2 = this.Y2 = pic2.offsetTop * this.ratio;
      // this.positionY3 = this.Y3 = pic3.offsetTop * this.ratio;
    };
  },
  methods: {
    handleScroll() {
      let scrollTop =
        window.pageYOffset ||
        document.documentElement.scrollTop ||
        document.body.scrollTop;
      // console.log(scrollTop);
      this.positionY1 = this.Y1 - scrollTop * this.ratio;
      // this.positionY2 = this.Y2 - scrollTop * this.ratio;
      // this.positionY3 = this.Y3 - scrollTop * this.ratio;
      this.translateX1 = "transform: translateX(" + scrollTop + "px);";
      this.translateX2 = "transform: translateX(-" + scrollTop + "px);";
      this.translateX3 = "transform: translateX(" + (scrollTop-500) + "px);";
      this.translateX4 = "transform: translateX(-" + (scrollTop-500) + "px);";
    },
  },
};
</script>

<style scoped>
.home {
  height: 100%;
  position: relative;
  background-color: transparent;
}
.content-item {
  background-color: transparent;
  width: 100%;
  height: 400px;
  text-align: center;
  /* font-size: 30px; */
  /* font-weight: bold; */
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}
span {
  font-size: 80px;
  font-weight: 700;
  letter-spacing: 3px;
  transition: all 0.3s;
}
.content-item span:first-child {
  transform: translateX(0);
}
.content-item span:last-child {
  transform: translateX(0);
}
.item1 span:first-child {
  transform: translateX(0);
}
.item1 span:last-child {
  transform: translateX(0);
}
.activebg {
  position: relative;
  width: 100%;
  height: 600px;
  background: #fff;
  background-attachment: fixed;
  background-position: center 0;
  background-repeat: no-repeat;
}
.fisrtbg {
  background-image: url(https://sqimg.qq.com/qq_product_operations/im/2015/update/avd.jpg);
}
.secondbg {
  background-image: url(https://res.cloudinary.com/twenty20/private_images/t_standard-fit/v1521838685/photosp/a8d34d60-a077-4c8f-8447-60b820b0759e/a8d34d60-a077-4c8f-8447-60b820b0759e.jpg);
}
.thirdbg {
  background-image: url(https://res.cloudinary.com/twenty20/private_images/t_standard-fit/v1521838685/photosp/be3df170-71fc-44df-9e78-e4517cd265a5/be3df170-71fc-44df-9e78-e4517cd265a5.jpg);
}
.foot {
  background-color: transparent;
  line-height: 500px;
}
p {
  font-size: 16px;
  color: #77787b;
  font-weight: 550;
  letter-spacing: 1px;
  margin-top: 30px;
}
</style>
