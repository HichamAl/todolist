export {createList}
import {addListToDom} from "./addToDom";

function createList(listName){
    const array = [];
    array.push(listName);
    localStorage.setItem(listName, JSON.stringify(array));
    let listNameJson = JSON.parse(localStorage.getItem(listName));
    addListToDom(listNameJson);
    return;
}
