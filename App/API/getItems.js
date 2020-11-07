import client from "./client";

const endpoint = "/getOrders.php";

const getItems = (token, page, statusCategory, cityCategory) => {
  const formData = new FormData();
  formData.append("token", token);
  formData.append("page", page);
  formData.append("status", statusCategory.value);
  formData.append("city", cityCategory.value);
  //console.log(statusCategory.value);
  return client.post(endpoint, formData);
};

export default {
  getItems,
};
