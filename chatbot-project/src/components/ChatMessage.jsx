function ChatMessage({ message, sender }) {
  return (
    <div className={
      sender === 'user' 
        ? 'chat-message-user' 
        : 'chat-message-robot'
    }>
      {sender === 'robot' && (
        <img 
          className="chat-message-profile"
          src="https://supersimple.dev/projects/chatbot/robot.png"
        />
      )}
      <div className="chat-message-text">
        {message}
      </div>
      {sender === 'user' && (
        <img 
          className="chat-message-profile"
          src="https://supersimple.dev/projects/chatbot/user.png"
        />
      )}
    </div>
  );
}

export default ChatMessage;