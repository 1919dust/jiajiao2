<template>
  <div class="main">
    <el-container style="background-color:#545c64;display: flex;
                  justify-content: center;
                  align-items: center;letter-spacing:2px;">
      <div style="margin-right: 100px;">
        <img src="../assets/logo_word.png" width="170px" height="45px" >
      </div>
      <div>
        <el-menu
            class="el-menu-demo"
            mode="horizontal"
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

<!--    个人信息-->
    <div class="word1">
      <div style="font-size: 30px;margin-left: 50px;letter-spacing:3px;">个人信息</div>

    </div>
    <div class="inforbox" v-if="user.teachername">
      <div v-for="item in tableInfor">
        <el-descriptions class="margin-top" :column="2"  style="font-size: 20px">
          <el-descriptions-item label="编号" :span="2">{{item.id}}</el-descriptions-item>
          <el-descriptions-item label="名称">{{item.teachername}}</el-descriptions-item>
          <el-descriptions-item label="微信号">{{item.wxnumber}}</el-descriptions-item>
          <el-descriptions-item label="账号">{{item.account}}</el-descriptions-item>
          <el-descriptions-item label="联系电话">{{item.phone}}</el-descriptions-item>
          <el-descriptions-item label="密码">{{item.password}}</el-descriptions-item>
          <el-descriptions-item label="院校">{{ item.school }}</el-descriptions-item>
          <el-descriptions-item label="性别">{{ item.sex }}</el-descriptions-item>
          <el-descriptions-item label="平均时薪">{{ item.price }}</el-descriptions-item>
          <el-descriptions-item label="擅长科目">{{item.subject}}</el-descriptions-item>
          <el-descriptions-item label="联系地址">{{ item.address }}</el-descriptions-item>
          <el-descriptions-item label="备注" :span="2">
          <el-tag size="middle">教员</el-tag><span>&emsp;</span>
          <el-tag size="middle">{{item.iden}}</el-tag>
        </el-descriptions-item>
        </el-descriptions>
        <el-button type="primary" plain style="margin-left: 50%" @click="changeTea(item)">点击修改个人信息</el-button>
      </div>

    </div>
    <div class="inforbox" v-else-if="user.sname">
      <div v-for="item in tableInfor">
        <el-descriptions class="margin-top" :column="2"  style="font-size: 20px">
          <el-descriptions-item label="编号" :span="2">{{item.id}}</el-descriptions-item>
          <el-descriptions-item label="名称">{{item.sname}}</el-descriptions-item>
          <el-descriptions-item label="联系电话">{{item.sphone}}</el-descriptions-item>
          <el-descriptions-item label="账号">{{item.saccount}}</el-descriptions-item>
          <el-descriptions-item label="补习科目">{{item.ssubject}}</el-descriptions-item>
          <el-descriptions-item label="密码">{{item.spassword}}</el-descriptions-item>

          <el-descriptions-item label="平均时薪">{{ item.sprice }}</el-descriptions-item>

          <el-descriptions-item label="身份">
            <el-tag size="middle">{{item.siden}}/学员</el-tag>
          </el-descriptions-item>
          <el-descriptions-item label="联系地址">{{ item.saddress }}</el-descriptions-item>
          <el-descriptions-item label="要求" :span="2">{{ item.srequest }}</el-descriptions-item>
        </el-descriptions>
        <el-button type="primary" plain style="margin-left: 50%" @click="changeStd(item)">点击修改个人信息</el-button>
      </div>

    </div>



