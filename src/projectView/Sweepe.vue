<template>
  <div class="sweep" :style="active ? 'color:#fff' : 'color:#000'">
    <h1>{{ $route.query.name }}</h1>

    <i class="iconfont icon-zhadan info" style="color: red">{{ bombs }}</i>
    <i class="iconfont icon-qizhi info" style="color: orange">{{ marks }}</i>
    <i
      class="iconfont icon-paihang info"
      style="color: skyblue; cursor: pointer"
      @click="rank"
      >排行榜</i
    >
    <!-- <el-dialog title="排行榜" :visible.sync="rank"> rank </el-dialog> -->
    <i class="time">时间：{{ time }}</i>

    <div class="container" :key="update">
      <div class="row" v-for="(row, indexX) in data" :key="indexX">
        <span
          v-for="(item, indexY) in row"
          :style="{
            'border-color': active ? '#fff' : '#000',
            color: item.isOpen
              ? item.isBomb
                ? 'red'
                : numberColor[item.bombNumber]
              : 'transparent',
            'background-color': item.isMarked
              ? 'gray'
              : item.isOpen
              ? 'transparent'
              : 'gray',
          }"
          :key="indexY"
          @click="clickItem(item, indexX, indexY)"
          @contextmenu.prevent="rightClick(item)"
        >
          <i v-if="item.isMarked" class="iconfont icon-qizhi mark"></i>
          <i v-else-if="item.isBomb" class="iconfont icon-zhadan"></i>
          <i v-else>{{ item.bombNumber }}</i></span
        >
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "",
  data() {
    return {
      data: [],
      width: 20,
      //数字的颜色
      numberColor: [
        "transparent",
        "#d5a6bd",
        "#9fc5e8",
        "#e69138",
        "#cc4125",
        "#a61c00",
        "#3d85c6",
        "#3c78d8",
        "#45818e",
      ],
      update: 0, //用于手动更新页面
      // 总共多少炸弹
      bombs: 0,
      //标记的数量
      marks: 0,
      // 所用时间
      time: 0,
      // 全局唯一定时器
      timer: "",
  
    };
  },
  computed: {
    active() {
      return this.$store.state["tabActive"].active;
    },
  },
  mounted() {
    this.init(this.width);
    this.generateMind();
    this.updateNumbers();
  },
  methods: {
    // 生成大小为length的矩阵
    init(length) {
      this.bombs = 0;
      this.time = 0;
      this.gameOverFlag = false;
      this.data = [];
      for (var i = 0; i < length; i++) {
        var row = [];
        for (var j = 0; j < length; j++) {
          row[j] = {
            isOpen: false, //是否被点开
            isBomb: false, //是否是炸弹
            isMarked: false, //是否被标记
            // number: 0, //数字
            bombNumber: 0, //当前格子周围八格的炸弹数
          };
        }
        this.data[i] = row;
      }
      this.time = 0;
      this.timer = setInterval(() => {
        this.time++;
      }, 1000);
    },
    // 随机生成炸弹
    generateMind() {
      for (const row of this.data) {
        for (const block of row) {
          block.isBomb = Math.random() < 0.25;
          if (block.isBomb) this.bombs++;
        }
      }
      this.marks = this.bombs;
    },
    // 生成数字
    updateNumbers() {
      var offsets = [
        { x: 0, y: 1 },
        { x: 0, y: -1 },
        { x: 1, y: 0 },
        { x: 1, y: 1 },
        { x: 1, y: -1 },
        { x: -1, y: 0 },
        { x: -1, y: 1 },
        { x: -1, y: -1 },
      ];
      this.data.forEach((row, y) => {
        row.forEach((block, x) => {
          if (block.isBomb) return;
          offsets.forEach((item) => {
            const x1 = x + item.x;
            const y1 = y + item.y;
            if (x1 < 0 || x1 >= this.width || y1 < 0 || y1 >= this.width) {
              return;
            }
            if (this.data[y1][x1].isBomb) block.bombNumber += 1;
          });
        });
      });
    },
    // 生成颜色
    getItemClass(item) {
      var style = "";
      // if (!item.isOpen) {
      //   return this.active ? "border-color: #fff" : "border-color: #000";
      // }
      if (this.active) {
        if (item.isBomb) {
          style = "border-color: #fff;color:red";
        } else {
          style =
            "border-color: #fff;color:" + this.numberColor[item.bombNumber];
        }
      } else {
        if (item.isBomb) {
          style = "border-color: #000;color:red";
        } else {
          style =
            "border-color: #000;color:" + this.numberColor[item.bombNumber];
        }
      }
      // style = style + "color:" + this.numberColor[item.number];
      // console.log(item.bombNumber);
      return style;
    },
    // 翻开周围全部八格
    openAround(indexX, indexY) {
      var offsets = [
        { x: 0, y: 1 },
        { x: 0, y: -1 },
        { x: 1, y: 0 },
        { x: 1, y: 1 },
        { x: 1, y: -1 },
        { x: -1, y: 0 },
        { x: -1, y: 1 },
        { x: -1, y: -1 },
      ];
      // console.log(indexX, indexY);
      offsets.forEach((item) => {
        const x1 = item.x + indexX;
        const y1 = item.y + indexY;
        if (
          x1 < 0 ||
          x1 >= this.width ||
          y1 < 0 ||
          y1 >= this.width ||
          this.data[x1][y1].isOpen == true ||
          this.data[x1][y1].isMarked == true
        ) {
          return;
        }
        // console.log(x1, y1);
        this.data[x1][y1].isOpen = true;
        this.data[x1][y1].isMarked = false;
        if (this.data[x1][y1].bombNumber == 0) {
          this.openAround(x1, y1);
        }
      });
    },
    // 点击事件
    clickItem(item, indexX, indexY) {
      if (item.isMarked) {
        this.marks++;
      }

      // 如果点到炸弹,全部翻开
      if (item.isBomb) {
        this.data.forEach((row) => {
          row.forEach((block) => {
            block.isMarked = false;
            block.isOpen = true;
          });
        });

        clearInterval(this.timer);
        this.$messageBox.alert("又被炸死了！不愧是你啊！", "Game Over!", {
          confirmButtonText: "我不相信命运，再来一把！",
          showClose: false,
          type: "error",
          callback: () => {
            this.init(this.width);
            this.generateMind();
            this.updateNumbers();
          },
        });
      } else if (item.bombNumber == 0) {
        //如果点到空格，则打开一大片
        item.isMarked = false;
        item.isOpen = true;
        this.openAround(indexX, indexY);
      } else {
        item.isMarked = false;
        item.isOpen = true;
      }
      this.update += 1;
      this.isGameOver();
    },
    // 右键点击，标记事件
    rightClick(item) {
      // this.menuVisible = false;
      if (item.isOpen) return;
      if (this.marks > 0) {
        item.isMarked = !item.isMarked;
        this.marks = item.isMarked ? --this.marks : ++this.marks;
      } else {
        if (item.isMarked) {
          item.isMarked = !item.isMarked;
          this.marks++;
        }
      }
      this.update += 1;
    },
    // 判断是否游戏胜利
    isGameOver() {
      var num = 0;
      this.data.forEach((row) => {
        row.forEach((block) => {
          if (block.isOpen) ++num;
        });
      });
      // console.log(num, this.bombs);
      // console.log(this.width * this.width);
      if (num + this.bombs == this.width * this.width) {
        clearInterval(this.timer);
        var data = { bombs: this.bombs, time: this.time };
        // var rank = this.$store.state["sweeperRank"].rank;

        if (localStorage.getItem("rank")) {
          var rank = JSON.parse(localStorage.getItem("rank"));
          if (
            rank.bombs < data.bombs ||
            (rank.bombs == data.bombs && rank.time > data.time)
          ) {
            localStorage.setItem("rank", JSON.stringify(data));
            // this.$store.commit("sweeperRank/updateRank", data);
          }
        } else {
          localStorage.setItem("rank", JSON.stringify(data));
          // this.$store.commit("sweeperRank/updateRank", data);
        }

        this.$messageBox.alert(
          "共扫掉" + this.bombs + "颗雷,用时" + this.time + "秒!是个高手!",
          "Oh!Congratulations!",
          {
            confirmButtonText: "天选之人，再来一把！",
            showClose: false,
            type: "success",
            callback: () => {
              this.init(this.width);
              this.generateMind();
              this.updateNumbers();
            },
          }
        );
      }
    },
    //排行榜
    rank() {
      // var rankStr = this.$store.state['sweeperRank'].rank
      // console.log(rankStr);
      if (localStorage.getItem("rank")) {
        var rankStr = JSON.parse(localStorage.getItem("rank"));
        this.$messageBox.alert(
          "扫雷：" + rankStr.bombs + "颗, 用时：" + rankStr.time + "秒！",
          "最高纪录",
          {
            confirmButtonText: "知道啦知道啦，烦人！",
            showClose: false,
            type: "success",
            callback: () => {},
          }
        );
      } else {
        this.$messageBox.alert(
          "至今没人越过这座大山，你要尝试一下么，勇士？",
          "提示",
          {
            confirmButtonText: "那可不，安排！",
            showClose: false,
            type: "error",
            callback: () => {},
          }
        );
      }
      // console.log(this.$store.state['sweeperRank'].rank.bombs);
    },
  },
};
</script>

