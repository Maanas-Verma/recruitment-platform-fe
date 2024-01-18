import {
  GetCandidateDataResponse,
  DepartmentData,
  TechnicalData,
  TestElement,
} from "../../interfaces/global.interfaces";

const dummyTestData: Array<TestElement> = [
  {
    id: "test_1",
    name: "Quant",
    description:
      "Testing the ability to solve mathematical modelling, computer systems and data analysis to calculate the optimal probability of executing a profitable trade.",
    assigned_to: "Aman Gupta",
    status: "Pending",
    modified_at: "2024-01-17",
  },
  {
    id: "test_2",
    name: "Quant",
    description:
      "Testing the ability to solve mathematical modelling, computer systems and data analysis to calculate the optimal probability of executing a profitable trade.",
    assigned_to: "Aman Gupta",
    status: "Pending",
    modified_at: "2024-01-17",
  },
  {
    id: "test_3",
    name: "Quant",
    description:
      "Testing the ability to solve mathematical modelling, computer systems and data analysis to calculate the optimal probability of executing a profitable trade.",
    assigned_to: "Aman Gupta",
    status: "Completed",
    modified_at: "2024-01-17",
  },
  {
    id: "test_4",
    name: "Quant",
    description:
      "Testing the ability to solve mathematical modelling, computer systems and data analysis to calculate the optimal probability of executing a profitable trade.",
    assigned_to: "Aman Gupta",
    status: "Created",
    modified_at: "2024-01-17",
  },
];

const dummyTechnicalData: Array<TechnicalData> = [
  {
    id: "test_1",
    name: "Quant",
    description:
      "Testing the ability to solve mathematical modelling, computer systems and data analysis to calculate the optimal probability of executing a profitable trade.",
    status: "Pending",
    assigned_to: "Aman Gupta",
    modified_at: "2024-01-17",
    questions: {},
    created_by: "HR Admin",
    created_at: "2024-01-17",
    conducted_on: "2024-01-19",
  },
  {
    id: "test_2",
    name: "Quant",
    description:
      "Testing the ability to solve mathematical modelling, computer systems and data analysis to calculate the optimal probability of executing a profitable trade.",
    status: "Created",
    assigned_to: "Aman Gupta",
    modified_at: "2024-01-17",
    questions: {},
    created_by: "HR Admin",
    created_at: "2024-01-17",
    conducted_on: "2024-01-19",
  },
  {
    id: "test_3",
    name: "Quant",
    description:
      "Testing the ability to solve mathematical modelling, computer systems and data analysis to calculate the optimal probability of executing a profitable trade.",
    status: "Completed",
    assigned_to: "Aman Gupta",
    modified_at: "2024-01-17",
    questions: {},
    created_by: "HR Admin",
    created_at: "2024-01-17",
    conducted_on: "2024-01-19",
  },
  {
    id: "test_4",
    name: "Quant",
    description:
      "Testing the ability to solve mathematical modelling, computer systems and data analysis to calculate the optimal probability of executing a profitable trade.",
    status: "Completed",
    assigned_to: "Aman Gupta",
    modified_at: "2024-01-17",
    questions: {},
    created_by: "HR Admin",
    created_at: "2024-01-17",
    conducted_on: "2024-01-19",
  },
  {
    id: "test_5",
    name: "Quant",
    description:
      "Testing the ability to solve mathematical modelling, computer systems and data analysis to calculate the optimal probability of executing a profitable trade.",
    status: "Completed",
    assigned_to: "Aman Gupta",
    modified_at: "2024-01-17",
    questions: {},
    created_by: "HR Admin",
    created_at: "2024-01-17",
    conducted_on: "2024-01-19",
  },
  {
    id: "test_6",
    name: "Quant",
    description:
      "Testing the ability to solve mathematical modelling, computer systems and data analysis to calculate the optimal probability of executing a profitable trade.",
    status: "Completed",
    assigned_to: "Aman Gupta",
    modified_at: "2024-01-17",
    questions: {},
    created_by: "HR Admin",
    created_at: "2024-01-17",
    conducted_on: "2024-01-19",
  },
  {
    id: "test_7",
    name: "Quant",
    description:
      "Testing the ability to solve mathematical modelling, computer systems and data analysis to calculate the optimal probability of executing a profitable trade.",
    status: "Completed",
    assigned_to: "Aman Gupta",
    modified_at: "2024-01-17",
    questions: {},
    created_by: "HR Admin",
    created_at: "2024-01-17",
    conducted_on: "2024-01-19",
  },
];

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
  dummyTestData,
  dummyTechnicalData,
  dummyDepartmentData,
  dummyCandidateData,
};

export default utils;
