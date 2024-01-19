import { ReactElement, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useForm, FormProvider } from "react-hook-form";
import Button from "../../components/Button";
import axios from "axios";
import { toast } from "react-toastify";
import apiService from "../../api-service/apiServices";
import { getUser } from "../../api-service/sessionStorage";

//TODO: add a patch call for resume.

function Home(): ReactElement {
  const methods = useForm({
    mode: "all",
  });

  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [isTestEnabled, setIsTestEnabled] = useState<boolean>(false);
  const [userSpecificData, setUserSpecificData] = useState<any>(null);
  const [testId, setTestId] = useState<any>(null);
  const [userId, setUserId] = useState<any>();
  const navigate = useNavigate();

  const imagePath = "/Logo_large.png";
  const userName = "Manoj Sharma";
  const companyName = "ICICI";

  useEffect(() => {
    const user = getUser();
    if (user.userType !== "candidate") {
      navigate("/");
      return;
    }
    const fetchData = async () => {
      try {
        const response = await apiService.getCandidateById(getUser().userId);
        setUserSpecificData(response.data);
        console.log("responsea aa: ", response);

        if (
          (response.data.resume !== null || response.data.resume !== "") &&
          response.data.alloted_test !== null
        ) {
          setIsTestEnabled(true);
          setTestId(response.data.alloted_test);
          setUserId(response.data.id);
        }
      } catch (error) {
        console.error("Error fetching user specific data:", error);
      }
    };

    fetchData();
  }, []);

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
    navigate("/candidate-test", { state: { testId, userId} });
  };

  const handleFileUpload = async () => {
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
    <div className="d-flex flex-row mx-0 mt-6">
      <div className="d-flex  p-2 flex-shrink">
        <img src={imagePath} alt=""></img>
      </div>
      <div className="d-flex col-8 flex-column">
        <div className="d-flex flex-column">
          <h3>
            <strong>
              <div>Hi, {userName}</div>
              <div>Welcome to {companyName}</div>
            </strong>
          </h3>
        </div>
        <div>
          <FormProvider {...methods}>
            <form onSubmit={(e) => e.preventDefault()}>
              <label
                htmlFor="file-upload"
                className="border border-1 rounded-3 mt-3 p-2"
              >
                Upload Your Resume
                <input
                  type="file"
                  id="file-upload"
                  name="asd"
                  onChange={handleFileChange}
                  className="p-2"
                />
              </label>
              <div style={{ overflow: "auto" }}>
                {userSpecificData && userSpecificData.resume && (
                  <span className="col-3">
                    Uploaded File: {userSpecificData.resume}
                  </span>
                )}
              </div>

              <Button
                size="medium"
                theme="dark"
                buttonType="outline"
                name="Submit"
                submitType="submit"
                onClick={handleFileUpload}
                disabled={!selectedFile}
              />
            </form>
          </FormProvider>
        </div>

        <div>
          <Button
            size="medium"
            theme="dark"
            buttonType="outline"
            name="Enter The Test"
            disabled={!isTestEnabled}
            buttonId="enter-the-test"
            onClick={handleEnterTheTest}
          ></Button>
        </div>
        <div>
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
