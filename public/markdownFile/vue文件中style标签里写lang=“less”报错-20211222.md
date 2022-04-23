### vue文件中style标签里写lang="less"报错

### 情景：需要在style中写less样式，于是添加了lang="less"属性，然后报错
### 错误信息：Failed to resolve loader: less-loader

### 分析：less-loader模块未安装

### 解决：在项目目录下以管理员权限运行npm install less-loader@5.0.0 -D

#### 注：@符后为版本