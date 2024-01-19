import { ReactElement, useEffect, useState } from "react";
import { GetTestResponse } from "../../interfaces/global.interfaces";
import apiService from "../../api-service/apiServices";
import TestSection from "./TestSection";
import TestSideBar from "./TestSideBar";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { getUser } from "../../api-service/sessionStorage";

/**
 * Test Component which loads test details table.
 *
 * @returns - Test component HTML with test details.
 */
function TestPage(): ReactElement {
  const [allTests, setAllTests] = useState<GetTestResponse[]>([]);
  const [showCreateTest, setShowCreateTest] = useState<boolean>(false);

  const navigate = useNavigate();

  const handleGetTest = async () => {
    try {
      const getAllTests = await apiService.getTest();
      if (getAllTests.data) {
        setAllTests(getAllTests.data);
      }
    } catch (error) {
      toast.error(`Error while getting all tests: ${error}`);
    }
  };

  useEffect(() => {
    const user = getUser();
    if (user.userType !== "hr") {
      navigate("/");
      return;
    }
    handleGetTest();
  }, []);

  return (
    <div className="container-fluid row p-0 m-0" style={{ height: "94vh" }}>
      <div className="col-2 p-0 align-items-stretch d-flex">
        <div className="border border-1 rounded-2 m-4 me-2 align-items-stretch w-100 p-5 bg-white">
          <TestSideBar
            showCreateTest={showCreateTest}
            setShowCreateTest={setShowCreateTest}
            reloadTestAPI={handleGetTest}
          />
        </div>
      </div>
      <div className="col-10 p-0 align-items-stretch d-flex">
        <div className="border border-1 rounded-2 m-4 ms-2 align-items-stretch w-100 p-5 bg-white">
          <TestSection allTests={allTests} />
        </div>
      </div>
    </div>
  );
}

export default TestPage;
