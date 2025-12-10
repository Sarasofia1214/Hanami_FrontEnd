import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import HamaniDashboard from "./pages/main";
import MenuPage from "./pages/menu";
import AdminDashboard from "./pages/adminMain";
import AdminMenuPage from "./pages/adminMenu";
import AddDishPage from "./pages/addDishPage";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/dashboard" element={<HamaniDashboard />} />
        <Route path="/menu" element={<MenuPage />} />
        <Route path="/adminDashboard" element={<AdminDashboard />} />
        <Route path="/adminMenu" element={<AdminMenuPage />} />
        <Route path="/admin/add-dish" element={<AddDishPage />} />
        

      </Routes>
    </BrowserRouter>
  );
}


