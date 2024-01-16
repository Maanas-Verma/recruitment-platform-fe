import { ReactElement } from "react";
import Button from "../../components/Button";
import DropdownControl from "../../components/DropdownControl";

interface TestControlPanelProps {
  setSelectedStatusValue: React.Dispatch<React.SetStateAction<string>>;
  setSelectedTestStatus: () => void;
}

/**
 * Deal Control Panel Component which loads the row of buttons.
 *
 * @returns - Return the row of buttons.
 */
function TestControlPanel(props: TestControlPanelProps): ReactElement {
  const { setSelectedStatusValue, setSelectedTestStatus } = props;

  const handleStatusOnChange = (event: React.ChangeEvent<HTMLElement>) => {
    const selectedDealType = (event.target as HTMLSelectElement).value;
    setSelectedStatusValue(selectedDealType);
  };

  return (
    <div className="d-flex flex-wrap gap-6">
      <div>
        <DropdownControl
          controlKey={"status"}
          defaultValue={{ name: "Status", value: "" }}
          theme={"primary"}
          options={[
            {
              name: "Pending",
              value: "Pending",
            },
            { name: "Created", value: "Created" },
            { name: "Completed", value: "Completed" },
          ]}
          extraClass="bg-primary text-white fw-bold fs-7"
          handleOnChange={handleStatusOnChange}
        />
      </div>
      <div className="ms-auto">
        <Button
          size="medium"
          theme="primary"
          name="Create Test Token"
          buttonId="create-test"
          onClick={setSelectedTestStatus}
          extraClass="fw-bold fs-7"
        ></Button>
      </div>
    </div>
  );
}

export default TestControlPanel;
