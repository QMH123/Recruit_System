<template>
  <div id="login_come">
    <h2>一路工作室招新</h2>
    <el-form
      :model="ruleForm"
      status-icon
      :rules="rules"
      ref="ruleForm"
      label-width="100px"
      class="demo-ruleForm"
      size="medium"
    >
      <el-form-item label="学号" prop="sno" class="form-input inputtt">
        <el-input type="text" v-model="ruleForm.sno" autocomplete="off"></el-input>
      </el-form-item>

      <el-form-item label="密码" prop="password" class="form-input inputtt">
        <el-input type="password" v-model="ruleForm.password" autocomplete="off"></el-input>
      </el-form-item>

      <el-form-item class="form-input" style="margin-top : 20%">
        <el-button class="btn-block" type="primary" @click="submitForm('ruleForm')">提交</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import { reactive, ref, isRef, toRefs, onMounted } from "@vue/composition-api";
import { Login } from "@/api/login";
import { Message } from "element-ui";
export default {
  name: "login",
  setup(props, { refs, root }) {
    const validateSno = (rule, value, callback) => {
      if (value === "") {
        return callback(new Error("学号不能为空"));
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
      sno: "",
      password: ""
    });
    const rules = {
      password: [{ validator: validatePassword, trigger: "blur" }],
      sno: [{ validator: validateSno, trigger: "blur" }]
    };
    //函数
    const convert_FormData_to_json = formData => {
      let objData = {};

      formData.forEach((value, key) => (objData[key] = value));

      return JSON.stringify(objData);
    };
    const submitForm = formName => {
      refs[formName].validate(valid => {
        if (valid) {
          let requestData = new FormData();
          requestData.append("sno", ruleForm.sno);
          requestData.append("password", ruleForm.password);
          Login(requestData)
            .then(responce => {
              console.log(responce);
              if (responce.data.code === "200") {
                root.$message({
                  showClose: true,
                  message: "登录成功",
                  type: "success"
                });
                let data = convert_FormData_to_json(requestData);
                root.$store.commit("setuserInfo", data);
                root.$router.push({
                  name: "Commit"
                });
              } else {
                Message.error("学号或密码出错");
              }
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
    const isEmail = e => {
      return /^([a-zA-Z0-9]+[_|\_|\.]?)*[a-zA-Z0-9]+@([a-zA-Z0-9]+[_|\_|\.]?)*[a-zA-Z0-9]+\.[a-zA-Z]{2,3}$/.test(
        e
      );
    };
    onMounted();
    return {
      ruleForm,
      rules,
      submitForm
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
