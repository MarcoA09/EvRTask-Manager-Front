import {useForm} from 'react-hook-form';
import {useNavigate} from 'react-router-dom';
import { useAuth } from "../../context/authContext";
import React, { useEffect, useState, useRef } from "react";
import Swal from "sweetalert2";



function LoginPage() {
const {register: registerLogin, handleSubmit: handleSubmitLogin , formState: {errors: errorLogin}} = useForm();
const {register: registerVerify, handleSubmit: handleSubmitVerify, formState: {errors: errorVerify}} = useForm();
const {signin, verifyEmail, errors: loginErrors, isAuthenticated } = useAuth();
const navigate = useNavigate();
 const [isModalOpen, setModalOpen] = useState(false);
 const [emailError, setEmailError] = useState("");
 const modalInputRef = useRef(null);
 const [verificado, setEmailVerified] = useState(false);


 const onLoginSubmit = async (values) => {
  try {
    await signin(values);
    console.log("Login Realizado")
  } catch (error) {
    console.log("Error al iniciar sesión", error);
  }
};


const onVerifySubmit = async (values) => {
  try {
     console.log("Verificando email:", values.emailfind);
      await verifyEmail({email: values.emailfind});
      if (setEmailVerified) {
        Swal.fire({
          title: "¡Ok! Registro Disponible",
          text: "El email está disponible, será redirigido a la página de registro", 
          icon: "success",
          showConfirmButton: false,
          timer: 1500
        });
        navigate("/register");
      } else {
        Swal.fire({
          title: "¡Ups! Hay un problema",
          text: "El email no tiene un pregistro. Contacte a la empresa", 
          icon: "error",
          confirmButtonText: "OK",
        });
      }
  } catch (error) {
    console.error("Error al crear:", error);
    setEmailError("Hubo un problema al verificar");
  }
};

useEffect(() => {
  if(isModalOpen && modalInputRef.current) {
    setTimeout(() => {
      modalInputRef.current.focus();
    },100);
  }
}, [isModalOpen]);

useEffect(() => {
  if (loginErrors.length > 0) {
    Swal.fire({
      title: "¡Ups! Hay un problema",
      text: loginErrors[0], 
      icon: "error",
      confirmButtonText: "OK",
    });
  }
}, [loginErrors]); 

useEffect(() => {
  if (isAuthenticated) {
    navigate("/dashboard");
  }
}, [isAuthenticated, navigate]);

  return (
<div className='flex h-[calc(100vh-100px)] items-center justify-center'>
<div className='bg-zinc-800 max-w-md w-full p-10 rounded-md '>
<h1 className='text-2xl font-bold text-center my-5'>Login</h1>
<form name="loginForm" onSubmit={handleSubmitLogin(onLoginSubmit)}
>
    <input type='email' {...registerLogin("email", { required: "El email es requerido" })} 
    className='w-full bg-zinc-700 text-white px-4 py-2 rounded-md my-2 '
    placeholder='Email'/>
    {errorLogin.email && <p className='text-red-500'>{errorLogin.email.message}</p>}
  
    <input type='password' {...registerLogin("password", {required: "La contraseña no puede estar vacia" })} 
     className='w-full bg-zinc-700 text-white px-4 py-2 rounded-md my-2'
     placeholder='Password'/>
     {errorLogin.password && <p className='text-red-500'>{errorLogin.password.message}</p>}
     <div className='flex flex-col items-center w-full'>
          <button type='submit' className='w-full bg-purple-700 px-7 py-7 text-white font-bold hover:bg-purple-800 
          sm:px-8 sm:py-3 rounded-4xl my-3 '>
        Iniciar Sesión
          </button>
          <p className='sm:py-3 my-3 text-center'>¿Tienes un preregistro habilitado?<button onClick={() => setModalOpen(true)} className='text-amber-300'> Continuar al Registro</button></p>
    </div>
</form>
</div>

{isModalOpen && (
      <div className="fixed inset-0 bg-opacity-50 flex items-center justify-center z-50">
        <div className="bg-white p-6 rounded-lg shadow-lg w-1/3">
          <h3 className="text-xl font-bold mb-4 text-black">Por favor ingrese su email</h3>
 
          <form name="verifyEmailForm" onSubmit={handleSubmitVerify(onVerifySubmit)}>
 
          <input type='email' {...registerVerify("emailfind", { required: "El email es requerido" })} 
              className='w-full bg-zinc-100 text-gray-900 px-4 py-2 rounded-md my-2'
              placeholder='Email'/>
              {errorVerify.email && <p className='text-red-500'>{errorVerify.email.message}</p>}
 
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
         Verificar
       </button>
 
 
          </div>
          </form>
        </div>
      </div>
    )}


</div>
  )
}

export default LoginPage 



