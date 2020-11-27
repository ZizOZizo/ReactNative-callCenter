import client from "./client";

const endpoint = "/getMessages.php";

const getChat = (token, orderid) => {
  const formData = new FormData();
  formData.append("token", token);
  formData.append("orderid", orderid);
  return client.post(endpoint, formData);
  //console.log(client.post(endpoint, formData));
};

export default {
  getChat,
};
