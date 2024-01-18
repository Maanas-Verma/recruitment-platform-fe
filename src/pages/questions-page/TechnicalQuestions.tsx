import { ReactElement, SetStateAction, useEffect, useState } from "react";
import { PostQuestionResponse } from "../../interfaces/global.interfaces";
import QuestionPanelRight from "./QuestionPanelRight";
import QuestionPanelLeft from "./QuestionPanelLeft";
import apiService from "../../api-service/apiServices";
import { AxiosError } from "axios";
import { toast } from "react-toastify";

/**
 * Technical Page Component which loads whole technical page.
 *
 * @returns - Technical page component return react element.
 */
function TechnicalQuestions(): ReactElement {
  const [addedQuestionList, setAddedQuestionList] = useState<
    PostQuestionResponse[]
  >([]);
  const [countIDLength, setCountIDLength] = useState<number>(0);
  const [selectedQuestionIDs, setSelectedQuestionIDs] = useState<string[]>([]);

  const filterUpdatedQuestionsList = async (
    questionArray: string[]
  ): Promise<void> => {
    try {
      const getQuestionResponse = await apiService.getQuestion();
      if (getQuestionResponse?.data) {
        const updatedQuestionList = getQuestionResponse.data.filter(
          (response) => questionArray.includes(response.id)
        );
        setAddedQuestionList(updatedQuestionList);
      }
    } catch (error) {
      const errors = error as Error | AxiosError;
      toast.error(errors?.message);
    }
  };

  useEffect(() => {
    filterUpdatedQuestionsList(selectedQuestionIDs);
  }, [countIDLength]);

  return (
    <div className="container-fluid row p-0 m-0" style={{ height: "94vh" }}>
      <div className="col-8 p-0 align-items-stretch d-flex">
        <div className="border border-1 rounded-3 m-4 ms-2 align-items-stretch w-100 bg-white">
          <QuestionPanelLeft
            countIDLength={countIDLength}
            setCountIDLength={setCountIDLength}
            selectedQuestionIDs={selectedQuestionIDs}
            setSelectedQuestionIDs={setSelectedQuestionIDs}
            addedQuestionLists={addedQuestionList}
          />
        </div>
      </div>
      <div className="col-4 p-0 align-items-stretch d-flex">
        <div className="border border-1 rounded-3 m-4 me-2 align-items-stretch w-100 bg-white">
          <QuestionPanelRight
            countIDLength={countIDLength}
            setCountIDLength={setCountIDLength}
            selectedQuestionIDs={selectedQuestionIDs}
            setSelectedQuestionIDs={setSelectedQuestionIDs}
          />
        </div>
      </div>
    </div>
  );
}

export default TechnicalQuestions;
