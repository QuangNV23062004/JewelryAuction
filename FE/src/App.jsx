import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import UserPage from "./UserPages/UserPage";
import { UserProvider } from "./UserPages/UserContext";
import StaffPage from "./StaffPages/StaffPage";
import Login from "./StaffPages/Pages/Login";
import { useState, useEffect } from "react";

function App() {
  const [role, setRole] = useState(0);

  useEffect(() => {
    const user = JSON.parse(sessionStorage.getItem("user"));
    if (user) {
      setRole(user.role); // Simplified role setting
    }
  }, []);

  return (
    <UserProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/*" element={<UserPage />} />
          <Route
            path="/staff/*"
            element={
              role === 2 ? <StaffPage /> : <Navigate to="/staff/login" />
            }
          />
          <Route path="/staff/login" element={<Login />} />
        </Routes>
      </BrowserRouter>
    </UserProvider>
  );
}

export default App;
