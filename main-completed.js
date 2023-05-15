const refreshBtn = document.querySelector("#refresh");
const saveMemoryBtn = document.querySelector("#saveToMemory");
const loadMemoryBtn = document.querySelector("#loadFromMemory");
const container = document.querySelector(".container");

const API_LINK = "https://jsonplaceholder.typicode.com/todos";


async function getData() {
    const response = await fetch(API_LINK);
    const jsonData = await response.json();
    return jsonData;
}

function renderData(data) {
    for (let i = 0; i < data.length; i++) {
        const element = data[i];

        let divTag = document.createElement("div");
        divTag.className = "list-item";
        let h3Tag = document.createElement("h3");
        h3Tag.innerHTML = element.title;
        let inputTag = document.createElement("input");
        inputTag.className = "completed";
        inputTag.type = "checkbox";
        inputTag.checked = element.completed;

        divTag.append(h3Tag);
        divTag.append(inputTag);
        container.append(divTag);

    }
}


refreshBtn.addEventListener("click", async () => {
    let data = await getData();
    renderData(data);
})

saveMemoryBtn.addEventListener("click", async () => {
    let data = await getData();
    localStorage.setItem("todos", JSON.stringify(data));
});

loadMemoryBtn.addEventListener("click", () => {
    let data = JSON.parse(localStorage.getItem("todos"));
    renderData(data);
});