import { ReactElement, SetStateAction, useState } from "react";
import TestCreation from "./TestCreation";
import Button from "../../components/Button";
import apiService from "../../api-service/apiServices";

interface TestSectionProps {
  showCreateTest: boolean;
  setShowCreateTest: (value: boolean) => void;
}

/**
 * Test Component which loads test details table.
 *
 * @returns - Test component HTML with test details.
 */
function TestSideBar(props: TestSectionProps): ReactElement {
  const { showCreateTest, setShowCreateTest } = props;

  const handleSendQuestion = async () => {
    const data = await apiService.postQuestion({
      description: "This is question testing.",
      question_type: "MCQ",
      tags: ["tag1", "tag2"],
      correct_answer: "A",
      other_dependencies: {
        A: "This is option A",
        B: "This is option B",
      },
    });
    console.log(data);
  };

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
        <TestCreation handleClose={() => setShowCreateTest(false)} />
      ) : (
        ""
      )}
      <div className="my-4">
        <Button
          theme={"primary"}
          size={"small"}
          name={"Question post test"}
          onClick={() => handleSendQuestion()}
        />
      </div>
      <div id="test-control-panel"></div>
    </div>
  );
}

export default TestSideBar;
