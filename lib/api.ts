import axios, {
  type AxiosResponse,
  type InternalAxiosRequestConfig,
} from "axios";
import type { Note } from "@/types/note";

const instance = axios.create({
  baseURL: "https://notehub-public.goit.study/api",
});

// 🔥 interceptor (чистий і безпечний)
instance.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    const token = process.env.NEXT_PUBLIC_NOTEHUB_TOKEN;

    if (!token) {
      console.warn("No API token provided");
      return config;
    }

    config.headers.Authorization = `Bearer ${token}`;
    return config;
  }
);

// 📌 тип відповіді
export interface FetchNotesResponse {
  notes: Note[];
  totalPages: number;
}

// 📌 GET notes
export const fetchNotes = async (
  page: number,
  search: string
): Promise<FetchNotesResponse> => {
  const response: AxiosResponse<FetchNotesResponse> =
    await instance.get("/notes", {
      params: {
        page,
        perPage: 12,
        search,
      },
    });

  return response.data;
};

// 📌 GET note by id
export const fetchNoteById = async (id: string): Promise<Note> => {
  const response: AxiosResponse<Note> = await instance.get(
    `/notes/${id}`
  );

  return response.data;
};

// 📌 POST note
export const createNote = async (
  note: Omit<Note, "id" | "createdAt" | "updatedAt">
): Promise<Note> => {
  const response: AxiosResponse<Note> = await instance.post(
    "/notes",
    note
  );

  return response.data;
};

// 📌 DELETE note
export const deleteNote = async (id: string): Promise<Note> => {
  const response: AxiosResponse<Note> = await instance.delete(
    `/notes/${id}`
  );

  return response.data;
};