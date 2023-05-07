import Home from "./pages/home/Home.jsx";
import FilteresCategories from "./pages/FilteredCategories/FilteresCategories.jsx";
import { Route, Routes } from "react-router-dom";
import Welcome from "./pages/Welcom/welcome.jsx";
import Register from "./pages/Register/Register.jsx";

export const AppRouter = () => (
  <Routes>
    <Route path="/" element={<Welcome />} />
    <Route path="/Home" element={<Home />} />
    // TODO: change the defult argument that get from rout
    <Route path="/FilteresCategories" element={<FilteresCategories />} />
  </Routes>
);
