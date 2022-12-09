import { Box, Divider, Typography } from "@mui/material";
import axios from "axios";
import "jspdf-autotable";
import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import authHeader from "../services/auth";

const PreviewTicket = () => {
  interface seatType {
    seat_id: number;
    seat_name: string;
    bogey_name: string;
  }
  interface ticketType {
    issue_date: any;
    issue_time: any;
    train_name: string;
    source: string;
    destination: string;
    total_fare: number;
    service_charge: number;
    passenger_mobile_no: string;
    passenger_id: number;
    passenger_name: string;
    passenger_NID: string;
    trip_date: string;
  }
  const [ticket, setTicket] = useState([]);
  const { state } = useLocation();
  const issue_date = state.issue_date,
    issue_time = state.issue_time;
  console.log(issue_date, issue_time);
  let selectedSeatsJSON = localStorage.getItem("selectedSeats");
  const selectedSeats: seatType[] = selectedSeatsJSON
    ? JSON.parse(selectedSeatsJSON)
    : [];
  const trip_id = localStorage.getItem("trip_id");
  const passenger_id = localStorage.getItem("ID");
  const class_name = localStorage.getItem("class_name");
  const fare = localStorage.getItem("fare");
  const numOfSeats = selectedSeats.length;
  const previewTicket = async () => {
    const result = await axios.get(
      "http://localhost:3000/api/ticket/showTicket",
      {
        params: { trip_id, passenger_id, issue_date, issue_time },
        headers: authHeader(),
      }
    );
    if (result) {
      console.log(result.data);
      setTicket(result.data);
    } else {
      console.error();
    }
  };

  useEffect(() => {
    previewTicket();
  }, []);

  return (
    <>
      <Box
        margin={"4em 5em"}
        display="flex"
        flexDirection={"column"}
        justifyContent="center"
        alignItems="center"
      >
        <Typography variant="h6" sx={{ color: "#4649FF" }}>
          Ticket Preview
        </Typography>
      </Box>
      {ticket.length > 0 ? (
        ticket.map((ticket: ticketType, key) => {
          return (
            <>
              <Box
                display="flex"
                flexDirection={"column"}
                justifyContent="left"
                alignItems="left"
                marginLeft={"1.5em"}
              >
                <Typography sx={{ color: "#50C878" }}>
                  JOURNEY INFROMATION
                </Typography>
                <Divider sx={{ width: "80%" }} />
              </Box>
              <Box display="flex" flexDirection={"column"}>
                <Box display="flex" marginLeft={"1.5em"}>
                  <Typography>Issue Date & Time:</Typography>
                  <Typography sx={{ marginLeft: "30em" }}>
                    {ticket.issue_date} {ticket.issue_time}
                  </Typography>
                </Box>
                <Box display="flex" marginLeft={"1.5em"}>
                  <Typography>Journey Date :</Typography>
                  <Typography sx={{ marginLeft: "32em" }}>
                    {ticket.trip_date}
                  </Typography>
                </Box>
                <Box display="flex" marginLeft={"1.5em"}>
                  <Typography>Train name:</Typography>
                  <Typography sx={{ marginLeft: "33em" }}>
                    {ticket.train_name}
                  </Typography>
                </Box>
                <Box display="flex" marginLeft={"1.5em"}>
                  <Typography>From Station:</Typography>
                  <Typography sx={{ marginLeft: "32.25em" }}>
                    {ticket.source}
                  </Typography>
                </Box>
                <Box display="flex" marginLeft={"1.5em"}>
                  <Typography>To Station:</Typography>
                  <Typography sx={{ marginLeft: "33.5em" }}>
                    {ticket.destination}
                  </Typography>
                </Box>
                {selectedSeats.map((seat: seatType) => {
                  return (
                    <Box display="flex" marginLeft={"1.5em"}>
                      <Typography>Coach Name With Seat Number:</Typography>
                      <Typography sx={{ marginLeft: "24.75em" }}>
                        {seat.bogey_name}-{seat.seat_name}
                      </Typography>
                    </Box>
                  );
                })}
                <Box display="flex" marginLeft={"1.5em"}>
                  <Typography>Num of Seats:</Typography>
                  <Typography sx={{ marginLeft: "32em" }}>
                    {numOfSeats}
                  </Typography>
                </Box>
                <Box display="flex" marginLeft={"1.5em"}>
                  <Typography>Fare:</Typography>
                  <Typography sx={{ marginLeft: "36em" }}>{fare}</Typography>
                </Box>
                <Box display="flex" marginLeft={"1.5em"}>
                  <Typography>Service Charge:</Typography>
                  <Typography sx={{ marginLeft: "31em" }}>
                    {ticket.service_charge}
                  </Typography>
                </Box>
                <Box display="flex" marginLeft={"1.5em"}>
                  <Typography>Total Fare:</Typography>
                  <Typography sx={{ marginLeft: "33em" }}>
                    {ticket.total_fare}
                  </Typography>
                </Box>
                <Divider sx={{ width: "80%" }} />
                <Box
                  display="flex"
                  flexDirection={"column"}
                  justifyContent="left"
                  alignItems="left"
                  marginTop={"1.5em"}
                  marginLeft={"1.5em"}
                >
                  <Typography sx={{ color: "#50C878" }}>
                    PRINTING INFROMATION
                  </Typography>
                  <Divider sx={{ width: "80%" }} />
                </Box>
                <Box display="flex" flexDirection={"column"}>
                  <Box display="flex" marginLeft={"1.5em"}>
                    <Typography>Mobile Number:</Typography>
                    <Typography sx={{ marginLeft: "31em" }}>
                      {ticket.passenger_mobile_no}
                    </Typography>
                  </Box>
                  <Box display="flex" marginLeft={"1.5em"}>
                    <Typography>Passenger Number:</Typography>
                    <Typography sx={{ marginLeft: "30em" }}>
                      {ticket.passenger_id}
                    </Typography>
                  </Box>
                </Box>
                <Divider sx={{ width: "80%" }} />
                <Box
                  display="flex"
                  flexDirection={"column"}
                  justifyContent="left"
                  alignItems="left"
                  marginTop={"1.5em"}
                  marginLeft={"1.5em"}
                >
                  <Typography sx={{ color: "#50C878" }}>
                    PASSENGER INFROMATION
                  </Typography>
                  <Divider sx={{ width: "80%" }} />
                </Box>
                <Box display="flex" flexDirection={"column"}>
                  <Box display="flex" marginLeft={"1.5em"}>
                    <Typography>Passenger Name:</Typography>
                    <Typography sx={{ marginLeft: "31em" }}>
                      {ticket.passenger_name}
                    </Typography>
                  </Box>
                  <Box display="flex" marginLeft={"1.5em"}>
                    <Typography>National ID:</Typography>
                    <Typography sx={{ marginLeft: "33em" }}>
                      {ticket.passenger_NID}
                    </Typography>
                  </Box>
                  <Box display="flex" marginLeft={"1.5em"}>
                    <Typography>Mobile Number:</Typography>
                    <Typography sx={{ marginLeft: "31em" }}>
                      {ticket.passenger_mobile_no}
                    </Typography>
                  </Box>
                </Box>
              </Box>
            </>
          );
        })
      ) : (
        <Typography>loading.....</Typography>
      )}
    </>
  );
};

export default PreviewTicket;
