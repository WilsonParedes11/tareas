import { defineStore } from 'pinia';
import api from '@/services/api';

export const useCommentStore = defineStore('comments', {
  state: () => ({
    comments: [],
    loading: false,
    error: null
  }),

  actions: {
    async fetchComments(taskId) {
      this.loading = true;
      try {
        const response = await api.get(`/tasks/${taskId}/comments`);
        this.comments = response.data;
        return response;
      } catch (error) {
        this.error = error.message;
        throw error;
      } finally {
        this.loading = false;
      }
    },

    async addComment(taskId, content) {
      this.loading = true;
      try {
        const response = await api.post(`/tasks/${taskId}/comments`, { content });
        this.comments.unshift(response.data);
        return response;
      } catch (error) {
        this.error = error.message;
        throw error;
      } finally {
        this.loading = false;
      }
    },

    async deleteComment(commentId) {
      this.loading = true;
      try {
        await api.delete(`/comments/${commentId}`);
        this.comments = this.comments.filter(comment => comment.id !== commentId);
      } catch (error) {
        this.error = error.message;
        throw error;
      } finally {
        this.loading = false;
      }
    }
  }
});
