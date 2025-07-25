import { Button } from "@mui/material";
import React from "react";
import styles from "./TaskItem.module.css";
import CheckIcon from "@mui/icons-material/Check";
import CloseIcon from "@mui/icons-material/Close";
import EditIcon from "@mui/icons-material/Edit";
import type { Category, Priority, Status } from "@entities/task/model/types";
import { useLocation, useNavigate } from "react-router-dom";
import useStore from "../model/store";

interface Props {
  id: number;
  title: string;
  description: string;
  category: Category;
  status: Status;
  priority: Priority;
}

const TaskItem: React.FC<Props> = ({
  id,
  title,
  description,
  category,
  status,
  priority,
}) => {
  const updateTask = useStore((state) => state.updateTask);
  const deleteTask = useStore((state) => state.deleteTask);
  const navigate = useNavigate();
  const location = useLocation();

  return (
    <>
      <div className={styles.taskItem}>
        <div className={styles.taskItemBody}>
          <div
            className={styles.taskItemBodyLeftside}
            onClick={() => navigate(`/task/${id}`)}
          >
            <div className={styles.taskItemBodyTitle}>
              <span>{title}</span>
            </div>
            <div className={styles.taskItemBodyDescription}>
              <span>{description}</span>
            </div>
            <div className={styles.taskItemBodyBottom}>
              <div className={styles[category.replace(" ", "")]}>
                {category}
              </div>
              <div className={styles[status.replace(" ", "")]}>{status}</div>
              <div className={styles[priority.replace(" ", "")]}>
                {priority}
              </div>
            </div>
          </div>
          <div className={styles.taskItemControls}>
            {status != "Done" && (
              <Button
                variant="outlined"
                color="success"
                startIcon={<CheckIcon />}
                onClick={() =>
                  updateTask({
                    id,
                    title,
                    description,
                    category,
                    status: "Done",
                    priority,
                  })
                }
              ></Button>
            )}
            {status != "Done" && (
              <Button
                variant="outlined"
                startIcon={<EditIcon />}
                onClick={() =>
                  navigate(`/task/${id}/edit`, {
                    state: { background: location },
                  })
                }
              ></Button>
            )}
            <Button
              variant="outlined"
              color="error"
              startIcon={<CloseIcon />}
              onClick={() => deleteTask(id)}
            ></Button>
          </div>
        </div>
      </div>
    </>
  );
};

export default TaskItem;
