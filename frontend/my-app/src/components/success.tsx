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
  return (
    <Box
      margin={"10em 10em"}
      display="flex"
      justifyContent="center"
      alignItems="center"
    >
      <Typography variant="h2">success</Typography>
      <Button size="large" onClick={changeStatus}>
        book
      </Button>
    </Box>
  );
};

export default Success;
