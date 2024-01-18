import { ReactElement, useState } from "react";
import TestTable from "./TestTable";
import SearchBar from "../../components/SearchBar";
import { GetTestResponse } from "../../interfaces/global.interfaces";
import TabControl from "../../components/TabControl";

interface TestSectionProps {
  allTests: GetTestResponse[];
}

/**
 * Test Component which loads test details table.
 *
 * @returns - Test component HTML with test details.
 */
function TestSection(props: TestSectionProps): ReactElement {
  const { allTests } = props;
  const [status, setStatus] = useState<string>("PENDING");

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
            { label: "Pending", value: "PENDING" },
            { label: "Created", value: "CREATED" },
            { label: "Completed", value: "COMPLETED" },
          ]}
        />
      </div>
      <TestTable allTests={allTests} testStatus={status} />
    </div>
  );
}

export default TestSection;
