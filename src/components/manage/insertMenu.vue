<template>
    <div>
      <div style="margin: 20px;"></div>
      <el-form ref="menu" :model="menu" label-width="80px">
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
            action="http://localhost:8888/weichat-menu/menu/upload"
            :show-file-list="false"
            :on-success="handleAvatarSuccess"
            :before-upload="beforeAvatarUpload">
            <img  class="avatar">
            <i  class="el-icon-plus avatar-uploader-icon"></i>
          </el-upload>
        </el-form-item>
        <!--显示图片-->
        <el-form-item label="图片显示">
          <el-image
            style="width: 100px; height: 100px"
            :src="menu.pic"
            fit="fill" v-if="menu.pic!=null && menu.pic!=''"></el-image>
        </el-form-item>

        <!--选择类别-->
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
        <el-form-item label="创建时间">
          <el-col :span="11">
            <el-date-picker type="date" placeholder="选择日期" v-model="menu.createTime" style="width: 100%;"></el-date-picker>
          </el-col>
        </el-form-item>
      </el-form>
      <el-button @click="insertMenu()" type="success" plain>确认添加</el-button>
    </div>
</template>

<script>
  import axios from 'axios';
    export default {
        name: "insertMenu",
        data() {
          return {
            menu: {},
            catalog:[],
          };
        },
        methods:{
          getCatalog:function () {
            axios.get("http://localhost:8888/weichat-menu/catalog/findAll").then(res=>{
              if (res.data.code == 200) {
                alert(res.data.data);
                //console.log(res.data.data);
                this.catalog = res.data.data;
              } else{
                alert(res.data.message);
              }
            })
          },
          insertMenu:function () {
            axios.post("http://localhost:8888/weichat-menu/menu/insertMenu",this.menu).then(res=>{
              if (res.data.code == 200) {
                alert("添加成功")
                this.$router.push("/menu")
              } else {
                alert("添加失败")
                this.$router.push("/menu")
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
       mounted() {
          this.getCatalog();
       }
    }
</script>

<style scoped>

</style>
