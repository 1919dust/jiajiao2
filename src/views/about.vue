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
<!--    关于平台-->
    <div style="border: 5px red;border-left-style: solid;width: 100%; margin:30px 0 30px 300px;font-size: 30px">
      <div style="font-size: 30px;margin-left: 50px;letter-spacing:3px;">关于我们</div>
    </div>
    <div class="contain">
      <div id="txt" class="wa_des"><p align="left">
        <router-link to="/">xx家教兼职平台</router-link>隶属于xx公司，创立于2022年的xx家教兼职平台是专业家教服务网站，是众多教员心目中的品牌平台。</p>
        <p>经过多年的磨练，凭借着强大的互联网技术以及专业咨询团队，xx家教兼职平台已然成为中国较大的家教服务网站。xx家教兼职平台主要为有需要的用户提供一个方便、快捷、安全的家教信息平台。您可以通过xx家教兼职平台按照自己需求选择合适的家教老师，并且能得到较大限度的优惠。您也可以寻找到适合自己的家教兼职、展现自身能力。<br /></p><p>
          另外我们也以贴心的服务、人性化的功能赢得了良好的口碑，xx家教兼职平台致力于成为信息全面、功能优质的家教信息网络平台。<br /></p><p>
          xx家教兼职平台的业务范围已经覆盖全国300多个城市，为几十万名大学生、老师提供家教机会，为十几万名用户找到适合的家教老师，满足了广大用户对于家教、教育等相关信息的直接或潜在的需求。<br /></p><p>
        在取得成绩的同时我们不断寻求进步，我们将为小班、辅导班、培训班等组织提供平台进行宣传以满足不同学员的各种需求。未来我们将在各版块逐步改进，听取用户的建议和意见，推出更人性化更全面的功能。阳光家教将一如既往地脚踏实地、锐意进取，为打造具有影响力的教育服务平台而努力。<br /></p>
        <h3>对于学员：</h3>
        <div style="font-size: 18px">
          • 我们帮您寻找值得信赖的教员，让您享受到优质的服务<br />
          • 我们提供海量的教员信息，能够第一时间联系看中的教员<br />
          • 我们的教员信息不会有任何夸张虚假的成分，我们会保证教学水平和安全<br />
        </div>
        <h3>对于教员：</h3>
        <div style="font-size: 18px">
          • 我们为您寻找适合您的学员，让您学以致用<br />
          • 我们提供便捷的方式，让您在短时间内敲定一份家教<br />
          • 我们提供大量展示位，只要您付出就会得到更多的家教机会
        </div>
    </div>

<!--    联系我们-->

  </div>
    <div style="border: 5px red;border-left-style: solid;width: 100%; margin:30px 0 30px 300px;font-size: 30px">
      <div style="font-size: 30px;margin-left: 50px;letter-spacing:3px;">关于我们</div>
    </div>
    <div class="contain1">
      <div id="" class="wa_des">

        <h3>xx家教兼职平台【xx信息技术有限公司 版权所有　粤ICP备xxxxxxxx号-1】</h3>
        <h3>商务合作电话：333-666-9990 &emsp;&emsp;&emsp;QQ：999999999</h3>

        <h3>总部地址：佛山科学技术学院</h3>
        <h3>邮编：528000</h3>
        <h2>通过xx，实现教育培训报班、咨询的零风险！</h2>
      </div>
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

</div>

</template>

<script>
import request from "@/utils/request";

export default {
  name:'about',
  data() {
    return {
      //  登录用户信息
      user: localStorage.getItem("user") ? JSON.parse(localStorage.getItem("user")) : {},
    };
  },
  methods: {
    logout() {
      this.$router.push("/")
      localStorage.removeItem("user")
      this.$message.success("退出成功")
      location.reload()
    },
    person() {
      this.$router.push("/person")
    },
  }
}
</script>
<style>

img{
  /*设置图片宽度和浏览器宽度一致*/
  width:100%;
  height:inherit;
}


.main{

  box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
  width: 100%;
  background-color: white;
}

.contain{
  border: 0.2rem solid #e3e3e3;
  box-shadow: 0 0 20px 0 rgba(0, 0, 0, 0.1);
  margin:10px 0 0 20%;
  width: 900px;
  height: 800px;
  background-color: white;
}
.contain1{
  border: 0.2rem solid #e3e3e3;
  box-shadow: 0 0 20px 0 rgba(0, 0, 0, 0.1);
  margin:10px 0 50px 20%;
  width: 900px;
  background-color: white;
}

.wa_des {
  padding:0 50px 0 50px;

}
.wa_des p{
  font-size:18px;
  text-indent:50px;}
</style>

