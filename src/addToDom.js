export {addListToDom, addObjectToDom}
import { deleteToDo, editToDo } from "./toDoObject";

function addListToDom(list){
    const listName = list[0];
    const nav = document.querySelector(".nav");
    const div = document.createElement("div");
    const p = document.createElement("p");
    const deleteMarker = document.createElement("p");
    p.textContent = `${listName}`;
    p.classList.add("listname");
    deleteMarker.textContent = "X";
    div.style.display = "flex";
    div.style.justifyContent = "center";
    div.style.alignItems = "center";
    div.appendChild(p);
    div.appendChild(deleteMarker);
    nav.appendChild(div);
    div.style.gap = "1rem";
    deleteMarker.dataset.listname = listName;
    deleteMarker.dataset.eventlistener = "true";

    // delete TODO list 
    const button = document.querySelectorAll("[data-listname]"); // Get reference to all lists 
    // Get reference to the list that is being clicked
    const deleteListButton = button[button.length-1];
    deleteListButton.addEventListener("click", () => {
        localStorage.removeItem(list[0]);
        // delete the todo list name from the DOM
        deleteListButton.parentNode.remove();
        return;   
    })

    // Show todos when the name of the todo list is clicked
    const listTextButton = document.querySelectorAll(".listname");
    const toDoListButton = listTextButton[listTextButton.length-1];
    toDoListButton.addEventListener("click", ()=> {
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
    })
    return
}

function addObjectToDom(element, list){
    const editButton = document.createElement("p");
    editButton.textContent = "Edit";
    const deleteButton = document.createElement("p");
    deleteButton.textContent = "X";
    deleteButton.classList.add("delete");
    const content = document.querySelector(".content");
    const div = document.createElement("div");
    div.classList.add("todo");
    const todo = document.createElement("p");
    todo.textContent = `${element.title}, ${element.duedate}`;

    // Show todo details
    todo.addEventListener("click", ()=> {
        const showToDoDialog = document.querySelector("#showToDo");
        const showTitle = document.querySelector("#showTitle");
        const showDescription = document.querySelector("#showDescription");
        const showDueDate = document.querySelector("#showDueDate");
        const showPriority = document.querySelector("#showPriority");
        const showNotes = document.querySelector("#showNotes");
        showNotes.textContent = element.notes;
        showPriority.textContent = element.priority;
        showDueDate.textContent = element.duedate;
        showTitle.textContent = element.title;
        showDescription.textContent = element.description;
        showToDoDialog.show();
    })

    // Delete todo button
    deleteButton.addEventListener("click", ()=> { 
        const parent = deleteButton.parentNode;
        const toDoListLocalstorage = JSON.parse(localStorage.getItem(list[0]));
        function findTodoIndex(element){
            if (parent.dataset.uuid){
                if (element.uuid == parent.dataset.uuid){
                return true;
            } 
            } else {
                return false;
            }
        }
        const todoIndex = toDoListLocalstorage.findIndex(findTodoIndex);
        toDoListLocalstorage.splice(todoIndex, 1);
        localStorage.setItem(list[0], JSON.stringify(toDoListLocalstorage));
        parent.remove();   
    })

    const editToDoDialog = document.querySelector("#editToDo");

    // edit button here is dynamically created using document.create
    // so it works correctly on each individual element
    editButton.addEventListener("click", ()=> {
        const editTitle = document.querySelector("#editTitle");
        const editDescription = document.querySelector("#editDescription");
        const editDuedate = document.querySelector("#editDuedate");
        const editPriority = document.querySelector("#editPriority");
        const editNotes = document.querySelector("#editNotes");
        editNotes.value = element.notes;
        editPriority.value = element.priority;
        editDuedate.value = element.duedate;
        editDescription.value = element.description;
        editTitle.value = element.title;

        const parent = editButton.parentNode;
        const uuid = parent.dataset.uuid;
        globalThis.uuid = uuid;
        const listNameToDo = parent.dataset.todolistname;

        const toDoListLocalstorage = JSON.parse(localStorage.getItem(list[0]));
        const rightElement = toDoListLocalstorage.find((e)=> e.uuid == uuid);

        globalThis.rightElement = rightElement;

        editToDoDialog.show();
    })

    // here confirmedit is not dynamically created there is one button on the screen and 
    // when that is clicked it executes on each element that has it.
    const confirmEdit = document.querySelector("#editConfirm");
    confirmEdit.addEventListener("click", ()=> {
        // it works as long as every thing is filled in in the todo item
        const editTitle = document.querySelector("#editTitle");
        const editDescription = document.querySelector("#editDescription");
        const editDuedate = document.querySelector("#editDuedate");
        const editPriority = document.querySelector("#editPriority");
        const editNotes = document.querySelector("#editNotes");

        const toDoListLocalstorage = JSON.parse(localStorage.getItem(list[0]));
        function findTodoIndex(element){
            if (uuid){
                if (element.uuid == uuid){
                return true;
            } 
            } else {
                return false;
            }
        }
        const todoIndex = toDoListLocalstorage.findIndex(findTodoIndex);
        const elementToEdit = toDoListLocalstorage[todoIndex];

        if (elementToEdit.title){
            elementToEdit.title = editTitle.value;
        } if (elementToEdit.description){
            elementToEdit.description = editDescription.value;
        } if (elementToEdit.duedate){
            elementToEdit.duedate = editDuedate.value;
        } if (elementToEdit.priority){
            elementToEdit.priority = editPriority.value;
        } if (elementToEdit.notes){
            elementToEdit.notes = editNotes.value;
        }

        localStorage.setItem(list[0], JSON.stringify(toDoListLocalstorage));  
        return;
    })

    div.append(todo, editButton, deleteButton);
    div.dataset.uuid = element.uuid;
  
    content.appendChild(div);
    return
}

