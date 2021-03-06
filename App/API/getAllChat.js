import client from "./client";

const endpoint = "/chat.php";

const getAllChat = (token, page) => {
  const formData = new FormData();
  formData.append("token", token);
  formData.append("page", page);
  return client.post(endpoint, formData);
  //console.log(client.post(endpoint, formData));
};

export default {
  getAllChat,
};
