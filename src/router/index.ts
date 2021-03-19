import Vue from 'vue'
import VueRouter, {
	RouteConfig
} from 'vue-router'
import Home from '../views/Home.vue'
import ls from '@/adapter/ls'
import { nextTick } from 'vue/types/umd'

Vue.use(VueRouter)

const routes: Array < RouteConfig > = [{
		path: '/',
		name: 'Home',
		component: Home
	},
	{
		path: '/about',
		name: 'About',
		// route level code-splitting
		// this generates a separate chunk (about.[hash].js) for this route
		// which is lazy-loaded when the route is visited.
		component: () => import( /* webpackChunkName: "about" */ '../views/About.vue')
	},
	{
		path: '/login',
		name: 'Login',
		// route level code-splitting
		// this generates a separate chunk (about.[hash].js) for this route
		// which is lazy-loaded when the route is visited.
		component: () => import( /* webpackChunkName: "about" */ '../views/Login.vue')
	},
	{
		path: '/workbench',
		name: 'Workbench',
		// route level code-splitting
		// this generates a separate chunk (about.[hash].js) for this route
		// which is lazy-loaded when the route is visited.
		component: () => import( /* webpackChunkName: "about" */ '../views/Workbench.vue')
	}
]

const router = new VueRouter({
	mode: 'history',
	base: process.env.BASE_URL,
	routes
})

router.beforeEach((to, from, next) => {
	if(to.name != 'Login'){
		const jwt = ls.get('jwt');
		console.log(to, jwt);
		if(jwt == null){
			// 说明未登录
			next({name: 'Login'});
		}else{
			next();
		}
	}else{
		next();
	}
})

export default router