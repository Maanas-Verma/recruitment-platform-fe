import axios from "axios";
import { ReactElement, useEffect, useState } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { useLocation, useNavigate } from "react-router-dom";
import Button from "../../components/Button";
import { getUser } from "../../api-service/sessionStorage";
import { toast } from "react-toastify";

interface OtherDependencies {
  [key: string]: string;
}

interface Question {
  id: string;
  created_at: string;
  description: string;
  question_type: string;
  tags: string[] | null;
  correct_answer: string;
  other_dependencies: OtherDependencies;
}

interface QuestionSelection {
  id: string;
  selectedOptionKey: string;
}

interface CandidateTestData {
  id: string;
  conduced_on: string | null;
  created_at: string;
  modified_at: string;
  created_by: string | null;
  assigned_to: string | null;
  name: string;
  description: string;
  status: string;
  questions: Question[];
}

interface CandidateResultData {
  test: string;
  candidate: string;
  questions: QuestionSelection[];
}

function CandidateTest(): ReactElement {
  const navigate = useNavigate();
  const methods = useForm<FormData>({
    mode: "all",
  });
  const location = useLocation();
  const testId = location.state?.testId;
  const userId = location.state?.userId;
  const [candidateTestData, setCandidateTestData] =
    useState<CandidateTestData | null>(null);

  const [testName, setTestName] = useState<string>("");
  const [selectedQuestionId, setSelectedQuestionId] = useState<string>("");
  const [selectedOptions, setSelectedOptions] = useState<any>({});
  const [candidateResultData, setCandidateResultData] = useState<
    CandidateResultData[]
  >([]);

  const selectedQuestionData = candidateTestData?.questions.find(
    (question) => question.id === selectedQuestionId
  );

  const handleAllQuestionsSubmit = async () => {
    console.log("All questions Submit called");
    await handleSaveAndNext();

    const updatedCandidateResultData = {
      test: candidateResultData[0]?.test || "",
      candidate: candidateResultData[0]?.candidate || "",
      questions: candidateResultData[0]?.questions || [],
    };

    console.log("Submit clicked:", updatedCandidateResultData);

    axios
      .patch(
        "http://13.233.194.145:8000/test_app/test_response/",
        updatedCandidateResultData
      )
      .then((response) => {
        console.log("Response from server:", response);
        toast.success("Test Submitted Successfully!");
        navigate('/candidate-result', { state: { testId, userId} })
      })
      .catch((error) => {
        toast.error("Unable to submit the test!");
        console.error("Error submitting data:", error);
      });
  };

  const handleOptionSelect = (optionId: string) => {
    setSelectedOptions((prevOption: any) => ({
      ...prevOption,
      [selectedQuestionId]: optionId,
    }));
  };

  const handleClearSelection = () => {
    setSelectedOptions((prevOptions: any) => ({
      ...prevOptions,
      [selectedQuestionId]: null,
    }));
  };

  const handleSaveAndNext = () => {
    const currentQuestionId = selectedQuestionId;
    const selectedOption = selectedOptions[currentQuestionId] ?? "";

    if (candidateTestData) {
      const testIndex = candidateResultData.findIndex(
        (resultData) => resultData.test === candidateTestData.id
      );

      const questionIndex =
        testIndex !== -1
          ? candidateResultData[testIndex].questions.findIndex(
              (question) => question.id === currentQuestionId
            )
          : -1;

      if (testIndex !== -1 && questionIndex !== -1) {
        setCandidateResultData((prevData) => {
          const updatedData = [...prevData];
          updatedData[testIndex].questions[questionIndex] = {
            id: currentQuestionId,
            selectedOptionKey: selectedOption,
          };
          return updatedData;
        });
      } else if (testIndex !== -1) {
        // Add new question to an existing test
        setCandidateResultData((prevData) => {
          const updatedData = [...prevData];
          updatedData[testIndex].questions.push({
            id: currentQuestionId,
            selectedOptionKey: selectedOption,
          });
          return updatedData;
        });
      } else {
        // Add a new test with a question
        setCandidateResultData((prevData) => [
          ...prevData,
          {
            test: candidateTestData.id,
            candidate: userId || null,
            questions: [
              {
                id: currentQuestionId,
                selectedOptionKey: selectedOption,
              },
            ],
          },
        ]);
      }
    }

    console.log(
      "Save & Next clicked. Selected Option:",
      selectedOption,
      "for question:",
      currentQuestionId
    );

    setCandidateResultData((updatedData) => {
      console.log("Updated Result Data:", updatedData);
      return updatedData;
    });
  };

  useEffect(() => {
    const fetchCandidateTestData = async () => {
      try {
        const response = await axios.get(
          `http://13.233.194.145:8000/test_app/test/get-test-by-id?id=${testId}`
        );
        setCandidateTestData(response.data);
        setTestName(response.data.name);
        setSelectedQuestionId(response.data.questions[0].id);
      } catch (error) {
        console.error("Error fetching candidate test data:", error);
      }
    };

    if (testId) {
      fetchCandidateTestData();
    }

    const user = getUser();
    if (user.userType !== "candidate") {
      navigate("/");
      return;
    }
  }, [testId]);

  useEffect(() => {
    const user = getUser();
    if (user.userType !== "candidate") {
      navigate("/");
      return;
    }
  }, []);

  return (
    <div className="d-flex flex-row justify-content-between gap-1">
      {candidateTestData && (
        <div className="d-flex col-8 flex-column border border-1 border-dark rounded p-3">
          <p>Test ID: {testId}</p>
          <div>{testName}</div>
          {selectedQuestionId && selectedQuestionData && (
            <div className="d-flex flex-column">
              <FormProvider {...methods}>
                <form>
                  <div className="d-flex flex-column">
                    <strong>{`${selectedQuestionId}. ${selectedQuestionData?.description}`}</strong>
                    <ol>
                      {Object.entries(
                        selectedQuestionData.other_dependencies
                      ).map(([optionKey, optionValue]) => (
                        <li key={optionKey}>
                          <label htmlFor={optionKey}>
                            <div>
                              <input
                                type="radio"
                                id={optionKey}
                                name={selectedQuestionId}
                                value={optionKey}
                                checked={
                                  selectedOptions &&
                                  selectedOptions[selectedQuestionId] ===
                                    optionKey
                                }
                                onChange={() => handleOptionSelect(optionKey)}
                              />
                              {optionValue}
                            </div>
                          </label>
                        </li>
                      ))}
                    </ol>
                    <div className="m-2 d-flex gap-2">
                      <Button
                        submitType="button"
                        theme=""
                        size="small"
                        name="Clear Selection"
                        buttonId=""
                        extraClass="btn btn-outline-dark btn-lg"
                        onClick={handleClearSelection}
                      />
                      <Button
                        submitType="button"
                        theme=""
                        size="small"
                        name="Save & Next"
                        buttonId=""
                        extraClass="btn btn-outline-dark btn-lg"
                        onClick={handleSaveAndNext}
                      />
                    </div>
                  </div>
                </form>
              </FormProvider>
            </div>
          )}
        </div>
      )}

      <div className="d-flex col-4 border border-1 border-dark rounded p-3">
        <FormProvider {...methods}>
          <form>
            <div className="">
              <div className="d-flex flex-wrap">
                {candidateTestData &&
                  candidateTestData.questions &&
                  (candidateTestData?.questions).map((questionData) => (
                    <Button
                      key={questionData.id}
                      theme=""
                      size="small"
                      name={questionData.id}
                      buttonId={`question-${questionData.id}`}
                      extraClass="btn btn-outline-dark btn-sm m-1"
                      onClick={() => setSelectedQuestionId(questionData.id)}
                    />
                  ))}
              </div>
              <div className="">
                <Button
                  size="small"
                  theme=""
                  name="Submit"
                  buttonId="section-form-submit-btn"
                  extraClass="btn btn-outline-success btn-sm"
                  onClick={handleAllQuestionsSubmit}
                />
              </div>
            </div>
          </form>
        </FormProvider>
      </div>
    </div>
  );
}

export default CandidateTest;
