<template>
  <div id="login">
    <el-form
      :model="ruleForm"
      status-icon
      :rules="rules"
      ref="ruleForm"
      label-width="100px"
      class="demo-ruleForm"
      size="medium"
    >
      <el-form-item label="邮箱账号" prop="email">
        <el-input type="text" v-model="ruleForm.email" autocomplete="off"></el-input>
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
        <el-col :span="8" class="block-code">
          <el-button @click="getSms()">获取验证码</el-button>
        </el-col>
      </el-form-item>

      <el-form-item>
        <el-button class="btn-block" type="primary" @click="submitForm('ruleForm')">注册</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import { reactive, ref, isRef, toRefs, onMounted } from "@vue/composition-api";
import { GetSms } from "@/api/login";
import { Message } from "element-ui";
export default {
  name: "register",
  setup(props, { refs, root }) {
    const checkCode = (rule, value, callback) => {
      if (!value) {
        return callback(new Error("验证码不能为空"));
      } else {
        callback(); //true
      }
    };
    const validateEmail = (rule, value, callback) => {
      if (!value) {
        return callback(new Error("邮箱不能为空"));
      }else if(!isEmail(value)){
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
      password: "",
      passwords: "",
      code: ""
    });
    const rules = {
      password: [{ validator: validatePassword, trigger: "blur" }],
      passwords: [{ validator: validatePasswords, trigger: "blur" }],
      email: [{ validator: validateEmail, trigger: "blur" }],
      code: [{ validator: checkCode, trigger: "blur" }]
    };

    //函数
    const getSms = () => {
      if (ruleForm.email == "") {
        root.$message.error("邮箱不能为空！！");
        return false;
      }
      let requestData = {
        email: ruleForm.email
      };
      GetSms(requestData)
        .then(response => {
          root.$message({
            showClose: true,
            message: response,
            type: "success"
          });
        })
        .catch(error => {
          console.log(error);
        });
    };
    const submitForm = formName => {
      refs[formName].validate(valid => {
        console.log(valid);
        if (valid) {
          console.log("submit!");
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    };

    onMounted();
    return {
      ruleForm,
      rules,
      submitForm,
      getSms
    };
  }
};
</script>
<style lang="scss" scoped>
#login {
  width: 30%;
  position: absolute;
  left: 35%;
  top: 20%;
}
.btn-block {
  display: block;
  width: 100%;
}
.block-code {
  display: block;
  margin-left: 4%;
}
</style>
