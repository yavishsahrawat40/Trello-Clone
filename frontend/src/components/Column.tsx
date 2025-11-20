import {useState} from "react";
import { Droppable } from "@hello-pangea/dnd";
import { TaskCard } from "./TaskCard";
import { AddCardForm } from "./AddCardForm";
import type { ITask } from "../types";

interface Props{
    id: string;
    title: string;
    taskIds: ITask[];
    onAddTask: (colId: string, content: string) => void;
    onDeleteTask: (taskId: string, colId: string) => void;
    onDeleteColumn: (colId: string) => void;
    onUpdateColumn: (colId: string, title: string) => void;
    onUpdateTask: (taskId: string, colId: string, content: string) => void;
}

export const Column: React.FC<Props> = ({ id, title, taskIds, onAddTask, onDeleteTask, onDeleteColumn, onUpdateColumn, onUpdateTask }) => {
    const [isAdding, setIsAdding] = useState(false);
    const [isEditing, setIsEditing] = useState(false);
    const [editedTitle, setEditedTitle] = useState(title);

    const handleAdd = (colId: string, content: string) => {
        onAddTask(colId, content);
        setIsAdding(false);
    };

    const handleRename = () => {
        if (editedTitle.trim() !== title) {
            onUpdateColumn(id, editedTitle);
        }
        setIsEditing(false);
    };

    return(
        <div className="bg-[#ebecf0] p-4 rounded-xl w-72 shrink-0 flex flex-col max-h-full group/column shadow-xl border border-gray-200/50 hover:shadow-2xl transition-all duration-300 card-hover">
            {/* Column Header with enhanced styling */}
            <div className="flex justify-between items-center mb-4 px-1">
                {isEditing ? (
                    <input 
                        className="font-semibold text-gray-700 border-2 border-blue-500 rounded-lg px-3 py-2 w-full bg-white focus:outline-none shadow-sm text-sm"
                        value={editedTitle}
                        onChange={(e) => setEditedTitle(e.target.value)}
                        onBlur={handleRename}
                        onKeyDown={(e) => e.key === 'Enter' && handleRename()}
                        autoFocus
                    />
                ) : (
                    <h2 
                        className="font-bold text-gray-700 cursor-pointer text-sm uppercase tracking-wide px-3 py-2 hover:bg-gray-200/70 rounded-lg transition-all duration-200 flex-1 truncate hover:shadow-sm"
                        onClick={() => setIsEditing(true)}
                    >
                        {title}
                    </h2>
                )}
                <button 
                    onClick={() => {
                        if(window.confirm("Delete this column?")) onDeleteColumn(id);
                    }}
                    className="text-gray-400 hover:text-red-600 hover:bg-red-50 p-2 rounded-lg opacity-0 group-hover/column:opacity-100 transition-all duration-200 ml-2 hover:scale-110"
                >
                    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z" clipRule="evenodd" />
                    </svg>
                </button>
            </div>

            <Droppable droppableId={id}>
                {(provided) => (
                    <div
                    {...provided.droppableProps}
                    ref={provided.innerRef}
                    className="flex-1 overflow-y-auto min-h-[20px]"
                    >
                        {taskIds.map((task,index) => (
                            <TaskCard 
                                key={task._id} 
                                task={task} 
                                index={index} 
                                columnId={id} 
                                onDelete={onDeleteTask}
                                onUpdate={onUpdateTask}
                            />
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
                className="text-gray-600 hover:bg-gray-200/70 hover:text-gray-800 p-3 rounded-lg text-left text-sm mt-2 flex items-center transition-all duration-200 group/add border-2 border-dashed border-gray-300 hover:border-gray-400 hover:shadow-sm"
            >
                <div className="w-6 h-6 rounded-full bg-gray-300 group-hover/add:bg-gray-400 flex items-center justify-center mr-3 transition-colors duration-200">
                    <span className="text-sm font-medium text-white">+</span>
                </div>
                <span className="font-medium">Add a card</span>
                </button>
            )}
        </div>
    );
};

