

const userInput = document.getElementById("userInput");
const sendButton = document.getElementById("sendButton");
const chatArea = document.getElementById("chatArea");
const welcome = document.querySelector(".welcome");

async function sendMessage() {
    const message = userInput.value.trim();

    if (message === "") return;

    welcome.style.display = "none";

    // Display user message
    const userDiv = document.createElement("div");
    userDiv.className = "user-message";
    userDiv.textContent = message;
    chatArea.appendChild(userDiv);

    userInput.value = "";

    // Display temporary loading message
    const botDiv = document.createElement("div");
    botDiv.className = "bot-message";
    botDiv.textContent = "COSMA is thinking...";
    chatArea.appendChild(botDiv);

    try {
        // Send message to Flask
        const response = await fetch("/chat", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                message: message
            })
        });

        const data = await response.json();

        botDiv.textContent = data.reply;

    } catch (error) {
        botDiv.textContent = "Unable to connect to COSMA backend.";
        console.error(error);
    }
}

sendButton.addEventListener("click", sendMessage);

userInput.addEventListener("keydown", function(event) {
    if (event.key === "Enter") {
        sendMessage();
    }
});
