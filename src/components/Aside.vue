<template>
  <el-menu :default-openeds="['1', '3']" style="min-height: 100%; overflow-x: hidden"
           :collapse="isCollapse"
           background-color="rgb(48, 65, 86)"
           text-color="#fff"
           action-text-color="#ffdo4b"
           :collapse-transition="false"
           :collapsed="isCollapse"
            router>
    <div style="height: 60px;line-height: 60px;text-align: center;color: white">
      <span>XX家教平台</span>
    </div>
    <el-submenu index="1">
      <template slot="title">
        <i class="el-icon-user-solid"></i>
        <span slot="title">用户管理</span>
      </template>
      <el-menu-item-group>
        <el-menu-item index="/manage/teacher">教员列表</el-menu-item>
        <el-menu-item index="/manage/student">学员列表</el-menu-item>
      </el-menu-item-group>
    </el-submenu>
    <el-submenu index="2">
      <template slot="title">
        <i class="el-icon-s-goods"></i>
        <span slot="title">订单管理</span>
      </template>
      <el-menu-item-group>
        <el-menu-item index="/manage/booking">订单列表</el-menu-item>
      </el-menu-item-group>

    </el-submenu>
<!--    <el-submenu index="3">-->
<!--      <template slot="title">-->
<!--        <i class="el-icon-s-data"></i>-->
<!--        <span slot="title">数据统计</span>-->
<!--      </template>-->
<!--      <el-menu-item-group>-->
<!--        <el-menu-item index="3-1">订单量报表</el-menu-item>-->
<!--        <el-menu-item index="3-2">需求量报表</el-menu-item>-->
<!--      </el-menu-item-group>-->
<!--    </el-submenu>-->
  </el-menu>
</template>

<script>
export default {
  name: "Aside",
  props:{
    isCollapse: Boolean,
    textshow:Boolean
  }
}
</script>

<style scoped>

</style>