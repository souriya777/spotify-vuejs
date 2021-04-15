<template>
  <nav class="nav">
    <div class="nav-header">
      <router-link to="/" class="nav-logo">
        <logo-icon />
      </router-link>
    </div>
    <ul class="nav-list">
      <li class="nav-item">
        <router-link to="/">
          <span class="nav-item_icon">
            <home-icon />
          </span>
          <span class="nav-item_label">Home</span>
        </router-link>
      </li>
      <li class="nav-item">
        <router-link to="/albums">
          <span class="nav-item_icon">
            <album-icon />
          </span>
          <span class="nav-item_label">Albums</span>
        </router-link>
      </li>
      <li class="nav-item">
        <router-link to="/playlists">
          <span class="nav-item_icon">
            <playlist-icon />
          </span>
          <span class="nav-item_label">Playlists</span>
        </router-link>
      </li>
      <li class="nav-item">
        <router-link to="/search">
          <span class="nav-item_icon">
            <search-icon />
          </span>
          <span class="nav-item_label">Search</span>
        </router-link>
      </li>
    </ul>
  </nav>
</template>
<style>
.nav {
  padding-top: 2.4rem;
  background-color: var(--color-background);
}
.nav-header {
  padding-left: 2.4rem;
  padding-bottom: 1.8rem;
  text-align: left;
}
.nav-logo {
  color: var(--color-text);
}
.nav-list {
  width: 100%;
  padding: 0;
  list-style: none;
}
.nav-item {
  padding: 0 0.8rem;
  font-size: var(--font-size-button);
  font-weight: 700;
}
.nav-item_label {
  margin-left: 1.6rem;
}
.nav-item > a {
  height: 4rem;
  display: flex;
  align-items: center;
  padding: 0 1.6rem;
  border-radius: 0.4rem;
  color: var(--color-text-inactive);
  text-decoration: none;
}
.nav-item > .router-link-exact-active {
  background-color: var(--color-button-active);
  color: var(--color-text);
}
</style>
