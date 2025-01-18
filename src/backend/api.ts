import axios from "axios";


const api = axios.create({
  baseURL: "http://192.168.100.19", // Replace with your API's URL
});
// // Function to get available ports
export const getAvailablePorts = async () => {
  try {
    const response = await api.get("/availablePorts");
    return response.data.ports;
  } catch (error) {
    console.error("Error fetching available ports:", error);
    throw new Error("Failed to fetch available ports");
  }
};

// Function to initiate a call
export const initiateCall = async (port: string, phoneNumber: string) => {
  try {
    const response = await api.post("/initiateCall", { port, phoneNumber });
    return response.data;
  } catch (error) {
    console.error("Error initiating call:", error);
    throw new Error("Failed to initiate the call");
  }
};
