async function askAI() {
    const input = document.getElementById("queryInput");
    const box = document.getElementById("answerBox");

    const q = input.value.trim();
    if (!q) {
        box.innerText = "Please enter a question.";
        return;
    }

    box.innerText = "Thinking…";

    try {
        const res = await fetch(
            "http://backend-service.auto-chatbot.svc.cluster.local:8000/chat",
            {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ query: q })
            }
        );

        const data = await res.json();
        box.innerText = data.answer || "No answer.";

    } catch (e) {
        console.error(e);
        box.innerText = "Error connecting to backend.";
    }
}
