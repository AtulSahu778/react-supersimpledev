
function ChatInput({ chatMessages, setChatMessages }) {

  const [isLoading, setisLoading] = React.useState(false);
  const [inputText, setInputText] = React.useState('');

  function SaveInputText(event) {
    setInputText(event.target.value);
  }

  

  async function sendMessage(event) {

    if (!inputText.trim() || isLoading) return;

    setisLoading(true);
    setInputText('');
    
    const newChatMessages = [
      ...chatMessages, // copying the data by spreading out it
      {
        message: inputText,
        sender: 'user',
        id: crypto.randomUUID() // random id
      }
    ];

    setChatMessages(newChatMessages);

    setChatMessages([
    ...newChatMessages,
    {
      message: <img className="loading-img" src="https://supersimple.dev/images/loading-spinner.gif" />,
      sender: 'robot',
      id: 'temp-loading'
    }
  ]);

  try{
    const response = await Chatbot.getResponseAsync(inputText);
    setChatMessages([
          ...newChatMessages, // copying the data by spreading out it
          {
            message: response,
            sender: 'robot',
            id: crypto.randomUUID() // random id
          }
        ]);
  } catch(error){
    setChatMessages([
      ...newChatMessages,
      {
        message: 'Error: Could not get response',
        sender: 'robot',
        id: crypto.randomUUID()
      }
    ]); 
  } finally {
    setisLoading(false);
  }
    
    

    setInputText('');
  }

  function handleKeyEnter(event){
    if(event.key === 'Enter'){
        sendMessage();
    }
    else if(event.key === 'Escape'){
        setInputText('');
    }
  }

  return (

    
    <div className="chat-input-container">
      
      <input
        placeholder="Send a message to Chat Bot "
        size={30}
        onChange={SaveInputText}
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

function ChatMessage({ message, sender }) {
  // const {message ,sender} = props;

  /*  
  if(sender === 'robot'){
    return (
      <div>
        {message}
        <img src="https://supersimple.dev/projects/chatbot/robot.png" width={50}/>
      </div>
    )
  }
  */

  return (
    <div className={
      sender === 'user' 
      ? 'chat-message-user' 
      : 'chat-message-robot'
      }>
      {sender === 'robot' && (
        <img className="chat-message-profile"
          src="https://supersimple.dev/projects/chatbot/robot.png"
          
        />
      )}
      {/* guard statemnet && (check if 1st value is true then execute the 2nd value given) */}
      <div className="chat-message-text">
        {message}
      </div>
      {sender === 'user' && (
        <img className="chat-message-profile"
          src="https://supersimple.dev/projects/chatbot/user.png"
          
        />
      )}
    </div>
  );
}




function ChatMessages({ chatMessages }) {
  // const [chatMessages, setChatMessages] = array; // this is called array destructuring.

  // const chatMessages = array[0]; // currrent data
  // const setChatMessages = array[1]; // updater function which updates the current data by making a copy of that
  function useAutoScroll(dependencies){
  const chatMessagesRef = React.useRef(null);
  React.useEffect(() => {
    const containerElem = chatMessagesRef.current;
    if(containerElem){
      containerElem.scrollTop = containerElem.scrollHeight;
    }
  }, [dependencies]);
  return chatMessagesRef;
}
  const chatMessagesRef = useAutoScroll(chatMessages);
  return (
    <div className="chat-messages-container" ref={chatMessagesRef}>
      {chatMessages.map((chatMessage) => {
        return (
          <ChatMessage
            message={chatMessage.message}
            sender={chatMessage.sender}
            key={chatMessage.id}
          />
        );
      })}
    </div>
  );
}

function App() {
  const [chatMessages, setChatMessages] = React.useState([]);

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

const container = document.querySelector('.js-container');
const root = ReactDOM.createRoot(container);
root.render(<App />);
