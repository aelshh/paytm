import { useState } from "react";
import Button from "../components/Button";
import { LinkedText } from "../components/LinkedText";
import { TextInput } from "../components/TextInput";
import axios from "axios";
import { useNavigate } from "react-router-dom";
const Signin = () => {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  return (
    <div className="flex h-screen w-screen justify-center items-center bg-gray-300">
      <div className=" bg-white flex flex-col justify-center py-7 px-6 rounded-2xl items-center p max-w-sm">
        <h1 className="font-bold text-3xl mb-3">Sign In</h1>
        <p className="text-gray-500 text-lg text-center mb-3 ">
          Enter your credentials to access your account
        </p>
        <TextInput
          placeholder="johndoe@example.com"
          label="Email"
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
              "http://localhost:3000/api/v1/user/signin",
              {
                username,
                password,
              }
            );

            const token = response.data.token;
            localStorage.setItem("token", token);
            navigate("/dashboard");
          }}
          width="w-full"
        >
          Sign In
        </Button>
        <LinkedText
          text="Dont have an account?"
          link="Sign Up"
          path="/signup"
        ></LinkedText>
      </div>
    </div>
  );
};

export default Signin;
