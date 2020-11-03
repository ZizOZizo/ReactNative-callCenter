import client from "./client";

const endpoint = "/login.php";

const loginApi = (username, password) => {
  const formData = new FormData();

  formData.append("username", username);
  formData.append("password", password);

  return client.post(endpoint, formData);
};

export default {
  loginApi,
};
