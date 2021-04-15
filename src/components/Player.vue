<template>
  <div class="player">
    <div class="player_left">
      <div class="player_track" v-if="currentTrack">
        <img
          class="player_track_img"
          :src="currentTrack.imageUrl"
          :alt="imageAlt"
        />
        <div class="player_track_txt">
          <div class="player_track_name">{{ currentTrack.name }}</div>
          <artists-preview
            customClass="player_track_artists"
            :artists="currentTrack.artists"
          />
        </div>
      </div>
    </div>
    <div class="player_center">
      <player-controls />
    </div>
    <div class="player_right">
      <volume-bar />
    </div>
  </div>
</template>
<script>
import { mapState, mapActions, mapMutations } from "vuex";
import { pause, startOrResume } from "@/services/spotify-api-services";
import { getImageAlt } from "@/services/label-services";
import ArtistsPreview from "@/components/ArtistsPreview";
import PlayerControls from "@/components/PlayerControls";
import VolumeBar from "@/components/VolumeBar";

export default {
  components: { ArtistsPreview, PlayerControls, VolumeBar },
  watch: {
    accessToken() {
      const Spotify = window.Spotify;

      const player = new Spotify.Player({
        name: "spotify-vuejs",
        getOAuthToken: (cb) => {
          cb(this.accessToken);
        },
      });

      // Error handling
      player.addListener("initialization_error", ({ message }) =>
        console.error(message)
      );
      player.addListener("authentication_error", ({ message }) =>
        console.error(message)
      );
      player.addListener("account_error", ({ message }) =>
        console.error(message)
      );
      player.addListener("playback_error", ({ message }) =>
        console.error(message)
      );

      // Playback status updates
      player.addListener("player_state_changed", (state) => {
        console.log(state);
      });

      // Ready
      player.addListener("ready", ({ device_id }) => {
        console.log("Ready with Device ID", device_id);
        this.setDeviceId(device_id);

        this.playLastTrack();
      });

      // Not Ready
      player.addListener("not_ready", ({ device_id }) => {
        console.log("Device ID has gone offline", device_id);
      });

      // Connect to the player!
      player.connect();
      console.log("Spotify player is connected");
    },
  },
  computed: {
    ...mapState(["accessToken", "currentTrack", "deviceId"]),
    imageAlt() {
      return getImageAlt(this.currentTrack?.name, this.currentTrack?.artists);
    },
  },
  methods: {
    ...mapMutations(["setDeviceId"]),
    ...mapActions([
      "playLastTrack",
      "playAlbum",
      "playPlaylist",
      "next",
      "previous",
    ]),
  },
  created() {
    // do nothing, but Spotify script needs it...
    window.onSpotifyWebPlaybackSDKReady = () => {};

    // PLAY
    this.$bus.$on("play", () => {
      startOrResume(this.accessToken);
    });

    // PLAY ALBUM
    this.$bus.$on("play-album", (album) => {
      this.playAlbum({ album });
    });

    // PLAY PLAYLIST
    this.$bus.$on("play-playlist", (playlist) => {
      this.playPlaylist({ playlist });
    });

    // PAUSE
    this.$bus.$on("pause", () => pause(this.accessToken));

    // PREVIOUS
    this.$bus.$on("previous", () => this.previous());

    // NEXT
    this.$bus.$on("next", () => this.next());
  },
};
</script>
<style>
.player {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 1.6rem;
  background-color: color-background-3;
}
.player_left {
  width: 30%;
  min-width: 18rem;
}
.player_center {
  width: 40%;
  max-width: 72.2rem;
}
.player_right {
  display: flex;
  justify-content: flex-end;
  width: 30%;
  min-width: 18rem;
}
.player_track {
  display: flex;
  align-items: center;
  height: player-height -3.4rem;
}
.player_track_img {
  height: 100%;
}
.player_track_txt {
  display: flex;
  align-items: flex-start;
  flex-direction: column;
  margin: 0 1.4rem;
}
.player_track_name {
  font-size: 1.4rem;
  line-height: 2rem;
}
.player_track_artists {
  font-size: 1.2rem;
  line-height: 1.6rem;
}
</style>
