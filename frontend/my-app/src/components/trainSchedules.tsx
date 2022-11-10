import { Typography } from "@mui/material";
import { useContext } from "react";
import { UserContext } from "./Home";

const TrainSchedules = () => {
  const trainContext = useContext(UserContext);

  return (
    <>
      <Typography margin={"10em 10em"} variant="h6"></Typography>
    </>
  );
};

export default TrainSchedules;
