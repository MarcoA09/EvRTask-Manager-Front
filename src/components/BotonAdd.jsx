import React from 'react'

const BotonAdd = ({onOpenModal}) => {
    
  return (
    <div className="fixed bottom-8 right-8 p-4">
      <button
        type="button"
        className="flex items-center gap-2 px-4 py-2 bg-gradient-to-b from-[#640d59] to-[#001e41] text-white rounded-full shadow-lg hover:bg-blue-600lors"
      onClick={onOpenModal}
      >
        +
      </button>

    </div>
  )
}


export default BotonAdd;