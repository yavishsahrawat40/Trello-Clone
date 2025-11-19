import { useState, useEffect } from "react";
import type { DropResult } from "@hello-pangea/dnd";
import { boardApi } from "../services/api";
import type { IBoardData, IColumn, ITask } from "../types";

export const useBoard = () => {
    const [boardData, setBoardData] = useState<IBoardData | null>(null);
    const [loading, setLoading] = useState(true);

    const fetchBoard = async () => {
        try{
            const rawData = await boardApi.getBoard();
            const formattedColumns: { [key: string]: IColumn } = {};
            const formattedOrder: string[] = [];

            rawData.forEach((col) => {
                formattedColumns[col._id] = {
                    _id: col._id,
                    title: col.title,
                    taskIds: col.taskIds,
                };
                formattedOrder.push(col._id);
            });
            setBoardData({ columns: formattedColumns, columnOrder: formattedOrder });
        }
        catch (err){
            console.error("Error fetching board:", err);
        }
        finally{
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchBoard();
    }, []);

    const onDragEnd = async (result: DropResult) => {
        const { destination, source } = result;

        if(!destination || !boardData) return;
        if(destination.droppableId === source.droppableId && destination.index === source.index) return;

        const startCol = boardData.columns[source.droppableId];
        const finishCol = boardData.columns[destination.droppableId];

        if(startCol === finishCol){
            const newTaskIds = Array.from(startCol.taskIds);
            const [movedTask] = newTaskIds.splice(source.index, 1);
            newTaskIds.splice(destination.index, 0, movedTask);

            const newColumn = { ...startCol, taskIds: newTaskIds };

            setBoardData({
                ...boardData,
                columns: { ...boardData.columns, [newColumn._id]: newColumn},
            });

            await boardApi.reorderColumn(newColumn._id, newTaskIds.map((task: ITask) => task._id));
        }
    };

    const addTask = async (columnId: string, content: string) => {
        await boardApi.createTask(content, columnId);
        await fetchBoard();
    };
    return { boardData, loading, onDragEnd, addTask };
};