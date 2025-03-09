import axios from '../api/axios';

export const registerRequest = user => axios.post(`/api/register`, user)

export const loginRequest = user => axios.post(`/api/login`, user)

export const getUsersRequest = async (username) => {
  const token = localStorage.getItem("token");
  
  try {
      const response = await axios.get(
          `/api/users?username=${username}`,
          {
              headers: {
                  "Authorization": `Bearer ${token}`,
              }
          }
      );
      return response.data;
  } catch (error) {
      console.log(error);
      throw error;
  }
};
  export const verifyTokenRequest = async () => {
    const token = localStorage.getItem("token");
    try {
      const response = await axios.get(`/api/verify`, {
        headers: {
          "Authorization": `Bearer ${token}`, 
        }
      });
      return response.data;
    } catch (error) {
      console.log(error);
      throw error;
    }
  };
  

  export const verifyEmailRequest = async (emailData) => {
    try {
      const response = await axios.post(`/api/verifyEmail`, emailData); 
      return response.data;
    } catch (error) {
      console.log(error);

      if (error.response && error.response.data) {
      throw error.response.data;
    }
    throw error;
  }
};



