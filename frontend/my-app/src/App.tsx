import { BrowserRouter, Route, Routes } from "react-router-dom";
import Login from "./components/login";
import Header from "./components/nav";
import UserRegister from "./components/userRegister";
import "./index";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Header />
        <Routes>
          <Route path="/HOME"></Route>
          <Route path="/REGISTER" element={<UserRegister />}></Route>
          <Route path="/LOGIN" element={<Login />}></Route>
          <Route path="/TRAIN_INFORMATION"></Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
