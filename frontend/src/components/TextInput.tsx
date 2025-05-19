import React, { ReactDOM } from "react";

export const TextInput = ({
  placeholder,
  label,
  onChange,
}: {
  placeholder?: string;
  label?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
}) => {
  return (
    <div className="flex flex-col w-full m-2">
      <label htmlFor="name" className="font-semibold tex-lg mb-2">
        {label}
      </label>
      <input
        onChange={onChange}
        type="text"
        placeholder={placeholder}
        name="name"
        className="border border-gray-300 p-2 rounded-lg"
      />
    </div>
  );
};
