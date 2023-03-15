<template>
  <div>
    <!--            搜索框-->
    <div style="padding: 10px 0">
      <el-input style="width: 200px;margin: 0 5px 0 5px" suffix-icon="el-icon-search" placeholder="请输入名称" v-model="teachername"></el-input>
      <el-select v-model="sex" placeholder="请选择性别" style="width: 200px;margin: 0 5px 0 5px" suffix-icon="el-icon-user">
        <el-option label="男" value="男"></el-option>
        <el-option label="女" value="女"></el-option>
      </el-select>
      <el-select v-model="subject" placeholder="请选择科目" style="width: 200px;margin: 0 5px 0 5px" suffix-icon="el-icon-user">
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
<!--    批量删除-->
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
<!--    表格-->
    <el-table :data="tableData" border style="width: 100%"  @selection-change="handleSelectionChange">
      <el-table-column
          type="selection"
          width="55">
      </el-table-column>
      <el-table-column prop="id" label="教员编号" width="120" fixed>
      </el-table-column>
      <el-table-column prop="account" label="教员账号"width="150">
      </el-table-column>
      <el-table-column prop="teachername" label="教师名称" width="120">
      </el-table-column>
      <el-table-column prop="sex" label="性别">
      </el-table-column>
      <el-table-column prop="iden" label="身份" width="300">
      </el-table-column>
      <el-table-column prop="phone" label="手机"width="200">
      </el-table-column>
      <el-table-column prop="subject" label="擅长科目">
      </el-table-column>
      <el-table-column prop="wxnumber" label="微信号"width="200">
      </el-table-column>
      <el-table-column prop="price" label="时薪">
      </el-table-column>
      <el-table-column prop="school" label="毕业院校">
      </el-table-column>
      <el-table-column prop="address" label="居住地址">
      </el-table-column>
      <el-table-column
          fixed="right"
          label="操作"
          width="120">
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

    <el-dialog title="教员信息" :visible.sync="diglognew" width="40%">
      <el-form :model="teacherform" :rules="rules" ref="ruleteacher" label-width="100px" label-position="left">
        <el-form-item label="教员名称" porp="teachername">
          <el-input v-model="teacherform.teachername" autocomplete="off" placeholder="不能为空"></el-input>
        </el-form-item>
        <el-form-item label="账号" prop="account">
          <el-input v-model.number="teacherform.account" autocomplete="off"></el-input>
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
        <el-button @click="diglognew = false">取 消</el-button>
        <el-button type="primary" @click="save">确 定</el-button>
      </div>

    </el-dialog>
  </div>
</template>

<script>
import request from "@/utils/request";

export default {
  name: "User",
  data(){
    return{
      tableData: [],
      total:0,
      pageNum:1,
      pageSize:5,
      teachername: "",
      sex:"",
      subject: "",
      diglognew:false,
      diglogdelete:false,
      multipleSelection: [],
      teacherform:{
        teachername:'',
        account:'',
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
      area:[{
        value: '广东省',
        label: '广东省',
        children: [{
          value: '佛山市',
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
          value: '广州市',
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
          value: '深圳市',
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
    }
  },
  created() {
    this.load()
  },
  methods:{
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
      this.load()
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

<style scoped>

</style>