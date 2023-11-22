import { useEffect, useState } from "react";
import { getUser } from "../redux/slices";
import { useAppSelector } from "../redux/hooks";
import axios from "axios";
import { useTranslation } from "react-i18next";

export const useAdminPage = () => {
   const [users, setUsers] = useState<Object[]>([])
   const user = useAppSelector(getUser)
   useEffect(() => {
    async function getUsers() {
      const response = await axios.get("http://localhost:9000/users",
      {
        withCredentials: true
      }
      );
      setUsers(response.data)
    }
    getUsers()
   })
   const { t } = useTranslation();
   return {
      user, users, t
   }
}