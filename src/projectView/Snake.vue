<template>
  <div class="snake" :style="active ? 'color:#fff' : 'color:#000'">
    <h1>{{ $route.query.name }}</h1>
    <p class="length">length：{{ length }}</p>
    <div class="container" :key="update">
      <div class="row" v-for="(row, indexX) in data" :key="indexX">
        <span
          v-for="(block, indexY) in row"
          :key="indexY"
          :style="{
            'background-color': block.isSnake
              ? '#77787b'
              : block.isFood
              ? 'orange'
              : 'transparent',
          }"
        ></span>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "",
  data() {
    return {
      length: 1,//蛇的长度
      width: 60,//边界大小
      data: [],
      snake: [{ x: 30, y: 30 }],//初始蛇头位置
      timer: "",//定时器
      update: 0,//用于刷新页面
      direction: "up",//默认向上
      speed: 100//默认速度
    };
  },
  mounted() {
    this.init(this.width);
    this.timer = setInterval(() => {
      if (this.direction == "up") {
        this.up();
      } else if (this.direction == "down") {
        this.down();
      } else if (this.direction == "left") {
        this.left();
      } else if (this.direction == "right") {
        this.right();
      }
    }, this.speed);
  },
  destroyed() {
    clearInterval(this.timer);
  },
  computed: {
    active() {
      return this.$store.state["tabActive"].active;
    },
  },
  methods: {
    //初始化矩阵（60*60）
    init(length) {
      this.data = [];
      this.direction = "up";
      document.addEventListener("keydown", this.keydown);
      for (var i = 0; i < length; i++) {
        var row = [];
        for (var j = 0; j < length; j++) {
          row[j] = {
            isSnake: false,
            isFood: false,
            x: i,
            y: j,
          };
        }
        this.data[i] = row;
      }
      //中间（30,30）的地方为起始点
      this.data[30][30].isSnake = true;
      this.snake = [{ x: 30, y: 30 }];
      //随机选一个点作为食物
      var randomFood = this.randomNum(this.getSpace(this.width));
      this.data[randomFood.x][randomFood.y].isFood = true;
    },
    //获取所有空白格
    getSpace(length) {
      //二维数组
      var all = [];
      for (var i = 0; i < length; i++) {
        for (var j = 0; j < length; j++) {
          if (!this.data[i][j].isSnake) {
            all = all.concat(this.data[i][j]);
          }
        }
      }
      return all;
    },
    //生成食物
    randomNum(allArray) {
      var random = Math.floor(Math.random() * (allArray.length + 1));
      return { x: allArray[random].x, y: allArray[random].y };
    },
    up() {
      if (this.snake[0].x > 0) {
        if (this.data[this.snake[0].x - 1][this.snake[0].y].isSnake) {
          this.gameOver(
            "Game Over!",
            "好家伙，自己吃自己，不愧是你！",
            "我不相信命运，再来一把！"
          );
        } else if (this.data[this.snake[0].x - 1][this.snake[0].y].isFood) {
          this.snake.unshift({ x: this.snake[0].x - 1, y: this.snake[0].y });
          this.data[this.snake[0].x][this.snake[0].y].isSnake = true;
          this.data[this.snake[0].x][this.snake[0].y].isFood = false;
          this.length++;
          if (this.length == this.width * this.width) {
            this.gameOver(
              "Oh!Congratulations!",
              "我愿称你为蛇蛇大魔王！",
              "天选之蛇，再来一把！"
            );
          }
          //随机选一个点作为食物
          var randomFood = this.randomNum(this.getSpace(this.width));
          this.data[randomFood.x][randomFood.y].isFood = true;
        } else {
          this.snake.unshift({ x: this.snake[0].x - 1, y: this.snake[0].y });
          this.data[this.snake[0].x][this.snake[0].y].isSnake = true;
          this.data[this.snake[this.snake.length - 1].x][
            this.snake[this.snake.length - 1].y
          ].isSnake = false;
          this.snake.pop();
        }
      } else {
        console.log("up");
        this.gameOver(
          "Game Over!",
          "又撞死了！不愧是你啊！",
          "我不相信命运，再来一把！"
        );
      }
      this.update++;
    },
    down() {
      if (this.snake[0].x < this.width - 1) {
        if (this.data[this.snake[0].x + 1][this.snake[0].y].isSnake) {
          this.gameOver(
            "Game Over!",
            "好家伙，自己吃自己，不愧是你！",
            "我不相信命运，再来一把！"
          );
        } else if (this.data[this.snake[0].x + 1][this.snake[0].y].isFood) {
          this.snake.unshift({ x: this.snake[0].x + 1, y: this.snake[0].y });
          this.data[this.snake[0].x][this.snake[0].y].isSnake = true;
          this.data[this.snake[0].x][this.snake[0].y].isFood = false;
          this.length++;
          if (this.length == this.width * this.width) {
            this.gameOver(
              "Oh!Congratulations!",
              "我愿称你为蛇蛇大魔王！",
              "天选之蛇，再来一把！"
            );
          }
          //随机选一个点作为食物
          var randomFood = this.randomNum(this.getSpace(this.width));
          this.data[randomFood.x][randomFood.y].isFood = true;
        } else {
          this.snake.unshift({ x: this.snake[0].x + 1, y: this.snake[0].y });
          this.data[this.snake[0].x][this.snake[0].y].isSnake = true;
          this.data[this.snake[this.snake.length - 1].x][
            this.snake[this.snake.length - 1].y
          ].isSnake = false;
          this.snake.pop();
        }
      } else {
        console.log("down");
        this.gameOver(
          "Game Over!",
          "又撞死了！不愧是你啊！",
          "我不相信命运，再来一把！"
        );
      }
      this.update++;
    },
    left() {
      if (this.snake[0].y > 0) {
        if (this.data[this.snake[0].x][this.snake[0].y - 1].isSnake) {
          this.gameOver(
            "Game Over!",
            "好家伙，自己吃自己，不愧是你！",
            "我不相信命运，再来一把！"
          );
        } else if (this.data[this.snake[0].x][this.snake[0].y - 1].isFood) {
          this.snake.unshift({ x: this.snake[0].x, y: this.snake[0].y - 1 });
          this.data[this.snake[0].x][this.snake[0].y].isSnake = true;
          this.data[this.snake[0].x][this.snake[0].y].isFood = false;
          this.length++;
          if (this.length == this.width * this.width) {
            this.gameOver(
              "Oh!Congratulations!",
              "我愿称你为蛇蛇大魔王！",
              "天选之蛇，再来一把！"
            );
          }
          //随机选一个点作为食物
          var randomFood = this.randomNum(this.getSpace(this.width));
          this.data[randomFood.x][randomFood.y].isFood = true;
        } else {
          this.snake.unshift({ x: this.snake[0].x, y: this.snake[0].y - 1 });
          this.data[this.snake[0].x][this.snake[0].y].isSnake = true;
          this.data[this.snake[this.snake.length - 1].x][
            this.snake[this.snake.length - 1].y
          ].isSnake = false;
          this.snake.pop();
        }
      } else {
        console.log("left");
        this.gameOver(
          "Game Over!",
          "又撞死了！不愧是你啊！",
          "我不相信命运，再来一把！"
        );
      }
      this.update++;
    },
    right() {
      if (this.snake[0].y < this.width - 1) {
        if (this.data[this.snake[0].x][this.snake[0].y + 1].isSnake) {
          this.gameOver(
            "Game Over!",
            "好家伙，自己吃自己，不愧是你！",
            "我不相信命运，再来一把！"
          );
        } else if (this.data[this.snake[0].x][this.snake[0].y + 1].isFood) {
          this.snake.unshift({ x: this.snake[0].x, y: this.snake[0].y + 1 });
          this.data[this.snake[0].x][this.snake[0].y].isSnake = true;
          this.data[this.snake[0].x][this.snake[0].y].isFood = false;
          this.length++;
          if (this.length == this.width * this.width) {
            this.gameOver(
              "Oh!Congratulations!",
              "我愿称你为蛇蛇大魔王！",
              "天选之蛇，再来一把！"
            );
          }
          //随机选一个点作为食物
          var randomFood = this.randomNum(this.getSpace(this.width));
          this.data[randomFood.x][randomFood.y].isFood = true;
        } else {
          this.snake.unshift({ x: this.snake[0].x, y: this.snake[0].y + 1 });
          this.data[this.snake[0].x][this.snake[0].y].isSnake = true;
          this.data[this.snake[this.snake.length - 1].x][
            this.snake[this.snake.length - 1].y
          ].isSnake = false;
          this.snake.pop();
        }
      } else {
        console.log("right");
        this.gameOver(
          "Game Over!",
          "又撞死了！不愧是你啊！",
          "我不相信命运，再来一把！"
        );
      }
      this.update++;
    },
    keydown(e) {
      var code = e.code;
      if (code == "ArrowUp") {
        if (this.direction == "up" || this.direction == "down") return;
        this.up();
        this.direction = "up";
      } else if (code == "ArrowDown") {
        if (this.direction == "up" || this.direction == "down") return;
        this.down();
        this.direction = "down";
      } else if (code == "ArrowRight") {
        if (this.direction == "right" || this.direction == "left") return;
        this.right();
        this.direction = "right";
      } else if (code == "ArrowLeft") {
        if (this.direction == "right" || this.direction == "left") return;
        this.left();
        this.direction = "left";
      }
    },
    gameOver(title, content, comfirm) {
      clearInterval(this.timer);
      document.removeEventListener("keydown", this.keydown);
      this.$messageBox.alert(content, title, {
        confirmButtonText: comfirm,
        showClose: false,
        type: "error",
        callback: () => {
          this.snake = [{ x: 30, y: 30 }];
          this.length = 1;
          this.init(this.width);
          clearInterval(this.timer);
          this.timer = setInterval(() => {
            if (this.direction == "up") {
              this.up();
            } else if (this.direction == "down") {
              this.down();
            } else if (this.direction == "left") {
              this.left();
            } else if (this.direction == "right") {
              this.right();
            }
          }, this.speed);
        },
      });
    },
  },
};
</script>

<style scoped>
.snake {
  position: relative;
  background-color: transparent;
  width: 40%;
  text-align: center;
  margin: 40px 30% 40px;
}
h1 {
  font-size: 30px;
  margin-bottom: 30px;
}
.length {
  color: #77787b;
}
.row {
  display: flex;
}
.container {
  border: 1px solid #e5e7eb;
  width: 600px;
  margin: 10px auto 30px;
}
.container span {
  display: block;
  width: 10px;
  height: 10px;
  border-radius: 4px;
  transition: all 0.2s;
}
p {
  font-size: 16px;
  color: #77787b;
  font-weight: 550;
  letter-spacing: 1px;
  margin-top: 30px;
}
@media screen and (max-width: 1200px) {
  .snake {
    width: 70%;
    margin: 40px 15% 40px;
  }
}
@media screen and (max-width: 750px) {
  .snake {
    width: 90%;
    margin: 40px 5% 40px;
  }
}
</style>
