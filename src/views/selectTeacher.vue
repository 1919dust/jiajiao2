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
      <el-select v-model="subject" placeholder="请选择科目" style="width: 200px;margin: 0 15px 0 55px" suffix-icon="el-icon-user">
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

      <el-select v-model="sex" placeholder="请选择性别" style="width: 200px;margin: 0 15px 0 15px" suffix-icon="el-icon-user">
        <el-option label="男" value="男"></el-option>
        <el-option label="女" value="女"></el-option>
      </el-select>

      <el-select v-model="iden" placeholder="请选择教员身份" style="width: 200px;margin: 0 15px 0 15px" suffix-icon="el-icon-user">
        <el-option label="大学生（在读本科/研究生/博士生）" value="大学生"></el-option>
        <el-option label="专业教师（机构/专职家教且有教资）" value="专业教师"></el-option>
        <el-option label="其他教员（毕业生/机构/其他从业人员且无教资）" value="其他教员"></el-option>
      </el-select>
      <el-input style="width: 200px;margin: 0 30px 0 15px" placeholder="直接输入教员名称" v-model="teachername"></el-input>
      <el-button style="margin: 0 20px 0 10px;width: 100px;background-color: #42b983" icon="el-icon-search" type="primary" @click="load">搜索</el-button>
      <el-button style="width: 100px" type="warning" icon="el-icon-refresh" @click="reset">重置</el-button>
    </div>
    <!--    教员-->
    <div class="photo">
      <div v-for="item in tableData" @click="detail(item)">
        <div class="box1">
          <el-row>
            <el-cor :span="5"><img :src="item.personimg" alt="" style="width: 70px;height: 80px;margin-left: 35%"></el-cor>
          </el-row>
          <el-form label-width="80px" class="demo-ruleForm">
            <el-form-item label="教师名称" style="height: 20px">
              {{item.teachername}}老师
            </el-form-item>
            <el-form-item label="性别" style="height: 20px">
              {{item.sex}}
            </el-form-item>
            <el-form-item label="教学科目" style="height: 20px">
              {{item.subject}}
            </el-form-item>
            <el-form-item label="身份" style="height: 20px">
              {{item.iden}}
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
    <el-dialog title="教员详情" :visible.sync="detailshow" center width="30%">
      <el-descriptions direction="vertical" :column="4" border>

        <el-descriptions-item label="教员编号">{{ teacherform.id }}</el-descriptions-item>
        <el-descriptions-item label="教员名称">{{ teacherform.teachername }}</el-descriptions-item>
        <el-descriptions-item label="性别" :span="2">{{ teacherform.sex }}</el-descriptions-item>
        <el-descriptions-item label="手机号">{{ teacherform.phone }}</el-descriptions-item>
        <el-descriptions-item label="联系地址" :span="3">{{ teacherform.address }}</el-descriptions-item>
        <el-descriptions-item label="备注">
          <el-tag size="small">教员</el-tag>
        </el-descriptions-item>
        <el-descriptions-item label="教员身份" :span="4">{{ teacherform.iden }}</el-descriptions-item>
        <el-descriptions-item label="擅长科目" >{{ teacherform.subject }}</el-descriptions-item>
        <el-descriptions-item label="平均时薪" :span="5">{{ teacherform.price }}</el-descriptions-item>
        <el-descriptions-item label="毕业院校" >{{ teacherform.school }}</el-descriptions-item>
      </el-descriptions>
      <div style="margin:20px 0 20px 38%" >
        <el-button type="success" round @click="booking">预约教员</el-button>
      </div>
    </el-dialog>

    <!--    聊天框-->

  </div>
</template>

<script>
import request from "@/utils/request";


export default {
  name:'selectTeacher',
  data() {
    return {
      //详情界面数据数组
      tableData:[],
      activeIndex2: '1',

      total:0,
      //详情界面
      detailshow:false,

      pageNum: 1,
      pageSize: 20,

      //搜索框
      teachername: "",
      sex:"",
      iden:"",
      subject: "",
      personimg:'',

      //详情信息
      teacherform:{},

      //预约
      yuyueform:{},

      //  登录用户信息
      user: localStorage.getItem("user") ? JSON.parse(localStorage.getItem("user")) : {},
    };
  },
  //创建页面读取数据
  created() {
    this.teachername=this.$route.query.teachername
    this.sex=this.$route.query.sex
    this.iden=this.$route.query.iden
    this.subject=this.$route.query.subject
    this.load()
  },
  methods: {
    reset() {
      this.teachername = ""
      this.sex = ""
      this.iden = ""
      this.subject = ""
      this.load()
    },
    //查询数据
    load() {
      request.get("/teacher/page", {
        params: {
          pageNum: this.pageNum,
          pageSize: this.pageSize,
          teachername: this.teachername,
          sex: this.sex,
          subject: this.subject,
          iden: this.iden
        }
      }).then(res => {
        this.tableData = res.records
        // console.log(this.tableData)
        this.total = res.total
      })
    },
    //读取分页组件的当前页码，调用
    handleSIzeChange(pageSize) {
      this.pageSize = pageSize
      this.load()
    },
    handleCurrentChange(pageNum) {
      this.pageNum = pageNum
      this.load()
    },
    //教员详情界面
    detail(item) {
      this.detailshow = true
      this.teacherform=item
    },
    //退出登录
    logout() {
      this.$router.push("/")
      localStorage.removeItem("user")
      this.$message({
        duration:2000,
        message:"退出成功",
        type:'success'
      })
      location.reload()
    },
    //预约教员
    booking(){
      if (this.user.siden==="家长"){
        this.yuyueform.studentid = this.user.id
        this.yuyueform.studentname = this.user.sname
        this.yuyueform.teacherid = this.teacherform.id
        this.yuyueform.teachername = this.teacherform.teachername
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
      }else if(this.user.iden===undefined){
        this.$message({
          duration:2000,
          message:'请先登录',
          type:'error'
        })
      }else{
        this.$message({
          duration:2000,
          message:'请先注册家长身份',
          type:'error'
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


img{
  /*设置图片宽度和浏览器宽度一致*/
  width:100%;
  height:inherit;
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

