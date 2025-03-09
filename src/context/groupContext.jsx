import { createContext, useContext, useState } from "react";
import {createGroupRequest, getGroupsRequest, getIntegrantsGroupRequest} from "../api/groups";

const GroupContext = createContext();

export const useGroups = () => {
  const context = useContext(GroupContext);
  if (!context) throw new Error("useGroups must be used within a GroupProvider"); 
  return context;
};

export function GroupProvider({ children }) {
  const [groups, setGroups] = useState([]);
  const [integrantsGroup, setIntegrantsGroup] = useState([]);

const getGroups = async () => {
  const res = await getGroupsRequest();
  setGroups(res.data);
}

  const createGroup = async (group) => {
    try {
      const res = await createGroupRequest(group);
    } catch (error) {
      console.log(error); 
    }
  };

    const getIntegrantsGroups = async (idGroup) => {
      try {
        const res = await getIntegrantsGroupRequest(idGroup);
        setIntegrantsGroup(res.data);
        console.log("integrantes", res.data)
      } catch (error) {
        console.error(error);
      }
    };


  return (
    <GroupContext.Provider
      value={{
        groups,
        integrantsGroup,
        getGroups,
        createGroup,
        getIntegrantsGroups,
      }}
    >
      {children}
    </GroupContext.Provider>
  );
}