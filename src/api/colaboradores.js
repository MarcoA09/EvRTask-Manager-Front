import axios from '../api/axios';

export const getColabsRequest = async () => {
  const token = localStorage.getItem("token");  
  try {
    return await axios.get(
      `/users-collaborators`,
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
        `/users-collaborators`,
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


