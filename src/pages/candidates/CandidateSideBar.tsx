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
    <div className="d-flex flex-column h-100">
      <div className="fs-5 fw-semibold">Candidate</div>
      <div className="mt-5">
        <Button
          size="medium"
          theme="primary"
          name="Add Candidate"
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
          <span>Filter Candidates based on Score: (Greater than)</span>
        </div>
        <InputControl type={"number"} controlKey={"hello"} nonFormElement />
      </div>
      <DropdownControl
        controlKey={"department_selection"}
        defaultValue={{ name: "Choose Department", value: "" }}
        theme={"primary"}
        options={[
          {
            name: "Innovation Labs",
            value: "innovation_labs",
          },
          { name: "Finance", value: "finance" },
          { name: "Marketing", value: "marketing" },
        ]}
        extraClass="bg-primary text-white fw-semibold fs-7 p-2"
        handleOnChange={handleDepartmentOnChange}
      />
      {showCreateCandidate ? (
        <CandidateCreation handleClose={() => setShowCreateCandidate(false)} />
      ) : (
        ""
      )}
      <div className="my-auto"></div>
      <div>
        <Button
          size="medium"
          theme="primary"
          name="Apply Filter"
          buttonId="create-candidate"
          onClick={() => setShowCreateCandidate(true)}
          extraClass="fw-bold fs-7"
          iconPlacement="start"
          extraIconClass="my-auto"
        ></Button>
      </div>
    </div>
  );
}

export default CandidateSideBar;
