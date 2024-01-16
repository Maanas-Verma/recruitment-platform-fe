import { ChangeEvent, FocusEvent } from "react";
import { RegisterOptions } from "react-hook-form";

export interface TokenResponse {
  access_token: string;
  expires_in: number;
  token_type: string;
  scope: string;
}

export interface ButtonControlDetails {
  name?: string;
  buttonId?: string;
  theme: string;
  buttonType?: "outline" | "solid" | "text";
  size: "small" | "medium" | "large";
  submitType?: "submit" | "button";
  icon?: string;
  iconPlacement?: "start" | "end";
  isLoading?: boolean;
  disabled?: boolean;
  fullWidth?: boolean;
  hrefLink?: string;
  extraClass?: string;
  extraIconClass?: string;
  onClick?: () => void;
}

export type InputControlType =
  | "text"
  | "number"
  | "email"
  | "password"
  | "tel"
  | "checkbox"
  | any;

/**
 * Interface for Input control.
 */
export interface InputControlProps {
  type: InputControlType;
  controlKey: string;
  step?: number;
  label?: string;
  controlPlaceholder?: string;
  validationObject?: RegisterOptions;
  isHighlighted?: boolean;
}

/**
 * Interface for Dropdown control.
 */
export interface ControlOption {
  name: string;
  value: string;
}

export interface DropDownControlDetails {
  label?: string;
  controlKey: string;
  options: ControlOption[];
  disabled?: boolean;
  controlPlaceholder?: string;
  isHighlighted?: boolean;
  defaultValue?: ControlOption;
  handleOnFocus?: (event: FocusEvent<HTMLElement>) => void;
  handleOnChange?: (event: ChangeEvent<HTMLElement>) => void;
  validationObject?: RegisterOptions;
  theme?: string;
  dropDownType?: string;
  extraClass?: string;
}

/**
 * Interface for React Dropdown control.
 */
export interface ReactControlOption {
  label: string;
  value: string;
}
export interface ReactDropdownControlProp {
  label: string;
  controlKey: string;
  options: ReactControlOption[];
  defaultValue?: ReactControlOption;
  validationObject?: RegisterOptions;
  controlPlaceholder?: string;
  isHighlighted?: boolean;
  isSearchable?: boolean;
  isClearable?: boolean;
  isDisabled?: boolean;
}

/**
 * Interface for Radio control.
 */
export interface RadioControlProps {
  label?: string;
  controlKey: string;
  options: ControlOption[];
  disabled?: boolean;
  handleOnFocus?: (event: FocusEvent<HTMLElement>) => void;
  validationObject?: RegisterOptions;
  direction?: "" | "inline";
  defaultValue?: string;
  theme?: string;
  extraClass?: string;
}

/**
 * Interface for attributes of validation object.
 */
export interface ValidationAttributeType {
  regex_string?: string;
  date_format?: string;
  min_value?: number;
  max_value?: number;
  max_length?: number;
  min_length?: number;
  min_date?: string;
  max_date?: string;
  dependent_on?: string;
  check_value?: string;
}

export type ValidationType =
  | "required"
  | "max_length"
  | "min_length"
  | "min_value"
  | "max_value"
  | "regex"
  | "date_range"
  | "date_format"
  | "api"
  | "check_value";

export interface ValidationsListType {
  id?: string;
  data_point_id?: string;
  validation_type: ValidationType;
  is_dependent?: boolean;
  error_message: string;
  validation_details?: ValidationAttributeType;
}

/**
 * Interface for Date control.
 */
export interface DateControlProps {
  controlKey: string;
  label: string;
  dateFormat?: string;
  showTime?: boolean;
  valArray?: ValidationsListType[];
  handleOnFocus?: (event: FocusEvent<HTMLElement>) => void;
  validationObject?: RegisterOptions;
  isHighlighted?: boolean;
  minDate?: string;
  maxDate?: string;
}
