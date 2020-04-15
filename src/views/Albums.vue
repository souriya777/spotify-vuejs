<template>
  <div class="albums">
    <h1>Albums</h1>
    <router-link :to="{ name: 'album', params: { albumId: '123' } }"
      >#123</router-link
    >
  </div>
</template>
