import { useEffect, useState } from "react";
import { useAuth } from "../../context/authContext";
import {useForm} from 'react-hook-form';
import {useNavigate} from 'react-router-dom';
import Swal from "sweetalert2";

function RegisterPage() {
  const { signup, logout, errors: registerErrors, isAuthenticated, emailVerified } = useAuth();
    const { register, handleSubmit, setValue, formState: {errors}, setError } = useForm();
    const navigate = useNavigate();

     useEffect(() => {
      if(emailVerified) {
        console.log(emailVerified.rol)
    if (emailVerified.name) {
      setValue("name", emailVerified.name);
    }
    if (emailVerified.email) {
      setValue("email", emailVerified.email);
    }
    if (emailVerified.rol) {
      setValue("rol", emailVerified.rol);
    }
  }
     },[emailVerified, setValue]);


const onSubmit = async (values) => {
  await signup(values);
};

useEffect(() => {
  if (isAuthenticated) {
    Swal.fire({
      title: "¡Bien Hecho!",
      text: "Registro exitoso",
      icon: "success",
      confirmButtonText: "OK",
  }).then(() => {
    logout();
    navigate("/login");
  });
  }
}, [isAuthenticated, navigate, logout]);


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

  return (
<div className='flex h-[calc(100vh-100px)] items-center justify-center'>
    <div className='bg-zinc-800 max-w-md p-10 rounded-md'>
        <h1 className='text-2xl font-bold text-center my-5'>Registro</h1>
         <form onSubmit={handleSubmit(onSubmit)}> 
         <input type='text' id='name' name='name' {...register("name", { required: "El nombre es requerido" })} 
                className="w-full bg-zinc-700 text-white px-4 py-2 rounded-md my-2" placeholder="Nombre" />
                 {errors.name && <p className='text-red-500'>{errors.name.message}</p>}
                 <input type='text' id='rol' name='rol' {...register("rol", { required: "El rol es requerido" })} 
                className="w-full bg-zinc-700 text-white px-4 py-2 rounded-md my-2" placeholder="Rol" readOnly/>
                <input type='email' id='email' name='email' {...register("email", { required: "El email es requerido" })} 
                className="w-full bg-zinc-700 text-white px-4 py-2 rounded-md my-2" placeholder="Email" readOnly/>
                 {errors.email && <p className='text-red-500'>{errors.email.message}</p>}
                <input type='text' id='username' name='username' maxLength={10} {...register("username", { required: "El username es requerido" })} 
                className="w-full bg-zinc-700 text-white px-4 py-2 rounded-md my-2" placeholder="Username"/>
                 {errors.username && <p className='text-red-500'>{errors.username.message}</p>}
                <input type='password' id='password' name='password' {...register("password", { required: "La password es requerido" })} 
                className="w-full bg-zinc-700 text-white px-4 py-2 rounded-md my-2" placeholder="Password" />
                 {errors.password && <p className='text-red-500'>{errors.password.message}</p>}
      
            <div className='flex flex-col items-center w-full'>
            <button type='submit' className='w-full bg-purple-700 px-7 py-7 text-white font-bold hover:bg-purple-800 
             sm:px-8 sm:py-3 rounded-4xl my-3 '>
             Registrar
            </button>
            </div>
         </form>
    </div>
</div>

  )};


export default RegisterPage