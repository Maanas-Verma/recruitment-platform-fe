import { ReactElement, useEffect, useState } from "react";
import utils from "../utilities/application-utils";
import TechnicalSideBar from "./TechnicalSideBar";
import TechnicalSection from "./TechnicalSection";
import { TechnicalData } from "../../interfaces/global.interfaces";
import { getUser } from "../../api-service/sessionStorage";
import { useNavigate } from "react-router-dom";

/**
 * Technical Page Component which loads whole technical page.
 *
 * @returns - Technical page component return react element.
 */
function TechnicalPage(): ReactElement {
  const [allTechnical, setAllTechnical] = useState<TechnicalData[]>([]);
  const [filterValue, setFilterValue] = useState<string>("Pending");

  const navigate = useNavigate();

  const handleFilterChange = (event: React.SyntheticEvent, value: string) => {
    setFilterValue(value);
  };

  useEffect(() => {
    const user = getUser();
    if (user.userType !== "employee") {
      navigate("/");
      return;
    }
    setAllTechnical(utils.dummyTechnicalData);
  }, []);

  return (
    <div className="container-fluid row p-0 m-0" style={{ height: "94vh" }}>
      <div className="col-2 p-0 align-items-stretch d-flex">
        <div className="border border-1 rounded-2 m-4 me-2 align-items-stretch w-100 p-5 bg-white">
          <TechnicalSideBar
            filterValue={filterValue}
            handleFilterChange={handleFilterChange}
          />
        </div>
      </div>
      <div className="col-10 p-0 align-items-stretch d-flex">
        <div className="border border-1 rounded-2 m-4 ms-2 align-items-stretch w-100 p-5 bg-white">
          <TechnicalSection allTechnical={allTechnical} />
        </div>
      </div>
    </div>
  );
}

export default TechnicalPage;
