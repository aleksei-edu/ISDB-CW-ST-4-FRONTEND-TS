import React from "react";
import { useAppDispatch, useAppSelector } from "../../../store";
import { User } from "../../../store/slice/UserApi";

const MainPage: React.FC = () => {
  const user: User = useAppSelector((state) => state.user);

  return (
    <>
      <h1>Home</h1>
      <p>Welcome, {user.username}!</p>
    </>
  );
};

export default MainPage;
