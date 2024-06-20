import React, { useEffect, useState } from "react";
import { getUsers } from "../../services/admin";
import AdminTable from "../AdminTable";

const UsersAdmin = () => {
  const headers = ["First Name", "Last Name", "email", "phone", "status"];

  const [users, setUsers] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

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
