import { createContext, useContext, useState } from "react";
import { createColabRequest, getColabsRequest} from "../api/colaboradores";

const ColaboradorContext = createContext();

export const useColabs = () => {
  const context = useContext(ColaboradorContext);
  if (!context) throw new Error("useColabs must be used within a ColabsProvider"); 
  return context;
};

export function ColabsProvider({ children }) {
  const [colaboradores, setColabs] = useState([]);


  const getColabs = async () => {
    const res = await getColabsRequest();
    setColabs(res.data);
    console.log(res.data)
  };


  const createColab = async (colaborador) => {
    try {
      const res = await createColabRequest(colaborador); 
      getColabs(); 
    } catch (error) {
      console.log(error);
    }
  };


  return (
    <ColaboradorContext.Provider 
      value={{
        colaboradores,
        getColabs,
        createColab,
      }}
    >
      {children}
    </ColaboradorContext.Provider>
  );
}