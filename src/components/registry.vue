<template>
  <div>
    <div id="particles" align="center">
      <div class="container">
      <el-form  label-width="80px" :model="user" :rules="rules" style="line-height: 20px;margin-top: 20px">
        <h3 style="color: salmon;font-size: 40px">注 &nbsp;&nbsp; 册</h3>
      <el-form-item label="用户名">
        <el-input v-model="user.username" placeholder="请输入用户名"></el-input>
      </el-form-item>
      <el-form-item label="邮箱">
          <div class="grid-content bg-purple">
            <el-input v-model="user.email" placeholder="请输入邮箱"></el-input>
          </div>
      </el-form-item>
        <el-form-item label="类型">
          <el-input v-model="user.type" placeholder="请输入类型"></el-input>
        </el-form-item>
      <el-form-item label="密码">
        <el-input v-model="user.password" placeholder="请输入密码"></el-input>
      </el-form-item>
      <el-form-item label="手机号">
        <el-input v-model="user.tel" placeholder="请输入手机号"></el-input>
      </el-form-item>
        <el-form-item >
          <el-row>
            <el-col :span="10"><div class="grid-content bg-purple">
              <el-button type="primary" @click="registry">注册</el-button>
            </div></el-col>
            <el-col :span="10" :offset="4"><div class="grid-content bg-purple-light">
              <el-button type="primary" @click="tologin">登录</el-button>
            </div></el-col>
          </el-row>
        </el-form-item>
    </el-form>
    <!--<el-button type="success" icon="el-icon-check" @click="registry" circle></el-button>-->

  </div>
    </div>
  </div>
</template>

<script>
  import axios from 'axios';
  import particlesJson from '../assets/particles.json';
  import particles from '../../node_modules/particles.js/particles';
  export default {
  name: '',
  data () {
    return {
      user:{},

      rules:{ /*验证空*/
        username: [
          { required:true, message:'用户名不能为空', trigger:'blur' },
        ],
        password:[
          {
            required:true, message:'密码不能为空', trigger:'blur'
          },
        ],
        email: [
          { required:true, message:'邮箱不能为空', trigger:'blur' },
        ],
      }
    }
  },
  methods:{
    tologin:function(){
      this.$router.push({
        path:'/',
        name:'login',
      })
    },
    registry:function () {
      axios.post("api/weichat-user/user/registry",this.user).then(res=>{
        if (res.data.code==200){
          alert(res.data.message)
         this.$router.push("/")
        }else{
          alert(res.data.message)
        }
      })
    }
  },
    mounted(){
      // particles是我们设置的id，particlesJson是我们引入的json文件
      particlesJS('particles', particlesJson);
    }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h1, h2 {
  font-weight: normal;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
.container{
  position: absolute;
  margin-left: auto;
  margin-right: auto;
  left: -6%;
  right: 0;
  margin-top: 10%;
  padding: 0em 8em;
  background: rgba(22, 26, 33, 0.8);
  border-radius: 24px;
  width: 325px;
  display:inline-block;
}
#particles{
  position: absolute;
  width: 99%;
  height: 98%;
  background-color: #000000;
  background-repeat: no-repeat;
  background-size: cover;
  background-position: 50% 50%;
}
</style>
