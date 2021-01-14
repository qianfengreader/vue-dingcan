<template>
    <div style="margin: auto">
      <!--为图表准备一个大小合适的区域-->
      <div id="main" style="width: 600px;height:400px;"></div>
    </div>
</template>
<script>
  import axios from 'axios'
    export default {
        name: "pictureTable",
        data(){
          return {
            typeCount:[]
          }
        },
      methods:{
        getTypeCount:function () {
          axios.post("api/weichat-menu/menu/typenameCount").then(res=>{
            if (res.data.code == 200) {
              //alert(res.data.data);
              this.typeCount = res.data.data;
              this.createTable();
            } else {
              alert(res.data.message);
            }
          })
        },
        createTable: function () {
          /*引入echarts*/
          var echarts = require('echarts');
          /*获取表格区域*/
          var myChart = echarts.init(document.getElementById('main'));

          /*建表*/
          myChart.setOption({

            title: {
              x: 'left',                 // 水平安放位置，默认为左对齐，可选为：
                                         // 'center' ¦ 'left' ¦ 'right'
                                         // ¦ {number}（x坐标，单位px）
              y: 'top',                  // 垂直安放位置，默认为全图顶端，可选为：
                                         // 'top' ¦ 'bottom' ¦ 'center'
                                         // ¦ {number}（y坐标，单位px）
              //textAlign: null          // 水平对齐方式，默认根据x设置自动调整
              text: '每天餐饮类目与数量展示:',
              backgroundColor: 'rgba(0,0,0,0.2)',
              borderColor: 'blue',       // 标题边框颜色
              borderWidth: 2,            // 标题边框线宽，单位px，默认为0（无边框）
              padding: 5,                // 标题内边距，单位px，默认各方向内边距为5，
                                         // 接受数组分别设定上右下左边距，同css
              itemGap: 10,               // 主副标题纵向间隔，单位px，默认为10，
              textStyle: {
                fontSize: 18,
                fontWeight: 'bolder',
                color: '#333'          // 主标题文字颜色
              },
            },
            tooltip: {
              borderRadius: 15,           // 提示边框圆角，单位px，默认为4
              borderWidth: 2,            // 提示边框线宽，单位px，默认为0（无边框）
              padding: 5,                // 提示内边距，单位px，默认各方向内边距为5，
            },
            series : [
              {
                name: '访问来源',
                type: 'pie',    // 设置图表类型为饼图
                radius: '70%',  // 饼图的半径，外半径为可视区尺寸（容器高宽中较小一项）的 55% 长度。
                /*数据与实体类名称一致，避免赋值的麻烦*/
                data: this.typeCount,
                /*data:[          // 数据数组，name 为数据项名称，value 为数据项值
                  {value:5, name:'视频广告'},
                  {value:2, name:'联盟广告'}
                ],*/
                itemStyle: {
                  normal: {
                    shadowBlur: 500,
                    shadowColor: 'rgba(0, 0, 0, 1.0)'
                  }
                },
                /*pie: {
                  center : ['10%', '90%'],    // 默认全局居中
                  radius : [0, '75%'],
                  clockWise : true,          // 默认逆时针
                  startAngle: 0,
                  minAngle: 90,                // 最小角度改为0
                  selectedOffset: 10,         // 选中是扇区偏移量
                },*/
              }
            ]
          })
        }
      },
      mounted(){
        this.getTypeCount();
      }
    }
</script>

<style scoped>

</style>
