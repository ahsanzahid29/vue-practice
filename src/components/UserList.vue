<template>
	<HeaderComp />
	<div class="container mt-3">
		<div class="alert alert-danger" v-if="error.length!=0">
			<li v-for="items in error" :key="items">
				{{items}}

			</li>
		</div>
		<router-link to="/add-user" class=" btn btn-outline-success float-end">Add User</router-link>
		<h2>User List</h2>
		<div class="alert alert-danger" v-if="users.length==0">
			No Category Found
		</div>
		<div v-else>
			<table class="table table-hover">
				<thead>
					<tr>
						<th>Name</th>
						<th>Email</th>
						<th>Status</th>
						<th>Action</th>
					</tr>
				</thead>
				<tbody>
					<tr v-for="user in users" :key="user.id">
						<td>{{user.name}}</td>
						<td>{{user.email}}</td>
						<td v-if="user.status==='active'"><span class="badge bg-success">Active</span>
						</td>
						<td v-if="user.status==='inactive'"><span class="badge bg-danger">Inactive</span>
						</td>
						<td><router-link :to="'/edit-user/'+user.id" class="btn btn-info">Edit</router-link>
						<a v-on:click="deleteUser(user.id)" class="btn btn-danger mx-2">Delete</a>
						</td>
					</tr>
				</tbody>
			</table>
		</div>
	</div>

</template>

<script>
	import axios from 'axios'
	import HeaderComp from './HeaderComponent.vue'
	export default {
		name: 'UserList',
		components: {
			HeaderComp
		},
		data() {
			return {
				users: [],
				error: []
			}
		},
		created() {
			this.loadData()
		},
		methods: {
			async loadData() {
				let user = localStorage.getItem('user-info');
				let token = JSON.parse(user).access_token;
				await axios.get('http://127.0.0.1:5000/api/v1/user/listusers', {
					headers: {
						Authorization: 'Bearer ' + token,
					}
				}).then(res => {
					if (res.status == 200) {
						this.users = res.data.data
					}
					console.log(res)
				}).catch(error => {
					if (error.response.status == 401) {
						this.$router.push({
							name: 'Home'
						})

					} else {
						this.error.push(error.response.data['error'])

					}
					console.warn(error.response)

				})

			},
			async deleteUser(id){
				let user=localStorage.getItem('user-info')
				let token=JSON.parse(user).access_token
				await axios.delete('http://127.0.0.1:5000/api/v1/user/'+id,{
					headers: {
						Authorization: 'Bearer ' + token,
					}
				}).then(res=>{
					if(res.status==204){
						this.loadData()
					}
					console.log(res)
				}).catch(err=>{
					if (err.response.status == 401) {
						this.$router.push({
							name: 'Home'
						})
					
					} else {
						this.error.push(err.response.data['error'])
					
					}
				})
			}
		}
	}
</script>

<style>
</style>
