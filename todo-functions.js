// Remove a todo fom the list
const removeTodo = function(id) {
    const todoIndex = todos.findIndex(function(todo) {
        return todo.id === id;
    })
    if (todoIndex > -1) {
        todos.splice(todoIndex, 1);
    }
}


// Fetch existing todos from localStorage
const getSavedTodos = function() {
    const todosJSON = localStorage.getItem('todos');
    if (todosJSON !== null) {
       return JSON.parse(todosJSON);
    } else {
        return []
    }
}

// Save todos to localStorage
const saveTodos = function(todos) {
    localStorage.setItem('todos', JSON.stringify(todos));
}

// Render application todos based on filters
const renderTodos = function(todos, filters) {
    const filteredTodos = todos.filter(function(todo) {
        const searchTextMatch = todo.text.toLowerCase().includes(filters.searchText.toLowerCase());
        const hideCompletedMatch = !filters.hideCompleted || !todo.completed;
        return searchTextMatch && hideCompletedMatch;
    })
    const incompleteTodos = filteredTodos.filter(function(todo) {
        return !todo.completed;
    })
    document.querySelector('#todos').innerHTML = '';
    document.querySelector('#todos').appendChild(generateSummaryDOM(incompleteTodos));
    filteredTodos.forEach(function(todo) {
        document.querySelector('#todos').appendChild(generateTodoDOM(todo));  
        }) 
}

const toggleTodo = function(id) {
    const todo = todos.find(function(todo) {
        return todo.id === id;
    })
    if (todo !== undefined) {
        todo.completed = !todo.completed;
    } 
}

// Get the DOM elements for individual todo
const generateTodoDOM = function(todo) {
    const todoEl = document.createElement('div');
    const checkboxEl = document.createElement('input');
    checkboxEl.setAttribute('type', 'checkbox');
    todoEl.appendChild(checkboxEl);
    if (todo.completed) {
        checkboxEl.setAttribute('checked', 'true');
    }
    checkboxEl.addEventListener('change', function() {
        toggleTodo(todo.id);
        saveTodos(todos);
        renderTodos(todos, filters);
    })
    let textEl = document.createElement('span');
    textEl.textContent = todo.text;
    todoEl.appendChild(textEl);
    const button = document.createElement('button');
    button.textContent = 'x';
    todoEl.appendChild(button);
    button.addEventListener('click', function() {
        removeTodo(todo.id);
        saveTodos(todos);
        renderTodos(todos, filters);
    })
    return todoEl;
}

// Get the DOM elements for list summary
const generateSummaryDOM = function(incompleteTodos) {
    const summary = document.createElement('h2');
    summary.textContent = `You have ${incompleteTodos.length} todos left.`;
    return summary;
}