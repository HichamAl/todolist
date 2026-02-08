import {createToDo} from "./toDoObject";
import {createList} from "./createList";
import  "./style.css";
import {addListToDom, addObjectToDom} from "./addToDom";

const createListButton = document.querySelector("#createlist");
const toDoListDialog = document.querySelector("#toDoListDialog");
const createToDoButton = document.querySelector(".createToDo");
const toDoDialog = document.querySelector("#createToDo");
const priority = document.querySelector("#priority");
const title = document.querySelector("#title");
const description = document.querySelector("#description");
const notes = document.querySelector("#notes");
const duedate = document.querySelector("#duedate");
const chosenList = document.querySelector("#lists");
const confirmButton = document.querySelector("#confirm");
const storageLength = localStorage.length;

for (let i = 0; i < storageLength; i++){
    const key = localStorage.key(i);
    const list = JSON.parse(localStorage.getItem(key));
    addListToDom(list);
}

createListButton.addEventListener("click", () => {
    toDoListDialog.show();
    return
})

const listConfirmButton = document.querySelector("#listConfirm");
let listValue = document.querySelector("#listname");
listConfirmButton.addEventListener("click", ()=> {
    let name = listValue.value;
    if (name === ""){
        alert("Listname can't be empty!");
        return;
    } if (localStorage.getItem(name) == null){
        createList(name);
        listValue.value = "";
    } else {
        alert("A todo list with this name already exists!");
        return;
    }
})

createToDoButton.addEventListener("click", ()=> {
    const todoListOptions = document.querySelector("#lists");
    while (todoListOptions.firstChild){
        todoListOptions.removeChild(todoListOptions.firstChild);
    }
    const storageLength = localStorage.length;
    for (let i=0; i < storageLength; i++){
        const option = document.createElement("option");
        const key = localStorage.key(i);
        option.textContent = key;
        option.setAttribute("value", key);
        todoListOptions.append(option);
    }
    toDoDialog.show();
})

confirmButton.addEventListener("click", ()=> {
    if (title.value === "" || description.value === "" || duedate.value === ""|| priority.value === ""|| notes.value === ""){
        alert("All values must be provided to create a todo object, try again!");
        return;
    }
    const todo = createToDo(title.value, description.value, duedate.value, priority.value, notes.value);
    const list = JSON.parse(localStorage.getItem(chosenList.value));
    list.push(todo);
    localStorage.setItem(chosenList.value, JSON.stringify(list));

    const container = document.querySelector(".container");
    const currentListOnDom = container.firstChild;

    if (currentListOnDom){
        if (list[0] == currentListOnDom.textContent){
        const todos = document.querySelectorAll(".todo");
        todos.forEach(element => {
            element.remove();
        });

        const toDoListLocalstorage = JSON.parse(localStorage.getItem(list[0]));
        toDoListLocalstorage.forEach(element => {
            if (element.title){
                addObjectToDom(element, list);
            } else {
                return;
            }
        });
    }
    }
    
    title.value = "";
    description.value = "";
    duedate.value = "";
    priority.value = "";
    notes.value = "";
    toDoDialog.close();
})




