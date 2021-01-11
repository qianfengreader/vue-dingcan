<template>
    <div>
      <el-container style="height: 702px; border: 1px solid #eee">
        <!--<el-aside width="200px" style="background-color: rgb(238, 241, 246)">-->
          <!--<el-menu :default-openeds="['1', '3']" style="height: 140px;text-align: center;">-->
            <!--<el-menu-item index="1-1" style="height: 140px;line-height: 140px;font-size: 20px"-->
                          <!--@click="bookmain">嘻嘻</el-menu-item>-->
          <!--</el-menu>-->
          <!--<el-menu :default-openeds="['1', '3']" style="height: 140px;text-align: center;">-->
            <!--<el-menu-item index="1-1" style="height: 140px;line-height: 140px;font-size: 20px"-->
            <!--@click="usermain">嘻嘻</el-menu-item>-->
          <!--</el-menu>-->
          <!--<el-menu :default-openeds="['1', '3']" style="height: 140px;text-align: center;">-->
            <!--<el-menu-item index="1-1" style="height: 140px;line-height: 140px;font-size: 20px"-->
            <!--@click="lamp">轮播图管理</el-menu-item>-->
          <!--</el-menu>-->
          <!--<el-menu :default-openeds="['1', '3']" style="height: 140px;text-align: center;">-->
            <!--<el-menu-item index="1-1" style="height: 140px;line-height: 140px;font-size: 20px"-->
                          <!--@click="dingdan">订单管理</el-menu-item>-->
          <!--</el-menu>-->
          <!--<el-menu :default-openeds="['1', '3']" style="height: 140px;text-align: center;">-->
            <!--<el-menu-item index="1-1" style="height: 140px;line-height: 140px;font-size: 20px"-->
                          <!--@click="paihao">桌号管理</el-menu-item>-->
          <!--</el-menu>-->

        <!--</el-aside>-->

        <el-aside width="200px" style="background-color: rgb(238, 241, 246)">
          <el-menu :default-openeds="['1', '3']">
            <el-submenu index="1">
              <template slot="title"><i class="el-icon-message"></i>业务功能</template>
              <el-menu-item-group>
                <el-menu-item index="1-1" @click="paihao">桌号管理</el-menu-item>
                <el-menu-item index="1-2" @click="dingdan">订单管理</el-menu-item>
                <el-menu-item index="1-3" @click="tongji">统计功能</el-menu-item>
              </el-menu-item-group>
            </el-submenu>

            <el-submenu index="2">
              <template slot="title"><i class="el-icon-setting"></i>连锁店管理</template>
              <el-menu-item-group>
                <el-menu-item index="3-1" @click="toliansuodian">加入连锁店</el-menu-item>
              </el-menu-item-group>
            </el-submenu>

            <el-submenu index="3">
              <template slot="title"><i class="el-icon-menu"></i>餐饮后台</template>
              <el-menu-item-group>
                <el-menu-item index="2-1" @click="toMeNu">菜单管理</el-menu-item>
                <el-menu-item index="2-2" @click="touser">用户管理</el-menu-item>
                <el-menu-item index="2-2" @click="tosousuo">评论管理</el-menu-item>
              </el-menu-item-group>
            </el-submenu>
          </el-menu>
        </el-aside>

        <el-container>
          <el-header style="text-align: right; font-size: 12px">
            <font style="margin-right: 250px;font-size: 40px">后台管理界面</font>

            <font  v-if="user != null" style="font-size: 30px">欢迎您！{{user.username}} &nbsp;/</font>
            <font @click="exitee" style="font-size: 30px">注销</font>

          </el-header>

          <router-view></router-view>

        </el-container>
      </el-container>
    </div>
</template>



<script>
  import axios from 'axios'
  export default {
    data() {
      return{
        user:{}

      }
    },
    methods:{
      // getUser: function () {
      //   axios.post('/api/user/findUserFromToken').then(res=>{
      //     this.user = res.data.data;
      //   })
      // },
      exitee: function () {
        axios.post('api/manager/exit').then(res => {
          if (res.data.code == 200) {
            this.$cookie.set("token", "");
            alert(res.data.message);
            this.$router.push("/");
          } else if (res.data.code == 201) {
            this.$cookie.set("JSESSIONID", "");
            alert(res.data.message);
            this.$router.push("/manager");
          } else {
            alert("注销失败")
          }
        })
      },
      bookmain:function () {
        this.$router.push({
          path:"/managermain/manager_book",
          name:"manager_book",
        })
      },
      usermain:function () {
        this.$router.push({
          path:"/managermain/manager_user",
          name:"manager_user",
        })
      },
      lamp:function () {
        this.$router.push({
          path:"/managermain/manage_lamp",
          name:"manage_lamp",
        })
      },
      dingdan:function () {
        this.$router.push({
          path:"/managermain/manage_orderroot",
          name:"manage_orderroot",
        })
      },
      paihao:function () {
        this.$router.push({
          path:"/managermain/manage_paihao",
          name:"manage_paihao",
        })
      },
      tongji:function () {
        this.$router.push({
          path:"/managermain/pictureTable",
          name:"pictureTable",
        })
      },
      toMeNu:function () {
        this.$router.push({
          path:"/managermain/manage_menu",
          name:"manage_menu",
        })
      },
      touser:function () {
        this.$router.push({
          path:"/managermain/userList",
          name:"userList",
        })
      },
      tosousuo:function () {
        this.$router.push({
          path:"/managermain/comment",
          name:"comment",
        })
      },
      toliansuodian:function () {
        this.$router.push({
          path:"/menu/menu_brand",
          name:"menu_brand",
        })
      },
    },
    mounted(){
      // this.getUser()

    }
  };
</script>

<style>
  .el-header {
    background-color: #B3C0D1;
    color: #333;
    line-height: 60px;
  }

  .el-aside {
    color: #333;
  }
</style>

<style scoped>

</style>


