import React, { useState } from "react";
import { ChevronDownIcon, CheckCircleIcon, UserIcon, LogoutIcon, XIcon } from '@heroicons/react/solid';
import {useForm} from 'react-hook-form';
import {useEffect } from 'react';
import { useAuth } from "../../context/authContext";
import {useGroups} from "../../context/groupContext";
import { useTasks } from "../../context/tasksContext";
import Swal from "sweetalert2";
import debounce from 'lodash/debounce';
import { getUsersRequest } from "../../api/auth";
import { useNavigate } from 'react-router-dom';
import BotonAdd from "../../components/BotonAdd";


export const GroupsPage = () => {
    const {register, handleSubmit, formState: {errors}, setError} = useForm();
    const [isModal2Open, setModal2Open] = useState(false);
    const [isMenuOpen, setMenuOpen] = useState(false);
 
    const [selectedOption, setSelectedOption] = useState("");

    const [isModalOpen, setModalOpen] = useState(false);
    const toggleMenu = () => setMenuOpen(!isMenuOpen);
    const { users, setUsers, getUsers, loading } = useAuth();
    const [integrants, setIntegrants] = useState([]);
    const {groups, getGroups, createGroup} = useGroups();
    const { tasks, getTasks, createTask, getTasksGroups } = useTasks();
    const [groupError, setGroupError] = useState(null); 
    const [groupSuccess, setGroupSuccess] = useState(false); 
    const navigate = useNavigate();
 
   useEffect(() => {
     getGroups();
   }, []);
   
   const handleViewGroup = async (idGroup) => {
    await getTasksGroups(idGroup);
    navigate(`/groups/tasks/${idGroup}`);

   };

   const onSubmit = async (values, event) => {
     const formName = event.target.name; 
 
     try {
 
       values.integrants = integrants;
 
       if(formName === 'groupForm') {
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

     const inputValue = document.getElementById("integrants").value;
     if(!inputValue) return;

     const selectedUser = users.find(user => user.username === inputValue);

     if(selectedUser) {
       setIntegrants((prev) => [...prev, selectedUser]);
       document.getElementById("integrants").value = "";
     }
 }
       const handleRemoveIntegrant = (index) => {
               
         setIntegrants(integrants.filter((_, i) => i !== index));
       }
 
       useEffect(() => {
         console.log(integrants);
       }, [integrants]);
       
   return (
    <div className="flex h-screen bg-white text-indigo-950 font-bold">

      <BotonAdd onOpenModal={()=>setModalOpen(true)}/>

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
 
      <>
       {groups.length === 0 && (
         <div className="flex justify-center items-center p-10">
           <div>
             <XIcon className="h-20 text-6xl text-gray-400 m-auto my-2" />
             <h1 className="font-bold text-xl">
               Aún no hay ningun grupo creado. De clic en el icono de "+" en la parte inferior derecha para añadir.
             </h1>
           </div>
         </div>
       )}
 
 <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-2">
   {groups.map((group) => (
    
    <div className="max-w-sm p-6 bg-white border border-gray-200 rounded-lg shadow-sm dark:bg-gray-800 dark:border-gray-700">
    <a href="#">
       <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">{group.namegroup}</h5>
    </a>
    <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">{group.description}</p>
       <button onClick={() => handleViewGroup(group._id)} className="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white 
       bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 
       dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
        Ver
   <svg className="rtl:rotate-180 w-3.5 h-3.5 ms-2" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 10">
       <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M1 5h12m0 0L9 1m4 4L9 9"/>
   </svg>
</button>
</div>
   ))}
 </div>

     </>
    </div>
 
 
{isModalOpen && (
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
<input type='text' list='users' id="integrants" {...register("integrants", { validate: value => value.length > 0 || integrants.length > 0 || "Este campo es requerido" })} 
          className='w-full bg-zinc-100 text-gray-900 px-4 py-2 rounded-md my-2'
          placeholder='Integrantes'
          onChange={debouncedHandleChange} 
          />
          
          <datalist id="users">
          {users && Array.isArray(users) && users.length > 0 ? (
              users.map((user) => (
                <option value={user.username} key={user._id || user.username}>
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
                      <li key={integrant._id || index} className="flex items-center space-x-2">
                        <span>{integrant.username}</span>
                        <button type="button" onClick={() => handleRemoveIntegrant(index)}
                        className="px-2 py-1 bg-red-500 text-white rounded-full mb-3">
                          x</button>
            </li>
                  )}
                </ul>
</div>
       


              <div className="flex justify-end space-x-2">
                <button
                  onClick={() => setModalOpen(false)}
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
export default GroupsPage;