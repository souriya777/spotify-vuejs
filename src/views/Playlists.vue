<template>
  <div class="playlists">
    <thumbnails :items="playlists" itemType="playlist" />
  </div>
</template>
<script>
import { mapState, mapActions } from "vuex";
import Thumbnails from "@/components/Thumbnails.vue";

export default {
  components: { Thumbnails },
  computed: {
    ...mapState(["playlists"]),
  },
  methods: {
    ...mapActions(["loadPlaylists"]),
  },
  async created() {
    if (this.playlists?.length === 0) {
      this.loadPlaylists();
    }

    this.$bus.$on(
      "scroll-end",
      async function () {
        this.loadPlaylists(this.playlists.length);
      }.bind(this)
    );
  },
};
</script>
