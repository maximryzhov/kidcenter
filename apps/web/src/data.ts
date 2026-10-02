export type Role = 'teacher' | 'student';

export interface ParentContact {
  name: string;
  relation: string;
  phone: string;
}

export interface Student {
  id: string;
  name: string;
  initials: string;
  avatarUrl?: string;
  age: number;
  group: string;
  color: string;
  attendance: string;
  nextLesson: string;
  interests: string[];
  about: string;
  email: string;
  max: string;
  telegram: string;
  teacher: string;
  parentContacts: ParentContact[];
}

export interface Teacher {
  id: string;
  name: string;
  shortName: string;
  role: string;
  initials: string;
  avatarUrl?: string;
  specialty: string;
  experience: string;
  about: string;
  email: string;
  max: string;
  telegram: string;
  phone: string;
  groups: string[];
  subjects: string[];
  location: string;
}

export interface Lesson {
  id: string;
  title: string;
  topic: string;
  start: string;
  end: string;
  group: string;
  students: string[];
  teacher: string;
  room: string;
  status: string;
  color: string;
}

export interface Notification {
  id: string;
  title: string;
  body: string;
  date: string;
  read: boolean;
  icon: string;
}

export async function api<T>(path: string, options?: RequestInit): Promise<T> {
  const response = await fetch(`/api/${path}`, options);
  return response.json() as Promise<T>;
}
