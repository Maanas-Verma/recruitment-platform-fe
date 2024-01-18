import { ReactElement, useEffect, useState } from "react";
import utils from "../utilities/application-utils";
import TestCreation from "./TestCreation";
import { TestElement } from "../../interfaces/global.interfaces";
import TabControl from "../../components/TabControl";
import Button from "../../components/Button";
import apiService from "../../api-service/apiServices";
import TestSection from "./TestSection";
import TestSideBar from "./TestSideBar";

/**
 * Test Component which loads test details table.
 *
 * @returns - Test component HTML with test details.
 */
function TestPage(): ReactElement {
  const [allTests, setAllTests] = useState<TestElement[]>([]);
  const [selectedTestStatus, setSelectedTestStatus] = useState<string>("");
  const [showCreateTest, setShowCreateTest] = useState<boolean>(false);

  useEffect(() => {
    setAllTests(utils.dummyTestData);
  }, [selectedTestStatus, showCreateTest]);

  return (
    <div className="container-fluid row p-0 m-0" style={{ height: "94vh" }}>
      <div className="col-2 p-0 align-items-stretch d-flex">
        <div className="border border-1 rounded-2 m-4 me-2 align-items-stretch w-100 p-5 bg-white">
          <TestSideBar
            showCreateTest={showCreateTest}
            setShowCreateTest={setShowCreateTest}
          />
        </div>
      </div>
      <div className="col-10 p-0 align-items-stretch d-flex">
        <div className="border border-1 rounded-2 m-4 ms-2 align-items-stretch w-100 p-5 bg-white">
          <TestSection allTests={allTests} />
        </div>
      </div>
    </div>
  );
}

export default TestPage;
