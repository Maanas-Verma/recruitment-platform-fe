import { ReactElement, useEffect, useState } from "react";
import TechnicalSideBar from "./TechnicalSideBar";
import TechnicalSection from "./TechnicalSection";
import { GetTestResponse } from "../../interfaces/global.interfaces";
import apiService from "../../api-service/apiServices";
import { toast } from "react-toastify";

/**
 * Technical Page Component which loads whole technical page.
 *
 * @returns - Technical page component return react element.
 */
function TechnicalPage(): ReactElement {
  const [allTechnical, setAllTechnical] = useState<GetTestResponse[]>([]);
  const [filterValue, setFilterValue] = useState<string>("PENDING");

  const handleFilterChange = (event: React.SyntheticEvent, value: string) => {
    setFilterValue(value);
  };

  const handleGetTechnical = async () => {
    try {
      const getAllTechnical = await apiService.getTest();
      if (getAllTechnical?.data) {
        setAllTechnical(getAllTechnical.data);
      }
    } catch (error) {
      toast.error(`Error while getting test api: ${error}`);
    }
  };

  useEffect(() => {
    handleGetTechnical();
  }, [filterValue]);

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
          <TechnicalSection
            filterValue={filterValue}
            allTechnical={allTechnical}
          />
        </div>
      </div>
    </div>
  );
}

export default TechnicalPage;
