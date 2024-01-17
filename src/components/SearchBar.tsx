import { useFormContext, get } from "react-hook-form";
import { ReactElement } from "react";
import { InputControlProps } from "../interfaces/global.interfaces";

interface SearchBarProps {
  controlPlaceholder: string;
  id: string;
}

/**
 * A common input control component which supports multiple input types.
 *
 * @param props - Input control props.
 * @returns - Returns a react element for text and number control.
 */
function SearchBar(props: SearchBarProps): ReactElement {
  const {
    controlPlaceholder,
    id
  } = props;

  return (
    <div className="form-group mb-0">
      <div className="d-flex justify-content-between align-items-center">
      </div>
      <div className="mx-1">
        <input
          type={"text"}
          id={`input-control-${id}`}
          className={"form-control form-control fs-7"}
          placeholder={controlPlaceholder}
        />
      </div>
    </div>
  );
}

export default SearchBar;
