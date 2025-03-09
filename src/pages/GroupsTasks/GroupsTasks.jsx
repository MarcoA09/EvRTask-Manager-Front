import React, { useState } from "react";
import { ChevronDownIcon, CheckCircleIcon, UserIcon, LogoutIcon, XIcon } from '@heroicons/react/solid';
import { useParams } from "react-router-dom";
import KanbanColumn from "../../components/KanbanColumn";
import KanbanCard from "../../components/KanbanCard"; 
import { useTasks } from "../../context/tasksContext";
import {useEffect } from 'react';

export const GroupsTasks = () => {
  const [isMenuOpen, setMenuOpen] = useState(false);
  const toggleMenu = () => setMenuOpen(!isMenuOpen);
	const { idGroup } = useParams();

  useEffect(() => {
  
    if (idGroup) {
      getTasksGroups(idGroup);
    } else {
     
    }
  }, [idGroup]);

	const { tasksgroups, getTasks, createTask, getTasksGroups } = useTasks();
	  useEffect(() => {
		getTasksGroups();
	  }, []);

	
  return (



<div className="flex h-screen bg-white text-indigo-950 font-bold">
<div className="w-64 bg-gradient-to-b from-[#640d59] to-[#001e41] text-white">
  <div className="p-5">
  <h2 className="text-xl font-bold">Dashboard</h2>
  </div> 
  <nav>
  <ul>
  <li className="p-4 hover">
       <button onClick={toggleMenu} className="w-full text-left flex items-center justify-between">
       <span>Menú</span>
       <ChevronDownIcon
         className={`h-5 w-5 text-white transition-transform ${isMenuOpen ? 'rotate-180' : ''}`}
       />
       </button>
       {isMenuOpen && (
       <ul className="pl-4 mt-2">
         <li className="p-2 hover:bg-gray-600 flex items-center text-white">
         <CheckCircleIcon className="h-5 w-5 mr-2 text-white" />
         Tareas finalizadas
         </li>
         <li className="p-2 hover:bg-gray-600 flex items-center text-white">
         <UserIcon  className="h-5 w-5 mr-2 text-white" />
        Perfil
         </li>
         <li className="p-2 hover:bg-gray-600 flex items-center text-white">
         <LogoutIcon  className="h-5 w-5 mr-2 text-white" />
         Cerrar sesión
         </li>
  </ul>
    )}
   </li>
     </ul>
   </nav>
   </div>

<div className="flex-1 p-8">
  <h1 className="text-3xl">Mis Tareas de Grupo</h1>

  <div className="flex w-full grow shrink-0 basis-0 items-start gap-4 bg-default-background px-6 py-6">



  <div className="flex h-full w-full flex-col items-start bg-default-background">

		
<div className="flex w-full grow shrink-0 basis-0 items-start gap-4 bg-default-background px-6 py-6">

  <KanbanColumn title="En progreso">
{tasksgroups.filter(task => task.estado === "En progreso").map(task => (
    <KanbanCard
key={task._id}
nametask={task.nametask}
description={task.description}>
    </KanbanCard>
    ))}
  </KanbanColumn>
  <KanbanColumn title="Finalizadas">
{tasksgroups.filter(task => task.estado === "Finalizada").map(task => (
    <KanbanCard
key={task._id}
nametask={task.nametask}
description={task.description}>
    </KanbanCard>
))}
  </KanbanColumn>
  <KanbanColumn title="En pausa">
{tasksgroups.filter(task => task.estado === "En pausa").map(task => (
    <KanbanCard
key={task._id}
nametask={task.nametask}
description={task.description}>
    </KanbanCard>
))}    
  </KanbanColumn>
<KanbanColumn title="En revisión">
{tasksgroups.filter(task => task.estado === "En revisión").map(task => (
    <KanbanCard
key={task._id}
nametask={task.nametask}
description={task.description}>
    </KanbanCard>
))}
  </KanbanColumn>

</div>

</div>



</div>
</div>


</div>







);
}


