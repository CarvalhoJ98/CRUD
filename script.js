let tasks = [];

// Carregar tarefas do localStorage ao iniciar
function loadTasks() {
    const saved = localStorage.getItem('tasks');
    if (saved) {
        tasks = JSON.parse(saved);
        // Migrar dados antigos (array de strings) para novo formato (array de objetos)
        tasks = tasks.map(task => {
            if (typeof task === 'string') {
                return { text: task, completed: false };
            }
            return task;
        });
        renderTasks();
    }
}

// Salvar tarefas no localStorage
function saveTasks() {
    localStorage.setItem('tasks', JSON.stringify(tasks));
}

function renderTasks() {
    const list = document.getElementById('taskList');
    list.innerHTML = '';

    tasks.forEach((task, index) => {
        const li = document.createElement('li');
        li.className = 'task-item';
        const checkboxId = `checkbox-${index}`;
        li.innerHTML = `
      <input type="checkbox" id="${checkboxId}" ${task.completed ? 'checked' : ''} />
      <span class="task-text">${task.text}</span>
      <div class="task-actions">
        <button class="edit" onclick="editTask(${index})">✏️</button>
        <button class="delete" onclick="deleteTask(${index})">🗑️</button>
      </div>
    `;
        list.appendChild(li);

        // Adicionar event listener ao checkbox
        const checkbox = document.getElementById(checkboxId);
        checkbox.addEventListener('change', function () {
            toggleTask(index);
        });
    });

    if (tasks.length === 0) {
        const empty = document.createElement('div');
        empty.className = 'empty-message';
        empty.textContent = 'Nenhuma tarefa adicionada';
        list.appendChild(empty);
    }
}

function addTask() {
    const input = document.getElementById('taskInput');
    if (input.value.trim() === '') return;

    tasks.push({ text: input.value, completed: false });
    input.value = '';
    renderTasks();
    saveTasks();
}

function toggleTask(index) {
    tasks[index].completed = !tasks[index].completed;
    saveTasks();
}

function editTask(index) {
    const newTask = prompt('Editar tarefa:', tasks[index].text);
    if (newTask !== null && newTask.trim() !== '') {
        tasks[index].text = newTask;
        renderTasks();
        saveTasks();
    }
}

function deleteTask(index) {
    tasks.splice(index, 1);
    renderTasks();
    saveTasks();
}

// Event listener para tecla Enter
document.addEventListener('DOMContentLoaded', function () {
    const input = document.getElementById('taskInput');
    input.addEventListener('keypress', function (event) {
        if (event.key === 'Enter') {
            addTask();
        }
    });

    // Carregar tarefas ao iniciar
    loadTasks();
});
