import { RegisterOptions } from "react-hook-form";
import { ReactElement } from "react";

interface SearchBarProps {
  label?: string;
  controlKey: string;
  controlPlaceholder: string;
  validationObject?: RegisterOptions;
}

/**
 * A common input control component which supports multiple input types.
 *
 * @param props - Input control props.
 * @returns - Returns a react element for text and number control.
 */
function SearchBar(props: SearchBarProps): ReactElement {
  const { label, controlKey, controlPlaceholder, validationObject } = props;

  return (
    <div className="form-group mb-0">
      <div className="d-flex justify-content-between align-items-center">
        {label && (
          <label
            className="ms-1 mb-1 text-muted fs-8"
            id={`label-control-${controlKey}`}
            htmlFor={`input-control-${controlKey}`}
          >
            {label}
            <span className="text-danger">
              {validationObject?.required ? " *" : null}
            </span>
          </label>
        )}
      </div>
      <div className="mx-1">
        <input
          type={"text"}
          id={`search-control-${controlKey}`}
          className={"form-control form-control fs-7 p-3 rounded-5"}
          placeholder={controlPlaceholder}
        />
      </div>
    </div>
  );
}

export default SearchBar;
