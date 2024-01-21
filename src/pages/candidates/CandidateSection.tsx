import { ReactElement, useState } from "react";
import CandidateTable from "./CandidateTable";
import SearchBar from "../../components/SearchBar";
import { GetCandidateDataResponse } from "../../interfaces/global.interfaces";
import Button from "../../components/Button";
import TestAssignToCandidates from "./TestAssignToCandidates";
import apiService from "../../api-service/apiServices";
import { toast } from "react-toastify";
import PopUpModal from "../../components/PopUpModal";

interface CandidateSectionProps {
  allCandidates: GetCandidateDataResponse[];
  reloadCandidateAPI: () => void;
}

/**
 * Test Component which loads test details table.
 *
 * @returns - Test component HTML with test details.
 */
function CandidateSection(props: Readonly<CandidateSectionProps>): ReactElement {
  const { allCandidates, reloadCandidateAPI } = props;
  const [selectedCandidates, setSelectedCandidates] = useState<string[]>([]);
  const [showAssignTest, setShowAssignTest] = useState<boolean>(false);
  const [modalShow, setModalShow] = useState<boolean>(false);

  const handleRemoveButton = async () => {
    try {
      await apiService.removeCandidates(selectedCandidates);
      setSelectedCandidates([]);
      reloadCandidateAPI();
      toast.success("Candidate removed successfully");
    } catch (error) {
      toast.error(`Error while removing candidate: ${error}`);
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
    console.log("handle assign test", data);
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
          onClick={() => setModalShow(true)}
        ></Button>
        {modalShow && (
          <PopUpModal
            title={"Remove Candidate"}
            messageText={"Are you sure you want to remove selected candidates"}
            messageTheme="alert alert-warning" //decide on this theme
            onClose={() => setModalShow(false)}
            onConfirm={handleRemoveButton}
          />
        )}
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
            allCandidatesData={allCandidates}
            selectedCandidatesData={selectedCandidates}
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
