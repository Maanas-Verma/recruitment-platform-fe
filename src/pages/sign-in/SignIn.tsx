import { ReactElement, useState, useContext, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useForm, FormProvider, FieldValue, set } from "react-hook-form";
import SignUpFormProvider from "./SignUpFormProvider";
import SignInFormProvider from "./SignInFormProvider";
import TabControl from "../../components/TabControl";

/**
 * Component for Sign In Component.
 *
 * @returns - Sign In Component.
 */

function SignIn(): ReactElement {
  const navigate = useNavigate();
  const [isSignUp, setIsSignUp] = useState(false);

  const handleToChange = (event: React.SyntheticEvent, value: string) => {
    setIsSignUp(!isSignUp);
  };

  return (
    <div
      className="px-4 py-5 px-md-5 container-fluid row text-center text-lg-start d-flex"
      style={{ height: "94vh" }}
    >
      <div className="container d-flex align-items-stretch">
        <div className="row gx-lg-5 align-items-center d-flex align-items-center flex-grow-1">
          <div className="col-lg-6 mb-5 ps-6 mb-lg-0 d-flex flex-column justify-content-center">
            <h1 className="mb-5 display-3 fw-bold ls-tight">
              Hire with Confidence <br />
              <span className="text-primary">Recruit with Precision</span>
            </h1>
            <span>
              Lorem ipsum dolor sit amet, consectetur adipisicing elit. Possimus
              magni quas placeat earum. Qui repellat libero officiis totam neque
              rerum quae, alias perferendis obcaecati maiores vel in eaque
              commodi unde.
            </span>
          </div>

          <div className="col-lg-6 px-5 d-flex justify-content-center">
            <div className="card" style={{ width: "400px", height: "400px" }}>
              <div className="card-header bg-transparent border-bottom-0 pt-6 px-md-5">
                <TabControl
                  value={isSignUp ? "Sign Up" : "Sign In"}
                  handleTabChange={handleToChange}
                  tabList={[
                    { label: "Sign In", value: "Sign In" },
                    { label: "Sign Up", value: "Sign Up" },
                  ]}
                />
              </div>
              <div className="card-body py-5 px-md-5">
                {isSignUp ? <SignUpFormProvider setIsSignUp={setIsSignUp}/> : <SignInFormProvider />}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SignIn;
