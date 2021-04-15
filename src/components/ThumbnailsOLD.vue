<template>
  <div class="thumbnails">
    <!-- hack : use component instead of mixin to interact with Spotify -->
    <spotify-authorize />
    <h1 class="content-title">{{ title }}</h1>
    <div class="thumbnails__grid">
      <thumbnail
        v-for="item in items"
        :key="item.id"
        :item="item"
        :itemType="itemType"
      />
    </div>
  </div>
</template>
<script>
import Thumbnail from "@/components/Thumbnail";
import SpotifyAuthorize from "@/components/SpotifyAuthorize";

export default {
  components: { Thumbnail, SpotifyAuthorize },
  props: {
    items: {
      type: Array,
      required: true,
    },
    itemType: {
      type: String,
      required: true,
    },
  },
  computed: {
    title() {
      return this.itemType.charAt(0).toUpperCase() + this.itemType.slice(1);
    },
  },
};
</script>
<style>
.thumbnails__grid {
  display: grid;
  grid-gap: 1.6rem;
  grid-template-columns: repeat(auto-fill, minmax(16.4rem, 1fr));
}
</style>
