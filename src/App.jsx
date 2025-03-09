import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./context/authContext";
import { TaskProvider } from "./context/tasksContext";
import { GroupProvider } from "./context/groupContext";
import { ColabsProvider } from "./context/colabContext";
import LandinPage from "./pages/LandingPage/LandinPage";
import LoginPage from "./pages/LoginPage/LoginPage";
import RegisterPage from "./pages/Register/RegisterPage";
import MainLayaout from "./layouts/MainLayaout";
import TasksPage from "./pages/TasksPage/TasksPage";
import GroupsPage from "./pages/GroupsPage/GroupsPage";
import { GroupsTasks } from "./pages/GroupsTasks/GroupsTasks";
import { ProtectPage } from "./ProtectPage";
import { CollaboratorsPage } from "./pages/CollaboratorsPage/CollaboratorsPage";

function App() {
  return (
    <AuthProvider>
      <TaskProvider>
        <GroupProvider>
          <ColabsProvider>
          <BrowserRouter>
            <Routes>
              <Route path="/" element={<LandinPage />} />
              <Route path="/login" element={<LoginPage />} />
              <Route path="/register" element={<RegisterPage />} />
               <Route element={<ProtectPage />}> 
                  <Route path="/dashboard" element={<MainLayaout />} />
                  <Route path="/tasks" element={<TasksPage />} />
                  <Route path="/groups" element={<GroupsPage />} />
                  <Route path="/groups/tasks/:idGroup" element={<GroupsTasks />} />
                  <Route path="/users-collaborators" element={< CollaboratorsPage />} />
                  {/*    <Route path='/groups/integrants/:idGroup' element={<MainLayaout/>} /> */}
                   </Route> 
            </Routes>
          </BrowserRouter>
          </ColabsProvider>
        </GroupProvider>
      </TaskProvider>
    </AuthProvider>
  );
}

export default App;
