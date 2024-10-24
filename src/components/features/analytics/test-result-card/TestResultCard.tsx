import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Stack,
  Typography,
} from "@mui/material";

import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";

type Props = {
  title: string;
  status: string;
  input: string;
  output: string;
  error: string;
};

export const TestResultCard = (props: Props) => {
  const { title, status, input, output, error } = props;
  return (
    <>
      <Accordion>
        <AccordionSummary
          expandIcon={<ArrowDropDownIcon />}
          aria-controls="panel2-content"
          id="panel2-header"
        >
          <Stack spacing={2} direction="row">
            <Typography
              fontSize={16}
              sx={{
                color: "#fff",
                background: status === "正解" ? "#4E9316" : "#d16b52",
                padding: "5px",
              }}
            >
              {status}
            </Typography>
            <Typography fontSize={20} variant="h6">
              {title}
            </Typography>
          </Stack>
        </AccordionSummary>
        <AccordionDetails>
          <Stack spacing={2}>
            <Stack spacing={2} direction="row">
              <div
                style={{
                  width: "200px",
                  background: "#f7f7f7",
                  padding: "10px",
                }}
              >
                <Typography fontWeight="bold">入力</Typography>
                <Typography>{input}</Typography>
              </div>
              <div
                style={{
                  width: "200px",
                  background: "#f7f7f7",
                  padding: "10px",
                }}
              >
                <Typography fontWeight="bold">出力</Typography>
                <Typography>{output}</Typography>
              </div>
            </Stack>
            {error && (
              <Stack spacing={2}>
                <Typography fontWeight="bold">エラー</Typography>
                <textarea
                  readOnly
                  style={{ width: "400px", height: "100px" }}
                  value={error}
                />
              </Stack>
            )}
          </Stack>
        </AccordionDetails>
      </Accordion>
    </>
  );
};
