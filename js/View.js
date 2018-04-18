'use strict';

class View {
    constructor (model) {
        this.model = model;
        this.addTaskEvent = new Event(this);

        // document objects
        this.addTaskButton = document.getElementById("add-task-button");
        this.taskTextBox = document.getElementById("task-textbox");
        this.tasksContainer = document.getElementById("tasks-container");

        this.taskTextBox.addEventListener("keyup", (event) => {
            if (event.keyCode === 13) {
                this.addTaskButton.click();
            }
        }); 
        this.addTaskButton.addEventListener("click", () => this.notifyAddTaskEvent());

        this.model.addTaskEvent.attach(() => this.addTask());
    }

    notifyAddTaskEvent () {
        this.addTaskEvent.notify({
            task: this.taskTextBox.value
        });
    }

    addTask () {
        this.taskTextBox.value = "";
        this.buildList();
    }

    buildList () {
        let tasks = this.model.getTasks();
        let html = "";
        let tasksContainer = this.tasksContainer;

        tasksContainer.innerHTML = "";

        let index = 0;
        for (let task in tasks) {

            if (tasks[task].isCompleted) {
                html = html + "<div style='color:green;' class='form-check'>";
            } else {
                html = html + "<div class='form-check'>";
            }

            html = html + "<input type='checkbox' class='task form-check-input'>" 
                + "<label class='form-check-label'>" + tasks[task].taskName + "</label></div><br>";

            index++;
        }

        tasksContainer.innerHTML = html;
    }
}