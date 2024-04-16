import axios from "axios";
const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;


// sEND Automated Email
const sendAutomatedEmail = async (emailData) => {
  const response = await axios.post(`${BACKEND_URL}/api/users/sendAutomatedEmail`, emailData);
  return response.data.message;
};

const emailService = {
  sendAutomatedEmail,
};

export default emailService;
