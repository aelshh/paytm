import React from "react";

const Button = ({
  onClick,
  children,
  bgColor,
  width,
}: {
  onClick: () => void;
  children: string;
  bgColor?: string;
  width?: string;
}) => {
  return (
    <button
      className={`${
        bgColor ? `${bgColor}` : `bg-black `
      } rounded-lg p-3 px-4 text-white mt-3 font-semibold mb-4 cursor-pointer ${
        width && `${width}`
      }   `}
      onClick={onClick}
    >
      {children}
    </button>
  );
};

export default Button;
