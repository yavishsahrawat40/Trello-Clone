import React from "react";
import { Draggable } from "@hello-pangea/dnd";
import type { ITask } from "../types";

interface Props{
    task: ITask;
    index: number;
}

export const TaskCard: React.FC<Props> = ({ task, index }) => {
    return(
        <Draggable draggableId={task._id} index = {index}>
            {(provided) => (
                <div ref={provided.innerRef}
                {...provided.draggableProps}
                {...provided.dragHandleProps}
                className="bg-white p-3 rounded shadow-sm border border-gray-200 hover:border-blue-400 transition-colors mb-2"
                >
                    {task.content}
                </div>
            )}
        </Draggable>
    );
};
