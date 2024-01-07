import { useContext, useEffect, useState } from "react";
import { UserInfo } from "../lib/types";
import { useGetToken } from "./useGetToken";
import { ErrorContext, IErrorContext } from "../context/ErrorContext";
import axiosClient from "../utils/axiosConf";

export const useGetUserInfo = () => {
    const [user, setUser] = useState<UserInfo>(null);
    const {headers} = useGetToken()
    const {addError} = useContext<IErrorContext>(ErrorContext)



    const updateUser = async () => {
        try {
            const fetchedUser = await axiosClient.get("user-info", {headers: headers});
            setUser(fetchedUser.data);
        } catch (error) {
            addError(error.message);
            console.log(error);
        }
    }

    useEffect(() => {
        updateUser()
    }, [])

    return {user, updateUser}
    
}

