import { ReactElement, SetStateAction, useEffect } from "react";
import { PostQuestionResponse } from "../../interfaces/global.interfaces";
import Button from "../../components/Button";
import { toast } from "react-toastify";

interface QuestionPanelLeftProps {
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
    addedQuestionLists,
    countIDLength,
    setCountIDLength,
    selectedQuestionIDs,
    setSelectedQuestionIDs,
  } = props;

  const filterSubQuestions = (selectedID: string): void => {
    if (selectedQuestionIDs) {
      const newParsedQuestionIDs = selectedQuestionIDs.filter(
        (id) => selectedID !== id
      );
      setSelectedQuestionIDs(newParsedQuestionIDs);
      setCountIDLength(() => countIDLength - 1);
      toast.success(`Removed Question`);
    }
  };

  useEffect(() => {
    console.log("leftPanel", selectedQuestionIDs);
  }, [addedQuestionLists]);

  return (
    <>
      <div className="d-flex flex-column gap-5 border-bottom shadow-sm p-4">
        <div className="px-2 fs-5 fw-semibold">Quant</div>
        <div className="px-2 d-flex justify-content-between">
          <div className="fs-6">
            Long Description of the test - This part of the tutorial is about
            core JavaScript, the language itself.
          </div>
          <Button
            theme={"primary"}
            size={"medium"}
            name={"Create Test"}
            extraClass={"fw-bold fs-7"}
            onClick={() => {}} // Add API after login done
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
