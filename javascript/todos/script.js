var toDoList = document.getElementById("todo-list");
var toDoInput = document.getElementsByTagName("input")[0];
var addTodoButton = document.getElementById("addTodoButton");
var todoTextArray = [];
var todoLiDoneStateList = [];
var todoLiDoneButtonStateList = [];
// focus to the todo input
toDoInput.focus();
// add todos to the todo list
function addToDo(text) {
    // create a 'li' element
    var todoLi = document.createElement('li');
    // create a 'button' element
    var removeButton = document.createElement('button');
    // create a 'button' element
    var doneButton = document.createElement('button');
    // set class attribute of the button to 'fa fa-trash-o remove_button'
    removeButton.setAttribute('class', 'fa fa-trash-o remove_button');
    // set class attribute of the button to 'fa-check check_button'
    doneButton.setAttribute('class', 'fa fa-check check_button');
    // change the text of the 'li' element to the text that is currently typed inside the input
    todoLi.textContent = "".concat(text, " ");
    // append/adds the 'li' element to the list, to the node
    toDoList === null || toDoList === void 0 ? void 0 : toDoList.appendChild(todoLi);
    // append/adds the 'button' element to the 'li', to the node
    todoLi.appendChild(removeButton);
    // append/adds the 'button' element to the 'li', to the node
    todoLi.appendChild(doneButton);
    // set class attribute of the button to 'list_li'
    todoLi.setAttribute('class', 'list_li');
    // add event listener to the 'Remove' button of the current todo
    // with functionality to remove the intire 'li' on the same line
    // focus to the todo input
    removeButton.addEventListener("click", function () {
        todoLi.remove();
        toDoInput.focus();
        updateTodoList();
        updateTodoState();
    });
    // add event listener to the 'Done' button of the current todo
    // with functionality to chnage the 'Done' button with 'Undo' button and the css of the 'li' element
    // focus to the todo input
    doneButton.addEventListener("click", function () {
        if (todoLi.getAttribute('class') === 'list_li done_li') {
            todoLi.setAttribute('class', 'list_li');
            doneButton.setAttribute('class', 'fa fa-check check_button');
            toDoInput.focus();
        }
        else {
            todoLi.setAttribute('class', 'list_li done_li');
            doneButton.setAttribute('class', 'fa fa-undo undo_button');
            toDoInput.focus();
        }
        updateTodoState();
    });
    // clear the todo input
    toDoInput.value = "";
    toDoInput.focus();
}
// add event listener to the plus button
addTodoButton === null || addTodoButton === void 0 ? void 0 : addTodoButton.addEventListener("click", function () {
    var toDoInputVal = toDoInput.value;
    if (toDoInputVal.length > 0) {
        addToDo(toDoInputVal);
        updateTodoList();
        updateTodoState();
    }
});
// clear the todo input when 'Clear' button gets clicked
// focus to the todo input
function clearTodoInput() {
    toDoInput.value = "";
    toDoInput.focus();
}
// remove all the todo childs from the 'toDoList' element
// focus to the input element
function clearTodoList() {
    if (toDoList != null) {
        toDoList.replaceChildren();
        toDoInput.focus();
        updateTodoList();
        updateTodoState();
    }
}
// update the data about the todo list li text inside the local storage
function updateTodoList() {
    todoTextArray = [];
    if (toDoList != null) {
        var liNodes = toDoList.querySelectorAll('li');
        if (liNodes.length > 0) {
            for (var index = 0; liNodes[index]; index++) {
                var node = liNodes[index];
                var textContentOfNode = node.textContent;
                if (textContentOfNode != null) {
                    todoTextArray.push(textContentOfNode);
                    localStorage.setItem('todoTextArray', JSON.stringify(todoTextArray));
                }
            }
        }
        else {
            localStorage.setItem('todoTextArray', "");
        }
    }
}
// update the data about the todo list li done button inside the local storage
function updateTodoState() {
    todoLiDoneStateList = [];
    todoLiDoneButtonStateList = [];
    if (toDoList != null) {
        var liNodes = toDoList.querySelectorAll('li');
        if (liNodes.length > 0) {
            for (var index = 0; liNodes[index]; index++) {
                var liClass = liNodes[index].getAttribute('class');
                var liDoneButtonClass = liNodes[index].querySelectorAll('button')[1].getAttribute('class');
                if (liClass != null) {
                    todoLiDoneStateList.push(liClass);
                    localStorage.setItem('todoLiDoneStateList', JSON.stringify(todoLiDoneStateList));
                }
                if (liDoneButtonClass != null) {
                    todoLiDoneButtonStateList.push(liDoneButtonClass);
                    localStorage.setItem('todoLiDoneButtonStateList', JSON.stringify(todoLiDoneButtonStateList));
                }
            }
        }
        else {
            localStorage.setItem('todoLiDoneStateList', "");
            localStorage.setItem('todoLiDoneButtonStateList', "");
        }
    }
}
// load all the needed data from localStorage
function loadFromLocalStorage() {
    if (localStorage.getItem('todoTextArray') != "") {
        if (JSON.parse(localStorage.getItem('todoTextArray')) != "") {
            todoTextArray = JSON.parse(localStorage.getItem('todoTextArray'));
            if (todoTextArray != null) {
                todoTextArray.forEach(function (text) {
                    addToDo(text);
                });
            }
        }
    }
    if (localStorage.getItem('todoDoneState') != "" &&
        localStorage.getItem('todoLiDoneButtonStateList') != "") {
        if (JSON.parse(localStorage.getItem('todoDoneState')) != "" &&
            JSON.parse(localStorage.getItem('todoLiDoneButtonStateList')) != "") {
            todoLiDoneStateList = JSON.parse(localStorage.getItem('todoLiDoneStateList'));
            todoLiDoneButtonStateList = JSON.parse(localStorage.getItem('todoLiDoneButtonStateList'));
            if (toDoList !== null) {
                var liNodes = toDoList.querySelectorAll('li');
                for (var index = 0; liNodes[index]; index++) {
                    liNodes[index].setAttribute('class', todoLiDoneStateList[index]);
                    liNodes[index].querySelectorAll('button')[1].setAttribute('class', todoLiDoneButtonStateList[index]);
                }
            }
        }
    }
}
// start a loadFromLocalStorage function when page loads
window.onload = function () {
    loadFromLocalStorage();
};
// Keyboard Shortcuts
document.addEventListener('keydown', function (e) {
    if (e.key.toLowerCase() === 'a' && e.altKey) {
        addToDo(toDoInput.value);
        updateTodoList();
        updateTodoState();
    }
    else if (e.key.toLowerCase() === 'c' && e.altKey) {
        clearTodoInput();
    }
    else if (e.key.toLowerCase() === 'x' && e.altKey) {
        clearTodoList();
        updateTodoList();
        updateTodoState();
    }
});
