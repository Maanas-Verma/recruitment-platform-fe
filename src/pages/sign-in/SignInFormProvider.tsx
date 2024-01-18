import { ReactElement } from "react";
import { FieldValue, FormProvider, useForm } from "react-hook-form";
import InputControl from "../../components/InputControl";
import Button from "../../components/Button";
import apiService from "../../api-service/apiServices";
import { getUser, setUser } from "../../api-service/sessionStorage";
import { toast } from "react-toastify";

interface SignInForm {
  username: string;
  password: string;
}

function SignInFormProvider(): ReactElement {


  const handleFormSubmit = async (data: FieldValue<SignInForm>) => {
    try {
      const userData = await apiService.signIn(data as SignInForm)
      if(userData.data?.employee){
        const employeeData = await apiService.getEmployeeById(userData.data.employee)
        const departmentData = await apiService.getDepartmentById(employeeData.data.department.toString())
        if(departmentData.data.name==='HR'){
          setUser("hr", userData.data.employee, employeeData.data.department.toString())
        }else{
          setUser("employee", userData.data.employee, employeeData.data.department.toString())
        }
      }
      else if(userData.data?.candidate){
        setUser("candidate", userData.data.candidate)
      }
      console.log(getUser())
    } catch (error) {
      toast.error(`Error while getting candidates: ${error}`)
    }
  };

  const methods = useForm({
    mode: "all",
  });
  const { handleSubmit } = methods;

  return (
    <FormProvider {...methods}>
      <form onSubmit={handleSubmit(handleFormSubmit)}>

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
            name="Sign In"
            buttonId="section-form-submit-btn"
            extraClass="fs-6 ms-auto mt-3"
          />
        </div>
      </form>
    </FormProvider>
  );
}

export default SignInFormProvider;