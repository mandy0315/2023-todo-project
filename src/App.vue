<script setup lang="ts">
import { useTheme } from 'vuetify';

const theme = useTheme();
const toggleTheme = () => {
  theme.global.name.value = theme.global.current.value.dark ? 'light' : 'dark';
};
</script>

<template>
  <v-container>
    <!-- <v-btn @click="toggleTheme">toggle theme</v-btn> -->
    <todoList />
  </v-container>
</template>
