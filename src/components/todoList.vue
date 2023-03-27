<script setup lang="ts">
import { computed, ref, onBeforeUnmount, onMounted } from 'vue';
import { Todo } from '@/types';

const todos = ref<Todo[]>([]);
const newTodo = ref<string>('');

const todosCount = computed(() => todos.value?.length || 0);
const completedCount = computed(() => (todosCount.value ? todos.value.filter(i => i.completed).length : 0));
const uncompletedCount = computed(() => todosCount.value - completedCount.value);
const progress = computed<number | string>(() => {
  const num = (completedCount.value / todosCount.value) * 100 || 0;
  if (!Number.isInteger(num)) {
    return num.toFixed(1); // 轉字串
  }
  return num;
});

const clearInputTodo = () => (newTodo.value = '');
const addTodo = (): void => {
  if (newTodo.value.trim() === '') return;

  /**
   * todo 每筆資料格式;
   * id: 目前時間
   * text: 清單文字
   * completed: 是否已完成
   */
  const todo: Todo = {
    id: Date.now(),
    text: newTodo.value,
    completed: false,
  };
  todos.value.push(todo);
  newTodo.value = '';
};
const removeTodo = (id: number): void => {
  const index = todos.value.findIndex(i => i.id === id);
  if (index !== -1) {
    todos.value.splice(index, 1);
  }
};

const getTodoList = () => {
  const arr: Todo[] | null = JSON.parse(localStorage.getItem('todo-list') as string);
  todos.value = arr ?? [];
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
    <h2 class="text-h4">報告內容項目清單</h2>
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
        <v-card-title class="text-h6 py-4">目前清單項目:{{ todosCount }}</v-card-title>
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
