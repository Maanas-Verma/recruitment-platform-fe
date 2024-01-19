import { ReactElement, SetStateAction, useEffect, useState } from "react";
import {
  GetTestResponse,
  PatchTestRequest,
  PostQuestionResponse,
} from "../../interfaces/global.interfaces";
import Button from "../../components/Button";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import apiService from "../../api-service/apiServices";

interface QuestionPanelLeftProps {
  assignedTestId: string | undefined;
  countIDLength: number;
  setCountIDLength: React.Dispatch<SetStateAction<number>>;
  selectedQuestionIDs: string[];
  setSelectedQuestionIDs: React.Dispatch<SetStateAction<string[]>>;
  addedQuestionLists: PostQuestionResponse[];
}

/**
 * Technical Section Component which loads section.
 *
 * @returns - Technical Section Component to render element.
 */
function QuestionPanelLeft(props: QuestionPanelLeftProps): ReactElement {
  const {
    assignedTestId,
    addedQuestionLists,
    countIDLength,
    setCountIDLength,
    selectedQuestionIDs,
    setSelectedQuestionIDs,
  } = props;
  const [assignedTest, setAssignedTest] = useState<GetTestResponse>();

  const filterSubQuestions = (selectedID: string): void => {
    if (selectedQuestionIDs) {
      const newParsedQuestionIDs = selectedQuestionIDs.filter(
        (id) => selectedID !== id
      );
      setSelectedQuestionIDs(newParsedQuestionIDs);
      setCountIDLength(() => countIDLength - 1);
    }
  };

  const getAssignedTestDetails = async (): Promise<void> => {
    try {
      const getAllTestDetails = await apiService.getTest();
      if (getAllTestDetails?.data[0]?.id) {
        const filterAssignedTest = getAllTestDetails.data.find(
          (test) => test.id === assignedTestId
        );
        setAssignedTest(filterAssignedTest);
      }
    } catch (error) {
      toast.error(`Error while getting test api: ${error}`);
    }
  };

  const patchCreateTest = async (data: PatchTestRequest): Promise<void> => {
    try {
      const getAllTestDetails = await apiService.patchTest(data);
      if (getAllTestDetails?.data?.id) {
        toast.success(`Successfully Created Test`);
      }
    } catch (error) {
      toast.error(`Error while getting test api: ${error}`);
    }
  };

  useEffect(() => {
    getAssignedTestDetails();
  }, [addedQuestionLists]);

  const navigate = useNavigate();

  return (
    <>
      <div className="d-flex flex-column gap-5 border-bottom shadow-sm p-4">
        <div className="px-2 d-flex justify-content-between">
          <span className="fs-5 fw-semibold">{assignedTest?.name}</span>
          <Button
            theme={"grey-dark"}
            size={"small"}
            buttonType={"outline"}
            icon={"x-lg"}
            extraClass={"p-1 rounded-circle"}
            onClick={() => navigate("/tech-admin")}
          />
        </div>
        <div className="px-2 d-flex justify-content-between">
          <div className="fs-6">{assignedTest?.description}</div>
          <Button
            theme={"primary"}
            size={"medium"}
            name={"Create Test"}
            extraClass={"fw-bold fs-7"}
            onClick={() =>
              patchCreateTest({
                id: assignedTestId as string,
                status: "CREATED",
                questions: selectedQuestionIDs,
              })
            }
          />
        </div>
      </div>
      <div
        className="d-flex flex-column gap-4 overflow-auto p-4"
        style={{ maxHeight: "35rem" }}
      >
        {addedQuestionLists.map((question: PostQuestionResponse) => {
          return (
            <div key={question?.id} className="card shadow-sm">
              <Button
                theme={"danger"}
                size={"small"}
                icon={"dash"}
                extraClass={
                  "p-0 position-absolute rounded-circle top-0 start-0 translate-middle"
                }
                onClick={() => filterSubQuestions(question.id)}
              />
              <div className="row g-0">
                <div className="card-body">
                  <div className="card-text d-flex flex-row gap-2 fs-6 mb-2">
                    <span>Q.</span>
                    <span>{question?.description}</span>
                  </div>
                  <div className="card-text d-flex justify-content-between fs-7 mb-2">
                    <div className="w-50">
                      <span className="me-2">A.</span>
                      <span className="me-2">
                        {question?.other_dependencies?.A}
                      </span>
                    </div>
                    <div className="w-50">
                      <span className="me-2">B.</span>
                      <span className="me-2">
                        {question?.other_dependencies?.B}
                      </span>
                    </div>
                  </div>
                  <div className="card-text d-flex justify-content-between fs-7 mb-2">
                    <div className="w-50">
                      <span className="me-2">C.</span>
                      <span className="me-2">
                        {question?.other_dependencies?.C}
                      </span>
                    </div>
                    <div className="w-50">
                      <span className="me-2">D.</span>
                      <span className="me-2">
                        {question?.other_dependencies?.D}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </>
  );
}

export default QuestionPanelLeft;
