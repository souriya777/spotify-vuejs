<template>
  <nav class="nav">
    <div class="nav-header">
      <router-link to="/" class="nav-logo">
        <logo-icon />
      </router-link>
    </div>
    <ul class="nav-list">
      <li class="nav-item">
        <router-link to="/login">
          <span class="nav-item_label">Login</span>
        </router-link>
      </li>
      <li class="nav-item">
        <router-link to="/spotify-api">
          <span class="nav-item_label">Spotify API</span>
        </router-link>
      </li>
      <li class="nav-item">
        <router-link to="/">
          <span class="nav-item_icon">
            <home-icon />
          </span>
          <span class="nav-item_label">Accueil</span>
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
          <span class="nav-item_label">Rechercher</span>
        </router-link>
      </li>
    </ul>
  </nav>
</template>
<style lang="stylus">
.nav
  padding-top 2.4rem

  &-header
    padding-left 2.4rem
    padding-bottom 1.8rem
    background-color inherit
    text-align left

  &-logo
    color color-text

  &-list
    width 100%
    padding 0
    list-style none

  &-item
    padding 0 .8rem
    font-size font-size-button
    font-weight 700

    &_label
      margin-left 1.6rem

    > a
      height 4rem
      display flex
      align-items center
      padding 0 1.6rem
      border-radius .4rem
      color color-text-inactive
      text-decoration none

    > .router-link-exact-active
      background-color color-button-active
      color color-text
</style>
