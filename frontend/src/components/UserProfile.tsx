import React from "react";

const UserProfile = ({
  children,
  bgcolor,
  textColor,
}: {
  children: React.ReactNode;
  bgcolor?: string;
  textColor?: string;
}) => {
  return (
    <div
      className={` ${bgcolor ? `${bgcolor}` : "bg-gray-100"}  ${
        textColor ? `${textColor}` : "text-black"
      } rounded-full text-center  flex justify-center  align-center h-10 w-10`}
    >
      <p className=" text-center p-2 "> {children} </p>
    </div>
  );
};

export default UserProfile;
