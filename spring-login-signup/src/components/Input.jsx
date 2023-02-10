import React from "react";

const Input = ({ type, name, state, handleFunction, id }) => {
  return (
    <input
      type={type}
      required
      name={name}
      value={state}
      onChange={handleFunction}
      id={id}
      className="border-gray-300 border-[1.8px] rounded-md py-2 px-3 drop-shadow-sm focus:outline-none
             focus:border-primary focus:ring-1 w-full focus:ring-primary hover:border-primary"
    />
  );
};

export default Input;
