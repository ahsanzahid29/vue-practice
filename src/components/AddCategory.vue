<template>
	<HeaderComp />
	<div class="container mt-3">
		<div class="alert alert-danger" v-if="error.length!=0">
			<li v-for="items in error" :key="items">
				{{items}}

			</li>
		</div>
		<h2>Add Category</h2>
		<form action="">
			<div class="mb-3 mt-3">
				<label for="name">name:</label>
				<input type="text" class="form-control" id="name" v-model="name" placeholder="Enter name" name="name">
			</div>
			<div class="mb-3">
				<div class="form-check form-switch">
					<input class="form-check-input" v-model="status" type="checkbox" id="publishSwitch" name="darkmode"
						value="publish" checked>
					<label class="form-check-label" for="publishSwitch">Make it publish</label>
				</div>
			</div>
			<button type="button" v-on:click="addCategory" class="btn btn-info mt-2">Save Category</button>
			<router-link to="/category" class="btn btn-secondary mt-2 mx-1">Cancel</router-link>
		</form>
	</div>
</template>

<script>
	import axios from 'axios'
	import HeaderComp from './HeaderComponent.vue'
	export default {
		name: 'AddCategory',
		components: {
			HeaderComp

		},
		data() {
			return {
				name: '',
				status: '',
				error: []
			}
		},
		methods: {
			async addCategory() {
				this.error = []
				let user = localStorage.getItem('user-info');
				let token = JSON.parse(user).access_token;
				if (this.name == '') {
					this.error.push('Please provide category name')
				} else {
					if (this.status == '') {
						this.status = 'unpublish'
					} else {
						this.status = 'publish'
					}
					await axios
						.post('http://127.0.0.1:5000/api/v1/category/savecategory', {
							"name": this.name,
							"status": this.status
						}, {
							headers: {
								Authorization: 'Bearer ' + token,
							}
						})
						.then(res => {
							if (res.status == 201) {
								this.$router.push({
									name: 'Category'
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
							console.warn(error.response.data['error'])
							
						})
				}


			}
		}
	}
</script>


<style>
</style>
