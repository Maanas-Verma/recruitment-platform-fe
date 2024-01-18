import { ReactElement, useEffect, useState } from "react";
import { TestElement } from "../../interfaces/global.interfaces";
import utils from "../utilities/application-utils";
import apiService from "../../api-service/apiServices";
import { toast } from "react-toastify";

/**
 * Test Component which loads test details table.
 *
 * @returns - Test component HTML with test details.
 */
function TestTable(props: {
  allTests: TestElement[];
  testStatus: string;
}): ReactElement {
  const { allTests, testStatus } = props;

  const [idDepartmentName, setIdDepartmentName] = useState<{
    [key: string]: any;
  }>([]);

  const handleGetDepartment = async () => {
    try {
      const getAllDepartments = await apiService.getDepartment();
      if (getAllDepartments.data) {
        const idEmployeeSet: {
          [key: string]: any;
        } = {};
        getAllDepartments.data.forEach((department) => {
          idEmployeeSet[department.id] = department.name;
        });
        setIdDepartmentName(idEmployeeSet);
      }
    } catch (error) {
      toast.error(`Error while getting employees: ${error}`);
    }
  };

  useEffect(() => {
    handleGetDepartment();
    console.log(idDepartmentName);
  }, []);

  return (
    <div className="table-responsive rounded-2 overflow-auto mt-5">
      <table className="table table-hover align-middle">
        <thead className="table-info">
          <tr>
            <th className="px-2 py-4">Name</th>
            <th className="px-2 py-4">Title Description</th>
            <th className="px-2 py-4">Status</th>
            <th className="px-2 py-4">Assigned</th>
            <th className="px-2 py-4">Modified</th>
          </tr>
        </thead>
        <tbody>
          {allTests
            .filter((test: TestElement) => {
              if (test.status === testStatus) {
                return true;
              }
            })
            .map((test: TestElement) => (
              <tr key={test.id} className={"cursor-pointer"}>
                <td className="p-2 fs-7 ">{test?.name}</td>
                <td className="p-2 fs-7 w-50">{test?.description}</td>
                <td className="p-2 fs-7 ">
                  <div
                    className={`rounded-pill text-center border ${
                      test?.status === "Pending"
                        ? "text-grey border-grey"
                        : test?.status === "Created"
                        ? "text-warning border-warning"
                        : "text-success border-success"
                    }`}
                  >
                    {test?.status}
                  </div>
                </td>
                <td className="p-2 fs-7 ">
                  {test.assigned_to !== null
                    ? idDepartmentName[test.assigned_to]
                    : ""}
                </td>
                <td className="p-2 fs-7 ">
                  {utils.FormatDate(test?.modified_at)}
                </td>
              </tr>
            ))}
        </tbody>
      </table>
    </div>
  );
}

export default TestTable;
