import {
  Box,
  Button,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";
import axios from "axios";
import { useLocation } from "react-router-dom";
import authHeader from "../services/auth";
interface selectedSeatsType {
  seat_name: string;
  bogey_name: string;
}
const ShowSelectedSeats = () => {
  const { state } = useLocation();
  const selectedSeats = state.selectedSeats,
    fare = state.fare,
    trip_id = state.trip_id,
    class_name = state.class_name;

  const filteredSelectedSeats = selectedSeats.filter(
    (value: selectedSeatsType, index: number, self: any) =>
      index ===
      self.findIndex(
        (t: selectedSeatsType) =>
          t.bogey_name === value.bogey_name && t.seat_name === value.seat_name
      )
  );
  const totalFare = fare * filteredSelectedSeats.length;
  const seats = localStorage.setItem(
    "selectedSeats",
    JSON.stringify(filteredSelectedSeats)
  );
  const tripID = localStorage.setItem("trip_id", trip_id);
  const handleCheckout = () => {
    axios
      .post(
        "http://localhost:3000/api/payment/makePayment",
        { totalFare },
        { headers: authHeader() }
      )
      .then((res) => {
        console.log(res);
        if (res.data.url) {
          window.location = res.data.url;
        }
      })

      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div
      style={{
        position: "absolute",
        left: "50%",
        top: "50%",
        transform: "translate(-50%, -50%)",
      }}
    >
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Typography variant="h6">Selected Seats</Typography>
      </Box>
      <TableContainer
        component={Paper}
        sx={{ height: 300, width: 700 }}
        elevation={6}
      >
        <Table
          sx={{ minWidth: 650, height: 100, width: 180 }}
          aria-label="simple table"
        >
          <TableHead>
            <TableRow>
              <TableCell align="right">Bogey name</TableCell>
              <TableCell align="right">seat number</TableCell>
              <TableCell align="right">Class name</TableCell>
              <TableCell align="right">Fare</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredSelectedSeats.map(
              (seat: selectedSeatsType, key: number) => (
                <TableRow
                  key={class_name}
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                >
                  <TableCell align="right">{seat.bogey_name}</TableCell>
                  <TableCell align="right">{seat.seat_name}</TableCell>
                  <TableCell align="right">{class_name}</TableCell>
                  <TableCell align="right">{fare}</TableCell>
                </TableRow>
              )
            )}
          </TableBody>
        </Table>
      </TableContainer>

      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "end",
          alignItems: "end",
          margin: "1em 0em",
        }}
      >
        <Typography variant="h6">Total Fare: {totalFare}</Typography>
        <Button
          onClick={() => {
            handleCheckout();
          }}
          variant="outlined"
        >
          Make payment
        </Button>
      </Box>
    </div>
  );
};

export default ShowSelectedSeats;
