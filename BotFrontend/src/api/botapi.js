const sendMessage = async () => {
    // "https://digital-ai-bot.onrender.com/chat",
    const res = await fetch("https://digital-ai-bot.onrender.com/", {
        method: "POST",
        headers: {
            "Content-Type": "application/json" // ✅ fixed
        },
        body: JSON.stringify({ message: input })
    });

    const data = await res.json();

    setMessage(prev => [
        ...prev,
        { text: input, sender: "user" },
        { text: data.reply, sender: "bot" }
    ]);

    setInput("");
};