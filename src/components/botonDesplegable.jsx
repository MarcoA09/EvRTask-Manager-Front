import React, { useState } from 'react';

const BotonDesplegable = ({ opciones = ["Añadir Tarea", "Añadir Grupo"], onOptionSelect }) => {
  const [isOpen, setIsOpen] = useState(false); 

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const handleOptionClick = (opcion) => {
    setIsOpen(false);
    onOptionSelect(opcion);
  };

  return (
    <div className="fixed bottom-8 right-8 p-4">
      <button
        type="button"
        onClick={toggleMenu}
        className="flex items-center gap-2 px-4 py-2 bg-gradient-to-b from-[#640d59] to-[#001e41] text-white rounded-full shadow-lg hover:bg-blue-600lors"
      >
        +
      </button>

      {isOpen && (
        <div className="bottom-full absolute right-0 mb-2 w-48 rounded-md bg-white">
          <div className="py-1">
            {opciones.map((opcion, index) => (
              <button
                key={index}
                onClick={() => handleOptionClick(opcion) }
                className="block w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900"
              >
                {opcion}
              </button>
            ))}
          </div>
        </div>
      )}



    </div>
  );
};

export default BotonDesplegable;



