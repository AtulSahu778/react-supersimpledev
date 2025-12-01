import { useEffect, useState } from 'react'
import ChatInput from './components/ChatInput';
import ChatMessages from './components/ChatMessages';
import './App.css'
import { Chatbot } from 'supersimpledev';

function App() {

  
  const [chatMessages, setChatMessages] = useState(() => {
    
  try{
      const savedMessages = localStorage.getItem('chatMessages');

          if(savedMessages){
            return JSON.parse(savedMessages); 
          }
          return [];  
      }
  catch (error) {
      console.error("Could not parse messages:", error);
      return [];
     }
  });

  useEffect(() => {
    Chatbot.addResponses({
      hello: "Hii, there! 👋",
      hii: "Hii, there! 👋",
      "how are you": () => "I'm just code, but running perfectly!",
      help: "You can ask me about anything or say hello.",
      bye: () => "Goodbye! See you soon." 
    });
  }, []);


  useEffect(() => {
    localStorage.setItem('chatMessages', JSON.stringify(chatMessages));  
  }, [chatMessages]);

  

  return (
    <div className="app-container">
      {chatMessages.length === 0 && (
        <p className="emptyChat">Welcome to the chatbot project! Send a message using the textbox above.</p>
      )}
      <ChatMessages 
        chatMessages={chatMessages} 
      />

      <ChatInput
        chatMessages={chatMessages}
        setChatMessages={setChatMessages}
      />
    </div>
  );
}

export default App
