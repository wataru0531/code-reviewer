
import express from "express";
import cors from "cors";
import dotenv from "dotenv";
dotenv.config();

import { completion } from "./openai.js";

const app = express();
app.use(express.json()); // 


app.use(cors({
  origin: "http://localhost:3000"
}))

const PORT = process.env.PORT || 3001;

app.post("/api/review", async (req, res) => {
  try{
    // console.log(req.body.message)
    const result = await completion(req.body.message);
    // console.log(result)
    res.json({ result })
  } catch(e) {
    console.error(e);
    res.status(500).json({ error: "AI request failed", detail: e.response?.data || e.message })
  }
});

app.listen(PORT, () => {
  console.log("server running on http://locaohost:3001")
})


