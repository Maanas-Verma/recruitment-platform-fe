import { ReactElement, useState } from "react";
import DepartmentTable from "./DepartmentTable";
import SearchBar from "../../components/SearchBar";
import { DepartmentData } from "../../interfaces/global.interfaces";
import Button from "../../components/Button";

interface DepartmentSectionProps {
  allDepartments: DepartmentData[];
}

/**
 * Test Component which loads test details table.
 *
 * @returns - Test component HTML with test details.
 */
function DepartmentSection(props: DepartmentSectionProps): ReactElement {
  const { allDepartments } = props;
  const [selectedDepartment, setSelectedDepartment] = useState<string[]>([]);

  const handleCancelButton = () => {
    console.log("delete ", selectedDepartment);
  };

  return (
    <div>
      <SearchBar controlPlaceholder="Search Department" key="department" />
      <div className="my-5">
        <Button
          disabled={selectedDepartment.length === 0}
          size="medium"
          theme="primary"
          name="Cancel Order"
          buttonId="cancel-order"
          onClick={handleCancelButton}
        ></Button>
      </div>
      <DepartmentTable
        selectedDepartment={selectedDepartment}
        allDepartments={allDepartments}
        setSelectedDepartment={setSelectedDepartment}
      />
    </div>
  );
}

export default DepartmentSection;
