<template>
    <div>
      <div><el-button type="info" style="margin-bottom: 20px" @click="insertMenu()">新增按钮+</el-button></div>
      <el-table
        ref="multipleTable"
        :data="tableData"
        style="width: 100%" @selection-change="handleSelectionChange">
        <el-table-column type="expand">
          <template slot-scope="props">
            <el-form label-position="left" inline class="demo-table-expand">
              <el-form-item label="菜品名称:">
                <span>{{ props.row.cname }}</span>
              </el-form-item>
              <el-form-item label="价格:">
                <span>{{ props.row.price }}</span>
              </el-form-item>

              <el-form-item label="库存:">
                <span>{{ props.row.inventory }}</span>
              </el-form-item>
              <el-form-item label="信息描述:">
                <span>{{ props.row.info }}</span>
              </el-form-item>
              <el-form-item label="图片:">
                <el-image
                  style="width: 100px; height: 100px"
                  :src="props.row.pic"
                  fit="fill" v-if="props.row.pic!=null && props.row.pic!=''"></el-image>
              </el-form-item>
              <el-form-item label="所属类别:">
              <span>{{ props.row.typename }}</span>
            </el-form-item>
              <el-form-item label="上架时间:">
                <span>{{ props.row.createTime}}</span>
              </el-form-item>
              <el-form-item label="更新时间:">
                <span>{{ props.row.updateTime }}</span>
              </el-form-item>
            </el-form>
          </template>
        </el-table-column>
        <el-table-column
          label="菜品编号"
          prop="id">
        </el-table-column>
        <el-table-column
          label="菜品名称"
          prop="cname">
        </el-table-column>
        <el-table-column
          label="菜品信息描述"
          prop="info">
        </el-table-column>
        <el-table-column
          label="菜品所属类别"
          prop="typename">
        </el-table-column>
        <el-table-column
          label="管理">
          <template slot-scope="scope">
            <el-button @click="updateMenu(scope.row.id)" type="primary" round>编辑信息</el-button>
          </template>
        </el-table-column>
        <el-table-column
          label="操作">
          <template slot-scope="scope">
            <el-button @click="deleteMenuOne(scope.row.id)" type="primary" round>删除</el-button>
          </template>
        </el-table-column>

        <!--选择框-->
        <el-table-column
          type="selection"
          width="55">
        </el-table-column>
      </el-table>
      <!--分页-->
      <div style="margin-top: 15px;">
        <el-pagination
          background
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :current-page="this.param.page"
          :page-size="this.param.size"
          layout="total, prev, pager, next"
          :total=this.total>
        </el-pagination>
      </div>
      <div style="margin-top: 80px; margin-left: 900px">
        <el-table-column>
          <el-button @click="deleteMenu()" type="success" plain>删除所选内容</el-button>
          <el-button @click="toggleSelection()" type="primary" plain>取消选择</el-button>
        </el-table-column>
      </div>
    </div>
</template>

<script>
  import axios from 'axios'
  export default {
    data() {
      return {
        total:0,
        tableData: [],
        multipleSelection:[],
        param:{
          page:1,
          size:5
        }
      }
    },
    methods:{
      findAll:function () {
        console.log(this.param)
        axios.post("http://localhost:8888/weichat-menu/menu/findAll",this.param).then(res=>{
          if (res.data.code == 200) {
            //alert(res.data.data);
            this.tableData = res.data.data;
            this.total = res.data.total;
            //alert(this.tableData[1].pic)
          } else {
            alert(res.data.message)
          }
        })
      },
      searchFindAll:function(){
        axios.post("http://localhost:8888/weichat-search/search/findAll").then(res=>{
          alert("正在ES查询");
          if (res.data.code==200){
            alert("查询成功"+res.data.data);
            this.total = res.data.total;
            this.tableData=res.data.data;
          }else {
            alert(res.data.message);
          }
        })
      },
      updateMenu:function (id) {
        //alert(id)
        this.$router.push({
          /*路径*/
          path: "/managermain/updateMenu",
          name: "updateMenu",
          query: {
            id:id
          }
        })
      },
      deleteMenuOne:function(id) {
        axios.post("http://localhost:8888/weichat-menu/menu/deleteMenuOne?id="+id).then(res=>{
          //alert("删除ids")
          if (res.data.code == 200) {
            alert("删除成功");
            this.findAll()
          }else{
            alert(res.data.message);
          }
        })
      },
      deleteMenu:function () {
          var ids = [];
          for (var i=0;i<this.multipleSelection.length;i++) {
            ids[i] = this.multipleSelection[i].id;
          }
          if (ids == null || ids.length == 0) {
            alert("请选择所要删除")
          } else {
            axios.post("http://localhost:8888/weichat-menu/menu/deleteMenu",{ids:ids}).then(res=>{
              //alert("删除")
              if (res.data.code == 200) {
                alert("删除成功");
                this.findAll();
              }else{
                alert("没有权限,删除失败");
              }
            });
          }
        },
      insertMenu:function () {
        this.$router.push("/managermain/insertMenu");
      },
      toggleSelection() {
          this.$refs.multipleTable.clearSelection();
      },
      /*toggleSelection(rows) {
        if (rows) {
          rows.forEach(row => {
            this.$refs.multipleTable.toggleRowSelection(row);
          });
        } else {
          this.$refs.multipleTable.clearSelection();
        }
      },*/
      handleSelectionChange(val) {
        this.multipleSelection = val;
      },
      handleSizeChange(val) {
        console.log(`每页 ${val} 条`);
        alert(val);
        this.param.size = val;
        this.findAll();
      },
      handleCurrentChange(val) {
        console.log(`当前页: ${val}`);
        this.param.page = val;
        this.findAll();
      }
    },
    mounted(){
      //this.findAll();
      this.searchFindAll()
    }
  }
</script>

<style scoped>
  .demo-table-expand {
    font-size: 0;
  }
  .demo-table-expand label {
    width: 90px;
    color: #99a9bf;
  }
  .demo-table-expand .el-form-item {
    margin-right: 0;
    margin-bottom: 0;
    width: 50%;
  }
</style>
