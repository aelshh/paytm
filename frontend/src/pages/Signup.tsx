import Button from "../components/Button";
import { LinkedText } from "../components/LinkedText";
import { TextInput } from "../components/TextInput";
import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Signup = () => {
  const navigate = useNavigate();
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");
  return (
    <div className="flex h-screen w-screen justify-center items-center bg-gray-300">
      <div className=" bg-white flex flex-col justify-center py-7 px-6 rounded-2xl items-center p max-w-sm">
        <h1 className="font-bold text-3xl mb-3">Sign Up</h1>
        <p className="text-gray-500 text-lg text-center mb-3 ">
          Enter your information to create an account
        </p>
        <TextInput
          placeholder="John"
          label="First Name"
          onChange={(e) => {
            setFirstName(e.target.value);
          }}
        ></TextInput>
        <TextInput
          placeholder="Doe"
          label="Last Name"
          onChange={(e) => {
            setLastName(e.target.value);
          }}
        ></TextInput>
        <TextInput
          placeholder="johndoe@example.com"
          label="Email Name"
          onChange={(e) => {
            setUsername(e.target.value);
          }}
        ></TextInput>
        <TextInput
          label="Password"
          onChange={(e) => {
            setPassword(e.target.value);
          }}
        ></TextInput>

        <Button
          onClick={async () => {
            const response = await axios.post(
              "http://localhost:3000/api/v1/user/signup",
              {
                username,
                firstName,
                lastName,
                password,
              }
            );
            response.status === 200 && navigate("/signin");
          }}
          width="w-full"
        >
          Sign Up
        </Button>
        <LinkedText
          text="Already have an account?"
          link="Sign In"
          path="/signin"
        ></LinkedText>
      </div>
    </div>
  );
};

export default Signup;
