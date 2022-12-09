import { Box, Button } from "@mui/material";

import axios from "axios";
import { useLocation } from "react-router-dom";
import authHeader from "../services/auth";
const Payment = () => {
  const { state } = useLocation();

  const selectedSeats = state.selectedSeats;
  const trip_id = state.trip_id;

  return (
    <Box component={"form"} sx={{ margin: "10em 10em" }}>
      <Button>Submit</Button>
      <Button
        size="large"
        onClick={async () => {
          for (let i = 0; i < selectedSeats.length; i++) {
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
        }}
      >
        book
      </Button>
    </Box>
  );
};

export default Payment;
