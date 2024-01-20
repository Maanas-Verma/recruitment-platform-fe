import { ReactElement } from "react";
import { FieldValue, FormProvider, useForm } from "react-hook-form";
import InputControl from "../../components/InputControl";
import Button from "../../components/Button";
import apiService from "../../api-service/apiServices";
import { toast } from "react-toastify";
import { AxiosError } from "axios";

interface SignUpForm {
  first_name: string;
  last_name: string;
  username: string;
  password: string;
}

interface SignUpFormProviderInterface {
  setIsSignUp: React.Dispatch<React.SetStateAction<boolean>>;
}

function SignUpFormProvider(props: SignUpFormProviderInterface): ReactElement {
  const { setIsSignUp } = props;

  const handleFormSubmit = async (data: FieldValue<SignUpForm>) => {
    try {
      const userData = await apiService.signUp(data as SignUpForm);
      toast.success(`User ${userData.data.username} created successfully`);
      setIsSignUp(false);
    } catch (err) {
      const errorResponse = err as AxiosError;
      if (errorResponse?.response?.status === 400) {
        toast.error("A user with that username already exists.");
      }
    }
  };

  const methods = useForm({
    mode: "all",
  });
  const { handleSubmit } = methods;

  return (
    <div className="card-body py-5 px-md-5">
      <FormProvider {...methods}>
        <form onSubmit={handleSubmit(handleFormSubmit)}>
          <div className="d-flex">
            <InputControl
              label={"First Name"}
              type={"text"}
              controlKey={"first_name"}
              validationObject={{
                required: "Please fill first name as required",
              }}
            />
            <InputControl
              label={"Last Name"}
              type={"text"}
              controlKey={"last_name"}
              validationObject={{
                required: "Please fill last name as required",
              }}
            />
          </div>

          <InputControl
            label={"Username"}
            type={"text"}
            controlKey={"username"}
            validationObject={{
              required: "Please fill username as required",
            }}
          />

          <InputControl label={"Email"} type={"email"} controlKey={"email"} />

          <InputControl
            label={"Password"}
            type={"password"}
            controlKey={"password"}
            validationObject={{
              required: "Please fill password as required",
            }}
          />

          <div className="d-flex mt-4">
            <Button
              size="small"
              submitType="submit"
              theme="primary"
              name="Sign Up"
              buttonId="section-form-submit-btn"
              extraClass="fs-7 ms-auto mt-3"
            />
          </div>
        </form>
      </FormProvider>
    </div>
  );
}

export default SignUpFormProvider;
