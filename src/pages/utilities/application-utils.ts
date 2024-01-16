import { TestElement } from "../../interfaces/global.interfaces";

const dummyTestData: Array<TestElement> = [
  {
    id: "test_1",
    title: "Quant",
    description:
      "Testing the ability to solve mathematical modelling, computer systems and data analysis to calculate the optimal probability of executing a profitable trade.",
    application: "+3",
    alloted_to: "Aman Gupta",
    status: "Pending",
    modified_at: "2024-01-17",
  },
  {
    id: "test_2",
    title: "Quant",
    description:
      "Testing the ability to solve mathematical modelling, computer systems and data analysis to calculate the optimal probability of executing a profitable trade.",
    application: "+3",
    alloted_to: "Aman Gupta",
    status: "Pending",
    modified_at: "2024-01-17",
  },
  {
    id: "test_3",
    title: "Quant",
    description:
      "Testing the ability to solve mathematical modelling, computer systems and data analysis to calculate the optimal probability of executing a profitable trade.",
    application: "+3",
    alloted_to: "Aman Gupta",
    status: "Completed",
    modified_at: "2024-01-17",
  },
  {
    id: "test_4",
    title: "Quant",
    description:
      "Testing the ability to solve mathematical modelling, computer systems and data analysis to calculate the optimal probability of executing a profitable trade.",
    application: "+3",
    alloted_to: "Aman Gupta",
    status: "Created",
    modified_at: "2024-01-17",
  },
];

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
  dummyTestData,
};

export default utils;
