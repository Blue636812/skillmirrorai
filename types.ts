export enum Page {
  LOGIN = 'LOGIN',
  DASHBOARD = 'DASHBOARD',
  INTERVIEW_COACH = 'INTERVIEW_COACH',
  PRESENTATION_COACH = 'PRESENTATION_COACH',
  WRITING_ASSISTANT = 'WRITING_ASSISTANT',
  VIRTUAL_ASSISTANT = 'VIRTUAL_ASSISTANT',
}

export interface User {
  id: string;
  name: string;
  email: string;
  avatar?: string;
}

export interface ChatMessage {
  id: string;
  role: 'user' | 'model';
  text: string;
  timestamp: number;
}

export interface FeedbackMetric {
  name: string;
  score: number;
  description: string;
  color: string;
}

export interface InterviewSession {
  id: string;
  date: string;
  duration: string;
  score: number;
  metrics: FeedbackMetric[];
  summary: string;
}