export class TodoItem {

    constructor (
        public title: string,
        public description: string,
        public priority: number,
        public dueDate: Date,
        public state: number,
        public todoList: number,
        public id?: number,
    ) {}
}