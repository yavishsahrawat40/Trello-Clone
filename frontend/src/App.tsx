import React, { useState } from "react";
import { DragDropContext, Droppable, Draggable } from "@hello-pangea/dnd";
import type { DropResult } from "@hello-pangea/dnd";

// Mock Data for testing UI
const initialData = {
  columns: {
    "col-1": {
      id: "col-1",
      title: "To Do",
      items: [
        { id: "task-1", content: "Setup MongoDB" },
        { id: "task-2", content: "Build React UI" },
        { id: "task-3", content: "Submit Assignment" },
      ],
    },
  },
  columnOrder: ["col-1"],
};

function App() {
  const [boardData, setBoardData] = useState(initialData);

  const onDragEnd = (result: DropResult) => {
    const { destination, source } = result;

    // 1. Dropped outside
    if (!destination) return;

    // 2. Dropped in same spot
    if (
      destination.droppableId === source.droppableId &&
      destination.index === source.index
    ) {
      return;
    }

    // 3. Reordering Logic (Simple Array Move)
    const column = boardData.columns[source.droppableId as keyof typeof boardData.columns];
    const newItems = Array.from(column.items);
    
    // Remove from old index
    const [removed] = newItems.splice(source.index, 1);
    // Insert at new index
    newItems.splice(destination.index, 0, removed);

    const newColumn = { ...column, items: newItems };

    setBoardData({
      ...boardData,
      columns: {
        ...boardData.columns,
        [newColumn.id]: newColumn,
      },
    });
  };

  return (
    <div className="p-10 flex flex-col h-screen text-white">
      <h1 className="text-3xl font-bold mb-8">My Trello Board</h1>
      
      <DragDropContext onDragEnd={onDragEnd}>
        <div className="flex gap-4">
          {boardData.columnOrder.map((colId) => {
            const column = boardData.columns[colId as keyof typeof boardData.columns];
            
            return (
              <div key={column.id} className="bg-gray-100 p-4 rounded w-80 text-black">
                <h2 className="font-bold mb-4 text-lg">{column.title}</h2>
                
                <Droppable droppableId={column.id}>
                  {(provided) => (
                    <div
                      {...provided.droppableProps}
                      ref={provided.innerRef}
                      className="flex flex-col gap-2 min-h-[100px]"
                    >
                      {column.items.map((item, index) => (
                        <Draggable key={item.id} draggableId={item.id} index={index}>
                          {(provided) => (
                            <div
                              ref={provided.innerRef}
                              {...provided.draggableProps}
                              {...provided.dragHandleProps}
                              className="bg-white p-3 rounded shadow hover:bg-gray-50"
                            >
                              {item.content}
                            </div>
                          )}
                        </Draggable>
                      ))}
                      {provided.placeholder}
                    </div>
                  )}
                </Droppable>
              </div>
            );
          })}
        </div>
      </DragDropContext>
    </div>
  );
}

export default App;