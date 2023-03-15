<template>
  <div id="login-container" >
    <div style="text-align: center;">
      <el-tabs v-model="activeName"  style="height: 380px; " stretch >

        <el-tab-pane label="登录" name="111" >

          <el-form :model="loginform" status-icon :rules="loginrules" ref="rulelogin" label-width="100px" class="demo-ruleForm" style="margin-top:30px">
            <el-form-item label="账号" prop="account" style="margin-top:30px">
              <el-input type="text" v-model="loginform.account" autocomplete="off"></el-input>
            </el-form-item>
            <el-form-item label="密码" prop="password" style="margin-top:40px">
              <el-input type="password" v-model="loginform.password" autocomplete="off" show-password></el-input>
            </el-form-item>



            <el-form-item style="margin-top:40px">
              <el-button type="primary" @click="submitForm('rulelogin')">登录</el-button>
              <el-button @click="resetForm('rulelogin')">重置</el-button>
            </el-form-item>
          </el-form><br>
          <el-link icon="el-icon-s-custom" style="left: 38%" @click="loginadmin">管理员登录</el-link>
        </el-tab-pane>


        <el-tab-pane label="注册" name="222">

          <el-form :model="signform" status-icon :rules="rules" ref="rulesign" label-width="100px" class="demo-ruleForm">
            <el-form-item label="账号" prop="account">
              <el-input type="text" v-model="signform.account" autocomplete="off"></el-input>
            </el-form-item>
            <el-form-item label="密码" prop="password">
              <el-input type="password" v-model="signform.password" autocomplete="off" show-password></el-input>
            </el-form-item>
            <el-form-item label="确认密码" prop="checkPass">
              <el-input type="password" v-model="signform.checkPass" autocomplete="off" show-password></el-input>
            </el-form-item>
            <el-form-item label="注册身份">
              <div class="block">
                <el-cascader
                    placeholder="试试搜索：大学生"
                    :options="selectiden"
                    filterable
                    v-model="signform.iden"
                    :props="{emitPath:false}"></el-cascader>
              </div>
            </el-form-item>
            <el-checkbox v-model="checked" style="margin-left:50px;top:-10px">注册即同意《用户协议》《免责声明》《隐私保护》</el-checkbox>
            <el-form-item>
              <el-button type="primary" @click="submitForm('rulesign')">注册</el-button>
              <el-button @click="resetForm('rulesign')">重置</el-button>
            </el-form-item>

          </el-form>


        </el-tab-pane>

      </el-tabs>

    </div>

<!--    <el-dialog-->
<!--        title="提示"-->
<!--        :visible.sync="adminshow"-->
<!--        width="10px"-->
<!--        center-->
<!--        :append-to-body="true"-->
<!--        :modal-append-to-body="false">-->
<!--      <el-tab-pane label="登录" name="login" >-->
<!--        <el-form :model="adminform" status-icon :rules="adminrules" ref="ruleaddmin" label-width="100px" class="demo-ruleForm">-->
<!--          <el-form-item label="账号" prop="account">-->
<!--            <el-input type="text" v-model="adminform.account" autocomplete="off"></el-input>-->
<!--          </el-form-item>-->
<!--          <el-form-item label="密码" prop="password">-->
<!--            <el-input type="password" v-model="adminform.password" autocomplete="off" show-password></el-input>-->
<!--          </el-form-item>-->
<!--          <el-form-item >-->
<!--            <el-button type="primary" @click="submitForm('adminform')">登录</el-button>-->
<!--            <el-button @click="adminshow=false">取消</el-button>-->
<!--          </el-form-item>-->
<!--        </el-form>-->
<!--      </el-tab-pane>-->
<!--    </el-dialog>-->
  </div>

</template>


<script>


// import axios from 'axios'
export default {
  name: "login",
  data() {
    var validatePass = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请输入账户'));
      } else {
        if (this.loginform.password !== '') {
          this.$refs.ruleForm.validateField('password');
        }
        callback();
      }
    };
    var validatePass2 = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请输入密码'));
      } else {
        callback();
      }
    };
    var validatePass3 = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请再次输入密码'));
      } else if (value !== this.signform.password) {
        callback(new Error('两次输入密码不一致!'));
      } else {
        callback();
      }
    };


    return {
      adminshow:false,
      signform: {
        account:'',
        password: '',
        checkPass: '',
        iden: ''
      },
      rules: {
        account: [
          { validator: validatePass, trigger: 'blur' }
        ],
        password: [
          { validator: validatePass2, trigger: 'blur' }
        ],
        checkPass: [
          { validator: validatePass3, trigger: 'blur' }
        ],
      },
      loginform: {
        account: '',
        password: '',
        iden: '',
      },
      loginrules: {
        account: [
          { validator: validatePass, trigger: 'blur' }
        ],
        password: [
          { validator: validatePass2, trigger: 'blur' }
        ],
        iden: [
          { validator: validatePass2, trigger: 'blur' }
        ]
      },
      isLogin:false,


      activeName: '111',

      selectiden:[{
        value: '家长',
        label: '家长'
      },{
        value: '教员',
        label: '教员',
        children:[{
          value:'大学生（在读本科/研究生/博士生）',
          label:'大学生（在读本科/研究生/博士生）',
        },{
          value: '专业教师（机构/专职家教且有教资）',
          label: '专业教师（机构/专职家教且有教资）'
        },{
          value:'其他教员（毕业生/机构/其他从业人员且无教资）',
          label:'其他教员（毕业生/机构/其他从业人员且无教资）',
        }]
      }]
    };
  },
  methods: {
    submitForm(formName) {

      this.$message.success("登录成功!!!");
      this.$router.push({path: "/"});
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
    },
    loginadmin(){
      this.adminshow=true
    }
  }
}
</script>

<style scoped>
body{
  margin: 0;
}
#login-container{
  width: 400px;
  background: #e5e9f2;
  position: absolute;
  left: 50%;
  top: 40%;
  margin-left: -220px;
  margin-top: -170px;
  border-radius: 10px;
  padding-top: 40px;
  padding-right: 40px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, .12), 0 0 6px rgba(0, 0, 0, .04)
}

</style>