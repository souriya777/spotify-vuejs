import axios from 'axios'

const SPOTIFY_API_URL = 'https://api.spotify.com/v1'

export const AXIOS_INSTANCE = axios.create({
  baseURL: SPOTIFY_API_URL
})
