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
import { GetSms, Register } from "@/api/login";
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
            // root.$message({
            //   showClose: true,
            //   message: response,
            //   type: "success"
            // });
            console.log(response);
          })
          .catch(error => {
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
