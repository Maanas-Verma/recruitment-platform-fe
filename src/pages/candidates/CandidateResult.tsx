import { ReactElement, useEffect, useState } from "react";
import {
  FormProvider,
  useForm,
} from "react-hook-form";
import { useNavigate } from "react-router-dom";
import Button from "../../components/Button";

function CandidateResult(): ReactElement{
  const TestName = 'React Test'

  const getCandidateResultData: { // has to be fetched from api
    [key: string]: {
      question: string;
      options: { option_1: string; option_2: string };
      selectedOptionKey: string;
      correctOptionKey: string;
    };
  } = {
    question_1: {
      question: "HEHEH",
      options: {
        option_1: "a",
        option_2: "b",
      },
      selectedOptionKey: "option_1", 
      correctOptionKey: "option_2",
    },
    question_2: {
      question: "yo",
      options: {
        option_1: "c",
        option_2: "d",
      },
      selectedOptionKey: "", 
      correctOptionKey: "option_2",
    },
    question_3: {
      question: "nooo",
      options: {
        option_1: "e",
        option_2: "f",
      },
      selectedOptionKey: "option_2", 
      correctOptionKey: "option_2",
    },
    question_4: {
      question: "guess what",
      options: {
        option_1: "g",
        option_2: "h",
      },
      selectedOptionKey: "", 
      correctOptionKey: "option_2",
    },
    question_5: {
      question: "idk",
      options: {
        option_1: "i",
        option_2: "j",
      },
      selectedOptionKey: "option_1", 
      correctOptionKey: "option_2",
    },
    question_6: {
      question: "ezheikel here",
      options: {
        option_1: "k",
        option_2: "l",
      },
      selectedOptionKey: "option_2", 
      correctOptionKey: "option_2",
    },
  }

  return(
    <div className="d-flex flex-column">
      <div>
      {TestName}
      </div>
      <table className="p-2">
        <thead>
          <tr className="d-flex flex-row justify-content-around">
            <th>
              Questions
            </th>
            <th>
              Your Response
            </th>
            <th>
              Correct Response
            </th>
            <th>
              Response Status
            </th>
          </tr>
        </thead>
        <tbody>
        {Object.keys(getCandidateResultData).map((questionId) => {
            const {
              question,
              options,
              selectedOptionKey,
              correctOptionKey,
            } = getCandidateResultData[questionId];

            const isResponseCorrect = selectedOptionKey === correctOptionKey;

            return (
              <tr key={questionId} className="d-flex flex-row justify-content-around">
                <td>
                  <div>
                  Q. {question}
                  </div>
                  <div>
                  <ol>
                      {Object.entries(options).map(([optionKey, optionValue]) => (
                        <li key={optionKey}>
                          {optionValue}
                        </li>
                      ))}
                    </ol>
                  </div>
                </td>
                <td>{selectedOptionKey}</td>
                <td>{correctOptionKey}</td>
                <td>{isResponseCorrect ? "Correct" : "Incorrect"}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  )
}

export default CandidateResult;
