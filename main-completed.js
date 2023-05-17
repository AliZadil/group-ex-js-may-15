const refreshBtn = document.querySelector("#refresh");
const saveMemoryBtn = document.querySelector("#saveToMemory");
const loadMemoryBtn = document.querySelector("#loadFromMemory");
const container = document.querySelector(".container");

const API_LINK = "https://jsonplaceholder.typicode.com/todos";
const DATA_KEY_LOCALSTORAGE = 'todos';

async function getData() {
    const response = await fetch(API_LINK);
    const jsonData = await response.json();
    return jsonData;
}

function renderData(data) {
    container.innerHTML = '';
    for (let i = 0; i < data.length; i++) {
        const element = data[i];

        let divTag = document.createElement("div");
        divTag.className = "list-item";
        let h3Tag = document.createElement("h3");
        h3Tag.innerHTML = element.title;
        let checkboxTag = document.createElement("input");

        checkboxTag.className = "completed";
        checkboxTag.type = "checkbox";
        checkboxTag.checked = element.completed;
        checkboxTag.addEventListener("click", () => {
            data[i].completed = checkboxTag.checked;
            localStorage.setItem(DATA_KEY_LOCALSTORAGE, JSON.stringify(data));
        })
        let deleteBtn = document.createElement("button");
        deleteBtn.innerHTML = "Delete";
        deleteBtn.addEventListener("click", () => {
            data.splicec(i, 1);
            renderData(data);
            localStorage.setItem(DATA_KEY_LOCALSTORAGE, JSON.stringify(data));
        })

        divTag.append(h3Tag);
        divTag.append(inputTag);
        divTag.append(deleteBtn)
        container.append(divTag);

    }
}

async function loadInitialData(){
    let localData = localStorage.getItem(DATA_KEY_LOCALSTORAGE);
    if(localData === null){
        let data = await getData();
        renderData(data);
    } else {
        renderData(JSON.parse(localData));
    }
}
loadInitialData();

refreshBtn.addEventListener("click", async () => {
    let data = await getData();
    renderData(data);
})

saveMemoryBtn.addEventListener("click", async () => {
    let data = await getData();
    localStorage.setItem(DATA_KEY_LOCALSTORAGE, JSON.stringify(data));
});

loadMemoryBtn.addEventListener("click", () => {
    let data = JSON.parse(localStorage.getItem(DATA_KEY_LOCALSTORAGE));
    renderData(data);
});