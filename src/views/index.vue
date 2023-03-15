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
<!--    图片卡片化-->
    <el-carousel :interval="4000" type="card" height="300px" style="width: 100%">
      <el-carousel-item v-for="item in imagebox" :key="item.id">
        <img :src="item.idView" class="image">
      </el-carousel-item>
    </el-carousel>
    <!--    搜索框-->
    <div style="border: 5px #9095e9;border-left-style: solid;width: 100%; margin:30px 0 30px 50px;font-size: 30px">
      <div style="font-size: 30px;margin-left: 50px;letter-spacing:3px;">搜索教员</div>
    </div>
    <div style="margin-left:5%;padding: 10px;width: 90%;border-style: outset;border-radius: 12px;">
      <el-select v-model="searchsubject" placeholder="请选择科目" style="width: 200px;margin: 0 15px 0 55px" suffix-icon="el-icon-user">
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

      <el-select v-model="searchsex" placeholder="请选择性别" style="width: 200px;margin: 0 15px 0 15px" suffix-icon="el-icon-user">
        <el-option label="男" value="男"></el-option>
        <el-option label="女" value="女"></el-option>
      </el-select>

      <el-select v-model="searchiden" placeholder="请选择教员身份" style="width: 200px;margin: 0 15px 0 15px" suffix-icon="el-icon-user">
        <el-option label="大学生（在读本科/研究生/博士生）" value="大学生"></el-option>
        <el-option label="专业教师（机构/专职家教且有教资）" value="专业教师"></el-option>
        <el-option label="其他教员（毕业生/机构/其他从业人员且无教资）" value="其他教员"></el-option>
      </el-select>
      <el-input style="width: 200px;margin: 0 30px 0 15px" placeholder="直接输入教员名称" v-model="searchname"></el-input>
      <el-button style="margin-right: 10px;width: 100px;background-color: #42b983" icon="el-icon-search" type="primary" @click="search">搜索</el-button>
      <el-button style="width: 100px" type="warning" icon="el-icon-refresh" @click="reset">重置</el-button>
    </div>

