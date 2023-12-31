import { useContext, createContext, useState } from "react";
import { useNavigate } from "react-router-dom";

const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(localStorage.getItem("token") || "");

  const navigate = useNavigate();
  const loginAction = async (email, password) => {

    try {
        const response = await fetch('db.json');

        if (!response.ok) {
            throw new Error('Network response was not ok');
        }

        const data = await response.json();
        let targetUser = data?.users?.find((item) => item.email === email && item.password === password);
          if(targetUser) {
            setUser(targetUser);
            setToken(targetUser.token);
            localStorage.setItem("token", targetUser.token);
            localStorage.setItem("userData", targetUser.username);
            navigate("/");
          } else {
            return "error msg";
          }
          

    } catch (error) {
        console.error('There was a problem with the fetch operation:', error);
        throw error;
    }

  };

  const logOut = () => {
    setUser(null);
    setToken("");
    localStorage.removeItem("token");
    navigate("/login");
  };

  return (
    <AuthContext.Provider value={{ token, user, loginAction, logOut }}>
      {children}
    </AuthContext.Provider>
  );

};

export default AuthProvider;

export const useAuth = () => {
  return useContext(AuthContext);
};