import {
  GetCandidateDataResponse,
  DepartmentData,
} from "../../interfaces/global.interfaces";

const dummyDepartmentData: Array<DepartmentData> = [
  {
    id: "department_1",
    name: "Quant",
    description:
      "Testing the ability to solve mathematical modelling, computer systems and data analysis to calculate the optimal probability of executing a profitable trade.",
    head: "Aman Gupta",
    requirements: ["java", "python", "c++"],
  },
  {
    id: "department_2",
    name: "Quant",
    description:
      "Testing the ability to solve mathematical modelling, computer systems and data analysis to calculate the optimal probability of executing a profitable trade.",
    head: "Aman Gupta",
    requirements: ["java", "python", "c++"],
  },
  {
    id: "department_3",
    name: "Quant",
    description:
      "Testing the ability to solve mathematical modelling, computer systems and data analysis to calculate the optimal probability of executing a profitable trade.",
    head: "Aman Gupta",
    requirements: ["java", "python", "c++"],
  },
  {
    id: "department_4",
    name: "Quant",
    description:
      "Testing the ability to solve mathematical modelling, computer systems and data analysis to calculate the optimal probability of executing a profitable trade.",
    head: "Aman Gupta",
    requirements: ["java", "python", "c++"],
  },
];

const dummyCandidateData: Array<GetCandidateDataResponse> = [
  {
    id: "candidate_1",
    name: "Aman Gupta",
    resume: "https://www.google.com",
    skill_set: ["java", "python", "c++"],
    score: "90",
    alloted_test: "Quant",
  },
  {
    id: "candidate_2",
    name: "Aman Gupta",
    resume: "https://www.google.com",
    skill_set: ["java", "python", "c++"],
    score: "90",
    alloted_test: "Quant",
  },
  {
    id: "candidate_3",
    name: "Aman Gupta",
    resume: "https://www.google.com",
    skill_set: ["java", "python", "c++"],
    score: "90",
    alloted_test: "Quant",
  },
  {
    id: "candidate_4",
    name: "Aman Gupta",
    resume: "https://www.google.com",
    skill_set: ["java", "python", "c++"],
    score: "90",
    alloted_test: "Quant",
  },
];

const Question = {
  id: "",
  description: "",
  question_type: "",
  tags: null,
  other_dependencies: {
    A: "",
    B: "",
    C: "",
    D: "",
  },
  correct_answer: "",
  created_at: "",
};

const FormatDate = (modifiedDate: string): string => {
  const date = new Date(modifiedDate);
  const options = {
    day: "numeric" as const,
    month: "short" as const,
    year: "numeric" as const,
    hour: "2-digit" as const,
    minute: "2-digit" as const,
    second: "2-digit" as const,
  };

  return date.toLocaleDateString("en-US", options);
};

const FormatKey = (key: string): string => {
  const words = key.split("_");
  let parsedKey = "";
  words.forEach((word: string) => {
    parsedKey += word.charAt(0).toUpperCase() + word.slice(1) + " ";
  });
  return parsedKey;
};

const utils = {
  FormatDate,
  FormatKey,
  Question,
  dummyDepartmentData,
  dummyCandidateData,
};

export default utils;
