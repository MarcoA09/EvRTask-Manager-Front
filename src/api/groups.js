import axios from '../api/axios';

export const getGroupsRequest = async () => {
  const token = localStorage.getItem("token"); 
  try {
    return await axios.get(
     `/api/groups`, 
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

export const createGroupRequest = async (group) => {
    const token = localStorage.getItem("token"); 
    try {
      return await axios.post(
        `/api/groups`,
        group,
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

export const getIntegrantsGroupRequest = async (idGroup) => {
  const token = localStorage.getItem("token");
  try {
    return await axios.get(`/api/groups/integrants/${idGroup}`, {
      headers: {
        "Authorization": `Bearer ${token}`,
      }
    });
  } catch (error) {
    throw error;
  }
};
