import client from "./client";

const endpoint = "/getStatues.php";

const getStatuses = (token) => {
  const formData = new FormData();
  formData.append("token", token);
  return client.post(endpoint, formData);
};

export default {
  getStatuses,
};
