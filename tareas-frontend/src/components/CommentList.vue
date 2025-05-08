<template>
  <div class="comments-section">
    <h3>Comentarios ({{ comments.length }})</h3>

    <div class="add-comment">
      <textarea
        v-model="newComment"
        placeholder="Escribe un comentario..."
        rows="3"
      ></textarea>
      <button @click="addComment" :disabled="!newComment.trim() || isLoading">
        {{ isLoading ? 'Enviando...' : 'Comentar' }}
      </button>
    </div>

    <div v-if="comments.length === 0" class="no-comments">
      No hay comentarios para esta tarea. ¡Sé el primero en comentar!
    </div>

    <div v-else class="comments-list">
      <div v-for="comment in comments" :key="comment.id" class="comment">
        <div class="comment-header">
          <strong>{{ comment.user.name }}</strong>
          <span class="comment-date">{{ formatDate(comment.created_at) }}</span>
        </div>
        <p class="comment-content">{{ comment.content }}</p>
        <button
          v-if="isCurrentUserComment(comment)"
          @click="deleteComment(comment.id)"
          class="delete-button"
        >
          Eliminar
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue';
import { useCommentStore } from '@/stores/comments';
import { useAuthStore } from '@/stores/auth';

const props = defineProps({
  taskId: {
    type: [Number, String],
    required: true
  }
});

const commentStore = useCommentStore();
const authStore = useAuthStore();
const newComment = ref('');

const comments = computed(() => commentStore.comments);
const isLoading = computed(() => commentStore.loading);

onMounted(async () => {
  try {
    await commentStore.fetchComments(props.taskId);
  } catch (error) {
    console.error('Error al cargar comentarios:', error);
  }
});

const formatDate = (dateString) => {
  const options = { year: 'numeric', month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' };
  return new Date(dateString).toLocaleString(undefined, options);
};

const isCurrentUserComment = (comment) => {
  return comment.user_id === authStore.user.id;
};

const addComment = async () => {
  if (!newComment.value.trim()) return;

  try {
    await commentStore.addComment(props.taskId, newComment.value.trim());
    newComment.value = '';
  } catch (error) {
    console.error('Error al añadir comentario:', error);
  }
};

const deleteComment = async (commentId) => {
  if (confirm('¿Estás seguro de eliminar este comentario?')) {
    try {
      await commentStore.deleteComment(commentId);
    } catch (error) {
      console.error('Error al eliminar comentario:', error);
    }
  }
};
</script>

<style scoped>
.comments-section {
  margin-top: 30px;
  border-top: 1px solid #e9ecef;
  padding-top: 20px;
}

.add-comment {
  margin-bottom: 20px;
}

textarea {
  width: 100%;
  padding: 10px;
  border: 1px solid #ced4da;
  border-radius: 4px;
  margin-bottom: 10px;
  resize: vertical;
}

button {
  padding: 8px 15px;
  background-color: #0d6efd;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

button:disabled {
  background-color: #6c757d;
  cursor: not-allowed;
}

.no-comments {
  background-color: #f8f9fa;
  padding: 15px;
  border-radius: 4px;
  text-align: center;
  color: #6c757d;
}

.comment {
  background-color: #f8f9fa;
  padding: 15px;
  border-radius: 8px;
  margin-bottom: 15px;
}

.comment-header {
  display: flex;
  justify-content: space-between;
  margin-bottom: 8px;
}

.comment-date {
  font-size: 0.85rem;
  color: #6c757d;
}

.comment-content {
  margin-bottom: 8px;
}

.delete-button {
  background-color: #dc3545;
  font-size: 0.85rem;
  padding: 3px 8px;
}

.delete-button:hover {
  background-color: #bb2d3b;
}
</style>
