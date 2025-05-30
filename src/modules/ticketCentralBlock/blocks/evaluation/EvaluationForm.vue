<script setup lang="ts">
import DislikeButton from '../../components/buttons/DislikeButton.vue'
import LikeButton from '../../components/buttons/LikeButton.vue'
import { useEvaluation, type TMark } from '../../composables/useEvaluation'
import { ref } from 'vue'

const { mark } = useEvaluation()

const showModal = ref<boolean>(false)

function setMark(flag: TMark) {
  mark.value = flag
  showModal.value = true
}
</script>

<template>
  <div class="evaluation_buttons">
    <DislikeButton @click="setMark('dislike')" />
    <LikeButton @click="setMark('like')" />
  </div>
</template>
<style scoped>
.evaluation_buttons {
  display: flex;
  align-items: center;
  gap: 10px;
}
</style>
