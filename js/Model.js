'use strict';

class Model {
    constructor() {
        this.tasks = [];

        this.addTaskEvent = new Event(this);
    }

    addTask (task) {
        this.tasks.push({
            taskName: task,
            isCompleted: false
        });

        this.addTaskEvent.notify();
    }

    getTasks () {
        return this.tasks;
    }
}