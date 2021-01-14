<template>

  <div>
    <template>
      <el-table
        :data="paihaolist"
        stripe
        style="width: 100%">
        <el-table-column
          prop="id"
          label="排号号码"
          width="180">
        </el-table-column>

        <el-table-column
        prop="num"
        label="座位号"
        width="180">
      </el-table-column>

        <el-table-column
          prop="type"
          label="类型(0小桌/1大桌)"
          width="180">
        </el-table-column>
        <el-table-column
          prop="day"
          label="领取号码的时间"
          width="180">
        </el-table-column>
        <el-table-column
          prop="address"
          label="操作">

          <template slot-scope="scope">
            <el-button type="success" plain @click="tongguo(scope.row.id)">可入座</el-button>
          </template>

        </el-table-column>
      </el-table>
    </template>
  </div>




</template>

<script>
  import axios from 'axios'
    export default {
        name: "manage_paihao",
      data(){
          return{
            paihaolist:[]
          }
      },
      methods:{
        tongguo:function (id) {
          axios.post("api/weichat-zilongdingcan/adminPaihao/ruzhuo",{id:id}).then(res=>{
            if (res.data.code == 200) {
              alert(res.data.msg)
              this.findAll();
            }
          })
        },
        findAll:function () {
          axios.get("api/weichat-zilongdingcan/adminPaihao/findAll").then(res=>{
            if (res.data.code == 200) {
              this.paihaolist=res.data.data
            }
          })
        }

      },
      mounted(){
          this.findAll();
      },
    }

</script>

<style scoped>

</style>
