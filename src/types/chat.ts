export interface ChatResponse {
  event: string;
  task_id: string;
  id: string;
  message_id: string;
  conversation_id: string;
  mode: string;
  answer: string;
  metadata: object;
  created_at: EpochTimeStamp;
}

export interface Chat {
  message: string;
  isUser: boolean;
}
