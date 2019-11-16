//Display current date
let current = new Date();
let dd = current.getDate();
let mm = current.getMonth()+1;
let yyyy = current.getFullYear();
if (dd<10) {
    dd='0'+dd;
}
if (mm<10) {
    mm = '0'+mm;
}
document.querySelector('#current-date').innerHTML = `${dd}.${mm}.${yyyy}`;

//Tasks list
let listOfTasks = JSON.parse(localStorage.getItem('tasks')) || [];

//Submit task
let form = document.querySelector('.add-task');  
form.addEventListener('submit', addTask);

//Stops page reload & adds task to list
function addTask(event) {
    event.preventDefault();

    let text = document.getElementById('to-do').value; 
    let date = document.getElementById('deadline').value;
    let imp = document.getElementById('importance').value;
    
    //Checking if sth was written
    if (text === '' || text.trim() === '') {
        alert('You need to write down Your task');
    } else if (Date.parse(date) < Date.parse(`${yyyy}-${mm}-${dd}`)) {
        alert('Your deadline is in past!');
    } else {
        
        //Creates a task
        const task = {
            text,
            date,
            imp,
            id: listOfTasks.length,
            checked: false
        }

        //Adds task to the list
        listOfTasks.push(task);

        //Prints the list
        console.log(listOfTasks); 

        //Makes input blank again
        document.getElementById('to-do').value = '';
        document.getElementById('deadline').value = '';
        document.getElementById('importance').value = 'Normal';

        //Saving values in local storage
        localStorage.setItem('tasks', JSON.stringify(listOfTasks));
    }
}

//Mark task as done/undone  ---After refresh desapires!!!!!!
function done(task) {
    if (task.checked === false) {
        task.checked = true;
        console.log(`%c${task.text}`, 'text-decoration: line-through');
    }

    return listOfTasks.sort((a, b) => {return a.checked - b.checked});
}

function undone(task) {
    if (task.checked === true) {
        task.checked = false;
        console.log(`${task.text}`);
    }

    return listOfTasks.sort((a, b) => {
        if (a.checked === false && b.checked === false) {
            return a.id - b.id;
        }
    });
}

//Sort by importance
function sortImp(a) {
    if (a.checked === false) {
        if (a.imp == 'Low') {
            return 1;
        } else if (a.imp == 'High') {
            return -1;
        } else {
            return 0;
        }
    }
}

//Sort by deadline
function sortDeadline(a, b) {
    if (a.checked === false && b.checked === false) { 
        if (a.date === '' || b.date === '') {
            return -1;
        } else
        if (a.date > b.date) {
            return 1;
        } else if (a.date < b.date) {
            return -1;
        } else {
            return 0;
        }
    } else {
        return 0;
    }
}

//Deadline date control
function checkDeadline(listOfTasks) {
    let past = 0;
    let today = 0;
    listOfTasks.forEach(function(n) {
        if (n.date === '') {
        } else if (n.date < `${yyyy}-${mm}-${dd}`) {
            alert(`You should have finished ${n.text} by now!`);
            past++;
        } else if (n.date === `${yyyy}-${mm}-${dd}`) {
            alert(`You should finish ${n.text} today!`);
            today++;
        }
    });
    return `You missed deadline of ${past} task(s) and should finish ${today} task(s) today.`
} 


//Search

//Deleting task

