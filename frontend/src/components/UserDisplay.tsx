import React from "react";
import UserProfile from "./UserProfile";
import Button from "./Button";
import { useNavigate } from "react-router-dom";

const UserDisplay = ({
  user,
}: {
  user: {
    firstName: string;
    lastName: string;
    _id: string;
    username: string;
  };
}) => {
  const nickname = user.firstName.split("")[0];
  const navigate = useNavigate();
  return (
    <div className="flex justify-between items-center w-full">
      <div className="flex gap-5 justify-center items-center">
        <UserProfile>{nickname}</UserProfile>
        <h2 className="font-bold text-xl">{user.firstName}</h2>
      </div>
      <div>
        <Button
          onClick={() => {
            navigate(`/send?id=${user._id}&name=${user.firstName}`);
          }}
        >
          Send Money
        </Button>
      </div>
    </div>
  );
};

export default UserDisplay;
