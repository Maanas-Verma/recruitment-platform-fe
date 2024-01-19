import { ReactElement } from "react";
import { GetCandidateDataResponse } from "../../interfaces/global.interfaces";
import Button from "../../components/Button";
import apiService from "../../api-service/apiServices";

/**
 * Test Component which loads test details table.
 *
 * @returns - Test component HTML with test details.
 */
function CandidateTable(props: {
  selectedCandidate: string[];
  allCandidates: GetCandidateDataResponse[];
  setSelectedCandidates: (value: string[]) => void;
}): ReactElement {
  const { selectedCandidate, allCandidates, setSelectedCandidates } = props;

  const handleCheckboxChange = (id: string) => {
    const updatedSelectedDepartment: string[] = [...selectedCandidate];
    if (updatedSelectedDepartment.includes(id)) {
      const index = updatedSelectedDepartment.indexOf(id);
      updatedSelectedDepartment.splice(index, 1);
    } else {
      updatedSelectedDepartment.push(id);
    }
    if (updatedSelectedDepartment !== undefined) {
      setSelectedCandidates(updatedSelectedDepartment);
    }
  };

  const handleResumeDownload = async (id: string) => {
    try {
      const resume = await apiService.getResume(id);
      const blob = new Blob([resume.data]);
      const reader = new FileReader();
      reader.onload = () => {
        // Create a link element
        const link = document.createElement("a");
        link.href = reader.result as string;

        // Set the download attribute with the desired filename
        link.download = "resume.pdf";

        // Append the link to the body
        document.body.appendChild(link);

        // Trigger a click on the link to start the download
        link.click();

        // Remove the link from the DOM
        document.body.removeChild(link);
      };
      reader.readAsDataURL(blob);
    } catch (error) {
      console.error("Error downloading file:", error);
    }
  };

  return (
    <div
      className="table-responsive rounded-2 overflow-auto mt-5"
      style={{ maxHeight: "35rem" }}
    >
      <table className="table table-hover align-middle">
        <thead className="table-info sticky-top">
          <tr>
            <th className="px-2 py-4">Select</th>
            <th className="px-2 py-4">Name</th>
            <th className="px-2 py-4">Resume</th>
            <th className="px-2 py-4">Department Alignment</th>
            <th className="px-2 py-4">Skill Set</th>
            <th className="px-2 py-4">Score</th>
            <th className="px-2 py-4">Assigned Test</th>
          </tr>
        </thead>
        <tbody>
          {allCandidates.map((candidates: GetCandidateDataResponse) => (
            <tr className={"cursor-pointer"} key={`candidate-${candidates.id}`}>
              <td className="p-2">
                <input
                  type="checkbox"
                  checked={selectedCandidate.includes(candidates.id)}
                  onChange={() => handleCheckboxChange(candidates?.id)}
                />
              </td>
              <td className="p-2 fs-7 ">{candidates?.name}</td>
              <td className="p-2 fs-7">
                {candidates.resume ? (
                  <Button
                    buttonType="text"
                    name="Resume"
                    theme={"primary"}
                    size={"small"}
                    onClick={() => handleResumeDownload(candidates?.id)}
                  />
                ) : (
                  "-"
                )}
              </td>
              <td>
                {candidates.resumeMatrix &&
                  Object.keys(candidates.resumeMatrix).map((key) => (
                    <div>
                      <span
                        className="badge rounded-pill bg-primary px-2 py-1"
                        key={`matrix-${key}`}
                      >
                        {key} -{" "}
                        {candidates.resumeMatrix
                          ? candidates.resumeMatrix[key]
                          : ""}
                      </span>
                      <br />
                    </div>
                  ))}
              </td>
              <td className="p-2 fs-7 ">
                <div className="d-flex flex-wrap flex-row gap-1">
                  {candidates.skill_set && candidates.skill_set.length > 0
                    ? candidates?.skill_set.map((skill) => {
                        return (
                          <span
                            className="badge rounded-pill bg-primary px-2 py-1"
                            key={`skill-${skill}`}
                          >
                            {skill}
                          </span>
                        );
                      })
                    : "No Skill Set"}
                </div>
              </td>
              <td className="p-2 fs-7 ">{candidates?.score}</td>
              <td className="p-2 fs-7 ">{candidates?.alloted_test}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default CandidateTable;
