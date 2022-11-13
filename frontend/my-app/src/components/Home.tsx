import { Button, Grid } from "@mui/material";
import Autocomplete from "@mui/material/Autocomplete";
import TextField from "@mui/material/TextField";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const [source, setSource] = useState<string | null>(null);
  const [destination, setDestination] = useState<string | null>(null);
  const [date, setDate] = React.useState<any | null>(null);
  const [trainClass, setTrainClass] = useState<string | null>(null);
  const navigate = useNavigate();

  const handleSearch = () => {
    navigate("/Train_Schedules", {
      state: {
        source: source,
        destination: destination,
        date: date,
        trainClass: trainClass,
      },

      replace: true,
    });
  };
  return (
    <Grid
      marginTop={"7em"}
      container
      rowSpacing={3}
      columnSpacing={{ xs: 1, sm: 2, md: 2 }}
      padding={"0em 2em"}
    >
      <Grid item xs={4}>
        <Autocomplete
          options={Locations.map((option) => option.city)}
          renderInput={(params) => (
            <TextField
              {...params}
              label="from station"
              InputProps={{
                ...params.InputProps,
                type: "search",
              }}
            />
          )}
          value={source}
          onChange={(event: any, newValue: string | null) => {
            setSource(newValue);
          }}
        />
      </Grid>
      <Grid item xs={4}>
        <Autocomplete
          freeSolo
          id="free-solo-2-demo"
          options={Locations.map((option) => option.city)}
          renderInput={(params) => (
            <TextField
              {...params}
              label="to station"
              InputProps={{
                ...params.InputProps,
                type: "search",
              }}
            />
          )}
          onChange={(event: any, newValue: string | null) => {
            setDestination(newValue);
          }}
          value={destination}
        />
      </Grid>
      <Grid item xs={5} width={"100ch"}>
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <DatePicker
            label="pick a date"
            inputFormat="YYYY-MM-DD"
            value={date}
            onChange={(newValue) => {
              console.log(newValue);
              console.log(typeof newValue);
              setDate(newValue?.$d);
            }}
            renderInput={(params) => <TextField {...params} />}
          />
        </LocalizationProvider>
      </Grid>
      <Grid item xs={5}>
        <Autocomplete
          freeSolo
          id="free-solo-2-demo"
          options={Class.map((option) => option.trainClass)}
          renderInput={(params) => (
            <TextField
              {...params}
              label="select a class"
              InputProps={{
                ...params.InputProps,
                type: "search",
              }}
            />
          )}
          onChange={(event: any, newValue: string | null) => {
            setTrainClass(newValue);
          }}
          value={trainClass}
        />
      </Grid>
      <Grid item xs={5}>
        <Button
          sx={{ padding: "0.75em 16em" }}
          size="large"
          variant="contained"
          onClick={() => handleSearch()}
        >
          Search Trains
        </Button>
      </Grid>
    </Grid>
  );
};

export { Home };
const Locations = [
  { city: "Dhaka" },
  { city: "Chattogram" },
  { city: "Khulna" },

  { city: "Barishal" },

  { city: "Sylhet" },
  { city: "Mymensing" },

  { city: "Faridpur" },
  { city: "Kulaura" },
  { city: "Kumilla" },
];
const Class = [
  { trainClass: "AC" },
  { trainClass: "Shovon Chair" },
  { trainClass: "Shovon" },
];
