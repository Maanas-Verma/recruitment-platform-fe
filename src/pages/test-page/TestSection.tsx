import { ReactElement, useState } from "react";
import TestTable from "./TestTable";
import SearchBar from "../../components/SearchBar";
import { TestElement } from "../../interfaces/global.interfaces";
import Button from "../../components/Button";
import TabControl from "../../components/TabControl";

interface TestSectionProps {
  allTests: TestElement[];
}

/**
 * Test Component which loads test details table.
 *
 * @returns - Test component HTML with test details.
 */
function TestSection(props: TestSectionProps): ReactElement {
  const { allTests } = props;
  const [selectedTest, setSelectedTest] = useState<string[]>([]);
  const [status, setStatus] = useState<string>("Pending");

  const handleRemoveButton = () => {
    console.log("delete ", selectedTest);
  };

  const handleChange = (event: React.SyntheticEvent, newValue: string) => {
    setStatus(newValue);
  };

  return (
    <div>
      <SearchBar controlPlaceholder="Search Test" controlKey="test" />
      <div id="tab-panel" className="mt-5">
        <TabControl
          value={status}
          handleTabChange={handleChange}
          tabList={[
            { label: "Pending", value: "Pending" },
            { label: "Created", value: "Created" },
            { label: "Completed", value: "Completed" },
          ]}
        />
      </div>
      <TestTable allTests={allTests} testStatus={status}/>
    </div>
  );
}

export default TestSection;
