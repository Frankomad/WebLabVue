<template>
  <div class="page" v-if="task">
    <h2>Edit Task</h2>
    <TaskForm :initialTask="task" @submit-task="updateTask" />
    <router-link to="/" class="cancel-link">Cancel</router-link>
  </div>
  <div v-else class="loading">
    <p>Loading task...</p>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, onMounted } from "vue"
import { useRoute, useRouter } from "vue-router"
import type { Task } from "../stores/taskStore"
import TaskForm from "../components/TaskForm.vue"
import { baseUrl } from "../stores/taskStore"

export default defineComponent({
  components: { TaskForm },
  setup() {
    const route = useRoute()
    const router = useRouter()
    const task = ref<Task | null>(null)

    const fetchTask = async (id: number) => {
      try {
        const response = await fetch(`${baseUrl}/tasks/${id}`)
        if (!response.ok) throw new Error("Task not found")
        task.value = await response.json()
      } catch (error) {
        console.error("Error fetching task:", error)
        router.push("/") // Redirect if task not found
      }
    }

    const updateTask = async (updatedTask: Task) => {
      try {
        const response = await fetch(`${baseUrl}/tasks/${updatedTask.id}`, {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(updatedTask),
        })

        if (!response.ok) throw new Error("Failed to update task")

        alert("Task updated successfully!")
        router.push("/")
      } catch (error) {
        console.error("Error updating task:", error)
      }
    }

    onMounted(() => {
      const taskId = parseInt(route.params.id as string, 10)
      fetchTask(taskId)
    })

    return { task, updateTask }
  },
})
</script>

<style scoped>
.page {
  max-width: 600px;
  margin: 0 auto;
  padding: 20px;
}

.cancel-link {
  display: inline-block;
  margin-top: 10px;
  color: #007bff;
  text-decoration: underline;
}

.cancel-link:hover {
  color: #0056b3;
}
</style>
