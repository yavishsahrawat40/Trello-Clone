export interface ITask {
    _id: string;
    content: string;
}

export interface IColumn{
    _id: string;
    title: string;
    taskIds: ITask[];
}

export interface IBoardData {
    columns: { [key: string]: IColumn };
    columnOrder: string[];
}