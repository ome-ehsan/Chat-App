import React from 'react'
import { useRef } from 'react'
import { useEffect } from 'react'
import { useChatStates } from '../states/chatStates'
import { useAuthState } from '../states/authStates'
import MessageSkeleton from './skeletons/MessageSkeleton'
import ChatHeader from "./ChatHeader"
import MessageInput from './MessageInput'
import formatTo12Hour from '../lib/utils'

const ChatContainer = () => {
  const { getMessages, messages, isMessagesLoading, selectedUser, startListeningForNewMessages, stopListeningForNewMessages } = useChatStates();
  const { authUser } = useAuthState();
  const messageEndRef = useRef(null);

  useEffect(() => {
   
    getMessages(selectedUser._id);
    startListeningForNewMessages();
    return () => stopListeningForNewMessages();
    
  }, [selectedUser?._id, getMessages]);

  useEffect(() => {
    if(messageEndRef.current && messages){
      messageEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages]);

  if (isMessagesLoading) {
    return (
      <div className="flex-1 flex flex-col overflow-auto">
        <ChatHeader />
        <MessageSkeleton />
        <MessageInput />
      </div>
    )
  }

  return (
    <div className='flex-1 flex flex-col overflow-auto'> 
      <ChatHeader />
      
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.map((message) => (
          <div
            key={message._id}
            className={`chat ${message.senderId === authUser._id ? 'chat-end' : 'chat-start'}`} 
            ref={messageEndRef}
          >
            {/* Profile picture */}
            <div className='chat-image avatar'>
              <div className='size-10 rounded-full border'>
                <img 
                  src={message.senderId === authUser._id 
                    ? authUser.profilePicture || '/avatar.png' 
                    : selectedUser.profilePicture || '/avatar.png'}
                  alt='profile'
                />
              </div>
            </div>

            {/* Time sent */}
            <div className="chat-header mb-1">
              <time className="text-xs opacity-50 ml-1">
                {formatTo12Hour(message.createdAt)}
              </time>
            </div>

            {/* Message content */}
            <div className="chat-bubble flex flex-col">
              {message.image && (
                <img
                  src={message.image}
                  alt="Attachment"
                  className="sm:max-w-[200px] rounded-md mb-2"
                />
              )}
              {message.text && <p>{message.text}</p>}
            </div>
          </div>
        ))}
      </div>

      <MessageInput />
    </div>
  )
}

export default ChatContainer