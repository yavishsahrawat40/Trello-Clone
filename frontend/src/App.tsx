
import { DragDropContext } from "@hello-pangea/dnd";
import { useBoard } from "./hooks/useBoard";
import { Column } from "./components/Column";

function App(){
    const { boardData, loading, onDragEnd, addTask, deleteTask, addColumn, deleteColumn, updateColumn, updateTask} = useBoard();

    if (loading || !boardData) {
        return (
            <div className="h-screen flex items-center justify-center">
                <div className="text-center">
                    <div className="relative">
                        <div className="w-16 h-16 border-4 border-white/30 border-t-white rounded-full animate-spin mx-auto mb-4"></div>
                        <div className="absolute inset-0 w-16 h-16 border-4 border-transparent border-t-blue-300 rounded-full animate-spin mx-auto" style={{animationDirection: 'reverse', animationDuration: '1.5s'}}></div>
                    </div>
                    <h2 className="text-white text-xl font-semibold mb-2">Loading Board...</h2>
                    <p className="text-white/70 text-sm">Setting up your workspace</p>
                </div>
            </div>
        );
    }

    return (
        <div className="h-screen flex flex-col">
            {/* Enhanced Glassmorphism Header */}
            <header className="glass-dark p-4 shadow-2xl border-b border-white/10 flex items-center justify-between px-6 relative overflow-hidden">
                {/* Header background glow */}
                <div className="absolute inset-0 bg-gradient-to-r from-blue-500/10 via-transparent to-purple-500/10"></div>
                
                <div className="flex items-center gap-4 relative z-10">
                    <div className="w-10 h-10 bg-gradient-to-br from-blue-400 to-blue-600 rounded-lg flex items-center justify-center text-white font-bold shadow-xl transform hover:scale-110 transition-transform duration-200 border border-white/20">
                        <span className="text-lg">T</span>
                    </div>
                    <h1 className="text-white font-bold text-2xl tracking-tight drop-shadow-lg">
                        Trello Clone
                    </h1>
                    <div className="hidden md:flex items-center gap-2 ml-4">
                        <div className="px-3 py-1 bg-white/10 rounded-full text-white/80 text-sm font-medium border border-white/20">
                            Personal Workspace
                        </div>
                    </div>
                </div>
                
                <div className="flex items-center gap-4 relative z-10">
                    <button className="px-4 py-2 bg-white/10 hover:bg-white/20 text-white rounded-lg transition-all duration-200 border border-white/20 text-sm font-medium">
                        Share
                    </button>
                    <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-purple-500 to-pink-500 border-2 border-white/30 shadow-lg hover:scale-110 transition-transform duration-200 cursor-pointer"></div>
                </div>
            </header>

            {/* Board Area */}
            <main className="flex-1 overflow-x-auto overflow-y-hidden p-6"> 
                <DragDropContext onDragEnd={onDragEnd}>
                    <div className="flex gap-6 h-full items-start"> 
                        {boardData.columnOrder.map((colId) => {
                            const column = boardData.columns[colId];
                            return (
                                <Column 
                                key = {column._id}
                                id = {column._id}
                                title = {column.title}
                                taskIds = {column.taskIds}
                                onAddTask={addTask}
                                onDeleteTask={deleteTask}
                                onDeleteColumn={deleteColumn}
                                onUpdateColumn={updateColumn}
                                onUpdateTask={updateTask}
                                />
                            );
                        })}
                        
                        {/* Enhanced Add Column Button */}
                        <button
                            onClick={() => {
                                const title = window.prompt("Enter column title:");
                                if (title) addColumn(title);
                            }}
                            className="min-w-[280px] h-fit p-6 rounded-xl glass text-white hover:bg-white/30 transition-all duration-300 text-left font-semibold shadow-xl border border-white/20 flex items-center gap-3 group hover:scale-105 hover:shadow-2xl"
                        >
                            <div className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center group-hover:bg-white/30 transition-colors duration-200">
                                <span className="text-xl group-hover:scale-110 transition-transform duration-200">+</span>
                            </div>
                            <span className="text-base">Add another list</span>
                        </button>
                    </div>
                </DragDropContext>
            </main>
        </div>
    );
};

export default App;
