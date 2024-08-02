<script setup>

</script>

<template>
<div>
  <header>
    <div class="header">
      <img class="logo" src="./assets/logo.svg" alt="Vue logo" />
      <nav>
        <ul class="nav-list">
          <li class="nav-item">
            <router-link to="/">Home</router-link>
          </li>
          <li class="nav-item">
            <router-link to="/about">About</router-link>
          </li>
          <li class="nav-item">
            <router-link to="/contact">Contact</router-link>
          </li>
        </ul>
      </nav>
    </div>
  </header>
</div>
  <main>
    <div class="content">
      <router-view></router-view>
    </div>
  </main>
</template>

<style scoped>
.header{
  display: flex;
  justify-content: space-around;
  align-items: center;
  padding: 1rem;
  background-color: #f3f3f3;
}
.logo{
  width: 50px;
}
.nav-list{
  display: flex;
  list-style: none;
  justify-content: space-between;
}
.nav-item{
  margin: 0 1rem;
}
</style>
