import axios from "axios";
import Button from "../components/Button";
import { LinkedText } from "../components/LinkedText";
import { TextInput } from "../components/TextInput";
import UserProfile from "../components/UserProfile";
import { useSearchParams } from "react-router-dom";
import { useState } from "react";

const SendMoney = () => {
  const [searchParams] = useSearchParams();
  const id = searchParams.get("id");
  const name = searchParams.get("name");
  const [amount, setAmount] = useState("");
  return (
    <div className="flex h-screen w-screen justify-center items-center bg-gray-300">
      <div className=" bg-white flex flex-col justify-center py-7 px-6 rounded-2xl items-center p w-112">
        <h1 className="font-bold text-3xl mb-20">Send Money</h1>

        <div className="flex gap-3 items-center justify-start w-full">
          <UserProfile bgcolor="bg-[#22C45E]" textColor="text-white">
            {name?.split("")[0]}
          </UserProfile>
          <p className="font-semibold text-2xl">{name}</p>
        </div>

        <TextInput
          placeholder="Enter Amount"
          label="Amount (in Rs) "
          onChange={(e) => {
            setAmount(e.target.value);
          }}
        ></TextInput>

        <Button
          onClick={async () => {
            await axios.post(
              "http://localhost:3000/api/v1/account/transfer",
              {
                to: id,
                amount: Number(amount),
              },
              {
                headers: {
                  Authorization: "Bearer " + localStorage.getItem("token"),
                },
              }
            );
          }}
          bgColor="bg-[#22C45E]"
          width="w-full"
        >
          Initiate Transfer
        </Button>
      </div>
    </div>
  );
};

export default SendMoney;
