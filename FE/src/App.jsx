import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import UserPage from "./UserPages/UserPage";
import { UserProvider } from "./UserPages/UserContext";
import StaffPage from "./StaffPages/StaffPage";
import Login from "./StaffPages/Pages/Login";
import Product from "./StaffPages/Pages/Product";
import { useState, useEffect } from "react";

function App() {
  const [role, setRole] = useState(0);

  useEffect(() => {
    const user = JSON.parse(sessionStorage.getItem("user"));
    if (user) {
      if (user.role === 1) {
        setRole(1);
      } else if (user.role === 2) {
        setRole(2);
      } else {
        setRole(3);
      }
    }
  }, []);

  return (
    <>
      <UserProvider>
        <BrowserRouter>
          <Routes>
            <Route path="/*" element={<UserPage />}></Route>
            <Route
              path="/staff"
              element={
                role === 2 ? <Product /> : <Navigate to="/staff/login" />
              }
            ></Route>
            <Route path="/staff/login" element={<Login />}></Route>
          </Routes>
        </BrowserRouter>
      </UserProvider>
    </>
  );
}

export default App;
