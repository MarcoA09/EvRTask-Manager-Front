import { useEffect } from "react";
import { createContext, useContext, useState } from "react";
import { loginRequest, registerRequest, getUsersRequest, verifyTokenRequest, verifyEmailRequest } from "../api/auth";


const AuthContext = createContext();

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error("useAuth must be used within a AuthProvider");
  return context;
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [users, setUsers] = useState([]);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [errors, setErrors] = useState([]);
  const [emailVerified, setEmailVerified] = useState(null);
 

  const signup = async (user) => {
    try {
      const res = await registerRequest(user);
      if (res.status === 200) {
        setUser(res.data);
        setIsAuthenticated(true);
      }
    } catch (error) {
      setErrors(error.response.data.message);
    }
  };

  const signin = async (user) => {
    try {
      const res = await loginRequest(user);
      setUser(res.data);
      const { token } = res.data;
      const { rol } = res.data;
      localStorage.setItem("rol", rol);
      localStorage.setItem("token", token);
      setIsAuthenticated(true);
    } catch (error) {
      console.log(error);
    /*   setErrors(error.response.data.message); */
    }
  };

  const verifyEmail = async (email) => {
    try {
      const res = await verifyEmailRequest(email);
      const userData = res.data || res; 
      setEmailVerified(userData);
    } catch (error) {
      setErrors(error.response?.data?.message || ["Error al verificar email"]);
    }
  };

  
  const logout = () => {
    localStorage.removeItem("token");
    setUser(null);
    setIsAuthenticated(false);
  };


  const getUsers = async (username = "") => {
    try {
      const res = await getUsersRequest(username);
      setUsers(res.data); 

    } catch (error) {
     /*  console.error('Error fetching users:', error); */
    } 
  }; 

  useEffect(() => {
    const checkLogin = async () => {
         
     const token = localStorage.getItem("token");
      if (!token) {
        setIsAuthenticated(false);
        return;
      }
      try {
        const userData = await verifyTokenRequest(token);
        if (!userData || Object.keys(userData).length === 0) {
          setIsAuthenticated(false);  
          return;
        } 

        const userRol = userData.rol;
        setUser({...userData, isAdmin: userRol === 'Administrador', isSuper: userRol === 'SuperAdmin'
        })

        localStorage.setItem("userRol", userRol);

        setIsAuthenticated(true);
        setUser(res.data);
        console.log("isAuthenticated:", isAuthenticated);
        console.log("user:", user);
      } catch (error) {
        setIsAuthenticated(false);
      }
    };
   
    checkLogin();
  }, []);

   useEffect(() => {
    getUsers(); 
  }, []);  

  return (
    <AuthContext.Provider
      value={{
        user,
        users,
        getUsers,
        setUsers,
        emailVerified,
        setEmailVerified,
        verifyEmail,
        signup,
        signin,
        logout,
        isAuthenticated,
        errors,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;