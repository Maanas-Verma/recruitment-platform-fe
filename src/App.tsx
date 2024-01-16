import { ReactElement } from "react";
import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import NavHeader from "./pages/nav-header/NavHeader";
import TestSection from "./pages/test-page/TestPage";
import DepartmentPage from "./pages/department-page/DepartmentPage";

function App(): ReactElement {
  return (
    <BrowserRouter>
      <NavHeader />
      <Routes>
        <Route path="/candidates" element={""} />
        <Route path="/departments" element={<DepartmentPage />} />
        <Route path="/tests" element={<TestSection />} />
        <Route path="/logout" element={""} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
