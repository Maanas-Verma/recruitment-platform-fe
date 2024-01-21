import axios from "axios";
import { ReactElement, useEffect, useState } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { useLocation, useNavigate } from "react-router-dom";
import Button from "../../components/Button";
import { getUser } from "../../api-service/sessionStorage";
import { toast } from "react-toastify";
import apiService from "../../api-service/apiServices";
import {
  GetCandidateTestData,
  PatchCandidateResultData,
} from "../../interfaces/global.interfaces";

function CandidateTest(): ReactElement {
  const [candidateTestData, setCandidateTestData] =
    useState<GetCandidateTestData | null>(null);
  const [testName, setTestName] = useState<string>("");
  const [selectedQuestionId, setSelectedQuestionId] = useState<string>("");
  const [selectedOptions, setSelectedOptions] = useState<any>({});
  const [candidateResultData, setCandidateResultData] = useState<
    PatchCandidateResultData[]
  >([]);

  const methods = useForm<FormData>({
    mode: "all",
  });

  const navigate = useNavigate();
  const location = useLocation();

  const testId = location.state?.testId;
  const userId = location.state?.userId;

  const selectedQuestionData = candidateTestData?.questions.find(
    (question) => question.id === selectedQuestionId
  );

  const handleAllQuestionsSubmit = async (): Promise<void> => {
    await handleSaveAndNext();

    const updatedCandidateResultData = {
      test: candidateResultData[0]?.test || "",
      candidate: candidateResultData[0]?.candidate || "",
      questions: candidateResultData[0]?.questions || [],
    };

    try {
      const patchTestResponse = await apiService.patchCandidateTestData(
        updatedCandidateResultData
      );
      if (patchTestResponse?.data) {
        toast.success("Test Submitted Successfully!");
        navigate("/candidate-result", { state: { testId, userId } });
      }
    } catch (error) {
      toast.error("Unable to submit the test!");
    }
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

    setCandidateResultData((updatedData) => {
      return updatedData;
    });

    toast.success(`Option ${selectedOption} saved for the question.`);
  };

  useEffect(() => {
    const user = getUser();

    if (user.userType !== "candidate") {
      navigate("/");
      return;
    }

    const fetchCandidateTestData = async () => {
      try {
        const getTestResponse = await apiService.getCandidateTestData(testId);
        if (getTestResponse?.data) {
          setCandidateTestData(getTestResponse.data);
          setTestName(getTestResponse.data.name);
          setSelectedQuestionId(getTestResponse.data.questions[0].id);
        }
      } catch (error) {
        console.error("Error:", error);
      }
    };

    if (testId) {
      fetchCandidateTestData();
    }
  }, [testId]);

  return (
    <div className="container-fluid row p-0 m-0" style={{ height: "94vh" }}>
      <div className="col-10 p-0 align-items-stretch d-flex">
        {candidateTestData && (
          <div className="border border-1 rounded-2 m-4 me-2 align-items-stretch w-100 p-5 bg-white">
            {selectedQuestionId && selectedQuestionData ? (
              <div className="d-flex flex-column align-items-stretch h-100">
                <FormProvider {...methods}>
                  <form className="d-flex flex-column align-items-stretch h-100">
                    <div className="d-flex justify-content-between">
                      <h5>
                        Test Name:{" "}
                        <span className="text-secondary-dark">{testName}</span>
                      </h5>
                      <h5>Test ID: {testId}</h5>
                    </div>
                    <div className="d-flex flex-column justify-content-between mt-4">
                      <h5>{`${selectedQuestionId}. ${selectedQuestionData?.description}`}</h5>
                      <ol>
                        {Object.entries(
                          selectedQuestionData.other_dependencies
                        ).map(([optionKey, optionValue]) => (
                          <div key={optionKey} className="px-3 my-2">
                            <label htmlFor={optionKey}>
                              <div className="d-flex flex-row align-items-center">
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
                                <span className="ms-2">{optionValue}</span>
                              </div>
                            </label>
                          </div>
                        ))}
                      </ol>
                    </div>
                    <div className="my-auto"></div>
                    <div className="m-2 d-flex  justify-content-between gap-2">
                      <Button
                        submitType="button"
                        theme=""
                        size="small"
                        name="Save & Next"
                        buttonId=""
                        extraClass="btn btn-outline-dark btn-lg"
                        onClick={handleSaveAndNext}
                      />
                      <Button
                        submitType="button"
                        theme=""
                        size="small"
                        name="Clear Selection"
                        buttonId=""
                        extraClass="btn btn-outline-dark btn-lg"
                        onClick={handleClearSelection}
                      />
                    </div>
                  </form>
                </FormProvider>
              </div>
            ) : (
              "Test has been not assigned to you."
            )}
          </div>
        )}
      </div>

      <div className="col-2 p-0 align-items-stretch d-flex">
        <div className="border border-1 rounded-2 m-4 me-2 align-items-stretch w-100 p-5 bg-white">
          <FormProvider {...methods}>
            <form className="align-items-stretch d-flex h-100">
              <div className="d-flex flex-column align-items-stretch">
                <div className="d-flex flex-wrap justify-content-between mx-3">
                  {candidateTestData &&
                    candidateTestData.questions &&
                    (candidateTestData?.questions).map((questionData) => (
                      <div
                        className="d-flex justify-content-center m-1"
                        style={{ width: "60px" }}
                      >
                        <Button
                          key={questionData.id}
                          theme=""
                          buttonType="outline"
                          size="large"
                          name={questionData.id}
                          buttonId={`question-${questionData.id}`}
                          extraClass="m-2 btn-outline-dark"
                          onClick={() => setSelectedQuestionId(questionData.id)}
                          fullWidth
                        />
                      </div>
                    ))}
                </div>
                <div className="my-auto"></div>
                <div className="d-flex justify-content-end">
                  <Button
                    size="medium"
                    theme="primary"
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
    </div>
  );
}

export default CandidateTest;
