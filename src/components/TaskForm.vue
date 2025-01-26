<template>
  <form @submit.prevent="submitForm" class="form">
    <div class="form-group">
      <label class="label" for="title">Task Title:</label>
      <input
        id="title"
        class="input"
        v-model="formTask.title"
        placeholder="Enter task title"
        required
      />
    </div>

    <div class="form-group">
      <label class="label" for="description">Description:</label>
      <textarea
        id="description"
        class="textarea"
        v-model="formTask.description"
        placeholder="Enter task description"
        required
      ></textarea>
    </div>

    <div v-if="isEditMode" class="form-group">
      <label>
        <input type="checkbox" v-model="formTask.completed" />
        Completed
      </label>
    </div>

    <button type="submit" class="button">
      {{ isEditMode ? "Save Changes" : "Add Task" }}
    </button>
  </form>
</template>

<script lang="ts">
import { defineComponent, type PropType } from "vue"
import type { Task } from "../stores/taskStore"

export default defineComponent({
  props: {
    initialTask: {
      type: Object as PropType<Task>,
      required: false,
    },
  },
  emits: ["submit-task"],
  data() {
    return {
      formTask: this.initialTask
        ? { ...this.initialTask }
        : { title: "", description: "", completed: false },
    }
  },
  computed: {
    isEditMode() {
      return !!this.initialTask
    },
  },
  methods: {
    submitForm() {
      this.$emit("submit-task", this.formTask)
    },
  },
})
</script>

<style scoped>
.form {
  display: flex;
  flex-direction: column;
  gap: 15px;
}

.form-group {
  display: flex;
  flex-direction: column;
}

.label {
  font-weight: bold;
  margin-bottom: 5px;
}

.input,
.textarea {
  padding: 10px;
  border: 1px solid #ddd;
  border-radius: 4px;
  font-size: 14px;
}

.button {
  padding: 10px 15px;
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

.button:hover {
  background-color: #0056b3;
}
</style>
