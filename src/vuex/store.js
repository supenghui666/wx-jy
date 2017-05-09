/**
 * Created by yi on 2017-01-06.
 */
import Vue from 'vue';
import Vuex from 'vuex';
import actions from './actions';
import * as getters from './getters';
import login from './modules/login/login';
import impress from './modules/impress/impress';
import ingredient from './modules/ingredient/ingredient';
import redPackets from './modules/redPackets/redPackets';
import reviewType from './modules/reviewType/reviewType';
// 告诉 vue “使用” vuex
Vue.use(Vuex);
// const HOST = 'http://www.gaoshengyiyi.cn/';// 用于正式服务器上
const HOST = '/domain';// 用于本地调试
// 创建一个对象来保存应用启动时的初始状态
const state = {
  'loadingShow': false,
  ok: 1,
  loginUrl:`${HOST}/index.php/Home/User/login`,
  getCodeUrl:`${HOST}/index.php/Home/User/sendmobcode`
};
// 创建一个对象存储一系列我们接下来要写的 mutation 函数
const mutations = {
  // TODO: 放置我们的状态变更函数
  UPDATE_LOADING(state, data) {
    state.loadingShow = data;
  }
};

// 整合初始状态和变更函数，我们就得到了我们所需的 store
// 至此，这个 store 就可以连接到我们的应用中
export default new Vuex.Store({
  state,
  mutations,
  actions,
  getters,
  modules: {
    login,
    impress,
    ingredient,
    redPackets,
    reviewType
  }
});
