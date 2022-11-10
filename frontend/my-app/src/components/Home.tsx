import { Button, Grid } from "@mui/material";
import Autocomplete from "@mui/material/Autocomplete";
import TextField from "@mui/material/TextField";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DesktopDatePicker } from "@mui/x-date-pickers/DesktopDatePicker";
import dayjs, { Dayjs } from "dayjs";
import React, { createContext, useState } from "react";
import { Link } from "react-router-dom";

const UserContext = createContext<any | null>(null);

const Home = () => {
  const [source, setSource] = useState<string>("");
  const [destination, setDestination] = useState<string>("");
  const [date, setDate] = React.useState<Dayjs | null>(dayjs("2022-11-10"));
  const [trainClass, setTrainClass] = useState<string>("");

  const dateChange = (newValue: Dayjs | null) => {
    setDate(newValue);
  };
  return (
    <UserContext.Provider
      value={{
        source: [source, setSource],
        destination: [destination, setDestination],
        date: [date, setDate],
        trainClass: [trainClass, setTrainClass],
      }}
    >
      <Grid
        marginTop={"7em"}
        container
        rowSpacing={3}
        columnSpacing={{ xs: 1, sm: 2, md: 2 }}
        padding={"0em 2em"}
      >
        <Grid item xs={4}>
          <Autocomplete
            id="From Station"
            freeSolo
            onChange={(event: any) => {
              setSource(event.target.value);
            }}
            renderInput={(params) => (
              <TextField {...params} label="From Station" />
            )}
            value={source}
            options={[]}
          />
        </Grid>
        <Grid item xs={4}>
          <Autocomplete
            id="To Station"
            freeSolo
            onChange={(event: any) => {
              setDestination(event.target.value);
            }}
            renderInput={(params) => (
              <TextField {...params} label="To Station" />
            )}
            value={destination}
            options={[]}
          />
        </Grid>
        <Grid item xs={5} width={"100ch"}>
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DesktopDatePicker
              label="pick a date"
              inputFormat="YYYY/MM/DD"
              value={date}
              onChange={dateChange}
              renderInput={(params) => <TextField {...params} />}
            />
          </LocalizationProvider>
        </Grid>
        <Grid item xs={5}>
          <Autocomplete
            disablePortal
            id="combo-box-demo"
            onChange={(event: any) => {
              setTrainClass(event.target.value);
            }}
            options={[]}
            sx={{ width: 300 }}
            renderInput={(params) => (
              <TextField {...params} label="choose a class" />
            )}
            value={trainClass}
          />
        </Grid>
        <Grid item xs={5}>
          <Button
            sx={{ padding: "0.75em 16em" }}
            size="large"
            variant="contained"
            component={Link}
            to={"/Train_Schedules"}
          >
            Search Trains
          </Button>
        </Grid>
      </Grid>
    </UserContext.Provider>
  );
};

export { UserContext, Home };
