//Definir constantes y variables

const date = document.querySelector('#date');
const tasks = document.querySelector('#tasks');
const task = document.querySelector('#task');
const input = document.querySelector('#input');
const addButton = document.querySelector('#addButton');
const check = 'bi-record-circle';
const mark = 'mark';
const uncheck = 'bi-circle';

let LIST;
let id;

const DATE = new Date();
date.innerHTML = DATE.toLocaleDateString('es-MX', {
    weekday: 'long',
    month: 'short',
    day: 'numeric',
});

function addTask(task,id,done,remove){
    if(remove){
        return
    }
    const realized = done ? check : uncheck;
    const LINE = done ? mark : '';
    const task = `<li id="task" class="task">
                    <i id="${id}" data="done" class="bi ${realized}"></i>
                    <p class="complete-task text ${LINE}">${task}</p>
                    <i id="${id}" data="remove" class="bi bi-trash3"></i>
                </li>`
                tasks.insertAdjacentHTML("beforeend", taskHTML);
};

function completeTask(element){
    element.classList.toggle(check);
    element.classList.toggle(uncheck);
    element.parentNode.querySelector('.text').classList.toggle(mark);
    LIST[element.id].realized = LIST[element.id].realized ?false :true;
};

function deleteTask(element){
    element.parentNode.parentNode.removeChild(element.parentNode);
    LIST[element.id].remove = true;
};

addButton.addEventListener("click", () => {
    const task = input.value;
    if(task){
        addTask(task, id, false, false)
        LIST.push({
            name: task,
            id: id,
            done: false,
            remove: false,
        });
        localStorage.setItem("TODO", JSON.stringify(LIST));
        id++
        input.value = "";
    }
});

tasks.addEventListener("click", function (event){
    const element = event.target;
    const elementData = element.attributes.data.value;
    if(elementData == "done"){
        completeTask(element);

    }else if(elementData == "remove"){
        deleteTask(element);
    };

    localStorage.setItem("TODO", JSON.stringify(LIST));
});

let data = localStorage.getItem("TODO");
if(data){
    LIST = JSON.parse(data);
    id = LIST.length;
    loadList(LIST);
}else{
    LIST = [];
    id = 0;
};

function loadList(array){
    array.forEach( item => 
        function (item){
            addTask(item.name, item.id, item.done, item.remove);
    });
}
