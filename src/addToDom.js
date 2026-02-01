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

    // delete list from arraystorage
    const button = document.querySelectorAll("[data-listname]");
    // lastbutton is not the last text of the listname but the P element that has the X
    const lastButton = button[button.length-1];
    lastButton.addEventListener("click", () => {
        const listToDelete = lastButton.dataset.listname;
        lastButton.parentNode.remove();
        const rightArray = arrayStorage.map((element) => element[0]).indexOf(listToDelete);
        const checkForTodos = arrayStorage[rightArray][1];
        const check = document.querySelector(`[data-uuid = "${checkForTodos}"]`);
        if (check){
            const allToDos = document.querySelectorAll(".todo");
            allToDos.forEach(element => {
                element.remove()
            });
        }
        arrayStorage.splice(rightArray,1);
        return;   
    })

    const listTextButton = document.querySelectorAll(".listname");
    const lastListTextButton = listTextButton[listTextButton.length-1];
    lastListTextButton.addEventListener("click", ()=> {
        const todos = document.querySelectorAll(".todo");
        todos.forEach(element => {
            element.remove();
        });
        const rightArray = arrayStorage.map((element) => element[0]).indexOf(lastListTextButton.textContent);
        arrayStorage[rightArray].forEach(element => {
            if (element.title){
                addObjectToDom(element, arrayStorage[rightArray]);
            } else {
                return;
            }
        });
    })
    return
}

function addObjectToDom(element, rightArrayMaybe){
    const content = document.querySelector(".content");
    const div = document.createElement("div");
    const todo = document.createElement("p");
    todo.textContent = `${element.title}, ${element.duedate}`;
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
    const editButton = document.createElement("p");
    editButton.textContent = "Edit";
    const deleteButton = document.createElement("p");
    deleteButton.textContent = "X";
    div.classList.add("todo");
    deleteButton.classList.add("delete");
    deleteButton.addEventListener("click", ()=> {
        deleteToDo(element, rightArrayMaybe);
        const parent = deleteButton.parentNode;
        parent.remove();
    })

    const editToDoDialog = document.querySelector("#editToDo");
    editButton.addEventListener("click", ()=> {
        const editTitle = document.querySelector("#editTitle");
        const editDescription = document.querySelector("#editDescription");
        const editDuedate = document.querySelector("#editDuedate");
        const editPriority = document.querySelector("#editPriority");
        const editNotes = document.querySelector("#editNotes");

        const parent = editButton.parentNode;
        const uuid = parent.dataset.uuid;
        const listNameToDo = parent.dataset.todolistname;

        const rightArray = arrayStorage.map((element) => element[0]).indexOf(listNameToDo);
        const rightElement = arrayStorage[rightArray].find((e)=> e.uuid == uuid);
        globalThis.rightElement = rightElement;

        editNotes.value = rightElement.notes;
        editPriority.value = rightElement.priority;
        editDuedate.value = rightElement.duedate;
        editDescription.value = rightElement.description;
        editTitle.value = rightElement.title;
        editToDoDialog.show();
    })

    const confirmEdit = document.querySelector("#editConfirm");
    confirmEdit.addEventListener("click", ()=> {
        const editTitle = document.querySelector("#editTitle");
        const editDescription = document.querySelector("#editDescription");
        const editDuedate = document.querySelector("#editDuedate");
        const editPriority = document.querySelector("#editPriority");
        const editNotes = document.querySelector("#editNotes");
        editToDo(rightElement, editTitle.value, editDescription.value, editDuedate.value, editPriority.value, editNotes.value);
        return;
    })
    globalThis.rightArrayMaybe = rightArrayMaybe;
    globalThis.element = element;
    div.append(todo, editButton, deleteButton);
    div.dataset.uuid = element.uuid;
    div.dataset.todolistname = rightArrayMaybe[0];
    content.appendChild(div);
    return
}

