import React, {useState} from "react";
import { Droppable } from "@hello-pangea/dnd";
import { TaskCard } from "./TaskCard";
import { AddCardForm } from "./AddCardForm";
import type { ITask } from "../types";

interface Props{
    id: string;
    title: string;
    items: ITask[];
    onAddTask: (colId: string, content: string) => void;
}

export const Column: React.FC<Props> = ({ id, title, items, onAddTask }) => {
    const [isAdding, setIsAdding] = useState(false);
    const handleAdd = (colId: string, content: string) => {
        onAddTask(colId, content);
        setIsAdding(false);
    };

    return(
        <div className="bg-gray-100 p-3 rounded-lg w-72 shrink-0 flex flex-col max-h-full">
            <h2 className="font-semibold text-gray-700 mb-3 px-1">{title}</h2>
            <Droppable droppableId={id}>
                {(provided) => (
                    <div
                    {...provided.droppableProps}
                    ref={provided.innerRef}
                    className="flex-1 overflow-y-auto min-h-[20px]"
                    >
                        {items.map((task,index) => (
                            <TaskCard key={task._id} task={task} index={index} />
                        ))}
                        {provided.placeholder}
                    </div>
                )}
            </Droppable>

            {isAdding ? (
                <AddCardForm 
                columnId={id}
                onAdd={handleAdd}
                onCancel={() => setIsAdding(false)} />
            ) : (
                <button
                onClick={() => setIsAdding(true)}
                className="text-gray-500 hover:bg-gray-200 p-2 rounded text-left text-sm mt-2 flex items-center"
            >
                <span className="text-lg mr-1">+</span> Add a Card
                </button>
            )}
        </div>
    );
};

