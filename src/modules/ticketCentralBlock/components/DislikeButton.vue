<script setup lang="ts">
import DislikeIcon from '@/assets/icons/DislikeIcon.vue'
</script>

<template>
  <div class="dislike_button">
    <DislikeIcon style="fill: #db3700" />
  </div>
</template>

<style>
.dislike_button {
  width: 40px;
  cursor: pointer;
}

.dislike_button:hover svg {
  fill: #f56c6c !important;
}
</style>
