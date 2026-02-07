import {createToDo, addToList} from "./toDoObject";
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

toDoListDialog.addEventListener("close", ()=> {
    if (toDoListDialog.returnValue === "cancel"){
        return;
    } else {
        const name = toDoListDialog.returnValue;
        const listNameDialog = document.querySelector("#listname");
        if (localStorage.getItem(name) == null){
            createList(name);
            listNameDialog.value = "";
            console.log("Succes, list doesnt exist in localstorage");
        } else {
            console.log("Error, list already exists in localstorage");
        }
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
    const todo = createToDo(title.value, description.value, duedate.value, priority.value, notes.value);
    const list = JSON.parse(localStorage.getItem(chosenList.value));
    list.push(todo);
    localStorage.setItem(chosenList.value, JSON.stringify(list));

    title.value = "";
    description.value = "";
    duedate.value = "";
    priority.value = "";
    notes.value = "";
    toDoDialog.close();
})




