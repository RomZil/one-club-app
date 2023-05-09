import Home from "./pages/home/Home.jsx";
import FilteresCategories from "./pages/FilteredCategories/FilteresCategories.jsx";
import { Route, Routes } from "react-router-dom";
import Welcome from "./pages/Welcom/welcome.jsx";
import Register from "./pages/Register/Register.jsx";
import LogIn from "./pages/LogIn/LogIn.jsx";
import Profile from "./pages/Profile/Profile.jsx";
import MyClubs from "./pages/MyClubs/MyClubs.jsx";
import PorgotPassword from "./pages/PorgotPassword/PorgotPassword.jsx";
import ShowItem from "./pages/ShowItem/ShowItem.jsx";

export const AppRouter = () => (
  <Routes>
    <Route path="/" element={<Welcome />} />
    <Route path="/Home" element={<Home />} />
    // TODO: change the defult argument that get from rout
    <Route path="/FilteresCategories" element={<FilteresCategories />} />
    <Route path="/Register" element={<Register />} />
    <Route path="/LogIn" element={<LogIn />} />
    <Route path="/Profile" element={<Profile />} />
    <Route path="/MyClubs" element={<MyClubs />} />
    <Route path="/PorgotPassword" element={<PorgotPassword />} />
    <Route path="/ShowItem" element={<ShowItem />} />
  </Routes>
);
