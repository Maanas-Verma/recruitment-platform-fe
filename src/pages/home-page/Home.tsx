import { ReactElement, useState } from "react";
import { Form, Link, Navigate, useNavigate } from "react-router-dom";
import { useForm, FormProvider } from "react-hook-form";
import InputControl from "../../components/InputControl";
import ReactDropdown from "../../components/ReactDropdown";
import TextAreaControl from "../../components/TextAreaControl";
import Button from "../../components/Button";
import axios from "axios";

// Add a get method call for resume getting

function Home(): ReactElement {
  const methods = useForm({
    mode: "all",
  });

  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const navigate = useNavigate();

  const imagePath = "/logo.png";
  const userName = "Manoj Sharma";
  const companyName = "ICICI";

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
    navigate('/candidate-test');
  }

  // const tableData = axios.get("http://13.233.194.145:8000/user/candidate/").then((resp)=>{
  //   const id = resp.data.alloted_set;
  //   axios.get(`http://13.233.194.145:8000/test_app/test/${id}/`);
  // });
  // return tableData;

  const handleFileUpload = () => {
    if (!selectedFile) {
      console.error("No file selected");
      return;
    }

    const formData = new FormData();
    formData.append("resume", selectedFile);
    formData.append("name", "abc");
    formData.append("skill_set", "asfjb");
    formData.append("score", String(40));

    const apiUrl = "http://13.233.194.145:8000/user/candidate/";

    fetch(apiUrl, {
      method: "POST",
      body: formData,
    })
      .then((response) => response.json())
      .then((data) => {
        console.log("File uploaded successfully:", data);
      })
      .catch((error) => {
        console.error("Error uploading file:", error);
      });
  };

  return (
    <div className="d-flex flex-row mx-0 mt-6">
      <div>
        <img src={imagePath} alt=""></img>
      </div>
      <div className="d-flex flex-column">
        <div>Hi, {userName}</div>
        <div>Welcome to {companyName}</div>
        <div></div>
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
      <FormProvider {...methods}>
        <form>
          <label htmlFor="file-upload">Upload Your Resume</label>
          <input type="file" id="file-upload" onChange={handleFileChange} />
          <button
            type="button"
            onClick={handleFileUpload}
            className="btn btn-primary"
          >
            Submit
          </button>
        </form>
      </FormProvider>
      <div>
          <Button
            size="large"
            theme=""
            name="Enter The Test"
            buttonId="enter-the-test"
            extraClass="btn btn-outline-dark btn-lg"
            onClick={handleEnterTheTest}
          ></Button>
        </div>
    </div>
  );
}

export default Home;
