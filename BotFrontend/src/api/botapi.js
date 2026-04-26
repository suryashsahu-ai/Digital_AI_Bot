const sendMessage = async () => {
    const res = await fetch("https://chatbotapp-aobn.onrender.com/chat", {
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