<!--金牌教员-->
    <div style="display: flex;
        letter-spacing:2px;
        line-height:30px;
        height: 500px;">
      <div style="border: 5px #1da4ed;border-left-style: solid;width: 15%; height:40px;margin:50px 0 30px 50px;font-size: 30px">
        <div style="font-size: 30px;margin-left: 50px;letter-spacing:3px;">金牌教员</div>

      </div>
      <div style="margin-top: 40px">
        <el-tabs @tab-click="kemu" v-model="jianpai">
          <el-tab-pane label="语文" name="语文" v-model="subject">
            <div style="display: flex">
              <div v-for="item in tableData">
                <div class="box">
                  <el-row>
                    <el-cor :span="5"><img :src="item.personimg" alt="" style="width: 70px;height: 70px;margin-left: 30%"></el-cor>
                  </el-row>
                  <el-form label-width="80px" class="demo-ruleForm">
                    <el-form-item label="教师名称" style="height: 20px">
                      {{item.teachername}}
                    </el-form-item>
                    <el-form-item label="性别" style="height: 20px">
                      {{item.sex}}
                    </el-form-item>
                    <el-form-item label="擅长科目" style="height: 20px">
                      {{item.subject}}
                    </el-form-item>
                    <el-form-item label="身份" style="height: 20px">
                      {{item.iden}}
                    </el-form-item>
                  </el-form>
                </div>
              </div>
            </div>
          </el-tab-pane>
          <el-tab-pane label="数学" name="数学">
            <div style="display: flex">
              <div v-for="item in tableData">
                <div class="box">
                  <el-row>
                    <el-cor :span="5"><img :src="item.personimg" alt=""  style="width: 70px;height: 70px;margin-left: 30%"></el-cor>
                  </el-row>
                  <el-form label-width="80px" class="demo-ruleForm">
                    <el-form-item label="教师名称" style="height: 20px">
                      {{item.teachername}}
                    </el-form-item>
                    <el-form-item label="性别" style="height: 20px">
                      {{item.sex}}
                    </el-form-item>
                    <el-form-item label="擅长科目" style="height: 20px">
                      {{item.subject}}
                    </el-form-item>
                    <el-form-item label="身份" style="height: 20px">
                      {{item.iden}}
                    </el-form-item>
                  </el-form>
                </div>
              </div>
            </div>
          </el-tab-pane>
          <el-tab-pane label="英语" name="英语">
            <div style="display: flex">
              <div v-for="item in tableData">
                <div class="box">
                  <el-row>
                    <el-cor :span="5"><img :src="item.personimg" alt="" style="width: 70px;height: 70px;margin-left: 30%"></el-cor>
                  </el-row>
                  <el-form label-width="80px" class="demo-ruleForm">
                    <el-form-item label="教师名称" style="height: 20px">
                      {{item.teachername}}
                    </el-form-item>
                    <el-form-item label="性别" style="height: 20px">
                      {{item.sex}}
                    </el-form-item>
                    <el-form-item label="擅长科目" style="height: 20px">
                      {{item.subject}}
                    </el-form-item>
                    <el-form-item label="身份" style="height: 20px">
                      {{item.iden}}
                    </el-form-item>
                  </el-form>
                </div>
              </div>
            </div>
          </el-tab-pane>
          <el-tab-pane label="物理" name="物理">
            <div style="display: flex">
              <div v-for="item in tableData">
                <div class="box">
                  <el-row>
                    <el-cor :span="5"><img :src="item.personimg" alt="" style="width: 70px;height: 70px;margin-left: 30%"></el-cor>
                  </el-row>
                  <el-form label-width="80px" class="demo-ruleForm">
                    <el-form-item label="教师名称" style="height: 20px">
                      {{item.teachername}}
                    </el-form-item>
                    <el-form-item label="性别" style="height: 20px">
                      {{item.sex}}
                    </el-form-item>
                    <el-form-item label="擅长科目" style="height: 20px">
                      {{item.subject}}
                    </el-form-item>
                    <el-form-item label="身份" style="height: 20px">
                      {{item.iden}}
                    </el-form-item>
                  </el-form>
                </div>
              </div>
            </div>
          </el-tab-pane>
          <el-tab-pane label="化学" name="化学">
            <div style="display: flex">
              <div v-for="item in tableData">
                <div class="box">
                  <el-row>
                    <el-cor :span="5"><img :src="item.personimg" alt=""  style="width: 70px;height: 70px;margin-left: 30%"></el-cor>
                  </el-row>
                  <el-form label-width="80px" class="demo-ruleForm" >
                    <el-form-item label="教员名称" style="height: 20px">
                      {{item.teachername}}
                    </el-form-item>
                    <el-form-item label="性别" style="height: 20px">
                      {{item.sex}}
                    </el-form-item>
                    <el-form-item label="擅长科目" style="height: 20px">
                      {{item.subject}}
                    </el-form-item>
                    <el-form-item label="身份" style="height: 20px">
                      {{item.iden}}
                    </el-form-item>
                  </el-form>
                </div>
              </div>
            </div>
          </el-tab-pane>
        </el-tabs>
      </div>
    </div>

