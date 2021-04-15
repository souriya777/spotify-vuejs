import querystring from "querystring";
import { AXIOS_INSTANCE } from "@/services/axios-services";
import TrackNormalizer from "@/normalizer/TrackNormalizer";
import AlbumNormalizer from "@/normalizer/AlbumNormalizer";
import PlaylistNormalizer from "@/normalizer/PlaylistNormalizer";

// FIXME
import axios from "axios";
const SPOTIFY_API_URL = "https://api.spotify.com/v1";

const SPOTIFY_CLIENT_ID = import.meta.env.VITE_SPOTIFY_CLIENT_ID;
const SPOTIFY_CLIENT_SECRET = import.meta.env.VITE_SPOTIFY_CLIENT_SECRET;
const SPOTIFY_SCOPES = import.meta.env.VITE_SPOTIFY_SCOPES;
const SPOTIFY_REDIRECT_URI = import.meta.env.VITE_SPOTIFY_REDIRECT_URI;

const ALBUM_LIMIT = 50;
const PLAYLIST_LIMIT = ALBUM_LIMIT;
const PLAYLIST_TRACKS_LIMIT = 100;

export function authorize() {
  const url = `https://accounts.spotify.com/authorize?response_type=code&client_id=${SPOTIFY_CLIENT_ID}&scope=${encodeURIComponent(
    SPOTIFY_SCOPES
  )}&redirect_uri=${encodeURIComponent(SPOTIFY_REDIRECT_URI)}`;
  window.location = url;
}

export async function getTokens(authorizationCode) {
  if (!authorizationCode) {
    return null;
  }

  const spotifyData = {
    code: authorizationCode,
    redirect_uri: SPOTIFY_REDIRECT_URI,
    grant_type: "authorization_code",
    client_id: SPOTIFY_CLIENT_ID,
    client_secret: SPOTIFY_CLIENT_SECRET,
  };
  const options = {
    method: "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
      Authorization:
        "Basic " +
        Buffer.from(SPOTIFY_CLIENT_ID + ":" + SPOTIFY_CLIENT_SECRET).toString(
          "base64"
        ),
    },
    data: querystring.stringify(spotifyData),
    url: "https://accounts.spotify.com/api/token",
  };

  const data = await AXIOS_INSTANCE(options)
    .then((response) => {
      return response?.data;
    })
    .catch((error) => {
      console.error(error.toJSON());
    });

  // set defaut axios headers
  AXIOS_INSTANCE.defaults.headers.common["Authorization"] =
    "Bearer " + data.access_token;

  console.log(AXIOS_INSTANCE.defaults.headers, data.access_token);

  return [data.access_token, data.refresh_token];
}

export async function getUserId(accessToken) {
  if (!accessToken) {
    return null;
  }

  const result = await AXIOS_INSTANCE.get("/me");

  if (!result?.data?.id) {
    return null;
  }

  return result?.data?.id;
}

export async function getMyAlbums(accessToken, offset) {
  let url = `/me/albums?limit=${ALBUM_LIMIT}`;

  if (offset) {
    url += `&offset=${offset}`;
  }

  const result = await AXIOS_INSTANCE.get(url);

  // just for log
  // console.log(result?.data?.items)

  return result?.data?.items?.map(({ album }) => {
    return AlbumNormalizer.normalize(album);
  });
}

export async function getMyPlaylists(accessToken, userId, offset) {
  let url = `
  /users/${userId}/playlists?limit=${PLAYLIST_LIMIT}`;

  if (offset) {
    url += `&offset=${offset}`;
  }

  const result = await axios.get(url);

  return result?.data?.items?.map((playlist) => {
    return PlaylistNormalizer.normalize(playlist);
  });
}

export async function getPlaylistTracks(accessToken, playlistId) {
  let url = `/playlists/${playlistId}/tracks?limit=${PLAYLIST_TRACKS_LIMIT}`;

  const result = await axios.get(url);

  // just for log
  // console.log(result?.data?.items)

  return result?.data?.items?.map((item) => {
    return item?.track?.uri;
  });
}

export async function getTrack(accessToken, trackUri) {
  if (!accessToken || !trackUri) {
    return null;
  }

  const trackId = trackUri.split(":")[2];

  const result = await axios.get(`${SPOTIFY_API_URL}/tracks/${trackId}`, {
    headers: {
      Authorization: "Bearer " + accessToken,
    },
  });

  const track = result?.data;
  return TrackNormalizer.normalize(track);
}

export async function getLastPlayedTrack() {
  const result = await axios.get(
    `/me/player/recently-played?type=track&limit=1`
  );

  const track = result?.data?.items?.[0]?.track;
  return TrackNormalizer.normalize(track);
}

export async function getAlbumTracks(accessToken, albumUri) {
  const albumId = albumUri?.split(":")[2];

  const result = await axios.get(`/albums/${albumId}/tracks`);

  return result?.data?.items?.map(({ uri }) => uri);
}

export function play(accessToken, trackUri, deviceId) {
  axios({
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${accessToken}`,
    },
    data: JSON.stringify({
      uris: [trackUri],
    }),
    url: `https://api.spotify.com/v1/me/player/play?device_id=${deviceId}`,
  });
}

export function pause(accessToken) {
  axios({
    method: "PUT",
    headers: {
      Authorization: "Bearer " + accessToken,
    },
    url: `${SPOTIFY_API_URL}/me/player/pause`,
  });
}

export async function startOrResume(accessToken) {
  return await axios.put(`${SPOTIFY_API_URL}/me/player/play`, null, {
    headers: {
      Authorization: "Bearer " + accessToken,
    },
  });
}

export function next(accessToken) {
  axios({
    method: "POST",
    headers: {
      Authorization: "Bearer " + accessToken,
    },
    url: `${SPOTIFY_API_URL}/me/player/next`,
  });
}

export function previous(accessToken) {
  axios({
    method: "POST",
    headers: {
      Authorization: "Bearer " + accessToken,
    },
    url: `${SPOTIFY_API_URL}/me/player/previous`,
  });
}

export async function addToQueue(accessToken, trackUri, deviceId) {
  return axios.post(`${SPOTIFY_API_URL}/me/player/queue`, null, {
    params: { uri: trackUri, device_id: deviceId },
    headers: {
      Authorization: "Bearer " + accessToken,
    },
  });
}

export async function seekToPosition(accessToken, positionMs) {
  return axios.put(`${SPOTIFY_API_URL}/me/player/seek`, null, {
    params: { position_ms: positionMs },
    headers: {
      Authorization: "Bearer " + accessToken,
    },
  });
}

export async function search(accessToken, query) {
  return axios.get(`${SPOTIFY_API_URL}/search?q=${query}`, {
    headers: {
      Authorization: "Bearer" + accessToken,
    },
  });
}
