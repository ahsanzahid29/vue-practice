<template>
	<HeaderComp />
	<div class="container mt-3">
		<div class="row">
			<div class="col-md-4">
				<div class="card" style="background: gainsboro">
					<div class="card-body">
						<h5 class="card-title">{{stats.all_time_users}}</h5>
						<p class="card-text">Users Created (All Time)</p>
					</div>
				</div>
			</div>
			<div class="col-md-4">
				<div class="card" style="background: beige">
					<div class="card-body">
						<h5 class="card-title">{{stats.this_week_users}}</h5>
						<p class="card-text">Users Created (This week)</p>
					</div>
				</div>
			</div>
			<div class="col-md-4">
				<div class="card" style="background: pink">
					<div class="card-body">
						<h5 class="card-title">{{stats.this_month_users}}</h5>
						<p class="card-text">Users Created (This month)</p>
					</div>
				</div>
			</div>
		</div>
		<div class="row mt-5">
			<div class="col-md-4">
				<div class="card" style="background: gainsboro">
					<div class="card-body">
						<h5 class="card-title">{{stats.all_time_categories}}</h5>
						<p class="card-text">Category added (All Time)</p>
					</div>
				</div>
			</div>
			<div class="col-md-4">
				<div class="card" style="background: beige">
					<div class="card-body">
						<h5 class="card-title">{{stats.this_week_categories}}</h5>
						<p class="card-text">Category added (This week)</p>
					</div>
				</div>
			</div>
			<div class="col-md-4">
				<div class="card" style="background: pink">
					<div class="card-body">
						<h5 class="card-title">{{stats.this_month_categories}}</h5>
						<p class="card-text">Category added (This month)</p>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
	import axios from 'axios'
	import HeaderComp from './HeaderComponent.vue'
	export default {
		name: 'DashboardComp',
		components:{
			HeaderComp
		},
		data(){
			return{
				stats:{
					all_time_users:'',
					this_week_users:'',
					this_month_users:'',
					all_time_categories:'',
					this_week_categories:'',
					this_month_categories:''
					
				}
			}
		},
		async mounted(){
			let user=localStorage.getItem('user-info')
			let token=JSON.parse(user).access_token
			await axios.get('http://127.0.0.1:5000/api/v1/dashboard/userdashboard',{
				headers:{
					Authorization:'Bearer '+ token
				}
				
			}).then(res=>{
				this.stats=res.data.data
				console.log(res.data.data)
			}).catch(error=>{
				if(error.response.status==401){
					this.$router.push({
						name: 'Home'
					})
					}
				console.warn(error)
			})
			
		}
	}
</script>

<style>
</style>
