import { createTheme, ThemeProvider } from "@mui/material";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Cancel from "./components/cancel";
import { Home } from "./components/Home";
import Login from "./components/login";
import Header from "./components/nav";
import Profile from "./components/profile";
import ShowSelectedSeats from "./components/showSelectedSeats";
import Success from "./components/success";
import TrainSchedules from "./components/trainSchedules";
import UserRegister from "./components/userRegister";
import "./index";

const theme = createTheme({
  typography: {
    fontFamily: "-apple-system",
    fontSize: 15,
    h1: {
      fontFamily: "serif",
      color: "red",
    },
  },
});
function App() {
  return (
    <ThemeProvider theme={theme}>
      <div>
        <BrowserRouter>
          <Header />
          <Routes>
            <Route path="/HOME" element={<Home />}></Route>
            <Route path="/REGISTER" element={<UserRegister />}></Route>
            <Route path="/LOGIN" element={<Login />}></Route>
            <Route path="/PROFILE/:ID" element={<Profile />}></Route>
            <Route path="/Train_Schedules" element={<TrainSchedules />}></Route>
            <Route
              path="/showSelectedSeats"
              element={<ShowSelectedSeats />}
            ></Route>

            <Route path="/success" element={<Success />}></Route>
            <Route path="/failure" element={<Cancel />}></Route>
            <Route path="/TRAIN_INFORMATION"></Route>
          </Routes>
        </BrowserRouter>
      </div>
    </ThemeProvider>
  );
}

export default App;
