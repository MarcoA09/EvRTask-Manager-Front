import React, { useState } from "react";
import { ChevronDownIcon, CheckCircleIcon, UserIcon, LogoutIcon, XIcon } from '@heroicons/react/solid';
import { useParams } from "react-router-dom";
import KanbanColumn from "../../components/KanbanColumn";
import KanbanCard from "../../components/KanbanCard"; 
import { useTasks } from "../../context/tasksContext";
import {useEffect } from 'react';
import { NavBar } from "../../components/NavBar";

export const GroupsTasks = () => {
  const [isMenuOpen, setMenuOpen] = useState(false);
  const toggleMenu = () => setMenuOpen(!isMenuOpen);
	const { idGroup } = useParams();


	const { tasksgroups, getTasks, createTask, getTasksGroups } = useTasks();
  useEffect(() => {
    if (idGroup) {
      getTasksGroups(idGroup);
    }
  }, [idGroup]);

	
  return (

<div className="flex h-screen bg-white text-indigo-950 font-bold">

<NavBar/>


<div className="flex-1 p-8">
  <h1 className="text-3xl">Mis Tareas de Grupo</h1>

  <div className="flex w-full grow shrink-0 basis-0 items-start gap-4 bg-default-background px-6 py-6">

  <div className="flex h-full w-full flex-col items-start bg-default-background">

<div className="flex w-full grow shrink-0 basis-0 items-start gap-4 bg-default-background px-6 py-6">

  <KanbanColumn title="En progreso">
{tasksgroups.filter(task => task.estado === "En progreso").map(task => (
    <KanbanCard
    key={task._id}
    task={task}>
    </KanbanCard>
    ))}
  </KanbanColumn>
  <KanbanColumn title="Finalizadas">
{tasksgroups.filter(task => task.estado === "Finalizada").map(task => (
    <KanbanCard
    key={task._id}
    task={task}>
    </KanbanCard>
))}
  </KanbanColumn>
  <KanbanColumn title="En pausa">
{tasksgroups.filter(task => task.estado === "En pausa").map(task => (
    <KanbanCard
    key={task._id}
    task={task}>
    </KanbanCard>
))}    
  </KanbanColumn>
<KanbanColumn title="En revisión">
{tasksgroups.filter(task => task.estado === "En revisión").map(task => (
    <KanbanCard
    key={task._id}
    task={task}>
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


