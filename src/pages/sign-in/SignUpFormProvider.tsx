import { ReactElement } from "react";
import { FieldValue, FormProvider, useForm } from "react-hook-form";
import InputControl from "../../components/InputControl";
import Button from "../../components/Button";
import apiService from "../../api-service/apiServices";

interface SignUpForm {
  first_name: string;
  last_name: string;
  username: string;
  password: string;
}

function SignUpFormProvider(): ReactElement {
  const handleFormSubmit = async (data: FieldValue<SignUpForm>) => {
    try {
      const userData = await apiService.signUp(data as SignUpForm);
      console.log(userData.data)
    } catch (err) {
      console.log(err);
    }
  };

  const methods = useForm({
    mode: "all",
  });
  const { handleSubmit } = methods;

  return (
    <FormProvider {...methods}>
      <form onSubmit={handleSubmit(handleFormSubmit)}>
        <div className="d-flex">
          <InputControl
            label={"First Name"}
            type={"text"}
            controlKey={"first_name"}
            validationObject={{
              required: "Please fill title as required",
            }}
          />
          <InputControl
            label={"Last Name"}
            type={"text"}
            controlKey={"last_name"}
            validationObject={{
              required: "Please fill title as required",
            }}
          />
        </div>

        <InputControl
          label={"Username"}
          type={"text"}
          controlKey={"username"}
          validationObject={{
            required: "Please fill title as required",
          }}
        />

        <InputControl
          label={"Password"}
          type={"text"}
          controlKey={"password"}
          validationObject={{
            required: "Please fill title as required",
          }}
        />

        <div className="d-flex mt-4">
          <Button
            size="small"
            submitType="submit"
            theme="primary"
            name="Sign Up"
            buttonId="section-form-submit-btn"
            extraClass="fs-6 ms-auto mt-3"
          />
        </div>
      </form>
    </FormProvider>
  );
}

export default SignUpFormProvider;