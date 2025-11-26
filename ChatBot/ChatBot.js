function ChatInput({ chatMessages, setChatMessages }) {
  const [inputText, setInputText] = React.useState('');

  function SaveInputText(event) {
    setInputText(event.target.value);
  }

  async function sendMessage(event) {
    const newChatMessages = [
      ...chatMessages, // copying the data by spreading out it
      {
        message: inputText,
        sender: 'user',
        id: crypto.randomUUID() // random id
      }
    ];

    setChatMessages(newChatMessages);

    const response = await Chatbot.getResponseAsync(inputText);

    setChatMessages([
      ...newChatMessages, // copying the data by spreading out it
      {
        message: response,
        sender: 'robot',
        id: crypto.randomUUID() // random id
      }
    ]);

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
    <>
      <input
        placeholder="Send a message to Chat Bot "
        size={30}
        onChange={SaveInputText}
        value={inputText}
        onKeyDown={handleKeyEnter}
      />
      <button onClick={sendMessage}>Send</button>
    </>
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
    <div>
      {sender === 'robot' && (
        <img
          src="https://supersimple.dev/projects/chatbot/robot.png"
          width={50}
        />
      )}
      {/* guard statemnet && (check if 1st value is true then execute the 2nd value given) */}
      {message}
      {sender === 'user' && (
        <img
          src="https://supersimple.dev/projects/chatbot/user.png"
          width={50}
        />
      )}
    </div>
  );
}

function ChatMessages({ chatMessages }) {
  // const [chatMessages, setChatMessages] = array; // this is called array destructuring.

  // const chatMessages = array[0]; // currrent data
  // const setChatMessages = array[1]; // updater function which updates the current data by making a copy of that

  return (
    <>
      {chatMessages.map((chatMessage) => {
        return (
          <ChatMessage
            message={chatMessage.message}
            sender={chatMessage.sender}
            key={chatMessage.id}
          />
        );
      })}
    </>
  );
}

function App() {
  const [chatMessages, setChatMessages] = React.useState([
    {
      message: 'hello chatbot',
      sender: 'user',
      id: 1
    },
    {
      message: 'Hello! How can i help you?',
      sender: 'robot',
      id: 2
    },
    {
      message: `Can you get me today's date?`,
      sender: 'user',
      id: 3
    },
    {
      message: `Today is 19 November`,
      sender: 'robot',
      id: 4
    }
  ]);

  return (
    <>
      <ChatInput
        chatMessages={chatMessages}
        setChatMessages={setChatMessages}
      />
      <ChatMessages chatMessages={chatMessages} />
    </>
  );
}

const container = document.querySelector('.js-container');
const root = ReactDOM.createRoot(container);
root.render(<App />);
