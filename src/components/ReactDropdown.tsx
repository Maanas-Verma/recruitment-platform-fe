import { ReactElement } from "react";
import Select from "react-select";
import { useFormContext, get, Controller } from "react-hook-form";

import { ReactDropdownControlProp } from "../interfaces/global.interfaces";

/**
 * Simple Dropdown Control with Bootstrap CSS. Used for simple dropdown selections without advanced features like search.
 *
 * @param props - Dropdown Control Props.
 * @returns - HTML for simple dropdown control.
 */
function ReactDropdown(props: ReactDropdownControlProp): ReactElement {
  const {
    label = "",
    controlKey,
    options,
    defaultValue,
    controlPlaceholder,
    validationObject,
    isSearchable = false,
    isClearable = false,
    isDisabled = false,
  } = props;

  const {
    control,
    formState: { errors },
  } = useFormContext();

  const customTheme = (theme: any) => ({
    ...theme,
    colors: {
      ...theme.colors,
      primary25: "#dee1ff91",
      primary: `${get(errors, controlKey) ? "#c62c2c" : "#9096f1"}`, // Set your theme color
    },
    borderRadius: 6,
  });

  const customStyles = {
    control: (provided: any, state: any) => ({
      ...provided,
      backgroundColor: `${get(errors, controlKey) ? "#fbeaea" : "#f2f6fa"}`,
      borderColor: `${get(errors, controlKey) ? "#c62c2c" : "#f2f6fa"}`, // Set your initial border color
      boxShadow: state.isFocused ? "red" : provided.boxShadow,
      "&:hover": {
        backgroundColor: `white`,
        borderColor: `${
          get(errors, controlKey) ? "#c62c2c" : "rgb(102, 107, 191)"
        }`,
        boxShadow: `${
          get(errors, controlKey)
            ? "0px 0px 1px 2px rgba(255,209,209,1)"
            : "0px 0px 1px 2px rgba(220,199,255,1)"
        }`,
      },
    }),
  };

  return (
    <div className="form-group mb-0">
      <div className="d-flex justify-content-between align-items-center">
        {label && (
          <label
            className="ms-1 mb-1 text-muted fs-8"
            id={`label-control-${controlKey}`}
            htmlFor={`dropdown-control-${controlKey}`}
          >
            {label}
            <span className="text-danger">
              {validationObject?.required ? " *" : null}
            </span>
          </label>
        )}
      </div>
      <Controller
        name={controlKey}
        control={control}
        rules={validationObject}
        defaultValue={defaultValue?.value}
        render={({ field: { onChange, value, ref } }) => (
          <Select
            className={`select-input-${controlKey} fs-7 mx-1 ${
              get(errors, controlKey) ? "is-invalid" : ""
            }`}
            name={`${controlKey}`}
            placeholder={controlPlaceholder}
            options={options}
            value={options.find((c) => c.value === value)}
            onChange={(val) => onChange(val?.value)}
            isClearable={isClearable}
            isSearchable={isSearchable}
            isDisabled={isDisabled}
            theme={customTheme}
            styles={customStyles}
          />
        )}
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

export default ReactDropdown;
