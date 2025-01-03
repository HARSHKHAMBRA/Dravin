import express, { Request, Response } from "express";
import axios from "axios";

const app = express();
const port = 5060; // Port for your API server

// Create an axios instance for API calls
const api = axios.create({
  baseURL: "http://192.168.100.19:5060", // API base URL with port
});

// Middleware to parse incoming JSON requests
app.use(express.json());

// Endpoint to fetch available ports
app.get("/availablePorts", async (req: Request, res: Response) => {
  try {
    const response = await api.get("/availablePorts");
    res.json({ ports: response.data.ports });
  } catch (error) {
    console.error("Error fetching available ports:", error);
    res.status(500).json({ error: "Failed to fetch available ports" });
  }
});

// Endpoint to initiate a call
app.post("/initiateCall", async (req: Request, res: Response) => {
  const { port, phoneNumber } = req.body;

  if (!port || !phoneNumber) {
    return res.status(400).json({ error: "Port and phone number are required" });
  }

  try {
    const response = await api.post("/initiateCall", { port, phoneNumber });
    res.json(response.data);
  } catch (error) {
    console.error("Error initiating call:", error);
    res.status(500).json({ error: "Failed to initiate the call" });
  }
});

// Start the Express server
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
