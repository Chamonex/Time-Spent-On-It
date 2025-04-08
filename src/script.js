const form = document.getElementById('form-new-project');
const ul = document.getElementById('ul-projects');

const projects = [];

form.addEventListener('submit', (event) => {
    event.preventDefault();
    addProject();
    loadProjects();
})

function addProject() {
    const name = document.getElementById('input-new-project-name').value;

    if (projects.some((project) => project.name.toLowerCase() === name.toLowerCase())) {
        alert('Project already exists');
        return;
    }

    projects.push({
        name: name,
        timeSpent: 0
    });

    console.log(projects);

}

function loadProjects() {
    ul.innerHTML = '';
    projects.forEach((p, i) => {
        ul.innerHTML += `
            <li id="li-${i}">
                <p>${p.name}</p>
                <span>${p.timeSpent} seconds</span>
                <button class="work">Work</button>
                <button class="delete">Delete</button>
            </li>
        `
    })

    const workButtons = document.querySelectorAll('.work');

    workButtons.forEach((button, i) => {
        button.addEventListener('click', () => {
            work(i);
        });
    });

    const deleteButtons = document.querySelectorAll('.delete');

    deleteButtons.forEach((button, i) => {
        button.addEventListener('click', () => {
            deleteProject(i);
        });
    });
}

function deleteProject(index) {
    projects.splice(index, 1);
    loadProjects();
}

function work(index) {

    const mostrador = document.getElementById('mostrador');

    mostrador.innerHTML += `
        <h2>Trabalhando no proeto "${projects[index].name}"</h2>
        <button id="start">Start</button>
    `
    const startButton = document.getElementById('start');
    startButton.addEventListener('click', () => {
        let seconds = 0;
        const timer = setInterval(() => {
            seconds++;
            mostrador.innerHTML = `
            <h2>Trabalhando no projeto "${projects[index].name}"</h2>
            <p>Tempo gasto: ${seconds} segundos</p>
            <button id="stop">Stop</button>
            `;
            const stopButton = document.getElementById('stop');
            stopButton.addEventListener('click', () => {
                clearInterval(timer);
                projects[index].timeSpent += seconds;
                mostrador.innerHTML = '';
                loadProjects();
            });
        }, 1000);
    });

}