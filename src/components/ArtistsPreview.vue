<template>
  <span class="artists_preview">
    <router-link
      class="artists-preview_link"
      v-for="(artist, index) in artists"
      :key="artist.name"
      :to="artist.href"
    >
      <span :class="customClass">{{ artist.name }}</span>
      <span v-if="index < artists.length - 1">,&nbsp;</span>
    </router-link>
  </span>
</template>
<script>
export default {
  props: {
    artists: {
      type: Array,
      required: true,
    },
    customClass: {
      type: String,
      required: false,
    },
  },
};
</script>
<style>
.artists-preview_link {
  color: var(--color-text-inactive);
  text-decoration: none;
}
</style>
