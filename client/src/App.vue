<template>
  <div id="app">
    <div id="nav" class="bg-gray-800 flex items-stretch text-white">
      <router-link class="homeLink" to="/">Home</router-link>
      <router-link class="link" to="/lectures">Lectures</router-link>
    </div>
    <router-view class="mt-12" />
  </div>
</template>

<style lang="scss">
body {
  background-color: ghostwhite;
}
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

#nav {
  z-index: 20;
  position: fixed;
  top: 0;
  left: 0;
  display: flex;
  height: 3rem;
  width: 100vw;
  background-color: rgba(31, 41, 55, 1);
}
#nav a {
  padding: 1rem;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;

  &:hover {
    background-color: rgb(52, 211, 153, 0.7);
  }
}
.homeLink.router-link-exact-active {
  background-color: rgb(52, 211, 153);
}
.link.router-link-active {
  background-color: rgb(52, 211, 153);
}
</style>
