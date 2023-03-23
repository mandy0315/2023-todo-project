<script setup lang="ts">
import { useTodoStore } from '@/store';
import { computed } from 'vue';
import { useTheme } from 'vuetify';

const $todoStore = useTodoStore();
const theme = useTheme();
const toggleTheme = (): void => {
  theme.global.name.value = theme.global.current.value.dark ? 'light' : 'dark';
};
</script>

<template>
  <v-app>
    <v-container>
      <v-icon icon="home" />
      <v-btn @click="toggleTheme">toggle theme</v-btn>
      <v-text-field label="Label" variant="underlined"></v-text-field>
      <todoList />
    </v-container>
  </v-app>
</template>
