<script setup lang="ts">
import DislikeButton from '../../components/buttons/DislikeButton.vue'
import LikeButton from '../../components/buttons/LikeButton.vue'
import { useEvaluation, type TMark } from '../../composables/useEvaluation'

const { setMark, sendMark } = useEvaluation()

function mark(flag: TMark) {
  setMark(flag)
  sendMark()
}
</script>

<template>
  <div class="evaluation_buttons">
    <DislikeButton @click="mark('dislike')" />
    <LikeButton @click="mark('like')" />
  </div>
</template>
<style scoped>
.evaluation_buttons {
  display: flex;
  align-items: center;
  gap: 10px;
}
</style>
