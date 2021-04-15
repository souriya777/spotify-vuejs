<template>
  <div class="thumbnail">
    <img class="thumbnail_img" :src="item.imageUrl" :alt="imageAlt" />
    <div class="thumbnail_title">{{ item.name }}</div>
    <div class="thumbnail_interpreters">
      <artists-preview
        customClass="thumbnail_interpreter"
        :artists="item.artists"
      />
    </div>
    <div class="thumbnail_play" @click="play">
      <play-button />
    </div>
  </div>
</template>
<script>
import { mapState } from "vuex";
import { getImageAlt } from "@/services/label-services";
import PlayButton from "@/components/PlayButton.vue";
import ArtistsPreview from "@/components/ArtistsPreview.vue";

export default {
  props: {
    item: {
      type: Object,
      required: true,
    },
    itemType: {
      type: String,
      required: true,
    },
  },
  computed: {
    ...mapState(["accessToken", "deviceId", "currentTrack"]),
    imageAlt() {
      return getImageAlt(this.item.name, this.item.artists);
    },
  },
  components: { PlayButton, ArtistsPreview },
  methods: {
    play() {
      this.$bus.$emit(`play-${this.itemType}`, this.item);
    },
  },
};
</script>
<style>
.thumbnail {
  position: relative;
  padding: 2rem 2rem 1.6rem;
  border-radius: 0.8rem;
  background-color: var(--color-button-active);
  text-align: left;
  text-decoration: none;
}
.thumbnail_img {
  width: 100%;
  padding-bottom: 1.6rem;
}
.thumbnail_info {
  display: flex;
  flex-direction: column;
}
.thumbnail_title {
  height: 3rem;
  color: color-text;
  font-weight: 700;
  line-height: 2.4rem;
}
.thumbnail_interpreters {
  margin-top: 0.4rem;
  color: var(--color-text-inactive);
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 2;
  overflow: hidden;
}
.thumbnail_interpreter {
  border-bottom: 0.1rem solid transparent;
  color: var(--color-text-inactive);
  font-size: 1.1rem;
  font-weight: 400;
}
.thumbnail_interpreter:hover {
  border-bottom: 0.1rem solid;
  color: var(--color-text);
}
.thumbnail_play {
  position: absolute;
  bottom: 1.6rem;
  right: 1.6rem;
  display: none;
}
.thumbnail:hover .thumbnail_play {
  display: block;
}
</style>
