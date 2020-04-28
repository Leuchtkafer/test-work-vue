import Vue from 'vue';
import VueRouter from 'vue-router';
import Home from '../views/Main.vue';

Vue.use(VueRouter);

const routes = [
	{
		path: '/',
		name: 'Main',
		component: Home,
	},
	{
		path: '/history',
		name: 'History',
		component: () => import('../views/History.vue'),
	},
	{
		path: '/history-add',
		name: 'History',
		component: () => import('../views/History.vue'),
		props: {
			type: 'select',
		},
	},
	{
		path: '/history-delete',
		name: 'History',
		component: () => import('../views/History.vue'),
		props: {
			type: 'unselect',
		},
	},
];

const router = new VueRouter({
	mode: 'history',
	base: process.env.BASE_URL,
	routes,
});

export default router;
