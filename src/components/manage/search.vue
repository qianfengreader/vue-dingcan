<template>

  <div>
    <el-row>
      <el-col :offset="11">
        <el-button type="primary" @click="goback">返回</el-button >
      </el-col>
    </el-row>

    <template>
      <el-table
        :data="tableData"
        style="width: 100%">
        <el-table-column
          prop="id"
          label="编号"
          width="70">
        </el-table-column>

        <el-table-column
          prop="avatarurl"
          label="用户头像"
          width="250">
        </el-table-column>

        <el-table-column
          label="图片显示"
          width="200">
          <template slot-scope="scope">
            <img  :src="scope.row.avatarurl"  style="width: 100px;height: 100px">
          </template>
        </el-table-column>

        <el-table-column
          prop="name"
          label="用户名"
          width="180">
        </el-table-column>

        <el-table-column
          prop="info"
          label="评论"
          width="180">
          <template slot-scope="scope">
            <p v-html='scope.row.info'></p>
          </template>
        </el-table-column>


        <el-table-column
          prop="openid"
          label="用户标识"
          width="180">
        </el-table-column>

        <el-table-column
          fixed="right"
          label="操作"
          width="100">
          <template slot-scope="scope">
            <el-button @click="handleClick(scope.row.id)" type="text" size="small">删除</el-button>
            <!--<el-button @click="insertOrder()" type="text" size="small">新增</el-button>-->
          </template>
        </el-table-column>

      </el-table>
    </template>


    <!--分页-->
    <div>
      <el-pagination
        background
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="this.page"
        :page-sizes="[4, 6, 8, 10]"
        :page-size="this.size"
        layout="total, sizes, prev, pager, next, jumper"
        :total="this.total">
      </el-pagination>
    </div>
  </div>

</template>

<script>
  import axios from 'axios'
  export default {
    data() {
      return {
        tableData: [],
        total:1,
        page:1,
        size:4,
      }
    },
    methods:{
      handleSizeChange(val) {
        this.size=val;
        this.sosuo();
      },
      handleCurrentChange(val) {
        this.page=val;
        this.sosuo();
      },




      handleClick:function (id) {
        axios.post("api/weichat-comments/deleteCommentsByMid",{"id":id}).then(res=>{
          if (res.data.code==200){
            const h = this.$createElement;
            this.$message({
              message: h('p', null, [
                h('span', null, '删除 '),
                h('i', { style: 'color: teal' }, '成功')
              ])
            });
            this.findAllComment();
          }
          if (res.data.code==201){
            const h = this.$createElement;
            this.$message({
              message: h('p', null, [
                h('span', null, '删除 '),
                h('i', { style: 'color: teal' }, '失败')
              ])
            });
          }
        })
      },
      goback:function(){
        this.$router.push('/managermain/comment')
      },
      sosuo:function () {
        console.log(this.$route.params.openid)

        axios.post("http://localhost:7000/weichat-search/searchComment?key="+this.$route.params.openid+"&page="+this.page+"&size="+this.size).then(res=>{
          if (res.data.code==200){
            console.log(res.data.data)
            this.tableData=res.data.data;
            this.total=res.data.total;
          }
          if (res.data.code==201){
            alert(res.data.message)
          }
          if (res.data.code==202){
            alert(res.data.message)
          }
        })
      }
    },
    mounted(){
      this.sosuo();
    }
  }
</script>

<style scoped>
  .el-input {
    width: 20%;
  }

</style>

