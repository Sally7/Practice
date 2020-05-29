import Vue from 'vue'
import Router from 'vue-router'
import VueResource from 'vue-resource'
import HelloWorld from '@/components/HelloWorld'
import goods from '../pages/goods'
import pailie from '../pages/pailie'
import viedo from '../pages/viedo'



Vue.use(VueResource)
Vue.use(Router)

export default new Router({
  routes: [
		{
		  path: '/',
		  name: '首页',
		  component: viedo
		},
		{
		  path: '/',
		  name: '首页',
		  component: goods
		},
		{
		  path: '/pailie',
		  name: '首页',
		  component: pailie
		},
    {
      path: '/HelloWorld',
      name: 'HelloWorld',
      component: HelloWorld
    },
		
  ]
})
