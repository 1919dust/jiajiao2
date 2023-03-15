<template>
  <div id="sign-container">
    <div class="sign-head">
      <el-tabs v-model="activeName" @tab-click="handleClick" style="margin-left:170px;font-size: 20px;">
        <el-tab-pane label="登录" name="login1"></el-tab-pane>
        <el-tab-pane label="注册" name="sign1"></el-tab-pane>
      </el-tabs>
    </div>
    <el-form :model="ruleForm" status-icon :rules="rules" ref="ruleForm" label-width="50px" class="demo-ruleForm">
      <el-select v-model="ruleForm.value" placeholder="请选择教员身份" style="margin-left:50px;margin-bottom: 20px;width:350px">
        <el-option
            v-for="item in options"
            :key="item.value"
            :label="item.label"
            :value="item.value">
        </el-option>
      </el-select>
      <el-form-item  prop="iphone" :rules="[{type:'number',message:'联系电话必须为数字值'}]">
        <el-input type="text" v-model.number="ruleForm.iphone" autocomplete="off" placeholder="请输入联系电话"></el-input>
      </el-form-item>
      <el-form-item  prop="pass">
        <el-input :type="[flag?'text':'password']" v-model="ruleForm.pass" autocomplete="off" placeholder="请输入密码（长度不小于6位）" prefix-icon="el-icon-lock">
          <i  slot="suffix"
              :class="[flag?'el-icon-minus':'el-icon-view']"
              style="margin-top:8px;font-size:18px;"
              autocomplete="auto"
              @click="flag=!flag" />
        </el-input>
      </el-form-item>
      <el-form-item  prop="pass1">
        <el-input type="password" v-model="ruleForm.pass1" autocomplete="off" placeholder="请再次输入密码（长度不小于6位）" prefix-icon="el-icon-lock">
          <i  slot="suffix"
              :class="[flag?'el-icon-minus':'el-icon-view']"
              style="margin-top:8px;font-size:18px;"
              autocomplete="auto"
              @click="flag=!flag" />
        </el-input>
      </el-form-item>
      <el-checkbox v-model="checked" style="margin-left:50px;top:-10px">注册即同意《用户协议》《免责声明》《隐私保护》</el-checkbox>
      <el-form-item style="margin-left:100px">
        <el-button type="primary" @click="submitForm('ruleForm')">注册</el-button>
        <el-button @click="resetForm('ruleForm')">重置</el-button>

      </el-form-item>
    </el-form>
  </div>
</template>

<script>
const idenOptions = ['大学生', '家长', '老师'];

// import axios from 'axios'
export default {
  name: "sign",
  data() {
    var chedkiphone = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请输入联系电话'));
      } else {
        callback();
      }
    };
    var checkpwd = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请输入密码'));
      } else {
        callback();
      }
    };
    var checkpwd1 = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请输入密码'));
      } else {
        if(this.ruleForm.pass !== value){
          callback(new Error('两次密码输入不一致'));
        }
        callback();
      }
    };
    var checkiden = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请选择身份'));
      } else {
        callback();
      }
    };



    return {
      ruleForm: {
        iphone: '',
        pass: '',
        pass1:'',
        iden: '',
        flag: false
      },
      rules: {
        iphone: [
          { validator: chedkiphone, trigger: 'blur' }
        ],
        pass: [
          { validator: checkpwd, trigger: 'blur' }
        ],
        pass1: [
          { validator: checkpwd1, trigger: 'blur' }
        ],
        iden: [
          { validator: checkiden, trigger: 'blur' }
        ]
      },
      isLogin:false,

      // 身份
      options: [{
        value: '选项1',
        label: '大学生（在读本科/研究生/博士升）'
      }, {
        value: '选项2',
        label: '专业教师（机构/专职家教且有教资）'
      }, {
        value: '选项3',
        label: '其他教员（毕业生/机构/其他从业人员且无教资）'
      }],
      value: ''
    };
  },
  methods: {
    submitForm(formName) {

      this.$message.success("登录成功!!!");
      this.$router.push({path: "/"});
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
    }
  }
}
</script>

<style scoped>
body{
  margin: 0;
}
#sign-container{
  width: 400px;
  background: #e5e9f2;
  position: absolute;
  left: 50%;
  top: 50%;
  margin-left: -220px;
  margin-top: -170px;
  border-radius: 5px;
  padding-top: 40px;
  padding-right: 40px;
}
#sign-head{
  width:300px;
  background-color: blue;
}
</style>