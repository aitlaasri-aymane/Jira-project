import React, { useEffect, useState } from "react";
import Box from "@mui/material/Box";
import { invoke } from "@forge/bridge";
import LinearProgressWithLabel from "./components/BorderLinearProgress";
import CircularProgress from "@mui/material/CircularProgress";
import TextField from "@mui/material/TextField";
import { Button } from "@mui/material";
import { TimeField } from "@mui/x-date-pickers/TimeField";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterMoment } from "@mui/x-date-pickers/AdapterMoment";
import Typography from "@mui/material/Typography";
import moment from "moment";

function App() {
  const [maxProgressData, setMaxProgressData] = useState("loading");
  const [progressData, setProgressData] = useState(0);
  const [inputData, setInputData] = useState(0);

  useEffect(() => {
    invoke("getMaxProjectProgress", { storageKey: "MaxProjectProgress" }).then(
      (data) => {
        setMaxProgressData(data);
        console.log(data);

        invoke("getProjectProgress", { storageKey: "ProjectProgress" }).then(
          (data) => {
            if (typeof data === "number") setProgressData(data);
            console.log(data);
          }
        );
      }
    );
  }, []);

  const handleButtonClick = () => {
    invoke("setMaxProjectProgress", {
      storageKey: "MaxProjectProgress",
      value: inputData,
    }).then(setMaxProgressData(inputData));
  };
  const handleChangeButtonClick = () => {
    invoke("deleteMaxProjectProgress", {
      storageKey: "MaxProjectProgress",
    }).then(setMaxProgressData({}));
  };
  const handleResetButtonClick = () => {
    invoke("deleteProjectProgress", {
      storageKey: "ProjectProgress",
    }).then(setProgressData(0));
  };

  return (
    <div>
      {maxProgressData === "loading" ? (
        <Box sx={{ width: "100%", display: "flex", justifyContent: "center" }}>
          <CircularProgress />
        </Box>
      ) : typeof maxProgressData === "number" ? (
        <Box sx={{ marginRight: 1 }}>
          <LinearProgressWithLabel
            variant="determinate"
            maxValue={maxProgressData}
            currentValue={progressData}
            value={
              progressData > maxProgressData
                ? 100
                : Math.round((progressData / maxProgressData) * 100)
            }
            color={
              progressData > maxProgressData
                ? "error"
                : progressData === maxProgressData
                ? "success"
                : "primary"
            }
          />
          <Box
            sx={{
              width: "100%",
              display: "flex",
              justifyContent: "center",
            }}
          >
            <Button
              variant="contained"
              onClick={handleChangeButtonClick}
              color="error"
              sx={{ margin: 2 }}
            >
              Change Project Time
            </Button>
            <Button
              variant="contained"
              onClick={handleResetButtonClick}
              color="error"
              sx={{ margin: 2 }}
            >
              Reset Project Progress
            </Button>
          </Box>
        </Box>
      ) : (
        <Box
          sx={{
            width: "100%",
            display: "flex",
            justifyContent: "center",
            margin: 2,
            gap: 2,
          }}
        >
          <TextField
            id="outlined-number"
            label="Time in seconds"
            type="number"
            onChange={(e) => {
              setInputData(+e.target.value);
            }}
          />

          <Button
            variant="contained"
            disabled={inputData ? false : true}
            onClick={handleButtonClick}
          >
            Set Project Work Duration
          </Button>
          {/* <LocalizationProvider dateAdapter={AdapterMoment}>
            <TimeField
              label="Format without meridiem"
              onChange={(newValue) => {
                const time = moment(newValue._d).format("HH:mm");
                console.log(moment.duration(time));
                console.log(time, typeof time);
              }}
              format="HH:mm"
            />
          </LocalizationProvider> */}
        </Box>
      )}
    </div>
  );
}

export default App;
