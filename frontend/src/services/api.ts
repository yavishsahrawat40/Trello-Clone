import axios from "axios";
import type { APIColumn, ITask } from "../types";

const API_URL = "http://localhost:5000/api/board";

export const boardApi = {
    getBoard: async () => {
        const res = await axios.get<APIColumn[]>(API_URL);
        return res.data;
    },

    createTask: async (content: string, columnId: string) => {
        const res = await axios.post<ITask>(`${API_URL}/task`, {content, columnId});
        return res.data;
    },

    createColumn: async (title: string) => {
        const res = await axios.post<APIColumn>(`${API_URL}/column`, { title });
        return res.data;
    },

    reorderColumn: async (columnId: string, taskIds: string[]) => {
        await axios.put(`${API_URL}/reorder`, {columnId,taskIds});
    },

    moveTask: async (startColId: string, endColId: string, taskId: string, destIndex: number) => {
        await axios.put(`${API_URL}/task/move`, { startColId, endColId, taskId, destIndex});
    },

    deleteTask: async (taskId: string, columnId: string) => {
        await axios.delete(`${API_URL}/task/${taskId}`, {data: { columnId }});
    },

    deleteColumn: async (columnId: string) => {
        await axios.delete(`${API_URL}/column/${columnId}`);
    },

    updateColumn: async (columnId: string, title: string) => {
        await axios.put(`${API_URL}/column/${columnId}`, { title });
    },

    updateTask: async (taskId: string, content: string) => {
        await axios.put(`${API_URL}/task/${taskId}`, { content });
    },
};