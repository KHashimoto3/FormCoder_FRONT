import { FormData } from "../../types/formData";
import { Process } from "./formComponents/Process";

type Props = {
  partType: string;
  childrenPart: string | FormData;
  inputData: string;
};

export const FormProvider = (props: Props) => {
  const formData = props;
  //受け取ったpartTypeによって、表示するフォームを変更する
  if (formData.partType == "0") {
    return <Process />;
  }
};
