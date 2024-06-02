import axios from "axios";

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  params: {
    bl_lat: "35.202526",
    bl_lng: "25.462285",
    tr_lat: "41.710625",
    tr_lng: "44.59183",
    limit: "300",
  },
  headers: {
    "X-RapidAPI-Key": import.meta.env.VITE_API_KEY,
    "X-RapidAPI-Host": "flight-radar1.p.rapidapi.com",
  },
});
export default api;
//* Yapılan her istekde geçerli olmasını istediğimiz ayarları,
//* tanımladığımız bir AXİOS örneği,
