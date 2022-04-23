### 按需引入element-ui报错

### 错误为Error: Cannot find module 'babel-preset-es2015'

##### 情景：按照element-ui官网的按需引入步骤安装，修改babel配置文件后报出以上错误

##### 解决方案：官网上将babel配置文件修改为
```
{
  "presets": [["es2015", { "modules": false }]],
  "plugins": [
    [
      "component",
      {
        "libraryName": "element-ui",
        "styleLibraryName": "theme-chalk"
      }
    ]
  ]
}
```

##### 实际因为新版vue-cli文件中自带一项配置，于是修改为：
```
module.exports = {
  presets: [
    '@vue/cli-plugin-babel/preset',
    ["es2015", { "modules": false }]
  ],
  plugins: [
    [
      "component",
      {
        "libraryName": "element-ui",
        "styleLibraryName": "theme-chalk"
      }
    ]
  ]
}
```

##### 结果报错，将presets数组的第二项注释掉就解决了，虽然不知道原因，
```
module.exports = {
  presets: [
    '@vue/cli-plugin-babel/preset',
  ],
  plugins: [
    [
      "component",
      {
        "libraryName": "element-ui",
        "styleLibraryName": "theme-chalk"
      }
    ]
  ]
}
```