import { useContext } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import Home from "../pages/Home";
import Login from "../pages/Login";

// การเขียน route อีก pattern นึง
const route = {
  //   admin: [
  //     { path: "/", element: <Admin /> },
  //     { path: "/product", element: <Product /> },
  //   ],
  //   customer: [
  //     { path: "/", element: <Home /> },
  //     { path: "/cart", element: <Cart /> },
  //   ],
  guest: [
    { path: "/login", element: <Login /> },
    { path: "*", element: <Navigate to="/login" replace={true} /> },
    // {path: "/register", element: <Register />}
  ],
  user: [
    // path ต้องไม่ซ้ำกัน
    { path: "/", element: <Home /> },
    { path: "*", element: <Navigate to="/" replace={true} /> },
  ],
};

function Router() {
  const { user } = useContext(AuthContext);

  //   ถ้ามี multiple role มันจะต้องเก็บ role นั้นใน user obj แล้วส่งมา เหมือนว่าตอน login เข้าไป ต้องมี role ส่งมาใน token ด้วย แล้วให้ user obj เก็บไว้
  const role = user ? "user" : "guest";
  return (
    // <Routes>
    //   {user ? (
    //     <>
    //       <Route path="/" element={<Home />} />
    //       {/* <Route path="/login" element={<Navigate to="/" replace={true} />} /> */}
    //       <Route path="*" element={<Navigate to="/" replace={true} />} />
    //     </>
    //   ) : (
    //     <>
    //       <Route path="/login" element={<Login />} />
    //       <Route path="*" element={<Navigate to="/login" replace={true} />} />
    //     </>
    //   )}
    // </Routes>

    <Routes>
      {/* config path ได้ง่ายกว่า ใช้ในกรณีมีหลาย role */}
      {route[role].map((item) => (
        <>
          <Route key={item.path} path={item.path} element={item.element} />
        </>
      ))}
    </Routes>
  );
}

export default Router;
