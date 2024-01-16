import { ReactElement } from "react";
import DepartmentTable from "./DepartmentTable";

/**
 * Test Component which loads test details table.
 *
 * @returns - Test component HTML with test details.
 */
function DepartmentSection(): ReactElement {
  return (
    <div>
      <div>This is DepartmentSection</div>
      < DepartmentTable />
    </div>
  );
}

export default DepartmentSection;
