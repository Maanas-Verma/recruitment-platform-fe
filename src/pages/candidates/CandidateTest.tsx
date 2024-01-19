import axios from "axios";
import { ReactElement, useEffect, useState } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { useLocation, useNavigate } from "react-router-dom";
import Button from "../../components/Button";


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
  const methods = useForm<FormData>({
    mode: "all",
  });
  const location = useLocation();
  const testId = location.state?.testId;
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

  const handleAllQuestionsSubmit = () => {
    console.log("All questions Submit called");
    // call post api

console.log("Subkit clciked: ", candidateResultData);

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
  
    const questionIndex = candidateResultData.findIndex((resultData) =>
      resultData.questions.some((question) => question.id === currentQuestionId)
    );
  
    if (questionIndex !== -1) {
      setCandidateResultData((prevData) =>
        prevData.map((resultData, index) =>
          index === questionIndex
            ? {
                ...resultData,
                questions: resultData.questions.map((question) =>
                  question.id === currentQuestionId
                    ? { ...question, selectedOptionKey: selectedOption }
                    : question
                ),
              }
            : resultData
        )
      );
    } else {
      setCandidateResultData((prevData) => [
        ...prevData,
        {
          test: fetchedCandidateTestData.id,
          candidate: fetchedCandidateTestData.assigned_to || "",
          questions: [
            {
              id: currentQuestionId,
              selectedOptionKey: selectedOption,
            },
          ],
        },
      ]);
    }
  
    console.log(
      "Save & Next clicked. Selected Option:",
      selectedOption,
      "for question:",
      currentQuestionId
    );
  
    // Use the callback to log the updated state
    setCandidateResultData((updatedData) => {
      console.log("Updated Result Data:", updatedData);
      return updatedData;
    });
  };
  

  // const fetchCandidateTestData = async () => {
  //   try {
  //     const response = await axios.get(
  //       `http://13.233.194.145:8000/test_app/test/get-test-by-id?id=${testId}`
  //     );
  //     setCandidateTestData(response.data);
  //     console.log("candidate test data:", response.data);
  //   } catch (error) {
  //     console.error("Error fetching candidate test data:", error);
  //   }
  // };

  // useEffect(() => {
  //   if (testId) {
  //     fetchCandidateTestData();
  //   }
  // }, [testId]);

  // console.log('Candidate Test Data: ', candidateTestData);

  const fetchedCandidateTestData = {
    id: "1",
    conduced_on: null,
    created_at: "2024-01-18 11:33:57.509280+00:00",
    modified_at: "2024-01-18 14:18:39.656435+00:00",
    created_by: null,
    assigned_to: null,
    name: "Sample1",
    description: "Sample test",
    status: "PENDING",
    questions: [
      {
        id: "3",
        created_at: "2024-01-18 11:54:07.219410+00:00",
        description: "What is the primary goal of financial management?",
        question_type: "MCQ",
        tags: null,
        correct_answer: "A",
        other_dependencies: {
          A: "Maximize shareholder wealth",
          B: "Minimize employee turnover",
          C: "Increase market share",
          D: "Reduce product costs",
        },
      },
      {
        id: "4",
        created_at: "2024-01-18 11:54:07.319270+00:00",
        description:
          "Which financial statement represents a company's financial position at a specific point in time?",
        question_type: "MCQ",
        tags: null,
        correct_answer: "C",
        other_dependencies: {
          A: "Income statement",
          B: "Statement of cash flows",
          C: "Balance sheet",
          D: "Statement of retained earnings",
        },
      },
      {
        id: "5",
        created_at: "2024-01-18 11:54:07.421706+00:00",
        description:
          "What is the formula for calculating the Net Present Value (NPV) of a project?",
        question_type: "MCQ",
        tags: null,
        correct_answer: "B",
        other_dependencies: {
          A: "NPV = Initial Investment / Discount Rate",
          B: "NPV = Future Cash Flows - Initial Investment",
          C: "NPV = Discount Rate / Initial Investment",
          D: "NPV = Initial Investment x Discount Rate",
        },
      },
      {
        id: "6",
        created_at: "2024-01-18 11:54:07.523889+00:00",
        description:
          'In finance, what does the term "diversification" refer to?',
        question_type: "MCQ",
        tags: null,
        correct_answer: "B",
        other_dependencies: {
          A: "Concentrating investments in a single asset",
          B: "Spreading investments across different assets",
          C: "Increasing the risk of a portfolio",
          D: "Ignoring market trends",
        },
      },
      {
        id: "7",
        created_at: "2024-01-18 11:54:07.631930+00:00",
        description:
          'What does the term "liquidity" represent in the context of financial markets?',
        question_type: "MCQ",
        tags: null,
        correct_answer: "A",
        other_dependencies: {
          A: "Ability to buy and sell assets quickly without causing a significant price change",
          B: "Total value of a company's assets",
          C: "Long-term financial stability",
          D: "Profitability ratio of a firm",
        },
      },
      {
        id: "8",
        created_at: "2024-01-18 11:54:07.747007+00:00",
        description:
          "What is the formula for calculating the Price-Earnings (P/E) ratio?",
        question_type: "MCQ",
        tags: null,
        correct_answer: "A",
        other_dependencies: {
          A: "P/E = Market Price per Share / Earnings per Share",
          B: "P/E = Earnings per Share / Market Price per Share",
          C: "P/E = Dividends per Share / Earnings per Share",
          D: "P/E = Earnings per Share x Dividends per Share",
        },
      },
    ],
  };

  useEffect(() => {
    // const fetchCandidateTestData = async () => {
    //   try {
    //     const response = await axios.get(
    //       `http://13.233.194.145:8000/test_app/test/get-test-by-id?id=${testId}`
    //     );
    //     setCandidateTestData(response.data);
    //     console.log("candidate test data:", response.data);
    //   } catch (error) {
    //     console.error("Error fetching candidate test data:", error);
    //   }
    // };
    // Uncomment the following if statement to fetch data dynamically
    // if (testId) {
    //   fetchCandidateTestData();
    // }
    setCandidateTestData(fetchedCandidateTestData);
    setTestName(fetchedCandidateTestData.name);
    setSelectedQuestionId(fetchedCandidateTestData.questions[0].id);
  }, [testId]);

  return (
    <div className="d-flex flex-row justify-content-between gap-1">
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
