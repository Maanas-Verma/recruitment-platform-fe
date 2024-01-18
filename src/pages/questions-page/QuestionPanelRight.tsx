import { ReactElement, useEffect, useState } from "react";
import SearchBar from "../../components/SearchBar";
import Button from "../../components/Button";
import QuestionCreation from "./QuestionCreation";
import { QuestionCreationForm } from "../../interfaces/global.interfaces";

interface QuestionPanelRightProps {
  allQuestionLists: QuestionCreationForm[];
}

/**
 * Technical SideBar Component which loads side panel.
 *
 * @returns - Technical sidebar component return side panel.
 */
function QuestionPanelRight(props: QuestionPanelRightProps): ReactElement {
  const { allQuestionLists } = props;
  const [showCreateQuestion, setShowCreateQuestion] = useState<boolean>(false);
  const [filledForm, setFilledForm] = useState<QuestionCreationForm>({
    id: "",
    description: "",
    question_type: "",
    other_dependencies: {
      A: "",
      B: "",
      C: "",
      D: "",
    },
    correct_answer: "",
    created_at: "",
  });

  useEffect(() => {
    if (filledForm?.id) {
      allQuestionLists.push(filledForm);
      console.log(allQuestionLists); // debug
    }
  }, [filledForm]);

  return (
    <>
      <div className="d-flex flex-column gap-5 border-bottom shadow-sm p-4">
        <div className="px-2 fs-5 fw-semibold">Questions</div>
        <div className="d-flex justify-content-between">
          <SearchBar
            controlPlaceholder="Search by Skills"
            controlKey="skills"
            extraClass="fs-7 p-2"
          />
          <Button
            theme={"primary"}
            size={"medium"}
            name={"Create Question"}
            onClick={() => setShowCreateQuestion(true)}
            extraClass={"fw-bold fs-7"}
          />

          {showCreateQuestion ? (
            <QuestionCreation
              handleFilledForm={setFilledForm}
              handleClose={() => setShowCreateQuestion(false)}
            />
          ) : (
            ""
          )}
        </div>
      </div>
      <div
        className="d-flex flex-column gap-4 overflow-auto p-4"
        style={{ maxHeight: "35rem" }}
      >
        {allQuestionLists.map((question: QuestionCreationForm) => {
          return (
            <div key={question?.id} className="card shadow-sm">
              <Button
                theme={"primary"}
                size={"small"}
                icon={"plus"}
                extraClass={
                  "p-0 position-absolute rounded-circle top-0 start-0 translate-middle"
                }
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
                  <p className="card-text fs-7 mt-4">
                    <small className="text-muted">
                      Created at: <span>{question.created_at}</span>
                    </small>
                  </p>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </>
  );
}

export default QuestionPanelRight;
