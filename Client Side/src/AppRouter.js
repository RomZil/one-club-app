import Home from "./pages/home/Home.jsx";
import FilteresCategories from "./pages/FilteredCategories/FilteresCategories.jsx";
import { Route, Routes } from "react-router-dom";

export const AppRouter = () => (
  <Routes>
    <Route path="/" element={<Home />} />
    <Route path="/FilteresCategories" element={<FilteresCategories id={1} />} />
  </Routes>
);
