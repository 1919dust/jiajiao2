<template>
  <div  class="main" >
    <el-container style="background-color:#545c64;display: flex;
                  justify-content: center;
                  align-items: center;letter-spacing:2px;">
      <div style="margin-right: 100px;">
        <img src="../assets/logo_word.png" width="170px" height="45px" >
      </div>
      <div>
        <el-menu
            :default-active="activeIndex2"
            class="el-menu-demo"
            mode="horizontal"
            @select="handleSelect"
            background-color="#545c64"
            text-color="#fff"
            active-text-color="#ffd04b"
            router
        >
          <el-menu-item index="/" style="width: 150px; " align="center">首页</el-menu-item>
          <el-menu-item index="/selectTeacher" style="width: 150px; " align="center">找教员</el-menu-item>
          <el-menu-item index="/selectStudent" style="width: 150px; " align="center">找学员</el-menu-item>

          <el-menu-item index="/about" style="width: 150px; " align="center">关于平台</el-menu-item>
        </el-menu>
      </div>
      <div v-if="user.sname" style="margin-left: 200px">
        <el-dropdown style="width:120px;cursor: pointer">
          <div style="display: inline-block">
            <img :src="user.savatar" alt=""
                 style="width: 30px; border-radius: 50%; position: relative; top: 10px; right: 5px">
            <span style="color: white">{{ user.sname }}</span><i class="el-icon-arrow-down" style="margin-left: 5px;color: white"></i>
          </div>
          <el-dropdown-menu slot="dropdown" router>
            <el-dropdown-item @click.native="person">个人信息</el-dropdown-item>
            <el-dropdown-item @click.native="logout">退出</el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
      </div>
      <div v-else-if="user.teachername" style="margin-left: 200px">
        <el-dropdown style="width:120px;cursor: pointer">
          <div style="display: inline-block">
            <img :src="user.personimg" alt=""
                 style="width: 30px; border-radius: 50%; position: relative; top: 10px; right: 5px">
            <span style="color: white">{{ user.teachername }}</span><i class="el-icon-arrow-down" style="margin-left: 5px;color: white"></i>
          </div>
          <el-dropdown-menu slot="dropdown" router>
            <el-dropdown-item @click.native="person">个人信息</el-dropdown-item>
            <el-dropdown-item @click.native="logout">退出</el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
      </div>
      <div v-else style="margin-left: 200px" >
        <router-link to="/login2" style="text-decoration: none"><el-button type="text" >登录</el-button></router-link>
        <span style="margin-top: 18px" >|</span>
        <router-link to="/login2" style="text-decoration: none"><el-button type="text" >注册</el-button></router-link>
      </div>
    </el-container>

    <!--    搜索框-->
    <div style="margin:20px 0 20px 5%;padding: 10px;width: 90%;border-style: outset;border-radius: 12px;">
      <el-select v-model="ssubject" placeholder="请选择科目" style="width: 200px;margin: 0 15px 0 55px" suffix-icon="el-icon-user">
        <el-option label="语文" value="语文"></el-option>
        <el-option label="数学" value="数学"></el-option>
        <el-option label="英语" value="英语"></el-option>
        <el-option label="政治" value="政治"></el-option>
        <el-option label="历史" value="历史"></el-option>
        <el-option label="地理" value="地理"></el-option>
        <el-option label="物理" value="物理"></el-option>
        <el-option label="化学" value="化学"></el-option>
        <el-option label="生物" value="生物"></el-option>
      </el-select>

      <el-select v-model="ssex" placeholder="请选择性别" style="width: 200px;margin: 0 15px 0 15px" suffix-icon="el-icon-user">
        <el-option label="男" value="男"></el-option>
        <el-option label="女" value="女"></el-option>
      </el-select>

      <el-cascader
          placeholder="试试搜索：初一"
          :options="grade"
          filterable
          v-model="sgrade"
          :props="{emitPath:false}"></el-cascader>
      <el-input style="width: 200px;margin: 0 30px 0 15px" placeholder="直接输入学员名称" v-model="sname"></el-input>
      <el-button style="margin-right: 10px;width: 100px;background-color: #42b983" icon="el-icon-search" type="primary" @click="load">搜索</el-button>
      <el-button style="width: 100px" type="warning" icon="el-icon-refresh" @click="reset">重置</el-button>
    </div>

