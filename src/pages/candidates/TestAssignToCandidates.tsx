import { ReactElement, useEffect, useState } from "react";
import { FieldValue, FormProvider, useForm } from "react-hook-form";
import ReactDropdown from "../../components/ReactDropdown";
import Button from "../../components/Button";
import { GetTestResponse } from "../../interfaces/global.interfaces";
import apiService from "../../api-service/apiServices";
import { toast } from "react-toastify";
import axios from "axios";
import environmentData from "../../environment-constant";

interface TestAssignToCandidatesProps {
  handleClose: () => void;
  sendTestToCandidates: (data: { test: string }) => void;
  allCandidatesData: any;
  selectedCandidatesData: any;
  reloadCandidateAPI: () => void;
}

interface TestAssignToCandidatesForm {
  test: string;
}

/**
 * Form Container component which renders the fields.
 *
 * @returns - Form Container return html component.
 */
const TestAssignToCandidates = (
  props: TestAssignToCandidatesProps
): ReactElement => {
  const {
    handleClose,
    sendTestToCandidates,
    allCandidatesData,
    selectedCandidatesData,
    reloadCandidateAPI,
  } = props;

  const [allTests, setAllTests] = useState<GetTestResponse[]>([]);

  const methods = useForm({
    mode: "all",
  });
  const { handleSubmit } = methods;

  const handleFormSubmit = async (data: { [key: string]: string }) => {
    await selectedCandidatesData.map(async (candidateId: any) => {
      const data_dump = { id: candidateId, alloted_test: data.test };
      const value = await apiService.patchCandidate1(
        data_dump as { id: string; alloted_test: string }
      );
    });
    toast.success("assigned");
    handleClose();
    reloadCandidateAPI()
  };

  const handleGetTest = async () => {
    try {
      const getAllTests = await apiService.getTest();
      if (getAllTests.data) {
        setAllTests(getAllTests.data);
      }
    } catch (error) {
      toast.error(`Error while getting all tests: ${error}`);
    }
  };

  useEffect(() => {
    handleGetTest();
  }, []);

  return (
    <div
      className="modal modal show fade d-block bg-dark bg-opacity-75"
      tabIndex={-1}
      aria-labelledby="candidate-creation"
      aria-hidden="true"
    >
      <div className="modal-dialog modal-dialog-centered">
        <div className="modal-content">
          <div className="modal-header bg-secondary-dark rounded-top ps-4 pe-2 py-2">
            <h6 className="modal-title text-white" id="deals-order">
              Assign Test To Candidates
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
                    <ReactDropdown
                      label={"Test"}
                      controlKey={"test"}
                      options={allTests.map((test) => {
                        return {
                          label: test.name,
                          value: test.id,
                        };
                      })}
                      validationObject={{
                        required: "Please select test as required",
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

export default TestAssignToCandidates;
