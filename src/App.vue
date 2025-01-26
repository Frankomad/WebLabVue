<template>
  <div id="app">
    <header class="navbar">
      <div class="navbar-title">Task Organizer</div>
      <nav class="navbar-links">
        <router-link to="/">Home</router-link>
        <router-link to="/add">Add Task</router-link>
      </nav>
    </header>
    <div class="container">
      <router-view />
    </div>
  </div>
</template>

<style scoped>
.navbar {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 15px 20px;
  background-color: #007bff;
  color: white;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.navbar-title {
  font-size: 1.5rem;
  font-weight: bold;
}

.navbar-links a {
  color: white;
  margin-left: 20px;
  text-decoration: none;
  font-size: 1rem;
}

.navbar-links a:hover {
  text-decoration: underline;
}

.container {
  max-width: 800px;
  margin: 0 auto;
  padding: 20px;
}
</style>
