import React, { useEffect, useState } from "react";
import { useTranslation } from 'react-i18next';
import { useNavigate } from "react-router-dom";
import { ButtonGroup, Button } from "@mui/material";
import { getDoctors } from "../../services/appointments";
import AdminTable from "../AdminTable";

export default function DoctorsAdmin() {
  const [t] = useTranslation();
  const [doctors, setDoctors] = useState([]);
  const navigate = useNavigate();

  const headers = [
    t("admin.doctors.row.headers.name"),
    t("admin.doctors.row.headers.specialty")
  ];

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
        style={{ marginLeft: 10 }}
      >
        <Button variant="outlined" onClick={() => navigate("/admin/new-doctor")}>
          {t("admin.doctors.new_doctor.create_button")}
        </Button>
      </ButtonGroup>
      <AdminTable headers={headers} rows={doctors} kind={"doctor"} />
    </>
  );
}
