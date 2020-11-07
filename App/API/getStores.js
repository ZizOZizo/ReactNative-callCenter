import client from "./client";

const endpoint = "/getStores.php";

const getStores = (token) => {
  const formData = new FormData();
  formData.append("token", token);
  return client.post(endpoint, formData);
  //console.log(client.post(endpoint, formData));
};

export default {
  getStores,
};
