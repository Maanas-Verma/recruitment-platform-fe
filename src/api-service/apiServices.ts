import axios, { AxiosResponse } from "axios";
import environmentData from "../environment-constant";
import {
  GetTestResponse,
  PostQuestionRequest,
  PostQuestionResponse,
} from "../interfaces/global.interfaces";

class HrAPI {
  endpoints: { [key: string]: string };

  base_url: string;

  constructor() {
    this.endpoints = {
      question: "/test_app/question/",
      test: "/test_app/test/"
    };

    this.base_url = `${environmentData.url}`
  }

  /**
   * Makes the API call to POST all questions.
   *
   * @returns - Returns a promise with the question objects.
   */
  postQuestion = async (
    data: PostQuestionRequest
  ): Promise<AxiosResponse<PostQuestionResponse[]>> => {
    return axios.post(`${this.base_url}${this.endpoints.question}`, data);
  };

  /**
   * Makes the API call to GET all Test.
   * 
   * @returns - Returns a promise with all Tests.
   */
  getTest = async (): Promise<AxiosResponse<GetTestResponse[]>> => {
    return axios.get(`${this.base_url}${this.endpoints.test}`);
  }
}
const apiService = new HrAPI();
export default apiService;
