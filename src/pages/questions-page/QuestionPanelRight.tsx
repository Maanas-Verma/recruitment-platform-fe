import { ReactElement, SetStateAction, useEffect, useState } from "react";
import SearchBar from "../../components/SearchBar";
import Button from "../../components/Button";
import QuestionCreation from "./QuestionCreation";
import apiService from "../../api-service/apiServices";
import { toast } from "react-toastify";
import { AxiosError } from "axios";
import { PostQuestionResponse } from "../../interfaces/global.interfaces";
import TagControl from "../../components/TagControl";

interface QuestionPanelRightProps {
  countIDLength: number;
  setCountIDLength: React.Dispatch<SetStateAction<number>>;
  selectedQuestionIDs: string[];
  setSelectedQuestionIDs: React.Dispatch<SetStateAction<string[]>>;
}

/**
 * Technical SideBar Component which loads side panel.
 *
 * @returns - Technical sidebar component return side panel.
 */
function QuestionPanelRight(props: QuestionPanelRightProps): ReactElement {
  const {
    countIDLength,
    setCountIDLength,
    selectedQuestionIDs,
    setSelectedQuestionIDs,
  } = props;

  const [allQuestionArray, setAllQuestionArray] = useState<
    PostQuestionResponse[]
  >([]);

  const [showCreateQuestion, setShowCreateQuestion] = useState<boolean>(false);
  const [totalQuestionCount, setTotalQuestionCount] = useState(0);

  const filterAddQuestions = (selectedID: string): void => {
    if (selectedQuestionIDs) {
      selectedQuestionIDs.push(selectedID);
      setSelectedQuestionIDs(selectedQuestionIDs);
      setCountIDLength(() => countIDLength + 1);
    }
  };

  const fetchAllQuestionsArray = async (): Promise<void> => {
    try {
      const getQuestionResponse = await apiService.getQuestion();
      if (getQuestionResponse?.data) {
        setAllQuestionArray(getQuestionResponse.data);
        setTotalQuestionCount(getQuestionResponse.data.length);
      }
    } catch (error) {
      const errors = error as Error | AxiosError;
      toast.error(errors?.message);
    }
  };

  useEffect(() => {
    fetchAllQuestionsArray();
  }, [totalQuestionCount]);

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
              totalQuestionCount={totalQuestionCount}
              handleQuestionsCount={setTotalQuestionCount}
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
        {allQuestionArray?.map((question: PostQuestionResponse) => {
          return (
            <div key={question?.id} className="card shadow-sm">
              <Button
                theme={"primary"}
                size={"small"}
                icon={"plus"}
                extraClass={
                  "p-0 position-absolute rounded-circle top-0 start-0 translate-middle"
                }
                onClick={() => filterAddQuestions(question.id)}
              />
              <div className="row g-0">
                <div className="card-body">
                  <div className="card-text d-flex flex-row gap-2 fs-6 mb-2 fw-light">
                    <span>Q.</span>
                    <span>{question?.description}</span>
                  </div>
                  <div className="card-text d-flex justify-content-between fs-7 mb-2 fw-light">
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
                  <div className="card-text d-flex justify-content-between fs-7 mb-2 fw-light">
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
                  <div className="card-text fs-7 mt-4">
                    <div className="d-flex flex-row gap-2">
                      {question?.tags?.map((tag: string) => {
                        return (
                          <div key={`key-${tag}`}>
                            <TagControl
                              text={tag}
                              tagType={"badge"}
                              bgTheme={"danger-lighter"}
                              textTheme={"white"}
                            />
                          </div>
                        );
                      })}
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

export default QuestionPanelRight;
