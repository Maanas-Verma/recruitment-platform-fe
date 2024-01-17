import { ReactElement } from "react";
import { CandidatesData } from "../../interfaces/global.interfaces";

/**
 * Test Component which loads test details table.
 *
 * @returns - Test component HTML with test details.
 */
function CandidateTable(props: {
  selectedCandidate: string[];
  allCandidates: CandidatesData[];
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

  return (
    <div className="table-responsive rounded-2 overflow-auto mt-5">
      <table className="table table-hover align-middle">
        <thead className="table-info">
          <tr>
            <th className="px-2 py-4">Select</th>
            <th className="px-2 py-4">Name</th>
            <th className="px-2 py-4">Resume</th>
            <th className="px-2 py-4">skill_set</th>
            <th className="px-2 py-4">score</th>
            <th className="px-2 py-4">alloted_test</th>
          </tr>
        </thead>
        <tbody>
          {allCandidates.map((candidates: CandidatesData) => (
            <tr className={"cursor-pointer"}>
              <td className="p-2">
                <input
                  type="checkbox"
                  checked={selectedCandidate.includes(candidates.id)}
                  onChange={() => handleCheckboxChange(candidates?.id)}
                />
              </td>
              <td className="p-2 fs-7 ">{candidates?.name}</td>
              <td className="p-2 fs-7 w-50">{candidates?.resume_url}</td>
              <td className="p-2 fs-7 ">
                {candidates?.skill_set.map((candidate) => {
                  return (
                    <span className="badge bg-secondary me-1">{candidate}</span>
                  );
                })}
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
