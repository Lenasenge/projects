"use strict"; // Use ECMAScript 5 strict mode in browsers that support it

window.addEventListener("load", initApp); // When the page is loaded, run initApp function

// Function to initialize the Web App
async function initApp() {
  console.log("initApp: app.js is running 🎉");
  const projects = await getProjects();
  projects.sort(
    //sorts by time published
    (a, b) => new Date(a.date).getTime() - new Date(b.date).getTime()
  );
  console.log(projects); // Log to the console that the app is running
  displayProjectsGrid(projects);
}

async function getProjects() {
  const response = await fetch(
    "https://exam2semester.lenascreativestudio.com/wp-json/wp/v2/project?acf_format=standard"
  );
  const data = await response.json();
  return data;
}

function displayProjectsGrid(projects) {
  const projectsGrid = document.querySelector("#projects-grid");

  for (const project of projects) {
    projectsGrid.insertAdjacentHTML(
      "beforeend",
      /*html*/ `
    <article class="grid-item">
      <img src="${project.acf.image}" alt="${project.title.rendered}" />
      <h2>${project.title.rendered}</h2>
      <h3>${project.acf.type}</h3>
      <p>${project.acf.group}</p>
      <p>${project.acf.client}</p>
      <h4>${project.acf.description}</h4>
      <a href="url:${project.acf.url}">${project.acf.url}</a>     
      <p>${project.acf.status}</p>        
    </article>
  `
    );
  }
}
