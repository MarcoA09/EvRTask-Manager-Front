import React, { useEffect, useState } from "react";
import { TrashIcon } from "@heroicons/react/solid";

import BotonAdd from "../../components/BotonAdd";
import {useForm} from 'react-hook-form';
import { useColabs } from "../../context/colabContext";
import Swal from "sweetalert2";
import { NavBar } from "../../components/NavBar";


export const CollaboratorsPage = () => {
     const {register, handleSubmit, watch, formState: {errors}, setError, reset} = useForm();
     const [isMenuOpen, setMenuOpen] = useState(false);
     const toggleMenu = () => setMenuOpen(!isMenuOpen);
     const [isModalOpen, setModalOpen] = useState(false);
     const [codigo, setCodigo] = useState("");
     const { colaboradores, colabUsuarios, getColabs, createColab, deteteColaborator } = useColabs(); 
        const [colabError, setColabError] = useState(null); 
        const [colabSuccess, setColabSuccess] = useState(false); 
        const [formData, setFormData] = useState({
          name: "",
              email: "",
              rol: "",
              codigo: "",
        });

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
            setModalOpen(false);
      }

       useEffect(() => {
          if (colabError) {
            Swal.fire({
              title: "¡Error!",
              text: colabError,
              icon: "error",
              confirmButtonText: "OK",
            });
          }
        }, [colabError]);
      
        useEffect(() => {
          if (colabSuccess) {
            Swal.fire({
              title: "¡Colaborador creado!",
              text: "El colaborador se creó correctamente.",
              icon: "success",
              confirmButtonText: "OK",
            });
            setColabSuccess(false);
          }
        }, [colabSuccess]);

        useEffect(() => {
          if(isModalOpen) {
            reset()
            };
        }, [isModalOpen, reset])
           

        useEffect(() => {
          getColabs();
        }, []);
        
  
   return (
    <div className="flex h-screen bg-white text-indigo-950 font-bold">
  
  <NavBar/>
 
    <div className="flex-1 p-8">
      <h1 className="text-3xl">Colaboradores</h1>
 <p>Agrega colaboradores para que puedan registrarse como usuarios del portal. Puedes eliminar solo a usuarios que no se han registrado.</p>
      <div className="flex w-full grow shrink-0 basis-0 items-start gap-4 bg-default-background px-6 py-6">
 
 

<div className="relative overflow-x-auto">
    <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
        <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
                <th scope="col" className="px-6 py-3">
                    Nombre
                </th>
                <th scope="col" className="px-6 py-3">
                    Email
                </th>
                <th scope="col" className="px-6 py-3">
                    Tipo
                </th>
                <th scope="col" className="px-6 py-3">
                    Acción
                </th>
            </tr>
        </thead>
        <tbody>
        {Array.isArray(colaboradores) && colaboradores.length > 0 ? (
  colaboradores.map((colaborador) => (
    <tr key={colaborador._id} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 border-gray-200">
      <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
        {colaborador.name}
      </th>
      <td className="px-6 py-4">
        {colaborador.email}
      </td>
      <td className="px-6 py-4">
        {colaborador.rol}
      </td>
      <td className="px-6 py-4">
      {Array.isArray(colabUsuarios) && !colabUsuarios.includes(colaborador._id) && (

          <button
            onClick={() => deteteColaborator(colaborador._id)}
            className="flex items-center gap-2 px-4 py-2 text-white bg-red-600 rounded-lg hover:bg-red-700"
          >
            <TrashIcon className="w-5 h-5" />
            Delete
          </button>
        )}
      </td>
    </tr>
  ))

          ) : (
            <tr>
            <td className="px-6 py-4">
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
          {errors.name && <p className='text-red-500'>{errors.name.message}</p>}
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
               {errors.rol && <p className='text-red-500'>{errors.rol.message}</p>}
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
