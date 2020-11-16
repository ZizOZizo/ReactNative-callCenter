import client from "./client";

const endpoint = "/getProfile.php";

const getProfile = (token) => {
  const formData = new FormData();
  formData.append("token", token);
  return client.post(endpoint, formData);
};

export default {
  getProfile,
};
