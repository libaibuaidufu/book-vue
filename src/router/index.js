import Vue from 'vue'
import Router from 'vue-router'
import Index from "@/components/Index"
import HelloWorld from '@/components/HelloWorld'
import SearchBook from '@/components/SearchBook'
import BookInfo from '@/components/BookInfo'
import tmp from '@/components/tmp'
Vue.use(Router)

export default new Router({
  mode:"hash",
  base:"/",
  routes: [
    {
      path: '/',
      name: 'Index',
      component: Index
    },
    {
      path: '/helloWorld',
      name: 'HelloWorld',
      component: HelloWorld
    },
    {
      path: '/searchBook',
      name: 'SearchBook',
      component: SearchBook
    },
    {
      path: '/bookInfo',
      name: 'BookInfo',
      component: BookInfo
    }
    ,
    {
      path: '/tmp',
      name: 'tmp',
      component: tmp
    }
  ]
  
})
  // mode:"history",
// 
// ,
//   beforeRouteLeave (to, from , next) { // 离开当前路由进行的操作
//     // 如果页面上没有展示弹层，弹层全部关闭的话，按回退按钮会执行返回，即到下一个路由
//    // this.$vux.confirm.isVisible()用来判断是否显示vux的confirm弹层
//          if (!this.showPop&&!this.$vux.confirm.isVisible()) { // 所有弹层都是关闭状态才执行回退路由
//            next()
//          } else { 
//              this.$vux.confirm.hide()  // 关闭confirm弹层
//              this.showPop = false
//            next(false) // 否则就不到下个路由，而是把各个弹层关闭掉
//          }
//    }