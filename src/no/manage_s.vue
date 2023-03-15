<template>
  <div>
    <el-container style="height: 100vh; border: 1px solid #eee" >
      <el-aside :width="sideWidth + 'px'" style="background-color: rgb(238, 241, 246)">
        <Aside :is-collapse="collapse" :textshow="textshow" />
      </el-aside>

      <el-container>

        <el-header style="font-size: 12px;border-bottom:1px solid #ccc;line-height:60px;display: flex">
          <Header :collapse-btn-class="collapseBtnClass" :collapse="collapse" />
        </el-header>
        <el-main>
          <div style="padding: 10px 0">

            <!--            搜索框-->

            <el-input style="width: 200px;margin: 0 5px 0 5px" suffix-icon="el-icon-search" placeholder="请输入名称" v-model="teachername"></el-input>


            <el-select v-model="sex" placeholder="请选择性别" style="width: 200px;margin: 0 5px 0 5px" suffix-icon="el-icon-user">
              <el-option label="男" value="男"></el-option>
              <el-option label="女" value="女"></el-option>
            </el-select>
            <el-select v-model="subject" placeholder="请选择补习科目" style="width: 200px;margin: 0 5px 0 5px" suffix-icon="el-icon-user">
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
            <el-button class="ml-5" type="primary" @click="load">搜索</el-button>
            <el-button class="ml-5" type="warning" @click="reset">重置</el-button>
          </div>
          <div style="padding: 10px 0">
            <el-button type="primary" round icon="el-icon-circle-plus-outline" @click="handAdd">新增</el-button>
            <el-button type="danger" round icon="el-icon-remove-outline" @click="diglogdelete = true">批量删除</el-button>
            <el-dialog
                title="删除学员信息"
                :visible.sync="diglogdelete"
                :append-to-body="true"
                :close-on-click-modal="false"
            >
              <span>确定删除该学员信息吗？</span>
              <div slot="footer" class="dialog-footer">
                <el-button @click="diglogdelete = false">取 消</el-button>
                <el-button type="primary" @click="deleteBatch" >确 定</el-button>
              </div>
            </el-dialog>
          </div>
          <el-table :data="tableData" border style="width: 100%"  @selection-change="handleSelectionChange">
            <el-table-column
                type="selection"
                width="55">
            </el-table-column>
            <el-table-column prop="id" label="学员编号" width="140">
            </el-table-column>
            <el-table-column prop="account" label="学员账号">
            </el-table-column>
            <el-table-column prop="studentname" label="学员名称" width="120">
            </el-table-column>
            <el-table-column prop="sex" label="性别">
            </el-table-column>
            <el-table-column prop="grade" label="年级">
            </el-table-column>
            <el-table-column prop="phone" label="联系手机">
            </el-table-column>
            <el-table-column prop="subject" label="补习科目">
            </el-table-column>
            <el-table-column prop="price" label="时薪">
            </el-table-column>
            <el-table-column prop="address" label="居住地址">
            </el-table-column>
            <el-table-column prop="request" label="要求">
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
                  <!--                <el-dialog-->
                  <!--                    title="删除教员信息"-->
                  <!--                    :visible.sync="diglogdelete"-->
                  <!--                    :append-to-body="true"-->
                  <!--                    :close-on-click-modal="false"-->
                  <!--                 >-->
                  <!--                  <span>确定删除该教员信息吗？</span>-->
                  <!--                  <div slot="footer" class="dialog-footer">-->
                  <!--                    <el-button @click="diglogdelete = false">取 消</el-button>-->
                  <!--                    <el-button type="primary" @click="del(scope.row.id),diglogdelete = false" >确 定</el-button>-->
                  <!--                  </div>-->
                  <!--                </el-dialog>-->
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

          <el-dialog title="新增学员信息" :visible.sync="diglognew" width="40%">
            <el-form :model="teacherform" :rules="rules" ref="ruleteacher" label-width="100px" label-position="left">
              <el-form-item label="学员名称" porp="teachername">
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
              <el-form-item label="学员年级" prop="grade">
                <el-input v-model.number="teacherform.grade" autocomplete="off" placeholder="请输入学员就读年级"></el-input>
              </el-form-item>
              <el-form-item label="联系号码" prop="phone">
                <el-input v-model.number="teacherform.phone" autocomplete="off" placeholder="请输入11位手机号"></el-input>
              </el-form-item>
              <el-form-item label="补习科目" prop="subject">
                <el-select v-model="teacherform.subject" placeholder="请选择补习科目">
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
              <el-form-item label="要求">
                <el-input v-model="teacherform.request" autocomplete="off"></el-input>
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
import Aside from "@/components/Aside";
import Header from "@/components/Header";

export default {
  name: 'HomeView',
  components: {Header, Aside},
  data() {

    return {
      tableData: [],
      total:0,
      pageNum:1,
      pageSize:5,
      teachername: "",
      sex:"",
      subject: "",
      diglognew:false,
      diglogdelete:false,

      collapseBtnClass: 'el-icon-s-fold',
      isCollapse:false,
      sideWidth : 200,
      textshow : true,
      multipleSelection: [],
      components:{
        Aside,
        Header
      },
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
          { required: true, message: '联系电话不能为空', trigger:'blur'},
          { type:'number',message: '联系电话必须为数字值'}
        ],
        subject:[
          { required: true, message: '擅长科目不能为空', trigger:'blur'}
        ],

      },
      area:[{
        value: '广东省',
        label: '广东省',
        children: [{
          value: '佛山市',
          label: '佛山市',
          children: [{
            value: '顺德区',
            label: '顺德区'
          }, {
            value: '南海区',
            label: '南海区'
          }, {
            value: '禅城区',
            label: '禅城区'
          }, {
            value: '三水区',
            label: '三水区'
          }, {
            value: '高明区',
            label: '高明区'
          }]
        }, {
          value: '广州市',
          label: '广州市',
          children: [{
            value: '番禺区',
            label: '番禺区'
          }, {
            value: '白云区',
            label: '白云区'
          }, {
            value: '海珠区',
            label: '海珠区'
          }, {
            value: '天河区',
            label: '天河区'
          }, {
            value: '南沙区',
            label: '南沙区'
          }, {
            value: '花都区',
            label: '花都区'
          }]
        },{
          value: '深圳市',
          label: '深圳市',
          children: [{
            value: '罗湖区',
            label: '罗湖区'
          }, {
            value: '龙华区',
            label: '龙华区'
          }, {
            value: '福田区',
            label: '福田区'
          }, {
            value: '保安区',
            label: '保安区'
          }, ]
        }]
      }],
      sub: [{
        value: '选项1',
        label: '黄金糕'
      }, {
        value: '选项2',
        label: '双皮奶'
      }, {
        value: '选项3',
        label: '蚵仔煎'
      }, {
        value: '选项4',
        label: '龙须面'
      }, {
        value: '选项5',
        label: '北京烤鸭'
      }],
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
      this.load()
    },

    //  添加界面
    handAdd(){
      this.diglognew=true
      this.teacherform={}
    },
    //添加教员数据
    save(){

      let subject1 = this.subject.join('-')
      this.subject = subject1
      request.post("/teacher",this.teacherform).then(res =>{
        if (res){
          this.$message.success("添加成功")
          this.diglognew = false
          this.load()
        }else{
          this.$message.error("添加失败")
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
