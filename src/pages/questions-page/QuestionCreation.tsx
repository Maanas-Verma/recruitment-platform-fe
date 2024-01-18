import { ReactElement, SetStateAction } from "react";
import { FormProvider, useForm } from "react-hook-form";
import InputControl from "../../components/InputControl";
import ReactDropdown from "../../components/ReactDropdown";
import Button from "../../components/Button";
import TextAreaControl from "../../components/TextAreaControl";
import cryptoRandomString from "crypto-random-string";
import { QuestionCreationForm } from "../../interfaces/global.interfaces";

interface QuestionCreationProps {
  handleFilledForm: React.Dispatch<SetStateAction<QuestionCreationForm>>;
  handleClose: () => void;
}

const FormFieldObject = {
  id: "",
  description: "",
  question_type: "",
  other_dependencies: {},
  correct_answer: "",
  created_at: "",
};

/**
 * Question Form Container component which renders the fields.
 *
 * @returns - Question Form Container return html component.
 */
const QuestionCreation = (props: QuestionCreationProps): ReactElement => {
  const { handleFilledForm, handleClose } = props;

  const methods = useForm({
    mode: "all",
  });
  const { handleSubmit } = methods;

  const handleFormSubmit = (data: { [key: string]: string }) => {
    const currentDate = new Date();
    const formattedDate = currentDate.toLocaleDateString("en-US", {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
    });

    const parsedData: any = {
      ...FormFieldObject,
      id: `test-${cryptoRandomString({
        length: 8,
        type: "alphanumeric",
      })}`,
      created_at: formattedDate,
    };

    Object.keys(data).forEach((key) => {
      if (key === "A") {
        parsedData.other_dependencies[key] = data[key];
      } else if (key === "B") {
        parsedData.other_dependencies[key] = data[key];
      } else if (key === "C") {
        parsedData.other_dependencies[key] = data[key];
      } else if (key === "D") {
        parsedData.other_dependencies[key] = data[key];
      } else {
        parsedData[key] = data[key];
      }
    });
    handleFilledForm(parsedData);
    handleClose();
  };

  return (
    <div
      className="modal show fade d-block bg-dark bg-opacity-75"
      tabIndex={-1}
      aria-labelledby="create-question"
      aria-hidden="true"
    >
      <div className="modal-dialog modal-dialog-centered">
        <div className="modal-content">
          <div className="modal-header bg-secondary-dark rounded-top ps-4 pe-2 py-2">
            <h6 className="modal-title text-white" id="create-question">
              Create Question
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
                    <TextAreaControl
                      rows={3}
                      label={"Description"}
                      controlKey={"description"}
                      controlPlaceholder={"Add question description here..."}
                      validationObject={{
                        required: "Please fill description field as required",
                      }}
                    />
                  </div>
                  <div>
                    <ReactDropdown
                      label={"Question Type"}
                      controlKey={"question_type"}
                      options={[{ label: "MCQ Type", value: "MCQ" }]}
                      validationObject={{
                        required:
                          "Please select question type field as required",
                      }}
                    />
                  </div>
                  <div className="d-flex flex-row justify-content-between">
                    <InputControl
                      label={"Question Choice A"}
                      type={"text"}
                      controlKey={"A"}
                      validationObject={{
                        required:
                          "Please fill question choice field as required",
                      }}
                    />
                    <InputControl
                      label={"Question Choice B"}
                      type={"text"}
                      controlKey={"B"}
                      validationObject={{
                        required:
                          "Please fill question choice field as required",
                      }}
                    />
                  </div>
                  <div className="d-flex flex-row justify-content-between">
                    <InputControl
                      label={"Question Choice C"}
                      type={"text"}
                      controlKey={"C"}
                      validationObject={{
                        required:
                          "Please fill question choice field as required",
                      }}
                    />
                    <InputControl
                      label={"Question Choice D"}
                      type={"text"}
                      controlKey={"D"}
                      validationObject={{
                        required:
                          "Please fill question choice field as required",
                      }}
                    />
                  </div>
                  <div>
                    <InputControl
                      label={"Correct Answer"}
                      type={"text"}
                      controlKey={"correct_answer"}
                      validationObject={{
                        required:
                          "Please fill correct answer field as required",
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
                    name="Create"
                    buttonId="create-question-submit-btn"
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

export default QuestionCreation;
