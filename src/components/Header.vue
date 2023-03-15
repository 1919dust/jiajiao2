<template>
  <div style="font-size: 12px;line-height:60px;display: flex">
  <div style="flex:1;font-size: 18px">
    <span :class="collapseBtnClass" style="cursor: pointer" @click="collapse"></span>
    <el-breadcrumb separator="/" style="display: inline-block; margin-left: 10px">
<!--        <el-breadcrumb-item :to="'/'">用户管理</el-breadcrumb-item>-->
    <el-breadcrumb-item>{{ currentPathName }}</el-breadcrumb-item>
  </el-breadcrumb>
  </div>

  <el-dropdown style="width:120px;cursor: pointer">
    <div style="display: inline-block">
      <img :src="admin.aavatar" alt=""
           style="width: 30px; border-radius: 50%; position: relative; top: 10px; right: 5px">
      <span>{{ admin.aname }}</span><i class="el-icon-arrow-down" style="margin-left: 5px"></i>
    </div>

    <el-dropdown-menu slot="dropdown" style="width: 100px; text-align: center">
      <el-dropdown-item style="font-size: 14px; padding: 5px 0">
        <span style="text-decoration: none" @click="logout">退出</span>
      </el-dropdown-item>
    </el-dropdown-menu>
  </el-dropdown>
  </div>
</template>

<script>
export default {
  name: "Header",
  props:{
    collapseBtnClass: String,
    collapse:Boolean
  },
  computed: {
    currentPathName() {
      return this.$store.state.currentPathName;　　//需要监听的数据
    }
  },
  data(){
    return{
      admin: localStorage.getItem("admin") ? JSON.parse(localStorage.getItem("admin")) : {}
    }
  },
  methods: {
    logout() {
      this.$router.push("/")
      localStorage.removeItem("admin")
      this.$message({
        duration:1500,
        message:"退出成功",
        type:'success'
      })
    }
  }
}
</script>

<style scoped>

</style>