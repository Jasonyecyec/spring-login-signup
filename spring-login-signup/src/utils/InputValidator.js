//check if email is valid "@"
export const isValidEmail = (email) => {
  return /\S+@\S+\.\S+/.test(email);
};

//check if string contains number
export const containsNumbers = (str) => {
  return /[0-9]/.test(str);
};

//check if string is empty
export const isInputEmpty = (str) => {
  return str.trim().length === 0;
};

export const ifSame = (str, str2) => {
  return str === str2;
};

export const isEmpty = (input) => {
  if (typeof input === "string") {
    return input.trim() === "";
  } else if (typeof input === "object") {
    return (
      Object.keys(input).length === 0 ||
      Object.values(input).every((property) => isEmpty(property))
    );
  } else {
    return false;
  }
};
