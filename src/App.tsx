import { ReactElement } from "react";
import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import NavHeader from "./pages/nav-header/NavHeader";
import TestPage from "./pages/test-page/TestPage";
import DepartmentPage from "./pages/department-page/DepartmentPage";
import CandidatePage from "./pages/candidates/CandidatePage";
import TechnicalPage from "./pages/technical-page/TechnicalPage";
import SignIn from "./pages/sign-in/SignIn";
import Home from "./pages/home-page/Home";
import CandidateTest from "./pages/candidates/CandidateTest";
import CandidateResult from "./pages/candidates/CandidateResult";

function App(): ReactElement {
  return (
    <BrowserRouter>
      <NavHeader />
      <Routes>
        <Route path="/candidates" element={<CandidatePage />} />
        <Route path="/" element={<SignIn />}></Route>
        <Route path="/home" element={<Home />}></Route>
        <Route path="/departments" element={<DepartmentPage />} />
        <Route path="/tests" element={<TestPage />} />
        <Route path="/tech-admin" element={<TechnicalPage />} />
        <Route path="/candidate-test" element={<CandidateTest />} />
        <Route path="/candidate-result" element={<CandidateResult />} />
        <Route path="/logout" element={""} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
