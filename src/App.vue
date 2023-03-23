<script setup lang="ts">
import { useTodoStore } from '@/store';
import { computed } from 'vue';
const $todoStore = useTodoStore();
</script>

<template>
  <div>
    <v-icon icon="home" />
    <v-btn>button</v-btn>
    <v-text-field label="Label" variant="underlined"></v-text-field>
    <todoList />
  </div>
</template>