<!--    已预约订单表格-->
    <div class="word1" >
      <div style="font-size: 30px;margin-left: 50px;letter-spacing:3px;">已预约订单</div>
    </div>
    <div class="bookbox" >
      <el-table
          :data="tableBook"
          stripe
          style="width: 100%;font-size: 20px;margin: 0 0 50px 0">
        <el-table-column prop="id" label="订单id" width="140">
        </el-table-column>
        <el-table-column prop="studentid" label="学员编号">
        </el-table-column>
        <el-table-column prop="studentname" label="学员名称" width="120">
        </el-table-column>
        <el-table-column prop="teacherid" label="教员编号">
        </el-table-column>
        <el-table-column prop="teachername" label="教员名称">
        </el-table-column>
        <el-table-column
            fixed="right"
            label="操作">
          <template slot-scope="scope">
            <el-popconfirm
                style="margin-left: 10px"
                confirm-button-text='确定'
                cancel-button-text='再想想'
                icon="el-icon-info"
                icon-color="red"
                title="确定取消预约吗？"
                @confirm="del(scope.row.id)">
              <el-button type="danger" plain size="small" slot="reference" >取消预约</el-button>
            </el-popconfirm>
          </template>
        </el-table-column>
      </el-table>
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

    <el-dialog title="教员信息" :visible.sync="changeTeaShow" width="40%" center>
      <el-form :model="teacherform" :rules="teacherrules" ref="ruleteacher" label-width="100px" label-position="left">
        <el-form-item label="教员名称" porp="teachername">
          <el-input v-model="teacherform.teachername" autocomplete="off" placeholder="不能为空"></el-input>
        </el-form-item>
        <el-form-item label="密码" prop="password">
          <el-input type="password" v-model="teacherform.password" autocomplete="off" show-password></el-input>
        </el-form-item>
        <el-form-item label="性别" prop="sex">
          <template>
            <el-radio v-model="teacherform.sex" label="男">男</el-radio>
            <el-radio v-model="teacherform.sex" label="女">女</el-radio>
          </template>
        </el-form-item>
        <el-form-item label="教员身份" prop="iden">
          <el-select v-model="teacherform.iden" placeholder="请选择教员身份">
            <el-option label="大学生（在读本科/研究生/博士生）" value="大学生（在读本科/研究生/博士生）"></el-option>
            <el-option label="专业教师（机构/专职家教且有教资）" value="专业教师（机构/专职家教且有教资）"></el-option>
            <el-option label="其他教员（毕业生/机构/其他从业人员且无教资）" value="其他教员（毕业生/机构/其他从业人员且无教资）"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="手机号码" prop="phone">
          <el-input v-model.number="teacherform.phone" autocomplete="off" placeholder="请输入11位手机号"></el-input>
        </el-form-item>
        <el-form-item label="微信号">
          <el-input v-model="teacherform.wxnumber" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="擅长科目" prop="subject">
          <el-select v-model="teacherform.subject" placeholder="请选择擅长科目">
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
        </el-form-item>
        <el-form-item label="时薪">
          <el-input v-model="teacherform.price" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="毕业院校">
          <el-input v-model="teacherform.school" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="现居住地址">
          <div class="block">
            <el-cascader
                placeholder="试试搜索：佛山"
                :options="area"
                filterable
                v-model="teacherform.address"
                :props="{emitPath:false}"></el-cascader>
          </div>
        </el-form-item>

      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="changeTeaShow = false">取 消</el-button>
        <el-button type="primary" @click="teacher">确 定</el-button>
      </div>

    </el-dialog>

    <el-dialog title="学员信息" :visible.sync="changeStdShow" width="40%" center>
      <el-form :model="studentform" :rules="studentrules" ref="ruleteacher" label-width="100px" label-position="left">
        <el-form-item label="学员名称" porp="sname">
          <el-input v-model="studentform.sname" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="密码" prop="spassword">
          <el-input v-model="studentform.spassword" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="性别" prop="ssex">
          <template>
            <el-radio v-model="studentform.ssex" label="男">男</el-radio>
            <el-radio v-model="studentform.ssex" label="女">女</el-radio>
          </template>
        </el-form-item>
        <el-form-item label="就读年级">
          <div class="block">
            <el-cascader
                placeholder="试试搜索：初一"
                :options="grade"
                filterable
                v-model="studentform.sgrade"
                :props="{emitPath:false}"></el-cascader>
          </div>
        </el-form-item>
        <el-form-item label="联系号码" prop="sphone">
          <el-input v-model.number="studentform.sphone" autocomplete="off" placeholder="请输入11位手机号"></el-input>
        </el-form-item>
        <el-form-item label="补习科目" prop="ssubject">
          <el-select v-model="studentform.ssubject" placeholder="请选择补习科目">
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
        </el-form-item>
        <el-form-item label="时薪">
          <el-input v-model="studentform.sprice" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="现居住地址">
          <div class="block">
            <el-cascader
                placeholder="试试搜索：佛山"
                :options="area"
                filterable
                v-model="studentform.saddress"
                :props="{emitPath:false}"></el-cascader>
          </div>
        </el-form-item>
        <el-form-item label="要求">
          <el-input v-model="studentform.srequest" autocomplete="off"></el-input>
        </el-form-item>

      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="changeStdShow = false">取 消</el-button>
        <el-button type="primary" @click="student">确 定</el-button>
      </div>

    </el-dialog>

  </div>