<!--    教员-->
    <div class="photo">

      <div v-for="item in tableData" @click="detail(item)">
        <div class="box1">
          <el-row>
            <el-cor :span="5"><img :src="item.savatar" alt="" style="width: 70px;height: 70px;margin-left: 30%"></el-cor>
          </el-row>
          <el-form label-width="80px" class="demo-ruleForm">
            <el-form-item label="学员名称" style="height: 20px">
              {{item.sname}}
            </el-form-item>
            <el-form-item label="性别" style="height: 20px">
              {{item.ssex}}
            </el-form-item>
            <el-form-item label="补习科目" style="height: 20px">
              {{item.ssubject}}
            </el-form-item>
            <el-form-item label="就读年级" style="height: 20px">
              {{item.sgrade}}
            </el-form-item>
            <el-form-item label="授课时薪" style="height: 20px">
              {{item.sprice}}
            </el-form-item>
          </el-form>
        </div>
      </div>
    </div>

<!--    分页-->
    <div style="padding: 10px;margin-left: 35%">
      <el-pagination
          @size-change = "handleSIzeChange"
          @current-change = "handleCurrentChange"
          :current-page="pageNum"
          :page-sizes="[20]"
          :page-size="5"
          layout="total, sizes, prev, pager, next, jumper"
          :total="total">
      </el-pagination>
    </div>

    <!--    底部-->
    <div>
      <div style="display: flex;
                justify-content: center;
                align-items: center;
                letter-spacing:2px;
                line-height:30px;
                width:100%;
                height:150px;
                background-color:#545c64;">
        <img src="../assets/logo.png" style="width: 110px;height: 100px;margin:0 50px 0 50px;">
        <el-divider direction="vertical" ></el-divider>
        <p style="margin:0 50px 0 50px;">
          我是学员<br>
          请家教流程<br>
          挑选合适教员<br>
        </p >
        <el-divider direction="vertical" ></el-divider>
        <p style="margin:0 50px 0 50px;">
          我是教员<br>
          如何预约订单<br>
          预约订单<br>
        </p>
        <el-divider direction="vertical" ></el-divider>
        <p style="margin:0 50px 0 50px;" >
          关于我们<br>
          平台简介<br>
          联系我们<br>
        </p>
      </div>
      <div style="display: flex;width: 100%;justify-content: center;">
        <p>© 20022－2022版权所有：2020数据科学与大数据技术3-20200060321 | 粤ICP备xxxxxxxx号-x</p>
      </div>
    </div>

    <!--    详情界面-->
    <el-dialog title="学员详情" :visible.sync="detailshow" center width="30%" >
      <el-descriptions direction="vertical" :column="4" border>

        <el-descriptions-item label="学员编号">{{ studentform.id  }}</el-descriptions-item>
        <el-descriptions-item label="学员名称">{{ studentform.sname  }}</el-descriptions-item>
        <el-descriptions-item label="性别" :span="2">{{ studentform.ssex }}</el-descriptions-item>
        <el-descriptions-item label="手机号">{{ studentform.sphone }}</el-descriptions-item>
        <el-descriptions-item label="联系地址" :span="3">{{ studentform.saddress }}</el-descriptions-item>
        <el-descriptions-item label="备注">
          <el-tag size="small">学员</el-tag>
        </el-descriptions-item>
        <el-descriptions-item label="就读年级" :span="4">{{studentform.sgrade}}</el-descriptions-item>
        <el-descriptions-item label="补习科目" >{{studentform.ssubject}}</el-descriptions-item>
        <el-descriptions-item label="授课时薪" :span="5">{{studentform.sprice}}</el-descriptions-item>
        <el-descriptions-item label="要求" >{{studentform.srequest}}</el-descriptions-item>
      </el-descriptions>
      <div style="margin:20px 0 20px 38%" >
        <el-button type="success" round @click="booking">预约学员</el-button>
      </div>

    </el-dialog>



  </div>
</template>

<script>
import request from "@/utils/request";


