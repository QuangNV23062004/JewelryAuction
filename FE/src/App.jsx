import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import UserPage from "./UserPages/UserPage";
import { UserProvider } from "./UserPages/UserContext";
import StaffPage from "./StaffPages/StaffPage";
import Login from "./StaffPages/Pages/Login";
function App() {
  return (
    <>
      <UserProvider>
        <BrowserRouter>
          <Routes>
            <Route path="/*" element={<UserPage />}></Route>
            <Route path="/staff" element={<StaffPage />}></Route>
            <Route path="/staff/login" element={<Login />}></Route>
          </Routes>
        </BrowserRouter>
      </UserProvider>
    </>
  );
}

export default App;
