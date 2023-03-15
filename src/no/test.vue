<template>
  <div>
    <el-container style="height: 100vh; border: 1px solid #eee" >
      <el-aside :width="sideWidth + 'px'" style="background-color: rgb(238, 241, 246)">
        <el-menu :default-openeds="['1', '3']" style="min-height: 100%; overflow-x: hidden"
                 :collapse="isCollapse"
                 background-color="rgb(48, 65, 86)"
                 text-color="#fff"
                 action-text-color="#ffdo4b"
                 :collapse-transition="false"
                 :collapsed="isCollapse">
          <div style="height: 60px;line-height: 60px;text-align: center">
            <b style="color: white" v-show="textshow">家教后台</b>
          </div>
          <el-submenu index="1">
            <template slot="title">
              <i class="el-icon-user-solid"></i>
              <span slot="title">用户管理</span>
            </template>
            <el-menu-item-group>
              <el-menu-item index="1-1">教员列表</el-menu-item>
              <el-menu-item index="1-2">学员列表</el-menu-item>
            </el-menu-item-group>
          </el-submenu>
          <el-submenu index="2">
            <template slot="title">
              <i class="el-icon-s-goods"></i>
              <span slot="title">订单管理</span>
            </template>
            <el-menu-item-group>
              <el-menu-item index="2-1">申请订单列表</el-menu-item>
              <el-menu-item index="2-2">预约订单列表</el-menu-item>
              <el-menu-item index="2-3">已完成订单列表</el-menu-item>
            </el-menu-item-group>

          </el-submenu>
          <el-submenu index="3">
            <template slot="title">
              <i class="el-icon-s-data"></i>
              <span slot="title">数据统计</span>
            </template>
            <el-menu-item-group>
              <el-menu-item index="3-1">订单量报表</el-menu-item>
              <el-menu-item index="3-2">需求量报表</el-menu-item>
            </el-menu-item-group>
          </el-submenu>
        </el-menu>
      </el-aside>

      <el-container>

        <el-header style="font-size: 12px;border-bottom:1px solid #ccc;line-height:60px;display: flex">
          <div style="flex:1;font-size: 18px">
            <span :class="collapseBtnClass" style="cursor: pointer" @click="collapse"></span>
          </div>

          <el-dropdown style="width:70px;cursor: pointer">
            <span>王小虎</span><i class="el-icon-arrow-down" style="margin-left: 5px;"></i>

            <el-dropdown-menu slot="dropdown">
              <el-dropdown-item>个人信息</el-dropdown-item>
              <el-dropdown-item>退出</el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>
        </el-header>

        <el-main>
          <div style="padding: 10px 0">

            <!--            搜索框-->

            <el-input style="width: 200px;margin: 0 5px 0 5px" suffix-icon="el-icon-search" placeholder="请输入名称" v-model="teachername"></el-input>

            <el-input style="width: 200px;margin: 0 5px 0 5px" suffix-icon="el-icon-user" placeholder="请输入性别" v-model="sex"></el-input>

            <el-input style="width: 200px;margin: 0 5px 0 5px" suffix-icon="el-icon-reading" placeholder="请输入擅长科目" v-model="subject"></el-input>
            <el-button class="ml-5" type="primary" @click="load">搜索</el-button>
            <el-button class="ml-5" type="warning" @click="reset">重置</el-button>
          </div>
          <div style="padding: 10px 0">
            <el-button type="primary" round icon="el-icon-circle-plus-outline" @click="handAdd">新增</el-button>
            <el-button type="danger" round icon="el-icon-remove-outline" @click="diglogdelete = true">批量删除</el-button>
            <el-dialog
                title="删除教员信息"
                :visible.sync="diglogdelete"
                :append-to-body="true"
                :close-on-click-modal="false"
            >
              <span>确定删除该教员信息吗？</span>
              <div slot="footer" class="dialog-footer">
                <el-button @click="diglogdelete = false">取 消</el-button>
                <el-button type="primary" @click="deleteBatch" >确 定</el-button>
              </div>
            </el-dialog>
          </div>
          <el-table ref="table" size="small" :data="tableData" stripe border >
            <el-table-column label="教员编号" prop="id"></el-table-column>
            <el-table-column label="教员账号" prop="account"></el-table-column>
            <el-table-column label="教员名称" prop="teachername"></el-table-column>
            <el-table-column label="性别" prop="sex"></el-table-column>
            <el-table-column label="擅长科目" prop="subject"></el-table-column>

            <el-table-column label="操作1" width="100" align="center">
              <template slot-scope="scope">
                <el-button type="text" @click="toogleExpand(scope.row)">{{scope.row.expansion ? '收起' : '查看详情'}}</el-button>
              </template>
            </el-table-column>
            <el-table-column type="expand" width="1">
              <template slot-scope="props">
                <el-form label-position="left" inline class="demo-table-expand">
                  <el-form-item :label="item.key" v-for="(item, index) in props.row" :key="item" :index="index">
                    <el-popover v-if="item.key != '教员编号'" placement="top" width="240" :value="item.visible">
                      <el-input type="textarea" :autosize="{ minRows: 2, maxRows: 4}" placeholder="请输入内容" v-model="popoverInput"></el-input>
                      <div style="text-align: right; margin: 10px 0 0">
                        <el-button size="mini" type="text" @click="clickDom()">取消</el-button>
                        <el-button type="primary" size="mini" @click="confirmChange(item)">确定</el-button>
                      </div>
                      <span style="cursor:pointer;" slot="reference" @click="showPopover(item)">{{ item }}</span>
                    </el-popover>
                    <span v-else>{{ item.value }}</span>
                  </el-form-item>
                </el-form>
              </template>
            </el-table-column>
            <el-table-column
                fixed="right"
                label="操作">
              <template slot-scope="scope">
                <el-button type="text" @click="handleClick(scope.row)" size="small" >编辑</el-button>
                <el-popconfirm
                    style="margin-left: 10px"
                    confirm-button-text='确定'
                    cancel-button-text='再想想'
                    icon="el-icon-info"
                    icon-color="red"
                    title="确定删除吗？"
                    @confirm="del(scope.row.id)"
                >
                  <el-button type="text" size="small" slot="reference" >删除</el-button>
                </el-popconfirm>
              </template>
            </el-table-column>
          </el-table>

          <!--          分页-->
          <div style="padding: 10px 0">
            <el-pagination
                @size-change = "handleSIzeChange"
                @current-change = "handleCurrentChange"
                :current-page="pageNum"
                :page-sizes="[5, 10, 20]"
                :page-size="5"
                layout="total, sizes, prev, pager, next, jumper"
                :total="total">
            </el-pagination>
          </div>

          <el-dialog title="新增教员信息" :visible.sync="diglognew" width="40%">
            <el-form :model="teacherform" :rules="rules" ref="ruleteacher" label-width="100px" label-position="left">
              <el-form-item label="教员名称" porp="teachername">
                <el-input v-model="teacherform.teachername" autocomplete="off" placeholder="不能为空"></el-input>
              </el-form-item>
              <el-form-item label="密码" prop="password">
                <el-input v-model="teacherform.password" autocomplete="off"></el-input>
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
                <el-input v-model="teacherform.phone" autocomplete="off" oninput ="value=value.replace(/[^0-9.]/g,'')" maxlength="11"placeholder="请输入11位手机号"></el-input>
              </el-form-item>
              <el-form-item label="微信号">
                <el-input v-model="teacherform.wxnumber" autocomplete="off"></el-input>
              </el-form-item>
              <el-form-item label="擅长科目" prop="subject">
                <el-input v-model="teacherform.subject" autocomplete="off" placeholder="请输入擅长科目(例子:语文/数学)"></el-input>
              </el-form-item>
              <el-form-item label="时薪">
                <el-input v-model="teacherform.price" autocomplete="off"></el-input>
              </el-form-item>
              <el-form-item label="毕业院校">
                <el-input v-model="teacherform.school" autocomplete="off"></el-input>
              </el-form-item>
              <el-form-item label="现居住地址">
                <el-input v-model="teacherform.address" autocomplete="off"></el-input>
              </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
              <el-button @click="diglognew = false">取 消</el-button>
              <el-button type="primary" @click="save">确 定</el-button>
            </div>

          </el-dialog>



        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script>
