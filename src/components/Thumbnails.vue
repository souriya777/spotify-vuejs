<template>
  <div class="thumbnails">
    FIXME THUMBNAILS
    <h1 class="content-title">{{ title }}</h1>
    <div class="thumbnails__grid">
      <thumbnail
        v-for="item in items"
        :key="item.id"
        :item="item"
        :itemType="itemType"
      />
    </div>
  </div>
</template>
<script setup>
import Thumbnail from "@/components/Thumbnail.vue";
</script>
<style>
.thumbnails__grid {
  display: grid;
  grid-gap: 1.6rem;
  grid-template-columns: repeat(auto-fill, minmax(16.4rem, 1fr));
}
</style>
