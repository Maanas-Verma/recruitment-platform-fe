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
  const TestName = "React Test Response";

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
        <h5 className="fs-5 fw-semibold text-secondary-darker">{TestName}</h5>
      </div>
      <div className="d-flex align-items-stretch px-2 py-4">
        <table className="p-2 table table-responsive table-bordered border-grey-lighter rounded-2">
          <thead className="bg-lavender-lightest text-secondary-dark">
            <tr>
              <th>Questions</th>
              <th className="text-center">Your Response</th>
              <th className="text-center">Correct Response</th>
              <th className="text-center">Response Status</th>
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
                      <div className="fw-semibold">Q. {description}</div>
                      <div className="d-flex">
                        <ol className="flex-fill list-unstyled">
                          {Object.entries(other_dependencies).map(
                            ([optionKey, optionValue]) => (
                              <div key={optionKey} className="px-3 my-2">
                                <div className="d-flex flex-row align-items-center gap-2">
                                  <span>{optionKey}.</span>
                                  <span>{optionValue}</span>
                                </div>
                              </div>
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
                            className="fs-5 bi bi-x-circle-fill"
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
