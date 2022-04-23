---
1.安装依赖
```
    npm install marked --save
    npm install vue-loader --save
    npm install vue-markdown-loader --save
    npm install github-markdown-css --save
    npm install highlightjs --save
```

2.配置vue.config.js
- 使用vue-cli创建的项目，如果没有vue.config.js这个文件，可以自行在根目录下创建vue.config.js
- 主要配置在chainWebpack里

```
module.exports = {
    // 基本路径 baseURL已经过时
    publicPath: './',
    // 输出文件目录
    outputDir: 'dist',
    // eslint-loader 是否在保存的时候检查
    lintOnSave: true,
    // use the full build with in-browser compiler?
    // https://vuejs.org/v2/guide/installation.html#Runtime-Compiler-vs-Runtime-only
    // compiler: false,
    // webpack配置
    // see https://github.com/vuejs/vue-cli/blob/dev/docs/webpack.md
    chainWebpack: config => {
        config.module.rule('md')
            .test(/\.md/)
            .use('vue-loader')
            .loader('vue-loader')
            .end()
            .use('vue-markdown-loader')
            .loader('vue-markdown-loader/lib/markdown-compiler')
            .options({
                raw: true
            })
    },
    configureWebpack: () => { },
    // vue-loader 配置项
    // https://vue-loader.vuejs.org/en/options.html
    // vueLoader: {},
    // 生产环境是否生成 sourceMap 文件
    productionSourceMap: true,
    // css相关配置
    css: {
        // 是否使用css分离插件 ExtractTextPlugin
        extract: true,
        // 开启 CSS source maps?
        sourceMap: false,
        // css预设器配置项
        loaderOptions: {},
        // 启用 CSS modules for all css / pre-processor files.
        modules: false
    },
    // use thread-loader for babel & TS in production build
    // enabled by default if the machine has more than 1 cores
    parallel: require('os').cpus().length > 1,
    // 是否启用dll
    // See https://github.com/vuejs/vue-cli/blob/dev/docs/cli-service.md#dll-mode
    // dll: false,
    // PWA 插件相关配置
    // see https://github.com/vuejs/vue-cli/tree/dev/packages/%40vue/cli-plugin-pwa
    pwa: {},
    // webpack-dev-server 相关配置
    devServer: {

    },

    // 第三方插件配置
    pluginOptions: {
        // ...
    }
}

```

3.标签使用
```
    <div
      class="markdown-body"
      v-html="markdown"
    >
    </div>
```

4.js使用
```
import hljs from "highlight.js";
//引入代码高亮的主题，可自行更换
import "highlight.js/styles/atom-one-dark.css";
const highlightCode = () => {
  const preEl = document.querySelectorAll("pre");
  preEl.forEach((el) => {
    hljs.highlightBlock(el);
  });
};
import "github-markdown-css";
import { marked } from "marked";

export default {
  name: "Article",
  data() {
    return {
      markdown: "",
    };
  },
  mounted() {
    this.$axios
        .get("/markdownFile" + this.article.path.slice(1))
        .then((res) => {
            this.markdown = marked(res.data);
            setTimeout(() => {
              highlightCode();
            }, 0.1);
        });
 },
};
```