import axios from 'axios';
import type { Note } from '../types/note';

const token = import.meta.env.VITE_NOTEHUB_TOKEN;
const api = axios.create({
  baseURL: 'https://notehub-public.goit.study/api',
  headers: { Authorization: `Bearer ${token}` },
});

export interface FetchNotesParams {
  page: number;
  search?: string;
  perPage?: number;
}

export interface FetchNotesResponse {
  results: Note[];
  totalPages: number;
}

export const fetchNotes = async ({ page, search = '', perPage = 12 }: FetchNotesParams): Promise<FetchNotesResponse> => {
  const { data } = await api.get(`/notes`, {
    params: { page, perPage, search },
  });
  return data;
};

export const createNote = async (note: Omit<Note, 'id'>): Promise<Note> => {
  const { data } = await api.post(`/notes`, note);
  return data;
};

export const deleteNote = async (id: string): Promise<Note> => {
  const { data } = await api.delete(`/notes/${id}`);
  return data;
};
