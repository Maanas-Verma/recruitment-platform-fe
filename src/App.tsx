import { ReactElement } from "react";
import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import NavHeader from "./pages/nav-header/NavHeader";
import TestTable from "./pages/test-page/TestPage";

function App(): ReactElement {
  return (
    <BrowserRouter>
      <NavHeader />
      <Routes>
        <Route path="/candidates" element={""} />
        <Route path="/departments" element={""} />
        <Route path="/tests" element={<TestTable />} />
        <Route path="/logout" element={""} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
