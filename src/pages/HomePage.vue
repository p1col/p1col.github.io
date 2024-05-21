<script setup lang="ts">
import { useRouter } from 'vue-router';

const router = useRouter();

function routerPush(path: string) {
  router.push(path);
}
</script>
<template>
  <div class="entry-group">
    <button class="entry__btn" @click="routerPush('/sudoku')">sudoku</button>
    <button class="entry__btn" @click="routerPush('/card')">card</button>
    <button class="entry__btn" @click="routerPush('/mine-sweeper')">mine-sweeper</button>
    <button class="entry__btn" @click="routerPush('/flood-fill')">flood-fill</button>
  </div>
</template>
<style lang="scss">
.entry-group {
  display: flex;
  flex-direction: column;
  .entry__btn {
    margin-top: 5px;
  }
}
</style>
