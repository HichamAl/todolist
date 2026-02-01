import {createToDo, addToList} from "./toDoObject";
import {createList} from "./createList";
import  "./style.css";
import {addListToDom} from "./addToDom";

const arrayStorage = [];
const defaultList = ["Default list"];
globalThis.arrayStorage = arrayStorage;
globalThis.defaultList = defaultList;
addListToDom(defaultList);
arrayStorage.push(defaultList);

const createListButton = document.querySelector("#createlist");
const toDoListDialog = document.querySelector("#toDoListDialog");

// https://gomakethings.com/an-intro-to-the-dialog-element/

createListButton.addEventListener("click", () => {
    toDoListDialog.show();
    return
})

const createToDoButton = document.querySelector(".createToDo");
const toDoDialog = document.querySelector("#createToDo");

createToDoButton.addEventListener("click", ()=> {
    const lists = document.querySelector("#lists");
    while (lists.firstChild){
        lists.removeChild(lists.firstChild);
    }
    arrayStorage.forEach(element => {
    const option = document.createElement("option");
    option.textContent = element[0];
    option.setAttribute("value", element[0]);
    lists.append(option);
    });
    toDoDialog.show();
})

const priority = document.querySelector("#priority");
const title = document.querySelector("#title");
const description = document.querySelector("#description");
const notes = document.querySelector("#notes");
const duedate = document.querySelector("#duedate");
const chosenList = document.querySelector("#lists");

const confirmButton = document.querySelector("#confirm");
confirmButton.addEventListener("click", ()=> {
    const todo = createToDo(title.value, description.value, duedate.value, priority.value, notes.value);
    const rightList = arrayStorage.map((element) => element[0]).indexOf(chosenList.value);
    addToList(todo, arrayStorage[rightList]);
    title.value = "";
    description.value = "";
    duedate.value = "";
    priority.value = "";
    notes.value = "";
    toDoDialog.close();
})

toDoListDialog.addEventListener("close", function (event){
    if (toDoListDialog.returnValue === "cancel"){
        return;
    } else {
        const name = toDoListDialog.returnValue;
        const checkDuplicateName = arrayStorage.map((element) => element[0]).indexOf(name);
        if (checkDuplicateName === -1) {
            createList(name);
            const listNameDialog = document.querySelector("#listname");
            listNameDialog.value = "";
        } else {
            console.log("duplicate name not allowed");
        }
    }
})


