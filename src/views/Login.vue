<template>
  <h1>Login</h1>
</template>
<script>
// import axios from 'axios'

export default {
  created() {
    const authorizationCode = this.$route.query.code

    const url = `https://accounts.spotify.com/authorize?response_type=code&client_id=${
      process.env.SPOTIFY_CLIENT_ID
    }&scope=${encodeURIComponent(
      process.env.SPOTIFY_SCOPES
    )}&redirect_uri=${encodeURIComponent(process.env.SPOTIFY_REDIRECT_URI)}`
    console.log(url)

    if (authorizationCode) {
      //
    } else {
      // window.location = url
    }
  },
  mounted() {
    const authorizationCode = this.$route.query.code

    const url = `https://accounts.spotify.com/authorize?response_type=code&client_id=${
      process.env.SPOTIFY_CLIENT_ID
    }&scope=${encodeURIComponent(
      process.env.SPOTIFY_SCOPES
    )}&redirect_uri=${encodeURIComponent(process.env.SPOTIFY_REDIRECT_URI)}`
    console.log('mounted', url)

    if (authorizationCode) {
      //
    } else {
      // window.location = url
    }
  }
}
</script>
