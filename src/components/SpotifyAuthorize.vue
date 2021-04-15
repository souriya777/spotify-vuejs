<template>
  <p class="spotify-authorization">Spotify authorization...</p>
</template>
<script>
import { mapState } from "vuex";
import { authorize } from "@/services/spotify-api-services";

/**
  We don't use a mixin because we want to access to the state.
  We use instead a Component.
*/
export default {
  async created() {
    const authorizationCode = this.$route.query.code;
    if (!authorizationCode && !this.accessToken) {
      authorize();
    }
  },
  computed: {
    ...mapState(["accessToken"]),
  },
};
</script>
<style>
.spotify-authorization {
  display: none;
}
</style>
