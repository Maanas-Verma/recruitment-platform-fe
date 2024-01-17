import axios, { AxiosResponse } from "axios";
import environmentData from "../environment-constant";
import {
  postQuestionRequest,
  postQuestionResponse,
} from "../interfaces/global.interfaces";

class HrAPI {
  endpoints: { [key: string]: string };

  base_url: string;

  constructor() {
    this.endpoints = {
      question: "/test_app/question/",
    };

    this.base_url = `${environmentData.url}`;
  }

  getHeaders = () => {
    const headers = {
      "Content-Type": "application/json",
    };
    return headers;
  };

  /**
   * Makes the API call to POST all questions.
   *
   * @param tokenData - Token request details.
   * @returns - Returns a promise with currency pair positions details.
   */
  postQuestion = async (
    data: postQuestionRequest
  ): Promise<AxiosResponse<postQuestionResponse[]>> => {
    return axios.post(`${this.base_url}${this.endpoints.question}`, data);
  };
}
const apiService = new HrAPI();
export default apiService;
