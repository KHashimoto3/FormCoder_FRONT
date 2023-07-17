export type HintData = {
  partType: string;
  partTitle: string;
  hintList: HintList[];
};

type HintList = {
  hintType: string;
  hintTitle: string;
  hint: string;
};
