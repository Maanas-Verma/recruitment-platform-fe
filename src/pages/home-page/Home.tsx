import { ReactElement, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useForm, FormProvider } from "react-hook-form";
import Button from "../../components/Button";
import axios from "axios";

//TODO: add a patch call for resume.

function Home(): ReactElement {
  const methods = useForm({
    mode: "all",
  });

  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [isTestEnabled, setIsTestEnabled] = useState<boolean>(true); // change this to false
  const [userSpecificData, setUserSpecificData] = useState<any>(null);

  const navigate = useNavigate();

  const imagePath = "/Logo_large.png";
  const userName = "Manoj Sharma";
  const companyName = "ICICI";

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          //TODO: change this to some Id later
          "http://13.233.194.145:8000/user/candidate/8f622670-1ead-4d6c-8719-22219962152c/"
        );
        setUserSpecificData(response.data);
       if(response.data.resume!==null || response.data.resume!=="") setIsTestEnabled(true);
      } catch (error) {
        console.error("Error fetching user specific data:", error);
      }
    };

    fetchData();
  }, []);
  console.log("user specific data: ", userSpecificData);

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
    navigate("/candidate-test");
  };

  const handleFileUpload = async () => {
    if (!selectedFile) {
      console.error("No file selected");
      return;
    }

    const formData = new FormData();
    formData.append("resume", selectedFile);

    const apiUrl = `http://13.233.194.145:8000/user/candidate/8f622670-1ead-4d6c-8719-22219962152c/`;

    try {
      await axios.patch(apiUrl, formData);

      // Fetch updated user data after successful upload
      const response = await axios.get(apiUrl);
      setUserSpecificData(response.data);
      if(response.data.resume!==null || response.data.resume!=="") setIsTestEnabled(true);
      console.log("File uploaded successfully:", response.data);
    } catch (error) {
      console.error("Error uploading file:", error);
    }
  };

  return (
    <div className="d-flex flex-row mx-0 mt-6">
      <div className="d-flex  p-2 col-4">
        <img src={imagePath} alt=""></img>
      </div>
      <div className="d-flex col-8 flex-column">
        <div className="d-flex flex-column">
          <div>Hi, {userName}</div>
          <div>Welcome to {companyName}</div>
        </div>
        <div>
          <FormProvider {...methods}>
            <form>
              <label htmlFor="file-upload">
                Upload Your Resume
                <input
                  type="file"
                  id="file-upload"
                  name="asd"
                  onChange={handleFileChange}
                />
              </label>
              <div>
                {userSpecificData && userSpecificData.resume && (
                  <span>Selected File: {userSpecificData.resume}</span>
                )}
              </div>

              <Button
                theme=""
                size="small"
                name="Submit"
                extraClass="btn btn-outline-dark btn-lg"
                onClick={handleFileUpload}
              />
            </form>
          </FormProvider>
        </div>

        <div>
          <Button
            size="large"
            theme=""
            name="Enter The Test"
            disabled={!isTestEnabled}
            buttonId="enter-the-test"
            extraClass="btn btn-outline-dark btn-lg"
            onClick={handleEnterTheTest}
          ></Button>
        </div>
        <div>
          <Button
            size="large"
            theme=""
            name="Join Our Community"
            buttonId="join-our-community"
            extraClass="btn btn-outline-dark btn-lg"
            onClick={handleClick}
          ></Button>
        </div>
      </div>
    </div>
  );
}

export default Home;
