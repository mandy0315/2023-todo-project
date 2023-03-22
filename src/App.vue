<script setup lang="ts">
import { useTodoStore } from '@/store';
import { computed } from 'vue';
const $todoStore = useTodoStore();
</script>

<template>
  <div>
    <todoList />
  </div>
</template>
