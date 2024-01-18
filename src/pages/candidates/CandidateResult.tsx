import axios from "axios";
import { ReactElement, useEffect, useState } from "react";

interface QuestionData {
  id: string;
  description: string;
  other_dependencies: {
    [key: string]: string;
  };
  correct_answer: string;
  selected_answer: string;
}

interface FetchedResultData {
  candidate_id: string;
  data: QuestionData[];
}

function CandidateResult(): ReactElement {
  const [resultData, setResultData] = useState<FetchedResultData | null>(null);
  const TestName = "React Test";
  const candidateId = 1;

  const fetchData = async () => {
    try {
      const response = await axios.get(
        `http://13.233.194.145:8000/test_app/get_candidate_test_response/${candidateId}`
      );
      setResultData(response.data);
      console.log("Response:", response.data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    if (candidateId) {
      fetchData();
    }
  }, [candidateId]);

  console.log('resultData: ', resultData);
  

  return (
    <div className="d-flex flex-column container-fluid row p-0 m-0">
      <div>
        <strong>{TestName}</strong>
      </div>
      <div className="p-2 align-items-stretch d-flex">
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
            {resultData &&
              resultData.data.map((questionData: any) => {
                const { id, description, other_dependencies, correct_answer, selected_answer } =
                  questionData;

                const questionId = `question_${id}`;

                const selectedOptionKey = selected_answer || "";
                const isResponseCorrect = selectedOptionKey === correct_answer;
                const hasResponse =
                  selectedOptionKey && selectedOptionKey.trim() !== "";

                return (
                  <tr key={questionId}>
                    <td>
                      <div>
                        <strong>Q. {description}</strong>
                      </div>
                      <div className="d-flex flex-wrap">
                        <ol className="list-unstyled">
                          {Object.entries(other_dependencies).map(
                            ([optionKey, optionValue]) => (
                              <li key={optionKey} className="col-md-6">
                                <div>{`${optionKey}: ${optionValue}`}</div>
                              </li>
                            )
                          )}
                        </ol>
                      </div>
                    </td>
                    <td>{selectedOptionKey}</td>
                    <td>{correct_answer}</td>
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
    </div>
  );
}

export default CandidateResult;
