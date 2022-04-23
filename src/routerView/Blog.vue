<template>
  <div class="blog" :style="active ? 'color:#fff' : 'color:#000'">
    <h1>Blogs</h1>
    <el-skeleton
      style="width: 100%"
      animated
      :loading="loading"
      :count="blogs.length"
    >
      <template slot="template">
        <el-skeleton-item
          variant="p"
          style="width: 100%; height: 24px"
        ></el-skeleton-item>
        <el-skeleton-item
          variant="text"
          style="width: 100px; height: 16px; margin-bottom: 30px"
        ></el-skeleton-item>
      </template>
      <template>
        <div
          class="item"
          v-for="(item, index) in blogs"
          :key="index"
          @click="clickItem(item)"
        >
          <div class="title">{{ item.title }}</div>
          <div class="time">{{ item.time }}</div>
        </div>
      </template>
    </el-skeleton>
  </div>
</template>

<script>
export default {
  name: "Blog",
  data() {
    return {
      blogs: [],
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
      .get("getBlogs")
      .then((response) => {
        this.blogs = response.data.blogs;
        setTimeout(() => {
          this.loading = false;
        }, 1000);
      })
      .catch((reject) => {
        console.log(reject);
      });
  },
  methods: {
    clickItem(item) {
      this.$router.push({ path: "/article", query: { id: item.id } });
    },
  },
};
</script>

<style scoped>
.blog {
  position: relative;
  background-color: transparent;
  width: 40%;
  text-align: left;
  margin: 40px 30% 40px;
}
h1 {
  font-size: 30px;
  margin-bottom: 40px;
}
.item {
  margin-top: 10px;
  margin-bottom: 30px;
  opacity: 0.6;
  font-weight: 500;
  transition: all 0.3s;
}
.item:hover {
  opacity: 1;
  cursor: pointer;
}
.item .title {
  font-size: 18px;
}
.item .time {
  font-size: 14px;
  opacity: 0.5;
}
p {
  font-size: 16px;
  color: #77787b;
  font-weight: 550;
  letter-spacing: 1px;
  margin-top: 45px;
}
@media screen and (max-width: 1200px) {
  .blog {
    width: 70%;
    margin: 40px 15% 40px;
  }
}
@media screen and (max-width: 750px) {
  .blog {
    width: 90%;
    margin: 40px 5% 40px;
  }
}
</style>
