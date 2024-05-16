import axios from "axios";


export const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;


// Validate email
export const validateEmail = (email) => {
  return email.match(
    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
  );
};

// Register User
const register = async (userData) => {
  const response = await axios.post(`${BACKEND_URL}/api/users/register`, userData);
  return response.data;
};

// Login User
const login = async (userData) => {
  const response = await axios.post(`${BACKEND_URL}/api/users/login`, userData);
  return response.data;
};

// Logout User
const logout = async () => {
  const response = await axios.get(`${BACKEND_URL}/api/users/logout`);
  return response.data.message;
};

// Get Login Status
const getLoginStatus = async () => {
  const response = await axios.get(`${BACKEND_URL}/api/users/loginStatus`);
  return response.data;
};

// Get user profile
const getUser = async (userData) => {
  const response = await axios.get(`${BACKEND_URL}/api/users/getUser`,userData);
  return response.data;
};

// Update profile
const updateUser = async (userData) => {
  const response = await axios.patch(`${BACKEND_URL}/api/users/updateUser`, userData);
  return response.data;
};

// Send Verification Email
const sendVerificationEmail = async () => {
  const response = await axios.post(`${BACKEND_URL}/api/users/sendVerificationEmail`);
  return response.data.message;
};

// Verify User
const verifyUser = async (verificationToken) => {
  const response = await axios.patch(
    `${BACKEND_URL}/api/users/verifyUser/${verificationToken}`
  );

  return response.data.message;
};

// Change Password
const changePassword = async (userData) => {
  const response = await axios.patch(`${BACKEND_URL}/api/users/changePassword`, userData);

  return response.data.message;
};

// Reset Password
const resetPassword = async (userData, resetToken) => {
  const response = await axios.patch(
    `${BACKEND_URL}/api/users/${resetToken},
   ${userData}`
  );

  return response.data.message;
};

// fORGOT Password
const forgotPassword = async (userData) => {
  const response = await axios.post(`${BACKEND_URL}/api/users/forgotPassword`, userData);

  return response.data.message;
};

// Get Users
const getUsers = async () => {
  const response = await axios.get(`${BACKEND_URL}/api/users/getUsers`);

  return response.data;
};
// Delete User            `${BACKEND_URL}/api/users` + id
const deleteUser = async (id) => {

    const response = await axios.delete(`${BACKEND_URL}/api/users/deleteUser/${id}`);
    return response.data.message;
};

// Upgrade User
const upgradeUser = async (userData) => {
  const response = await axios.post(`${BACKEND_URL}/api/users/upgradeUser`, userData);

  return response.data.message;
};

// Send Login Code
const sendLoginCode = async (email) => {
  const response = await axios.post( `${BACKEND_URL}/api/users/${email}`);

  return response.data.message;
};
// Login With Code
const loginWithCode = async (code, email) => {
  const response = await axios.post( `${BACKEND_URL}/api/users/loginWithCode/${email}`, code);

  return response.data;
};
// Login With Googlr
const loginWithGoogle = async (userToken) => {
  const response = await axios.post(`${BACKEND_URL}/api/users/google/callback`, userToken);

  return response.data;
};



const authService = {
  register,
  login,
  logout,
  getLoginStatus,
  getUser,
  updateUser,
  sendVerificationEmail,
  verifyUser,
  changePassword,
  forgotPassword,
  resetPassword,
  getUsers,
  deleteUser,
  upgradeUser,
  sendLoginCode,
  loginWithCode,
  loginWithGoogle,
};

export default authService;
