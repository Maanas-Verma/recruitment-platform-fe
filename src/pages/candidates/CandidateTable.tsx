import { ReactElement } from "react";
import { CandidatesData } from "../../interfaces/global.interfaces";
import TagControl from "../../components/TagControl";

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
            <th className="px-2 py-4">Skill Set</th>
            <th className="px-2 py-4">Score</th>
            <th className="px-2 py-4">Assigned Test</th>
          </tr>
        </thead>
        <tbody>
          {allCandidates.map((candidates: CandidatesData) => (
            <tr className={"cursor-pointer"} key={`candidate-${candidates.id}`}>
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
                <div className="d-flex flex-wrap flex-row gap-1">
                  {candidates?.skill_set.map((skill) => {
                    return (
                      <span
                        className="badge rounded-pill bg-primary px-2 py-1"
                        key={`skill-${skill}`}
                      >
                        {skill}
                      </span>
                    );
                  })}
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
