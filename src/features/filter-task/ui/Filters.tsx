import {
  Box,
  FormControl,
  IconButton,
  InputLabel,
  MenuItem,
  Select,
} from "@mui/material";
import ClearIcon from "@mui/icons-material/Clear";
import React from "react";
import type { Category, Priority, Status } from "@entities/task/model/types";
import {
  getCategoryColor,
  getPriorityColor,
  getStatusColor,
} from "@shared/lib";

interface Props {
  category: Category | "";
  status: Status | "";
  priority: Priority | "";
  changeCat: (value: Category | "") => void;
  changeStatus: (value: Status | "") => void;
  changePriority: (value: Priority | "") => void;
}
const Filters: React.FC<Props> = ({
  category,
  status,
  priority,
  changeCat,
  changeStatus,
  changePriority,
}) => {
  return (
    <>
      <Box
        sx={{
          display: "flex",
          flexDirection: "row",
          gap: "15px",
        }}
      >
        <Box
          sx={{
            position: "relative",
            width: { xs: "24vw", md: "19vw", lg: "10vw", xl: "9vw" },
          }}
        >
          <FormControl
            fullWidth
            margin="dense"
            sx={{ width: { xs: "24vw", md: "19vw", lg: "10vw", xl: "9vw" } }}
          >
            <InputLabel id="category-label">Категория</InputLabel>
            <Select
              required
              labelId="category-label"
              name="category"
              value={category}
              onChange={(e) => changeCat(e.target.value)}
              label="Категория"
              sx={{ backgroundColor: getCategoryColor(category) }}
            >
              <MenuItem value="Bug">Bug</MenuItem>
              <MenuItem value="Feature">Feature</MenuItem>
              <MenuItem value="Documentation">Documentation</MenuItem>
              <MenuItem value="Refactor">Refactor</MenuItem>
              <MenuItem value="Test">Test</MenuItem>
            </Select>
          </FormControl>

          {category && (
            <IconButton
              size="small"
              onClick={() => changeCat("")}
              sx={{
                position: "absolute",
                top: "50%",
                right: 8,
                transform: "translateY(-50%)",
                zIndex: 1,
                backgroundColor: "white",
                "&:hover": { backgroundColor: "#f5f5f5" },
              }}
              aria-label="Очистить фильтр"
            >
              <ClearIcon fontSize="small" />
            </IconButton>
          )}
        </Box>
        <Box
          sx={{
            position: "relative",
            width: { xs: "24vw", md: "19vw", lg: "10vw", xl: "9vw" },
          }}
        >
          <FormControl
            fullWidth
            margin="dense"
            sx={{ width: { xs: "24vw", md: "19vw", lg: "10vw", xl: "9vw" } }}
          >
            <InputLabel id="status-label">Статус</InputLabel>
            <Select
              required
              labelId="status-label"
              name="status"
              value={status}
              onChange={(e) => changeStatus(e.target.value)}
              label="Статус"
              sx={{ backgroundColor: getStatusColor(status) }}
            >
              <MenuItem value="To Do">To Do</MenuItem>
              <MenuItem value="In Progress">In Progress</MenuItem>
              <MenuItem value="Done">Done</MenuItem>
            </Select>
          </FormControl>

          {status && (
            <IconButton
              size="small"
              onClick={() => changeStatus("")}
              sx={{
                position: "absolute",
                top: "50%",
                right: 8,
                transform: "translateY(-50%)",
                zIndex: 1,
                backgroundColor: "white",
                "&:hover": { backgroundColor: "#f5f5f5" },
              }}
              aria-label="Очистить фильтр"
            >
              <ClearIcon fontSize="small" />
            </IconButton>
          )}
        </Box>

        <Box
          sx={{
            position: "relative",
            width: { xs: "24vw", md: "19vw", lg: "10vw", xl: "9vw" },
          }}
        >
          <FormControl
            fullWidth
            margin="dense"
            sx={{ width: { xs: "24vw", md: "19vw", lg: "10vw", xl: "9vw" } }}
          >
            <InputLabel id="priority-label">Приоритет</InputLabel>
            <Select
              required
              labelId="priority-label"
              name="priority"
              value={priority}
              onChange={(e) => changePriority(e.target.value)}
              label="Приоритет"
              sx={{ backgroundColor: getPriorityColor(priority) }}
            >
              <MenuItem value="Low">Low</MenuItem>
              <MenuItem value="Medium">Medium</MenuItem>
              <MenuItem value="High">High</MenuItem>
            </Select>
          </FormControl>

          {priority && (
            <IconButton
              size="small"
              onClick={() => changePriority("")}
              sx={{
                position: "absolute",
                top: "50%",
                right: 8,
                transform: "translateY(-50%)",
                zIndex: 1,
                backgroundColor: "white",
                "&:hover": { backgroundColor: "#f5f5f5" },
              }}
              aria-label="Очистить фильтр"
            >
              <ClearIcon fontSize="small" />
            </IconButton>
          )}
        </Box>
      </Box>
    </>
  );
};

export default Filters;
