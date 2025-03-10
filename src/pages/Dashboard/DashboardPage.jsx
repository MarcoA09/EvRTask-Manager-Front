import React, { useState } from "react";
import {useForm} from 'react-hook-form';
import {useEffect } from 'react';
import { useTasks } from "../../context/tasksContext";
import { useAuth } from "../../context/authContext";
import {useGroups} from "../../context/groupContext";
import Swal from "sweetalert2";
import BotonDesplegable from "../../components/botonDesplegable";
import debounce from 'lodash/debounce';
import { getUsersRequest } from "../../api/auth";
import { NavBar } from "../../components/NavBar";

export const DashboardPage = () => {
   const {register, handleSubmit, formState: {errors}, setError} = useForm();
   const [isModalOpen, setModalOpen] = useState(false);
   const [isModal2Open, setModal2Open] = useState(false);
   const [selectedOption, setSelectedOption] = useState("");
   const toggleModal = () => setModalOpen(!isModalOpen);
   const toggleModal2 = () => setModal2Open(!isModal2Open);
   const { tasks, getTasks, createTask } = useTasks();
   const { user, users, setUsers, getUsers, loading } = useAuth();
   const [integrants, setIntegrants] = useState([]);
   const { groups, getGroups, createGroup, getIntegrantsGroups, integrantsGroup } = useGroups();
   const [taskError, setTaskError] = useState(null); 
   const [taskSuccess, setTaskSuccess] = useState(false); 
   const [groupError, setGroupError] = useState(null); 
   const [groupSuccess, setGroupSuccess] = useState(false); 
   const [selectedGroup, setSelectedGroup] = useState("");
   const [isAdminUser, setIsAdminUser] = useState(false);

   useEffect(() => {
    const userRol = localStorage.getItem("userRol");
    const isUserAdmin = user?.isAdmin || 
                       user?.isSuper || 
                       userRol === "Administrador" || 
                       userRol === "SuperAdmin";
    
    setIsAdminUser(isUserAdmin);

  }, [user]);

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

<NavBar/>

   <div className="flex-1 p-8">
     <h1 className="text-3xl">Bienvenido</h1>

     <div className="flex w-full grow shrink-0 basis-0 items-start gap-4 bg-default-background px-6 py-6">
{isAdminUser  || user?.isSuper ? (
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

            <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">Tareas</h5>
            </a>
            {isAdminUser  || user?.isSuper ? (
         <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">Visualiza y administra las tareas</p>
          ) :  <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">Administra las tareas que tienes asignadas</p> }
         
            <a href="/tasks" className="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white 
            bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 
            dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
             Ver Tareas
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

 </div>
);
}


export default DashboardPage;
