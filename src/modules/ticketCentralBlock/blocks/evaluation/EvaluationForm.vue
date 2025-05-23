<script setup lang="ts">
import DislikeButton from '../../components/buttons/DislikeButton.vue'
import LikeButton from '../../components/buttons/LikeButton.vue'
</script>

<template>
  <div class="evaluation_buttons">
    <DislikeButton />
    <LikeButton />
  </div>
</template>
<style scoped>
.evaluation_buttons {
  display: flex;
  align-items: center;
  gap: 10px;
}
</style>
