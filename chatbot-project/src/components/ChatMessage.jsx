import dayjs from "dayjs";
import robotIcon from '../assets/chat-bot.gif';
import userIcon from '../assets/avatar-atul.png';

function ChatMessage({ message, sender, timestamp }) {
  
  const finalTime = timestamp ? dayjs(timestamp).format('h:mma') : '';

  return (
    <div className={
      sender === 'user' 
        ? 'chat-message-user' 
        : 'chat-message-robot'
    }>
      {sender === 'robot' && (
        <img 
          className="chat-message-profile"
          src={robotIcon}
          alt="robot"
        />
      )}
      <div className="chat-message-text">
        {message}
        {timestamp && (
          <div className="chat-message-time">
            {finalTime}
          </div>
        )}
      </div>
      {sender === 'user' && (
        <img 
          className="chat-message-profile"
          src={userIcon}
          alt="user"
        />
      )}
    </div>
  );
}

export default ChatMessage;