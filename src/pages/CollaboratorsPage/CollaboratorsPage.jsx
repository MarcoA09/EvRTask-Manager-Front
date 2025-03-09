import React, { useEffect, useState } from "react";
import { ChevronDownIcon, CheckCircleIcon, UserIcon, LogoutIcon, XIcon } from '@heroicons/react/solid';
import BotonAdd from "../../components/BotonAdd";
import {useForm} from 'react-hook-form';
import { useColabs } from "../../context/colabContext";


export const CollaboratorsPage = () => {
     const {register, handleSubmit, watch, formState: {errors}, setError} = useForm();
     const [isMenuOpen, setMenuOpen] = useState(false);
     const toggleMenu = () => setMenuOpen(!isMenuOpen);
     const [isModalOpen, setModalOpen] = useState(false);
     const [codigo, setCodigo] = useState("");
     const { colaboradores, getColabs, createColab } = useColabs(); 

     const statusSelect = watch("tipo"); 

     const generarCodigo = () => {
      return Math.random().toString(10).substring(2,10).toUpperCase(); 
     };

     useEffect(() => {
      if (statusSelect === "Administrador"){
        setCodigo(generarCodigo());
      } else {
        setCodigo("");
      }
      }, [statusSelect]);

      const onSubmit = async (values, event) => {
            await createColab(values);
            setColabSuccess(true);
            setColabError(null);
            console.log("Colaborador creado")
      }

        useEffect(() => {
          getColabs();
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
      <h1 className="text-3xl">Colaboradores</h1>
 
      <div className="flex w-full grow shrink-0 basis-0 items-start gap-4 bg-default-background px-6 py-6">
 
 

<div class="relative overflow-x-auto">
    <table class="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
        <thead class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
                <th scope="col" class="px-6 py-3">
                    Nombre
                </th>
                <th scope="col" class="px-6 py-3">
                    Email
                </th>
                <th scope="col" class="px-6 py-3">
                    Tipo
                </th>
                <th scope="col" class="px-6 py-3">
                    Codigo
                </th>
            </tr>
        </thead>
        <tbody>
          {colaboradores && colaboradores.length > 0 ? (
            colaboradores.map((colaborador) => (
            <tr key={colaborador.id} class="bg-white border-b dark:bg-gray-800 dark:border-gray-700 border-gray-200">
                <th scope="row" class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                {colaborador.name}
                </th>
                <td class="px-6 py-4">
                {colaborador.email}
                </td>
                <td class="px-6 py-4">
                {colaborador.rol}
                </td>
                <td class="px-6 py-4">
                {colaborador.codigo}
                </td>
            </tr>
            ))
          ) : (
            <tr>
            <td class="px-6 py-4">
           No hay colaboradores registrados
            </td>
            </tr>
          )}
          
        </tbody>
    </table>
</div>



 </div>
    </div>
 
   <BotonAdd onOpenModal={()=>setModalOpen(true)}/>
 
    {isModalOpen && (
      <div className="fixed inset-0 bg-opacity-50 flex items-center justify-center z-50">
        <div className="bg-white p-6 rounded-lg shadow-lg w-1/3">
          <h3 className="text-xl font-bold mb-4">Añadir colaborador nuevo</h3>
 
          <form name="colabsForm" onSubmit={handleSubmit(onSubmit)}>
 
          <input type='text' {...register("name", { required: "El nombre es requerido" })} 
           className='w-full bg-zinc-100 text-gray-900 px-4 py-2 rounded-md my-2'
           placeholder='Nombre'
           />

          <input type='email' {...register("email", { required: "El email es requerido" })} 
              className='w-full bg-zinc-100 text-gray-900 px-4 py-2 rounded-md my-2'
              placeholder='Email'/>
              {errors.email && <p className='text-red-500'>{errors.email.message}</p>}
 
        
             <select
                 className="w-full bg-zinc-100 px-4 py-2 rounded-md my-2 text-gray-900" {...register("rol", { required: "Seleccione un estado" })} 
               >
                 <option value="">Tipo de usuario</option>
                 <option value="Administrador">Administrador</option>
                 <option value="Colaborador">Colaborador</option>
               </select>
 
              {statusSelect === "Administrador" && (
                 <input type='text'
                 className='w-full bg-zinc-100 text-gray-900 px-4 py-2 rounded-md my-2'
                 {...register("codigo", { required: "Seleccione un estado" })} 
                 value={codigo} readOnly/>
              )}

 
 
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
  )
}
