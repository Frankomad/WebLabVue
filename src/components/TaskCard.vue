<template>
  <div class="task-card">
    <h3 class="task-title">{{ task.title }}</h3>
    <p class="task-description">{{ task.description }}</p>
    <p class="task-status">
      Status:
      <span :class="{ completed: task.completed }">{{
        task.completed ? "Completed" : "Pending"
      }}</span>
    </p>
    <div class="task-actions">
      <button class="button" @click="$emit('delete-task', task.id)">
        Delete
      </button>
      <router-link :to="`/tasks/edit/${task.id}`" class="button edit-button"
        >Edit</router-link
      >
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, type PropType } from "vue"
import type { Task } from "../stores/taskStore"

export default defineComponent({
  props: {
    task: {
      type: Object as PropType<Task>,
      required: true,
    },
  },
})
</script>

<style scoped>
.task-card {
  background: #ffffff;
  border: 1px solid #ddd;
  border-radius: 8px;
  padding: 20px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  margin-bottom: 15px;
  transition: transform 0.2s, box-shadow 0.2s;
}

.task-card:hover {
  transform: scale(1.02);
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
}

.task-title {
  font-size: 1.25rem;
  font-weight: bold;
  margin-bottom: 10px;
}

.task-description {
  color: #555;
  margin-bottom: 10px;
}

.task-status {
  font-weight: bold;
  margin-bottom: 15px;
}

.task-status .completed {
  color: green;
}

.task-actions {
  display: flex;
  gap: 10px;
}

.button {
  padding: 8px 12px;
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  text-decoration: none;
  font-size: 0.9rem;
}

.button:hover {
  background-color: #0056b3;
}

.edit-button {
  background-color: #ffc107;
}

.edit-button:hover {
  background-color: #e0a800;
}
</style>
