import { useState, useEffect } from "react";
import type { DropResult } from "@hello-pangea/dnd";
import { boardApi } from "../services/api";
import type { IBoardData, IColumn, ITask } from "../types";

export const useBoard = () => {
  const [boardData, setBoardData] = useState<IBoardData | null>(null);
  const [loading, setLoading] = useState(true);

  const fetchBoard = async () => {
    try {
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
    } catch (err) {
      console.error("Error fetching board:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBoard();
  }, []);

  const onDragEnd = async (result: DropResult) => {
    const { destination, source, draggableId } = result;

    if (!destination || !boardData) return;
    if (
      destination.droppableId === source.droppableId &&
      destination.index === source.index
    )
      return;

    const startCol = boardData.columns[source.droppableId];
    const finishCol = boardData.columns[destination.droppableId];

    // SCENARIO 1: Moving within the SAME column
    if (startCol === finishCol) {
      const newTaskIds = Array.from(startCol.taskIds);
      const [movedTask] = newTaskIds.splice(source.index, 1);
      newTaskIds.splice(destination.index, 0, movedTask);

      const newColumn = { ...startCol, taskIds: newTaskIds };

      setBoardData({
        ...boardData,
        columns: { ...boardData.columns, [newColumn._id]: newColumn },
      });

      await boardApi.reorderColumn(
        newColumn._id,
        newTaskIds.map((task: ITask) => task._id)
      );
      return;
    }

    // SCENARIO 2: Moving to a DIFFERENT column (Cross-Column)
    const startTaskIds = Array.from(startCol.taskIds);
    const [movedTask] = startTaskIds.splice(source.index, 1); // Remove from start
    const newStartCol = { ...startCol, taskIds: startTaskIds };

    const finishTaskIds = Array.from(finishCol.taskIds);
    finishTaskIds.splice(destination.index, 0, movedTask); // Add to destination
    const newFinishCol = { ...finishCol, taskIds: finishTaskIds };

    // Optimistic UI Update
    setBoardData({
      ...boardData,
      columns: {
        ...boardData.columns,
        [newStartCol._id]: newStartCol,
        [newFinishCol._id]: newFinishCol,
      },
    });

    // API Call
    await boardApi.moveTask(
      startCol._id,
      finishCol._id,
      draggableId,
      destination.index
    );
  };

  const addTask = async (columnId: string, content: string) => {
    await boardApi.createTask(content, columnId);
    await fetchBoard();
  };

  // NEW: Delete Logic
  const deleteTask = async (taskId: string, columnId: string) => {
    if (!boardData) return;

    const column = boardData.columns[columnId];
    // Optimistically remove the task from the UI list
    const newTaskIds = column.taskIds.filter((item) => item._id !== taskId);
    const newColumn = { ...column, taskIds: newTaskIds };

    setBoardData({
      ...boardData,
      columns: { ...boardData.columns, [columnId]: newColumn },
    });

    // Call API to delete from DB
    await boardApi.deleteTask(taskId, columnId);
  };

  const addColumn = async (title: string) => {
    await boardApi.createColumn(title);
    await fetchBoard();
  };

  const deleteColumn = async (columnId: string) => {
    if (!boardData) return;
    const newColumns = { ...boardData.columns };
    delete newColumns[columnId];
    const newOrder = boardData.columnOrder.filter((id) => id !== columnId);
    
    setBoardData({
        ...boardData,
        columns: newColumns,
        columnOrder: newOrder
    });

    await boardApi.deleteColumn(columnId);
  };

  const updateColumn = async (columnId: string, title: string) => {
    if (!boardData) return;
    const newColumn = { ...boardData.columns[columnId], title };
    setBoardData({
        ...boardData,
        columns: { ...boardData.columns, [columnId]: newColumn }
    });
    await boardApi.updateColumn(columnId, title);
  };

  const updateTask = async (taskId: string, columnId: string, content: string) => {
    if (!boardData) return;
    const column = boardData.columns[columnId];
    const newTaskIds = column.taskIds.map(item => item._id === taskId ? { ...item, content } : item);
    const newColumn = { ...column, taskIds: newTaskIds };
    
    setBoardData({
        ...boardData,
        columns: { ...boardData.columns, [columnId]: newColumn }
    });
    await boardApi.updateTask(taskId, content);
  };

  return { boardData, loading, onDragEnd, addTask, deleteTask, addColumn, deleteColumn, updateColumn, updateTask };
};