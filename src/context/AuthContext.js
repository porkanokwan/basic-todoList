import { createContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import jwtDecode from "jwt-decode";
import * as localStorageService from "../service/localStorage";

const AuthContext = createContext();

function AuthContextProvider(props) {
  const [user, setUser] = useState(null); // user: { id: 1, username: 'john', email: '' } คือมี user login อยู่

  const navigate = useNavigate();

  //  check ค่า token ใน localStorage ซึ่งมันเป็น sideEffect
  useEffect(() => {
    const token = localStorageService.getToken(); // ถ้าไม่มีจะให้ค่าเป็น null
    if (token) {
      setUser(jwtDecode(token));
    }
  }, []);

  const updateUser = (newUser) => setUser(newUser);

  const login = (token) => {
    localStorageService.setToken(token);
    setUser(jwtDecode(token));
    navigate("/");
  };

  const logout = () => {
    updateUser(null);
    localStorageService.removeToken();
    navigate("/login");
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        setUser,
        updateUser,
        login,
        logout,
      }}
    >
      {props.children}
    </AuthContext.Provider>
  );
}

export default AuthContextProvider;
export { AuthContext };
