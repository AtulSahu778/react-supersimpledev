import { useState } from "react";

function ChatInput({ chatMessages, setChatMessages }) {
  const [isLoading, setIsLoading] = useState(false);  // Fixed: camelCase
  const [inputText, setInputText] = useState('');

  function saveInputText(event) {
    setInputText(event.target.value);
  }

  async function sendMessage() {
    if (!inputText.trim() || isLoading) return;
    
    setIsLoading(true);  // Fixed: camelCase
    const inputCopy = inputText;
    setInputText('');

    // Add user message FIRST (optimistic update)
    const newChatMessages = [
      ...chatMessages,
      {
        message: inputCopy,
        sender: 'user',
        id: crypto.randomUUID()
      }
    ];
    setChatMessages(newChatMessages);

    // Add loading message
    const loadingId = 'temp-loading-' + Date.now();  // Unique loading ID
    setChatMessages([
      ...newChatMessages,
      {
        message: <img className="loading-img" src="https://supersimple.dev/images/loading-spinner.gif" />,
        sender: 'robot',
        id: loadingId
      }
    ]);

    try {
      
      const response = await window.Chatbot?.getResponseAsync(inputCopy);  
      
      setChatMessages([
        ...newChatMessages,
        {
          message: response,
          sender: 'robot',
          id: crypto.randomUUID()
        }
      ]);
    } catch (error) {
      setChatMessages([
        ...newChatMessages,
        {
          message: 'Error: Could not get response',
          sender: 'robot',
          id: crypto.randomUUID()
        }
      ]);
    } finally {
      setIsLoading(false);
    }
  }

  function handleKeyEnter(event) {
    if (event.key === 'Enter') {
      sendMessage();
    } else if (event.key === 'Escape') {
      setInputText('');
    }
  }

  return (
    <div className="chat-input-container">
      <input
        placeholder="Send a message to Chat Bot "
        onChange={saveInputText}
        value={inputText}
        onKeyDown={handleKeyEnter}
        disabled={isLoading}
        className="chat-input"
      />
      <button
        onClick={sendMessage}
        disabled={isLoading || !inputText.trim()}
        className="send-button"
      >
        {isLoading ? 'Sending...' : 'Send'}
      </button>
    </div>
  );
}

export default ChatInput;
