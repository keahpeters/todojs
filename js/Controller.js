'use strict';

class Controller {
    constructor (model, view) {
        this.model = model;
        this.view = view;

        this.view.addTaskEvent.attach((sender, args) => this.addTask(sender, args));
    };

    addTask (sender, args) {
        this.model.addTask(args.task);
    }
}