import React, { useEffect, useState } from "react";
import { useTranslation } from 'react-i18next';
import _ from "lodash";
import { getAvailabilities } from "../../services/admin";
import AdminTable from "../AdminTable";

const AvailabilitiesAdmin = () => {
  const [t] = useTranslation();
  const [availabilities, setAvailabilities] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const headers = [
    t("admin.availabilities.row.headers.doctor_name"),
    t("admin.availabilities.row.headers.doctor_specialty"),
    t("admin.availabilities.row.headers.office_number"),
    t("admin.availabilities.row.headers.weekday"),
    t("admin.availabilities.row.headers.start_hour"),
    t("admin.availabilities.row.headers.end_hour"),
    t("admin.availabilities.row.headers.frequency"),
    t("admin.availabilities.row.headers.valid_until"),
  ];

  const fetchAvailabilities = async () => {
    try {
      setIsLoading(true);
      const response = await getAvailabilities();
      const sortedData = _.sortBy(response, ["id"]);
      setAvailabilities(sortedData);
    } catch (err) {
      console.log("Error while fetching availabilities: ", err);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchAvailabilities();
  }, []);

  return (
    <AdminTable
      headers={headers}
      rows={availabilities}
      kind={"availability"}
      updateRows={fetchAvailabilities}
      isLoading={isLoading}
    />
  );
};

export default AvailabilitiesAdmin;