<style scoped>
.sweep {
  position: relative;
  background-color: transparent;
  width: 40%;
  text-align: center;
  margin: 40px 30% 40px;
}
h1 {
  font-size: 30px;
  margin-bottom: 40px;
}

.info {
  font-size: 16px;
  font-weight: 600;
  margin-right: 30px;
}
.time {
  margin-left: 30%;
}
.container {
  width: 600px;
  margin: 10px auto 30px;
}
.row {
  display: flex;
}
.container span {
  cursor: pointer;
  display: block;
  width: 30px;
  height: 30px;
  border: 1px solid white;
  text-align: center;
  line-height: 30px;
  margin-right: -1px;
  margin-bottom: -1px;
  position: relative;
}
.mark {
  position: absolute;
  top: 2px;
  left: 6px;
  color: orange;
}
.container span:hover {
  background-color: #e5e7eb;
  border-color: #e5e7eb;
}
p {
  font-size: 16px;
  color: #77787b;
  font-weight: 550;
  letter-spacing: 1px;
  margin-top: 45px;
}
@media screen and (max-width: 1200px) {
  .sweep {
    width: 70%;
    margin: 40px 15% 40px;
  }
}
@media screen and (max-width: 750px) {
  .sweep {
    width: 90%;
    margin: 40px 5% 40px;
  }
}
</style>
