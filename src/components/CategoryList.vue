<template>
	<HeaderComp />
	<div class="container mt-3">
		<div class="alert alert-danger" v-if="error.length!=0">
			<li v-for="items in error" :key="items">
				{{items}}

			</li>
		</div>
		<router-link to="/add-category" class="btn btn-outline-success float-end">Add Category</router-link>
		<h2>Categories List</h2>
		
		<div class="alert alert-danger" v-if="categories.length==0">
			No Category Found
		</div>

		<div v-else>
			<table class="table table-hover">
				<thead>
					<tr>
						<th>Name</th>
						<th>Status</th>
						<th>Action</th>
					</tr>
				</thead>
				<tbody>


					<tr v-for="category in categories" :key="category.id">
						<td>{{category.name}}</td>
						<td v-if="category.status==='publish'"><span class="badge bg-success">Publish</span>
						</td>
						<td v-if="category.status==='unpublish'"><span class="badge bg-danger">Unpublish</span>
						</td>
						<td>
							<router-link :to="'/update-category/'+category.id" class="btn btn-info">Edit </router-link>
							<a v-on:click="deleteCategory(category.id)" class="btn btn-danger mx-2">Delete</a>
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
		name: 'CategoryList',
		components: {
			HeaderComp
		},
		data() {
			return {
				categories: [],
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
				await axios.get('http://127.0.0.1:5000/api/v1/category/mycategories', {
						headers: {
							Authorization: 'Bearer ' + token,
						}
					})
					.then(res => {
						console.log(res.data.data)
						this.categories = res.data.data
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
			async deleteCategory(id) {
				let user = localStorage.getItem('user-info');
				let token = JSON.parse(user).access_token;
				await axios.delete('http://127.0.0.1:5000/api/v1/category/'+id,{
					headers: {
						Authorization: 'Bearer ' + token,
					}
					
				}).then(res=>{
					console.log(res)
					if (res.status==204){
						this.loadData()
						
					}
				}).catch(error=>{
					if (error.response.status == 401) {
						this.$router.push({
							name: 'Home'
						})
					
					} else {
						this.error.push(error.response.data['error'])
					
					}
					console.warn(error)
				})
			}
		}
	}
</script>

<style>
</style>
