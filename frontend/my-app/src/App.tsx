import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Home } from "./components/Home";
import Login from "./components/login";
import Header from "./components/nav";
import Profile from "./components/profile";
import TrainSchedules from "./components/trainSchedules";
import UserRegister from "./components/userRegister";
import "./index";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Header />
        <Routes>
          <Route path="/HOME" element={<Home />}></Route>
          <Route path="/REGISTER" element={<UserRegister />}></Route>
          <Route path="/LOGIN" element={<Login />}></Route>
          <Route path="/PROFILE/:ID" element={<Profile />}></Route>
          <Route path="/Train_Schedules" element={<TrainSchedules />}></Route>
          <Route path="/TRAIN_INFORMATION"></Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
