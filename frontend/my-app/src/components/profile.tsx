import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import authHeader from "../services/auth";

const Profile = () => {
  interface User {
    role: string;
    passenger_name: string;
    passenger_email: string;
    passenger_mobile_no: string;
    passenger_address: string;
    passenger_password: string;
    passenger_identification: string;
    passenger_post_code: string;
    profile_picture: string;
  }
  const [user, setUser] = useState<User>();
  const params = useParams();
  const ID = localStorage.getItem("ID");
  const getUserProfile = async () => {
    const result = await axios.get(
      `http://localhost:3000/api/getProfile/${params.ID}`,
      { headers: authHeader() }
    );
    setUser(result.data);
  };
  useEffect(() => {
    getUserProfile();
  });
  return <div></div>;
};

export default Profile;
