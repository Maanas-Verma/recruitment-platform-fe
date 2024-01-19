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
            tabType="tag"
            tabList={[
              { label: "Pending", value: "PENDING" },
              { label: "Created", value: "CREATED" },
              { label: "Completed", value: "COMPLETED" },
            ]}
            handleTabChange={handleFilterChange}
          />
        </div>
      </div>
    </div>
  );
}

export default TechnicalSideBar;
