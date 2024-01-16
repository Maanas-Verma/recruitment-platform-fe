import { ReactElement } from "react";

type TabList = { label: string; value: string };

interface TabControlProps {
  value: string;
  tabList: TabList[];
  theme?: string;
  isDisabled?: boolean;
  alignTab?: "left" | "right";
  tabType?: "linear" | "tag";
  handleTabChange: (event: React.SyntheticEvent, innerValue: string) => void;
}

/**
 * A Tab control component which provide navigation.
 *
 * @param props - Tab control props.
 * @returns - Returns a react element for tab control.
 */
function TabControl(props: TabControlProps): ReactElement {
  const {
    value,
    tabList,
    handleTabChange,
    theme = "primary",
    alignTab = "left",
    tabType = "linear",
    isDisabled = false,
  } = props;

  const handleOnClick = (event: React.SyntheticEvent, clickValue: string) => {
    handleTabChange(event, clickValue);
  };

  return (
    <>
      <ul
        className={`nav ${tabType === "tag" ? "nav-tabs" : ""} ${
          alignTab === "right" ? "justify-content-end" : ""
        }`}
        id="tab-container"
        role="tablist"
      >
        {tabList?.map((list) => {
          return (
            <li
              key={list.value}
              className={`nav-item-${list.value} fs-7 `}
              role="presentation"
            >
              <button
                className={`nav-link ${
                  value === list.value
                    ? `fw-semibold text-${theme} active ${
                        tabType !== "tag"
                          ? `border-bottom border-2 border-${theme}`
                          : ""
                      } `
                    : "text-dark"
                }`}
                id={`tab-item-${list.value}`}
                name={list.value}
                type="button"
                role="tab"
                onClick={(event) => handleOnClick(event, list.value)}
                disabled={isDisabled}
              >
                {list.label}
              </button>
            </li>
          );
        })}
      </ul>
    </>
  );
}

export default TabControl;
