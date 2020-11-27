import client from "./client";

const endpoint = "/setCallCenterCheck.php";

const postStatusEnquiry = (token, orderId) => {
  const formData = new FormData();
  formData.append("token", token);
  formData.append("orderid", orderId);
  return client.post(endpoint, formData);
  //console.log(client.post(endpoint, formData));
};

export default {
  postStatusEnquiry,
};
