import { useState } from "react";

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
        <div className="mt-2 p-3 bg-white rounded-xl shadow-lg border border-gray-200">
            <textarea 
                autoFocus 
                className="w-full p-3 border-2 border-gray-200 rounded-lg mb-3 text-sm resize-none focus:outline-none focus:border-blue-400 focus:shadow-md transition-all duration-200 bg-white" 
                placeholder="Enter a title for this card..." 
                rows={3}
                value={content} 
                onChange={(e) => setContent(e.target.value)}
                onKeyDown={(e) => {
                    if(e.key === "Enter" && !e.shiftKey) {
                        e.preventDefault();
                        handleSubmit();
                    }
                }}
            /> 
            <div className="flex items-center gap-2">
                 <button
                 onClick={handleSubmit}
                 className="btn-primary text-white px-4 py-2 rounded-lg text-sm font-medium shadow-md hover:shadow-lg transition-all duration-200 flex items-center gap-2"
                 >
                    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z" clipRule="evenodd" />
                    </svg>
                    Add Card
                 </button>
                 <button
                 onClick={onCancel}
                 className="text-gray-500 hover:text-gray-700 hover:bg-gray-100 p-2 rounded-lg transition-all duration-200"
                 >
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                    </svg>
                 </button>
            </div>
        </div>
    );
};
