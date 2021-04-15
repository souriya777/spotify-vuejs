import {
  getLastPlayedTrack,
  getPlaylistTracks,
  getTrack,
  getAlbumTracks,
  getMyAlbums,
  getMyPlaylists,
  play,
  pause,
  seekToPosition,
} from "@/services/spotify-api-services";

// initial state
const state = {
  authorizationCode: null,
  accessToken: null,
  refreshToken: null,
  userId: null,
  deviceId: null,
  albums: [],
  playlists: [],
  queueUris: [],
  queueCursor: null,
  currentTrack: null,
};

// actions
const actions = {
  async play({ state, dispatch }) {
    const { queueCursor, queueUris } = state;
    dispatch("playTrack", {
      trackUri: queueUris[queueCursor],
    });
  },
  async playTrack({ state, commit }, { trackUri }) {
    const { accessToken, deviceId } = state;

    // play song...
    await play(accessToken, trackUri, deviceId);

    // ... and load it
    const trackInfos = await getTrack(accessToken, trackUri);
    commit("updateCurrentTrack", trackInfos);
  },
  async playTrackList({ dispatch, commit }, albumOrPlaylist) {
    // get 1st song
    const trackUris = albumOrPlaylist?.trackUris;
    const trackUri = trackUris?.[0];

    // play it
    dispatch("playTrack", { trackUri });

    // add tracks to current playlist
    commit("setQueueUris", trackUris);
  },
  async playLastTrack({ state, dispatch, commit }) {
    const { accessToken } = state;

    // retrieve last track
    const track = await getLastPlayedTrack(accessToken);
    const trackUri = track.trackUri;

    // play it
    dispatch("playTrack", { trackUri });

    // retrieve associated album's tracks
    const tracksUris = await getAlbumTracks(accessToken, track.albumUri);

    // add to current queue
    commit("setQueueUris", tracksUris);
  },
  async playAlbum({ dispatch }, { album }) {
    dispatch("playTrackList", album);
  },
  async playPlaylist({ state: { accessToken }, dispatch }, { playlist }) {
    const tracklist = await getPlaylistTracks(accessToken, playlist.id);

    const playlistWithTracks = { ...playlist, trackUris: tracklist };

    dispatch("playTrackList", playlistWithTracks);
  },
  async next({ state, dispatch, commit }) {
    const { queueCursor } = state;
    commit("forwardQueueCursor");
    if (queueCursor !== state.queueCursor) {
      dispatch("play");
    } else {
      pause(state.accessToken);
    }
  },
  async previous({ state, dispatch, commit }) {
    const { queueCursor } = state;
    commit("backwardQueueCursor");
    if (queueCursor !== state.queueCursor) {
      dispatch("play");
    } else {
      seekToPosition(state.accessToken, 0);
    }
  },
  async loadAlbums({ state, commit }, offset) {
    const albums = await getMyAlbums(state.accessToken, offset);
    commit("updateAlbums", albums);
  },
  async loadPlaylists({ state, commit }, offset) {
    const playlists = await getMyPlaylists(
      state.accessToken,
      state.userId,
      offset
    );
    commit("updatePlaylists", playlists);
  },
};

// mutations
const mutations = {
  setAuthorizationCode(state, authorizationCode) {
    state.authorizationCode = authorizationCode;
  },
  setAccessToken(state, accessToken) {
    state.accessToken = accessToken;
  },
  setRefreshToken(state, refreshToken) {
    state.refreshToken = refreshToken;
  },
  setUserId(state, userId) {
    state.userId = userId;
  },
  setDeviceId(state, deviceId) {
    state.deviceId = deviceId;
  },
  setQueueUris(state, trackUris) {
    state.queueUris = [...trackUris];
    state.queueCursor = 0;
  },
  queueCursor(state, queueCursor) {
    if (queueCursor >= 0) {
      state.queueCursor = queueCursor;
    }
  },
  forwardQueueCursor(state) {
    const { queueCursor, queueUris } = state;
    if (queueCursor < queueUris.length - 1) {
      state.queueCursor++;
    }
  },
  backwardQueueCursor(state) {
    const { queueCursor } = state;
    if (queueCursor > 0) {
      state.queueCursor--;
    }
  },
  updateAlbums(state, albums) {
    const i = state.albums.length;
    state.albums.splice(i, 0, ...albums);
  },
  updatePlaylists(state, playlists) {
    const i = state.playlists.length;
    state.playlists.splice(i, 0, ...playlists);
  },
  updateCurrentTrack(state, track) {
    state.currentTrack = track;
  },
};

export default {
  state,
  actions,
  mutations,
};
