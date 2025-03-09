import { useEffect } from "react";
import { createContext, useContext, useState } from "react";
import { loginRequest, registerRequest, getUsersRequest, verifyTokenRequest, verifyEmailRequest } from "../api/auth";

const AuthContext = createContext();

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [users, setUsers] = useState([]);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [errors, setErrors] = useState([]);
  const [loading, setLoading] = useState(true);
  const [emailVerified, setEmailVerified] = useState(false);

  useEffect(() => {
    const loadUser = async () => {
      const token = localStorage.getItem("token");
      
      if (token) {
        try {
          const res = await verifyTokenRequest();

          const userData = await verifyTokenRequest(token);
          if (!userData || Object.keys(userData).length === 0) {
            setIsAuthenticated(false);  
            return;
          } 

          const userRol = userData.rol;
          setUser({...userData, isAdmin: userRol === 'Administrador', isSuper: userRol === 'SuperAdmin'
          });
          
          setUser(res.data);
          setIsAuthenticated(true);
        } catch (error) {
          console.error("Error verificando token:", error);
          localStorage.removeItem("token");
          localStorage.removeItem("rol");
          localStorage.removeItem("userRol");
        }
      }
      setLoading(false);
    };

    loadUser();
  }, []);

  const signup = async (user) => {
    try {
      const res = await registerRequest(user);
      setUser(res.data);
      setIsAuthenticated(true);
      
      localStorage.setItem("token", res.data.token);
      localStorage.setItem("rol", res.data.rol || "user");
      if (res.data.rol === "Administrador") {
        localStorage.setItem("userRol", "Administrador");
      } else if (res.data.rol === "SuperAdmin") {
        localStorage.setItem("userRol", "SuperAdmin");
      } else {
        localStorage.setItem("userRol", "Colaborador");
      }
      
      return res.data;
    } catch (error) {
      console.error(error);
      setErrors(error.response?.data || ["Error en el registro"]);
      throw error;
    }
  };

  const signin = async (user) => {
    try {
      const res = await loginRequest(user);
      setUser(res.data);
      setIsAuthenticated(true);
      
      localStorage.setItem("token", res.data.token);
      if (res.data.rol === "Administrador") {
        localStorage.setItem("userRol", "Administrador");
      } else if (res.data.rol === "SuperAdmin") {
        localStorage.setItem("userRol", "SuperAdmin");
      } else {
        localStorage.setItem("userRol", "Colaborador");
      }
      
      return res.data;
    } catch (error) {
      console.error(error);
      setErrors(error.response?.data || ["Error en el inicio de sesión"]);
      throw error;
    }
  };

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("rol");
    localStorage.removeItem("userRol");
    setUser(null);
    setIsAuthenticated(false);
    navigate('/login');
  };

  const verifyEmail = async (email) => {
    try {
      const res = await verifyEmailRequest( email );
      setEmailVerified(true);
      return res.data;
    } catch (error) {
      console.error(error);
      setErrors(error.response?.data || ["Error en la verificación del correo"]);
      throw error;
    }
  };


  const getUsers = async () => {
    try {
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    if (errors.length > 0) {
      const timer = setTimeout(() => {
        setErrors([]);
      }, 5000);
      return () => clearTimeout(timer);
    }
  }, [errors]);

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated,
        errors,
        loading,
        signup,
        signin,
        logout,
        verifyEmail,
        emailVerified,
        setEmailVerified,
        users,
        getUsers,
        setUsers
      }}
    >
      {!loading && children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
