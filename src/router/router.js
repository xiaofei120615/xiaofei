import Vue from "vue";
import VueRouter from "vue-router";
Vue.use(VueRouter);

import Home from '../routerView/Home.vue'
import Blog from '../routerView/Blog.vue'
import Photo from '../routerView/Photo.vue'
import Project from '../routerView/Project.vue'
import Vlog from '../routerView/Vlog.vue'
import Article from '../routerView/Article.vue'
import Video from '../routerView/Video.vue'

import Sweepe from '../projectView/Sweepe.vue'
import Snake from '../projectView/Snake.vue'
import Parallax from '../projectView/Parallax.vue'
import NetEase from '../projectView/NetEase.vue'

const routes = [
    { path: '/', redirect: '/home' },
    { path: '/home', name: 'home', component: Home },
    { path: '/blogs', name: 'blogs', component: Blog, },
    { path: '/photos', name: 'photos', component: Photo },
    { path: '/vlogs', name: 'vlogs', component: Vlog },
    { path: '/article', name: 'article', component: Article },
    { path: '/video', name: 'video', component: Video },
    { path: '/projects', name: 'projects', component: Project },
    { path: '/minesweepe', name: 'minesweepe', component: Sweepe },
    { path: '/greedysnake', name: 'greedysnake', component: Snake },
    { path: '/parallaxscrolling', name: 'parallaxscrolling', component: Parallax },
    { path: '/neteasecloudmusic', name: 'neteasecloudmusic', component: NetEase }
]

export default new VueRouter({
    mode: 'history',
    routes,
})