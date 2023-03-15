<template>
  <div>
    <div class="head">
      <img src="../assets/logo.png"  style="margin-left: 400px">
      <div style="margin-left: 5%;">
        <h1>欢迎登录XX家教平台</h1>
      </div>
      <el-button  style="margin:20px 0 0 17%;height: 40px">
        <router-link to="/" type="danger" class="returnindex" >返回首页</router-link>
      </el-button>
    </div>
    <div class="wrapper">
    <div style="margin:0 0 0 10px">
      <span>&emsp;</span>
    </div>
    <div id="login-container" >
      <div style="text-align: center;">
        <el-tabs v-model="activeName"  style="height: 380px; " stretch >
      <!--    家长/教员登录窗口-->
          <el-tab-pane label="登录" name="login111" >
            <el-form :model="user" status-icon :rules="loginrules" ref="rulelogin" label-width="100px" class="demo-ruleForm" style="margin-top:30px">
              <el-form-item label="账号" prop="account" style="margin-top:30px">
                <el-input type="text" v-model="user.account" autocomplete="off"></el-input>
              </el-form-item>
              <el-form-item label="密码" prop="password" style="margin-top:40px">
                <el-input type="password" v-model="user.password" autocomplete="off" show-password></el-input>
              </el-form-item>
              <el-form-item label="身份" prop="iden" >
                <el-radio-group v-model="user.iden">
                  <el-radio :label="0">家长</el-radio>
                  <el-radio :label="1">教员</el-radio>
                </el-radio-group>
              </el-form-item>
              <br>
              <el-form-item>
                <el-button type="primary" @click="login">登录</el-button>
                <el-button @click="resetForm('rulelogin')">重置</el-button>
              </el-form-item>
            </el-form>
            <br>
            <el-link icon="el-icon-s-custom" style="left: 38%;" @click="loginadmin">管理员登录</el-link>
          </el-tab-pane>

      <!--    家长/教员注册窗口-->
          <el-tab-pane label="注册" name="sign111">

            <el-form :model="signform" status-icon :rules="rules" ref="rulesign" label-width="100px" class="demo-ruleForm">
              <el-form-item label="用户名" prop="teachername">
                <el-input type="text" v-model="signform.teachername" autocomplete="off"></el-input>
              </el-form-item>
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
              <el-checkbox style="margin-left:50px;top:-10px">注册即同意《用户协议》《免责声明》《隐私保护》</el-checkbox>
              <el-form-item>
                <el-button type="primary" @click="register">注册</el-button>
                <el-button @click="resetForm('rulesign')">重置</el-button>
              </el-form-item>

            </el-form>


          </el-tab-pane>
        </el-tabs>
      </div>
    </div>
      <!--    管理员登录窗口-->
      <el-dialog title="管理员登录" :visible.sync="adminshow" center width="30%">
      <el-form :model="admin" status-icon :rules="adminrules" ref="ruleadmin" label-width="100px">
        <el-form-item label="名称" prop="name">
          <el-input v-model="admin.name" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="账号" prop="account">
          <el-input v-model="admin.account" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="密码" prop="password">
          <el-input type="password" v-model="admin.password" autocomplete="off" show-password></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button type="primary" @click="adminlogin">确 定</el-button>
        <el-button @click="adminshow = false">取 消</el-button>
      </div>
    </el-dialog>
  </div>
    <div style="display: flex;width: 100%;justify-content: center;">
      <p>© 20022－2022版权所有：2020数据科学与大数据技术3-20200060321 | 粤ICP备xxxxxxxx号-x</p>
    </div>
  </div>
</template>


<script>


