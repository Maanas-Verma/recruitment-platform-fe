import { ReactElement } from "react";
import { DepartmentData } from "../../interfaces/global.interfaces";

/**
 * Test Component which loads test details table.
 *
 * @returns - Test component HTML with test details.
 */
function DepartmentTable(props: {
  selectedDepartment: string[];
  allDepartments: DepartmentData[];
  setSelectedDepartment: (value: string[]) => void;
}): ReactElement {
  const { selectedDepartment, allDepartments, setSelectedDepartment } = props;

  const handleCheckboxChange = (id: string) => {
    const updatedSelectedDepartment: string[] = [...selectedDepartment];
    if (updatedSelectedDepartment.includes(id)) {
      const index = updatedSelectedDepartment.indexOf(id);
      updatedSelectedDepartment.splice(index, 1);
    } else {
      updatedSelectedDepartment.push(id);
    }
    if (updatedSelectedDepartment !== undefined) {
      setSelectedDepartment(updatedSelectedDepartment);
    }
  };

  return (
    <div className="table-responsive rounded-2 overflow-auto mt-5">
      <table className="table table-hover align-middle">
        <thead className="table-info">
          <tr>
            <th className="px-2 py-4">Select</th>
            <th className="px-2 py-4">Name</th>
            <th className="px-2 py-4">Description</th>
            <th className="px-2 py-4">Head</th>
            <th className="px-2 py-4">Requirements</th>
          </tr>
        </thead>
        <tbody>
          {allDepartments.map((department: DepartmentData) => (
            <tr className={"cursor-pointer"} key={`row-${department.id}`}>
              <td className="p-2">
                <input
                  type="checkbox"
                  checked={selectedDepartment.includes(department.id)}
                  onChange={() => handleCheckboxChange(department?.id)}
                />
              </td>
              <td className="p-2 fs-7 ">{department?.name}</td>
              <td className="p-2 fs-7 ">{department?.description}</td>
              <td className="p-2 fs-7 ">{department?.head}</td>
              <td className="p-2 fs-7 ">
                <div className="d-flex flex-wrap flex-row gap-1">
                  {department?.requirements.map((skill) => {
                    return (
                      <span
                        className="badge rounded-pill bg-primary px-2 py-1"
                        key={`skill-${skill}`}
                      >
                        {skill}
                      </span>
                    );
                  })}
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default DepartmentTable;
