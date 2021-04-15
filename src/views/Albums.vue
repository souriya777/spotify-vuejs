<template>
  <spotify-authorize />
  <div class="albums">
    <thumbnails :items="albums" itemType="album" />
  </div>
</template>
<script setup>
// import { mapState, mapActions } from 'vuex'
import Thumbnails from "@/components/Thumbnails.vue";
// FIXME
import SpotifyAuthorize from "@/components/SpotifyAuthorize.vue";

// export default {
//   components: { Thumbnails },
//   computed: {
//     ...mapState(['albums'])
//   },
//   methods: {
//     ...mapActions(['loadAlbums'])
//   },
//   async created() {
//     if (this.albums?.length === 0) {
//       this.loadAlbums()
//     }

//     this.$bus.$on(
//       'scroll-end',
//       async function () {
//         this.loadAlbums(this.albums.length)
//       }.bind(this)
//     )
//   }
// }
</script>
