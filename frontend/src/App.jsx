import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import MainLayout from "./layouts/MainLayout";

import MyOrbit from "./pages/MyOrbit";
import Diary from "./pages/Diary";
import Login from "./pages/Login";
import Message from "./pages/Message";
import MyPlanet from "./pages/MyPlanet";
import SignUp from "./pages/SignUp";
import Terraforming from "./pages/Terraforming";

import "./App.css";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<MainLayout />}>
          <Route path="/" element={<Navigate to="/my-orbit" replace />} />
          <Route path="/my-orbit" element={<MyOrbit />} />
          <Route path="/diary" element={<Diary />} />
          <Route path="/message" element={<Message />} />
          <Route path="/my-planet" element={<MyPlanet />} />
          <Route path="/terraforming" element={<Terraforming />} />
        </Route>

        <Route path="/login" element={<Login />} />
        <Route path="/sign-up" element={<SignUp />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
