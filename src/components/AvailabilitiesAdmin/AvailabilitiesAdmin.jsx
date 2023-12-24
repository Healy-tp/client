import React, { useEffect, useState } from "react";
import _ from "lodash";
import { getAvailabilities } from "../../services/admin";
import AdminTable from "../AdminTable";

const AvailabilitiesAdmin = () => {
  const [availabilities, setAvailabilities] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const headers = [
    "Doctors Name",
    "Doctors Specialty",
    "Office ID",
    "Weekday",
    "Start Hour",
    "End Hour",
    "Frequency",
    "Valid Until",
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
