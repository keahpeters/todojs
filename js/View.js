class View {
    constructor (model) {
        this.model = model;
        this.addTaskEvent = new Event(this);
        this.completeTaskEvent = new Event(this);
        this.uncompleteTaskEvent = new Event(this);

        // document objects
        this.addTaskButton = document.getElementById("add-task-button");
        this.taskTextBox = document.getElementById("task-textbox");
        this.tasksContainer = document.getElementById("tasks-container");
        this.toggleShowCompletedButton = document.getElementById("toggle-show-completed-button");

        this.taskTextBox.addEventListener("keyup", (event) => {
            if (event.keyCode === 13) {
                this.addTaskButton.click();
            }
        }); 
        this.addTaskButton.addEventListener("click", () => this.notifyAddTaskEvent());
        this.toggleShowCompletedButton.addEventListener("click", () => this.toggleShowCompleted())

        this.model.addTaskEvent.attach(() => this.addTask());
        this.model.taskStateChangedEvent.attach(() => this.buildList());

        this.showCompleted = true;
    }

    notifyAddTaskEvent () {
        this.addTaskEvent.notify({
            task: this.taskTextBox.value
        });
    }

    notifyCompleteTaskEvent (taskId) {
        this.completeTaskEvent.notify({
            taskId: taskId
        });
    }

    notifyUncompleteTaskEvent (taskId) {
        this.uncompleteTaskEvent.notify({
            taskId: taskId
        });
    }

    addTask () {
        this.taskTextBox.value = "";
        this.buildList();
    }

    buildList () {
        let tasks = this.model.getTasks();
        let html = "";

        this.tasksContainer.innerHTML = "";

        tasks.forEach(task => {
            if (task.isCompleted && !this.showCompleted) {
                return;
            }

            html = html + "<div class='form-check'>";

            html = html + `<input type='checkbox' class='task form-check-input' data-taskid='${task.id}' ${task.isCompleted ? "checked" : ""}>`
                + `<label class='form-check-label'>${task.isCompleted ? "<del>" : ""}${task.taskName}${task.isCompleted ? "</del>" : ""}</label></div><br>`;
        });

        this.tasksContainer.innerHTML = html;
        this.addTaskEventListeners();
    }

    addTaskEventListeners () {
        let taskCheckBoxes = document.getElementsByClassName("task");

        Array.from(taskCheckBoxes).forEach(element => {
            let taskId = element.getAttribute("data-taskid")
            element.addEventListener("change", () => { 
                if (element.checked) {
                    this.notifyCompleteTaskEvent(taskId)
                }
                else {
                    this.notifyUncompleteTaskEvent(taskId)
                }
            });
        }); 
    }

    toggleShowCompleted () {
        this.showCompleted = !this.showCompleted;
        this.buildList();
        this.toggleShowCompletedButton.value = this.showCompleted ? "Hide Completed" : "ShowCompleted";
    }
}