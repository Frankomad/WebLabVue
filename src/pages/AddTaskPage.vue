<template>
  <div class="page">
    <h2>Add Task</h2>
    <TaskForm @submit-task="addTask" />
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue"
import { useTaskStore } from "../stores/taskStore"
import TaskForm from "../components/TaskForm.vue"

export default defineComponent({
  components: { TaskForm },
  setup() {
    const taskStore = useTaskStore()

    const addTask = async (task: { title: string; description: string }) => {
      await taskStore.addTask({ ...task, completed: false })
      alert("Task added successfully!")
    }

    return { addTask }
  },
})
</script>

<style scoped>
.page {
  max-width: 600px;
  margin: 0 auto;
  padding: 20px;
}
</style>
