<template>
	<HeaderComp />
	<div class="container mt-3">
		<div class="alert alert-danger" v-if="error.length!=0">
			<li v-for="items in error" :key="items">
				{{items}}

			</li>
		</div>
		<h2>Add User form</h2>
		<form action="">
			<div class="mb-3 mt-3">
				<label for="name">Name:</label>
				<input type="email" class="form-control" v-model="user.name" id="name" placeholder="Enter Name"
					name="email">
			</div>
			<div class="mb-3 mt-3">
				<label for="email">Email:</label>
				<input type="email" class="form-control" v-model="user.email" id="email" placeholder="Enter email"
					name="email">
			</div>
			<div class="mb-3">
				<label for="pwd">Password:</label>
				<input type="password" class="form-control" v-model="user.password" id="pwd"
					placeholder="Enter password" name="pswd">
			</div>
			<div class="mb-3">
				<label for="repwd">Reenter Password:</label>
				<input type="password" class="form-control" v-model="user.reenterpassword" id="repwd"
					placeholder="Re Enter password" name="pswd">
			</div>
			<div class="mb-3">
				<label for="formFile" class="form-label">Upload Avatar</label>
				<input class="form-control" type="file" id="formFile" @change="uploadImage()">
			</div>
			<button type="button" v-on:click="addUser" class="btn btn-success mt-2">Create User</button>
			<router-link to="/users" class="btn btn-secondary mt-2 mx-1">Cancel</router-link>
		</form>
	</div>
</template>

<script>
	import axios from 'axios'
	import HeaderComp from './HeaderComponent.vue'
	export default {
		name: 'AddUser',
		components: {
			HeaderComp
		},
		data() {
			return {
				user: {
					name: '',
					email: '',
					password: '',
					reenterpassword: '',
					avatar: ''
				},
				error: []
			}
		},
		methods: {
			uploadImage() {
				const file = document.querySelector('input[type=file]').files[0]
				const reader = new FileReader()

				let rawImg;
				reader.onloadend = () => {
					rawImg = reader.result;
					console.log(rawImg);
					this.user.avatar = rawImg
				}
				reader.readAsDataURL(file);
				//this.user.avatar=file
				//console.log(file)
			},
			async addUser() {
				//alert(this.user.avatar)
				this.error = []
				let user = localStorage.getItem('user-info');
				let token = JSON.parse(user).access_token;

				await axios.post('http://127.0.0.1:5000/api/v1/user/adduser', {
					"name": this.user.name,
					"email": this.user.email,
					"password": this.user.password,
					"file": this.user.avatar
				}, {
					headers: {
						Authorization: 'Bearer ' + token,
					}
				}).then(res => {
					if (res.status == 201) {
						this.$router.push({
							name: 'Users'
						})
					}
					console.log(res)
				}).catch(error => {
					if (error.response.status == 400 || error.response.status == 409 || error.response.status== 415) {
						this.error.push(error.response.data['error'])
					}
					else if(error.response.status==401){
						this.$router.push({
							name: 'Home'
						})
						
					}
					
					console.warn(error)
				})
			}
		}
	}
</script>

<style>
</style>
