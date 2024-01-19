import { ReactElement, useEffect, useState } from "react";
import DepartmentSideBar from "./DepartmentSideBar";
import DepartmentSection from "./DepartmentSection";
import { DepartmentData } from "../../interfaces/global.interfaces";
import apiService from "../../api-service/apiServices";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { getUser } from "../../api-service/sessionStorage";

/**
 * Test Component which loads test details table.
 *
 * @returns - Test component HTML with test details.
 */
function DepartmentPage(): ReactElement {
  const [allDepartments, setAllDepartments] = useState<DepartmentData[]>([]);
  const [showCreateDepartment, setShowCreateDepartment] =
    useState<boolean>(false);

  const navigate = useNavigate();

  const handleGetDepartment = async () => {
    try {
      const getAllDepartments = await apiService.getDepartment();
      if (getAllDepartments.data) {
        setAllDepartments(getAllDepartments.data);
      }
    } catch (error) {
      toast.error(`Error while getting department: ${error}`);
    }
  };

  useEffect(() => {
    const user = getUser();
    if (user.userType !== "hr") {
      navigate("/");
      return;
    }
    handleGetDepartment();
  }, []);

  return (
    <div className="container-fluid row p-0 m-0" style={{ height: "94vh" }}>
      <div className="col-2 p-0 align-items-stretch d-flex">
        <div className="border border-1 rounded-2 m-4 me-2 align-items-stretch w-100 p-5 bg-white">
          <DepartmentSideBar
            showCreateDepartment={showCreateDepartment}
            setShowCreateDepartment={setShowCreateDepartment}
            reloadDepartmentAPI={handleGetDepartment}
          />
        </div>
      </div>
      <div className="col-10 p-0 align-items-stretch d-flex">
        <div className="border border-1 rounded-2 m-4 ms-2 align-items-stretch w-100 p-5 bg-white">
          <DepartmentSection allDepartments={allDepartments} />
        </div>
      </div>
    </div>
  );
}

export default DepartmentPage;
