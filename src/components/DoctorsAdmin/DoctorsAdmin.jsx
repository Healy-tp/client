import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { ButtonGroup, Button } from "@mui/material";
import { getDoctors } from "../../services/appointments";
import AdminTable from "../AdminTable";

export default function DoctorsAdmin() {
  const headers = ["Name", "Specialty"];

  const [doctors, setDoctors] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const getDoctorsApi = async () => {
      try {
        const response = await getDoctors();
        setDoctors(response);
      } catch (err) {
        console.log("could not get doctors from server", err);
      }
    };

    getDoctorsApi();
  }, []);

  return (
    <>
      <ButtonGroup
        variant="contained"
        aria-label="outlined primary button group"
        style={{ marginLeft: 8 }}
      >
        <Button onClick={() => navigate("/admin/new-doctor")}>New</Button>
      </ButtonGroup>
      <AdminTable headers={headers} rows={doctors} kind={"doctor"} />
    </>
  );
}
