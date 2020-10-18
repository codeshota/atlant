<template>
  <div id="app">
    <div id="nav" class="container">
      <router-link to="/">Table</router-link> |
      <router-link to="/transactions">Transactions</router-link>
    </div>
    <router-view/>
  </div>
</template>

<style>
body {
  font-family: sans-serif;
}

button {
  cursor: pointer;
}

.container {
  margin: 0 auto;
  width: 1000px;
}
</style>