// @ is an alias to /src
import HelloWorld from '@/components/HelloWorld.vue'
import request from "@/utils/request";

export default {
  name: 'HomeView',
  data() {

    return {
      tableData: [],
      total:0,
      pageNum:1,
      pageSize:5,
      // teachername: "",
      // sex:"",
      // subject: "",
      diglognew:false,
      diglogdelete:false,

      collapseBtnClass: 'el-icon-s-fold',
      isCollapse:false,
      sideWidth : 200,
      textshow : true,
      multipleSelection: [],
      teacherform:{
        teachername:'',
        password:'',
        sex:'',
        iden:'',
        phone:'',
        subject:'',
      },
      rules:{
        teachername:[
          { required: true, message: '教员名称不能为空', trigger:'blur'}
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
          { required: true, message: '联系电话不能为空', trigger:'blur'}
        ],
        subject:[
          { required: true, message: '擅长科目不能为空', trigger:'blur'}
        ],

      },

    }
  },
  created() {
    this.load()
  },
  methods:{
    collapse(){//点击收缩按钮触发
      this.isCollapse = !this.isCollapse
      if(this.isCollapse){
        this.isCollapse=64
        this.collapseBtnClass = 'el-icon-s-unfold'
        this.textshow = false
      }else{//展开
        this.sideWidth=200
        this.collapseBtnClass = 'el-icon-s-fold'
        this.textshow = true

      }
    },
    //封装方法
    load(){
      request.get("/teacher/page",{
        params:{
          pageNum: this.pageNum,
          pageSize: this.pageSize,
          teachername: this.teachername,
          sex: this.sex,
          subject: this.subject
        }
      }).then(res => {
        console.log(res)
        this.tableData = res.records
        this.total = res.total
      })
      // //请求分页查询数据
      // fetch("http://localhost:9090/user/page?pageNum="+this.pageNum+"&pageSize="+this.pageSize).then(res => res.json()).then(res => {
      //   console.log(res)
      //   this.tableData = res.data
      //   this.total = res.total
      // })
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

    //重置
    reset(){
      this.teachername = ""
      this.sex = ""
      this.subject = ""
    },

    //  添加界面
    handAdd(){
      this.diglognew=true
      this.teacherform={}
    },
    //添加教员数据
    save(ruleteacher){

      this.$refs[ruleteacher].values((valid)=>{
        if(valid){
          request.post("/teacher",this.teacherform).then(res =>{
            if (res){
              this.$message.success("添加成功")
              this.diglognew = false
              this.load()
            }else{
              this.$message.error("添加失败")
            }

          })
        }
      })


    },
    //编辑教员数据
    handleClick(row){
      this.teacherform = row
      this.diglognew = true
    },
    del(id){
      request.delete("/teacher/"+id).then(res =>{
        if (res){
          this.$message.success("删除成功")
          this.diglognew = false
          this.load()
        }else{
          this.$message.error("删除失败")
        }
      })
    },
    handleSelectionChange(val){
      console.log(val)
      this.multipleSelection=val

    },
    deleteBatch(){
      //对multipleSelection进行扁平化处理，即变成数组=>[1,2,3]
      let ids = this.multipleSelection.map(v => v.id)
      request.post("/teacher/del/batch",ids).then(res =>{
        if (res){
          this.$message.success("删除成功")
          this.diglognew = false
          this.load()
        }else{
          this.$message.error("删除失败")
        }
      })
      this.diglogdelete = false
    },

  //查看详情/收起
    toogleExpand(row) {
      let $table = this.$refs.table;
      this.tableData.map(item => {
        if (row.id != item.id) {
          $table.toggleRowExpansion(item, false)
          item.expansion = false
        } else {
          item.expansion = !item.expansion
        }
      })
      $table.toggleRowExpansion(row)
    },
    clickDom() {
      document.querySelector("#app").click();
    },
    showPopover(item) {
      console.log(item)
      this.popoverInput = item.value
    },
    confirmChange(item) {
      console.log(item)
      item.value = this.popoverInput
      this.clickDom()
    }
  }
}
</script>

<style>
body{
  background-color: white;
}
.ml-5{
  width:80px;
  background-color: #409EFF;
  color: black;
}
.el-dialog .el-dialog__body{
  display: flex;
  justify-content: center;
  align-items: center;

}
</style>

