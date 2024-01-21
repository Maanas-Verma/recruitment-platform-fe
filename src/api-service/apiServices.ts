import axios, { Axios, AxiosResponse } from "axios";
import environmentData from "../environment-constant";
import {
  DepartmentData,
  GetCandidateDataResponse,
  GetCandidateResultData,
  GetCandidateTestData,
  GetEmployeeDataResponse,
  GetResumeMatricesResponse,
  GetTestResponse,
  PatchCandidateResultData,
  PatchTestRequest,
  PostCandidateRequest,
  PostDepartmentRequest,
  PostQuestionRequest,
  PostQuestionResponse,
  PostTestRequest,
  SignInRequest,
  SignUpRequest,
} from "../interfaces/global.interfaces";

class HrAPI {
  endpoints: { [key: string]: string };

  base_url: string;

  constructor() {
    this.endpoints = {
      question: "/test_app/question/",
      test: "/test_app/test/",
      test_response: "/test_app/test_response/",
      test_result_response: "/test_app/get_candidate_test_response/",
      department: "/user/department/",
      employee: "/user/employee/",
      candidate: "/user/candidate/",
      resume: "/user/get_file/",
    };

    this.base_url = `${environmentData.url}`;
  }

  /**
   * Makes the API call to GET all Test.
   *
   * @returns - Returns a promise with all Tests.
   */
  getTest = async (): Promise<AxiosResponse<GetTestResponse[]>> => {
    return axios.get(`${this.base_url}${this.endpoints.test}`);
  };

  /**
   * Makes the API call to Patch the Test.
   *
   * @returns - Returns a promise with the Tests.
   */
  patchTest = async (
    data: PatchTestRequest
  ): Promise<AxiosResponse<GetTestResponse>> => {
    return axios.patch(`${this.base_url}${this.endpoints.test}`, data);
  };

  /**
   * Makes API call to Get the Candidate Test.
   */
  getCandidateTestData = async (
    allotedTestId: string
  ): Promise<AxiosResponse<GetCandidateTestData>> => {
    return axios.get(
      `${this.base_url}${this.endpoints.test}get-test-by-id?id=${allotedTestId}`
    );
  };

  /**
   * Makes API call to Post Patch the Candidate Test.
   */
  patchCandidateTestData = async (
    data: PatchCandidateResultData
  ): Promise<AxiosResponse<GetCandidateTestData>> => {
    return axios.patch(`${this.base_url}${this.endpoints.test_response}`, data);
  };

  /**
   * Makes API call to get response sheet for the Candidate Test.
   */
  getCandidateResultData = async (
    userId: string
  ): Promise<AxiosResponse<GetCandidateResultData>> => {
    return axios.get(
      `${this.base_url}${this.endpoints.test_result_response}${userId}`
    );
  };

  /**
   * Makes API call to Patch the Candidate assigning.
   */
  patchCandidate1 = async (data: {
    id: string;
    alloted_test: string;
  }): Promise<AxiosResponse<GetCandidateDataResponse>> => {
    return axios.patch(
      `${environmentData.url}/user/candidate/${data.id}/`,
      data
    );
  };

  /**
   * Makes the API call to Get all departments.
   *
   * @returns - Returns a promise with all departments.
   */
  getDepartment = async (): Promise<AxiosResponse<DepartmentData[]>> => {
    return axios.get(`${this.base_url}${this.endpoints.department}`);
  };

  /**
   * Makes the API call to Get department by id
   *
   * @param id - Department id
   */
  getDepartmentById = async (
    id: string
  ): Promise<AxiosResponse<DepartmentData>> => {
    return axios.get(`${this.base_url}${this.endpoints.department}${id}/`);
  };

  /**
   * Makes the API call to get all employees
   *
   * @returns - Returns a promise with all employees.
   */
  getEmployee = async (): Promise<AxiosResponse<GetEmployeeDataResponse[]>> => {
    return axios.get(`${this.base_url}${this.endpoints.employee}`);
  };

  /**
   * Makes the API call to get employee by id
   *
   * @param id - employee id
   */
  getEmployeeById = async (
    id: string
  ): Promise<AxiosResponse<GetEmployeeDataResponse>> => {
    return axios.get(`${this.base_url}${this.endpoints.employee}${id}/`);
  };

