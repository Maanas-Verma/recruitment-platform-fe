import { ReactElement, useEffect, useState } from "react";
import utils from "../utilities/application-utils";
import TestControlPanel from "./TestControl";
import TestCreation from "./TestCreation";

/**
 * Test Component which loads test details table.
 *
 * @returns - Test component HTML with test details.
 */
function TestTable(): ReactElement {
  const [tests, setTests] = useState<any>([]);
  const [selectedTestStatus, setSelectedTestStatus] = useState<string>("");
  const [showCreateTest, setShowCreateTest] = useState<boolean>(false);

  useEffect(() => {
    setTests(utils.dummyTestData);
  }, [selectedTestStatus, showCreateTest]);

  return (
    <div className="container-fluid">
      <div className="d-flex flex-column gap-5 mx-5 my-5">
        <div>
          <h4 className="fw-semibold">{"Test Panel"}</h4>
        </div>
        <TestControlPanel
          setSelectedStatusValue={setSelectedTestStatus}
          setSelectedTestStatus={() => setShowCreateTest(true)}
        ></TestControlPanel>

        {showCreateTest ? (
          <TestCreation handleClose={() => setShowCreateTest(false)} />
        ) : (
          ""
        )}

        <div className="table-responsive rounded-2 overflow-auto">
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
              {tests.map((test: { [key: string]: string }) => (
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

export default TestTable;
