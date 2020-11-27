import client from "./client";

const endpoint = "/sendMessage.php";

const sendMessage = (token, orderid, message) => {
  const formData = new FormData();
  formData.append("token", token);
  formData.append("orderid", orderid);
  formData.append("message", message);
  return client.post(endpoint, formData);
};

export default {
  sendMessage,
};
