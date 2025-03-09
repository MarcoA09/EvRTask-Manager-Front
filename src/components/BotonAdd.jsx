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
        <div className="bottom-full absolute right-0 mb-2 w-48 rounded-md bg-white">
          <div className="py-1">
              <button
                className="block w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900"
                onClick={onOpenModal}
              >

              </button>

          </div>
        </div>
    </div>
  )
}


export default BotonAdd;