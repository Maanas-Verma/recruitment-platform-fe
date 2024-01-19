/* eslint-disable react/jsx-props-no-spreading */
import { useFormContext, get } from "react-hook-form";
import { ReactElement } from "react";
import { TextAreaControlDetails } from "../interfaces/global.interfaces";

/**
 * A common component for Textarea. Renders the Textarea structure along with label.
 *
 * @param props - Textarea control props which contains datatype details.
 * @returns - Returns textarea component html.
 */
function TextAreaControl(props: TextAreaControlDetails): ReactElement {
  const {
    label,
    controlKey,
    controlPlaceholder = "",
    inputId,
    rows = 1,
    disabled,
    validationObject,
    isHighlighted = false,
    handleOnFocus,
  } = props;

  const {
    register,
    formState: { errors },
  } = useFormContext();

  return (
    <div className="form-group mb-0">
      <div className="d-flex justify-content-between align-items-center">
        {label && (
          <label
            className="m-1 text-muted fs-8"
            id={`label-${controlKey}`}
            htmlFor={inputId || `textarea-control-${controlKey}`}
          >
            {label}
            <span className="text-danger">
              {validationObject?.required ? " *" : null}
            </span>
          </label>
        )}
      </div>
      <textarea
        className={`form-control form-control-lg
        ${
          isHighlighted && !get(errors, controlKey)
            ? "bg-white border-lavender "
            : " "
        }
        ${get(errors, controlKey) ? "is-invalid bg-danger bg-opacity-10" : ""}`}
        id={inputId || `textarea-control-${controlKey}`}
        placeholder={controlPlaceholder}
        rows={rows}
        disabled={disabled}
        {...register(controlKey, validationObject)}
        onFocus={handleOnFocus}
      />
      <div
        className="invalid-feedback fs-8 ms-1"
        id={`error-message-${controlKey}`}
      >
        {get(errors, controlKey)?.message}
      </div>
    </div>
  );
}

export default TextAreaControl;
