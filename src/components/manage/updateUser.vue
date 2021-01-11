<template>
    <div>
      <el-form :label-position="labelPosition" label-width="80px" :model="user">
        <el-form-item label="用户名">
          <el-input v-model="user.username"></el-input>
        </el-form-item>
        <el-form-item label="手机号">
          <el-input v-model="user.tel"></el-input>
        </el-form-item>
        <el-form-item label="类型">
          <el-input v-model="user.type"></el-input>
        </el-form-item>
      </el-form>
      <el-button type="primary" icon="el-icon-check" circle @click="submitUser" style="margin-left: 750px"></el-button>
    </div>
</template>

<script>
  import axios from 'axios'
    export default {
      name: "",
      data() {
        return {
          labelPosition: 'top',
          user:{}
        };
      },
      methods:{
        submitUser:function () {
            axios.post("http://localhost:7000/weichat-user/user/updateById",this.user).then(res=>{
                alert(res.data.message)
                this.$router.push("userList")
            })
        }
      },
      mounted(){
        this.user=this.$route.params
      }
    }
</script>

<style>

</style>
