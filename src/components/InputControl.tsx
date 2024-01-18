import { useFormContext, get } from "react-hook-form";
import { ReactElement } from "react";
import { InputControlProps } from "../interfaces/global.interfaces";

/**
 * A common input control component which supports multiple input types.
 *
 * @param props - Input control props.
 * @returns - Returns a react element for text and number control.
 */
function InputControl(props: InputControlProps): ReactElement {
  const {
    label,
    type,
    step,
    controlKey,
    controlPlaceholder,
    validationObject,
    isHighlighted = false,
    nonFormElement = false,
  } = props;

  if (nonFormElement)
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
            type={type}
            step={type === "number" ? `${step}` : ""}
            id={`input-control-${controlKey}`}
            className={`form-control form-control fs-7 border
                        ${isHighlighted ? "bg-white border-lavender " : " "}
                      `}
            placeholder={controlPlaceholder}
          />
        </div>

        <div
          className="invalid-feedback fs-8 ms-1"
          id={`error-message-${controlKey}`}
        ></div>
      </div>
    );

  const {
    register,
    formState: { errors },
  } = useFormContext();

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
          {...register(controlKey, validationObject)}
          name={controlKey}
          type={type}
          step={type === "number" ? `${step}` : ""}
          id={`input-control-${controlKey}`}
          className={`form-control form-control fs-7
        ${
          isHighlighted && !get(errors, controlKey)
            ? "bg-white border-lavender "
            : " "
        }
        ${get(errors, controlKey) ? "is-invalid bg-danger bg-opacity-10" : ""}
        `}
          placeholder={controlPlaceholder}
        />
      </div>

      <div
        className="invalid-feedback fs-8 ms-1"
        id={`error-message-${controlKey}`}
      >
        {get(errors, controlKey)?.message}
      </div>
    </div>
  );
}

export default InputControl;
