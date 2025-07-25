import { HashRouter, Route, Routes } from "react-router-dom";
import { TaskDetails } from "@pages/TaskDetails";
import { LayoutWithTaskList } from "@pages/LayoutWithTaskList";
import { TaskInfo } from "@pages/TaskInfo";

const App = () => {
  return (
    <HashRouter>
      <Routes>
        <Route path="/" element={<LayoutWithTaskList />}>
          <Route path="/task/:id/edit" element={<TaskDetails mode="edit" />} />
          <Route path="task/new" element={<TaskDetails mode="new" />} />
        </Route>
        <Route path="/task/:id" element={<TaskInfo />} />
      </Routes>
    </HashRouter>
  );
};

export default App;
