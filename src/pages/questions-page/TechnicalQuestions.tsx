import { ReactElement } from "react";
import { QuestionCreationForm } from "../../interfaces/global.interfaces";
import QuestionPanelRight from "./QuestionPanelRight";
import QuestionPanelLeft from "./QuestionPanelLeft";

/**
 * Technical Page Component which loads whole technical page.
 *
 * @returns - Technical page component return react element.
 */
function TechnicalQuestions(): ReactElement {
  // temporary hold create new question
  const allQuestionLists: Array<QuestionCreationForm> = [];
  // const [allQuestionLists, setAllQuestionLists] = useState<TechnicalData[]>([]);

  return (
    <div className="container-fluid row p-0 m-0" style={{ height: "94vh" }}>
      <div className="col-8 p-0 align-items-stretch d-flex">
        <div className="border border-1 rounded-3 m-4 ms-2 align-items-stretch w-100 bg-white">
          <QuestionPanelLeft allQuestionLists={allQuestionLists} />
        </div>
      </div>
      <div className="col-4 p-0 align-items-stretch d-flex">
        <div className="border border-1 rounded-3 m-4 me-2 align-items-stretch w-100 bg-white">
          <QuestionPanelRight allQuestionLists={allQuestionLists} />
        </div>
      </div>
    </div>
  );
}

export default TechnicalQuestions;
