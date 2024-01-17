import { ReactElement, useEffect, useState } from "react";
import utils from "../utilities/application-utils";
import CandidateSideBar from "./CandidateSideBar";
import CandidateSection from "./CandidateSection";
import { CandidatesData } from "../../interfaces/global.interfaces";

/**
 * Test Component which loads test details table.
 *
 * @returns - Test component HTML with test details.
 */
function CandidatePage(): ReactElement {
  const [allCandidates, setAllCandidates] = useState<CandidatesData[]>([]);
  const [showCreateCandidate, setShowCreateCandidate] =
    useState<boolean>(false);

  useEffect(() => {
    setAllCandidates(utils.dummyCandidateData);
  }, [showCreateCandidate]);

  return (
    <div className="container-fluid row p-0 m-0" style={{ height: "94vh" }}>
      <div className="col-2 p-0 align-items-stretch d-flex">
        <div className="border border-1 rounded-2 m-4 me-2 align-items-stretch w-100 p-5 bg-white">
          <CandidateSideBar
            showCreateCandidate={showCreateCandidate}
            setShowCreateCandidate={setShowCreateCandidate}
          />
        </div>
      </div>
      <div className="col-10 p-0 align-items-stretch d-flex">
        <div className="border border-1 rounded-2 m-4 ms-2 align-items-stretch w-100 p-5 bg-white">
          <CandidateSection allCandidates={allCandidates} />
        </div>
      </div>
    </div>
  );
}

export default CandidatePage;
