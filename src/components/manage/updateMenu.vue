<template>
    <div>
      <div style="margin: 20px;"></div>
      <el-form ref="menu" :model="menu" label-width="80px">
        <el-form-item label="编号">
          <el-input v-model="menu.id"></el-input>
        </el-form-item>
        <el-form-item label="名称">
          <el-input v-model="menu.cname"></el-input>
        </el-form-item>
        <el-form-item label="单价">
          <el-input v-model="menu.price"></el-input>
        </el-form-item>
        <el-form-item label="库存">
          <el-input v-model="menu.inventory"></el-input>
        </el-form-item>
        <el-form-item label="基本信息">
          <el-input v-model="menu.info"></el-input>
        </el-form-item>
        <el-form-item label="图片">
          <!--<el-input v-model="menu.pic"></el-input>-->
          <el-upload
            class="avatar-uploader"
            action="api/weichat-menu/menu/upload"
            :show-file-list="false"
            :on-success="handleAvatarSuccess"
            :before-upload="beforeAvatarUpload">
            <img  class="avatar">
            <i  class="el-icon-plus avatar-uploader-icon"></i>
          </el-upload>
        </el-form-item>

        <el-form-item label="图片显示">
          <el-image
            style="width: 100px; height: 100px"
            :src="menu.pic"
            fit="fill" v-if="menu.pic!=null && menu.pic!=''"></el-image>
        </el-form-item>

        <el-form-item label="类别">
          <template>
            <el-select v-model="menu.typename" placeholder="请选择类别">
              <el-option
                v-for="item in catalog"
                :key="item.typename"
                :label="item.typename"
                :value="item.typename">
              </el-option>
            </el-select>
          </template>
        </el-form-item>
        <el-form-item label=创建时间>
          <el-input v-model="menu.createTime"></el-input>
        </el-form-item>
        <el-form-item label="修改时间">
          <el-input v-model="menu.updateTime" type="date">
          </el-input>
        </el-form-item>
      </el-form>
      <el-button @click="updateMenu()" type="success" plain>确认修改</el-button>
    </div>
</template>

<script>
  import axios from 'axios'
    export default {
        name: "updateMenu",
        data() {
          return {
            id:"",/*接收上一个页面传来的id*/
            menu:{},
            catalog:[],
          }
        },
        methods:{
          getCatalog:function () {
            axios.get("api/weichat-menu/catalog/findAll").then(res=>{
              if (res.data.code == 200) {
                //alert(res.data.data)
                this.catalog = res.data.data;
              }else{
                alert("没有权限");
              }
            })
          },
          findById:function () {
            axios.post("api/weichat-menu/menu/findById?id="+this.id).then(res=>{
              //alert(this.id)
              if (res.data.code == 200) {
                alert("获取信息成功");
                this.menu = res.data.data;
              } else{
                alert("没有权限");
              }
            })
          },
          updateMenu:function () {
            axios.post("api/weichat-menu/menu/updateMenu",this.menu).then(res=>{
              if (res.data.code == 200) {
                alert("修改成功");
                this.$router.push("/managermain/manage_menu")
              }else{
                alert("没有权限");
              }
            })
          },
          handleAvatarSuccess(res, file) {  /*图片上传*/
            //res代表上传完成后的返回值
            //alert(res.data);
            this.menu.pic=res.data;
            /*this.imgurl = URL.createObjectURL(file.raw);/!*地址所在 全路径*!/
            alert(this.menu.img)*/

          },
          beforeAvatarUpload(file) {
            const isJPG = file.type === 'image/jpeg';
            const isLt2M = file.size / 1024 / 1024 < 2;

            if (!isJPG) {
              this.$message.error('上传头像图片只能是 JPG 格式!');
            }
            if (!isLt2M) {
              this.$message.error('上传头像图片大小不能超过 2MB!');
            }
            return isJPG && isLt2M;
          }
        },
        mounted(){
          /*从query获取id*/
          this.id = this.$route.query.id;
          this.findById();
          this.getCatalog();
        }
    }
</script>

<style scoped>

</style>
