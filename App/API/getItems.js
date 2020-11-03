import client from "./client";

const endpoint = "/getOrders.php";

const getItems = (token) => {
  const formData = new FormData();
  formData.append("token", token);
  return client.post(endpoint, formData);
};

export default {
  getItems,
};
