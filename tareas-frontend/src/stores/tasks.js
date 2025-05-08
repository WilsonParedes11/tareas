import { defineStore } from 'pinia';
import api from '@/services/api';

export const useTaskStore = defineStore('tasks', {
  state: () => ({
    tasks: [],
    currentTask: null,
    loading: false,
    error: null,
    filters: {
      priority: null,
      completed: null,
      overdue: false
    }
  }),

  getters: {
    getFilteredTasks: (state) => state.tasks,
    getTaskById: (state) => (id) => state.tasks.find(task => task.id === id),
  },

  actions: {
    async fetchTasks() {
      this.loading = true;
      try {
        let url = '/tasks';
        const params = new URLSearchParams();

        if (this.filters.priority) {
          params.append('priority', this.filters.priority);
        }

        if (this.filters.completed !== null) {
          params.append('completed', this.filters.completed);
        }

        if (this.filters.overdue) {
          params.append('overdue', 'true');
        }

        if (params.toString()) {
          url += `?${params.toString()}`;
        }

        const response = await api.get(url);
        this.tasks = response.data;
        return response;
      } catch (error) {
        this.error = error.message;
        throw error;
      } finally {
        this.loading = false;
      }
    },

    async fetchTask(id) {
      this.loading = true;
      try {
        const response = await api.get(`/tasks/${id}`);
        this.currentTask = response.data;
        return response;
      } catch (error) {
        this.error = error.message;
        throw error;
      } finally {
        this.loading = false;
      }
    },

    async createTask(taskData) {
      this.loading = true;
      try {
        const response = await api.post('/tasks', taskData);
        this.tasks.unshift(response.data);
        return response;
      } catch (error) {
        this.error = error.message;
        throw error;
      } finally {
        this.loading = false;
      }
    },

    async updateTask(id, taskData) {
      this.loading = true;
      try {
        const response = await api.put(`/tasks/${id}`, taskData);
        const index = this.tasks.findIndex(task => task.id === id);
        if (index !== -1) {
          this.tasks[index] = response.data;
        }
        this.currentTask = response.data;
        return response;
      } catch (error) {
        this.error = error.message;
        throw error;
      } finally {
        this.loading = false;
      }
    },

    async deleteTask(id) {
      this.loading = true;
      try {
        await api.delete(`/tasks/${id}`);
        this.tasks = this.tasks.filter(task => task.id !== id);
      } catch (error) {
        this.error = error.message;
        throw error;
      } finally {
        this.loading = false;
      }
    },

    async toggleTaskComplete(id) {
      this.loading = true;
      try {
        const response = await api.patch(`/tasks/${id}/toggle-complete`);
        const index = this.tasks.findIndex(task => task.id === id);
        if (index !== -1) {
          this.tasks[index] = response.data;
        }
        if (this.currentTask && this.currentTask.id === id) {
          this.currentTask = response.data;
        }
        return response;
      } catch (error) {
        this.error = error.message;
        throw error;
      } finally {
        this.loading = false;
      }
    },

    setFilters(filters) {
      this.filters = { ...this.filters, ...filters };
    },

    clearFilters() {
      this.filters = {
        priority: null,
        completed: null,
        overdue: false
      };
    }
  }
});
