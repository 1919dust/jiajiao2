<template>
  <div>
    <div style="padding: 10px 0">
      <!--            搜索框-->
      <el-input style="width: 200px;margin: 0 5px 0 5px" suffix-icon="el-icon-search" placeholder="请输入订单编号" v-model="id"></el-input>
      <el-input style="width: 200px;margin: 0 5px 0 5px" suffix-icon="el-icon-search" placeholder="请输入学员编号" v-model="studentid"></el-input>
      <el-input style="width: 200px;margin: 0 5px 0 5px" suffix-icon="el-icon-search" placeholder="请输入教员编号" v-model="teacherid"></el-input>
      <el-button class="ml-5" type="primary" @click="load">搜索</el-button>
      <el-button class="ml-5" type="warning" @click="reset">重置</el-button>
    </div>
    <div style="padding: 10px 0">
      <el-button type="danger" round icon="el-icon-remove-outline" @click="diglogdelete = true">批量删除</el-button>
      <el-dialog
          title="删除订单"
          :visible.sync="diglogdelete"
          :append-to-body="true"
          :close-on-click-modal="false"
      >
        <span>确定删除该订单吗？</span>
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

  </div>
</template>

<script>
import request from "@/utils/request";

export default {
  name: "Booking",
  data(){
    return{
      tableData: [],
      total:0,
      pageNum:1,
      pageSize:5,
      id: "",
      studentid:"",
      teacherid: "",

      diglognew:false,
      diglogdelete:false,
      multipleSelection: [],
    }
  },
  created() {
    this.load()
  },
  methods:{
    load(){
      request.get("/booking/page",{
        params:{
          pageNum: this.pageNum,
          pageSize: this.pageSize,
          id: this.id,
          studentid: this.studentid,
          teacherid: this.teacherid
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
      this.id = ""
      this.studentid = ""
      this.teacherid = ""
      this.load()
    },

    del(id){
      request.delete("/booking/"+id).then(res =>{
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
      request.post("/booking/del/batch",ids).then(res =>{
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