</template>

<script>
import request from "@/utils/request";

export default {
  name: "person",
  data(){
    return{
      tableInfor:[],
      tableBook:[],
      pageNum:1,
      pageSize:5,

      changeTeaShow:false,
      changeStdShow:false,
      //修改教师个人信息
      teacherform:{
        teachername:'',
        account:'',
        password:'',
        sex:'',
        iden:'',
        phone:'',
        subject:'',
      },
      teacherrules:{
        teachername:[
          { required: true, message: '教员名称不能为空', trigger:'blur'}
        ],
        account:[
          { required: true, message: '账号不能为空', trigger:'blur'},
          { type:'number',message: '账号必须为数字值'}
        ],
        password:[
          { required: true, message: '密码不能为空', trigger:'blur'}
        ],
        sex:[
          { required: true, message: '教员性别不能为空', trigger:'blur'}
        ],
        iden:[
          { required: true, message: '教员身份不能为空', trigger:'blur'}
        ],
        phone:[
          { required: true, message: '联系电话不能为空', trigger:'blur'},
          { type:'number',message: '联系电话必须为数字值'}
        ],
        subject:[
          { required: true, message: '擅长科目不能为空', trigger:'blur'}
        ],
      },
      //修改家长个人信息
      studentform:{
        sname:'',
        saccount:'',
        spassword:'',
        ssex:'',
        sgrade:'',
        sphone:'',
        ssubject:'',
      },
      studentrules:{
        sname:[
          { required: true, message: '教员名称不能为空', trigger:'blur'}
        ],
        saccount:[
          { required: true, message: '账号不能为空', trigger:'blur'},
          { type:'number',message: '账号必须为数字值'}
        ],
        spassword:[
          { required: true, message: '密码不能为空', trigger:'blur'}
        ],
        ssex:[
          { required: true, message: '教员性别不能为空', trigger:'blur'}
        ],
        sgrade:[
          { required: true, message: '教员身份不能为空', trigger:'blur'}
        ],
        sphone:[
          { required: true, message: '联系电话不能为空', trigger:'blur'},
          { type:'number',message: '联系电话必须为数字值'}
        ],
        ssubject:[
          { required: true, message: '擅长科目不能为空', trigger:'blur'}
        ],
      },
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
      area:[{
        label: '广东省',
        children: [{
          label: '佛山市',
          children: [{
            value: '佛山市顺德区',
            label: '顺德区'
          }, {
            value: '佛山市南海区',
            label: '南海区'
          }, {
            value: '佛山市禅城区',
            label: '禅城区'
          }, {
            value: '佛山市三水区',
            label: '三水区'
          }, {
            value: '佛山市高明区',
            label: '高明区'
          }]
        }, {
          label: '广州市',
          children: [{
            value: '广州市番禺区',
            label: '番禺区'
          }, {
            value: '广州市白云区',
            label: '白云区'
          }, {
            value: '广州市海珠区',
            label: '海珠区'
          }, {
            value: '广州市天河区',
            label: '天河区'
          }, {
            value: '广州市南沙区',
            label: '南沙区'
          }, {
            value: '广州市花都区',
            label: '花都区'
          }]
        },{
          label: '深圳市',
          children: [{
            value: '深圳市罗湖区',
            label: '罗湖区'
          }, {
            value: '深圳市龙华区',
            label: '龙华区'
          }, {
            value: '深圳市福田区',
            label: '福田区'
          }, {
            value: '深圳市保安区',
            label: '保安区'
          }, ]
        }]
      }],

      id: "",
      studentid:"",
      teacherid: "",
      user: localStorage.getItem("user") ? JSON.parse(localStorage.getItem("user")) : {},
    }
  },
  created() {
    this.information()
    this.searchbook()
  },
  methods:{
    information(){
      if(this.user.siden==="家长") {
        request.get("/student/page",{
          params:{
            pageNum: this.pageNum,
            pageSize: this.pageSize,
            id: this.user.id
          }
        }).then(res => {
          this.tableInfor = res.records
        })
      }else if(this.user.iden===undefined) {
        this.$message({
          duration:2000,
          message:'请先登录',
          type:'error'
      })}else{
        request.get("/teacher/page",{
          params:{
            pageNum: this.pageNum,
            pageSize: this.pageSize,
            id: this.user.id
          }
        }).then(res => {
          this.tableInfor = res.records
        })
      }
    },
    //修改个人信息
    changeStd(item){
      this.changeStdShow=true
      this.studentform=item

    },
    changeTea(item){
      this.changeTeaShow=true
      this.teacherform=item
    },
    //修改
    teacher(){
        request.post("/teacher",this.teacherform).then(res =>{
          if (res){
            this.$message.success("修改成功")
            this.changeTeaShow = false

          }else{
            this.$message.error("修改失败")
          }
        })
    },
    student(){
      request.post("/student",this.studentform).then(res =>{
        if (res){
          this.$message.success("修改成功")
          this.changeStdShow = false

        }else{
          this.$message.error("修改失败")
        }
      })
    },
    //展示订单
    searchbook(){
      if(this.user.siden==="家长"){
        request.get("/booking/page",{
          params:{
            pageNum: this.pageNum,
            pageSize: this.pageSize,
            studentid: this.user.id
          }
        }).then(res => {
          this.tableBook = res.records
        })
      }else{
        request.get("/booking/page",{
          params:{
            pageNum: this.pageNum,
            pageSize: this.pageSize,
            teacherid: this.user.id
          }
        }).then(res => {
          this.tableBook = res.records
        })
      }
    },
    //删除订单
    del(id){
      request.delete("/booking/"+id).then(res =>{
        if (res){
          this.$message.success("删除成功")
          this.diglognew = false
          this.searchbook()
        }else{
          this.$message.error("删除失败")
        }
      })
    },
    //退出登录
    logout() {
      this.$router.push("/")
      localStorage.removeItem("user")
      this.$message.success("退出成功")
      location.reload()
    },
    person() {
      this.$router.push("/person")
    }
  }
}
</script>

<style scoped>
.main{
  box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
  width: 100%;
  min-height: 500px;
  background-color: white;
}
.bookbox{
  margin:0 0 0 10%;
  width: 900px;
  border: 5px #9095e9;
  border-left-style: solid;
  border-top-style: solid;
}
.word1{
  border: 5px red;
  border-left-style: solid;
  width: 100%;
  margin:30px 0 30px 10%;
  font-size: 30px
}

.inforbox{
  margin:10px 31% 10px 10%;
  border: 5px #9095e9;
  border-left-style: solid;
  border-top-style: solid;
}
</style>