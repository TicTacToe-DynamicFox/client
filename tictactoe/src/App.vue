<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  height: 100vh;
  padding: 15px;
  margin: 0!important;
  /* background-color: #42b983; */
}

#nav {
  padding: 30px;
}

#nav a {
  font-weight: bold;
  color: #2c3e50;
}

#nav a.router-link-exact-active {
  color: #42b983;
}

.nes-btn{
	width: 80px;
	height: 80px;
	font-size: 60px;
	/* font-family: Helvetica; */
}

.kenter{
	margin: 0 auto;
}

tr {
  border: none;
}
</style>
