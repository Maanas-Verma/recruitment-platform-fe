import { ReactElement, useState } from "react";
import Button from "../../components/Button";

/**
 * Technical SideBar Component which loads side panel.
 *
 * @returns - Technical sidebar component return side panel.
 */
function TechnicalSideBar(): ReactElement {
  return (
    <div>
      <div className="fs-5">Technical Page</div>
      <div className="mt-5">
        <Button
          size="medium"
          theme="primary"
          name="Create Technical"
          buttonId="create-technical"
          extraClass="fw-bold fs-7"
          icon="plus-lg"
          iconPlacement="start"
          extraIconClass="h6"
        ></Button>
      </div>
    </div>
  );
}

export default TechnicalSideBar;
