import React, { useState } from "react";
import { ChevronDownIcon, CheckCircleIcon, UserIcon, LogoutIcon, XIcon } from '@heroicons/react/solid';
import {useForm} from 'react-hook-form';
import {useEffect } from 'react';
import { useTasks } from "../../context/tasksContext";
import { useAuth } from "../../context/authContext";
import {useGroups} from "../../context/groupContext";
import Swal from "sweetalert2";
import BotonDesplegable from "../../components/botonDesplegable";
import debounce from 'lodash/debounce';
import { getUsersRequest } from "../../api/auth";


export const DashboardPage = () => {
   const {register, handleSubmit, formState: {errors}, setError} = useForm();
   const [isModalOpen, setModalOpen] = useState(false);
   const [isModal2Open, setModal2Open] = useState(false);
   const [isMenuOpen, setMenuOpen] = useState(false);

   const [selectedOption, setSelectedOption] = useState("");

   const toggleModal = () => setModalOpen(!isModalOpen);
   const toggleModal2 = () => setModal2Open(!isModal2Open);
   const toggleMenu = () => setMenuOpen(!isMenuOpen);
   const { tasks, getTasks, createTask } = useTasks();
   const { user, users, setUsers, getUsers, loading } = useAuth();
   const [integrants, setIntegrants] = useState([]);

   const { groups, getGroups, createGroup, getIntegrantsGroups, integrantsGroup } = useGroups();


   const [taskError, setTaskError] = useState(null); 
   const [taskSuccess, setTaskSuccess] = useState(false); 

   const [groupError, setGroupError] = useState(null); 
   const [groupSuccess, setGroupSuccess] = useState(false); 

   const [selectedGroup, setSelectedGroup] = useState("");

/*   const administrador = user?.isAdmin || false; */


   const handleOptionSelect = (opcion) =>{
    setSelectedOption(opcion);
    if (opcion === 'Añadir Tarea'){
      setModalOpen(true);
    } else if (opcion === 'Añadir Grupo'){
      setModal2Open(true);
    }
   }
 
   useEffect(() => {
    getUsers();
  }, []);

  useEffect(() => {
    getTasks();
  }, []);

  useEffect(() => {
    getGroups();
  }, []);
  

  const onSubmit = async (values, event) => {
    const formName = event.target.name; 

    try {

      values.integrants = integrants;

      if(formName === 'taskForm') {
        await createTask(values);
        setTaskSuccess(true);
        setTaskError(null);
        console.log("Tarea Creada")
      } else if (formName === 'groupForm'){
        await createGroup(values);
        setGroupSuccess(true);
        setGroupError(null);
        console.log("Grupo Creado")
      }
    } catch (error) {
      console.error("Error al crear:", error);
      setTaskError("Hubo un problema al crear.");
    }
  };

  useEffect(() => {
    if (taskError) {
      Swal.fire({
        title: "¡Error!",
        text: taskError,
        icon: "error",
        confirmButtonText: "OK",
      });
    }
  }, [taskError]);

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

  useEffect(() => {
    if (groupError) {
      Swal.fire({
        title: "¡Error!",
        text: groupError,
        icon: "error",
        confirmButtonText: "OK",
      });
    }
  }, [groupError]);

  useEffect(() => {
    if (groupSuccess) {
      Swal.fire({
        title: "¡Grupo creada!",
        text: "Tu grupo ha sido creado correctamente.",
        icon: "success",
        confirmButtonText: "OK",
      });
      setGroupSuccess(false);
    }
  }, [groupSuccess]);

  const handleChange = async (event) =>{
    const username = event.target.value.trim();
    if(!username){
      setUsers([]);
      return;
    }

		try {
      const data = await getUsersRequest(username);

      setUsers(data);
    } catch (error){
      console.error(error);
      setUsers([]);
    }
  }; 
  const debouncedHandleChange = debounce(handleChange, 300); 

  const handleAddIntegrants = (e) => {
    e.preventDefault();

    const newIntegrant = document.getElementById("integrants").value;
    if(newIntegrant) {
      setIntegrants((prev) => [...prev, newIntegrant]);
      document.getElementById("integrants").value = "";
    }
}
      const handleRemoveIntegrant = (index) => {
              
        setIntegrants(integrants.filter((_, i) => i !== index));
      }




useEffect(() => {
  if (selectedGroup) {
    getIntegrantsGroups(selectedGroup);
  }
}, [selectedGroup]); 

useEffect(() => {

}, [JSON.stringify(integrantsGroup)]);

const handleGroupChange = (e) => {
  const groupId = e.target.value;
  setSelectedGroup(groupId);
};
      
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
     <h1 className="text-3xl">Bienvenido</h1>

     <div className="flex w-full grow shrink-0 basis-0 items-start gap-4 bg-default-background px-6 py-6">
{user?.isAdmin || user?.isSuper ? (
  <>
     <div className="max-w-100 p-6 bg-white border border-gray-200 rounded-lg shadow-sm dark:bg-gray-800 dark:border-gray-700">
         <a href="/users-collaborators">
            <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">Colaboradores</h5>
         </a>
         <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">Visualiza y añade colaboradores</p>
            <a href="/users-collaborators" className="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white 
            bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 
            dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
             Ver colaboradores
        <svg className="rtl:rotate-180 w-3.5 h-3.5 ms-2" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 10">
            <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M1 5h12m0 0L9 1m4 4L9 9"/>
        </svg>
    </a>
</div>

     <div className="max-w-100 p-6 bg-white border border-gray-200 rounded-lg shadow-sm dark:bg-gray-800 dark:border-gray-700">
         <a href="/groups">
            <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">Grupos</h5>
         </a>
         <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">Visualiza y añade grupos de trabajo</p>
            <a href="/groups" className="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white 
            bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 
            dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
             Ver Grupos
        <svg className="rtl:rotate-180 w-3.5 h-3.5 ms-2" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 10">
            <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M1 5h12m0 0L9 1m4 4L9 9"/>
        </svg>
    </a>
</div> 
</>
) : null}

     <div className="max-w-100 p-6 bg-white border border-gray-200 rounded-lg shadow-sm dark:bg-gray-800 dark:border-gray-700">
         <a href="/tasks">
            <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">Mis Tareas</h5>
         </a>
         <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">Administra las tareas que tienes asignadas</p>
            <a href="/tasks" className="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white 
            bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 
            dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
             Ir a mis Tareas
        <svg className="rtl:rotate-180 w-3.5 h-3.5 ms-2" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 10">
            <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M1 5h12m0 0L9 1m4 4L9 9"/>
        </svg>
    </a>
</div>

</div>
   </div>

   {user?.isAdmin || user?.isSuper ? ( 
  <BotonDesplegable onOptionSelect={handleOptionSelect} />
) : null}

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
      {...register("Userassigned")}
    >
      <option value="">Seleccione un integrante</option>
      {integrantsGroup.map((name, index) => (
        <option key={index} value={name}>
          {name}
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


{isModal2Open && (
     <div className="fixed inset-0 bg-opacity-50 flex items-center justify-center z-50">
       <div className="bg-white p-6 rounded-lg shadow-lg w-1/3">
         <h3 className="text-xl font-bold mb-4">Añadir grupo nuevo</h3>

         <form name="groupForm" onSubmit={handleSubmit(onSubmit)}>

         <input type='text' {...register("namegroup", { required: "El nombre es requerido" })} 
          className='w-full bg-zinc-100 text-gray-900 px-4 py-2 rounded-md my-2'
          placeholder='Nombre del grupo'
          />

        <textarea type='textarea' {...register("description", { required: "Este campo no puede estar vacio" })} 
            className='w-full bg-zinc-100 px-4 py-2 rounded-md my-2'
            placeholder='Descripción'
            />

          <div className="flex items-center space-x-2">
          <input type='text' list='users' id="integrants" 
          {...register("integrants", { validate: value => value.length > 0 || integrants.length > 0 || "Este campo es requerido" })} 
          className='w-full bg-zinc-100 text-gray-900 px-4 py-2 rounded-md my-2'
          placeholder='Integrantes'
          onChange={debouncedHandleChange} 
          />
          <datalist id="users">
          {users && Array.isArray(users) && users.length > 0 ? (
              users.map((user) => (
                <option value={user.username} key={user.id || user.username}>
                  {user.username}
                </option>
              ))
            ) : (
              <option>No users found</option>
            )}
                  </datalist>
                  <button type="button" className="px-4 py-2 bg-blue-500 text-white rounded-md" onClick={handleAddIntegrants}>+</button>
                  </div>
                  <div>
                  <ul>
                    {integrants.map((integrant, index) => 
                      <li key={index}>
              {integrant} <button type="button" onClick={() => handleRemoveIntegrant(index)}>Eliminar</button>
            </li>
                  )}
                </ul>
              </div>
              <div className="flex justify-end space-x-2">
                <button
                  onClick={toggleModal2}
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
);
}


export default DashboardPage;