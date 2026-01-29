/* ---------------------------
   AI QUERY FUNCTION
---------------------------- */
async function askAI(queryFromVoice = null) {
    const input = document.getElementById("queryInput");
    const answerBox = document.getElementById("answerBox");

    const userQuery = queryFromVoice || input.value.trim();

    if (!userQuery) {
        answerBox.innerText = "⚠️ Please enter or speak a query.";
        return;
    }

    answerBox.innerText = "🤖 Thinking... please wait";

    try {
        const response = await fetch("/chat", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ query: userQuery })
        });

        const data = await response.json();
        answerBox.innerText = data.answer || "No answer received.";

    } catch (error) {
        console.error("API Error:", error);
        answerBox.innerText = "❌ Error connecting to AI service.";
    }
}

/* ---------------------------
   VOICE INPUT (GLOBAL FUNCTION)
---------------------------- */
function startVoiceInput() {
    if (!("webkitSpeechRecognition" in window)) {
        alert("Voice input is not supported in this browser.");
        return;
    }

    const recognition = new webkitSpeechRecognition();
    recognition.lang = "en-IN";
    recognition.interimResults = false;
    recognition.maxAlternatives = 1;

    recognition.start();

    recognition.onstart = function () {
        console.log("🎤 Voice recognition started");
    };

    recognition.onresult = function (event) {
        const voiceText = event.results[0][0].transcript;
        document.getElementById("queryInput").value = voiceText;
        askAI(voiceText);
    };

    recognition.onerror = function (event) {
        console.error("Voice error:", event.error);
        alert("Voice recognition failed. Please try again.");
    };

    recognition.onend = function () {
        console.log("🎤 Voice recognition ended");
    };
}
