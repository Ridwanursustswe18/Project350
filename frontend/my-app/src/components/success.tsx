import { Box, Button, Typography } from "@mui/material";
import axios from "axios";
import { useNavigate } from "react-router-dom";
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
  const navigate = useNavigate();
  const redirect = async () => {
    const today = new Date();
    const issue_date =
      today.getFullYear() +
      "-" +
      (today.getMonth() + 1) +
      "-" +
      today.getDate();
    const issue_time =
      today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
    console.log(issue_date, issue_time);
    navigate("/previewTicket", { state: { issue_date, issue_time } });
  };

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
        variant="outlined"
        sx={{ margin: "1.5em 0em" }}
        onClick={() => {
          changeStatus();
          createTicket();
          redirect();
        }}
      >
        proceed
      </Button>
    </Box>
  );
};

export default Success;
