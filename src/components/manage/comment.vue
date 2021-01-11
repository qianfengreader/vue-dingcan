<template>

  <div>
    <el-row>
      <el-col :offset="8">
        <el-input v-model="openid" placeholder="请选择用户标识" size="150px"></el-input>
        <el-button type="primary" @click="sosuo()">查询</el-button >
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
          width="180">
        </el-table-column>

        <el-table-column
          prop="username"
          label="用户名"
          width="180">
        </el-table-column>

        <el-table-column
          prop="utel"
          label="手机号"
          width="180">
        </el-table-column>

        <el-table-column
          prop="info"
          label="评论"
          width="180">
        </el-table-column>

        <el-table-column
          prop="createtime"
          label="评论时间"
          width="180">
        </el-table-column>

        <el-table-column
          prop="mid"
          label="菜品编号"
          width="100">
        </el-table-column>

        <el-table-column
          prop="score"
          label="菜品得分"
          width="100">
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
        openid:'',
        total:1,
        page:1,
        size:4,
      }
    },
    methods:{
      handleSizeChange(val) {
        this.size=val;
        this.findAllComment();
      },
      handleCurrentChange(val) {
        this.page=val;
        this.findAllComment();
      },


      findAllComment:function () {
        axios.post("http://localhost:7000/weichat-comments/findAllComments?page="+this.page+"&size="+this.size).then(res=>{
          console.log(res.data.data)
          if (res.data.code==200){
            this.tableData=res.data.data;
            this.total=res.data.total;
          }
          if (res.data.code==201){
            alert(res.data.message)
          }
        })
      },

      handleClick:function (id) {
        axios.post("http://localhost:7000/weichat-comments/deleteCommentsByMid",{"id":id}).then(res=>{
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
      sosuo:function () {
        console.log(this.openid)
        /*this.$router.push({name:'usercomment',params:{openid:this.openid}})*/
        this.$router.push({name:'search',params:{openid:this.openid}})
      }
    },
    mounted(){
      this.findAllComment();
    }
  }
</script>

<style scoped>
  .el-input {
    width: 20%;
  }

</style>

