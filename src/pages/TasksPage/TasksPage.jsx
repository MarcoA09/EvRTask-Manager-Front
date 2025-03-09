
import { ChevronDownIcon, CheckCircleIcon, UserIcon, LogoutIcon, XIcon } from '@heroicons/react/solid';
import KanbanColumn from "../../components/KanbanColumn";
import KanbanCard from "../../components/KanbanCard"; 
import React, { useState } from "react";
import { useTasks } from "../../context/tasksContext";
import { useAuth } from "../../context/authContext";
import {useGroups} from "../../context/groupContext";
import {useEffect } from 'react';
import BotonAdd from "../../components/BotonAdd";
import {useForm} from 'react-hook-form';
import Swal from "sweetalert2";

export const TasksPage = () => {
	const [isMenuOpen, setMenuOpen] = useState(false);
    const [isModalOpen, setModalOpen] = useState(false);
	const toggleMenu = () => setMenuOpen(!isMenuOpen);
	const { tasks, getTasks, createTask } = useTasks();
	const {register, handleSubmit, formState: {errors}, setError} = useForm();
	const [selectedGroup, setSelectedGroup] = useState("");
	const toggleModal = () => setModalOpen(!isModalOpen);
	const { groups, getGroups, createGroup, getIntegrantsGroups, integrantsGroup } = useGroups();
	const [integrants, setIntegrants] = useState([]);
	const { user, users, setUsers, getUsers, loading } = useAuth();

	   
		  const [taskError, setTaskError] = useState(null); 
		  const [taskSuccess, setTaskSuccess] = useState(false); 


	const onSubmit = async (values, event) => {
		const formName = event.target.name; 
	
		try {
	
		  values.integrants = integrants;
		  if(formName === 'taskForm') {
			await createTask(values);
			setTaskSuccess(true);
			setTaskError(null);
			console.log("Tarea Creada")
		  }
		} catch (error) {
		  console.error("Error al crear:", error);
		  setTaskError("Hubo un problema al crear.");
		}
	  };

	  const handleGroupChange = (e) => {
		const groupId = e.target.value;
		setSelectedGroup(groupId);
	  };

	  useEffect(() => {
		  if (taskSuccess) {
			Swal.fire({
			  title: "¡Tarea creada!",
			  text: "Tu tarea ha sido guardada correctamente.",
			  icon: "success",
			  confirmButtonText: "OK",
			});
			setTaskSuccess(false);
		  }
		}, [taskSuccess]);
	  

/* 	   useEffect(() => {
		getUsers();
	  }, []);
 */
	  useEffect(() => {
		getTasks();
		
	  }, []);

	    useEffect(() => {
		  getGroups();
		}, []);
	
		useEffect(() => {
		  if (selectedGroup) {
			getIntegrantsGroups(selectedGroup);
		  }
		}, [selectedGroup]); 
		useEffect(() => {
		}, [JSON.stringify(integrantsGroup)]);
	
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


   {user?.isAdmin || user?.isSuper ? ( 
  <BotonAdd onOpenModal={()=>setModalOpen(true)}/>
) : null}
		

	  <h1 className="text-3xl">Mis Tareas</h1>
	  <div className="flex w-full grow shrink-0 basis-0 items-start gap-4 bg-default-background px-6 py-6">
      <div className="flex h-full w-full flex-col items-start bg-default-background">
        <div className="flex w-full grow shrink-0 basis-0 items-start gap-4 bg-default-background px-6 py-6">
          <KanbanColumn title="En progreso">
		  {tasks.filter(task => task.estado === "En progreso").map(task => (
            <KanbanCard
			key={task._id}
			task={task}>
            </KanbanCard>
            ))}
          </KanbanColumn>
          <KanbanColumn title="Finalizadas">
		  {tasks.filter(task => task.estado === "Finalizada").map(task => (
            <KanbanCard
			key={task._id}
			task={task}>
            </KanbanCard>
			 ))}
          </KanbanColumn>
          <KanbanColumn title="En pausa">
		  {tasks.filter(task => task.estado === "En pausa").map(task => (
            <KanbanCard
			key={task._id}
			task={task}>
            </KanbanCard>
			 ))}    
          </KanbanColumn>
		  <KanbanColumn title="En revisión">
		  {tasks.filter(task => task.estado === "En revisión").map(task => (
            <KanbanCard
		key={task._id}
			task={task}>
            </KanbanCard>
		))}
          </KanbanColumn>
        </div>
      </div>

	  {isModalOpen && (
   <div className="fixed inset-0 bg-opacity-50 flex items-center justify-center z-50">
   <div className="bg-white p-6 rounded-lg shadow-lg w-1/3">
	 <h3 className="text-xl font-bold mb-4">Añadir tarea nueva</h3>

	 <form name="taskForm" onSubmit={handleSubmit(onSubmit)}>

	 <input type='text' {...register("nametask", { required: "El nombre es requerido" })} 
	  className='w-full bg-zinc-100 text-gray-900 px-4 py-2 rounded-md my-2'
	  placeholder='Nombre'
	  />

	<textarea type='textarea' {...register("description", { required: "Este campo no puede estar vacio" })} 
		className='w-full bg-zinc-100 px-4 py-2 rounded-md my-2'
		placeholder='Descripción'
		/>

		<div className="flex flex-col">
		  <label htmlFor="fecha" className="text-gray-700">Fecha de finalización</label>
		  <input 
			type="date" 
			id="fecha"
			{...register("fecha", { required: "Este campo no puede estar vacio" })}
			className="w-full bg-zinc-100 px-4 py-2 rounded-md my-2 text-gray-900"
		  />
		</div>


		<label className="flex items-center space-x-2 mt-2">
			<input type="checkbox"  {...register("recordar")} className="w-4 h-4 text-blue-600 rounded focus:ring focus:ring-blue-300" />
			<span className="text-gray-700">Recordar fecha</span>
		  </label>

		<select
			className="w-full bg-zinc-100 px-4 py-2 rounded-md my-2 text-gray-900" {...register("estado", { required: "Seleccione un estado" })} 
		  >
			<option value="">Estado</option>
			<option value="En progreso">En progreso</option>
			<option value="Finalizada">Finalizada</option>
			<option value="En pausa">En pausa</option>
			<option value="En revisión">En revisión</option>
		  </select>


		<input type='text' {...register("category", { required: "La categoria es requerida" })} 
			className='w-full bg-zinc-100 px-4 py-2 rounded-md my-2'
			placeholder='Categoria'
			/>

{/*                 <select
			className="w-full bg-zinc-100 px-4 py-2 rounded-md my-2 text-gray-900" {...register("group", { required: "Seleccione un estado" })} 
		  >
			<option value="">Asigne la tarea a un grupo</option>
			{groups.map((elemento)=> (
			  <option key={elemento._id} value={elemento._id}>{elemento.namegroup}</option>
			))}
			
		  </select> */}

<select
className="w-full bg-zinc-100 px-4 py-2 rounded-md my-2 text-gray-900"
{...register("group", { required: "Seleccione un estado" })}
onChange={(e) => {

handleGroupChange(e);
register("group").onChange(e); 
}}
>
<option value="">Asigne la tarea a un grupo</option>
{groups.map((elemento) => (
<option key={elemento._id} value={elemento._id}>{elemento.namegroup}</option>
))}
</select>

{selectedGroup && (
<div className="mt-4">
<label className="block text-sm font-medium text-gray-700">
  Integrante asignado
</label>
<select
  className="w-full bg-zinc-100 px-4 py-2 rounded-md my-2 text-gray-900"
  {...register("user_assigned")}
>
  <option value="">Seleccione un integrante</option>
  {integrantsGroup.map((user) => (
	<option key={user._id} value={user._id}>
	  {user.username || `Usuario: ${user._id}`}
	</option>
  ))}
</select>
</div>
)}

		  <div className="flex justify-end space-x-2">
			<button
			  onClick={toggleModal}
			  className="px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-600"
			>
		 Cerrar
	   </button>
	  <button
	type="submit"
	className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
  >
	Guardar
  </button>


	 </div>
	 </form>
   </div>
 </div>
   )}



 </div>
	</div>
 

  </div>


);
}




export default TasksPage;














