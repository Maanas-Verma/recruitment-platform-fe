import { ReactElement, useState } from "react";
import CandidateTable from "./CandidateTable";
import SearchBar from "../../components/SearchBar";
import { CandidatesData } from "../../interfaces/global.interfaces";
import Button from "../../components/Button";

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

  const handleRemoveButton = () => {
    console.log("delete ", selectedCandidates);
  };

  return (
    <div>
      <SearchBar
        controlPlaceholder="Search Candidate"
        controlKey="candidate"
        extraClass="fs-7 p-3 rounded-5"
      />
      <div className="my-5">
        <Button
          disabled={selectedCandidates.length === 0}
          size="small"
          theme="primary"
          name="Remove Candidate"
          buttonId="remove-candidate"
          onClick={handleRemoveButton}
        ></Button>
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