  /**
   * Makes the API call to Get all Candidates
   *
   * @returns - Returns a promise with all candidates.
   */
  getCandidate = async (): Promise<
    AxiosResponse<GetCandidateDataResponse[]>
  > => {
    return axios.get(`${this.base_url}${this.endpoints.candidate}`);
  };

  /**
   * Makes the API call to Get Candidate by id
   */
  getCandidateById = async (
    id: string
  ): Promise<AxiosResponse<GetCandidateDataResponse>> => {
    return axios.get(`${this.base_url}${this.endpoints.candidate}${id}/`);
  };

  /**
   * Makes the API call to Get resume and download it
   *
   * @param id - Candidate id
   */
  getResume = async (id: string): Promise<AxiosResponse<Blob>> => {
    return axios.get(`${this.base_url}${this.endpoints.resume}${id}/`, {
      responseType: "blob",
    });
  };

  /**
   * Makes the API call for resume matrices.
   *
   * @returns - Returns a promise with resume matrices.
   */
  getResumeMatrices = async (): Promise<
    AxiosResponse<GetResumeMatricesResponse>
  > => {
    return axios.get(`${this.base_url}/ml/parse_resume`);
  };
  /**
   * Makes the API call to Post a Department.
   *
   * @returns - Returns a promise with the department object.
   */
  postDepartment = async (
    data: PostDepartmentRequest
  ): Promise<AxiosResponse<DepartmentData[]>> => {
    return axios.post(`${this.base_url}${this.endpoints.department}`, data);
  };

  /**
   * Makes the API call to Post Test.
   *
   * @returns - Returns a promise with the test object.
   */
  postTestToken = async (
    data: PostTestRequest
  ): Promise<AxiosResponse<GetTestResponse>> => {
    return axios.post(`${this.base_url}${this.endpoints.test}`, data);
  };

  /**
   * Makes the API call to remove Candidate.
   *
   * @returns - Returns a promise with the test object.
   */
  removeCandidates = async (
    idArr: string[]
  ): Promise<AxiosResponse<null>[][]> => {
    const obj: Promise<AxiosResponse<null>[]>[] = [];
    Object.values(idArr).map((id) => {
      obj.push(
        axios.delete(`${this.base_url}${this.endpoints.candidate}${id}/`)
      );
    });
    console.log("all api calls done");
    return Promise.all(obj);
  };

  /**
   * Makes the API call for patching a Candidate.
   *
   * @returns - Returns a promise with the test object.
   */
  patchCandidate = async (
    id: string,
    data: PostCandidateRequest
  ): Promise<AxiosResponse<GetCandidateDataResponse>> => {
    return axios.patch(
      `${this.base_url}${this.endpoints.candidate}${id}/`,
      data
    );
  };

  /** Makes the API call to POST all questions.
   *
   * @returns - Returns a promise with the question objects.
   */
  getQuestion = async (): Promise<AxiosResponse<PostQuestionResponse[]>> => {
    return axios.get(`${this.base_url}${this.endpoints.question}`);
  };

  /**
   * Makes the API call to POST all questions.
   *
   * @param tokenData - Token request details.
   * @returns - Returns a promise with currency pair positions details.
   */
  getQuestionById = async (
    dataID: string
  ): Promise<AxiosResponse<PostQuestionResponse>> => {
    return axios.get(`${this.base_url}${this.endpoints.question}${dataID}`);
  };

  /**
   * Makes the API call to POST all questions.
   *
   * @param tokenData - Token request details.
   * @returns - Returns a promise with currency pair positions details.
   */
  postQuestion = async (
    postData: PostQuestionRequest
  ): Promise<AxiosResponse<PostQuestionResponse>> => {
    return axios.post(`${this.base_url}${this.endpoints.question}`, postData);
  };

  /**
   * Makes the API call for Sign Up.
   *
   * @param data - Sign Up request details.
   */
  signUp = async (data: SignUpRequest) => {
    return axios.post(`${this.base_url}/user/user/`, data);
  };

  /**
   * Makes the API call for Sign In.
   *
   * @param data - Sign In request details.
   */
  signIn = async (data: SignInRequest) => {
    return axios.post(`${this.base_url}/login/`, data);
  };
}
const apiService = new HrAPI();

export default apiService;
