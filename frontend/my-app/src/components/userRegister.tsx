import {
  Avatar,
  Box,
  Button,
  Checkbox,
  createTheme,
  CssBaseline,
  FormControlLabel,
  Grid,
  Link,
  Paper,
  TextField,
  ThemeProvider,
  Typography
} from "@mui/material";
import axios from "axios";
import React, { useState } from "react";
import { Link as RouterLink, useNavigate } from "react-router-dom";
function Copyright(props: any) {
  return (
    <Typography
      variant="body2"
      color="text.secondary"
      align="center"
      {...props}
    >
      {"Copyright © "}
      <Link color="inherit" href="https://mui.com/">
        Your Website
      </Link>{" "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}

const theme = createTheme();

const UserRegister = () => {
  const navigate = useNavigate()  

  const [passenger_name, setPassengerName] = useState<string>("");
  const [passenger_email, setPassengerEmail] = useState<string>("");
  const [passenger_mobile_no, setPassengerMobileNo] = useState<string>("");
  const [passenger_address, setPassengerAddress] = useState<string>("");
  const [passenger_password, setPassengerPassword] = useState<string>("");
  const [passenger_identification, setPassengerIdentification] =
    useState<string>("");
  const [passenger_post_code, setPassengerPostCode] = useState<string>("");

  const SignUp = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const result = await axios.post("http://localhost:3000/api/register", {
      passenger_email,
      passenger_name,
      passenger_mobile_no,
      passenger_address,
      passenger_password,
      passenger_identification,
      passenger_post_code,
    });
    console.log(result);
    if (result) {
      alert("new user added");
      navigate("/LOGIN")
    } else {
      alert("try again!!");
    }
  };
  return (
    <>
      <ThemeProvider theme={theme}>
        <Grid container component="main" sx={{ height: "100vh" }}>
          <CssBaseline />
          <Grid
            item
            xs={false}
            sm={4}
            md={7}
            sx={{
              backgroundImage:
                "url(https://play-lh.googleusercontent.com/ed3d9UUd6SxX_A0FswQyZr46jv-Wp9MvV11RAPrCGY9cuLFigsSoOiOpH1o20KQejQ)",
              backgroundRepeat: "no-repeat",
              backgroundColor: (t) =>
                t.palette.mode === "light"
                  ? t.palette.grey[50]
                  : t.palette.grey[900],
              backgroundSize: "cover",
              backgroundPosition: "center",
            }}
          />
          <Grid
            item
            xs={12}
            sm={8}
            md={5}
            component={Paper}
            elevation={6}
            square
          >
            <Box
              sx={{
                my: 8,
                mx: 4,
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
              }}
            >
              <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}></Avatar>
              <Typography component="h1" variant="h5">
                SIGN UP
              </Typography>
              <Box
                component="form"
                noValidate
                onSubmit={SignUp}
                sx={{
                  mt: 1,
                  width: "50ch",
                }}
              >
                <Box
                  sx={{
                    width: "50ch",
                    display: "flex",
                    flexDirection: "row",
                  }}
                >
                  <TextField
                    margin="normal"
                    required
                    fullWidth
                    id="mobile no"
                    label="Mobile Number"
                    name="mobie no"
                    autoComplete="mobile no"
                    autoFocus
                    sx={{ paddingRight: "1em " }}
                    onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                      setPassengerMobileNo(event.target.value);
                    }}
                    value={passenger_mobile_no}
                  />
                  <TextField
                    margin="normal"
                    required
                    fullWidth
                    name="password"
                    label="Password"
                    type="password"
                    id="password"
                    autoComplete="current-password"
                    onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                      setPassengerPassword(event.target.value);
                    }}
                    value={passenger_password}
                  />
                </Box>
                <Box
                  sx={{
                    width: "50ch",
                    display: "flex",
                    flexDirection: "row",
                  }}
                >
                  <TextField
                    margin="normal"
                    required
                    fullWidth
                    name="email"
                    label="E-mail"
                    type="email"
                    id="email"
                    autoComplete="current-email"
                    sx={{ paddingRight: "1em " }}
                    onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                      setPassengerEmail(event.target.value);
                    }}
                    value={passenger_email}
                  />
                  <TextField
                    margin="normal"
                    required
                    fullWidth
                    name="Identification"
                    label="Identification Number"
                    type="Identification"
                    id="Identification"
                    autoComplete="current-Identification"
                    onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                      setPassengerIdentification(event.target.value);
                    }}
                    value={passenger_identification}
                  />
                </Box>
                <Box
                  sx={{
                    width: "50ch",
                    display: "flex",
                    flexDirection: "row",
                  }}
                >
                  <TextField
                    margin="normal"
                    fullWidth
                    name="post-code"
                    label="Post Code"
                    type="post-code"
                    id="post-code"
                    autoComplete="current-post-code"
                    sx={{ paddingRight: "1em" }}
                    onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                      setPassengerPostCode(event.target.value);
                    }}
                    value={passenger_post_code}
                  />
                  <TextField
                    margin="normal"
                    required
                    fullWidth
                    name="name"
                    label="Full Name"
                    type="name"
                    id="full-name"
                    autoComplete="current-name"
                    onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                      setPassengerName(event.target.value);
                    }}
                    value={passenger_name}
                  />
                </Box>

                <TextField
                  margin="normal"
                  fullWidth
                  multiline
                  name="address"
                  label="address"
                  type="address"
                  id="address"
                  autoComplete="current-address"
                  onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                    setPassengerAddress(event.target.value);
                  }}
                  value={passenger_address}
                />
                <FormControlLabel
                  control={<Checkbox value="remember" color="primary" />}
                  label="Remember me"
                />
                <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  sx={{ mt: 3, mb: 2 }}
                >
                  Sign Up
                </Button>
                <Grid container>
                  <Grid item xs>
                    <Link href="#" variant="body2">
                      Forgot password?
                    </Link>
                  </Grid>
                  <Grid item>
                    <Link variant="body2" component={RouterLink} to={"/LOGIN"}>
                      {"Already have an account? LOGIN"}
                    </Link>
                  </Grid>
                </Grid>
                <Copyright sx={{ mt: 5 }} />
              </Box>
            </Box>
          </Grid>
        </Grid>
      </ThemeProvider>
    </>
  );
};

export default UserRegister;
