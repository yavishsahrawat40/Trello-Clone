import { useState } from "react";
import { Draggable } from "@hello-pangea/dnd";
import type { ITask } from "../types";

interface Props{
    task: ITask;
    index: number;
    columnId: string,
    onDelete: (taskId: string, colId: string) => void;
    onUpdate: (taskId: string, colId: string, content: string) => void;
}

export const TaskCard: React.FC<Props> = ({ task, index, columnId, onDelete, onUpdate }) => {
    const [isEditing, setIsEditing] = useState(false);
    const [editedContent, setEditedContent] = useState(task.content);

    const handleSave = () => {
        if (editedContent.trim() !== task.content) {
            onUpdate(task._id, columnId, editedContent);
        }
        setIsEditing(false);
    };

    return(
        <Draggable draggableId={task._id} index = {index}>
            {(provided, snapshot) => (
                <div ref={provided.innerRef}
                {...provided.draggableProps}
                {...provided.dragHandleProps}
                className="mb-3 group relative outline-none"
                >
                    <div className={`bg-white p-4 rounded-xl shadow-md border border-gray-200/50 hover:border-blue-300 hover:shadow-lg cursor-pointer card-hover ${
                        snapshot.isDragging 
                            ? "dragging shadow-2xl border-blue-400 bg-blue-50" 
                            : "hover:bg-gray-50 transition-all duration-300"
                    }`}>
                        {isEditing ? (
                            <textarea
                                className="w-full border-2 border-blue-400 rounded-lg p-3 text-sm focus:outline-none resize-none bg-white shadow-sm focus:shadow-md transition-shadow duration-200"
                                rows={3}
                                value={editedContent}
                                onChange={(e) => setEditedContent(e.target.value)}
                                onBlur={handleSave}
                                onKeyDown={(e) => {
                                    if(e.key === 'Enter' && !e.shiftKey) {
                                        e.preventDefault();
                                        handleSave();
                                    }
                                }}
                                autoFocus
                            />
                        ) : (
                            <div className="pr-8 break-words text-sm text-gray-800 leading-relaxed font-medium">
                                {task.content}
                            </div>
                        )}
                        
                        {!isEditing && (
                            <div className="absolute top-3 right-3 flex gap-1 opacity-0 group-hover:opacity-100 transition-all duration-200 bg-white/90 backdrop-blur-sm rounded-lg p-1 shadow-sm">
                                <button
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        setIsEditing(true);
                                    }}
                                    className="text-gray-400 hover:text-blue-600 hover:bg-blue-50 p-1.5 rounded-md transition-all duration-200 hover:scale-110"
                                    title="Edit Task"
                                >
                                    <svg className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 20 20">
                                        <path d="M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.38-8.379-2.83-2.828z" />
                                    </svg>
                                </button>
                                <button
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        onDelete(task._id, columnId);
                                    }}
                                    className="text-gray-400 hover:text-red-600 hover:bg-red-50 p-1.5 rounded-md transition-all duration-200 hover:scale-110"
                                    title="Delete Task"
                                >
                                    <svg className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 20 20">
                                        <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                                    </svg>
                                </button>
                            </div>
                        )}
                        
                        {/* Subtle drag indicator */}
                        <div className="absolute left-2 top-1/2 transform -translate-y-1/2 opacity-0 group-hover:opacity-30 transition-opacity duration-200">
                            <div className="flex flex-col gap-0.5">
                                <div className="w-1 h-1 bg-gray-400 rounded-full"></div>
                                <div className="w-1 h-1 bg-gray-400 rounded-full"></div>
                                <div className="w-1 h-1 bg-gray-400 rounded-full"></div>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </Draggable>
    );
};
