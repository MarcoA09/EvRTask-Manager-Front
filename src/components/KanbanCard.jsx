import { useRef, useEffect, useState } from "react";
import { useTasks } from "../context/tasksContext";
import { useAuth } from "../context/authContext";

const KanbanCard = ({ task }) => {
    const [isOpen, setIsOpen] = useState(false);
    const menu = useRef(null);
    const { updateTask} = useTasks();
    const { user } = useAuth();

const estados = ["En progreso", "Finalizada", "En pausa", "En revisión"];

const canEdit = user && task && (user._id === task?.user_assigned || user._id === task?.user);

const handleChangeStatus = async (nuevoEstado) => {
    try {
        await updateTask(task._id, nuevoEstado);
        setIsOpen(false);
        
        } catch(error) {
            console.log("Error al cambiar estado", error);
        }
    };

    useEffect(() => {
        const handleClick = (event) => {
            if (menu.current && !menu.current.contains(event.target)) {
                setIsOpen(false);
            }
        };
    
        document.addEventListener("mousedown", handleClick);
        return () => {
            document.removeEventListener("mousedown", handleClick);
        };
        }, []);

        const assignedTo = task?.user_assigned 
        ? `Asignado a: ${task.assignedUsername || 'Usuario'}` 
        : 'Sin asignar';
      
      if (!task) {
        return <div>Cargando tarea...</div>;
      }


    return (
        <div className="max-w-sm p-6 bg-white border border-gray-200 rounded-lg shadow-sm dark:bg-gray-800 dark:border-gray-700">

            <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">{task.nametask}</h5>
            <p>{assignedTo}</p>
            {task.groupName && <p>Grupo: {task.groupName}</p>}
         
         <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">{task.description}</p>


         
            <button  onClick={() => setIsOpen(!isOpen)} className="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white 
            bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 
            dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
             Cambiar estado
        <svg className="rtl:rotate-180 w-3.5 h-3.5 ms-2" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 10">
            <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M1 5h12m0 0L9 1m4 4L9 9"/>
        </svg>
    </button>


    {isOpen && (
          <div className="absolute z-10 mt-2 w-48 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
            <div className="py-1">
              {estados.map((estadoOption) => (
                <button
                  key={estadoOption}
                  onClick={() => handleChangeStatus(estadoOption)}
                  className={`block px-4 py-2 text-sm w-full text-left ${
                    task.estado === estadoOption 
                      ? 'bg-gray-100 text-gray-900 font-medium' 
                      : 'text-gray-700 hover:bg-gray-100'
                  }`}
                >
                  {estadoOption}
                </button>
              ))}
            </div>
          </div>
        )}


</div>
     
    );
  };
  
  export default KanbanCard;
