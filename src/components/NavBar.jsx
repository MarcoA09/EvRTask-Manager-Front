import React, { useState } from "react";
import { ChevronDownIcon, CheckCircleIcon, UserIcon, LogoutIcon, XIcon } from '@heroicons/react/solid';
import { useAuth } from '../context/authContext';

export const NavBar = () => {
    const [isMenuOpen, setMenuOpen] = useState(false);
     const toggleMenu = () => setMenuOpen(!isMenuOpen);
     const { logout } = useAuth();
  return (
    <>
   <div className="w-64 bg-gradient-to-b from-[#640d59] to-[#001e41] text-white">
     <div className="p-5">
       <h2 className="text-xl font-bold"> <a href="/dashboard" className="text-white">Dashboard</a></h2>
     </div> 
     <nav>
       <ul>
       <li className="p-4 hover">
              <button onClick={toggleMenu} className="w-full text-left flex items-center justify-between">
                <span>Ver opciones</span>
                <ChevronDownIcon
                  className={`h-5 w-5 text-white transition-transform ${isMenuOpen ? 'rotate-180' : ''}`}
                />
              </button>
              {isMenuOpen && (
                <ul className="pl-4 mt-2">
                 <li className="p-2 hover:bg-gray-600 flex items-center text-white">
                    <CheckCircleIcon className="h-5 w-5 mr-2 text-white" />
                    <a href="/users-collaborators" className="text-white">Colaboradores</a>
                  </li>
                  <li className="p-2 hover:bg-gray-600 flex items-center text-white">
                    <UserIcon  className="h-5 w-5 mr-2 text-white" />
                    <a href="/groups" className="text-white">Grupos</a>
                   
                  </li>
                  <li className="p-2 hover:bg-gray-600 flex items-center text-white">
                    <UserIcon  className="h-5 w-5 mr-2 text-white" />
                    <a href="/tasks" className="text-white">Tareas</a>
                   
                  </li>
 
       </ul>
         )}
                           <li 
      className="p-2 hover:bg-gray-600 flex items-center text-white cursor-pointer"
      onClick={logout} 
    >
      <LogoutIcon className="h-5 w-5 mr-2 text-white" />
      Cerrar sesión
    </li>
      </li>
          </ul>
        </nav>
      </div>
    </>
  )
}
