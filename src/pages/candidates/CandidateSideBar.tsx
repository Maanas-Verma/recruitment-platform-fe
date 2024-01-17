import { ReactElement, useState } from "react";
import CandidateCreation from "./CandidateCreation";
import Button from "../../components/Button";
import InputControl from "../../components/InputControl";
import DropdownControl from "../../components/DropdownControl";

interface CandidateSectionProps {
  showCreateCandidate: boolean;
  setShowCreateCandidate: (value: boolean) => void;
}

/**
 * Test Component which loads test details table.
 *
 * @returns - Test component HTML with test details.
 */
function CandidateSideBar(props: CandidateSectionProps): ReactElement {
  const { showCreateCandidate, setShowCreateCandidate } = props;

  const handleDepartmentOnChange = (event: React.ChangeEvent<HTMLElement>) => {
    const value = (event.target as HTMLSelectElement).value;
    console.log(value);
  };

  return (
    <div>
      <div className="fs-5">Candidate</div>
      <div className="mt-5">
        <Button
          size="medium"
          theme="primary"
          name="Add"
          buttonId="create-candidate"
          onClick={() => setShowCreateCandidate(true)}
          extraClass="fw-bold fs-7"
          icon="plus-lg"
          iconPlacement="start"
          extraIconClass="h6"
        ></Button>
      </div>
      <div className="my-6">
        <div className="px-2 mb-2">
          <span>Filter Candidate with percentage greater than </span>
        </div>
        <InputControl type={"number"} controlKey={"hello"} nonFormElement />
      </div>
      <DropdownControl
        controlKey={"department_selection"}
        defaultValue={{ name: "Department", value: "" }}
        theme={"primary"}
        options={[
          {
            name: "Innovation Labs",
            value: "innovation_labs",
          },
          { name: "Finanace", value: "finance" },
          { name: "Start up", value: "start_up" },
        ]}
        extraClass="bg-primary text-white fw-bold fs-7"
        handleOnChange={handleDepartmentOnChange}
      />
      {showCreateCandidate ? (
        <CandidateCreation handleClose={() => setShowCreateCandidate(false)} />
      ) : (
        ""
      )}
    </div>
  );
}

export default CandidateSideBar;
