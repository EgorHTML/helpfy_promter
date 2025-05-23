<script setup lang="ts">
import LikeIcon from '@/assets/icons/LikeIcon.vue'
</script>

<template>
  <div class="like_button">
    <LikeIcon style="fill: #23869b" />
  </div>
</template>

<style>
.like_button {
  width: 40px;
  cursor: pointer;
}

.like_button:hover svg {
  fill: #4f9eaf !important;
}
</style>
