import axios from "axios";
import type { IColumn, ITask } from "../types";

const API_URL = "http://localhost:5000/api/board";

export const boardApi = {
    getBoard: async () => {
        const res = await axios.get<IColumn[]>(API_URL);
        return res.data;
    },

    createTask: async (content: string, columnId: string) => {
        const res = await axios.post<ITask>(`${API_URL}/task`, {content, columnId});
        return res.data;
    },

    reorderColumn: async (columnId: string, taskIds: string[]) => {
        await axios.put(`${API_URL}/reorder`, {columnId,taskIds});
    },

    moveTask: async (data: any) => {

    }
};