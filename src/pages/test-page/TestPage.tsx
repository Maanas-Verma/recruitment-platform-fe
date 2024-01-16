import { ReactElement, useEffect, useState } from "react";
import utils from "../utilities/application-utils";
import TestControlPanel from "./TestControl";
import TestCreation from "./TestCreation";
import { TestElement } from "../../interfaces/global.interfaces";
import TabControl from "../../components/TabControl";

/**
 * Test Component which loads test details table.
 *
 * @returns - Test component HTML with test details.
 */
function TestSection(): ReactElement {
  const [tests, setTests] = useState<TestElement[]>([]);
  const [selectedTestStatus, setSelectedTestStatus] = useState<string>("");
  const [showCreateTest, setShowCreateTest] = useState<boolean>(false);
  const [value, setValue] = useState<string>("Pending");

  const handleChange = (event: React.SyntheticEvent, newValue: string) => {
    setValue(newValue);
  };

  useEffect(() => {
    setTests(utils.dummyTestData);
  }, [selectedTestStatus, showCreateTest]);

  return (
    <div className="container-fluid">
      <div className="d-flex flex-column gap-5 mx-5 my-5">
        <div id="test-header-container">
          <h4 className="fw-semibold">{"Test Panel"}</h4>
        </div>
        <div id="tab-panel">
          <TabControl
            value={value}
            handleTabChange={handleChange}
            tabList={[
              { label: "Pending", value: "Pending" },
              { label: "Created", value: "Created" },
              { label: "Completed", value: "Completed" },
            ]}
          />
        </div>

        <div id="test-control-panel">
          <TestControlPanel
            setSelectedStatusValue={setSelectedTestStatus}
            setSelectedTestStatus={() => setShowCreateTest(true)}
          ></TestControlPanel>
        </div>

        {showCreateTest ? (
          <TestCreation handleClose={() => setShowCreateTest(false)} />
        ) : (
          ""
        )}

        <div
          className="table-responsive rounded-2 overflow-auto"
          id="test-table-panel"
        >
          <table className="table table-hover align-middle">
            <thead className="table-info">
              <tr>
                <th className="px-2 py-4">Title</th>
                <th className="px-2 py-4">Title Description</th>
                <th className="px-2 py-4">Applications</th>
                <th className="px-2 py-4">Alloted</th>
                <th className="px-2 py-4">Status</th>
                <th className="px-2 py-4">Modified</th>
              </tr>
            </thead>
            <tbody>
              {tests.map((test: TestElement) => (
                <tr key={test.id} className={"cursor-pointer"}>
                  <td className="p-2 fs-7 ">{test?.title}</td>
                  <td className="p-2 fs-7 w-50">{test?.description}</td>
                  <td className="p-2 fs-7 ">{test?.application}</td>
                  <td className="p-2 fs-7 ">{test?.alloted_to}</td>
                  <td className="p-2 fs-7 ">
                    <div
                      className={`rounded-pill text-center border ${
                        test?.status === "Pending"
                          ? "text-grey border-grey"
                          : test?.status === "Created"
                          ? "text-warning border-warning"
                          : "text-success border-success"
                      }`}
                    >
                      {test?.status}
                    </div>
                  </td>
                  <td className="p-2 fs-7 ">
                    {utils.FormatDate(test?.modified_at)}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default TestSection;
