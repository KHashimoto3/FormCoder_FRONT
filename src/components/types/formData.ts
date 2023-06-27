export type FormData = {
  id: number;
  partType: string;
  explanation: string;
  childrenPart: string | FormData;
  inputData: string;
};
