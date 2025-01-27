import { ReactElement } from "react";
import { FieldValue, FormProvider, useForm } from "react-hook-form";
import InputControl from "../../components/InputControl";
import Button from "../../components/Button";
import apiService from "../../api-service/apiServices";
import { getUser, setUser } from "../../api-service/sessionStorage";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { AxiosError } from "axios";

interface SignInForm {
  username: string;
  password: string;
}

function SignInFormProvider(): ReactElement {
  const navigate = useNavigate();

  const handleFormSubmit = async (data: FieldValue<SignInForm>) => {
    try {
      const userData = await apiService.signIn(data as SignInForm);
      if (userData?.data?.employee) {
        const employeeData = await apiService.getEmployeeById(
          userData.data.employee
        );
        if (employeeData.data.department === null) {
          setUser(
            "employee",
            userData.data.employee,
            "",
            employeeData.data.name
          );
          navigate("/tech-admin");
        }
        const departmentData = await apiService.getDepartmentById(
          employeeData.data.department.toString()
        );
        if (departmentData.data.name === "HR") {
          setUser(
            "hr",
            userData.data.employee,
            departmentData.data.name,
            employeeData.data.name
          );
          navigate("/tests");
        } else {
          setUser(
            "employee",
            userData.data.employee,
            departmentData.data.name,
            employeeData.data.name
          );
          navigate("/tech-admin");
        }
      } else if (userData?.data?.candidate) {
        const candidateData = await apiService.getCandidateById(
          userData.data.candidate
        );
        setUser(
          "candidate",
          userData.data.candidate,
          "",
          candidateData.data.name
        );
        navigate("/home");
      } else {
        toast.error("Permission is either not granted or has been removed.");
      }
      console.log(getUser());
    } catch (err) {
      const errorResponse = err as AxiosError;
      if (errorResponse?.response?.status === 401)
        toast.error("Invalid credentials");
    }
  };

  const methods = useForm({
    mode: "all",
  });
  const { handleSubmit } = methods;

  return (
    <>
      <div className="card-body py-5 px-md-5">
        <FormProvider {...methods}>
          <form onSubmit={handleSubmit(handleFormSubmit)}>
            <InputControl
              label={"Username"}
              type={"text"}
              controlKey={"username"}
              validationObject={{
                required: "Please fill username as required",
              }}
            />

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
                name="Sign In"
                buttonId="section-form-submit-btn"
                extraClass="fs-7 ms-auto mt-3"
              />
            </div>
          </form>
        </FormProvider>
      </div>
      <div className="card-footer bg-transparent border-0 fs-7">
        Don't have an account? <a href="/">Sign Up</a>
      </div>
    </>
  );
}

export default SignInFormProvider;
