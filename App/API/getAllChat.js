import client from "./client";

const endpoint = "/chat.php";

const getChat = (token) => {
  const formData = new FormData();
  formData.append("token", token);
  return client.post(endpoint, formData);
  //console.log(client.post(endpoint, formData));
};

export default {
  getChat,
};
