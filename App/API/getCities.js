import client from "./client";

const endpoint = "/getCities.php";

const getCities = (token) => {
  const formData = new FormData();
  formData.append("token", token);
  return client.post(endpoint, formData);
  //console.log(client.post(endpoint, formData));
};

export default {
  getCities,
};
