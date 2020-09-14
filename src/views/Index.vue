<template>
  <div id="index">

    <nav class="navbar navbar-default">
      <div class="container-fluid">
        <div class="navbar-header">
          <a class="navbar-brand" href="#">Brand</a>
        </div>

        <div class="collapse navbar-collapse" id="bs-example-navbar-collapse-1">
          <ul class="nav navbar-nav navbar-right">
            <li class="active">
              <router-link
                to="register"
                tag="a"
                class="dropdown-toggle"
                data-toggle="dropdown"
                role="button"
                aria-haspopup="true"
                aria-expanded="false"
              >注册</router-link>
            </li>
          </ul>
        </div>
      </div>
    </nav>

    <div id="box-wrap">
        <div  style="height : 100%; position :relative; width : 30%;">
            <div class="img-box">
                <img src="https://lao-lan-go.oss-cn-beijing.aliyuncs.com/music/pixiv9.jpg" alt="photo">
            </div>
          <div class="content-box" style="background-color:rgba(255,255,255,0);" id="box-lefr">
            <p style="font-size : 2em; ">Welcome back</p>
            <p>
              <button class="button submit" @click="more()">更多工作室咨询</button>
            </p>
          </div>
        </div>
        <div style="height :100%; width :70%;">
          
            <login ></login>

        </div>
    </div>
  
  </div>
</template>
<script>
import login from "../components/Login";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.min.js";
import { reactive, ref, isRef, toRefs, onMounted } from "@vue/composition-api";
export default {
  name: "index",
  components: {
    login
  },
  setup(props, { refs, root }) {
    const more = () => {
      window.location.href="https://laolan-runtu.xyz";
    };
    return {
      more
    };
  },
};
</script>>
<style lang="scss" scoped>
$lavender: #CBC0D3;
$pale: #EAC7CC;
$white: #f6f6f6;
$pink: darken($pale, 20%);
$sans-serif: 'Open Sans', sans-serif;
$serif: 'Lora', serif;
.img {
  position: absolute;
  top: 0;
  z-index: -10;
  width: 100%;
  height: 100%;
  background-color: rgba($color: #ffffff, $alpha: 0.3);
}
#box-wrap {
  width: 70%;
 /* display: inline-block;*/
  box-shadow: 1px 1px 10px rgba(200,200,200,0.6);
  height: 600px;
  display: flex;
  margin: 0 auto;
  min-width: 1000px;
}

.row-left{
    border :1px solid black;
    height: 100%;
    
}

.img-box{
    width: 100%;
    height: 100%;
    position: absolute;
    z-index: -1;
}

.img-box > img{
    width: 100%;
    height: 100%;
    
}

.content-box{
    height: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-around;
}
button {
  padding: 12px;
  font-family: $sans-serif;
  text-transform: uppercase;
  letter-spacing: 3px;
  font-size: 11px;
  border-radius: 10px;
  margin: auto;
  outline: none;
  display: block;
  &:hover {
    background: $pale;
    color: $white;
    transition: background-color 1s ease-out;
  }
}
.button {
  margin-top: 3%;
  background: $white;
  color: $pink;
  border: solid 1px $pale;
}
.submit {
  margin-top: 25px;
  padding: 12px;
  border-color: $pink;
  &:hover {
    background: $lavender;
    border-color: darken($lavender, 5%);
  }
}
</style>>