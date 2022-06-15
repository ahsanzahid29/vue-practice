<template>
	<HeaderComp />
	<div class="container mt-3">
		<div class="alert alert-danger" v-if="error.length!=0">
			<li v-for="items in error" :key="items">
				{{items}}

			</li>
		</div>
		<h2>Edit User form</h2>
		<form action="">
			<div class="mb-3 mt-3">
				<label for="name">Name:</label>
				<input type="text" class="form-control" v-model="user.name" id="name" placeholder="Enter Name">
			</div>
			<div class="mb-3 mt-3">
				<label for="email">Email:</label>
				<input type="email" class="form-control" v-model="user.email" id="email" placeholder="Enter email"
					autocomplete="off">
			</div>
			<div class="mb-3">
				<label for="pwd">Password:</label>
				<input type="password" class="form-control" v-model="password" id="pwd" placeholder="Enter password"
					autocomplete="off">
			</div>
			<div class="mb-3">
				<label for="repwd">Reenter Password:</label>
				<input type="password" class="form-control" v-model="reenterpassword" id="repwd"
					placeholder="Re Enter password">
			</div>
			<div class="mb-3">
				<label for="formFile" class="form-label">Upload Avatar</label>
				<input class="form-control" type="file" id="formFile" @change="uploadImage()">
				<div v-if="user.avatar!='NULL'">
				<img :src="`http://127.0.0.1:5000/static/${user.avatar}`" class="image-display"/>
			</div>
			</div>
			<div v-if="user.status==='active'">
				<label for="name">Status:</label>
				<div class="form-check">


					<input v-model="status" class="form-check-input" type="radio" name="exampleRadios"
						id="exampleRadios1" value="active" checked>
					<label class="form-check-label" for="exampleRadios1">
						Active
					</label>

				</div>
				<div class="form-check">
					<input v-model="status" class="form-check-input" type="radio" name="exampleRadios"
						id="exampleRadios2" value="inactive">
					<label class="form-check-label" for="exampleRadios2">
						Inactive
					</label>
				</div>

			</div>
			<div v-if="user.status==='inactive'">
				<label for="name">Status:</label>
				<div class="form-check">
					<input v-model="status" class="form-check-input" type="radio" name="exampleRadios"
						id="exampleRadios1" value="active">
					<label class="form-check-label" for="exampleRadios1">
						Active
					</label>

				</div>
				<div class="form-check">
					<input v-model="status" class="form-check-input" type="radio" name="exampleRadios"
						id="exampleRadios2" value="inactive" checked>
					<label class="form-check-label" for="exampleRadios2">
						Inactive
					</label>
				</div>

			</div>

			<button type="button" v-on:click="updateUser" class="btn btn-warning mt-2">Update User</button>
			<router-link to="/users" class="btn btn-secondary mt-2 mx-1">Cancel</router-link>
		</form>
	</div>
</template>

<script>
	import axios from 'axios'
	import HeaderComp from './HeaderComponent.vue'
	export default {
		name: 'UpdateUser',
		components: {
			HeaderComp
		},
		data() {
			return {
				user: {
					name: '',
					email: '',
					avatar: '',
					status: ''
				},
				error: [],
				password: '',
				reenterpassword: '',
				newavatar: '',
				status: ''
			}
		},
		async mounted() {
			this.error = []

			let user = localStorage.getItem('user-info');
			let token = JSON.parse(user).access_token;
			await axios.get('http://127.0.0.1:5000/api/v1/user/' + this.$route.params.id, {
				headers: {
					Authorization: 'Bearer ' + token,
				}
			}).then(res => {
				if (res.status == 200) {
					this.user = res.data.data[0]
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
			async updateUser() {
				this.error = []
				if (this.newavatar == '') {
					this.newavatar = null
				}
				//alert(this.user.avatar)
				if (this.password != this.reenterpassword) {
					this.error.push('Password mismatch')

				} else {
					if (this.password == '') {
						this.password = null
					}
					if (this.status == '') {
						this.status = this.user.status
					}
					this.error = []
					let user = localStorage.getItem('user-info');
					let token = JSON.parse(user).access_token;

					await axios.put('http://127.0.0.1:5000/api/v1/user/' + this.$route.params.id, {
						"name": this.user.name,
						"email": this.user.email,
						"password": this.password,
						"file": this.newavatar,
						"status": this.status
					}, {
						headers: {
							Authorization: 'Bearer ' + token,
						}
					}).then(res => {
						if (res.status == 200) {
							this.$router.push({
								name: 'Users'
							})
						}
						console.log(res)
					}).catch(error => {
						if (error.response.status == 400 || error.response.status == 409 || error.response.status== 415) {
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
