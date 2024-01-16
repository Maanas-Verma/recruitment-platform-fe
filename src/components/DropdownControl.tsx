import { ReactElement } from "react";
import { DropDownControlDetails } from "../interfaces/global.interfaces";

/**
 * Simple Dropdown Control with Bootstrap CSS. Used for simple dropdown selections without advanced features like search.
 *
 * @param props - Dropdown Control Props.
 * @returns - HTML for simple dropdown control.
 */
function DropdownControl(props: DropDownControlDetails): ReactElement {
  const {
    extraClass = "",
    label = "",
    controlKey,
    options,
    disabled = false,
    isHighlighted = false,
    defaultValue,
    validationObject,
    handleOnChange,
  } = props;

  return (
    <div className="form-group mb-0">
      <div className="d-flex justify-content-between align-items-center">
        {label && (
          <label
            className="m-1 text-muted fs-7"
            id={`label-control-${controlKey}`}
            htmlFor={`dropdown-control-${controlKey}`}
          >
            <span className="text-danger">
              {validationObject?.required ? " *" : null}
            </span>
          </label>
        )}
      </div>
      <select
        id={`dropdown-control-${controlKey}`}
        className={`form-select ${controlKey} ${extraClass} ${
          isHighlighted ? "bg-white border-lavender " : " "
        }
      `}
        name={`${controlKey}`}
        disabled={disabled}
        onChange={handleOnChange}
      >
        <option
          value={defaultValue?.value ? defaultValue?.value : ""}
          key={defaultValue?.name}
        >
          {defaultValue?.name}
        </option>

        {options?.map((option) => (
          <option value={option.value} key={option.value + option.name}>
            {option.name}
          </option>
        ))}
      </select>
    </div>
  );
}

export default DropdownControl;
