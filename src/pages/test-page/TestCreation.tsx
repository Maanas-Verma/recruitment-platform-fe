import { ReactElement, useEffect, useState } from "react";
import { FieldValue, FormProvider, useForm } from "react-hook-form";
import InputControl from "../../components/InputControl";
import ReactDropdown from "../../components/ReactDropdown";
import Button from "../../components/Button";
import TextAreaControl from "../../components/TextAreaControl";
import apiService from "../../api-service/apiServices";
import { getUser } from "../../api-service/sessionStorage";
import {
  DropdownChoicesInterface,
  PostTestRequest,
} from "../../interfaces/global.interfaces";
import { toast } from "react-toastify";

interface TestCreationProps {
  handleClose: () => void;
  reloadTestAPI: () => void;
}

/**
 * Form Container component which renders the fields.
 *
 * @returns - Form Container return html component.
 */
const TestCreation = (props: TestCreationProps): ReactElement => {
  const { handleClose, reloadTestAPI } = props;
  const [allEmployee, setAllEmployees] = useState<DropdownChoicesInterface[]>(
    []
  );
  const [allDepartment, setAllDepartment] = useState<
    DropdownChoicesInterface[]
  >([]);

  const authUser = getUser();

  const methods = useForm({
    mode: "all",
  });
  const { handleSubmit } = methods;

  const handleFormSubmit = async (data: { [key: string]: string }) => {
    const parsedData: PostTestRequest = {
      name: data.name,
      description: data.description,
      assigned_to: data.assigned_to,
      created_by: authUser.userId,
    };
    try {
      const testData = await apiService.postTestToken(parsedData);
      if (testData.data) {
        toast.success("Test added successfully");
        handleClose();
        reloadTestAPI();
      }
    } catch (error) {
      toast.error(`Error while adding: ${error}`);
    }
  };

  const handleGetEmployee = async () => {
    try {
      const getAllEmployees = await apiService.getEmployee();
      if (getAllEmployees.data) {
        const employeeChoices: DropdownChoicesInterface[] = [];
        getAllEmployees.data.forEach((employee) => {
          employeeChoices.push({
            label: employee.name,
            value: employee.id,
          });
        });
        setAllEmployees(employeeChoices);
      }
    } catch (error) {
      toast.error(`Error while getting employees: ${error}`);
    }
  };

  const handleGetDepartment = async () => {
    try {
      const getAllDepartments = await apiService.getDepartment();
      if (getAllDepartments.data) {
        const departmentChoices: DropdownChoicesInterface[] = [];
        getAllDepartments.data.forEach((department) => {
          departmentChoices.push({
            label: department.name,
            value: department.id,
          });
        });
        setAllDepartment(departmentChoices);
      }
    } catch (error) {
      toast.error(`Error while getting department: ${error}`);
    }
  };

  useEffect(() => {
    handleGetEmployee();
    handleGetDepartment();
  }, []);

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
              Add New Test
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
                      label={"Test Name"}
                      type={"text"}
                      controlKey={"name"}
                      validationObject={{
                        required: "Please fill name as required",
                      }}
                    />
                  </div>
                  <div>
                    <TextAreaControl
                      rows={5}
                      label={"Short Description"}
                      controlKey={"description"}
                      controlPlaceholder={"Enter detail here..."}
                      validationObject={{
                        required: "Please fill title description as required",
                      }}
                    />
                  </div>
                  <div>
                    <ReactDropdown
                      label={"Department Allocation"}
                      controlKey={"assigned_to"}
                      options={allDepartment}
                      validationObject={{
                        required: "Please select department as required",
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
                    name="Add Test"
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

export default TestCreation;
