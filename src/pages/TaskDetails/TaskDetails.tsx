import * as React from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import { Box } from "@mui/material";
import { useNavigate, useParams } from "react-router-dom";
import type { Task } from "@entities/task/model/types";
import {
  getCategoryColor,
  getPriorityColor,
  getStatusColor,
} from "@shared/lib";
import useStore from "@entities/task/model/store";

interface Props {
  mode: "edit" | "new";
}

const emptyTask: Task = {
  id: Date.now(),
  title: "",
  description: "",
  category: "Bug",
  status: "To Do",
  priority: "Low",
};

export default function FormDialog({ mode }: Props) {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const tasks = useStore((state) => state.tasks);
  const updateTask = useStore((state) => state.updateTask);
  const addTask = useStore((state) => state.addTask);
  const task = tasks.find((task) => task.id === Number(id));

  const [formData, setFormData] = React.useState(
    mode === "edit" ? task ?? null : emptyTask
  );

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (formData && mode === "edit") {
      updateTask(formData);
    }

    if (formData && mode === "new") {
      addTask({ ...formData });
    }

    navigate("/");
  };

  React.useEffect(() => {
    if (mode === "edit" && task) {
      setFormData(task);
    }
  }, [task, mode]);

  if (!formData) return null;

  return (
    <React.Fragment>
      <Dialog open={true} onClose={() => navigate("/")}>
        <DialogTitle>
          {mode === "new" ? "Создание" : "Редактирование"}
        </DialogTitle>
        <DialogContent sx={{ paddingBottom: 0 }}>
          <form onSubmit={handleSubmit}>
            <TextField
              autoFocus
              required
              margin="dense"
              id="title"
              name="title"
              label="Заголовок"
              fullWidth
              variant="standard"
              value={formData.title}
              onChange={(e) =>
                setFormData({ ...formData, title: e.target.value })
              }
            />
            <TextField
              autoFocus
              multiline
              margin="dense"
              id="description"
              name="description"
              label="Описание"
              fullWidth
              variant="standard"
              value={formData.description}
              onChange={(e) =>
                setFormData({ ...formData, description: e.target.value })
              }
            />
            <Box
              sx={{
                display: "flex",
                flexDirection: "row",
                justifyContent: "space-between",
                gap: "5px",
              }}
            >
              <FormControl fullWidth margin="dense">
                <InputLabel id="category-label">Категория</InputLabel>
                <Select
                  required
                  labelId="category-label"
                  name="category"
                  value={formData.category}
                  onChange={(e) =>
                    setFormData({ ...formData, category: e.target.value })
                  }
                  label="Категория"
                  sx={{ backgroundColor: getCategoryColor(formData.category) }}
                >
                  <MenuItem value="Bug">Bug</MenuItem>
                  <MenuItem value="Feature">Feature</MenuItem>
                  <MenuItem value="Documentation">Documentation</MenuItem>
                  <MenuItem value="Refactor">Refactor</MenuItem>
                  <MenuItem value="Test">Test</MenuItem>
                </Select>
              </FormControl>

              <FormControl fullWidth margin="dense">
                <InputLabel id="status-label">Статус</InputLabel>
                <Select
                  required
                  labelId="status-label"
                  name="status"
                  value={formData.status}
                  onChange={(e) =>
                    setFormData({ ...formData, status: e.target.value })
                  }
                  label="Статус"
                  sx={{ backgroundColor: getStatusColor(formData.status) }}
                >
                  <MenuItem value="To Do">To Do</MenuItem>
                  <MenuItem value="In Progress">In Progress</MenuItem>
                  <MenuItem value="Done">Done</MenuItem>
                </Select>
              </FormControl>

              <FormControl fullWidth margin="dense">
                <InputLabel id="priority-label">Приоритет</InputLabel>
                <Select
                  required
                  labelId="priority-label"
                  name="priority"
                  value={formData.priority}
                  onChange={(e) =>
                    setFormData({ ...formData, priority: e.target.value })
                  }
                  label="Приоритет"
                  sx={{ backgroundColor: getPriorityColor(formData.priority) }}
                >
                  <MenuItem value="Low">Low</MenuItem>
                  <MenuItem value="Medium">Medium</MenuItem>
                  <MenuItem value="High">High</MenuItem>
                </Select>
              </FormControl>
            </Box>

            <DialogActions
              sx={{
                display: "flex",
                flexDirection: "row",
                justifyContent: "space-between",
              }}
            >
              <Button
                onClick={() => {
                  task && setFormData(task);
                  navigate("/");
                }}
              >
                Отменить
              </Button>
              {mode === "edit" ? (
                <Button type="submit">Сохранить</Button>
              ) : (
                <Button type="submit">Создать</Button>
              )}
            </DialogActions>
          </form>
        </DialogContent>
      </Dialog>
    </React.Fragment>
  );
}
