import { ReactElement } from "react";
import { FieldValue, FormProvider, useForm } from "react-hook-form";
import InputControl from "../../components/InputControl";
import ReactDropdown from "../../components/ReactDropdown";
import Button from "../../components/Button";
import TextAreaControl from "../../components/TextAreaControl";
import apiService from "../../api-service/apiServices";
import { PostDepartmentRequest } from "../../interfaces/global.interfaces";
import { toast } from "react-toastify";

interface DepartmentCreationProps {
  handleClose: () => void;
  reloadDepartmentAPI: () => void;
}

interface DepartmentCreationForm {
  name: string;
  department: string;
  head?: string;
  requirements: string | string[];
}

/**
 * Form Container component which renders the fields.
 *
 * @returns - Form Container return html component.
 */
const DepartmentCreation = (props: DepartmentCreationProps): ReactElement => {
  const { handleClose, reloadDepartmentAPI } = props;

  const methods = useForm({
    mode: "all",
  });
  const { handleSubmit } = methods;

  const handleFormSubmit = async (data: FieldValue<DepartmentCreationForm>) => {
    const formData = data as DepartmentCreationForm;
    formData.requirements = (formData.requirements as string).split(" ")
    try {
      const departmentData = await apiService.postDepartment(formData as PostDepartmentRequest);
      if (departmentData.data) {
        toast.success("Department added successfully");
        handleClose();
        reloadDepartmentAPI()
      }
    } catch (error) {
      toast.error(`Error while adding: ${error}`);
    }
  };

  return (
    <div
      className="modal modal show fade d-block bg-dark bg-opacity-75"
      tabIndex={-1}
      aria-labelledby="deals-order"
      aria-hidden="true"
    >
      <div className="modal-dialog modal-dialog-centered">
        <div className="modal-content">
          <div className="modal-header bg-secondary-dark rounded-top ps-4 pe-2 py-2">
            <h6 className="modal-title text-white" id="deals-order">
              Add Department
            </h6>
            <Button
              theme={"secondary-dark"}
              buttonId={"close-deal-modal"}
              buttonType={"solid"}
              size={"small"}
              icon={"x-circle"}
              extraIconClass="h6"
              onClick={handleClose}
            ></Button>
          </div>
          <FormProvider {...methods}>
            <form onSubmit={handleSubmit(handleFormSubmit)}>
              <div className="modal-body bg-lavender-lightest">
                <div className="d-flex flex-column border border-lavender-lightest bg-white rounded-3 p-2 gap-1">
                  <div>
                    <InputControl
                      label={"Name"}
                      type={"text"}
                      controlKey={"name"}
                      validationObject={{
                        required: "Please fill title as required",
                      }}
                    />
                  </div>
                  <div>
                    <TextAreaControl
                      rows={3}
                      label={"Description"}
                      controlKey={"description"}
                      controlPlaceholder={
                        "Enter department description here..."
                      }
                    />
                  </div>
                  <div>
                    <ReactDropdown
                      label={"Head"}
                      controlKey={"head"}
                      options={[
                        { label: "Arun", value: "Arun" },
                        { label: "Bharti", value: "Bharti" },
                        { label: "Minakshi", value: "Minakshi" },
                        { label: "Varun", value: "Varun" },
                        { label: "Xavier", value: "Xavier" },
                      ]}
                    />
                  </div>
                  <div>
                    <InputControl
                      label={"Requirements"}
                      type={"text"}
                      controlKey={"requirements"}
                      validationObject={{
                        required: "Please fill requirements as required",
                      }}
                    />
                  </div>
                </div>
              </div>
              <div className="modal-footer bg-lavender-lightest rounded-bottom">
                <div className="d-flex flex-row-reverse">
                  <Button
                    size="small"
                    submitType="submit"
                    theme="primary"
                    name="Submit"
                    buttonId="section-form-submit-btn"
                    extraClass="fs-6"
                  />
                </div>
              </div>
            </form>
          </FormProvider>
        </div>
      </div>
    </div>
  );
};

export default DepartmentCreation;
