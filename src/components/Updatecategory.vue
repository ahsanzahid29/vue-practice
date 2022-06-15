<template>
	<HeaderComp />
	<div class="container mt-3">
		<div class="alert alert-danger" v-if="error.length!=0">
			<li v-for="items in error" :key="items">
				{{items}}

			</li>
		</div>
		<h2>Edit Category</h2>
		<form action="">
			<div class="mb-3 mt-3">
				<label for="name">name:</label>
				<input type="text" class="form-control" id="name" v-model="category.name" placeholder="Enter name"
					name="name">
			</div>
			<div v-if="category.status==='publish'">
				<label for="name">Status:</label>
				<div class="form-check">


					<input v-model="status" class="form-check-input" type="radio" name="exampleRadios"
						id="exampleRadios1" value="publish" checked>
					<label class="form-check-label" for="exampleRadios1">
						Publish
					</label>

				</div>
				<div class="form-check">
					<input v-model="status" class="form-check-input" type="radio" name="exampleRadios"
						id="exampleRadios2" value="unpublish">
					<label class="form-check-label" for="exampleRadios2">
						Unpublish
					</label>
				</div>

			</div>
			<div v-if="category.status==='unpublish'">
				<label for="name">Status:</label>
				<div class="form-check">


					<input v-model="status" class="form-check-input" type="radio" name="exampleRadios"
						id="exampleRadios1" value="publish">
					<label class="form-check-label" for="exampleRadios1">
						Publish
					</label>

				</div>
				<div class="form-check">
					<input v-model="status" class="form-check-input" type="radio" name="exampleRadios"
						id="exampleRadios2" value="unpublish" checked>
					<label class="form-check-label" for="exampleRadios2">
						Unpublish
					</label>
				</div>

			</div>

			<button type="button" v-on:click="updateCategory" class="btn btn-warning mt-2">Update Category</button>
			<router-link to="/category" class="btn btn-secondary mt-2 mx-1">Cancel</router-link>
		</form>
	</div>
</template>

<script>
	import axios from 'axios'
	import HeaderComp from './HeaderComponent.vue'
	export default {
		name: 'UpdateCategory',
		components: {
			HeaderComp
		},
		data() {
			return {
				category: {
					name: '',
					status: '',

				},
				error: [],
				status
			}
		},
		methods: {
			async updateCategory() {
				this.error = []
				let user = localStorage.getItem('user-info');
				let token = JSON.parse(user).access_token;
				if (this.category.name == '') {
					this.error.push('Please provide category name')
				} else {
					if (this.status == '') {
						this.status = this.category.status
					} 
					await axios.put('http://127.0.0.1:5000/api/v1/category/' + this.$route.params.id, {
							"name": this.category.name,
							"status": this.status
						}, {
							headers: {
								Authorization: 'Bearer ' + token,
							}
						})
						.then(res => {
							console.log(res)
							if(res.status==200){
								this.$router.push({
									name:'Category'
								})
							}
						}).catch(error => {
							if(error.response.status==400){
								this.$router.push({
									name: 'Home'
								})
								}
								
								else{
									this.error.push(error.response.data['error'])
									
								}
							console.warn(error)
						})
				}

			}
		},

		async mounted() {
			let user = localStorage.getItem('user-info');
			let token = JSON.parse(user).access_token;
			await axios.get('http://127.0.0.1:5000/api/v1/category/' + this.$route.params.id, {
				headers: {
					Authorization: 'Bearer ' + token,
				}
			}).then(res => {
				console.log(res.data.data[0])
				this.category = res.data.data[0]

			}).catch(error => {
				if(error.response.status==404){
					this.$router.push({
						name: 'Category'
					})
					}
					else if(error.response.status==401){
					this.$router.push({
						name: 'Home'
					})
					}
					else{
						this.error.push(error.response.data['error'])
						
					}
				console.warn(error.response.data['error'])

			})
		}
	}
</script>


<style>
</style>
