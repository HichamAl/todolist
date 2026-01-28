export {createToDo, addToList, deleteToDo, editToDo, markAsComplete};

function createToDo(title, description, duedate, priority, notes){
    const status = "Not complete";
    const uuid = crypto.randomUUID();
    return { uuid, title, description, duedate, priority, notes, status }
}

function addToList(todo, listName){
    listName.push(todo);
    return
}

function deleteToDo(todo, listName){
    const toDoIndex = listName.indexOf(todo);
    listName.splice(toDoIndex, 1);
    return
}

function editToDo(todo, title, description, duedate, priority, notes){
    todo.title = title;
    todo.description = description;
    todo.duedate = duedate;
    todo.priority = priority;
    todo.notes = notes;
    return
}

function markAsComplete(todo){
    todo.status = "Complete";
    return
}
