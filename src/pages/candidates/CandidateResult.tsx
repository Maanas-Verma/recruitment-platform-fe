import axios from "axios";
import { ReactElement, useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { getUser } from "../../api-service/sessionStorage";
import {
  GetCandidateResultData,
  QuestionData,
} from "../../interfaces/global.interfaces";
import apiService from "../../api-service/apiServices";

function CandidateResult(): ReactElement {
  const [resultData, setResultData] = useState<GetCandidateResultData | null>(
    null
  );
  const TestName = "React Test";

  const navigate = useNavigate();
  const location = useLocation();
  const testId = location.state?.testId;
  const userId = location.state?.userId;

  const fetchData = async (): Promise<void> => {
    try {
      const resultResponse = await apiService.getCandidateResultData(userId);
      if (resultResponse?.data) {
        setResultData(resultResponse.data);
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    const user = getUser();
    if (user.userType !== "candidate") {
      navigate("/");
      return;
    }
    if (userId) {
      fetchData();
    }
  }, [userId]);

  return (
    <div className="d-flex flex-column container-fluid row p-0 m-0">
      <div className="mt-5 mb-3">
        <strong className="fs-5">{TestName}</strong>
      </div>
      <div className="p-2 align-items-stretch d-flex">
        <table className="p-2 table table-responsive table-bordered">
          <thead className="text-secondary-dark">
            <tr>
              <th>Questions</th>
              <th>Your Response</th>
              <th>Correct Response</th>
              <th>Response Status</th>
            </tr>
          </thead>
          <tbody>
            {resultData &&
              resultData.data.map((questionData: QuestionData) => {
                const {
                  id,
                  description,
                  other_dependencies,
                  correct_answer,
                  selected_answer,
                } = questionData;

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
                      <div className="d-flex align-items-stretch">
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
                    <td className="align-middle">
                      <div className="text-center">{selectedOptionKey}</div>
                    </td>
                    <td className="align-middle">
                      <div className="text-center">{correct_answer}</div>
                    </td>
                    <td className="align-middle">
                      <div className="text-center">
                        {hasResponse && isResponseCorrect ? (
                          <i
                            className="fs-5 bi bi-check-circle-fill text-green"
                            style={{ color: "green" }}
                          ></i>
                        ) : hasResponse && !isResponseCorrect ? (
                          <i
                            className="fs-5 bi bi-x"
                            style={{ color: "red" }}
                          ></i>
                        ) : null}
                      </div>
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
