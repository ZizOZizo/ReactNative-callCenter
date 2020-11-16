import client from "./client";

const endpoint = "/getOrders.php";

const getItems = (
  token,
  page,
  statusCategory,
  cityCategory,
  dateFrom,
  dateTo,
  serachText,
  enquiryCategory
) => {
  const formData = new FormData();
  formData.append("token", token);
  formData.append("page", page);
  formData.append("status", statusCategory.value);
  formData.append("city", cityCategory.value);
  formData.append("start", dateFrom);
  formData.append("end", dateTo);
  formData.append("search", serachText);
  formData.append("callCenterStatus", enquiryCategory.value);
  //console.log(statusCategory.value);
  return client.post(endpoint, formData);
};

export default {
  getItems,
};
