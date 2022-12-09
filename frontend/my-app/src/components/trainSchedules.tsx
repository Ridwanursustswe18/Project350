import {
  Avatar,
  Box,
  Button,
  Card,
  Divider,
  MenuItem,
  Paper,
  TextField,
  Tooltip,
  Typography,
} from "@mui/material";
import axios from "axios";
import moment from "moment";
import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import authHeader from "../services/auth";

interface tripInfo {
  trip_id: number;
  seat_class_id: number;
  bogey_id: number;
  source: string;
  destination: string;
  trip_date: string;
  departure_time: string;
  arrival_time: string;
  total_time: string;
  seat_available_online: number;
  seat_available_counter: number;
  train_name: string;
  fare: number;
  class_name: string;
  bogey_name: string;
  seat_status: number;
}
interface showBogeysType {
  bogey_id: number;
  bogey_name: string;
}
interface showseatType {
  seat_id: number;
  seat_name: string;
  bogey_name: string;
  seat_status: number;
}
const TrainSchedules = () => {
  const token = localStorage.getItem("token");
  const { state } = useLocation();
  const navigate = useNavigate();
  const source = state.source,
    destination = state.destination,
    date: Date = state.date,
    class_name = state.trainClass;
  const [trips, setTrips] = useState([]);
  const [trip_id, setTripID] = useState<number>();
  const [fare, setFare] = useState<number>(0);
  const [seat_class_id, setClassID] = useState<number>();
  const trip_date = moment(date).format();
  const [bogeys, setShowBogeys] = useState([]);
  const [bogey_name, setBogeyName] = useState<string>("");
  const [bogey_id, setBogeyID] = useState<number>();
  // const [bogey_name, setBogeyName] = useState<string>(bogey);
  const [seats, setSeats] = useState([]);
  const [show, setShow] = useState<boolean>(false);
  console.log(trip_id);
  const selectedSeats: {
    seat_id: number;
    seat_name: string;
    bogey_name: string;
  }[] = [];

  const showSeats = async () => {
    const result = await axios.get(
      "http://localhost:3000/api/train/showSeats",
      { params: { bogey_id }, headers: authHeader() }
    );
    setSeats(result.data);

    console.log(result.data);
  };
  const showBogeys = async () => {
    console.log(seat_class_id);
    const result = await axios.get(
      "http://localhost:3000/api/train/showBogeys",
      { params: { seat_class_id }, headers: authHeader() }
    );
    setShowBogeys(result.data);

    // setBogey(result.data[0]["bogey_name"]);
  };
  const showTrips = async () => {
    const result = await axios.get("http://localhost:3000/api/train/search", {
      params: { source, destination, trip_date, class_name },
    });
    setTrips(result.data);
    // setClassID(result.data[0]["seat_class_id"]);
    setFare(result.data[0]["fare"]);
  };

  useEffect(() => {
    showTrips();
    showBogeys();
    showSeats();
  }, []);
  // console.log(trip_id, seat_class_id, bogey_id);
  return (
    <>
      <Box margin={"5em 8em"} sx={{ overflowY: "auto" }}>
        <Box display={"flex"}>
          <Typography color={"#154c79"}>{source}</Typography>
          <Typography color={"#154c79"} margin={"0em 0.25em"}>
            - {destination}
          </Typography>
        </Box>
        <Box>
          <Typography>{trip_date}</Typography>
        </Box>
      </Box>
      {trips.length > 0 ? (
        trips.map((trip: tripInfo, key) => {
          return (
            <>
              <Card
                sx={{
                  margin: "0em 8em",
                  maxWidth: "50%",
                  backgroundcolor: "#FFFDD0",
                  ":hover": {
                    boxShadow: 20,
                  },
                  borderRadius: 3,
                  overflowY: "auto",
                }}
                variant={"elevation"}
                elevation={6}
              >
                <Typography variant="h6" color={"#154c79"}>
                  {trip.train_name}
                </Typography>
                <Box
                  display={"flex"}
                  justifyContent={"space-between"}
                  alignItems={"flex-start"}
                  padding={"1em 1em"}
                >
                  <Typography variant="h6">{trip.departure_time}</Typography>
                  <Typography variant="h6">{trip.arrival_time}</Typography>
                </Box>
                <Box
                  display={"flex"}
                  justifyContent={"space-around"}
                  alignItems={"flex-start"}
                >
                  <Typography>{trip.source}</Typography>
                  <Typography>{trip.total_time}</Typography>
                  <Typography>{trip.destination}</Typography>
                </Box>
                <Box
                  display={"flex"}
                  margin={"1em 1em"}
                  justifyContent={"space-between"}
                >
                  <Typography>tickets available :-</Typography>
                  <Typography>Counter {trip.seat_available_counter}</Typography>
                  <Typography>Online {trip.seat_available_online}</Typography>
                </Box>
                <Divider />

                <Card
                  sx={{
                    height: 120,
                    width: 100,
                    margin: "auto",
                    marginTop: "1em",
                    marginBottom: "1em",
                    borderRadius: 2,
                    ":hover": {
                      boxShadow: 20,
                    },
                    overflowY: "auto",
                  }}
                  elevation={6}
                >
                  <Typography paddingLeft={"2em"}>{trip.class_name}</Typography>
                  <Box display={"flex"}>
                    <Avatar
                      alt="Remy Sharp"
                      src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS5rVCgCOyjtMtewSxrwg3pskhj6jFrGqqE51C9RdqdgC4yGhsC6J6uJE3_6CJsr86wZXo&usqp=CAU"
                    />
                    <Typography fontSize={"1.5rem"}>{trip.fare}</Typography>
                  </Box>
                  {!token ? (
                    <>
                      <Button
                        variant="outlined"
                        size="small"
                        onClick={() => {
                          navigate("/LOGIN");
                        }}
                      >
                        book now
                      </Button>
                    </>
                  ) : (
                    <Tooltip title="Click twice">
                      <Button
                        variant="outlined"
                        size="small"
                        onClick={() => {
                          setTripID(trip.trip_id);
                          setClassID(trip.seat_class_id);
                          showBogeys();
                        }}
                      >
                        book now
                      </Button>
                    </Tooltip>
                  )}
                </Card>
              </Card>
              {bogeys.length > 0 ? (
                <>
                  <Tooltip title="select twice">
                    <TextField
                      id="outlined-select-bogey"
                      select
                      label="Select your bogey"
                      onChange={(
                        event: React.ChangeEvent<HTMLInputElement>
                      ) => {
                        setBogeyName(event.target.value);
                      }}
                      value={bogey_name}
                      helperText="Please select your bogey"
                      sx={{ margin: "1.5em 8em" }}
                    >
                      {bogeys.map((bogey: showBogeysType) => (
                        <MenuItem
                          key={bogey.bogey_name}
                          value={bogey.bogey_name}
                          onClick={() => {
                            setBogeyID(bogey.bogey_id);
                            showSeats();
                          }}
                        >
                          {bogey.bogey_name}
                        </MenuItem>
                      ))}
                    </TextField>
                  </Tooltip>
                </>
              ) : (
                <></>
              )}
              <Box
                sx={{
                  display: "flex",
                  flexWrap: "wrap",
                  "& > :not(style)": {
                    m: 1,
                    width: 60,
                    height: 40,
                    margin: "3em 1em",
                    overflowY: "auto",
                  },
                }}
              >
                {seats.length > 0 ? (
                  seats.map((seat: showseatType, key) => {
                    return (
                      <>
                        {seat.seat_status === 0 ? (
                          <Tooltip title={seat.seat_name}>
                            <Paper
                              elevation={4}
                              sx={{
                                cursor: "pointer",
                                ":hover": {
                                  boxShadow: 20,
                                },
                                backgroundColor: "#4649FF",
                                color: "white",
                              }}
                              onClick={() => {
                                if (selectedSeats.length < 4) {
                                  selectedSeats.push({
                                    seat_id: seat.seat_id,
                                    seat_name: seat.seat_name,
                                    bogey_name: seat.bogey_name,
                                  });
                                }
                              }}
                            >
                              {seat.bogey_name}-{seat.seat_name}
                            </Paper>
                          </Tooltip>
                        ) : (
                          <Tooltip title={seat.seat_name}>
                            <Paper
                              elevation={4}
                              sx={{
                                cursor: "not-allowed",
                                ":hover": {
                                  boxShadow: 20,
                                },
                                backgroundColor: "#FF0000",
                                color: "white",
                              }}
                            >
                              {seat.bogey_name}-{seat.seat_name}
                            </Paper>
                          </Tooltip>
                        )}
                      </>
                    );
                  })
                ) : (
                  <></>
                )}
              </Box>

              {seats.length > 0 ? (
                <Button
                  sx={{ margin: "0.5em 8em" }}
                  variant="outlined"
                  onClick={() => {
                    navigate("/showSelectedSeats", {
                      state: {
                        selectedSeats: selectedSeats,
                        trip_id: trip_id,
                        fare: fare,
                        class_name: class_name,
                      },
                    });
                  }}
                >
                  proceed
                </Button>
              ) : (
                <></>
              )}
            </>
          );
        })
      ) : (
        <Typography variant="h1">no trips available</Typography>
      )}
    </>
  );
};

export default TrainSchedules;
