import { ReactElement, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useForm, FormProvider } from "react-hook-form";
import Button from "../../components/Button";
import axios from "axios";
import { toast } from "react-toastify";
import apiService from "../../api-service/apiServices";
import { getUser } from "../../api-service/sessionStorage";
import {
  userSessionDetail,
  GetCandidateDataResponse,
} from "../../interfaces/global.interfaces";

function Home(): ReactElement {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [isTestEnabled, setIsTestEnabled] = useState<boolean>(false);
  const [userSpecificData, setUserSpecificData] =
    useState<GetCandidateDataResponse>();
  const [testId, setTestId] = useState<any>(null);
  const [userId, setUserId] = useState<any>();

  const methods = useForm({
    mode: "all",
  });
  const navigate = useNavigate();

  const userDetail: userSessionDetail = getUser();
  const userName = userDetail.userName?.toUpperCase();
  const imagePath = "/Logo_large.png";

  useEffect(() => {
    const user: userSessionDetail = getUser();

    if (user.userType !== "candidate") {
      navigate("/");
      return;
    }
    if (!userId) {
      setUserId(user.userId);
    }

    const fetchCandidateData = async (candidateID: string) => {
      try {
        const getResponse = await apiService.getCandidateById(candidateID);
        if (getResponse?.data) {
          setUserSpecificData(getResponse.data);
          console.log("Response: ", getResponse.data);
        }
        if (
          (getResponse?.data?.resume !== null ||
            getResponse?.data?.resume !== "") &&
          getResponse?.data?.alloted_test !== null
        ) {
          setIsTestEnabled(true);
          setTestId(getResponse?.data?.alloted_test);
        }
      } catch (error) {
        console.error("Error:", error);
      }
    };

    fetchCandidateData(user.userId);
  }, [navigate, userDetail.userId]);

  const handleClick = () => {
    const newWindow = window.open(
      "https://in.linkedin.com/company/icici-bank",
      "_blank"
    );

    if (newWindow) {
      newWindow.focus();
    } else {
      console.error("Failed to open new tab");
    }
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0] || null;
    setSelectedFile(file);
  };

  const handleEnterTheTest = () => {
    console.log("Enter the test clicked");
    alert("You are about to enter the test!");
    navigate("/candidate-test", { state: { testId, userId } });
  };

  const handleFileUpload = async (userId: string) => {
    if (!userId) {
      console.error("UserId is not defined");
      return;
    }

    console.log(userId);
    if (!selectedFile) {
      console.error("No file selected");
      return;
    }

    const formData = new FormData();
    formData.append("resume", selectedFile);

    const apiUrl = `http://13.233.194.145:8000/user/candidate/${userId}/`;

    try {
      await axios.patch(apiUrl, formData);
      const response = await axios.get(apiUrl);
      setUserSpecificData(response.data);
      if (
        (response.data.resume !== null || response.data.resume !== "") &&
        response.data.alloted_test !== null
      ) {
        setIsTestEnabled(true);
      }
      console.log("File uploaded successfully:", response.data);
      toast.success("File uploaded successfully!");
    } catch (error) {
      console.error("Error uploading file:", error);
    }
  };

  return (
    <div
      className="container-fluid row d-flex flex-row justify-content-center align-items-center p-0 m-0"
      style={{ height: "94vh" }}
    >
      <div className="d-flex col-6 justify-content-center">
        <img src={imagePath} alt=""></img>
      </div>
      <div className="d-flex col-6 flex-column">
        <div className="d-flex flex-column">
          <h3 className="d-flex flex-column fw-bold gap-2">
            <span>Hi, </span>
            <span>{userName}</span>
          </h3>
        </div>
        <div className="mt-6">
          <h2 className="fw-normal text-primary">Welcome to ICICI</h2>
        </div>
        <div className="mt-4 mb-6">
          <FormProvider {...methods}>
            <form onSubmit={(e) => e.preventDefault()}>
              <div className="d-flex flex-column border border-1 rounded-3 p-4 gap-4">
                <label htmlFor="file-upload" className="text-muted fw-normal">
                  Kindly upload your resume below:
                </label>
                <div className="d-flex justify-content-between">
                  <input
                    className={"form-control w-75"}
                    id="file-upload"
                    type="file"
                    name="asd"
                    onChange={handleFileChange}
                  />
                  <Button
                    size="small"
                    theme="dark"
                    buttonType="outline"
                    name="Submit"
                    submitType="submit"
                    onClick={() => handleFileUpload(userId)}
                    disabled={!selectedFile}
                  />
                </div>
              </div>
              <div className="p-2 fs-7 overflow-auto">
                {userSpecificData && userSpecificData.resume && (
                  <span className="col-3 text-success">
                    Uploaded File: {userSpecificData.resume}
                  </span>
                )}
              </div>
            </form>
          </FormProvider>
        </div>
        <div className="d-flex justify-content-between mt-6">
          <Button
            size="medium"
            theme="dark"
            buttonType="outline"
            name="Enter The Test"
            disabled={!isTestEnabled}
            buttonId="enter-the-test"
            onClick={handleEnterTheTest}
          ></Button>
          <Button
            size="medium"
            theme="dark"
            buttonType="outline"
            name="Join Our Community"
            buttonId="join-our-community"
            onClick={handleClick}
          ></Button>
        </div>
      </div>
    </div>
  );
}

export default Home;
