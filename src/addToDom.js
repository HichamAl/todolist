export {addListToDom, addObjectToDom}

function addListToDom(list){
    const listName = list[0];
    const nav = document.querySelector(".nav");
    const div = document.createElement("div");
    const p = document.createElement("p");
    const deleteMarker = document.createElement("p");
    p.textContent = `${listName}`;
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
    const lastButton = button[button.length-1];
    lastButton.addEventListener("click", () => {
        const listToDelete = lastButton.dataset.listname;
        lastButton.parentNode.remove();
        const rightArray = arrayStorage.map((element) => element[0]).indexOf(listToDelete);
        arrayStorage.splice(rightArray,1);
        return;   
    })
    return
}

function addObjectToDom(list){
    const content = document.querySelector(".content");
    const div = document.createElement("div");
    div.classList.add("todo");
    div.textContent = `${list[1].title}`;
    content.appendChild(div);
    return
}