<template >
  <div class="article" :style="active ? 'color:#fff' : 'color:#000'" >
    <h1>{{ article.title }}</h1>
    <h4 :style="active ? 'color:#bbb' : 'color:#555'">{{ article.time }}</h4>
    <div
      class="markdown-body"
      v-html="markdown"
      :style="{ '--dark': dark, '--light': light }"
    ></div>
  </div>
</template>

<script>
// 代码高亮
// import hljs from 'highlight.js/lib/core';
import hljs from "highlight.js";
//import 'highlight.js/styles/monokai-sublime.css';
import "highlight.js/styles/atom-one-dark.css";
const highlightCode = () => {
  const preEl = document.querySelectorAll("pre");
  // console.log(preEl);
  preEl.forEach((el) => {
    hljs.highlightBlock(el);
  });
};
// 其他元素使用 github 的样式
import "github-markdown-css";

import { marked } from "marked";
export default {
  name: "Article",
  data() {
    return {
      article: {},
      markdown: "",
    };
  },
  computed: {
    active: {
      get: function () {
        return this.$store.state["tabActive"].active;
      },
      set: function() {
        this.$store.commit("tabActive/updateActive");
      }
    },
    dark: {
      get: function () {
        return this.active ? "#111" : "#fbfbfb";
      },
      set: function (newVal) {
        this.active = newVal;
      },
    },
    light: {
      get: function () {
        return this.active ? "#bbb" : "#111";
      },
      set: function (newVal) {
        this.active = newVal;
      },
    },
  },
  watch: {
    active() {
      // this.dark = this.active ? "#111" : "#fbfbfb";
      // this.light = this.active ? "#bbb" : "#111";
      this.dark = this.active;
      this.light = this.active;
    },
  },
  mounted() {
    this.$axios
      .get("getBlogs")
      .then((response) => {
        this.article = response.data.blogs.filter((item) => {
          return item.id == this.$route.query.id;
        })[0];
        this.$axios
          .get("/markdownFile" + this.article.path.slice(1))
          .then((res) => {
            this.markdown = marked(res.data);
            setTimeout(() => {
              highlightCode();
            }, 0.1);
          });
      })
      .catch((reject) => {
        alert('Article loaded fail')
        console.log(reject);
      });
  },
  methods: {
  },
};
</script>

<style scoped>

.article {
  position: relative;
  background-color: transparent;
  width: 60%;
  text-align: left;
  margin: 40px 20% 40px;
}
h1 {
  font-size: 36px;
  font-weight: 700;
  margin-bottom: 32px;
}
h4 {
  font-size: 16px;
  font-weight: 500;
  color: #bbb;
  margin-bottom: 46px;
}
.markdown-body {
  margin-bottom: 40px;
  background-color: transparent;
  color: var(--light);
}

.markdown-body /deep/ pre {
  background-color: var(--dark);
  letter-spacing: 1.5px;
}
p {
  font-size: 16px;
  color: #77787b;
  font-weight: 550;
  letter-spacing: 1px;
  margin-top: 45px;
}
@media screen and (max-width: 1200px) {
  .article {
    width: 70%;
    margin: 40px 15% 40px;
  }
}
@media screen and (max-width: 750px) {
  .article {
    width: 90%;
    margin: 40px 5% 40px;
  }
}
</style>
