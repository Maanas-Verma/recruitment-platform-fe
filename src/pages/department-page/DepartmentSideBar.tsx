import { ReactElement, useState } from "react";
import DepartmentCreation from "./DepartmentCreation";
import Button from "../../components/Button";

interface DepartmentSectionProps {
  showCreateDepartment: boolean;
  setShowCreateDepartment: (value: boolean) => void;
}

/**
 * Test Component which loads test details table.
 *
 * @returns - Test component HTML with test details.
 */
function DepartmentSideBar(props: DepartmentSectionProps): ReactElement {
  const { showCreateDepartment, setShowCreateDepartment } = props;

  return (
    <div>
      <div className="fs-5 fw-semibold">Department</div>
      <div className="mt-5">
        <Button
          size="medium"
          theme="primary"
          name="Add Department"
          buttonId="create-department"
          onClick={() => setShowCreateDepartment(true)}
          extraClass="fw-bold fs-7"
          icon="plus-lg"
          iconPlacement="start"
          extraIconClass="h6"
        ></Button>
      </div>
      {showCreateDepartment ? (
        <DepartmentCreation
          handleClose={() => setShowCreateDepartment(false)}
        />
      ) : (
        ""
      )}
    </div>
  );
}

export default DepartmentSideBar;
