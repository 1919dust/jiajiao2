<template>
<div>
  <!--  搜索框-->
  <div style="padding: 10px 0">
    <el-input style="width: 200px;margin: 0 5px 0 5px" suffix-icon="el-icon-search" placeholder="请输入名称" v-model="sname"></el-input>
    <el-select v-model="ssex" placeholder="请选择性别" style="width: 200px;margin: 0 5px 0 5px" suffix-icon="el-icon-user">
      <el-option label="男" value="男"></el-option>
      <el-option label="女" value="女"></el-option>
    </el-select>
    <el-select v-model="ssubject" placeholder="请选择补习科目" style="width: 200px;margin: 0 5px 0 5px" suffix-icon="el-icon-user">
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
  <!--  新增/批量删除-->
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
  <!--  表格-->
  <el-table :data="tableData" border style="width: 100%"  @selection-change="handleSelectionChange">
    <el-table-column
        type="selection"
        width="55">
    </el-table-column>
    <el-table-column prop="id" label="学员编号">
    </el-table-column>
    <el-table-column prop="saccount" label="学员账号">
    </el-table-column>
    <el-table-column prop="sname" label="学员名称" width="120">
    </el-table-column>
    <el-table-column prop="ssex" label="性别">
    </el-table-column>
    <el-table-column prop="sgrade" label="年级">
    </el-table-column>
    <el-table-column prop="sphone" label="联系手机" width="120">
    </el-table-column>
    <el-table-column prop="ssubject" label="补习科目">
    </el-table-column>
    <el-table-column prop="sprice" label="时薪">
    </el-table-column>
    <el-table-column prop="saddress" label="居住地址">
    </el-table-column>
    <el-table-column prop="srequest" label="要求">
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

  <el-dialog title="新增学员信息" :visible.sync="diglognew" width="40%">
    <el-form :model="studentform" :rules="rules" ref="ruleteacher" label-width="100px" label-position="left">
      <el-form-item label="学员名称" porp="sname">
        <el-input v-model="studentform.sname" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item label="账号" porp="saccount">
        <el-input v-model="studentform.saccount" autocomplete="off"></el-input>
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
        <el-input v-model="studentform.request" autocomplete="off"></el-input>
      </el-form-item>

    </el-form>
    <div slot="footer" class="dialog-footer">
      <el-button @click="diglognew = false">取 消</el-button>
      <el-button type="primary" @click="save">确 定</el-button>
    </div>

  </el-dialog>

</div>
</template>

<script>
import request from "@/utils/request";

export default {
  name: "Student",
  data(){
    return{
      tableData: [],
      total:0,
      pageNum:1,
      pageSize:5,
      sname: "",
      ssex:"",
      ssubject: "",
      diglognew:false,
      diglogdelete:false,
      multipleSelection: [],
      studentform:{
        sname:'',
        saccount:'',
        spassword:'',
        ssex:'',
        sgrade:'',
        sphone:'',
        ssubject:'',
      },
      rules:{
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
      }]
    }
  },
  created() {
    this.load()
  },
  methods:{
    load(){
      request.get("/student/page",{
        params:{
          pageNum: this.pageNum,
          pageSize: this.pageSize,
          sname: this.sname,
          ssex: this.ssex,
          ssubject: this.ssubject
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
      this.sname = ""
      this.ssex = ""
      this.ssubject = ""
      this.load()
    },

    //  添加界面
    handAdd(){
      this.diglognew=true
      this.studentform={}
    },
    //添加教员数据
    save(){
      request.post("/student",this.studentform).then(res =>{
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
      this.studentform = row
      this.diglognew = true
    },
    del(id){
      request.delete("/student/"+id).then(res =>{
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
      request.post("/student/del/batch",ids).then(res =>{
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

<style scoped>

</style>