<!--图片-->
    <div style="border: 5px #e81111;border-left-style: solid;width: 100%; margin:0 0 30px 50px;font-size: 30px">
      <div style="font-size: 30px;margin-left: 50px;letter-spacing:3px;">1对1辅导 线上直播线下面授相结合</div>
    </div>
    <el-container>
      <el-col :span="8" 	>
        <el-card shadow="always" style="height: 400px;width: 500px;margin:20px 0 0 200px;">
          <img src="../assets/card/a11.png">
        </el-card>
      </el-col>

      <el-col :span="8" 	>
        <el-card shadow="always" style="height: 400px;width: 500px;margin:20px 0 0 250px;">
          <div style="color: red;text-align: center;font-size: 20px;margin-top: -30px"><h1>在线一对一教学</h1></div>
          <el-divider></el-divider>
          <div style="display: flex">
            <div style=" width: 30%;color: #878787;">
              <p>●STUDENT<span style="color: red;font-size: 20px">学员</span></p>
              <br><br>
              <p>●TEACHER<span style="color: red;font-size: 20px">教员</span></p>
              <br><br>
              <p>●PARENTS<span style="color: red;font-size: 20px">家长</span></p>
            </div>
            <div style="flex: 1;letter-spacing:1px;">
              <p>足不出户，只需一台电脑或平板，就能和真人老师面对面学习，实时互动。课程全程录制，可以随时回放复习，不用担心遗漏重要知识点。</p>
              <p>根据学生学习情况，定制适合的学习方案， 针对性教学、直播式上课，及时纠正学习习惯，当堂解决学习问题，互动性强，教学效率高。</p>
              <p>不用接送孩子，可以随时通过家长端进入 课堂，查看孩子上课情况，监督教学质量 和成果。</p><br>
            </div>
          </div>
        </el-card>
      </el-col>
    </el-container>
    <el-container>
      <el-col :span="8" 	>
        <el-card shadow="always" style="height: 400px;width: 500px;margin:20px 0 0 200px;">
          <div style="color: red;text-align: center;font-size: 20px;margin-top: -30px"><h1>面授一对一上课</h1></div>
          <el-divider></el-divider>
          <div style="display: flex">
            <div style=" width: 60%;color: #878787;text-align: right;font-size:20px;margin-right: 10px;line-height: 32px">
              <p>手把手教学 注意力集中 </p>
              <p>不同学习问题不同应对策略 </p>
              <p>自主选择上课时间 </p>
              <p>及时监督指导 </p>
              <p>总结学生学习情况反馈家长 </p>
            </div>
            <div style="flex: 1;letter-spacing:1px;text-align: right;">
              <h1>面对面辅导●</h1>
              <h1>因材施教●</h1>
              <h1>补习灵活●</h1>
              <h1>效果跟踪●</h1>
              <h1>目标优化●</h1>
            </div>
          </div>
        </el-card>
      </el-col>
      <el-col :span="8" 	>
        <el-card shadow="always" style="height: 400px;width: 500px;margin:20px 0 0 250px;">
          <img src="../assets/card/b111.png">
        </el-card>
      </el-col>
    </el-container>
    <div style="border: 5px #90e9a1;border-left-style: solid;width: 100%; margin:30px 0 30px 50px;font-size: 30px">
      <div style="font-size: 30px;margin-left: 50px;letter-spacing:3px;">预约教员流程</div>
    </div>
<!--    预约教员流程-->
    <el-container>
      <el-col :span="8" 	>
        <el-card shadow="hover" style="height: 200px;width: 280px;margin-left: 50px;border-radius: 12px;">
         <div style="display: flex">
           <div style=" width: 20%">
             <i class="el-icon-search" style="font-size: 50px;color: #42b983"></i>
           </div>
           <div style="flex: 1;font-size: 30px;color: #42b983;letter-spacing:5px;margin-left: 10px">
             搜索教员<br>
           </div>
         </div>
          <p style="font-size: 20px;color: black; letter-spacing:3px;margin-top:10px;text-align:center">免费在线预约，更快捷，更方便</p>
        </el-card>
      </el-col>

      <i class="el-icon-d-arrow-right" style="font-size: 50px;margin-top: 70px"></i>
      <el-col :span="7" >
        <el-card shadow="hover" style="height: 200px;width: 280px;border-radius: 12px;">
          <div style="display: flex">
            <div style=" width: 20%">
              <i class="el-icon-phone-outline" style="font-size: 50px;color: #42b983"></i>
            </div>
            <div style="flex: 1;font-size: 30px;color: #42b983;letter-spacing:5px;margin-left: 10px">
              或联系客服<br>
            </div>
          </div>
          <p style="font-size: 20px;color: black; letter-spacing:3px;margin-top:10px;text-align:center">联系客服告知我们您的上课需求，客服将会根据您的需求筛选匹配专业教员</p>
        </el-card>
      </el-col>
      <i class="el-icon-d-arrow-right" style="font-size: 50px;margin-top: 70px"></i>
      <el-col :span="7" 	>
        <el-card shadow="hover" style="height: 200px;width: 280px;border-radius: 12px;">
          <div style="display: flex">
            <div style=" width: 20%">
              <i class="el-icon-chat-dot-round" style="font-size: 50px;color: #42b983"></i>
            </div>
            <div style="flex: 1;font-size: 30px;color: #42b983;letter-spacing:5px;margin-left: 10px">
              双方接洽<br>
            </div>
          </div>
          <p style="font-size: 20px;color: black; letter-spacing:3px;margin-top:10px;text-align:center">通过预约教员，双方沟通后，教员将在约定时间上门试讲</p>
        </el-card>
      </el-col>

      <i class="el-icon-d-arrow-right" style="font-size: 50px;margin-top: 70px"></i>
      <el-col :span="9" 	>
        <el-card shadow="hover" style="height: 200px;width: 280px;border-radius: 12px;">
          <div style="display: flex">
            <div style=" width: 20%">
              <i class="el-icon-message" style="font-size: 50px;color: #42b983"></i>
            </div>
            <div style="flex: 1;font-size: 30px;color: #42b983;letter-spacing:5px;margin-left: 10px">
              反馈结果<br>
            </div>
          </div>
          <p style="font-size: 20px;color: black; letter-spacing:3px;margin-top:10px;text-align:center">通过学员的表现来反馈对教员的授课是否满意</p>
        </el-card>
      </el-col>
    </el-container>
