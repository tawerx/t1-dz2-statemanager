import { create } from "zustand";
import type { Task } from "./types";

type State = {
  tasks: Task[];
  addTask: (task: Omit<Task, "id">) => void;
  updateTask: (task: Task) => void;
  deleteTask: (id: number) => void;
  loadTasksFromStorage: () => void;
};

const useStore = create<State>((set) => ({
  tasks: [],
  addTask: (task: Omit<Task, "id">) =>
    set((state) => {
      const id = state.tasks.length
        ? state.tasks[state.tasks.length - 1].id + 1
        : 1;

      const newTask = {
        ...task,
        id,
        createdAt: new Date(),
      };

      const updatedTasks = [...state.tasks, newTask];
      localStorage.setItem("tasks", JSON.stringify(updatedTasks));

      return {
        tasks: updatedTasks,
      };
    }),

  updateTask: (newTask: Task) =>
    set((state) => {
      const updatedTasks = state.tasks.map((task) =>
        task.id === newTask.id ? newTask : task
      );
      localStorage.setItem("tasks", JSON.stringify(updatedTasks));

      return {
        tasks: updatedTasks,
      };
    }),

  deleteTask: (id: number) =>
    set((state) => {
      const updatedTasks = state.tasks.filter((task) => task.id !== id);
      localStorage.setItem("tasks", JSON.stringify(updatedTasks));

      return { tasks: updatedTasks };
    }),

  loadTasksFromStorage: () => {
    const stored = localStorage.getItem("tasks");
    const tasks = stored
      ? JSON.parse(stored).map((task: Task) => ({
          ...task,
          createdAt: task.createdAt && new Date(task.createdAt),
        }))
      : [];
    set({ tasks });
  },
}));

export default useStore;
