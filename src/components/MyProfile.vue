<template>
	<HeaderComp />
	<div class="container mt-3">
		<div class="alert alert-danger" v-if="error.length!=0">
			<li v-for="items in error" :key="items">
				{{items}}

			</li>
		</div>
		<h2>Update Profile</h2>
		<form action="">
			<div class="mb-3 mt-3">
				<label for="name">Name:</label>
				<input type="text" class="form-control" id="name" v-model="user.name" placeholder="Enter Name"
					>
			</div>
			<div class="mb-3 mt-3">
				<label for="email">Email:</label>
				<input type="email" class="form-control" id="email" v-model="user.email" placeholder="Enter email"
					>
			</div>
			<div class="mb-3">
				<label for="pwd">Password:</label>
				<input type="password" class="form-control" id="pwd" v-model="password" placeholder="Enter password"
					>
			</div>
			<div class="mb-3">
				<label for="repwd">Reenter Password:</label>
				<input type="password" class="form-control" v-model="reenterpassword" id="repwd" placeholder="Re Enter password">
			</div>
			<div class="mb-3">
				<label for="formFile" class="form-label">Change Avatar</label>
				<input class="form-control" type="file" id="formFile" @change="uploadImage()">
				<div v-if="user.avatar!=null">
					<img :src="`http://127.0.0.1:5000/static/${user.avatar}`" class="image-display" />
				</div>
			</div>
			<button v-on:click="updateProfile" class="btn btn-warning mt-2">Update Profile</button>
			<router-link to="/dashboard" class="btn btn-secondary mt-2 mx-1">Cancel</router-link>
		</form>
	</div>
</template>

<script>
	import axios from 'axios'
	import HeaderComp from './HeaderComponent.vue'
	export default {
		name: 'MyProfile',
		components: {
			HeaderComp
		},
		data() {
			return {
				user: {
					name: '',
					email: '',
					avatar: ''
				},
				error: [],
				password: '',
				reenterpassword: '',
				newavatar: ''
			}
		},
		async mounted() {
			this.error = []
			let user = localStorage.getItem('user-info')
			let token = JSON.parse(user).access_token
			await axios.get('http://127.0.0.1:5000/api/v1/user/myprofile', {
				headers: {
					Authorization: 'Bearer ' + token,
				}
			}).then(res => {
				if (res.status == 200) {
					this.user = res.data.data[0]
				}
				console.log(res)
			}).catch(error => {
				if (error.response.status == 404) {
					this.$router.push({
						name: 'Dashboard'
					})
				} else if (error.response.status == 401) {
					this.$router.push({
						name: 'Home'
					})
				}
				console.warn(error)
			})


		},
		methods: {
			uploadImage() {
				const file = document.querySelector('input[type=file]').files[0]
				const reader = new FileReader()

				let rawImg;
				reader.onloadend = () => {
					rawImg = reader.result;
					console.log(rawImg);
					this.newavatar = rawImg
				}
				reader.readAsDataURL(file);
				//this.user.avatar=file
				//console.log(file)
			},

			async updateProfile() {
				this.error = []
				if (this.newavatar == '') {
					this.newavatar = null
				}
				//alert(this.user.avatar)
				if (this.password != this.reenterpassword && this.password != '') {
					this.error.push('Password mismatch')

				} else {
					if (this.password == '') {
						this.password = null
					}
					let user = localStorage.getItem('user-info')
					let token = JSON.parse(user).access_token
					await axios.put('http://127.0.0.1:5000/api/v1/user/myprofile', {
						'email': this.user.email,
						'name': this.user.name,
						'password': this.password,
						'file': this.newavatar

					}, {
						headers: {
							Authorization: 'Bearer ' + token,
						}
					}).then(res=>{
						if(res.status==200){
							this.$router.push({
								name:'Dashboard'
							})
						}
						console.log(res)
					}).catch(error=>{
						if (error.response.status == 400 || error.response.status == 409|| error.response.status == 415) {
							this.error.push(error.response.data['error'])
						} else if (error.response.status == 401) {
							this.$router.push({
								name: 'Home'
							})
						
						}
						console.warn(error)
					})
				}
			}

		}
	}
</script>

<style scoped>
	.image-display{
		width:100px;
		height:100px;
		margin-top:5px;
	}
</style>
