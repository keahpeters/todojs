class Controller {
    constructor (model, view) {
        this.model = model;
        this.view = view;

        this.view.addTaskEvent.attach((sender, args) => this.addTask(sender, args));
        this.view.completeTaskEvent.attach((sender, args) => this.completeTask(sender, args));
        this.view.uncompleteTaskEvent.attach((sender, args) => this.uncompleteTask(sender, args));
    };

    addTask (sender, args) {
        this.model.addTask(args.task);
    }

    completeTask (sender, args) {
        this.model.completeTask(args.taskId);
    }

    uncompleteTask (sender, args) {
        this.model.uncompleteTask(args.taskId);
    }
}