export default {
  name:'selectStudent',
  data() {
    return {
      tableData:[],
      activeIndex2: '1',
      //详情界面
      detailshow:false,
      //  教员信息
      total:0,
      pageNum: 1,
      pageSize: 12,
      sname: "",
      ssex:"",
      sgrade:"",
      ssubject: "",
      //详情信息
      studentform:{},
      //预约
      yuyueform:{},

      grade:[
          {
        label:'小学',
        children:[{
          label:'低年级',
          children:[{
            value:'小学一年级',
            label:'一年级'
          },{
            value:'小学二年级',
            label:'二年级'
          },{
            value:'小学三年级',
            label:'三年级'
          }]
        },{
          label:'高年级',
          children:[{
            value:'小学四年级',
            label:'四年级'
          },{
            value:'小学五年级',
            label:'五年级'
          },{
            value:'小学六年级',
            label:'六年级'
          }]
        }]
      },{
        label:'初中',
        children:[{
          value:'初一',
          label:'一年级'
        },{
          value:'初二',
          label:'二年级'
        },{

          value:'初三',
          label:'三年级'
        }],
      },{
        label:'高中',
        children:[{
          value:'高一',
          label:'一年级'
        },{
          value:'高二',
          label:'二年级'
        },{
          value:'高三',
          label:'三年级'
        }],
      }],

      //  登录用户信息
      user: localStorage.getItem("user") ? JSON.parse(localStorage.getItem("user")) : {},
    };
  },
  created() {
    this.load()
  },
  methods: {
    reset(){
      this.sname = ""
      this.ssex = ""
      this.sgrade = ""
      this.ssubject = ""
      this.load()
    },
    //查询数据
    load() {
      request.get("/student/page", {
        params: {
          pageNum: this.pageNum,
          pageSize: this.pageSize,
          sname: this.sname,
          ssex: this.ssex,
          ssubject: this.ssubject,
          sgrade: this.sgrade
        }
      }).then(res => {
        this.tableData = res.records
        console.log(this.tableData)
        this.total = res.total
      })
    },
    //读取分页组件的当前页码，调用
    handleSIzeChange(pageSize){
      this.pageSize=pageSize
      this.load()
    },
    handleCurrentChange(pageNum){
      this.pageNum=pageNum
      this.load()
    },
    //教员详情界面
    detail(item) {
      this.detailshow = true
      this.studentform = item
    },
    //退出登录
    logout() {
      this.$router.push("/")
      localStorage.removeItem("user")
      this.$message.success("退出成功")
      location.reload()
    },
    //预约学员
    booking(){
      console.log(this.user.iden)
      if (this.user.iden==="家长"){
        this.$message({
          duration:2000,
          message:'请先注册教员身份',
          type:'error'
        })
      }else if(this.user.iden===undefined){
        this.$message({
          duration:2000,
          message:'请先登录',
          type:'error'
        })
      }else{
        this.yuyueform.studentid = this.studentform.id
        this.yuyueform.studentname = this.studentform.sname
        this.yuyueform.teacherid = this.user.id
        this.yuyueform.teachername = this.user.teachername
        console.log(this.yuyueform)
        // request.post("/booking?studentid="+this.user.id+"&studentname="+this.user.sname+"&teacherid="+this.teacherform.id+"&teachername="+this.teacherform.teachername).then(res =>{
        request.post("/booking",this.yuyueform).then(res =>{
          if (res){
            this.$message({
              duration:2000,
              message:'预约成功',
              type:'success'
            })
          }else{
            this.$message({
              duration:2000,
              message:'预约失败',
              type:'error'
            })
          }
        })
      }
    },
    person() {
      this.$router.push("/person")
    }
  }

}
</script>
<style>

body > .el-container {
  margin-bottom: 40px;
}

/*卡片话*/
.el-carousel__item h3 {
  color: #475669;
  font-size: 14px;
  opacity: 0.75;
  line-height: 200px;
  margin: 0;
}
.box1{
  width: 250px;
  height: 300px;
  border: 2px solid #eee;
  box-shadow: 10px 10px 12px 0 rgba(0, 0, 0, 0.1);
  margin:0 0 50px 70px;

}
.box1:hover{
  border: 2px solid #dbdbdb;
  box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
  background-color: #dbdbdb;
}
.main{
  box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
  width: 100%;
  min-height: 500px;
  background-color: white;
}
.photo{
  display: flex;
  margin: 0 5% 0 5%;
  width: 90%;
  flex-wrap:wrap;
  justify-content: left;
}
</style>

