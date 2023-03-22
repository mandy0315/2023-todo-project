import { defineStore } from 'pinia';
import { Todo } from '@/types';

export default defineStore('todoStore', {
  state: () => {
    return {
      todo: [] as Todo[],
    };
  },
  getters: {},
  actions: {},
});
