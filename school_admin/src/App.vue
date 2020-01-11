<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<style lang="scss">

  body,html{
    margin: 0;
    padding: 0;
  }
  body{
    min-width: 1393px;
  }
  ul,li{
    list-style: none;
    padding: 0;
    margin: 0;
  }
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}
.gray{
  color: #999999FF;
}
#nav {
  padding: 30px;

  a {
    font-weight: bold;
    color: #2c3e50;

    &.router-link-exact-active {
      color: #42b983;
    }
  }
}
</style>
