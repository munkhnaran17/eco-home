import { useState } from 'react';
import useStore from '../store/store';
import { Chat, ChatResponse } from '../types/chat';

const useChat = () => {
  const key = 'app-f8S4yqCkahJ9XJoruBLFyJ8q';
  const { user } = useStore();
  const [chat, setChat] = useState<Chat[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [conversationId, setConversationId] = useState<string | null>(null);

  const send = async (query: string) => {
    setIsLoading(true);
    setChat((prev) => [...prev, { message: query, isUser: true }]);

    const res = await fetch('https://api.dify.ai/v1/chat-messages', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${key}`,
      },
      body: JSON.stringify({
        query,
        user: user.id,
        inputs: {},
        conversationId,
      }),
    });

    try {
      const resJson: ChatResponse = await res.json();
      setConversationId(resJson.conversation_id);
      setChat((prev) => [...prev, { message: resJson.answer, isUser: false }]);
    } catch (e) {
      console.log('chat e: ', e);
    } finally {
      setIsLoading(false);
    }
  };

  return {
    send,
    chat,
    isLoading,
  };
};

export default useChat;
