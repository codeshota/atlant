<template>
  <div id="app">
    <div id="nav">
      <router-link to="/table">Table</router-link> |
      <router-link to="/transactions">Transactions</router-link>
    </div>
    <router-view/>
  </div>
</template>

<style>
body {
  font-family: sans-serif;
}

#app {
  padding: 10px;
}

button {
  cursor: pointer;
}
</style>