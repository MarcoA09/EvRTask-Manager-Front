import React from "react";
import Swal from "sweetalert2";

const PopupAlert = ({ title, message, type }) => {
  const showAlert = () => {
    Swal.fire({
      title: title || "¡Alerta!",
      text: message || "Ocurrió un error inesperado.",
      icon: type || "error",
      confirmButtonText: "OK",
    });
  };

  return (
    <button onClick={showAlert} className="hidden">
      Mostrar Alerta
    </button>
  );
};

export default PopupAlert;

