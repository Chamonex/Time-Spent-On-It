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
                ${p.name}
                <button class="work">Work</button>
                <button class="delete">Delete</button>
            </li>
        `
    })

    const workButtons = document.querySelectorAll('.work');
    
    workButtons.forEach((button, i) => {
        button.addEventListener('click', () => {
            working(i);
        });
    });

    const deleteButtons = document.querySelectorAll('.delete');

    deleteButtons.forEach((button, i) => {
        button.addEventListener('click', () => {
            deleteProject(i);
        });
    });
}

function working(index) {
    console.log(`Working on ${projects[index].name}`);
}

function deleteProject(index) {
    projects.splice(index, 1);
    console.log(projects);
    loadProjects();
}