import { Box, Button, Container, CssBaseline } from "@mui/material";
import { useNavigate, useParams } from "react-router-dom";
import styles from "./TaskInfo.module.css";
import useStore from "@entities/task/model/store";

const TaskInfo = () => {
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();
  const tasks = useStore((state) => state.tasks);

  const task = tasks.find((task) => task.id === Number(id));

  if (!task) return <p>Задача не найдена</p>;

  return (
    <>
      <CssBaseline />
      <Container
        maxWidth="xs"
        sx={{
          py: 1,
          bgcolor: "#FFF6EB",
          display: "flex",
          flexDirection: "column",
          gap: "15px",
          border: "1px solid rgba(0, 0, 0, 0.2)",
          borderRadius: "10px",
        }}
      >
        <Box className="taskItem-title">
          <h3>Заголовок</h3>
          <span>{task.title}</span>
        </Box>
        <Box className="taskItem-description">
          <h3>Описание</h3>
          <span>{task.description}</span>
        </Box>
        <Box
          className="taskItem-category"
          sx={{
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
            gap: "15px",
          }}
        >
          <h3>Категория:</h3>
          <span className={styles[task.category.replace(" ", "")]}>
            {task.category}
          </span>
        </Box>
        <Box
          className="taskItem-status"
          sx={{
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
            gap: "15px",
          }}
        >
          <h3>Статус:</h3>
          <span className={styles[task.status.replace(" ", "")]}>
            {task.status}
          </span>
        </Box>
        <Box
          className="taskItem-priority"
          sx={{
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
            gap: "15px",
            borderBottom: "1px solid rgba(0, 0, 0, 0.2)",
          }}
        >
          <h3>Приоритет:</h3>
          <span className={styles[task.priority.replace(" ", "")]}>
            {task.priority}
          </span>
        </Box>
        <Box
          className={styles.taskItemBottom}
          sx={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-between",
          }}
        >
          <Button variant="outlined" onClick={() => navigate("/")}>
            Назад
          </Button>
          <Button
            variant="outlined"
            onClick={() =>
              navigate(`/task/${id}/edit`, {
                state: { background: `/task/${id}` },
              })
            }
          >
            Изменить
          </Button>
        </Box>
      </Container>
    </>
  );
};

export default TaskInfo;
