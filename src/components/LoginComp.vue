<template>
	<div class="container mt-3">
		<div class="alert alert-danger" v-if="error.length!=0">
			<li v-for="items in error" :key="items">
				{{items}}

			</li>
		</div>
		<h2>Login form</h2>
		<div class="mb-3 mt-3">
			<label for="email">Email:</label>
			<input type="email" class="form-control" id="email" v-model="email" placeholder="Enter email" name="email">
		</div>
		<div class="mb-3">
			<label for="pwd">Password:</label>
			<input type="password" class="form-control" id="pwd" v-model="password" placeholder="Enter password"
				name="pswd">
		</div>
		<!-- <button type="submit" class="btn btn-info mt-2">Login!</button> -->
		<!-- <router-link to="/dashboard" class="btn btn-info mt-2">Login</router-link> -->
		<button v-on:click="login()" class="btn btn-info mt-2">Login</button>
		<router-link to="/register" class="btn btn-secondary mt-2 mx-1">Register</router-link>
	</div>
</template>

<script>
	import axios from 'axios'
	export default {
		name: 'LoginComp',
		data() {
			return {
				email: '',
				password: '',
				error: [],

			}

		},
		methods: {
			async login() {
				this.error = []
				await axios
					.post('http://127.0.0.1:5000/api/v1/auth/login', {
						"email": this.email,
						"password": this.password
					})
					.then(res => {
						//console.log(JSON.stringify(res.data.user))
						if (res.status == 200) {
							localStorage.setItem('user-info', JSON.stringify(res.data.user))
							this.$router.push({
								name: 'Dashboard'
							})
						}
					}).catch(error => {
						//console.warn(error)
						console.warn(error.response.data['error'])
						this.error.push(error.response.data['error'])
					})

				//console.warn(res)
			}
		}
	}
</script>

<style>
</style>
