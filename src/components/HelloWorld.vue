<script setup lang="ts">
import { onMounted } from 'vue';
import { loadSdk } from '../assets/js/utils/loadSdk';

onMounted(() => {
  loadSdk();
});
</script>

<template>
  <div>测试</div>
</template>

<style scoped>
.read-the-docs {
  color: #888;
}
</style>
