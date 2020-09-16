import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    userInfo: JSON.parse(localStorage.getItem("userInfo")) || {},
  },
  mutations: {
    setuserInfo(state, v) {
      //将传递的数据先保存到localStorage中
      localStorage.setItem('userInfo', JSON.stringify(v));
      // 之后才是修改state中的状态
      state.userInfo = v;
    }
  },
  actions: {}
});
