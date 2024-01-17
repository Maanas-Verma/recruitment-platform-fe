import { ReactElement, useState, useContext, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useForm, FormProvider } from "react-hook-form";
import InputControl from "../../components/InputControl";
import ReactDropdown from "../../components/ReactDropdown";
import TextAreaControl from "../../components/TextAreaControl";
import Button from "../../components/Button";


/**
 * Component for Sign In Component.
 *
 * @returns - Sign In Component.
 */

function SignIn(): ReactElement {
  const navigate = useNavigate();
  const methods = useForm({
    mode: "all",
  });
  const { handleSubmit } = methods;

   interface LoginFormData {
    // email: string;
    // password: string;
  }

  const handleSignInFormSubmit = (loginFormData: LoginFormData) => {
    // creds validation to be added.
    console.log(loginFormData);
    navigate('/home');
  };

  return (
    <div className="row mx-0 mt-6">
      <FormProvider {...methods}>
        <form onSubmit={handleSubmit(handleSignInFormSubmit)}>
          <div className="modal-body bg-lavender-lightest">
            <div className="d-flex flex-column border border-lavender-lightest bg-white rounded-3 p-2 gap-1">
            <div className="mb-2">
                  <InputControl
                    type="email"
                    controlKey="email"
                    label="Email Address"
                    validationObject={{
                      required: "Please fill email as required",
                    }}
                  />
                </div>
                <div className="mb-2">
                      <InputControl
                        type="password"
                        controlKey="password"
                        label="Password"
                        validationObject={{
                          required: "Please fill password as required",
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
  );
}

export default SignIn;
