<template>
  <div>
    <h2 class="page-title">Task List</h2>

    <!-- Filter Dropdown -->
    <div class="filter-container">
      <label for="filter" class="filter-label">Filter by:</label>
      <select id="filter" v-model="filter" class="filter-select">
        <option value="all">All</option>
        <option value="pending">Pending</option>
        <option value="completed">Completed</option>
      </select>
    </div>

    <!-- Loader -->
    <div v-if="loading" class="loader">
      <p>Loading tasks...</p>
    </div>

    <!-- Task List -->
    <div v-else class="task-list">
      <TaskCard
        v-for="task in filteredTasks"
        :key="task.id"
        :task="task"
        @delete-task="deleteTask"
      />
      <p v-if="filteredTasks.length === 0" class="no-tasks-message">
        No tasks available for the selected filter.
      </p>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, onMounted, computed } from "vue"
import { useTaskStore } from "../stores/taskStore"
import TaskCard from "../components/TaskCard.vue"
import { baseUrl } from "../stores/taskStore"

export default defineComponent({
  components: { TaskCard },
  setup() {
    const taskStore = useTaskStore()
    const loading = ref(true)
    const filter = ref("all") // Filter state

    const tasks = computed(() => taskStore.tasks)

    // Computed property for filtered tasks
    const filteredTasks = computed(() => {
      if (filter.value === "pending") {
        return tasks.value.filter((task) => !task.completed)
      } else if (filter.value === "completed") {
        return tasks.value.filter((task) => task.completed)
      }
      return tasks.value // Default: All tasks
    })

    const fetchTasks = async () => {
      try {
        await taskStore.fetchTasks()
      } catch (error) {
        console.error("Failed to fetch tasks:", error)
      } finally {
        loading.value = false
      }
    }

    const deleteTask = async (id: number) => {
      try {
        const response = await fetch(`${baseUrl}/tasks/${id}`, {
          method: "DELETE",
        })

        if (!response.ok) throw new Error("Failed to delete task")

        taskStore.tasks = taskStore.tasks.filter((task) => task.id !== id)
      } catch (error) {
        console.error("Error deleting task:", error)
      }
    }

    onMounted(() => {
      fetchTasks()
    })

    return { tasks, filteredTasks, filter, loading, deleteTask }
  },
})
</script>

<style scoped>
.page-title {
  font-size: 1.75rem;
  font-weight: bold;
  margin-bottom: 20px;
  text-align: center;
}

.filter-container {
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 20px;
}

.filter-label {
  font-weight: bold;
  margin-right: 10px;
}

.filter-select {
  padding: 5px 10px;
  border: 1px solid #ddd;
  border-radius: 4px;
  font-size: 1rem;
}

.task-list {
  display: flex;
  flex-direction: column;
  gap: 15px;
}

.loader {
  text-align: center;
  font-size: 16px;
  font-weight: bold;
  color: #007bff;
  margin: 20px 0;
}

.no-tasks-message {
  text-align: center;
  color: #555;
  font-size: 1rem;
  margin-top: 20px;
}
</style>
