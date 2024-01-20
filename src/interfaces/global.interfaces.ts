import { ChangeEvent, FocusEvent } from "react";
import { RegisterOptions } from "react-hook-form";

export interface userSessionDetail {
  userType: "employee" | "candidate" | "hr";
  userId: string;
  department?: string;
  userName?: string;
}

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
  nonFormElement?: boolean;
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
  isHighlighted?: boolean;
  defaultValue?: ControlOption;
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

/**
 * Interface for text area elements.
 */
export interface TextAreaControlDetails {
  label?: string;
  name?: string;
  inputId?: string;
  disabled?: boolean;
  rows?: number;
  infoText?: string;
  controlKey: string;
  controlPlaceholder?: string;
  handleOnFocus?: (event: FocusEvent<HTMLElement>) => void;
  validationObject?: RegisterOptions;
  isHighlighted?: boolean;
}

export interface DepartmentData {
  id: string;
  name: string;
  description?: string;
  head?: string;
  requirements: string[];
  modified_at?: string;
  created_at?: string;
}

/**
 * Interface for the Post Question API Request.
 */
export interface PostQuestionRequest {
  description: string;
  question_type: string;
  tags?: string[] | null;
  correct_answer: string;
  other_dependencies: {
    [key: string]: string;
  };
}

/**
 * Interface for the Post Question API Response.
 */
export interface PostQuestionResponse {
  id: string;
  description: string;
  question_type: string;
  tags?: string[] | null;
  created_at: string;
  correct_answer: string;
  other_dependencies?: {
    [key: string]: string;
  };
}

export interface PostTestRequest {
  name: string;
  description: string;
  assigned_to: string;
  created_by?: string;
}
export interface PatchTestRequest {
  id: string;
  questions: string[];
  status: string;
}

export interface GetTestResponse extends PostTestRequest {
  id: string;
  conduced_on: null | string;
  created_at: string;
  modified_at: string;
  status: string;
  questions: string[];
}

export interface PostDepartmentRequest {
  name: string;
  requirements: string[];
  description?: string;
  head?: string;
}

export interface GetEmployeeDataResponse {
  id: string;
  name: string;
  modified_at: string;
  created_at: string;
  department: number;
}

export interface DropdownChoicesInterface {
  label: string;
  value: string;
}

export interface GetCandidateDataResponse {
  id: string;
  name: string;
  resume: string;
  skill_set: string[];
  score: string;
  alloted_test: string;
  modified_at?: string;
  created_at?: string;
  resumeMatrix?: SingleResumeMatrix;
}

export interface PostCandidateRequest {
  name: string;
  resume: string;
  skill_set: string[];
  score: string;
  alloted_test: string;
}

export interface SignUpRequest {
  first_name: string;
  last_name: string;
  username: string;
  password: string;
}

export interface SignInRequest {
  username: string;
  password: string;
}

export interface SingleResumeMatrix {
  [key: string]: number;
}

export interface GetResumeMatricesResponse {
  [key: string]: SingleResumeMatrix;
}
