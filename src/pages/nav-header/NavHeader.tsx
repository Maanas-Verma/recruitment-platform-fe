import { ReactElement, useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import logo from "../../assets/images/hr_logo.png";

/**
 * Header Component which loads the navigation links.
 *
 * @returns - Header component HTML with nav links.
 */
function NavHeader(): ReactElement {
  const [activeLink, setActiveLink] = useState<string | null>(null);
  const location = useLocation();

  useEffect(() => {
    setActiveLink(location.pathname);
  }, [location.pathname]);

  const navigate = useNavigate();
  const handleNavigation = (link: string) => {
    navigate(link);
    setActiveLink(link);
  };

  return (
    <>
      <div className="container-fluid bg-white fixed-top shadow-sm">
        <div className="d-flex flex-row justify-content-between fw-bold mx-4">
          <div className="d-flex align-self-center pt-2 pb-1">
            <img className="align-self-center" src={logo} height="40px" width="45px" alt="HCR" />
            <div className="ms-4 my-auto">
              <span className="fs-4 text-secondary-dark">Hiring cum Recruitment</span>
            </div>
          </div>
          <div className="d-flex align-items-stretch">
            <button
              type="button"
              tabIndex={0}
              className={`ms-4 border-0 shadow-0 bg-white ${
                activeLink === "/candidates" ? "text-secondary-dark" : "text-muted "
              }`}
              id="candidate-link"
              onClick={() => handleNavigation("/candidates")}>
              Candidates
            </button>
            <button
              type="button"
              tabIndex={0}
              className={`ms-4 border-0 shadow-0 bg-white ${
                activeLink === "/departments" ? "text-secondary-dark" : "text-muted "
              }`}
              id="department-link"
              onClick={() => handleNavigation("/departments")}>
              Departments
            </button>
            <button
              type="button"
              tabIndex={0}
              className={`ms-4 border-0 shadow-0 bg-white ${
                activeLink === "/tests" ? "text-secondary-dark" : " text-muted "
              }`}
              id="tests-link"
              onClick={() => handleNavigation("/tests")}>
              Tests
            </button>
            <button
              type="button"
              tabIndex={0}
              className={`ms-4 border-0 shadow-0 bg-white ${
                activeLink === "/logout" ? "text-secondary-dark" : "text-muted"
              }`}
              id="logout-link"
              onClick={() => handleNavigation("/logout")}>
              Log Out
            </button>
          </div>
        </div>
      </div>
      <div className="container-fluid py-5 mt-1"></div>
    </>
  );
}

export default NavHeader;