<!--    底部-->
  <div>
    <div style="display: flex;
                justify-content: center;
                align-items: center;
                letter-spacing:2px;
                line-height:30px;
                width:100%;
                height:150px;
                background-color:#545c64;
                margin-top: 20px">
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
</div>
</template>

<script>
import request from "@/utils/request";

export default {
  name:'index',
  data() {
    return {
      jianpai:'语文',
      tableData:[],

    //  走马灯
      imagebox:[{id:0,idView:require('../assets/card/card0.png')},
        {id:1,idView:require('../assets/card/card1.jpg')},
        {id:2,idView:require('../assets/card/card2.jpg')},
        {id:3,idView:require('../assets/card/card3.png')},
        {id:4,idView:require('../assets/card/card4.png')},
      ],

    // 浏览器宽度
      screenWidth :0,

    //  教员信息
      pageNum: 1,
      pageSize: 4,
      teachername: "",
      sex:"",
      iden:"",
      subject: "",
      personimg:'',

    //  搜索框
      searchname:'',
      searchsex:'',
      searchsubject:'',
      searchiden:'',

    //  登录用户信息
      user: localStorage.getItem("user") ? JSON.parse(localStorage.getItem("user")) : {},

    };
  },
  created() {
    this.kemu()
  },
  methods: {
    reset(){
      this.searchname = ""
      this.searchsex = ""
      this.searchiden = ""
      this.searchsubject = ""
    },
    // handleSelect(key, keyPath) {
    //   console.log(key, keyPath);
    // },
    setSize: function () {
      // 通过浏览器宽度(图片宽度)计算高度
      this.bannerHeight = 400 / 1920 * this.screenWidth;
    },
    mounted() {
      // 首次加载时,需要调用一次
      this.screenWidth = window.innerWidth;
      this.setSize();
      // 窗口大小发生改变时,调用一次
      window.onresize = () => {
        this.screenWidth = window.innerWidth;
        this.setSize();
      }
    },
    //查询数据
    load() {
      console.log(this.jianpai)
      request.get("/teacher/page", {
        params: {
          pageNum: this.pageNum,
          pageSize: this.pageSize,
          subject: this.subject
        }
      }).then(res => {
        this.tableData = res.records
        console.log(this.tableData)
        this.total = res.total
      })
    },
    //金牌教员
    kemu(){
      this.subject=this.jianpai
      this.load()
    },
    search(){
      this.$router.push("/selectTeacher?subject="+this.searchsubject+"&sex="+this.searchsex+"&iden="+this.searchiden+"&teachername="+this.searchname)

    },
  //  退出用户
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
<style>
body{
  ;
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
.box{
  width: 220px;
  height: 350px;
  border: 2px solid #eee;
  box-shadow: 10px 0 20px 0 rgba(0, 0, 0, 0.1);
  margin:0 50px 0 0;
}
.box:hover{
  border: 2px solid #dbdbdb;
  box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
  background-color: #dbdbdb;
}

.main{
  box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
  width: 100%;
  background-color: white;

}
</style>

