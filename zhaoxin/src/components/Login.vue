<template>
  <div id="login_come">
    <h2>Welcome back</h2>
    <el-form
      :model="ruleForm"
      status-icon
      :rules="rules"
      ref="ruleForm"
      label-width="100px"
      class="demo-ruleForm"
      size="medium"
    >
      <el-form-item label="邮箱账号" prop="email" class="form-input inputtt">
        <el-input type="text" v-model="ruleForm.email" autocomplete="off"></el-input>
      </el-form-item>

      <el-form-item label="密码" prop="password" class="form-input inputtt">
        <el-input type="password" v-model="ruleForm.password" autocomplete="off"></el-input>
      </el-form-item>

      <el-form-item label="验证码" prop="code" class="form-input inputtt">
        <el-col :span="15">
          <el-input v-model.number="ruleForm.code"></el-input>
        </el-col>
        <el-col :span="8" class="block-code">
          <el-button @click="getSms()">获取验证码</el-button>
        </el-col>
      </el-form-item>

      <el-form-item class="form-input" style="margin-top : 20%">
        <el-button class="btn-block" type="primary" @click="submitForm('ruleForm')">提交</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import { reactive, ref, isRef, toRefs, onMounted } from "@vue/composition-api";
import { GetSms } from "@/api/login";
import { Message } from "element-ui";
export default {
  name: "login",
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
    //数据
    const ruleForm = reactive({
      email: "",
      password: "",
      code: ""
    });
    const rules = {
      password: [{ validator: validatePassword, trigger: "blur" }],
      email: [{ validator: validateEmail, trigger: "blur" }],
      code: [{ validator: checkCode, trigger: "blur" }]
    };

    //函数
    const getSms = () => {
        let requestData = {
          mail: ruleForm.email
        };
        if (isEmail(ruleForm.email)) {
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
        }else {
          Message.error('请输入正确的邮箱')
          return false;
        }
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
    const isEmail = e => {
      return /^([a-zA-Z0-9]+[_|\_|\.]?)*[a-zA-Z0-9]+@([a-zA-Z0-9]+[_|\_|\.]?)*[a-zA-Z0-9]+\.[a-zA-Z]{2,3}$/.test(
        e
      );
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
#login_come {
  width: 100%;
  height: 100%;

  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-around;
}
.btn-block {
  display: block;
  width: 100%;
}
.block-code {
  display: block;
  margin-left: 4%;
}

.form-input {
  width: 100%;
}

.inputtt {
  margin-top: 50px;
}
</style>
