<template>
<div>
  <div id="app">
    <img class="logo" src="https://github.com/atilafassina/blogium-service/blob/master/blogium-service.png?raw=true">
    <h1>{{ title }}</h1>
  </div>
  <ul>
    <li v-for="post in postList">
      {{ post.id }}
    </li>
  </ul>
  </div>
</template>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  text-align: center;
  margin-top: 60px;
}

h1, h2 {
  font-weight: normal;
}

.logo {
  width: 60%;
  max-width: 200px;
}

ul {
  list-style-type: none;
  padding: 0;
}

li {
  display: inline-block;
  margin: 0 10px;
}

a {
  color: #42b983;
}
</style>
