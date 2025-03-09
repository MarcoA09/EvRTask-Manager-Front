import axios from '../api/axios';

export const getColabsRequest = async () => {
  const token = localStorage.getItem("token");  
  try {
    return await axios.get(
      `/api/users-collaborators`,
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

export const createColabRequest = async (colaborador) => {
    const token = localStorage.getItem("token"); 
    try {
      return await axios.post(
        `/api/users-collaborators`,
        colaborador,
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


