import { Stack, Typography } from "@mui/material";
import { Select, Option } from "@mui/joy";
import { BarGraph } from "./BarGraph";
import React from "react";

export const Graph = () => {
  const [selectedOption, setSelectedOption] = React.useState("time");

  const handleOptionChange = (event: any, newValue: any) => {
    setSelectedOption(newValue);
    console.log(newValue);
  };

  const analyzedData = [
    {
      label: "打鍵速度",
      labelEn: "speed",
      data: [2.5, 3.0, 1.0, 4.2, 1.6, 2.0],
      borderColor: "rgb(75, 192, 192)",
    },
    {
      label: "削除率",
      labelEn: "delete-rate",
      data: [28, 48, 40, 19, 86, 27],
      borderColor: "rgb(255, 99, 132)",
    },
  ];

  return (
    <div>
      <Typography variant="h6" sx={{ color: "#ffffff", background: "#5F94D9" }}>
        区間別分析
      </Typography>
      {selectedOption === "time" ? <BarGraph /> : null}
      <div>
        <Stack spacing={2} direction="row">
          <div>
            <Stack spacing={2} direction={"row"}>
              <Typography variant="h6">表示方法</Typography>
              <Select value={selectedOption} onChange={handleOptionChange}>
                <Option value="time">時間による推移</Option>
                <Option value="blank">空欄ごと</Option>
              </Select>
            </Stack>
          </div>
          <div>
            <Stack spacing={2} direction={"row"}>
              <Typography variant="h6">分析対象</Typography>
              <Select defaultValue={analyzedData[0].labelEn}>
                {analyzedData.map((data, index) => (
                  <Option key={index} value={data.labelEn}>
                    {data.label}
                  </Option>
                ))}
              </Select>
            </Stack>
          </div>
        </Stack>
      </div>
    </div>
  );
};
