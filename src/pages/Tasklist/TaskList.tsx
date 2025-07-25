import { Button, Container, CssBaseline } from "@mui/material";
import styles from "./TaskList.module.css";
import React from "react";
import type { Category, Status, Priority } from "@entities/task/model/types";
import { useNavigate } from "react-router-dom";
import useStore from "@entities/task/model/store";
import TaskItem from "@entities/task/ui/TaskItem";
import Filters from "@features/filter-task/ui/Filters";
import { mockTasks } from "@shared/mocks/mockTasks";

const TaskList = () => {
  const [category, setCategory] = React.useState<Category | "">("");
  const [status, setStatus] = React.useState<Status | "">("");
  const [priority, setPriority] = React.useState<Priority | "">("");
  const tasks = useStore((state) => state.tasks);
  const navigate = useNavigate();
  const loadTasksFromStorage = useStore((state) => state.loadTasksFromStorage);

  const handleStatusChange = (value: Status | "") => {
    setStatus(value);
    setCategory("");
    setPriority("");
  };

  const handleCategoryChange = (value: Category | "") => {
    setCategory(value);
    setStatus("");
    setPriority("");
  };

  const handlePriorityChange = (value: Priority | "") => {
    setPriority(value);
    setStatus("");
    setCategory("");
  };

  const sortedTasks = React.useMemo(() => {
    return [...tasks].sort((a, b) => {
      if (status) {
        const aMatch = a.status === status ? 0 : 1;
        const bMatch = b.status === status ? 0 : 1;
        if (aMatch !== bMatch) return aMatch - bMatch;
      }

      if (category) {
        const aMatch = a.category === category ? 0 : 1;
        const bMatch = b.category === category ? 0 : 1;
        if (aMatch !== bMatch) return aMatch - bMatch;
      }

      if (priority) {
        const aMatch = a.priority === priority ? 0 : 1;
        const bMatch = b.priority === priority ? 0 : 1;
        if (aMatch !== bMatch) return aMatch - bMatch;
      }

      return 0;
    });
  }, [tasks, category, status, priority]);

  React.useEffect(() => {
    const storedTasks = localStorage.getItem("tasks");

    if (storedTasks) {
      loadTasksFromStorage();
    } else {
      localStorage.setItem("tasks", JSON.stringify(mockTasks));
      loadTasksFromStorage();
    }
  }, []);

  return (
    <>
      <CssBaseline />
      <Container
        maxWidth="lg"
        sx={{
          py: 4,
          bgcolor: "#FFF6EB",
          display: "flex",
          flexDirection: "column",
          gap: "15px",
        }}
      >
        <div className={styles.taskListTop}>
          <Button
            variant="outlined"
            sx={{
              width: { xs: "80vw", md: "20vw", lg: "15vw", xl: "13vw" },
              height: "56px",
            }}
            onClick={() => navigate("/task/new")}
          >
            Добавить задачу
          </Button>
          <Filters
            category={category}
            priority={priority}
            status={status}
            changeCat={handleCategoryChange}
            changeStatus={handleStatusChange}
            changePriority={handlePriorityChange}
          />
        </div>
        <div className={styles.taskList}>
          {sortedTasks.map(
            ({ id, title, description, category, status, priority }) => (
              <TaskItem
                key={id}
                id={id}
                title={title}
                description={description}
                category={category}
                status={status}
                priority={priority}
              />
            )
          )}
        </div>
      </Container>
    </>
  );
};

export default TaskList;
