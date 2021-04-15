<template>
  <p>Retrieve tokens from spotify...</p>
  <p>{{ accessToken }}</p>
  <p>{{ toto }}</p>
</template>
<script setup>
/**

Spotify Authorization flow redirect to an url that we provide. So we use a "component view" instead of mixin. Plus we have to access to the state.

https://developer.spotify.com/documentation/general/guides/authorization-guide/
 */

import { computed } from "vue";
import { useRoute, useRouter } from "vue-router";
import { useStore, mapState, mapMutations } from "vuex";
import { getTokens, getUserId } from "@/services/spotify-api-services";

const store = useStore();
const route = useRoute();
const router = useRouter();
const authorizationCode = route.query.code;

const accessToken = computed(() => store.state.accessToken);
console.log(accessToken);
const toto = computed(() => "titi");
</script>
