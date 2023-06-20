var toDoList = document.getElementById("todo-list");
var toDoInput = document.getElementsByTagName("input")[0];
// focus to the todo input
toDoInput.focus();
function addToDo() {
    var toDoInputVal = toDoInput.value;
    if (toDoInputVal.length > 0) {
        // creates a 'li' element
        var todoLi_1 = document.createElement('li');
        // creates a 'button' element
        var removeButton = document.createElement('button');
        // creates a 'button' element
        var doneButton_1 = document.createElement('button');
        // set class attribute of the button to 'fa fa-trash-o remove_button'
        removeButton.setAttribute('class', 'fa fa-trash-o remove_button');
        // set class attribute of the button to 'fa-check check_button'
        doneButton_1.setAttribute('class', 'fa fa-check check_button');
        // changes the text of the 'li' element to the text that is currently typed inside the input
        todoLi_1.textContent = "".concat(toDoInputVal, " ");
        // append/adds the 'li' element to the list, to the node
        toDoList === null || toDoList === void 0 ? void 0 : toDoList.appendChild(todoLi_1);
        // append/adds the 'button' element to the 'li', to the node
        todoLi_1.appendChild(removeButton);
        // append/adds the 'button' element to the 'li', to the node
        todoLi_1.appendChild(doneButton_1);
        // set class attribute of the button to 'list_li'
        todoLi_1.setAttribute('class', 'list_li');
        // adds event listener to the 'Remove' button of the current todo
        // with functionality to remove the intire 'li' on the same line
        // focus to the todo input
        removeButton.addEventListener("click", function () {
            todoLi_1.remove();
            toDoInput.focus();
        });
        // adds event listener to the 'Done' button of the current todo
        // with functionality to chnage the 'Done' button with 'Undo' button and the css of the 'li' element
        // focus to the todo input
        doneButton_1.addEventListener("click", function () {
            if (todoLi_1.getAttribute('class') === 'list_li done_li') {
                todoLi_1.setAttribute('class', 'list_li');
                doneButton_1.setAttribute('class', 'fa fa-check check_button');
                toDoInput.focus();
            }
            else {
                todoLi_1.setAttribute('class', 'list_li done_li');
                doneButton_1.setAttribute('class', 'fa fa-undo undo_button');
                toDoInput.focus();
            }
        });
        // clears the todo input
        toDoInput.value = "";
        toDoInput.focus();
    }
    ;
}
// clears the todo input when 'Clear' button gets clicked
// focus to the todo input
function clearTodoInput() {
    toDoInput.value = "";
    toDoInput.focus();
}
// removes all the todo childs from the 'toDoList' element
// focus to the input element
function clearTodoList() {
    if (toDoList != null) {
        toDoList.replaceChildren();
        toDoInput.focus();
    }
}
// Keyboard Shortcuts
document.addEventListener('keydown', function (e) {
    if (e.key.toLowerCase() === 'a' && e.altKey) {
        addToDo();
    }
    else if (e.key.toLowerCase() === 'c' && e.altKey) {
        clearTodoInput();
    }
    else if (e.key.toLowerCase() === 'x' && e.altKey) {
        clearTodoList();
    }
});
