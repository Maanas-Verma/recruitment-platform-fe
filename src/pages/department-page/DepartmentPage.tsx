import { ReactElement, useEffect, useState } from "react";
import utils from "../utilities/application-utils";
import DepartmentSideBar from "./DepartmentSideBar";
import DepartmentSection from "./DepartmentSection";

/**
 * Test Component which loads test details table.
 *
 * @returns - Test component HTML with test details.
 */
function DepartmentPage(): ReactElement {
  const [tests, setTests] = useState<any>([]);
  const [selectedTestStatus, setSelectedTestStatus] = useState<string>("");
  const [showCreateTest, setShowCreateTest] = useState<boolean>(false);

  useEffect(() => {
    setTests(utils.dummyTestData);
  }, [selectedTestStatus, showCreateTest]);

  return (
    <div className="container-fluid row p-0 m-0" style={{ maxHeight: "100vh" }}>
      <div className="col-4 p-0">
        <div className="border border-1 rounded-2 m-4 me-2">
          <DepartmentSideBar /> 
        </div>
      </div>
      <div className="col-8 p-0">
        <div className="border border-1 rounded-2 m-4 ms-2">
          <DepartmentSection />
        </div>
      </div>
    </div>
  );
}

export default DepartmentPage;
