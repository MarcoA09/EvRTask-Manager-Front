import { createContext, useContext, useState, useEffect } from "react";
import { createTaskRequest, getTasksRequest, getTasksGroupRequest, updateTaskRequest} from "../api/tasks";

const TaskContext = createContext();

export const useTasks = () => {
  const context = useContext(TaskContext);
  if (!context) throw new Error("useTasks must be used within a TaskProvider"); 
  return context;
};

export function TaskProvider({ children }) {
  const [tasks, setTasks] = useState([]);
  const [tasksgroups, setTasksGroup] = useState([]);

  const getTasks = async () => {
    const res = await getTasksRequest();
    setTasks(res.data);
  }; 

  const getTasksGroups = async (idGroup) => {
    try {
      if (!idGroup) {
        console.warn("No se proporcionó un ID de grupo");
        setTasksGroup([]); 
        return;
      }
      
      const res = await getTasksGroupRequest(idGroup);
      setTasksGroup(res.data);
    } catch (error) {
      console.error(error);
    }
  };

  const createTask = async (task) => {
    try {
      const res = await createTaskRequest(task); 
      getTasks(); 
    } catch (error) {
      console.log(error);
    }
  };


  const updateTask = async (id, nuevoEstado) => {
    try {
      const res = await updateTaskRequest(id, { estado: nuevoEstado });
      
      setTasks(tasks.map(task => 
        task._id === id ? res.data : task
      ));
      
      return res.data;
    } catch (error) {
      console.error("Error al actualizar el estado:", error);
      throw error;
    }
  };


  return (
    <TaskContext.Provider
      value={{
        tasks,
        tasksgroups,
        getTasks,
        getTasksGroups,
        createTask,
        updateTask,
      }}
    >
      {children}
    </TaskContext.Provider>
  );
}
