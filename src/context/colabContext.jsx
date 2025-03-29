import { createContext, useContext, useState } from "react";
import { createColabRequest, getColabsRequest, deleteColab} from "../api/colaboradores";

const ColaboradorContext = createContext();

export const useColabs = () => {
  const context = useContext(ColaboradorContext);
  if (!context) throw new Error("useColabs must be used within a ColabsProvider"); 
  return context;
};

export function ColabsProvider({ children }) {
  const [colaboradores, setColabs] = useState([]);
  const [colabUsuarios, setColabsUsers] = useState([]);


  const getColabs = async () => {
    const res = await getColabsRequest();
    const { colaboradores } = res.data;

    setColabs(colaboradores);
    setColabsUsers(res.data.colabUser || []);
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

  const deteteColaborator = async (id) => {
    try {
      const res = await deleteColab(id);
      if (res.status === 204) setColabs(colaboradores.filter((colaborador) => colaborador._id !== id));
    } catch (error) {
      console.log(error);
    }
  };


  return (
    <ColaboradorContext.Provider 
      value={{
        colaboradores,
        colabUsuarios,
        getColabs,
        createColab,
        deteteColaborator,
      }}
    >
      {children}
    </ColaboradorContext.Provider>
  );
}