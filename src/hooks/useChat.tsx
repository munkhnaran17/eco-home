import * as ImagePicker from 'expo-image-picker';
import { useState } from 'react';
import useStore from '../store/store';
import { Chat, ChatResponse, ImageUploadResponse } from '../types/chat';

const useChat = () => {
  const key = 'app-f8S4yqCkahJ9XJoruBLFyJ8q';
  const { user } = useStore();
  const [chat, setChat] = useState<Chat[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [conversationId, setConversationId] = useState<string | null>(null);

  const uploadImage = async (
    image: ImagePicker.ImagePickerAsset | null,
  ): Promise<ImageUploadResponse | undefined> => {
    const formData = new FormData();
    formData.append('file', {
      uri: image?.uri,
      name: 'image',
      type: image?.mimeType,
    } as any);
    formData.append('user', user.id);

    const res = await fetch('https://api.dify.ai/v1/files/upload', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${key}`,
      },
      body: formData,
    });

    try {
      return (await res.json()) as ImageUploadResponse;
    } catch (e) {
      console.log('uploadImage e: ', e);
    }
  };

  const send = async (
    query: string,
    image: ImagePicker.ImagePickerAsset | null,
  ) => {
    setIsLoading(true);

    setChat((prev) => [
      ...prev,
      { message: query, isUser: true, image: image?.uri },
    ]);

    let imageId = null;

    if (image) {
      const uploadRes = await uploadImage(image);
      imageId = uploadRes?.id;
    }

    const res = await fetch('https://api.dify.ai/v1/chat-messages', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${key}`,
      },
      body: JSON.stringify({
        query: query === '' ? 'Энэ юу вэ?' : query,
        user: user.id,
        inputs: {},
        conversation_id: conversationId,
        files: imageId
          ? [
              {
                type: 'image',
                transfer_method: 'local_file',
                upload_file_id: imageId,
              },
            ]
          : [],
      }),
    });

    try {
      const resJson: ChatResponse = await res.json();
      setConversationId(resJson.conversation_id);
      setChat((prev) => [...prev, { message: resJson.answer, isUser: false }]);
    } catch (e) {
      console.log(e);

      setChat((prev) => [
        ...prev,
        {
          message: imageId
            ? 'Зургийн хэмжээ хэтэрхий том байна. Та дахин оролдоно уу.'
            : 'Уучлаарай, таны асуултыг танихад алдаа гарлаа. Та дахин хүсэлт илгээнэ үү.',
          isUser: false,
        },
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  return {
    send,
    chat,
    isLoading,
    uploadImage,
  };
};

export default useChat;
