import React, { useState, useEffect } from "react";
import { TextInput } from "../components/TextInput";
import UserProfile from "../components/UserProfile";
import axios from "axios";
import Button from "../components/Button";
import UserDisplay from "../components/UserDisplay";

type userType = {
  firstName: string;
  lastName: string;
  _id: string;
  username: string;
};

export const Dashboard = () => {
  const [users, setUsers] = useState<userType[]>([]);
  const [filter, setFilter] = useState("");

  useEffect(() => {
    axios
      .get("http://localhost:3000/api/v1/user/bulk?filter=" + filter, {
        headers: {
          Authorization: "Bearer " + localStorage.getItem("token"),
        },
      })
      .then((response) => {
        setUsers(response.data.users);
      });
  }, [filter]);

  return (
    <div className="h-screen  bg-white max-w-full">
      <div className="flex  justify-between items-center border p-5 border-b-gray-300 mb-7 ">
        <h1 className="font-bold text-2xl">Payments App</h1>
        <div className="flex gap-5 justify-center items-center ">
          <span className="text-lg">Hello, User</span>
          <UserProfile>U</UserProfile>
        </div>
      </div>
      <div className=" p-5">
        <span className="font-bold text-2xl mr-3">Your Balance </span>
        <span className="font-semibold text-2xl ">$5000</span>
      </div>
      <div className="p-5 ">
        <span className="font-bold text-2xl mr-3">Users </span>
      </div>
      <div className="p-5 pt-0">
        <TextInput
          placeholder="Search Users..."
          onChange={(e) => {
            setFilter(e.target.value);
          }}
        ></TextInput>
      </div>

      <div className="p-5  max-w-full ">
        {users.map((user, index) => {
          return <UserDisplay user={user} key={index}></UserDisplay>;
        })}
      </div>
    </div>
  );
};
