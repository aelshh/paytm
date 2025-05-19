import React from "react";
import { Link } from "react-router-dom";

export const LinkedText = ({
  text,
  link,
  path,
}: {
  text: string;
  link: string;
  path: string;
}) => {
  return (
    <div className="font-semibold">
      {text}{" "}
      <Link to={path} className="underline">
        {link}
      </Link>
    </div>
  );
};
