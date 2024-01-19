import { ReactElement, useEffect, useState } from "react";
import CandidateSideBar from "./CandidateSideBar";
import CandidateSection from "./CandidateSection";
import { GetCandidateDataResponse } from "../../interfaces/global.interfaces";
import apiService from "../../api-service/apiServices";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { getUser } from "../../api-service/sessionStorage";

/**
 * Test Component which loads test details table.
 *
 * @returns - Test component HTML with test details.
 */
function CandidatePage(): ReactElement {
  const [allCandidates, setAllCandidates] = useState<
    GetCandidateDataResponse[]
  >([]);
  const [showCreateCandidate, setShowCreateCandidate] =
    useState<boolean>(false);
  const navigate = useNavigate();

  const handleGetCandidate = async (): Promise<void> => {
    try {
      const getAllCandidates = await apiService.getCandidate();
      if (getAllCandidates.data) {
        setAllCandidates(getAllCandidates.data);
      }
    } catch (error) {
      toast.error(`Error while getting candidates: ${error}`);
    }
  };

  useEffect(() => {
    const user = getUser();
    if (user.userType !== "hr") {
      navigate("/");
      return;
    }
    handleGetCandidate();
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
          <CandidateSection
            allCandidates={allCandidates}
            reloadCandidateAPI={handleGetCandidate}
          />
        </div>
      </div>
    </div>
  );
}

export default CandidatePage;
