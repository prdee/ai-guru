import React, { useState, useRef, useEffect } from 'react';
import styled, { keyframes, css } from 'styled-components';
import logo from '../../assests/logo.svg';
import { sendMessage } from '../../api/chatBot';
//import { FaPaperPlane, FaTimes, FaRobot, FaUser ,FaRedo } from 'react-icons/fa';

const fadeIn = keyframes`
  from { opacity: 0; }
  to { opacity: 1; }
`;

const slideIn = keyframes`
  from { transform: translateY(20px); opacity: 0; }
  to { transform: translateY(0); opacity: 1; }
`;

const WidgetContainer = styled.div`
  position: fixed;
  bottom: 40px;
  right: 20px;
  width: ${props => (props.expanded === 'true' ? '350px' : '60px')};
  height: ${props => (props.expanded === 'true' ? '500px' : '60px')};
  background-color: #fff;
  border-radius: ${props => (props.expanded === 'true' ? '10px' : '30px')};
  overflow: hidden;
  display: flex;
  flex-direction: column;
  box-shadow: 0 10px 25px rgba(0, 0, 0, 0.1);
  transition: all 0.3s cubic-bezier(0.25, 0.8, 0.25, 1);
  animation: ${fadeIn} 0.3s ease-out;
`;

const Header = styled.div`
  background: linear-gradient(135deg, #6e8efb, #a777e3);
  color: white;
  padding: ${props => props.expanded === 'true' ? '15px' : '10px'};
  display: flex;
  align-items: center;
  justify-content: ${props => props.expanded === 'true' ? 'space-between' : 'center'};
  transition: all 0.3s ease;
`;


const CloseButton = styled.button`
  background: none;
  border: none;
  color: white;
  font-size: 20px;
  transition: transform 0.2s;

  &:hover {
    transform: scale(1.1);
    background: none;
  }
`;

const ChatArea = styled.div`
  flex: 1;
  padding: 20px;
  overflow-y: auto;
  display: flex;
  flex-direction: column-reverse;
  background-color: #f7f7f7;
`;

const MessageList = styled.div`
  display: flex;
  flex-direction: column;
`;

const MessageItem = styled.div`
  max-width: 80%;
  margin: 8px 0;
  padding: 12px 16px;
  border-radius: 18px;
  font-size: 14px;
  line-height: 1.4;
  animation: ${slideIn} 0.3s ease-out;
  
  ${props => props.isownmessage === 'true'
    ? css`
        align-self: flex-end;
        background-color: #6e8efb;
        color: white;
        border-bottom-right-radius: 4px;
      `
    : css`
        align-self: flex-start;
        background-color: #e6e6e6;
        color: #333;
        border-bottom-left-radius: 4px;
      `
  }
`;

const Footer = styled.form`
  padding: 15px;
  display: flex;
  background-color: #fff;
  border-top: 1px solid #eee;
`;

const Input = styled.input`
  flex: 1;
  height: 40px;
  padding: 0 15px;
  border: 1px solid #ddd;
  border-radius: 20px;
  font-size: 14px;
  transition: all 0.3s;

  &:focus {
    outline: none;
    border-color: #6e8efb;
    box-shadow: 0 0 0 2px rgba(110, 142, 251, 0.1);
  }
`;

const SendButton = styled.button`
  width: 40px;
  height: 40px;
  margin-left: 10px;
  border: none;
  border-radius: 50%;
  background-color: #6e8efb;
  color: white;
  transition: all 0.3s;

  &:hover {
    background-color: #5a7df7;
    transform: scale(1.05);
  }
`;

const NotificationBadge = styled.div`
  position: absolute;
  top: -5px;
  right: -5px;
  width: 20px;
  height: 20px;
  background-color: #ff4757;
  color: white;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 12px;
  font-weight: bold;
  animation: ${fadeIn} 0.3s ease-out;
`;

