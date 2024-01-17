import { ReactElement, useEffect, useState } from "react";
import utils from "../utilities/application-utils";
import DepartmentSideBar from "./DepartmentSideBar";
import DepartmentSection from "./DepartmentSection";
import { DepartmentData } from "../../interfaces/global.interfaces";

/**
 * Test Component which loads test details table.
 *
 * @returns - Test component HTML with test details.
 */
function DepartmentPage(): ReactElement {
  const [allDepartments, setAllDepartments] = useState<DepartmentData[]>([]);
  const [showCreateDepartment, setShowCreateDepartment] =
    useState<boolean>(false);

  useEffect(() => {
    setAllDepartments(utils.dummyDepartmentData);
  }, [showCreateDepartment]);

  return (
    <div className="container-fluid row p-0 m-0" style={{ height: "94vh" }}>
      <div className="col-2 p-0 align-items-stretch d-flex">
        <div className="border border-1 rounded-2 m-4 me-2 align-items-stretch w-100 p-5">
          <DepartmentSideBar
            showCreateDepartment={showCreateDepartment}
            setShowCreateDepartment={setShowCreateDepartment}
          />
        </div>
      </div>
      <div className="col-10 p-0 align-items-stretch d-flex">
        <div className="border border-1 rounded-2 m-4 ms-2 align-items-stretch w-100 p-5">
          <DepartmentSection allDepartments={allDepartments} />
        </div>
      </div>
    </div>
  );
}

export default DepartmentPage;
