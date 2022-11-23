import { Box, Button, Typography } from "@mui/material";
import axios from "axios";
import authHeader from "../services/auth";

const Success = () => {
  interface seatType {
    seat_id: number;
    seat_name: string;
    bogey_name: string;
  }
  let selectedSeatsJSON = localStorage.getItem("selectedSeats");
  const selectedSeats: seatType[] = selectedSeatsJSON
    ? JSON.parse(selectedSeatsJSON)
    : [];
  const trip_id = localStorage.getItem("trip_id");
  const passenger_id = localStorage.getItem("ID");
  const total_fare = localStorage.getItem("total_fare");
  console.log(total_fare);

  const changeStatus = async () => {
    for (let i = 0; i < selectedSeats?.length; i++) {
      const seat_id: number = selectedSeats[i].seat_id;
      const result = await axios.patch(
        "http://localhost:3000/api/seatStatus/update",
        {
          seat_id: seat_id,
        },
        { headers: authHeader() }
      );
      console.log(result);
    }
  };
  const createTicket = async () => {
    const result = await axios.post(
      "http://localhost:3000/api/ticket/create",
      {
        passenger_id: passenger_id,
        trip_id: trip_id,
        total_fare: total_fare,
      },
      { headers: authHeader() }
    );
    console.log(result);
  };
  return (
    <Box
      margin={"10em 10em"}
      display="flex"
      flexDirection={"column"}
      justifyContent="center"
      alignItems="center"
    >
      <Typography variant="h2">success</Typography>
      <Button
        size="large"
        onClick={() => {
          changeStatus();
          createTicket();
        }}
      >
        proceed
      </Button>
    </Box>
  );
};

export default Success;
