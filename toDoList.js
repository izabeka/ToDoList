//Tasks list
let listOfTasks = [];

//Submit task
let btn = document.getElementById('button');
btn.addEventListener("click", addTask);

//Stops page reload & adds task to list
function addTask(event) {
    event.preventDefault();

    let text = document.getElementById('to-do').value; 
    
    //Checking if sth was written
    if (text === '' || text.trim() === '') {
        alert('You need to write Your task');
    } else {
        
        //Create a task
        const task = {
            text,
            id: listOfTasks.length,
            checked: false
        }

        //Adds task to the list
        listOfTasks.push(task);

        //Prints the list
        console.log(listOfTasks); 

        //Makes input blank again
        document.getElementById('to-do').value = '';
    }
}

//Mark task as done/undone
function done(task) {
    if (task.checked === false) {
        task.checked = true;
        console.log(`%c${task.text}`, 'text-decoration: line-through');
    }

    listOfTasks.sort((a, b) => {return a.checked - b.checked});
}

function undone(task) {
    if (task.checked === true) {
        task.checked = false;
        console.log(`${task.text}`);
    }

    listOfTasks.sort((a, b) => {
        if (a.checked === false && b.checked === false) {
            return a.id - b.id;
        }
    });
}


