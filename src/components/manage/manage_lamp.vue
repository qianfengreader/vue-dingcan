<template>

  <div>

  <div style="margin-top: 20px;margin-left: 10px">

    <el-row>
      <el-col :span="8"><div class="grid-content ">
        <el-button type="warning" icon="el-icon-plus" circle @click="insertlamp()"></el-button>
        <!--<form enctype="multipart/form-data">
          <input t></input>
        </form>-->
      </div></el-col>

      <el-col :span="12"><div class="grid-content ">
        <font style="font-size: 30px;color: salmon">&nbsp;轮播图管理</font>

      </div></el-col>
      <el-col :span="2"><div class="grid-content ">


          <a href="http://localhost:8887/lamp/exportLamp" >
            <el-button type="success">
              导出数据
            </el-button>

          </a>



      </div></el-col>
    </el-row>

  </div>

  <div :model="lamplist">
    <template>
      <el-table
        :data="lamplist"
        stripe
        style="width: 100%">
        <el-table-column
          prop="id"
          label="轮播图编号"
          width="180">
        </el-table-column>

        <el-table-column
          prop="createtime"
          label="创建时间"
          width="300">
        </el-table-column>

        <!--<el-table-column-->
          <!--prop="info"-->
          <!--label="图片描述"-->
          <!--width="180">-->
        <!--</el-table-column>-->

        <el-table-column
          label="图片显示"
          width="300">
          <template slot-scope="scope">
            <img  :src="scope.row.url"  style="width: 150px;height: 100px">
          </template>
        </el-table-column>



        <el-table-column
          prop="address"
          label="操作">

          <template slot-scope="scope">
            <el-button type="success" plain @click="updatelamp(scope.row.id)">修改</el-button>
            <el-button type="success" plain @click="deletelamp(scope.row.id)">删除</el-button>
          </template>

        </el-table-column>
      </el-table>


      <div :model="form">


        <el-dialog title="收货地址" :visible.sync="dialogFormVisible">
          <el-form >

            <!--<el-form-item label="图片描述" :label-width="formLabelWidth">-->
              <!--<el-input v-model="form.info" autocomplete="off"></el-input>-->
            <!--</el-form-item>-->
            <el-form-item label="图片链接" :label-width="formLabelWidth">
              <el-input v-model="form.url" autocomplete="off"></el-input>
            </el-form-item>


            <el-form-item label="图片" :label-width="formLabelWidth" >
              <!--<el-input v-model="form.btime" autocomplete="off"></el-input>-->
              <el-upload
                class="avatar-uploader"
                action="api/lamp/upload"
                :show-file-list="false"
                :on-success="handleAvatarSuccess"
                :before-upload="beforeAvatarUpload">

                <!--    <div><i  class="el-icon-plus avatar-uploader-icon"></i></div>-->

                <img  class="avatar">
                <i  class="el-icon-plus avatar-uploader-icon"></i>
              </el-upload>
            </el-form-item>

            <el-form-item label="图片显示" :label-width="formLabelWidth">
              <el-image
                style="width: 100px; height: 100px"
                :src="form.url"
                fit="fill" v-if="form.url!=null && form.url!=''"></el-image>
            </el-form-item>


          </el-form>

          <div slot="footer" class="dialog-footer">
            <el-button type="primary" @click="saveAndFlushToXiuGai(form.bid)">确 定</el-button>
            <el-button @click="dialogFormVisible = false">取 消</el-button>
            <!--<el-button @click="resetForm('ruleForm')">重置</el-button>-->
          </div>
        </el-dialog>
      </div>


    </template>
  </div>
  </div>
</template>

<script>
  import axios from 'axios'
  export default {
    name: "manage_lamp",
    data(){
      return{
        lamplist:[],

        /*模态框*/
        dialogTableVisible: false,
        dialogFormVisible: false,
        form: {

          info: '',
          url:'',
        },
        imgurl:'',  //图片上传返回值验证
        formLabelWidth: '120px'
      }
    },
    methods:{
      insertlamp:function(){  /*新增打开模态框*/
        this.form={}
        this.dialogFormVisible = true
      },
      updatelamp:function(id){  //点击修改弹出模态框
        this.dialogFormVisible = true
        this.findByIdLamp(id)
      },
      deletelamp:function (id) {
        alert(id)
        axios.post("api/weichat-zilongdingcan/lamp/deleteLamp",{id:id}).then(res=>{
          if (res.data.code == 200) {
            alert(res.data.message)
            this.findAll();
          }
        })
      },
      findByIdLamp:function(id){
        axios.post("api/weichat-zilongdingcan/lamp/findByIdLamp",{id:id}).then(res=>{
          if (res.data.code == 200) {
            this.form = res.data.data;
          }
        })
      },
      saveAndFlushToXiuGai: function (id) {/*修改或者新增   模态框点击 确定*/
        this.dialogFormVisible = false
        axios.post("api/weichat-zilongdingcan/lamp/saveAndFlush", this.form).then(res => {
          if (res.data.code == 201) {
            alert(res.data.message)
          }
          if (res.data.code == 200) {
            alert(res.data.message)
          }
          this.findAll()
          this.form={}
        })
      },

      findAll:function () {
        axios.get("api/weichat-zilongdingcan/lamp/findAll").then(res=>{
          if (res.data.code == 200) {
            this.lamplist=res.data.data
          }
        })
      },
      /*---------------------------------------------*/
      handleAvatarSuccess(res, file) {  /*图片上传*/
        //res代表上传完成后的返回值
        console.log(res)
        this.form.url=res.data;
        this.imgurl = URL.createObjectURL(file.raw);/*地址所在 全路径*/
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
      },

    },
    mounted(){
      this.findAll();
    },
  }
</script>

<style scoped>

</style>
