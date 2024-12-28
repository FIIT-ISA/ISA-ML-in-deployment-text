const textInput = document.getElementById('text-input');
const sendBtn = document.getElementById('send-btn');
const clearBtn = document.getElementById('clear-btn');
const chatBox = document.getElementById('chat-box');

document.addEventListener('DOMContentLoaded', (event) => {
    // Function to add message to chat box
    function addMessage(text, isUser = true) {
        const messageContainer = document.createElement('div');
        messageContainer.classList.add('chat-message');

        const icon = document.createElement('div');
        icon.classList.add(isUser ? 'user-icon' : 'model-icon');
        //icon.style.backgroundImage = `./images/${isUser ? 'user' : 'model'}-icon.png`;
        icon.style.backgroundImage = `url(static/images/${isUser ? 'user-icon' : 'model-icon'}.png)`;

        const messageText = document.createElement('div');
        messageText.classList.add('text-next-to-icon');
        messageText.textContent = text;

        messageContainer.appendChild(icon);
        messageContainer.appendChild(messageText);
        chatBox.appendChild(messageContainer);
        chatBox.scrollTop = chatBox.scrollHeight;
    }

    // Function to send the text
    async function sendText() {
        const text = textInput.value;
        if (!text) {
            addMessage("Please enter a message.", false);
            return;
        }

        addMessage(text, true);
        textInput.value = '';

        try {
            const response = await fetch('/predict', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ tweet: text })
            });

            const data = await response.json();
            addMessage(`${data.sentiment}`, false);
        } catch (error) {
            addMessage("Error during inference.", false);
        }
    }

    // Event listener for Send button
    sendBtn.addEventListener('click', () => {
        sendText();
    });

    // Event listener for Enter key
    document.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            sendText();
        }
    });

    // Event listener for Clear button
    clearBtn.addEventListener('click', () => {
        chatBox.innerHTML = '';
    });
});