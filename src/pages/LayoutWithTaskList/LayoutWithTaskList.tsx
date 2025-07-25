import { TaskList } from "@pages/Tasklist";
import { Outlet } from "react-router-dom";

const LayoutWithTaskList = () => {
  return (
    <>
      <TaskList />
      <Outlet />
    </>
  );
};

export default LayoutWithTaskList;
