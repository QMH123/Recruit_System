<template>
  <div id="login">
    <el-form
      :model="ruleForm"
      status-icon
      :rules="rules"
      ref="ruleForm"
      label-width="100px"
      class="demo-ruleForm register-page"
      size="medium"
    >
      <h1>SIGN UP</h1>
      <el-form-item label="邮箱账号" prop="email">
        <el-input type="text" v-model="ruleForm.email" autocomplete="off"></el-input>
      </el-form-item>

      <el-form-item label="学号" prop="sno">
        <el-input type="text" v-model="ruleForm.sno" autocomplete="off"></el-input>
      </el-form-item>

      <el-form-item label="密码" prop="password">
        <el-input type="password" v-model="ruleForm.password" autocomplete="off"></el-input>
      </el-form-item>

      <el-form-item label="重复密码" prop="passwords">
        <el-input type="password" v-model="ruleForm.passwords" autocomplete="off"></el-input>
      </el-form-item>

      <el-form-item label="验证码" prop="code">
        <el-col :span="15">
          <el-input v-model.number="ruleForm.code"></el-input>
        </el-col>
        <el-col :span="8" class="btn-code">
          <el-button @click="getSms()" :disabled="codeButtonStatus.status">{{codeButtonStatus.text}}</el-button>
        </el-col>
      </el-form-item>

      <el-form-item >
        <el-button class="btn" type="primary" @click="submitForm('ruleForm')">注册</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import { reactive, ref, isRef, toRefs, onMounted } from "@vue/composition-api";
import { GetSms, Register } from "@/api/login";
import { Message } from "element-ui";
export default {
  name: "register",
  setup(props, { refs, root }) {
    const codeButtonStatus = reactive({
      status: false,
      text: "获取验证码"
    });
    const time = ref(null);
    const checkCode = (rule, value, callback) => {
      if (!value) {
        return callback(new Error("验证码不能为空"));
      } else {
        callback(); //true
      }
    };
    const validateSno = (rule, value, callback) => {
      if (!value) {
        return callback(new Error("学号不能为空"));
      } else {
        callback(); //true
      }
    };
    const validateEmail = (rule, value, callback) => {
      if (!value) {
        return callback(new Error("邮箱不能为空"));
      } else if (!isEmail(value)) {
        return callback(new Error("邮箱格式有误"));
      } else {
        callback(); //true
      }
    };
    const validatePassword = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("密码不能为空"));
      } else {
        callback(); //true
      }
    };
    const validatePasswords = (rule, value, callback) => {
      console.log(ruleForm.password);
      if (value === "") {
        callback(new Error("重复密码不能为空"));
      } else if (value != ruleForm.password) {
        callback(new Error("两次密码不一致"));
      } else {
        callback(); //true
      }
    };
    //数据
    const isEmail = e => {
      return /^([a-zA-Z0-9]+[_|\_|\.]?)*[a-zA-Z0-9]+@([a-zA-Z0-9]+[_|\_|\.]?)*[a-zA-Z0-9]+\.[a-zA-Z]{2,3}$/.test(
        e
      );
    };
    const ruleForm = reactive({
      email: "",
      sno: "",
      password: "",
      passwords: "",
      code: ""
    });
    const rules = {
      email: [{ validator: validateEmail, trigger: "blur" }],
      sno: [{ validator: validateSno, trigger: "blur" }],
      password: [{ validator: validatePassword, trigger: "blur" }],
      passwords: [{ validator: validatePasswords, trigger: "blur" }],
      code: [{ validator: checkCode, trigger: "blur" }]
    };

    //函数
    const getSms = () => {
      let formData = new FormData();
      formData.append("mail", ruleForm.email);
      if (isEmail(ruleForm.email)) {
        GetSms(formData)
          .then(response => {
            console.log("11111");
            root.$message({
              showClose: true,
              message: "已成功发送请求",
              type: "success"
            });
            codeButtonStatus.status = true;
            countDown(60);
          })
          .catch(error => {
            console.log("22222");
            console.log(error);
          });
      } else {
        Message.error("请输入正确的邮箱");
        return false;
      }
    };
    const submitForm = formName => {
      refs[formName].validate(valid => {
        if (valid) {
          let requestData = new FormData();
          requestData.append("email", ruleForm.email);
          requestData.append("sno", ruleForm.sno);
          requestData.append("password", ruleForm.password);
          requestData.append("VertifyCode", ruleForm.code);
          Register(requestData)
            .then(response => {
              root.$message({
              showClose: true,
              message: "注册成功",
              type: "success"
            })
              root.$router.push({
                  name: "Index"
                });
              console.log(response);
            })
            .catch(error => {
              console.log(error);
            });
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    };

    const updataButtonStatus = data => {
      codeButtonStatus.status = data.status;
      codeButtonStatus.text = data.text;
    };

    const countDown = num => {
      if (time.value) {
        clearInterval(time.value);
      }
      let count = num;
      time.value = setInterval(() => {
        count--;
        if (count == 0) {
          clearInterval(time.value);
          updataButtonStatus({
            status: false,
            text: "再次获取"
          });
        } else {
          codeButtonStatus.text = `倒计时${count}秒`;
        }
      }, 1000);
    };

    onMounted();
    return {
      ruleForm,
      rules,
      submitForm,
      getSms,
      codeButtonStatus
    };
  }
};
</script>
<style lang="scss" scoped>
html, body{
	width: 100%;
	height:100%;
	margin: 0;
}
#login {
  position: absolute;
  height: 100%;
  width: 100%;
  background: url("../img/bg.jpg") no-repeat;
  background-size: cover;
}
h1 {
  font-weight: 900;
  letter-spacing: 1.5px;
  color: #333;
  font-size: 23px;
  text-transform: uppercase;
  margin: 0;
  text-align: center;
  margin-bottom: 5%;
}
.register-page {
  position: relative;
  top: 10vh;
  -webkit-border-radius: 5px;
  border-radius: 5px;
  margin: 0 auto;
  width: 500px;
  padding: 35px 35px 15px;
  background: #fff;
  border: 1px solid #eaeaea;
  box-shadow: 0 0 25px #cac6c6;
}
.btn{
  position: relative;
  margin-right: 10%;
  width: 100%;
}
.btn-code{
  margin-left: 4%;
}
</style>
