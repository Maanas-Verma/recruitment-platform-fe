import { ReactElement } from "react";
import TabControl from "../../components/TabControl";

interface TechnicalSideBarProps {
  filterValue: string;
  handleFilterChange: (event: React.SyntheticEvent, innerValue: string) => void;
}

/**
 * Technical SideBar Component which loads side panel.
 *
 * @returns - Technical sidebar component return side panel.
 */
function TechnicalSideBar(props: TechnicalSideBarProps): ReactElement {
  const { filterValue, handleFilterChange } = props;

  return (
    <div>
      <div className="fs-5 fw-semibold">Tech Dashboard</div>
      <div className="mt-5">
        <div className="fw-light">Filters:</div>
        <div className="p-2">
          <TabControl
            value={filterValue}
            alignTab={"vertical"}
            tabList={[
              { label: "Pending", value: "Pending" },
              { label: "Created", value: "Created" },
              { label: "Completed", value: "Completed" },
            ]}
            handleTabChange={handleFilterChange}
          />
        </div>
      </div>
    </div>
  );
}

export default TechnicalSideBar;
