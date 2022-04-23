<template>
  <div class="vlog" :style="active ? 'color:#fff' : 'color:#000'">
    <h1>Vlogs</h1>
    <el-skeleton
      :loading="loading"
      animated
      :count="vlogs.length"
      class="container"
    >
      <template slot="template">
          <el-skeleton-item variant="div" class="video"></el-skeleton-item>
      </template>
      <template>
        
          <div
            class="video"
            v-for="(item, index) in vlogs"
            :key="index"
            @click="clickItem(item)"
          >
            <img :src="item.poster" alt="" class="image" />
            <div class="cover">{{ item.title }}</div>
          </div>
        
      </template>
    </el-skeleton>
  </div>
</template>

<script>
export default {
  name: "Vlog",
  data() {
    return {
      vlogs: [],
      loading: true,
    };
  },
  computed: {
    active() {
      return this.$store.state["tabActive"].active;
    },
  },
  mounted() {
    this.$axios
      .get("getVlogs")
      .then((response) => {
        this.vlogs = response.data.vlogs;
        setTimeout(() => {
          this.loading = false;
        }, 1000);
      })
      .catch((reject) => {
        alert("Vlogs loaded fail");
        console.log(reject);
      });
  },
  methods: {
    clickItem(item) {
      this.$router.push({
        path: "/video",
        query: { title: item.title, videoPath: item.path },
      });
    },
  },
};
</script>

<style scoped>
.vlog {
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
.container {
  width: 100%;
  display: flex;
  flex-flow: wrap;
  margin-bottom: 25px;
}
.video {
  position: relative;
  width: 18vw;
  height: 10.125vw;
  overflow: hidden;
  margin-bottom: 20px;
  margin-right: 20px;
  cursor: pointer;
  border-radius: 4px;
  box-sizing: border-box;
}
.image {
  position: absolute;
  left: 0;
  top: 0;
  width: 100%;
}
.video:hover .cover {
  top: 0;
  background-color: rgba(0, 0, 0, 0.7);
  /* 取消显示省略号 */
  overflow: auto;
  text-overflow: ellipsis;
  white-space: normal;
  text-align: left;
}
.cover {
  position: absolute;
  width: 100%;
  height: 100%;
  background-color: transparent;
  left: 0;
  top: calc(100% - 70px);
  color: white;
  font-size: 16px;
  font-weight: 500;
  padding: 40px 15px 0;
  letter-spacing: 2px;
  transition: all 0.15s;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
p {
  font-size: 16px;
  color: #77787b;
  font-weight: 550;
  letter-spacing: 1px;
  margin-top: 45px;
}
@media screen and (max-width: 1200px) {
  .vlog {
    width: 80%;
    margin: 40px 10% 40px;
  }
  .video {
    width: 37vw;
    height: 20.8125vw;
  }
}
@media screen and (max-width: 750px) {
  .vlog {
    width: 90%;
    margin: 40px 5% 40px;
  }
  .video {
    width: 90vw;
    height: 56.25vw;
    margin-right: 0;
  }
  /* .vjs-custom-skin /deep/ .video-js .vjs-big-play-button {
    opacity: 1;
  } */
}
</style>
