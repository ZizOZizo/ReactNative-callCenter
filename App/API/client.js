import { create } from "apisauce";

const apiClient = create({
  baseURL: "https://albarqexpress.com/callcenter/api/",
});
export default apiClient;
