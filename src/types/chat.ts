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
  image?: string;
}

export interface ImageUploadResponse {
  id: string;
  name: string;
  size: number;
  extension: string;
  mime_type: string;
  created_by: string;
  created_at: EpochTimeStamp;
  preview_url: any;
}
