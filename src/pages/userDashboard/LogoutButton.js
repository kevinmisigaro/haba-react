import axios from "axios";
import React, { useState } from "react";
import { Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

export default function LogoutButton() {
  const [loggingOut, setLogout] = useState(false);

  const history = useNavigate();

  const handleLogout = () => {
    setLogout(true);

    axios.defaults.headers.common[
      "Authorization"
    ] = `Bearer ${localStorage.getItem("token")}`;

    axios
      .post(`${process.env.REACT_APP_API_URL}/logout`)
      .then((res) => {
        console.log(res);
        toast.success("You have successfully logged out");
        localStorage.clear();
        setLogout(false);
        history("/");
      })
      .catch((err) => {
        setLogout(false);
        toast.error(err.response.data);
      });
  };

  return (
    <Button
      onClick={handleLogout}
      type="button"
      size="sm"
      variant="primary"
    >
      {loggingOut ? "Logging out" : "Logout"}
    </Button>
  );
}
