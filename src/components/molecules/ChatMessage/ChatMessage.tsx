import { Chat } from '@/src/types/chat';
import React, { useEffect, useState } from 'react';
import { Typography } from '../..';
import Box from '../../atoms/Box/Box';

interface ChatMessageProps {
  chat: Chat;
}

const ChatMessage = ({ chat }: ChatMessageProps) => {
  const [displayedText, setDisplayedText] = useState('');
  const speed = 1;
  const text = chat.message;

  useEffect(() => {
    let currentIndex = 0;
    const typingInterval = setInterval(() => {
      setDisplayedText(text?.slice(0, currentIndex + 1));
      currentIndex++;

      if (currentIndex >= text.length) {
        clearInterval(typingInterval);
      }
    }, speed);

    return () => clearInterval(typingInterval);
  }, [text, speed]);

  return (
    <Box alignItems={chat.isUser ? 'flex-end' : 'flex-start'}>
      <Box
        backgroundColor={chat.isUser ? 'white' : 'transparent'}
        maxWidth={chat.isUser ? '75%' : '100%'}
        padding={chat.isUser ? 'sp16' : 'sp0'}
        borderRadius='br16'
        borderBottomRightRadius='br0'
      >
        <Typography>{chat.isUser ? chat.message : displayedText}</Typography>
      </Box>
    </Box>
  );
};

export default ChatMessage;
