class Model {
    constructor() {
        this.tasks = [];

        this.addTaskEvent = new Event(this);
        this.taskStateChangedEvent = new Event(this);
    }

    addTask (task) {
        this.tasks.push({
            id: new Date().valueOf(),
            taskName: task,
            isCompleted: false
        });

        this.addTaskEvent.notify();
    }

    getTasks () {
        return this.tasks;
    }

    completeTask (id){
        let task = this.tasks.find(task => task.id == id)
        task.isCompleted = true;

        this.taskStateChangedEvent.notify();
    }

    uncompleteTask (id){
        let task = this.tasks.find(task => task.id == id)
        task.isCompleted = false;

        this.taskStateChangedEvent.notify();
    }
}