import { ReactElement } from "react";

interface CandidateResultData {
  [key: string]: {
    question: string;
    options: { option_1: string; option_2: string };
    selectedOptionKey: string;
    correctOptionKey: string;
  };
}

function CandidateResult(): ReactElement {
  const TestName = "React Test";

  const getCandidateResultData: CandidateResultData = {
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
  };

  return (
    <div className="d-flex flex-column">
      <div><strong>{TestName}</strong></div>
      <table className="p-2 table table-bordered">
        <thead>
          <tr>
            <th>Questions</th>
            <th>Your Response</th>
            <th>Correct Response</th>
            <th>Response Status</th>
          </tr>
        </thead>
        <tbody>
          {Object.keys(getCandidateResultData).map((questionId) => {
            const { question, options, selectedOptionKey, correctOptionKey } =
              getCandidateResultData[questionId];

            const isResponseCorrect = selectedOptionKey === correctOptionKey;
            const hasResponse =
              selectedOptionKey && selectedOptionKey.trim() !== "";

            return (
              <tr key={questionId}>
                <td>
                  <div>
                    <strong>Q. {question}</strong>
                  </div>
                  <div>
                    <ol className="list-unstyled">
                      {Object.entries(options).map(
                        ([optionKey, optionValue]) => (
                          <li key={optionKey}>
                            {optionKey}: {optionValue}
                          </li>
                        )
                      )}
                    </ol>
                  </div>
                </td>
                <td>{selectedOptionKey}</td>
                <td>{correctOptionKey}</td>
                <td>
                  {hasResponse && isResponseCorrect ? (
                    <i
                      className="bi bi-check-circle-fill "
                      style={{ color: "green" }}
                    ></i>
                  ) : hasResponse && !isResponseCorrect ? (
                    <i className="bi bi-x" style={{ color: "red" }}></i>
                  ) : null}
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}

export default CandidateResult;
