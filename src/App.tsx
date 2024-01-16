import React from "react";
import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import NavHeader from "./pages/nav-header/NavHeader";

function App() {
  return (
    <BrowserRouter>
      <NavHeader />
      <Routes>
        <Route path="/candidates" element={""} />
        <Route path="/departments" element={""} />
        <Route path="/tests" element={""} />
        <Route path="/logout" element={""} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
