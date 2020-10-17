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
  border: 1px solid #ddd;
  padding: 5px 10px;
}

.container {
  margin: 0 auto;
  width: 1000px;
}
</style>