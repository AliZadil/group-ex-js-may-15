const refreshButton = document.getElementById('refresh');
const saveButton = document.getElementById('saveToMemory');
const loadButton = document.getElementById('loadFromMemory');
const container = document.querySelector('.container');

refreshButton.addEventListener('click', async () => {
    const response = await fetch('https://jsonplaceholder.typicode.com/todos');
    const data = await response.json();
    renderData(data);
});
// async function fetchData() {
//         const response = await fetch('https://jsonplaceholder.typicode.com/todos');
//         const data = await response.json();
//         renderData(data);
// }

saveButton.addEventListener('click', async () => {
    const data = container.innerHTML;
    localStorage.setItem('savedData', data);
});
// function saveData() {
//     const data = container.innerHTML;
//     localStorage.setItem('savedData', data);
// }

loadButton.addEventListener('click', () => {
    const savedData = JSON.parse(localStorage.getItem('savedData'));
    container.innerHTML = savedData;
});
// function loadData() {
//     const savedData = JSON.parse(localStorage.getItem('savedData'));
//     container.innerHTML = savedData;
// }

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
