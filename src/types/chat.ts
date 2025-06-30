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

export interface OnboardingSalaryResponse {
  task_id: string;
  workflow_run_id: string;
  data: {
    id: string;
    workflow_id: string;
    status: string;
    outputs: {
      answer: string;
    };
  };
  error: string;
  elapsed_time: number;
  total_tokens: number;
  total_steps: number;
  created_at: EpochTimeStamp;
  finished_at: EpochTimeStamp;
}

export interface OnboardingAnswer {
  savings: {
    carbon_dioxide: number;
    electricity_consumption: number;
    total_savings: number;
    equivalent_to_total_trees: number;
  };
  product_recommendations: {
    version_a: OnboardingProductRecommendation;
    version_b: OnboardingProductRecommendation;
    version_c: OnboardingProductRecommendation;
  };
  recommendation_priority: 'version_a' | 'version_b' | 'version_c';
  estimated_implementation_time: string;
}

export interface OnboardingProductRecommendation {
  title: string;
  products: OnboardingProduct[];
  total_price: number;
}

export interface OnboardingProduct {
  name: string;
  price: number;
  unit: string;
  co2: number;
  energy: number;
}
