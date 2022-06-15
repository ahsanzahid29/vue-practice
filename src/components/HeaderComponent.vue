<template>
		<nav class="navbar navbar-expand-lg navbar-light bg-light">
			<div class="container-fluid">
				<router-link to ="/dashboard" class="navbar-brand">My Site</router-link>
				<div class="collapse navbar-collapse" id="navbarSupportedContent">
					<ul class="navbar-nav me-auto mb-2 mb-lg-0">
						<li class="nav-item">
							<router-link to ="/dashboard" class="nav-link active" aria-current="page">Home</router-link>
						</li>
						<li class="nav-item">
							<router-link to ="/category" class="nav-link">Category</router-link>
						</li>
						<li class="nav-item">
							<router-link to ="/users" class="nav-link">Users</router-link>
						</li>
						<li class="nav-item">
							<router-link to ="/my-profile" class="nav-link">Profile Settings</router-link>
						</li>
						
						
					</ul>
					<li class="nav-item d-flex">
						<a v-on:click="logout" class="btn btn-outline-danger">Logout</a>
						<!-- <router-link to ="/" class="btn btn-outline-danger">Logout</router-link> -->
					</li>
				</div>
			</div>
		</nav>
</template>

<script>
	export default {
		name: 'HeaderComp',
		methods:{
			logout(){
				localStorage.clear()
				this.$router.push({
					name:'Home'
				})
			}
		}
	}
</script>

<style>
</style>
