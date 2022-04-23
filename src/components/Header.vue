<template>
  <div class="">
    <header
      :style="{
        background:
          $route.name == 'neteasecloudmusic' ? 'black' : 'transparent',
      }"
    >
      <ul>
        <li v-for="(item, index) in menu" :key="index">
          <i
            v-if="item.type == 'text'"
            class="menuItem"
            @click="clickMenu(item)"
            >{{ item.title }}</i
          >
          <i
            :title="item.title"
            v-else-if="item.type == 'icon'"
            class="menuItem iconfont"
            :class="item.class"
            @click="clickMenu(item)"
          ></i>
        </li>
        <i
          title="Toggle Color Scheme"
          ref="tab"
          class="menuItem iconfont"
          :class="active ? 'icon-Moon' : 'icon-sun'"
          @click="tabMoonSun"
        ></i>
      </ul>
    </header>
  </div>
</template>

<script>
export default {
  name: "Header",
  data() {
    return {
      menu: [
        { type: "text", title: "Blogs", path: "/blogs" },
        { type: "text", title: "Vlogs", path: "/vlogs" },
        { type: "text", title: "Photos", path: "/photos" },
        { type: "text", title: "Projects", path: "/projects" },
        {
          type: "icon",
          title: "bilibili",
          class: "icon-icon_bilibili",
          path: "https://space.bilibili.com/15768004", //我的
          // path: 'https://b23.tv/c19t5lq'//小肥的
        },
        {
          type: "icon",
          title: "微博",
          class: "icon-weibo",
          path: "https://weibo.com/u/2297942777", //小肥的
        },
        // { type: "icon", title: 'QQ', class: "icon-qq" },
        // { type: "icon", title: 'WeChat', class: "icon-weixin" },
        // { type: "icon", class: "icon-weibo" },
        // { type: "icon", class: "icon-icon_bilibili" },
      ],
      backgroundColor: "transparent",
    };
  },
  computed: {
    active() {
      return this.$store.state["tabActive"].active;
    },
  },
  mounted() {},
  methods: {
    clickMenu(item) {
      if (item.type == "text") {
        this.$router.push({ path: item.path });
      } else if (item.type == "icon") {
        window.open(item.path);
      }
    },
    tabMoonSun() {
      this.$store.commit("tabActive/updateActive");
    },
  },
};
</script>

<style scoped>
@import url("../iconfont/iconfont.css");
header {
  position: relative;
  box-sizing: border-box;
  height: 88px;
  width: 100%;
  padding: 32px;
}
.menuItem {
  color: #77787b;
  text-decoration: none;
  font-size: 16px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s;
}
.menuItem:hover {
  color: #e5e7eb;
}
.iconfont {
  font-size: 20px;
}
ul li {
  list-style: none;
  margin-right: 30px;
}

ul {
  display: flex;
  justify-content: flex-end;
}
</style>
