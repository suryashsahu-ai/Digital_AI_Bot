const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const axios = require('axios');
const { connectDb } = require('./Model/signup');

dotenv.config();
connectDb();

const app = express();
const port = 5000;

app.use(cors({ origin: "https://digital-ai-bot-32rc.vercel.app"}));
app.use(express.urlencoded({extended:true}))
app.use(express.json());

app.post('/chat', async (req, res) => {
    const message = req.body.message;

    try {
        const response = await axios({
            method: "POST",
            url: "https://api.groq.com/openai/v1/chat/completions",
            headers: {
                "Authorization": `Bearer ${process.env.GROQ_API_KEY}`,
                "Content-Type": "application/json",
            },
            data: {
                model: "llama-3.1-8b-instant",
                messages: [   // ✅ fixed
                    {
                        role: "system",
                        content: "You are a helpful support assistant for a digital marketing company. Answer only about services, pricing, and support."
                    },
                    {
                        role: "user",
                        content: message
                    }
                ]
            }
        });

        const reply = response.data.choices[0].message.content; // ✅ fixed

        res.json({ reply });

    } catch (error) {
        console.error(error.message);
        res.json({ reply: "Error getting response" });
    }
});

app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
});