import parse from "date-fns/parse";
import { taskButtonTemplate, bottomNavDivTemplate } from "./divTemplates";
import {
  clearTasks,
  clearBottomNavDivDisplay,
  saveStorage,
  handleSelections,
  removeNotNeeded,
} from "./helpers.js";
import { taskFactory, projectFactory, projectManager } from "./objStuff";
import taskDisplay from "./taskDisplay";

// ran whenever a task form is submitted. Creates the task object with the form values
// Is there value in refactoring this? I need all this to be done on form submits
// and refactoring would still mean that a small function that doesn't get used
// anywhere else gets called here. Will keep for now
const handleTaskFormSubmits = () => {
  // every form on a project page has a hidden input holding the project name
  // might be a better way to do this? will cause problems whenever 2 projects have the same name
  const hiddenInput = document.querySelector("#project");
  const project = projectManager.getProject(hiddenInput.value);

  const task = taskFactory(
    taskName.value,
    desc.value,
    parse(dueDate.value, "yyyy-MM-dd", new Date()),
    false,
    false
  );
  project.addTask(task);

  // hide the form and reset its values
  const taskFormContainer = document.querySelector(".form-container");
  taskFormContainer.style.display = "none";
  const taskForm = document.querySelector("#task-form");
  taskForm.reset();

  clearTasks();
  taskDisplay(project, true);
  saveStorage();
};

// this adds the task button and form listeners to the project pages
// different from top nav pages which have no add task button
const displayBottomNavProjects = (project) => {
  const projectContent = document.querySelector(".task-content");

  const projectHeading = document.querySelector(".task-heading");
  projectHeading.textContent = project.name;

  const tasksDiv = document.createElement("div");
  tasksDiv.setAttribute("id", "tasks-div");

  const taskFormContainer = document.querySelector(".form-container");
  taskFormContainer.style.display = "none";
  taskFormContainer.dataset.index = projectManager.getProjectIndex(project);
  projectContent.insertBefore(tasksDiv, taskFormContainer);

  taskDisplay(project, true);

  const hiddenInput = document.querySelector("#project");
  hiddenInput.value = project.getName();

  const taskBtn = taskButtonTemplate();
  projectContent.appendChild(taskBtn);
  taskBtn.addEventListener("click", () => {
    taskFormContainer.style.display = "flex";
    const formDateInput = document.querySelector("#dueDate");
    const adjustedTime = new Date();
    formDateInput.valueAsDate = adjustedTime;
  });

  const taskForm = document.querySelector("#task-form");
  const formCancel = document.querySelector("#task-form-cancel");
  formCancel.addEventListener("click", () => {
    taskFormContainer.style.display = "none";
    taskForm.reset();
  });

  const formSubmit = document.querySelector("#task-form-submit");
  formSubmit.removeEventListener("click", handleTaskFormSubmits);
  formSubmit.addEventListener("click", handleTaskFormSubmits);
};

// displays the bottom nav divs to the page
const displayBottomNavDivs = () => {
  const bottomNav = document.querySelector(".bottom-side-nav");
  const form = document.querySelector(".project-form");

  projectManager.getProjects().forEach((project, index) => {
    const projectDiv = bottomNavDivTemplate(project.name, index);
    bottomNav.insertBefore(projectDiv, form);

    projectDiv.addEventListener("click", (e) => {
      removeNotNeeded();
      displayBottomNavProjects(project);
      handleSelections(e);
    });

    const closeBtn = document.querySelector(`#close[data-index="${index}"]`);
    closeBtn.addEventListener("click", (e) => {
      e.stopPropagation();
      projectManager.deleteProject(index);
      saveStorage();
      clearBottomNavDivDisplay();
      displayBottomNavDivs();
    });
  });
};

const bottomNavStuff = (() => {
  const addProjectForm = document.querySelector(".project-form");
  const addProjectBtn = document.querySelector(".add-project-btn");

  addProjectBtn.addEventListener("click", () => {
    addProjectForm.style.display = "flex";
  });

  // add the cancel listener whenever the addProject button is clicked
  const formCancel = document.querySelector(".project-cancel-btn");
  formCancel.addEventListener("click", () => {
    addProjectForm.style.display = "none";
    addProjectForm.reset();
  });

  const formSubmit = document.querySelector(".project-submit-btn");
  formSubmit.addEventListener("click", () => {
    const project = projectFactory(projectName.value);
    projectManager.addProject(project);
    saveStorage();
    addProjectForm.reset();
    addProjectForm.style.display = "none";
    clearBottomNavDivDisplay();
    displayBottomNavDivs();
  });
})();

export { displayBottomNavDivs, bottomNavStuff };