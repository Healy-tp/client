import React, { useEffect, useState } from "react";
import { useTranslation } from 'react-i18next';
import { getUsers } from "../../services/admin";
import AdminTable from "../AdminTable";

const UsersAdmin = () => {
  const [t] = useTranslation();

  const [users, setUsers] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const headers = [
    t("admin.users.row.headers.first_name"),
    t("admin.users.row.headers.last_name"),
    t("admin.users.row.headers.email"),
    t("admin.users.row.headers.phone"),
    t("admin.users.row.headers.status")
  ];

  const getUsersFromApi = async () => {
    try {
      setIsLoading(true);
      const response = await getUsers();
      setUsers(response);
    } catch (err) {
      console.log("error getting users from API: ", err);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    getUsersFromApi();
  }, []);

  return (
    <>
      <AdminTable
        headers={headers}
        rows={users}
        kind={"user"} 
        updateRows={getUsersFromApi}
        isLoading={isLoading}
      />
    </>
  );
};

export default UsersAdmin;
