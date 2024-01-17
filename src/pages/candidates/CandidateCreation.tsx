import { ReactElement } from "react";
import { FieldValue, FormProvider, useForm } from "react-hook-form";
import InputControl from "../../components/InputControl";
import ReactDropdown from "../../components/ReactDropdown";
import Button from "../../components/Button";
import TextAreaControl from "../../components/TextAreaControl";

interface CandidateCreationProps {
  handleClose: () => void;
}

interface CandidateCreationForm {
  title: string;
  titleDescription: string;
  candidate: string;
}

/**
 * Form Container component which renders the fields.
 *
 * @returns - Form Container return html component.
 */
const CandidateCreation = (props: CandidateCreationProps): ReactElement => {
  const { handleClose } = props;

  const methods = useForm({
    mode: "all",
  });
  const { handleSubmit } = methods;

  const handleFormSubmit = (data: FieldValue<CandidateCreationForm>) => {
    console.log(data);
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
              Create Candidate
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
                    <InputControl
                      label={"Resume link"}
                      type={"text"}
                      controlKey={"resume"}
                      validationObject={{
                        required: "Please fill title as required",
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

export default CandidateCreation;
