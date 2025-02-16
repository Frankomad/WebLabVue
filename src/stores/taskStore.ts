import { defineStore } from "pinia"

export const baseUrl = "https://weblabnode.onrender.com"

export interface Task {
  id: number
  title: string
  description: string
  completed: boolean
}

export const useTaskStore = defineStore("taskStore", {
  state: () => ({
    tasks: [] as Task[],
  }),
  actions: {
    async fetchTasks() {
      try {
        const response = await fetch(`${baseUrl}/tasks`)
        if (!response.ok) {
          throw new Error("Failed to fetch tasks")
        }
        this.tasks = await response.json()
      } catch (error) {
        console.error("Error fetching tasks:", error)
      }
    },
    async addTask(task: Omit<Task, "id">) {
      try {
        const response = await fetch(`${baseUrl}/tasks`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(task),
        })
        const newTask = await response.json()
        this.tasks.push(newTask)
      } catch (error) {
        console.error("Error adding task:", error)
      }
    },
  },
})
