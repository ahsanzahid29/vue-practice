<template>
	<div class="container mt-3">
		<div class="alert alert-danger" v-if="error.length!=0">
			<li v-for="items in error" :key="items">
				{{items}}

			</li>
		</div>
		<h2>Register form</h2>
		<form action="">
			<div class="mb-3 mt-3">
				<label for="name">Name:</label>
				<input type="email" class="form-control" id="name" v-model="name" placeholder="Enter Name" name="email">
			</div>
			<div class="mb-3 mt-3">
				<label for="email">Email:</label>
				<input type="email" class="form-control" id="email" v-model="email" placeholder="Enter email"
					name="email">
			</div>
			<div class="mb-3">
				<label for="pwd">Password:</label>
				<input type="password" class="form-control" id="pwd" v-model="password" placeholder="Enter password"
					name="pswd">
			</div>
			<div class="mb-3">
				<label for="repwd">Reenter Password:</label>
				<input type="password" class="form-control" id="repwd" v-model="reenterpasssword"
					placeholder="Re Enter password" name="pswd">
			</div>
			<!-- <button type="submit" class="btn btn-success mt-2">Sign me up!</button> -->
			<!-- <router-link to="/" class="btn btn-success mt-2">Sign me up!</router-link> -->
			<button type="button" v-on:click="register" class="btn btn-success mt-2">Sign me up!</button>
			<router-link to="/" class="btn btn-secondary mt-2 mx-1">Back to Login</router-link>
		</form>
	</div>
</template>

<script>
	import axios from 'axios'
	export default {
		name: 'RegisterComp',
		data() {
			return {
				name: '',
				email: '',
				password: '',
				reenterpasssword: '',
				error: []
			}
		},
		methods: {
			async register() {
				this.error = []
				if (this.password != this.reenterpasssword) {
					this.error.push('Password mismatch')
				}
				else {
					await axios
						.post('http://127.0.0.1:5000/api/v1/auth/register', {
							'name': this.name,
							'email': this.email,
							'password': this.password
						})
						.then(res => {
							//console.warn(res)
							if (res.status == 201) {
								this.$router.push({
									name: 'Home'
								})
							}

						}).catch(error => {
							console.warn(error.response.data['error'])
							this.error.push(error.response.data['error'])
						})

				}



			}

		}

	}
</script>

<style>
</style>
