<template>
  <div v-if="task">
    <h2>Task Details</h2>
    <p><strong>Title:</strong> {{ task.title }}</p>
    <p><strong>Description:</strong> {{ task.description }}</p>
    <p>
      <strong>Status:</strong>
      <span :class="{ completed: task.completed }">
        {{ task.completed ? "Completed" : "Pending" }}
      </span>
    </p>
    <button @click="toggleCompletion">
      Mark as {{ task.completed ? "Pending" : "Completed" }}
    </button>
    <router-link to="/">Back to Task List</router-link>
  </div>
  <div v-else>
    <p>Loading task details...</p>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, onMounted } from "vue"
import { useRoute } from "vue-router"
import type { Task } from "../stores/taskStore"
import { baseUrl } from "../stores/taskStore"

export default defineComponent({
  setup() {
    const route = useRoute()
    const task = ref<Task | null>(null)

    const fetchTaskDetails = async (id: number) => {
      try {
        const response = await fetch(`${baseUrl}/tasks/${id}`)
        if (response.ok) {
          task.value = await response.json()
        } else {
          console.error("Task not found")
        }
      } catch (error) {
        console.error("Failed to fetch task details:", error)
      }
    }

    const toggleCompletion = async () => {
      if (task.value) {
        task.value.completed = !task.value.completed
        await fetch(`${baseUrl}/tasks/${task.value.id}`, {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(task.value),
        })
      }
    }

    onMounted(() => {
      const taskId = parseInt(route.params.id as string, 10)
      fetchTaskDetails(taskId)
    })

    return {
      task,
      toggleCompletion,
    }
  },
})
</script>

<style scoped>
.completed {
  color: green;
  font-weight: bold;
}
</style>
