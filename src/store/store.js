import Vue from "vue";
import vuex from 'vuex';
Vue.use(vuex)

//切换昼夜
const tabActive = {
    namespaced: true,
    state: {
        //false代表白天，true代表黑夜
        active: false
    },
    actions: {

    },
    mutations: {
        updateActive(state){
            state.active = !state.active
        }
    },
    getters: {
        getActive(state){
            return state.active
        }
    }
}

//扫雷最好成绩
const sweeperRank = {
    namespaced : true,
    state: {
        rank: {
            name: '',
            bombs: 0,
            time: 0
        }
    },
    mutations: {
        updateRank(state, value) {
            console.log(value);
            state.rank = value
        }
    },
    getters: {
        getRank(state) {
            return state.rank
        }
    }
}

export default new vuex.Store({
    modules: {
        tabActive,
        sweeperRank
    }
})