const Avatar = styled.div`
  width: 30px;
  height: 30px;
  border-radius: 50%;
  background-color: ${props => props.isUser ? '#6e8efb' : '#a777e3'};
  display: flex;
  align-items: center;
  justify-content: center;
  margin-right: 10px;
  color: white;
`;
const jump = keyframes`
  0% { transform: translateY(0); }
  50% { transform: translateY(-10px); }
  100% { transform: translateY(0); }
`;

const Logo = styled.img`
  height: ${props => props.expanded === 'true' ? '30px' : '40px'};
  transition: all 0.3s ease;
  animation: ${props => props.jumping === 'true' ? css`${jump} 1s ease infinite` : 'none'};
`;

const Tooltip = styled.div`
  position: absolute;
  top: -40px;
  left: 50%;
  transform: translateX(-50%);
  background-color: #333;
  color: white;
  padding: 5px 10px;
  border-radius: 5px;
  font-size: 12px;
  white-space: nowrap;
  opacity: ${props => props.show === "true" ? 1 : 0};
  transition: opacity 0.3s ease;
  pointer-events: none;
`;
const pulseAnimation = keyframes`
  0% { opacity: 0.5; }
  50% { opacity: 1; }
  100% { opacity: 0.5; }
`;

const TypingIndicator = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 10px;
`;

const TypingDot = styled.div`
  width: 8px;
  height: 8px;
  background-color: #6e8efb;
  border-radius: 50%;
  margin-right: 5px;
  animation: ${pulseAnimation} 1.5s infinite;
  animation-delay: ${props => props.delay}s;
`;

const RetryButton = styled.button`
  background-color: #ff4757;
  color: white;
  border: none;
  border-radius: 5px;
  padding: 5px 10px;
  font-size: 12px;
  margin-top: 5px;
  display: flex;
  align-items: center;
  justify-content: center;
  
  &:hover {
    background-color: #ff6b6b;
  }
`;
const MessageContent = styled.div`
  word-wrap: break-word;
  
  img {
    max-width: 100%;
    height: auto;
  }

  a {
    color: #0000EE;
    text-decoration: underline;
  }

  pre {
    background-color: #f4f4f4;
    padding: 10px;
    border-radius: 5px;
    overflow-x: auto;
  }

  code {
    font-family: 'Courier New', Courier, monospace;
  }
