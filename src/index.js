import {createToDo, addToList, deleteToDo, editToDo, markAsComplete} from "./toDoObject";
import {createList} from "./createList";
import  "./style.css";
import {addListToDom, addObjectToDom} from "./addToDom";

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

toDoListDialog.addEventListener("close", function (event){
    if (toDoListDialog.returnValue === "cancel"){
        return;
    } else {
        const name = toDoListDialog.returnValue;
        createList(name);
    }
})

const todo = createToDo("Finish To Do List project", "The to do list project has been on hold for some time. I need to finish it soon.", "22-01-2026", "High", "Don't rush though, try to write pseudo code first..");
addToList(todo, defaultList);
addObjectToDom(defaultList);

const todo1 = createToDo("Finish To Do List project", "The to do list project has been on hold for some time. I need to finish it soon.", "22-01-2026", "High", "Don't rush though, try to write pseudo code first..");
const todo2 = createToDo("Finish To Do List project", "The to do list project has been on hold for some time. I need to finish it soon.", "22-01-2026", "High", "Don't rush though, try to write pseudo code first..");

editToDo(todo2, "New title", "New description", "New due date", "New priority", "New Notes","not complete");

markAsComplete(todo2);