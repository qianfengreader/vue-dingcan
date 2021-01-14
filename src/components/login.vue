<template>
  <div id="particles" align="center">
    <div class="container">
      <div class="login-box" >
        <el-form ref="form" :model="user" :rules="rules" lable-width="80px" style="line-height: 20px;margin-top: 20px">
          <h3 style="color: salmon;font-size: 40px">登 &nbsp;&nbsp; 录</h3>
          <el-form-item label="用户名" prop="username">
            <el-input v-model="user.username" placeholder="请输入用户名"></el-input>
          </el-form-item>
          <el-form-item label="密码" prop="password">
            <el-input type="password" v-model="user.password" placeholder="请输入密码"></el-input>
          </el-form-item>
          <el-form-item >

            <el-row>
              <el-col :span="5"><div class="grid-content ">
                <el-button type="primary" @click="login">登录</el-button>
              </div></el-col>
              <el-col :span="5" :offset="4"><div class="grid-content">
                <el-button type="primary" @click="registry">注册</el-button>
              </div></el-col>
            </el-row>
          </el-form-item>
        </el-form>
      </div>
    </div>
  </div>
</template>

<script>
  import axios from 'axios';
  import particlesJson from '../assets/particles.json'
  import particles from 'particles.js'
  import ElementUI from 'element-ui'

  export default {
    name: 'Login',
    data () {
      return {
        user:{},

        rules:{
          username: [
            { required:true, message:'用户名不能为空', trigger:'blur' },
          ],
          password:[
            {
              required:true, message:'密码不能为空', trigger:'blur'
            },
          ]
        }
      }
    },
    methods :{
      registry:function(){
        this.$router.push({
          path: "/registry",
          /*要跳转的路径的 name,在 router 文件夹下的 index.js 文件内找'*/
          name: "registry",
        })
      },
      login:function () {
        axios.post("http://localhost:8087/user/login",{username:this.user.username,password:this.user.password}).then(res=>{
          if (res.data.code==200){
            //获取到用户的token 设置到cookie中
            this.$cookie.set("token",res.data.data)
            //跳转页面
            this.$router.push("/managermain")
            alert(res.data.message)
          }else{
            alert(res.data.message)
          }

        })
      }
    },
    mounted(){
      // particles是我们设置的id，particlesJson是我们引入的json文件
      particlesJS('particles', particlesJson,);
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  #particles{
    position: absolute;
    width: 99%;
    height: 98%;
    background-color: #000000;
    background-repeat: no-repeat;
    background-size: cover;
    background-position: 50% 50%;
  }
  .container{
    position: absolute;
    margin-left: auto;
    margin-right: auto;
    left: 0;
    right: 0;
    margin-top: 15%;
    padding: 0em 8em;
    background: rgba(22, 26, 33, 0.8);
    border-radius: 24px;
    width: 250px;
    display:inline-block;
  }


</style>
