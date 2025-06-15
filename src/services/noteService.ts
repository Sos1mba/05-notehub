import axios from "axios";
import type { Note, NoteFormData } from "../types/note";

const API_URL = "https://notehub-public.goit.study/api/notes/";
const NOTES_PER_PAGE = 12;

const token = import.meta.env.VITE_NOTEHUB_TOKEN;

interface NoteHubResponse {
  notes: Note[];
  totalPages: number;
  totalNotes?: number;
}

const getAuthHeaders = () => ({
  headers: {
    Authorization: `Bearer ${token}`,
  },
});

// ---- GET NOTES ----
export async function fetchNotes(query: string, page: number): Promise<NoteHubResponse> {
  try {
    const params = {
      page,
      perPage: NOTES_PER_PAGE,
      ...(query.trim() !== "" && { search: query.trim() }),
    };

    const response = await axios.get<NoteHubResponse>(API_URL, {
      params,
      ...getAuthHeaders(),
    });

    return response.data;
  } catch (error) {
    console.error("Failed to fetch notes:", error);
    throw new Error("Failed to fetch notes. Please try again later.");
  }
}

// ---- DELETE NOTE ----
export async function removeNote(id: number): Promise<Note> {
  try {
    const response = await axios.delete<Note>(`${API_URL}${id}`, getAuthHeaders());
    return response.data;
  } catch (error) {
    console.error("Failed to delete note:", error);
    throw new Error("Failed to delete note. Please try again later.");
  }
}

// ---- CREATE NOTE ----
export async function createNote(note: NoteFormData): Promise<Note> {
  try {
    const response = await axios.post<Note>(API_URL, note, getAuthHeaders());
    return response.data;
  } catch (error) {
    console.error("Failed to create note:", error);
    throw new Error("Failed to create note. Please try again later.");
  }
}
