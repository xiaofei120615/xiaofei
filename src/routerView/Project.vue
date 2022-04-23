<template>
  <div class="project" :style="active ? 'color:#fff' : 'color:#000'">
    <h1>Projects</h1>
    <div class="projects">
      <div
        class="item"
        v-for="(item, index) in projects"
        :key="index"
        @click="clickItem(item)"
      >
        <i class="iconfont" :class="item.icon"></i>
        <div class="itemInfo">
          <span :style="active ? 'color:#fff' : 'color:#000'">{{
            item.name
          }}</span>
          <span href="">
            {{item.info}}</span
          >
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Project",
  data() {
    return {
      projects: [],
    };
  },
  computed: {
    active() {
      return this.$store.state["tabActive"].active;
    },
  },
  mounted() {
    this.$axios
      .get("getProjects")
      .then((response) => {
        this.projects = response.data.projects;
      })
      .catch((reject) => {
        alert("projects load fail");
        console.log(reject);
      });
  },
  methods: {
    clickItem(item) {
      this.$router.push({ path: item.path, query: { name: item.name } });
    },

  },
};
</script>

<style scoped>
.project {
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
.projects {
  display: flex;
  flex-flow: wrap;
  justify-content: space-between;
}
.item {
  width: 18vw;
  padding: 20px 10px;
  opacity: 0.6;
  cursor: pointer;
  font-weight: 500;
  display: flex;
  align-items: center;
  /* background-color: #eee; */
  margin-bottom: 2vw;
  border: 0.5px solid #77787b;
  border-radius: 4px;
}
.item:hover {
  opacity: 1;
}
.itemInfo {
  display: flex;
  flex-direction: column;
  justify-content: center;
  margin-left: 10px;
}
.itemInfo span:first-child {
  font-size: 20px;
  font-weight: 500;
  margin-bottom: 10px;
}
.itemInfo span:last-child {
  font-size: 14px;
  opacity: 0.5;
}
.item i {
  font-size: 36px;
  font-weight: 500;
  margin-right: 10px;
}

p {
  font-size: 16px;
  color: #77787b;
  font-weight: 550;
  letter-spacing: 1px;
  margin-top: 45px;
}
@media screen and (max-width: 1200px) {
  .project {
    width: 70%;
    margin: 40px 15% 40px;
  }
  .item {
    width: 33vw;
  }
}
@media screen and (max-width: 750px) {
  .project {
    width: 90%;
    margin: 40px 5% 40px;
  }
  .item {
    width: 90vw;
  }
}
</style>
