import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Landing from "./pages/Landing.jsx";
import SignIn from "./pages/SignIn.jsx";
import SignUp from "./pages/SignUp.jsx";
import Member from "./pages/Member.jsx";
import { WhatsAppPill } from "./components/Shared.jsx";
import "./styles.css";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/signin" element={<SignIn />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/member" element={<Member />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
      <WhatsAppPill />
    </BrowserRouter>
  </React.StrictMode>
);
