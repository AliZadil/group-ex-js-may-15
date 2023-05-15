const refreshButton = document.getElementById('refresh');
const saveButton = document.getElementById('saveToMemory');
const loadButton = document.getElementById('loadFromMemory');
const container = document.querySelector('.container');

refreshButton.addEventListener('click', fetchData);
saveButton.addEventListener('click', saveData);
loadButton.addEventListener('click', loadData);

async function fetchData() {
    const response = await fetch('https://jsonplaceholder.typicode.com/todos');
    const data = await response.json();
    renderData(data);
}

function renderData(data) {
    container.innerHTML = '';
    const renderedItems = data.map((el) => {
        const listItem = document.createElement('div');
        listItem.className = 'list-item';

        const title = document.createElement('h3');
        title.className = 'title';
        title.textContent = el.title;

        const completed = document.createElement('input');
        completed.type = 'checkbox';
        completed.className = 'completed';
        completed.checked = el.completed;

        listItem.appendChild(title);
        listItem.appendChild(completed);

        return listItem;
    });
    container.append(...renderedItems);
}

function saveData() {
    const data = container.innerHTML;
    localStorage.setItem('savedData', data);
}

function loadData() {
    const savedData = JSON.parse(localStorage.getItem('savedData'));
    container.innerHTML = savedData;
}
