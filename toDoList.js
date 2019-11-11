//Methods and classes

class Task {
    constructor(toDo, deadline, importance=normal) {
        this.toDo;
        this.deadline;
        this.importance;
    }

    done() {
        return task.style.strike();
    }

    undone() {
        return task.style.normal();
    }
}


//Working to-do list

let list = []

list.append(new Task('cleaning', '20/12/2019', 'high'));

