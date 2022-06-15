//import HeaderComp from './components/HeaderComponent.vue'
import RegisterComp from './components/RegisterComp.vue'
import LoginComp from './components/LoginComp.vue'
import DashboardComp from './components/DashboardComp.vue'
import CategoryList from './components/CategoryList.vue'
import AddCategory from './components/AddCategory.vue'
import UpdateCategory from './components/Updatecategory.vue'
import UserList from './components/UserList.vue'
import AddUser from './components/AddUser.vue'
import UpdateUser from './components/UpdateUser.vue'
import MyProfile from './components/MyProfile.vue'

import {createWebHashHistory,createRouter} from 'vue-router'

const routes=[
	{
		name:'Home',
		path:'/',
		component:LoginComp
		
	},
	{
		name:'Register',
		path:'/register',
		component:RegisterComp
		
	},
	{
		name:'Dashboard',
		path:'/dashboard',
		component:DashboardComp
		
	},
	{
		name:'Category',
		path:'/category',
		component:CategoryList
		
	},
	{
		name:'add-category',
		path:'/add-category',
		component:AddCategory
		
	},
	{
		name:'update-category',
		path:'/update-category/:id',
		component:UpdateCategory
		
	},
	{
		name:'Users',
		path:'/users',
		component:UserList
		
	},
	{
		name:'add-user',
		path:'/add-user',
		component:AddUser
		
	},
	{
		name:'edit-user',
		path:'/edit-user/:id',
		component:UpdateUser
		
	},
	{
		name:'my-profile',
		path:'/my-profile',
		component:MyProfile
		
	}
	
	];

const router= createRouter({
	history:createWebHashHistory(),
	routes
});
export default router;
