import { useState } from "react";
import dayjs from "dayjs";

function ChatInput({ chatMessages, setChatMessages }) {
  const [isLoading, setIsLoading] = useState(false); 
  const [inputText, setInputText] = useState('');

  function saveInputText(event) {
    setInputText(event.target.value);
  }

  async function sendMessage() {
    if (!inputText.trim() || isLoading) return;
    
    setIsLoading(true);  
    const inputCopy = inputText;
    setInputText('');

    
    const newChatMessages = [
      ...chatMessages,
      {
        message: inputCopy,
        sender: 'user',
        id: crypto.randomUUID(),
        timestamp: dayjs().valueOf()  
      }
    ];
    setChatMessages(newChatMessages);

    
    const loadingId = 'temp-loading-' + Date.now();  
    setChatMessages([
      ...newChatMessages,
      {
        message: <img className="loading-img" src="https://supersimple.dev/images/loading-spinner.gif" />,
        sender: 'robot',
        id: loadingId,
        timestamp: dayjs().valueOf()
      }
    ]);

    try {
      
      const response = await window.Chatbot?.getResponseAsync(inputCopy);  
      
      setChatMessages([
        ...newChatMessages,
        {
          message: response,
          sender: 'robot',
          id: crypto.randomUUID(),
          timestamp: dayjs().valueOf()
        }
      ]);
    } catch (error) {
      setChatMessages([
        ...newChatMessages,
        {
          message: 'Error: Could not get response',
          sender: 'robot',
          id: crypto.randomUUID(),
          timestamp: dayjs().valueOf()
        }
      ]);
    } finally {
      setIsLoading(false);
    }
  }

  function clearMessage(){

    setChatMessages([]);

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
      <button
      className="clear-button"
      onClick={clearMessage}
      >
        Clear</button>
    </div>
  );
}

export default ChatInput;
