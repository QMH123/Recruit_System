import Vue from "vue";
import Router from "vue-router";
import Index from '../views/Index.vue'
import Register from '../views/Register.vue'
import Commit from "../views/Commit";

Vue.use(Router);

export default new Router({
  mode:'history',
  routes: [
    {
      path: "/",
      redirect: 'index'
    },
    {
      path: "/index",
      name: 'Index',
      component: Index
    },
    {
      path: "/register",
      name: "Register",
      component: Register
    },
    {
      path: "/commit",
      name: 'Commit',
      meta:{
        isLogin:true    
      },
      component: Commit
    }
  ]
});