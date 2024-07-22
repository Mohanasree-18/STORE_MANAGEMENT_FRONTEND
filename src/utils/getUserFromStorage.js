export const getUserFromStorage = () => {
  // Try to parse localStorage.getItem("userInfo"), handling potential errors
  const userInfo = JSON.parse(localStorage.getItem("userInfo")) || {};

  // Check if userInfo is an object and has a "token" property before accessing it
  return userInfo?.token;
};
