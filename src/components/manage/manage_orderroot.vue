<template>

  <div>
    <el-table
      :data="list"
      stripe
      style="width: 100%;">
      <el-table-column
        prop="orderId"
        label="订单id"
        width="90">
      </el-table-column>

      <el-table-column
        prop="buyerName"
        label="用户姓名"
        width="150">
      </el-table-column>

      <el-table-column
        prop="buyerPhone"
        label="手机号"
        width="150">
      </el-table-column>

      <el-table-column
        prop="buyerAddress"
        label="桌号"
        width="90">
      </el-table-column>

      <el-table-column
        prop="orderAmount"
        label="订单总金额"
        width="120">
      </el-table-column>

      <el-table-column
        prop="orderStatus"
        label="订单状态"
        width="100"
        :formatter="stateFormat">
      </el-table-column>

      <el-table-column
        prop="cuidan"
        label="被催单次数"
        width="100">
      </el-table-column>

      <el-table-column
        prop="createTime"
        label="创建时间"
        width="120">
      </el-table-column>

      <el-table-column
        label="操作">

        <template slot-scope="scope">
          <el-button type="success" plain @click="openorderdetail(scope.row.orderId)">订单详情</el-button>
          <el-button type="success" plain @click="cancels(scope.row.orderId)">订单取消</el-button>
          <el-button type="success" plain @click="deleteorder(scope.row.orderId)">订单删除</el-button>
        </template>

      </el-table-column>
    </el-table>


    <div>


      <el-dialog title="订单详情" :visible.sync="dialogFormVisible">
        <hr>
        <div style="font-size: 30px">
          订单编号:
          <font style="color: red;font-size: 50px;">
            {{this.ooorderId}}
          </font>
        </div>
        <el-row>
          <el-col :span="8" v-for="(o, index) in details" :key="o" :offset="index > 0 ? 4 : 0" style="margin-left: 80px;margin-top: 20px">
            <el-card :body-style="{ padding: '0px' }" shadow="hover">
              <img :src="o.foodIcon" class="image" style="height: 200px;">
              <div style="padding: 14px;">
                <el-row>
                  <el-col :span="24"><div class="grid-content bg-purple-dark">

                    <el-col :span="12"><div class="grid-content bg-purple">
                      <span style="font-size: 30px;font-family: 幼圆;font-weight: 900">{{o.foodName}}</span>

                    </div></el-col>
                    <el-col :span="12"><div class="grid-content bg-purple-light">
                      <span style="font-size: 25px;margin-left: 60px;font-weight: 900">×&nbsp;&nbsp;{{o.foodQuantity}}</span>
                    </div></el-col>

                  </div></el-col>
                </el-row>

                <el-row>
                  <el-col :span="24"><div class="grid-content bg-purple-dark">

                    <div style="font-size: 40px;margin-top: 20px;color: orange;margin-left: 100px">{{o.foodPrice}}&nbsp;元</div>

                  </div></el-col>
                </el-row>






              </div>
            </el-card>
          </el-col>
        </el-row>

        <br>
        <span style="font-size: 40px;margin-left: 450px">
              总计:&nbsp;{{this.amount}}元
            </span>

        <hr>

        <div slot="footer" class="dialog-footer">


          <el-button type="success" @click="finishing()">订单已完成</el-button>
          <el-button type="danger" @click="motailcancels()">取消订单</el-button>
          <el-button @click="dialogFormVisible = false">取 消</el-button>
          <!--<el-button @click="resetForm('ruleForm')">重置</el-button>-->
        </div>
      </el-dialog>
    </div>


  </div>





</template>

<script>
  import axios from 'axios'
  export default {
    name: "manage_orderroot",
    data(){
      return{
        list:[],
        ooorderId:'',

        /*模态框*/
        dialogTableVisible: false,
        dialogFormVisible: false,
        details:[], //详情
        amount:'',  //总价
        formLabelWidth: '120px'
      }
    },
    methods:{
      stateFormat:function (row) {
        if (row.orderStatus === 1) {
          return '已支付'
        }else if (row.orderStatus === 2) {
          return '已取消'
        }else if (row.orderStatus === 3) {
          return '待评价'
        }else if (row.orderStatus === 4) {
          return '完成'
        }
      },
      findAll:function () {
        axios.get("api/weichat-zilongdingcan/adimOrder/list").then(res=>{
          if (res.data.code == 200) {
            this.list=res.data.data
          }
        })
      },
      findByFoodId:function(){
        //alert("进入模态框find方法时id==="+this.ooorderId)
        axios.post("api/weichat-zilongdingcan/adimOrder/detail",{orderId:this.ooorderId}).then(res=>{
          if (res.data.code == 200) {
            this.details=res.data.data
          }
        })
      },
      findAmount:function(){
        axios.post("api/weichat-zilongdingcan/adimOrder/findAmount",{orderId:this.ooorderId}).then(res=>{
          if (res.data.code == 200) {
            this.amount=res.data.data.orderAmount
          }
        })
      },
      openorderdetail:function (id) {//打开模态框
        this.ooorderId=id;
        this.dialogFormVisible = true;
        this.findByFoodId();
        this.findAmount();
      },
      finishing:function () { //订单完成
        this.dialogFormVisible = false
        axios.post("api/weichat-zilongdingcan/adimOrder/finish",{id:this.ooorderId}).then(res=>{
          if (res.data.code == 200) {
            alert(res.data.msg)
            this.findAll()
          }else {
            alert(res.data.msg)
          }
        })
      },
      cancels:function (id) {   //取消订单
        axios.post("api/weichat-zilongdingcan/adimOrder/cancel",{id:id}).then(res=>{
          if (res.data.code == 200) {
            alert(res.data.msg)
            this.dialogFormVisible = false
            this.findAll()
          }else {
            alert(res.data.msg)
          }
        })
      },
      motailcancels:function (id) {   //模态框取消订单
        this.dialogFormVisible = false
        axios.post("api/weichat-zilongdingcan/adimOrder/cancel",{id:this.ooorderId}).then(res=>{
          if (res.data.code == 200) {
            alert(res.data.msg)
            this.findAll()
          }else {
            alert(res.data.msg)
          }
        })
      },
      deleteorder:function (id) {//删除
        axios.post("api/weichat-zilongdingcan/adimOrder/remove",{id:id}).then(res=>{
          if (res.data.code == 200) {
            alert(res.data.msg)
            this.findAll()
          }
        })
      },

    },
    mounted(){
      this.findAll();
    },
  }

</script>

<style>
  .time {
    font-size: 13px;
    color: #999;
  }

  .bottom {
    margin-top: 13px;
    line-height: 12px;
  }

  .button {
    padding: 0;
    float: right;
  }

  .image {
    width: 100%;
    display: block;
  }

  .clearfix:before,
  .clearfix:after {
    display: table;
    content: "";
  }

  .clearfix:after {
    clear: both
  }
</style>
