import Vue from 'vue'
import Router from 'vue-router'
import index from '@/components/index'

Vue.use(Router)

var router = new Router({
  routes: [
    {
      path: '/',
      name: 'index',
      component: index,
      meta: {
        title: '个人中心'
      }
    },
    {
      path: '/coin',
      name: 'coin',
      component: r => require.ensure([], () => r(require('@/components/coin'))),
      meta: {
        title: '我的游戏币'
      }
    },
    {
      path: '/game',
      name: 'game',
      component: r => require.ensure([], () => r(require('@/components/game'))),
      meta: {
        title: '游戏记录'
      }
    },
    {
      path: '/prize',
      name: 'prize',
      component: r => require.ensure([], () => r(require('@/components/prize'))),
      meta: {
        title: '抓中记录'
      }
    },
    {
      path: '/ticket',
      name: 'ticket',
      component: r => require.ensure([], () => r(require('@/components/ticket'))),
      meta: {
        title: '兑换游戏券'
      }
    },
    {
      path: '/questions',
      name: 'questions',
      component: r => require.ensure([], () => r(require('@/components/questions'))),
      meta: {
        title: '常见问题'
      }
    },
    {
      path: '/coupon',
      name: 'coupon',
      component: r => require.ensure([], () => r(require('@/components/coupon'))),
      meta: {
        title: '我的优惠券'
      }
    }
  ]
})
  router.beforeEach((to, from, next) => {
    /* 路由发生变化修改页面title */
    if (to.meta.title) {
      document.title = to.meta.title;
    }
    next();
  })
export default  router
