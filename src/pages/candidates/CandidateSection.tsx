import { ReactElement, useState } from "react";
import CandidateTable from "./CandidateTable";
import SearchBar from "../../components/SearchBar";
import { CandidatesData } from "../../interfaces/global.interfaces";
import Button from "../../components/Button";
import TestAssignToCandidates from "./TestAssignToCandidates";

interface CandidateSectionProps {
  allCandidates: CandidatesData[];
}

/**
 * Test Component which loads test details table.
 *
 * @returns - Test component HTML with test details.
 */
function CandidateSection(props: CandidateSectionProps): ReactElement {
  const { allCandidates } = props;
  const [selectedCandidates, setSelectedCandidates] = useState<string[]>([]);
  const [showAssignTest, setShowAssignTest] = useState<boolean>(false);

  const handleRemoveButton = () => {
    console.log("delete ", selectedCandidates);
  };

  const handleSelectAll = () => {
    if (selectedCandidates.length === allCandidates.length) {
      setSelectedCandidates([]);
      return;
    }
    setSelectedCandidates(allCandidates.map((candidate) => candidate.id));
  };

  const handleAssignTest = () => {
    console.log("assign test", selectedCandidates);
  };

  return (
    <div>
      <SearchBar
        controlPlaceholder="Search Candidate"
        controlKey="candidate"
        extraClass="fs-7 p-3 rounded-5"
      />
      <div className="my-5 d-flex">
        <Button
          size="medium"
          theme="primary"
          name={
            selectedCandidates.length === allCandidates.length
              ? "Unselect All"
              : "Select All"
          }
          buttonId="remove-candidate"
          onClick={handleSelectAll}
          extraClass="me-3"
        ></Button>
        <Button
          disabled={selectedCandidates.length === 0}
          size="small"
          theme="primary"
          name="Remove Candidate"
          buttonId="remove-candidate"
          onClick={handleRemoveButton}
        ></Button>
        <Button
          disabled={selectedCandidates.length === 0}
          size="medium"
          theme="primary"
          name="Assign Test"
          buttonId="remove-candidate"
          onClick={() => setShowAssignTest(true)}
          extraClass="ms-auto"
        ></Button>
        {showAssignTest ? (
          <TestAssignToCandidates
            handleClose={() => setShowAssignTest(false)}
          />
        ) : (
          ""
        )}
      </div>
      <CandidateTable
        selectedCandidate={selectedCandidates}
        allCandidates={allCandidates}
        setSelectedCandidates={setSelectedCandidates}
      />
    </div>
  );
}

export default CandidateSection;
