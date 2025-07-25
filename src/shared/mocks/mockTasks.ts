import type { Task } from "@entities/task/model/types";

export const mockTasks: Task[] = [
  {
    id: 1,
    title: "Пофиксить баг с авторизацией",
    description: "Пользователь не может войти после обновления токена.",
    category: "Bug",
    status: "To Do",
    priority: "High",
  },
  {
    id: 2,
    title: "Добавить возможность фильтрации задач",
    description: "Фильтрация по статусу, категории, приоритету.",
    category: "Feature",
    status: "In Progress",
    priority: "Medium",
  },
  {
    id: 3,
    title: "Обновить README",
    description: "Добавить инструкции по запуску проекта.",
    category: "Documentation",
    status: "Done",
    priority: "Low",
  },
  {
    id: 4,
    title: "Рефакторинг TaskItem",
    description: "Вынести теги и кнопки в отдельный компонент.",
    category: "Refactor",
    status: "To Do",
    priority: "Medium",
  },
  {
    id: 5,
    title: "Написать юнит-тесты для TaskForm",
    description: "Использовать React Testing Library.",
    category: "Test",
    status: "In Progress",
    priority: "High",
  },
];
