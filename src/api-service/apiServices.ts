import axios, { AxiosResponse } from "axios";
import environmentData from "../environment-constant";
import {
  PostQuestionRequest,
  PostQuestionResponse,
} from "../interfaces/global.interfaces";

class HrAPI {
  endpoints: { [key: string]: string };

  base_url: string;

  constructor() {
    this.endpoints = {
      question: "/test_app/question/",
    };

    this.base_url = `${environmentData.url}`
  }

  /**
   * Makes the API call to POST all questions.
   *
   * @param tokenData - Token request details.
   * @returns - Returns a promise with currency pair positions details.
   */
  postQuestion = async (
    data: PostQuestionRequest
  ): Promise<AxiosResponse<PostQuestionResponse[]>> => {
    return axios.post(`${this.base_url}${this.endpoints.question}`, data);
  };
}
const apiService = new HrAPI();
export default apiService;
