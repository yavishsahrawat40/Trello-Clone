import React, { useState } from "react";

interface Props{
    columnId: string;
    onAdd: (colId: string, content: string) => void;
    onCancel: () => void;
}

export const AddCardForm: React.FC<Props> = ({ columnId, onAdd, onCancel }) => {
    const [content, setContent] = useState("");

    const handleSubmit = () => {
        if(!content.trim()) return;
        onAdd(columnId, content);
        setContent("");
    };

    return (
        <div className="mt-2">
            <input autoFocus 
            className="w-full p-2 border rounded mb-2 text-sm" placeholder="Enter a title.." 
            value={content} 
            onChange={(e) => setContent(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleSubmit()}
            /> 
            <div className="flex items-center gap-2">
                 <button
                 onClick={handleSubmit}
                 className="bg-blue-600 text-white px-3 py-1.5 rounded text-sm font-medium hover:bg-blue-700"
                 >
                    Add Card
                 </button>
                 <button
                 onCanPlay={onCancel}
                 className="text-gray-500 hover:text-gray-700 text-xl leading-none"
                 >
                    &times;
                 </button>
            </div>
        </div>
    );
};
