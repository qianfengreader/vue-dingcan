import Vue from 'vue'
import Router from 'vue-router'
import managermain from '@/components/manage/managermain'
import manage_paihao from '@/components/manage/manage_paihao'
import manage_orderroot from '@/components/manage/manage_orderroot'
import manage_lamp from '@/components/manage/manage_lamp'
import userList from '@/components/manage/userList'
import updateUser from '@/components/manage/updateUser'

/*menu*/
import manage_menu from '@/components/manage/manage_menu'
import insertMenu from '@/components/manage/insertMenu'
import updateMenu from '@/components/manage/updateMenu'
/*-----*/
import pictureTable from '@/components/pictureTable'
import login from '@/components/login'
import registry from '@/components/registry'


import comment from '@/components/manage/comment'
import search from '@/components/manage/search'

/*连锁店*/
import menu from '@/components/liansuoMeNu/menu'
import menu_brand from '@/components/liansuoMeNu/menu_brand'
import menu_director from '@/components/liansuoMeNu/menu_director'
import menu_stores from '@/components/liansuoMeNu/menu_stores'
import add_brand from '@/components/liansuoMeNu/add_brand'

/**/
Vue.use(Router)
export default new Router({
  routes: [
    {
      path: '/',
      name: 'login',
      component: login
    },{
      path: '/registry',
      name: 'registry',
      component: registry
    },
    {   /*后台界面*/
      path:'/managermain',
      name:'managermain',
      component:managermain,
      children:[
        {
        name:'manage_paihao',
        path:'manage_paihao',
        component:manage_paihao
      },{
          name:'manage_orderroot',
          path:'manage_orderroot',
          component:manage_orderroot
        },{
          name:'manage_lamp',
          path:'manage_lamp',
          component:manage_lamp
        },{
          name:'manage_menu',
          path:'manage_menu',
          component:manage_menu
        },{
          name:'insertMenu',
          path:'insertMenu',
          component:insertMenu
        },{
          name:'updateMenu',
          path:'updateMenu',
          component:updateMenu
        },{
          name:'pictureTable',
          path:'pictureTable',
          component:pictureTable
        },{
          name:'comment',
          path:'comment',
          component:comment
        },{
          name:'search',
          path:'search',
          component:search
        },{
          name:'userList',
          path:'userList',
          component:userList
        },{
          name:'updateUser',
          path:'updateUser',
          component:updateUser
        },
      ]
    },{
      path: '/menu',
      name: 'menu',
      component: menu,
      children:[
        {
          name:'menu_brand',
          path:'menu_brand',
          component:menu_brand
        },{
          name:'menu_director',
          path:'menu_director',
          component:menu_director
        },{
          name:'menu_stores',
          path:'menu_stores',
          component:menu_stores
        },{
          name:'add_brand',
          path:'add_brand',
          component:add_brand
        },

        ]
    },

  ]
})
