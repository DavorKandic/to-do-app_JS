const todos = getSavedTodos();

const filters = {
    searchText: '',
    hideCompleted: false
}

renderTodos(todos, filters);

document.querySelector('#search-todo').addEventListener('input', function(e) {
    filters.searchText = e.target.value;
    renderTodos(todos, filters);
})

document.querySelector('#new-todo').addEventListener('submit', function(e) {
    e.preventDefault();
    if (e.target.elements.todoText.value.length > 0) {
        todos.push({
            id: uuidv4(),
            text: e.target.elements.todoText.value,
            completed: false
        })
    saveTodos(todos);
    }


    renderTodos(todos, filters);
    e.target.elements.todoText.value = '';
})

document.querySelector('#hide').addEventListener('change', function(e) {
    if(e.target.checked) {
        filters.hideCompleted = true;
    } else {
        filters.hideCompleted = false;
    }
    renderTodos(todos, filters);
})






