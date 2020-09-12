<template>
    <div class="box">
        <el-steps :active="index" finish-status="success" simple style="width: 100%">
            <el-step title="提交报名表"></el-step>
            <el-step title="提交招新题"></el-step>
            <el-step title="等待审核"></el-step>
        </el-steps>
        <div v-if="index==0" class="tabbar">
            <el-row :sm="8" :md="4" :lg="2">
                <el-form  status-icon :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
                    <el-form-item size="small" label="姓名" prop="checkName">
                        <el-input  type="text"  autocomplete="off" v-model="ruleForm.name" style="width: 200px;"
                                  placeholder="请输入姓名"></el-input>
                    </el-form-item>
                    <el-form-item label="性别">
                        <el-radio v-model="radio1" label="男">男</el-radio>
                        <el-radio v-model="radio1" label="女">女</el-radio>
                    </el-form-item>
                    <el-form-item label="意向方向">
                        <el-radio v-model="radio2" label="前端">前端</el-radio>
                        <el-radio v-model="radio2" label="后端">后端</el-radio>
                    </el-form-item>
                    <el-form-item>
                        <el-button type="primary" @click="submitForm('ruleForm')">提交</el-button>
                    </el-form-item>
                </el-form>
            </el-row>
        </div>
        <div v-else-if="index==1" class="tabbar">
            <el-upload
                    class="upload-demo"
                    drag
                    action="#"
                    :http-request="uploadSecondFile"
                    :multiple="false">
                <i class="el-icon-upload"></i>
                <div class="el-upload__text">将文件拖到此处，或<em>点击上传</em></div>
                <div class="el-upload__tip" slot="tip">请将所有题目打包后上传，并命名为“学号-姓名”</div>
            </el-upload>
        </div>
        <div v-else-if="index==2" class="tabbar">
            <img src="../img/Success.png" style="height: 100px;width: 100px;margin: 0 auto;"/>
            <p>提交成功，请等待审核，最终结果将在招新群里发布</p>
        </div>
    </div>
</template>

<script>
    export default {
        name: "Commit",
        data() {
            var validateName = (rule, value, callback) => {
                if (value === '') {
                    callback(new Error('姓名不能为空！'));
                } else {
                    if (this.ruleForm.name !== '') {
                        this.$refs.ruleForm.validateField('checkName');
                    }
                    callback();
                }
            };
            return {
                index:0,
                radio1:'男',
                radio2:'前端',
                ruleForm: {
                    name: '',
                },
                rules: {
                    checkName: [
                        { validator: validateName, trigger: 'blur' }
                    ]
                }
            };
        },
        methods: {
            submitForm(){
                let that = this
                $.ajax({
                    url: "http://175.24.63.102:8181/addInfo",
                    data: JSON.stringify({
                        "major": that.radio2,
                        "name": that.ruleForm.name,
                        "sex": that.radio1,
                        "sno": "2018091609016"
                    }),
                    type: "POST",
                    dataType: "json",
                    contentType:'application/json',
                    success: function(data) {
                        console.log(data)
                    }
                });
            }
        }
    }
</script>

<style scoped>
    .box{
        width: 100%;
        height: 100%;
    }
    .tabbar{
        width: 350px;
        margin: 100px auto;
        text-align: center;
    }
    .tabbar img{
        margin-top: 50px;
        margin: 100px auto;
    }
</style>