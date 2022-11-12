import { Box, Card, Divider, Typography } from "@mui/material";
import axios from "axios";
import moment from "moment";
import { useEffect, useState } from "react";

import { useLocation } from "react-router-dom";
interface tripInfo {
  ID: number;
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
}
const TrainSchedules = () => {
  const { state } = useLocation();

  const source = state.source,
    destination = state.destination,
    date: Date = state.date,
    trainClass = state.trainClass;
  const [trips, setTrips] = useState([]);

  const trip_date = moment(date).format();
  console.log(date);
  console.log(trip_date);
  const results = async () => {
    const result = await axios.get("http://localhost:3000/api/train/search", {
      params: { source, destination, trip_date },
    });
    setTrips(result.data);
    console.log(result);
  };
  useEffect(() => {
    results();
  }, []);

  return (
    <>
      <Box margin={"5em 8em"}>
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
                sx={{ margin: "0em 8em", maxWidth: "50%", color: "FAF9F6" }}
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
              </Card>
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
