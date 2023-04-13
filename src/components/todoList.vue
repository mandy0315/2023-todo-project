<script setup lang="ts">
import { computed, ref, onBeforeUnmount, onMounted } from 'vue';
import { Todo } from '@/types';

// Vue3 本身是 TS 語法寫。 https://cn.vuejs.org/guide/typescript/overview.html#overview

const todos = ref<Array<Todo>>([]); // Array<Todo> = Todo[] | []
const newTodo = ref('');

const todosCount = computed(() => todos.value?.length);
const completedCount = computed(() => (todosCount.value ? todos.value.filter(i => i.completed).length : 0));
const uncompletedCount = computed(() => todosCount.value - completedCount.value);
const progress = computed<number>(() => {
  const num = (completedCount.value / todosCount.value) * 100 || 0;
  if (!Number.isInteger(num)) {
    const roundedNum = parseFloat(num.toFixed(1));
    return roundedNum;
  }
  return num;
});

const clearInputTodo = () => (newTodo.value = '');
const addTodo = () => {
  if (newTodo.value.trim() === '') return;

  const todo = {
    id: Date.now(),
    text: newTodo.value,
    completed: false,
  };
  todos.value.push(todo);
  newTodo.value = '';
};
const removeTodo = (id: number) => {
  const index = todos.value.findIndex(i => i.id === id);
  if (index !== -1) {
    todos.value.splice(index, 1);
  }
};

const getTodoList = () => {
  const result: Todo[] | null = JSON.parse(localStorage.getItem('todo-list') as string);
  todos.value = result ?? [];
};
const saveTodoList = () => localStorage.setItem('todo-list', JSON.stringify(todos.value));

getTodoList();
onMounted(() => {
  window.addEventListener('beforeunload', () => saveTodoList());
});
onBeforeUnmount(() => {
  window.removeEventListener('beforeunload', () => saveTodoList());
});
</script>

<template>
  <v-sheet class="mx-auto" max-width="560">
    <h2 class="text-h4">項目清單</h2>
    <v-text-field
      label="請填寫項目"
      v-model="newTodo"
      @keydown.enter="addTodo"
      class="mt-4"
      hide-details="auto"
      variant="underlined"
      clear-icon="fa-solid fa-xmark"
      clearable
      @click:clear="clearInputTodo"
    ></v-text-field>

    <v-card color="c-gray-100 mt-4" rounded flat>
      <v-card-item>
        <v-card-title class="py-4 text-h6">目前項目:{{ todosCount }}</v-card-title>
        <v-card-subtitle class="d-flex align-center justify-space-between">
          <p>未完成: {{ uncompletedCount }} | 已完成: {{ completedCount }}</p>
          <v-progress-circular :model-value="progress" rotate="360" size="35" width="4">
            {{ progress }}
          </v-progress-circular>
        </v-card-subtitle>
        <v-list-item v-for="todo in todos" :key="todo.id">
          <template v-slot:prepend>
            <v-checkbox v-model="todo.completed" hide-details></v-checkbox>
          </template>

          <v-list-item-title>{{ todo.text }}</v-list-item-title>

          <template v-slot:append>
            <v-btn @click="removeTodo(todo.id)" icon="fa-solid fa-trash-can" size="small" variant="text"></v-btn>
          </template>
        </v-list-item>
      </v-card-item>
    </v-card>
  </v-sheet>
</template>
