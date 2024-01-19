import { ReactElement, useState } from "react";
import CandidateTable from "./CandidateTable";
import SearchBar from "../../components/SearchBar";
import { GetCandidateDataResponse } from "../../interfaces/global.interfaces";
import Button from "../../components/Button";
import TestAssignToCandidates from "./TestAssignToCandidates";
import apiService from "../../api-service/apiServices";
import { toast } from "react-toastify";
import axios from "axios";

interface CandidateSectionProps {
  allCandidates: GetCandidateDataResponse[];
  reloadCandidateAPI: () => void;
}

/**
 * Test Component which loads test details table.
 *
 * @returns - Test component HTML with test details.
 */
function CandidateSection(props: CandidateSectionProps): ReactElement {
  const { allCandidates, reloadCandidateAPI } = props;
  const [selectedCandidates, setSelectedCandidates] = useState<string[]>([]);
  const [showAssignTest, setShowAssignTest] = useState<boolean>(false);

  const handleRemoveButton = () => {
    try {
      selectedCandidates.forEach((candidateId) => {
        apiService.removeCandidate(candidateId);
      });
      reloadCandidateAPI();
      toast.success("Candidate removed successfully");
    } catch (error) {
      console.log(`Error while removing candidate: ${error}`);
    }
  };

  const handleSelectAll = () => {
    if (selectedCandidates.length === allCandidates.length) {
      setSelectedCandidates([]);
      return;
    }
    setSelectedCandidates(allCandidates.map((candidate) => candidate.id));
  };

  const handleAssignTest = (data: any) => {
    console.log(data);
    // selectedCandidates.map((candidateId) => {
    //   allCandidates.forEach((obj) => {
    //     if (obj.id === candidateId) {
    //       axios.patch('');
    //     }
    //   });
    // });
  };

  console.log(selectedCandidates);

  console.log("All candidates", allCandidates);

  return (
    <div>
      <SearchBar
        controlPlaceholder="Search Candidate"
        controlKey="candidate"
        extraClass="fs-7 p-3 rounded-5"
      />
      <div className="my-5 d-flex">
        <Button
          size="small"
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
          size="small"
          theme="primary"
          name="Assign Test"
          buttonId="remove-candidate"
          onClick={() => setShowAssignTest(true)}
          extraClass="ms-auto"
        ></Button>
        {showAssignTest ? (
          <TestAssignToCandidates
            handleClose={() => setShowAssignTest(false)}
            sendTestToCandidates={handleAssignTest}
            allCandidatesData = {allCandidates}
            selectedCandidatesData = {selectedCandidates}
            reloadCandidateAPI={reloadCandidateAPI}
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
