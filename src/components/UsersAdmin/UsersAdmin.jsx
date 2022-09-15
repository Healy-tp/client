import { useEffect, useState } from "react";
import { getUsers } from "../../services/admin";
import AdminTable from "../AdminTable";


const UsersAdmin = () => {
  const headers = ['Name', 'email', 'phone', 'status']

  const [users, setUsers] = useState([]);

  useEffect(() => {
    const getUsersFromApi = async () => {
      const response = await getUsers();
      setUsers(response);
    } 

    getUsersFromApi()
  }, []);

  return (
    <>
      <AdminTable headers={headers} rows={users} kind={'user'}/>
    </>
  );

}

export default UsersAdmin;
