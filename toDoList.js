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

//============TASKS METHODS===========//
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

//Mark task as done/undone
function done(task) {
    if (task.checked === false) {
        task.checked = true;
        console.log(`%c${task.text}`, 'text-decoration: line-through');
    }

    //Changes order - done at the end
    listOfTasks =  listOfTasks.sort((a, b) => {return a.checked - b.checked});
    
    //Saves changes in localStorage
    localStorage.setItem('tasks', JSON.stringify(listOfTasks));
    return listOfTasks;
}

function undone(task) {
    if (task.checked === true) {
        task.checked = false;
        console.log(`${task.text}`);
    }

    //Changes order - brings back task to its previous place
    listOfTasks = listOfTasks.sort((a, b) => {
        if (a.checked === false && b.checked === false) {
            return a.id - b.id;
        }
    });

    //Saves changes in localStorage
    localStorage.setItem('tasks', JSON.stringify(listOfTasks));
    return listOfTasks;
}

//Deadline date control
let checkButton = document.getElementById('check-deadlines');
checkButton.addEventListener('click', checkDeadline);

function checkDeadline() {
    listOfTasks = JSON.parse(localStorage.getItem('tasks'));
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
    alert(`You missed deadline of ${past} task(s) and should finish ${today} task(s) today.`);
    console.log(`You missed deadline of ${past} task(s) and should finish ${today} task(s) today.`);
} 

//==========SORT OPTIONS==========//
//Sort by importance
let sortImportance = document.getElementById('imp-sort');
sortImportance.onclick = function() {
    let start = {imp: 'Normal', checked: false};
    listOfTasks.unshift(start);
    listOfTasks.sort(sortImp);
    listOfTasks.splice(listOfTasks.indexOf(start), 1);
    console.log(listOfTasks);
}

function sortImp(a) {
    if (a.checked === false) {
        if (a.imp == 'Low') {
            return 1;
        } else if (a.imp == 'High') {
            return -1;
        }else {
            return 0;
        }
    }
}

//Sort by deadline
let sortDate = document.getElementById('date-sort');
sortDate.onclick = function() {
    listOfTasks.sort(sortDeadline);
    console.log(listOfTasks);
};

function sortDeadline(a, b) {
    if (a.checked === false && b.checked === false) { 
        if (a.date > b.date) {
            return 1;
        } else if (a.date < b.date) {
            return -1;}
        else {
            return 0;
        }
    } else {
        return 0;
    }
}

//Sort by id (adding time)
let sortById = document.getElementById('id-sort');
sortById.onclick = function() {
    listOfTasks.sort(sortId);
    console.log(listOfTasks);
};

function sortId(a, b) {
    if (a.checked === false && b.checked === false) { 
        if (a.id > b.id) {
            return 1;
        } else if (a.id < b.id) {
            return -1;}
        else {
            return 0;
        }
    } else {
        return 0;
    }
}

//Sort by task
let sortTask = document.getElementById('text-sort');
sortTask.onclick = function() {
    listOfTasks.sort(sortText);
    console.log(listOfTasks);
};

function sortText(a, b) {
    if (a.checked === false && b.checked === false) { 
        if (a.text > b.text) {
            return 1;
        } else if (a.text < b.text) {
            return -1;}
        else {
            return 0;
        }
    } else {
        return 0;
    }
}

//===========SEARCH FIELD==========//
let find = document.getElementById('find');
find.addEventListener('keyup', findTask);

function findTask(e) {
    let findText = e.target.value.toLowerCase();
    listOfTasks.forEach(function(n) {
        if (n.text.toLowerCase().indexOf(findText) != -1) {
            console.log(n);
        }
    })
}
