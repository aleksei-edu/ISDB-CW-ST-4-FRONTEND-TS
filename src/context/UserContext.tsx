import { createContext, useContext, useState } from "react";
import { UserInfo } from "../lib/types";
import { useGetUserInfo } from "../hooks/useGetUserInfo";

export interface IUserContext {
    getUser: () => UserInfo;
}

const defaultValue: IUserContext = {
    getUser: () => null,
};

export const UserContext = createContext<IUserContext>(defaultValue);

export const UserContextProvider = ({ children }) => {
    const {user} = useGetUserInfo();

    const getUser = () => {
        return user;
    }

    const contextValue: IUserContext = {
        getUser: getUser,
    }

  return (
    <UserContext.Provider value={contextValue}>
      {children}
    </UserContext.Provider>
  );
};