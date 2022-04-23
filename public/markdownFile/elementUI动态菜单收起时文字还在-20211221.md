### elementUI动态菜单收起时文字还在

#### 情景：菜单收起来，目的是只显示图标，隐藏文字，但使用v-for循环渲染的菜单，多级菜单的以及菜单title仍然显示
#### 原因：由于官方是层级样式标签，而我使用的数组动态渲染，其中使用了一个div标签作为渲染的父级标签导致出现此问题

#### 于是将div标签换为template标签，但由于template标签不允许使用key关键字，这样就会导致v-for没有key值而报错，于是只在template标签里写上v-for，在template的子节点上写上key，即可解决

#### 如下：
```
    <template v-for="(item, index) in menu">
      <el-menu-item
        :index="item.path"
        :key="index"
        v-if="!hasChildren(index)"
        @click="routeChange(item.label)"
      >
        <i :class="'el-icon-' + item.icon"></i>
        <span slot="title">{{ item.label }}</span>
      </el-menu-item>

      <el-submenu :index="item.label" v-if="hasChildren(index)" :key="index">
        <template slot="title">
          <i :class="'el-icon-' + item.icon"></i>
          <span slot="title">{{ item.label }}</span>
        </template>
        <el-menu-item-group>
          <el-menu-item
            :index="nextItem.path"
            v-for="(nextItem, nextIndex) in item.children"
            :key="nextIndex"
            @click="routeChange(nextItem.label)"
          >
            <i :class="'el-icon-' + nextItem.icon"></i>
            <span slot="title">{{ nextItem.label }}</span>
          </el-menu-item>
        </el-menu-item-group>
      </el-submenu>
    </template>
```