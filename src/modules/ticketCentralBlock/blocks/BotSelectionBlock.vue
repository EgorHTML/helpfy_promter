<script setup lang="ts">
import { useSelectBot } from '../composables/useSelectBot'

const { bots } = useSelectBot()

console.log(bots.value, 'bots.value')
</script>

<template>
  <div class="el-button-group">
    <button
      type="button"
      class="el-button el-button--mini"
      style="padding: 8px 15px"
    >
      <span> yandexgpt </span></button
    ><button
      type="button"
      class="el-button el-button--mini el-dropdown__caret-button"
      style="padding: 0px 5px"
    >
      <span><i class="el-dropdown__icon el-icon-arrow-down"></i></span>
    </button>
  </div>
</template>
