import client from "./client";

const endpoint = "/updateProfile.php";

const resetPassword = (token, name, phone, password) => {
  const formData = new FormData();
  formData.append("token", token);
  formData.append("name", name);
  formData.append("phone", phone);
  formData.append("password", password);
  /* console.log(name);
  console.log(phone);
  console.log(password);
  */
  return client.post(endpoint, formData);
  //console.log(client.post(endpoint, formData));
};

export default {
  resetPassword,
};
