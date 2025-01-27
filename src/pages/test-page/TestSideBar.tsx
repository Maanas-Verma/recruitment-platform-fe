import { ReactElement } from "react";
import TestCreation from "./TestCreation";
import Button from "../../components/Button";

interface TestSectionProps {
  showCreateTest: boolean;
  setShowCreateTest: (value: boolean) => void;
  reloadTestAPI: () => void;
}

/**
 * Test Component which loads test details table.
 *
 * @returns - Test component HTML with test details.
 */
function TestSideBar(props: TestSectionProps): ReactElement {
  const { showCreateTest, setShowCreateTest, reloadTestAPI } = props;

  return (
    <div>
      <div className="fs-5 fw-semibold">Test Dashboard</div>
      <div className="mt-5">
        <Button
          size="medium"
          theme="primary"
          name="Add Test"
          buttonId="create-test"
          onClick={() => setShowCreateTest(true)}
          extraClass="fw-bold fs-7"
          icon="plus-lg"
          iconPlacement="start"
          extraIconClass="h6"
        />
      </div>
      {showCreateTest ? (
        <TestCreation
          handleClose={() => setShowCreateTest(false)}
          reloadTestAPI={reloadTestAPI}
        />
      ) : (
        ""
      )}
      <div id="test-control-panel"></div>
    </div>
  );
}

export default TestSideBar;
