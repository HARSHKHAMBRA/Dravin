import axios from "axios";

const api = axios.create({
  baseURL: "http://192.168.100.16", // Replace with your backend's IP
});

// Fetch available ports
export const getAvailablePorts = async () => {
  const response = await api.get("/availablePorts");
  return response.data.ports;
};

// Initiate a call
export const initiateCall = async (port, phoneNumber) => {
  const response = await api.post("/initiateCall", { port, phoneNumber });
  return response.data;
};