<template>
  <div class="login">
    <h1>Login</h1>
    <div v-if="authorizationCode">
      <h2>Authorization code</h2>
      <code>{{ authorizationCode }}</code>
    </div>
    <div v-if="accessToken">
      <h2>Access token</h2>
      <code>{{ accessToken }}</code>
      <h2>Refresh token</h2>
      <code>{{ refreshToken }}</code>
    </div>
  </div>
</template>
<script>
import axios from 'axios'
import querystring from 'querystring'

export default {
  data() {
    return {
      authorizationCode: '',
      accessToken: '',
      refreshToken: '',
      spotifyResult: ''
    }
  },
  async created() {
    this.authorizationCode = this.$route.query.code

    if (this.authorizationCode) {
      await this.getTokens(this.authorizationCode)
    } else {
      this.authorize()
    }
  },
  methods: {
    authorize() {
      const url = `https://accounts.spotify.com/authorize?response_type=code&client_id=${
        process.env.VUE_APP_SPOTIFY_CLIENT_ID
      }&scope=${encodeURIComponent(
        process.env.VUE_APP_SPOTIFY_SCOPES
      )}&redirect_uri=${encodeURIComponent(
        process.env.VUE_APP_SPOTIFY_REDIRECT_URI
      )}`

      window.location = url
    },
    async getTokens(authorizationCode) {
      const data = {
        code: authorizationCode,
        redirect_uri: process.env.VUE_APP_SPOTIFY_REDIRECT_URI,
        grant_type: 'authorization_code',
        client_id: process.env.VUE_APP_SPOTIFY_CLIENT_ID,
        client_secret: process.env.VUE_APP_SPOTIFY_CLIENT_SECRET
      }
      const options = {
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
          Authorization:
            'Basic ' +
            Buffer.from(
              process.env.VUE_APP_SPOTIFY_CLIENT_ID +
                ':' +
                process.env.VUE_APP_SPOTIFY_CLIENT_SECRET
            ).toString('base64')
        },
        data: querystring.stringify(data),
        url: 'https://accounts.spotify.com/api/token'
      }

      const instance = this
      await axios(options)
        .then(function (response) {
          instance.accessToken = response.data.access_token
          instance.refreshToken = response.data.refresh_token
        })
        .catch(function (error) {
          instance.token = error.toJSON()
        })
    }
  }
}
</script>
<style lang="stylus">
.login

  code
    width 100%
    overflow-x hidden
</style>