// import axios from 'axios'
export default {
  name: "login2",
  data() {
    var checkPass = (rule, value, callback) => {
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
      signform: {},
      rules: {
        account: [
          { required: true, message: '请输入账号', trigger: 'blur' },
          { min: 3, max: 10, message: '长度在 3 到 5 个字符', trigger: 'blur' }
        ],
        password: [
          { required: true, message: '请输入密码', trigger: 'blur' },
          { min: 3, max: 10, message: '长度在 3 到 5 个字符', trigger: 'blur' }
        ],
        checkPass: [
          { required: true,validator: checkPass, trigger: "change" },
          { min: 6, max: 15, message: '长度在 6 到 15 个字符', trigger: 'change' }
        ],
      },
      user: {},
      loginrules: {
        account: [
          { required: true, message: '请输入账号', trigger: 'blur' },
          { min: 3, max: 10, message: '长度在 3 到 5 个字符', trigger: 'blur' }
        ],
        password: [
          { required: true, message: '请输入密码', trigger: 'blur' },
          { min: 3, max: 10, message: '长度在 3 到 5 个字符', trigger: 'blur' }
        ]
      },
      admin:{},
      adminrules:{
        account: [
          { required: true, message: '请输入账号', trigger: 'blur' },
          { min: 3, max: 10, message: '长度在 3 到 5 个字符', trigger: 'blur' }
        ],
        password: [
          { required: true, message: '请输入密码', trigger: 'blur' },
          { min: 3, max: 10, message: '长度在 3 到 5 个字符', trigger: 'blur' }
        ]
      },

      isLogin:false,

      activeName: 'login111',

      selectiden:[
          {
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

    resetForm(formName) {
      this.$refs[formName].resetFields();

    },
    //管理员登录界面
    loginadmin(){
      this.adminshow=true
    },
    //返回首页
    returnindex(){
      this.$router.push("/")
    },
    login() {
      this.$refs['rulelogin'].validate((valid) => {
        console.log(this.user)
        if (valid) {  // 表单校验合法
          //0-家长，1-教员
          if(this.user.iden=="0"){
            this.request.post("/student/login", this.user).then(res => {
              if(res.code === '200') {
                localStorage.setItem("user", JSON.stringify(res.data))  // 存储用户信息到浏览器
                this.$router.push("/")
                this.$message({
                  duration:2000,
                  message:"登陆成功",
                  type:'success'
                })
              } else {
                this.$message.error(res.msg)
              }
            })
          }else {
            this.request.post("/teacher/login", this.user).then(res => {
              if(res.code === '200') {
                localStorage.setItem("user", JSON.stringify(res.data))  // 存储用户信息到浏览器
                this.$router.push("/")
                this.$message({
                  duration:2000,
                  message:"登陆成功",
                  type:'success'
                })
              } else {
                this.$message.error(res.msg)
              }
            })
          }

        } else {
          return false;
        }
      });
    },
    register() {
      console.log(this.signform)
      this.$refs['rulesign'].validate((valid) => {
        if (valid) {  // 表单校验合法
          if(this.signform.iden==="家长"){
            this.request.post("/student/register", this.signform).then(res => {
              if(res.code === '200') {
                this.$message({
                  duration:2000,
                  message:"注册成功",
                  type:'success'
                })
                this.activeName= 'login111'
              } else {
                this.$message.error(res.msg)
              }
            })
      }else{
              this.request.post("/teacher/register", this.signform).then(res => {
                if(res.code === '200') {
                  this.$message({
                    duration:2000,
                    message:"注册成功",
                    type:'success'
                  })
                  this.activeName= 'login111'
                } else {
                  this.$message.error(res.msg)
                }
              })
          }
        } else {
          return false;
        }
      });
    },
    adminlogin(){
      this.$refs['ruleadmin'].validate((valid) => {
        if (valid) {
          this.request.post("/admin/login", this.admin).then(res => {
            if(res.code === '200') {
              localStorage.setItem("admin", JSON.stringify(res.data))  // 存储用户信息到浏览器
              this.$router.push("/manage/teacher")
              this.$message({
                duration:2000,
                message:"登录成功",
                type:'success'
              })
            } else {
              this.$message({
                duration:2000,
                message:res.msg,
                type:'error'
              })
            }
          })
        }else {
          return false;
        }
      })
    },

  }
}
</script>

<style scoped>

#login-container{
  width: 400px;
  height: 450px;
  background: #e5e9f2;
  /*position: absolute;*/
  /*left: 70%;*/
  /*top: 40%;*/
  /*margin-left: -220px;*/
  /*margin-top: -170px;*/
  margin: 5% 0 0 50%;
  border-radius: 10px;
  padding-top: 40px;
  padding-right: 40px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, .12), 0 0 6px rgba(0, 0, 0, .04)

}
.wrapper{
  background-image: url("../assets/card/login.png");
  /*width: 100%;*/
  height: 600px;
  background-size: cover;

}
.returnindex{
  font-size: 15px;
  text-decoration: none;
}
.returnindex :hover{
  color: red;
}
.head{
  display: flex;
  width: 100%;
  height: 70px;
}
.head span{
  font-size: 30px;
  align-items: center;
  justify-content: space-around;
  flex-direction: column;
  margin: 0 0 10px 0;
}
img{
  width: 70px;
}
</style>