

function ChatInput(){
    return (
       <>
            <input placeholder="Send a message to Chat Bot " size={30}/>
            <button>Send</button>
        </>
    );
}


function ChatMessage({message,sender}){

    // const {message ,sender} = props;
    
/*  if(sender === 'robot'){
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
            {sender === 'robot' && <img src="https://supersimple.dev/projects/chatbot/robot.png" width={50}/>} 
            {/* guard statemnet && (check if 1st value is true then execute the 2nd value given) */}
            {message}

            {sender === 'user' && <img src="https://supersimple.dev/projects/chatbot/user.png" width={50}/>}
        </div>
    );
}

 function App(){


    const chatMessages = [{
        message: 'hello chatbot',
        sender: 'user',
    },
    {
        message: 'Hello! How can i help you?',
        sender: 'robot'
    },
    {
        message: `Can you get me today's date?`,
        sender: 'user'
    },
    {
        message: `Today is 19 November`,
        sender: 'robot'
    }
];


  const chatMessageComponents = chatMessages.map((chatMessage) => {
        return (
            <ChatMessage 
                message = {chatMessage.message}
                sender = {chatMessage.sender}
            />
        )
    });




    return (
    <>
    <ChatInput/>
    {chatMessageComponents}
    </>
    );
 }


const container = document.querySelector('.js-container');

const root = ReactDOM.createRoot(container);
root.render(<App />)