`;

const ChatWidget = ({ topic = "" }) => {
  const [expanded, setExpanded] = useState('false');
  const [messages, setMessages] = useState([
    { id: 1, sender: 'Bot', message: `Hello! How can I help you ${topic ? `with ${topic}`: ``}?`, isOwnMessage: 'false' },
    { id: 2, sender: 'Bot', message: 'Feel free to ask any questions.', isOwnMessage: 'false' }
  ]);
  const [isTyping, setIsTyping] = useState(false);
  const [notificationCount, setNotificationCount] = useState(1);
  const [showTooltip, setShowTooltip] = useState("false");
  const [error, setError] = useState(null);
  const widgetRef = useRef(null);
  const chatbotForm = useRef();

  const handleExpand = () => {
    setExpanded(expanded === 'true' ? 'false' : 'true');
    setNotificationCount(0);
    setShowTooltip("false");
  }
  const renderMessageContent = (content) => {
    return <MessageContent dangerouslySetInnerHTML={{ __html: content }} />;
  };

  const handleClickOutside = (event) => {
    if (widgetRef.current && !widgetRef.current.contains(event.target)) {
      setExpanded('false');
    }
  };
  const sendMessageToAPI = async (inputValue) => {
    setIsTyping(true);
    setError(null);

    try {
      const sendMessageData = await sendMessage({ topic, message: inputValue });
      if(!sendMessageData.data?.length){
        setError('Failed to send message. Please try again.');
        setIsTyping(false);
      }
      setIsTyping(false);

      if (sendMessageData?.data?.length) {
        const responseMessage = sendMessageData.data[0].response || sendMessageData.data[0].message;
        setMessages(prevMessages => [...prevMessages, { id: Date.now(), sender: 'Bot', message: responseMessage, isOwnMessage: 'false' }]);
        if (expanded === 'false') {
          setNotificationCount(prev => prev + 1);
        }
      }
    } catch (error) {
      setIsTyping(false);
      console.error('Error sending message:', error);
      setError('Failed to send message. Please try again.');
    }
  };

  const handleSendMessage = async (e) => {
    e.preventDefault();
    const inputValue = e.target.chatbotinput.value;
    if (inputValue.trim()) {
      setMessages(prevMessages => [...prevMessages, { id: Date.now(), sender: 'You', message: inputValue, isOwnMessage: 'true' }]);
      chatbotForm.current.reset();
      await sendMessageToAPI(inputValue);
    }
  };

  const handleRetry = () => {
    const lastUserMessage = messages.findLast(msg => msg.isOwnMessage === 'true');
    if (lastUserMessage) {
      sendMessageToAPI(lastUserMessage.message);
    }
    setError(null);
  };

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  // useEffect(() => {
  //   const tooltipInterval = setInterval(() => {
  //     setShowTooltip("true");
  //     setTimeout(() => setShowTooltip("false"), 3000);
  //   }, 10000);

  //   return () => clearInterval(tooltipInterval);
  // }, []);

  return (
    <WidgetContainer expanded={expanded} ref={widgetRef} className='chatbot-widget-container'>
      <Header expanded={expanded} onClick={expanded === 'false' ? handleExpand : undefined} className='chatbot-widget-header' role='button'>
        <Logo src={logo} alt="AI Guru" expanded={expanded} jumping= {expanded === 'false' ? 'false' : "true"} />
        {expanded === 'true' && (
          <>
            <span>AI Guru Chat</span>
            <CloseButton onClick={handleExpand} role='button'>
              {/* <FaTimes /> */}
              <i className='fas fa-times' />
            </CloseButton>
          </>
        )}
        {expanded === 'false' && (
          <>
            <Tooltip show={showTooltip}>Have doubts? I'm ready to help you!</Tooltip>
            {notificationCount > 0 && (
              <NotificationBadge>{notificationCount}</NotificationBadge>
            )}
          </>
        )}
      </Header>
      {expanded === 'true' && (
        <>
          <ChatArea>
            <MessageList>
              {messages.map(msg => (
                <MessageItem key={msg.id} isownmessage={msg.isOwnMessage}>
                  <div className='d-flex align-items-center justify-content-between' style={{marginBottom: '5px' }}>
                    <Avatar isUser={msg.isOwnMessage === 'true'}>
                      {msg.isOwnMessage === 'true' ? <i className='fas fa-user' /> : <i className='fas fa-robot'/>}
                    </Avatar>
                    <strong>{msg.sender}</strong>
                  </div>
                  {renderMessageContent(msg.message)}
                </MessageItem>
              ))}
              {isTyping && (
                <TypingIndicator>
                  <Avatar isUser={false}>
                    <i className='fas fa-robot' />
                  </Avatar>
                  <TypingDot delay={0} />
                  <TypingDot delay={0.2} />
                  <TypingDot delay={0.4} />
                </TypingIndicator>
              )}
              {error && (
                <div style={{ color: 'red', marginTop: '10px' }}>
                  {error}
                  <RetryButton onClick={handleRetry} role='button'>
                    <i className='fas fa-redo' style={{ marginRight: '5px' }} /> Retry
                  </RetryButton>
                </div>
              )}
            </MessageList>
          </ChatArea>
          <Footer onSubmit={handleSendMessage} ref={chatbotForm}>
            <Input
              placeholder="Type a message..."
              name="chatbotinput"
            />
            <SendButton type='submit' className='d-flex justify-content-center align-items-center'>
              <i className='fas fa-paper-plane' />
            </SendButton>
          </Footer>
        </>
      )}
    </WidgetContainer>
  );
};

export default React.memo(ChatWidget);