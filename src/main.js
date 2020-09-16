import Vue from "vue";
import App from "./App.vue";
import router from "./router/router";
import permission from './router/permission.js'
import store from "./store";
import ElementUI from "element-ui";
import "element-ui/lib/theme-chalk/index.css";
import VueCompositionApi from "@vue/composition-api";
// import "bootstrap";
// import 'bootstrap/dist/css/bootstrap.min.css'
// import 'bootstrap/dist/js/bootstrap.min.js'


Vue.config.productionTip = false;


Vue.use(ElementUI);
Vue.use(VueCompositionApi);

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");
