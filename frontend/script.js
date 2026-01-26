
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
        const response = await fetch(
            "https://azd81cb3hb.execute-api.us-east-1.amazonaws.com/dev/chat",
            {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ query: userQuery })
            }
        );

        const data = await response.json();
        answerBox.innerText = data.answer || "No answer received.";
    } catch (error) {
        console.error(error);
        answerBox.innerText = "❌ Unable to connect to AI service.";
    }
}

/* ---------------------------
   VOICE INPUT (Speech API)
---------------------------- */
function startVoiceInput() {
    if (!("webkitSpeechRecognition" in window)) {
        alert("Voice input not supported in this browser.");
        return;
    }

    const recognition = new webkitSpeechRecognition();
    recognition.lang = "en-IN";
    recognition.interimResults = false;

    recognition.start();

    recognition.onresult = function (event) {
        const voiceText = event.results[0][0].transcript;
        document.getElementById("queryInput").value = voiceText;
        askAI(voiceText);
    };

    recognition.onerror = function () {
        alert("Voice recognition error.");
    };
}
