<template>
  <div v-if="isPending">Loading...</div>
  <div v-else-if="data">{{ data }}</div>
  <div v-else-if="error">Something went wrong: {{ error.message }}</div>
</template>
<script setup>
import { ref, defineProps, watchEffect } from "vue";

function useFetch(getUrl) {
  const data = ref(null);
  const error = ref(null);
  const isPending = ref(true);

  watchEffect(() => {
    isPending.value = true;
    data.value = null;
    error.value = null;
    fetch(getUrl())
      .then((res) => res.json())
      .then((_data) => {
        data.value = _data;
        isPending.value = false;
      })
      .catch((err) => {
        error.value = err;
        isPending.value = false;
      });
  });

  return {
    data,
    error,
    isPending,
  };
}

const props = defineProps({
  id: Number,
});

const { data, error, isPending } = useFetch(
  () => `https://jsonplaceholder.typicode.com/todos/${props.id}`
);
</script>
