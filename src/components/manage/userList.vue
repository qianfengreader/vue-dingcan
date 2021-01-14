<template>
<div>
  <el-table
    :data="user"
    style="width: 100%"
    :default-sort = "{prop: 'date', order: 'descending'}"
  >
    <el-table-column
      prop="username"
      label="用户名"
      width="180">
    </el-table-column>
    <el-table-column
      prop="tel"
      label="电话"
      width="200">
    </el-table-column>
    <el-table-column
      prop="createtime"
      label="创建时间"
      sortable
      width="150">
    </el-table-column>
    <el-table-column
      prop="updatetime"
      label="修改时间"
      sortable
      width="150">
    </el-table-column>
    <el-table-column
      prop="type"
      label="类型"
      width="200">
    </el-table-column>
    <el-table-column
      label="修改"
      width="150">
      <template slot-scope="scope">
      <el-button type="primary" icon="el-icon-edit" circle @click="updateById(scope.row)"></el-button>
      </template>
    </el-table-column>
    <el-table-column
      label="删除"
      width="200">
      <template slot-scope="scope">
        <el-button type="danger" icon="el-icon-delete" circle @click="deleteById(scope.row.id)"></el-button>
      </template>
    </el-table-column>
  </el-table>
</div>
</template>

<script>
  import axios from 'axios'
    export default {
        name: "",
      data(){
          return{
            user:[],
          }
      },
      methods:{
          findAll:function () {
            axios.post("api/weichat-user/user/findAll").then(res=>{
              if (res.data.code==200){
                this.user=res.data.data;
                alert(res.data.message)
              }else{
                alert(res.data.message)
              }
            })
          },
        updateById:function (user) {
          this.$router.push({name:"updateUser",params:user})
        },
        deleteById:function (id) {
          axios.post("api/weichat-user/user/deleteById",{id:id}).then(res=>{
            if (res.data.code==200){
              alert(res.data.message)
              this.findAll();
            }else{
              alert(res.data.message)
            }
          })
        }
      },
      mounted(){
          this.findAll();
      }
    }
</script>

<style scoped>

</style>
