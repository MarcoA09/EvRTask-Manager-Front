import React, { useEffect } from "react";

import { useNavigate } from "react-router-dom";
function LandinPage() {
  const navigate = useNavigate();
  useEffect(() => {
   
    localStorage.removeItem("username");
    localStorage.removeItem("token");
    localStorage.removeItem("userRol");

    navigate("/login");
    window.location.reload();
  }, [navigate]); 
  return (
    <div className='flex h-[calc(100vh-100px)] items-center justify-center'>

    <div className='bg-[rgba(0,0,0,0.25)] max-w-md w-full p-10 rounded-md'>
    
    <h1 className='text-2xl font-bold my-2 text-center'>Bienvenido</h1>
    <h1 className='text-2xl font-bold my-2 text-center'>App Task Manager</h1>
    <p class="text-center text-sm ...">Da clic para ininiar sesión o registrarte.</p>
    <div className='flex justify-center'>
    <a  href="/login" className=' bg-purple-700 px-7 py-7 text-white font-bold hover:bg-purple-800 sm:px-8 
    sm:py-3 rounded-4xl my-5' t>
   Login
 </a>
 </div>
    </div>
        </div>
  )
}

export default LandinPage