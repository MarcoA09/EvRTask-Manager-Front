import axios from '../api/axios';

export const getTasksRequest = async () => {
  const token = localStorage.getItem("token");  
  try {
    return await axios.get(
      `/api/dashboard`,
      {
        headers: {
          "Authorization": `Bearer ${token}`,  
        }
      }
    );
  } catch (error) { 
    console.log(error);
    throw error;
  }
};

export const createTaskRequest = async (task) => {
    const token = localStorage.getItem("token"); 
    try {
      return await axios.post(
        `/api/task`,
        task,
        {
          headers: {
            "Authorization": `Bearer ${token}`, 
          },
        }
      );
    } catch (error) {
      console.log(error);
      throw error;
    }
};

export const getTasksGroupRequest = async (idGroup) => {
  const token = localStorage.getItem("token");
  try {
    return await axios.get(`/api/api/groups/tasks/${idGroup}`, {
      headers: {
        "Authorization": `Bearer ${token}`,
      }
    });
  } catch (error) {
    throw error;
  }
};

export const updateTaskRequest = async (id, updateData) => {
  const token = localStorage.getItem("token");  
  try {
    return await axios.put(
      `/api/task/${id}`,
      updateData,
        {
        headers: {
          "Authorization": `Bearer ${token}`,  
        }
      }
    );
  } catch (error) { 
    console.log(error);
    throw error;
  }
};
