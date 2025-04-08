import express from "express";
import cors from "cors";
import axios from "axios";
import dotenv from "dotenv";

// Load environment variables from .env file
dotenv.config();

const app = express();
const PORT = 5000;

app.use(cors()); // Allow frontend requests
app.use(express.json()); // Parse JSON body

// **Route to verify product using JSONBin API**
app.get("/verify", async (req, res) => {
  const binId = req.query.binId; // Get binId from frontend request

  if (!binId) {
    return res.status(400).json({ error: "Missing bin ID" });
  }

  try {
    // Fetch product data from JSONBin
    const response = await axios.get(`https://api.jsonbin.io/v3/b/${binId}`, {
      headers: { 
        "X-Master-Key": process.env.JSONBIN_API_KEY, // ✅ Pass the secret key securely
      }
    });

    const productData = response.data.record; // Extract actual product data
    res.json(productData); // Send data back to frontend

  } catch (error) {
    res.status(500).json({ error: "Failed to verify product", details: error.message });
  }
});

app.listen(PORT, () => console.log(`✅ Server running on http://localhost:${PORT}`));
