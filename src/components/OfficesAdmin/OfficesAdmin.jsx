import React, { useEffect, useState } from "react"
import { useTranslation } from 'react-i18next';
import { useNavigate } from "react-router-dom";
import _ from "lodash";
import { ButtonGroup, Button } from "@mui/material";
import { getOffices } from "../../services/admin";
import AdminTable from "../AdminTable";

export default function OfficesAdmin() {
  const [t] = useTranslation();
  const [offices, setOffices] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const headers = [
    t("admin.offices.row.headers.id"),
    t("admin.offices.row.headers.specialties"),
    t("admin.offices.row.headers.office_number"),
  ];

  const fetchOffices = async () => {
    try {
      setIsLoading(true);
      const data = await getOffices();
      const sortedData = _.sortBy(data, ["id"]);
      setOffices(sortedData);
    } catch (err) {
      console.log("Error while fetching offices: ", err);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchOffices();
  }, []);

  return (
    <>
      <ButtonGroup
        variant="contained"
        aria-label="outlined primary button group"
        style={{ marginLeft: 8 }}
      >
        <Button variant="outlined" onClick={() => navigate("/admin/new-office")}>
          {t("admin.offices.new_office.create_button")}
        </Button>
      </ButtonGroup>
      <AdminTable
        headers={headers}
        rows={offices}
        kind="office"
        updateRows={fetchOffices}
        isLoading={isLoading}
      />
    </>
  );
}
