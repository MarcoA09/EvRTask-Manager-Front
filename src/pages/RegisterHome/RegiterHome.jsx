import { useEffect, useState } from "react";
import { useAuth } from "../../context/authContext";
import {useForm} from 'react-hook-form';
import {useNavigate} from 'react-router-dom';
import Swal from "sweetalert2";

export const RegisterHome = () => {
        const {register, handleSubmit, formState: {errors}, setError} = useForm();
        const { signuphome, user, registerMessage, logout, errors: registerErrors, isAuthenticated } = useAuth();
        const navigate = useNavigate();

        const onSubmit = async (values) => {
          await signuphome(values);
        };

        useEffect(() => {
          if (registerErrors.length > 0) {
            Swal.fire({
              title: "¡Ups! Hay un problema",
              text: registerErrors[0],
              icon: "error",
              confirmButtonText: "OK",
            });
          }
        }, [registerErrors]); 

        useEffect(() => {
          if (isAuthenticated) {
            Swal.fire({
              title: "¡Registro Exitoso!",
              text: registerMessage || "El usuario fue creado exitosamente",
              icon: "success",
              confirmButtonText: "OK",
            }).then((result) => {
              if (result.isConfirmed) {
                navigate('/dashboard');
              }
            });
          }
        }, [isAuthenticated, registerMessage, navigate]);

  return (
    <div className='w-screen h-screen flex items-center justify-center'>
    <div className='backdrop-blur-sm bg-black/30 max-w-md w-full p-10 rounded-md '>
    
    <div className='flex flex-col items-center'>

<h1 className='text-xl font-bold text-center my-5'>Registro</h1>
</div>
    
    
<form onSubmit={handleSubmit(onSubmit)}> 

  
      <input type="text" {...register("username", { required: "El nombre es requerido" })} 
      className="w-full bg-zinc-700 text-white px-4 py-2 rounded-md my-2 " placeholder="Nombre Completo" />
  
    {errors.username && <p className='text-red-500 text-[11px]'>{errors.username.message}</p>}
    
   
      <input type="text" {...register("email", { required: "El email es requerido" })} 
      className="w-full bg-zinc-700 text-white px-4 py-2 rounded-md my-2 " placeholder="Email" />
      
    
    {errors.email && <p className='text-red-500 text-[11px]'>{errors.email.message}</p>}

 
      <input type="password" {...register("password", { required: "La password es requerida" })} 
      className="w-full bg-zinc-700 text-white px-4 py-2 rounded-md my-2" placeholder="Password" />

    {errors.password && <p className='text-red-500 text-[11px]'>{errors.password.message}</p>}
    
         <div className='flex flex-col items-center w-full'>
         <button type='submit' className='w-full bg-purple-700 px-7 py-7 text-white font-bold hover:bg-purple-800 
          sm:px-8 sm:py-3 rounded-4xl my-3 '>
            Registrarme
              </button>

              <a href="/login" className='w-full bg-purple-700 px-7 py-7 text-white font-bold hover:bg-purple-800 
          sm:px-8 sm:py-3 rounded-4xl my-3 text-center'>
            Regresar
              </a>
             
        </div>
    </form>
    </div>
    </div>
  )
}
