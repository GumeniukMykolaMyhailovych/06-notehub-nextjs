import axios, { type AxiosResponse } from "axios";
import type { Note } from "@/types/note";

const instance = axios.create({
  baseURL: "https://notehub-public.goit.study/api",
});

const token = process.env.NEXT_PUBLIC_API_TOKEN;

const getHeaders = () =>
  token ? { Authorization: `Bearer ${token}` } : {};

export interface FetchNotesResponse {
  notes: Note[];
  totalPages: number;
}

export const fetchNotes = async (
  page: number,
  search: string
): Promise<FetchNotesResponse> => {
  const response: AxiosResponse<FetchNotesResponse> =
    await instance.get("/notes", {
      params: {
        page,
        perPage: 12,
        search: search || undefined,
      },
      headers: getHeaders(),
    });

  return response.data;
};

export const fetchNoteById = async (id: string): Promise<Note> => {
  const response: AxiosResponse<Note> = await instance.get(
    `/notes/${id}`,
    {
      headers: getHeaders(),
    }
  );

  return response.data;
};

export const createNote = async (
  note: Omit<Note, "id" | "createdAt" | "updatedAt">
): Promise<Note> => {
  const response: AxiosResponse<Note> = await instance.post(
    "/notes",
    note,
    {
      headers: getHeaders(),
    }
  );

  return response.data;
};

export const deleteNote = async (id: string): Promise<Note> => {
  const response: AxiosResponse<Note> = await instance.delete(
    `/notes/${id}`,
    {
      headers: getHeaders(),
    }
  );

  return response.data;
};