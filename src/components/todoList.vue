<script setup lang="ts">
import { computed, ref } from 'vue';
import { Todo } from '@/types';

const todos = ref<Todo[]>([]);
const newTodo = ref<string>('');

const completedCount = computed(() => todos.value.filter(i => i.completed).length);
const uncompletedCount = computed(() => todos.value.length - completedCount.value);
const progress = computed<number>(() => (completedCount.value / todos.value.length) * 100 || 0);

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
</script>

<template>
  <v-text-field label="請填寫項目" v-model="newTodo" @keydown.enter="addTodo">
    <template v-slot:append>
      <v-fade-transition>
        <v-icon v-if="newTodo" icon="fa-sharp fa-solid fa-circle-xmark" />
      </v-fade-transition>
    </template>
  </v-text-field>

  <h2>Tasks:{{ todos.length }}</h2>

  <v-col>
    <strong> 未完成: {{ uncompletedCount }} </strong>
    <strong> 已完成: {{ completedCount }} </strong>
    <v-progress-circular :model-value="progress" rotate="360" size="35" width="4" color="teal">
      {{ progress }}
    </v-progress-circular>
  </v-col>

  <v-card flat>
    <v-slide-y-transition group tag="v-list">
      <template v-for="todo in todos" :key="todo.id">
        <v-list>
          <v-checkbox v-model="todo.completed" color="success" hide-details
            ><template v-slot:label>
              <div>{{ todo.text }}</div>
            </template></v-checkbox
          >
        </v-list>
      </template>
    </v-slide-y-transition>
  </v-card>
</template>
