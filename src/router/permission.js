import store from "../store.js";
import router from "./router.js";

router.beforeEach((to,from,next)=>{
    if(to.matched.some(res=>res.meta.isLogin)){//判断是否需要登录
        if (JSON.stringify(store.state['userInfo'])!='{}') {
            next();
        }else{
            next({
                path:"/",
            });
        }

    }else{
        next()
    }
});

export default router;