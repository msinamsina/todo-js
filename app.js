const form = document.querySelector('#taskinputform');
const taskinput = document.querySelector('#taskinput');
const tasklist = document.querySelector('#tasklist');
const clearbtn = document.querySelector('#clearall');
const filter = document.querySelector('#filtertasks');

loadEventListeners();

function loadEventListeners() {
    form.addEventListener('submit', addTask);
    tasklist.addEventListener('click', removeTask);
    clearbtn.addEventListener('click', clearAll);
    filter.addEventListener('keyup', filterTasks);
    loadTasks();


    // set clearbtn display to none
    setClearBtnDisplay();
}

function addTask(e) {
    if (taskinput.value === '') {
        alert('Task input can\'t be empty');
    }
    else {
        const li = document.createElement('li');
        li.className = 'list-group-item d-flex justify-content-between align-items-center';
        let task = document.createElement('div');
        task.className = 'fw-bold ms-2 me-auto';
        task.appendChild(document.createTextNode(taskinput.value));
        li.appendChild(task);
        const link = document.createElement('i');
        link.className = 'fas fa-trash-alt';
        li.appendChild(link);
    
        tasklist.appendChild(li);
        saveTask(taskinput.value);
        taskinput.value = '';
    }
    setClearBtnDisplay();
    e.preventDefault();
}

function removeTask(e) {
    // console.log(e.target.parentElement.firstChild.textContent);
    if (e.target.classList.contains('fa-trash-alt')) {
        if (confirm('Are you sure you want to delete this task?')) {
            //get item to be deleted from parent childelement
            let tmp = tasklist.childElementCount;
            for(let i = 0; i < tmp; i++){
                if(e.target.parentElement === tasklist.children[i]){
                    console.log(i);
                    tasklist.children[i].remove();
                    removeFromLocalStorage(i);
                    break;
                }
            }           
        }
    }
}

function clearAll(e) {
    if (confirm('Are you sure you want to delete all tasks?')) {
        tasklist.innerHTML = '';
    }
    localStorage.clear();
    // set clearbtn display to none
    setClearBtnDisplay();
}

function setClearBtnDisplay() {
    if (tasklist.childElementCount === 0) {
        clearbtn.style.display = 'none';
        filter.parentElement.style.display = 'none';
    }
    else {
        clearbtn.style.display = '';
        filter.parentElement.style.display = '';
    }
}

function filterTasks(e) {
    const text = e.target.value.toLowerCase();
    tasklist.querySelectorAll('li').forEach(function(task) {
        const item = task.firstChild.textContent;
        if (item.toLowerCase().indexOf(text) != -1) {
            task.style.display = '';
            task.classList.add('d-flex');
        }
        else {
            task.style.display = 'none';
            task.classList.remove('d-flex');
            
        }
    });
}

function saveTask(task) {
    let tasks;

    if (localStorage.getItem('tasklist') === null) {
        tasks = [];
    }
    else {
        tasks = JSON.parse(localStorage.getItem('tasklist'));
    }

    tasks.push(task);
    localStorage.setItem('tasklist', JSON.stringify(tasks));
}

function loadTasks() {
    let tasks;

    if (localStorage.getItem('tasklist') === null) {
        tasks = [];
    }
    else {
        tasks = JSON.parse(localStorage.getItem('tasklist'));
    }

    tasks.forEach(function(taskItem) {
        const li = document.createElement('li');
        li.className = 'list-group-item d-flex justify-content-between align-items-center';
        let task = document.createElement('div');
        task.className = 'fw-bold ms-2 me-auto';
        task.appendChild(document.createTextNode(taskItem));
        li.appendChild(task);
        const link = document.createElement('i');
        link.className = 'fas fa-trash-alt';
        li.appendChild(link);
    
        tasklist.appendChild(li);
    }
    );
}

function removeFromLocalStorage(index) {
    let tasks;

    if (localStorage.getItem('tasklist') === null) {
        tasks = [];
    }
    else {
        tasks = JSON.parse(localStorage.getItem('tasklist'));
    }
    tasks.splice(index, 1);

    localStorage.setItem('tasklist', JSON.stringify(tasks));
}