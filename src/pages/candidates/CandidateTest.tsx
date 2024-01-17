import { ReactElement, useEffect, useState } from "react";
import {
  FormProvider,
  useForm
} from "react-hook-form";
import { useNavigate } from "react-router-dom";
import Button from "../../components/Button";

interface FormData {
  [key: string]: string | null;
}

function CandidateTest(): ReactElement {
  const methods = useForm<FormData>({
    mode: "all",
  });

  const navigate = useNavigate();

  const getAllQuestionData: { // has to be fetched from api
    [key: string]: {
      question: string;
      options: { option_1: string; option_2: string };
      selectedOptionKey: string;
    };
  } = {
    question_1: {
      question: "HEHEH",
      options: {
        option_1: "a",
        option_2: "b",
      },
      selectedOptionKey: "option_1", 
    },
    question_2: {
      question: "yo",
      options: {
        option_1: "c",
        option_2: "d",
      },
      selectedOptionKey: "", 
    },
    question_3: {
      question: "nooo",
      options: {
        option_1: "e",
        option_2: "f",
      },
      selectedOptionKey: "option_2", 
    },
    question_4: {
      question: "guess what",
      options: {
        option_1: "g",
        option_2: "h",
      },
      selectedOptionKey: "", 
    },
    question_5: {
      question: "idk",
      options: {
        option_1: "i",
        option_2: "j",
      },
      selectedOptionKey: "option_1", 
    },
    question_6: {
      question: "ezheikel here",
      options: {
        option_1: "k",
        option_2: "l",
      },
      selectedOptionKey: "option_2", 
    },
  };

  const [selectedQuestionId, setSelectedQuestionId] =
    useState<string>("question_1");
  const selectedQuestionData = getAllQuestionData[selectedQuestionId];

  const [selectedOptions, setSelectedOptions] = useState<FormData>({});

  useEffect(() => {
    setSelectedOptions((prevOptions) => ({
      ...prevOptions,
      [selectedQuestionId]: selectedQuestionData.selectedOptionKey || null,
    }));
  }, [selectedQuestionData.selectedOptionKey, selectedQuestionId]);

  const handleOptionSelect = (optionKey: string) => {
    setSelectedOptions((prevOptions) => ({
      ...prevOptions,
      [selectedQuestionId]: optionKey,
    }));
  };

  const handleClearSelection = () => {
    setSelectedOptions((prevOptions) => ({
      ...prevOptions,
      [selectedQuestionId]: null,
    }));
  };

  const handleSaveAndNext = () => { //should call patch api with that option (if any where null means response not marked)for that question
    const currentQuestionId = selectedQuestionId;
    const selectedOption = selectedOptions[currentQuestionId];
    // TODO: Implement logic to save the response using the patch api call
    console.log("Save & Next clicked. Selected Option:", selectedOption, "for question:", currentQuestionId);
  };

  const handleAllQuestionsSubmit = () => {
    const allFormData = Object.keys(getAllQuestionData).reduce(
      (acc, questionId) => {
        const questionData = getAllQuestionData[questionId];
        const questionKey = `question_${questionId}`;
        acc[questionKey] = {
          question: questionData.question,
          selectedOption: selectedOptions[questionId] || null,
        };
        return acc;
      },
      {} as { [key: string]: { question: string; selectedOption: string | null } }
    );

    console.log(allFormData);
    submitFormData(allFormData);
    
  };
  
  const submitFormData = (formData: any) => {
    console.log("Submitting form data:", formData);
    alert('You will be navigated to result page now.')
    navigate('/result');
    // axios.post('api-endpoint', formData)
    //   .then(response => {
    //     console.log("Form data submitted successfully:", response.data);
    //   })
    //   .catch(error => {
    //     console.error("Error submitting form data:", error);
    //   });
  };
  
  useEffect(() => {
    console.log("getAllQuestionData changed:", getAllQuestionData);
  }, [getAllQuestionData]);

  return (
    <div className="d-flex flex-row">
      {selectedQuestionId && (
        <FormProvider {...methods}>
          <form>
            <div className="d-flex flex-column">
              <strong>{selectedQuestionData.question}</strong>
              <ol>
                {Object.entries(selectedQuestionData.options).map(
                  ([optionKey, optionValue]) => (
                    <li key={optionKey}>
                      <label htmlFor={optionKey}>
                        <div>
                          <input
                            type="radio"
                            id={optionKey}
                            name={selectedQuestionId}
                            value={optionKey}
                            checked={selectedOptions[selectedQuestionId] === optionKey}
                            onChange={() => handleOptionSelect(optionKey)}
                          />
                          {optionValue}
                        </div>
                      </label>
                    </li>
                  )
                )}
              </ol>
              <div>
                <button type="button" onClick={handleClearSelection}>
                  Clear Selection
                </button>
                <button type="button" onClick={handleSaveAndNext}>
                  Save & Next
                </button>
              </div>
            </div>
          </form>
        </FormProvider>
      )}
      <div className="d-flex">
        <FormProvider {...methods}>
          <form>
            <div className="container">
              <div className="row">
                {Object.keys(getAllQuestionData).map((questionId) => (
                  <Button
                    key={questionId}
                    theme="primary"
                    size="small"
                    name={questionId}
                    buttonId={`question-${questionId}`}
                    onClick={() => setSelectedQuestionId(questionId)}
                  />
                ))}
              </div>
              <div className="">
                <Button
                  size="small"
                  theme="primary"
                  name="Submit"
                  buttonId="section-form-submit-btn"
                  extraClass="fs-6"
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
