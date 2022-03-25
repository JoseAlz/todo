import { format } from "date-fns";
import Plus from "./img/plus-sign-rectangle.svg";
import CloseImg from "./img/close-thick.svg";
import ProjectImg from "./img/project.svg";

// a new task button is created every time a project page is rendered
const taskButtonTemplate = () => {
  const plusSign = new Image();
  plusSign.src = Plus;

  const taskButton = document.createElement("div");
  taskButton.classList.add("default-task-button");
  taskButton.appendChild(plusSign);

  const text = document.createElement("p");
  text.textContent = "Add Task";
  taskButton.appendChild(text);

  return taskButton;
};

// a task description is created for each task on a page, hidden by default
// rendered on task click
const taskDescriptionTemplate = (task, idx) => {
  const taskDescription = document.createElement("div");
  taskDescription.classList.add("task-description");
  taskDescription.dataset.index = idx;

  const title = document.createElement("p");
  title.textContent = "Description: ";
  title.style.fontWeight = "bold";
  title.style.textDecoration = "underline";

  const desc = document.createElement("p");
  desc.textContent = task.description;
  desc.classList.add("description-para");

  taskDescription.appendChild(title);
  taskDescription.appendChild(desc);

  return taskDescription;
};

// a task template for each task on a project page
const taskTemplate = (task, idx) => {
  const templateDiv = document.createElement("div");
  templateDiv.classList.add("task-template");
  templateDiv.dataset.index = idx;

  // the src for these images will be decided when the project page
  // renders the tasks
  const uncheckedImg = new Image();
  uncheckedImg.dataset.index = idx;
  uncheckedImg.setAttribute("id", "check-img");
  templateDiv.appendChild(uncheckedImg);

  const starImg = new Image();
  starImg.dataset.index = idx;
  starImg.setAttribute("id", "star-img");
  templateDiv.appendChild(starImg);

  const nameText = document.createElement("p");
  nameText.textContent = task.title;
  templateDiv.appendChild(nameText);

  const rightSide = document.createElement("div");
  rightSide.classList.add("right-task");

  // so that the date is not just an empty Due: display, have it be empty when
  // there's no date in task object. format date displays to mm-dd-yyyy
  const date = document.createElement("p");
  date.setAttribute("id", "dateDisplay");
  if (task.dueDate === "") {
    date.textContent = "";
  } else {
    date.textContent = `Due: ${format(task.dueDate, "MM-dd-yyyy")}`;
  }
  rightSide.appendChild(date);

  const closeImg = new Image();
  closeImg.src = CloseImg;
  closeImg.dataset.index = idx;
  closeImg.setAttribute("id", "close-task");
  rightSide.appendChild(closeImg);

  templateDiv.appendChild(rightSide);

  return templateDiv;
};

// templates for the bottom nav divs, which display the project names and
// render the project page on click
const bottomNavDivTemplate = (name, idx) => {
  const projectDiv = document.createElement("div");
  projectDiv.classList.add("project-div");
  projectDiv.dataset.index = idx;

  const projectImg = new Image();
  projectImg.src = ProjectImg;
  projectDiv.appendChild(projectImg);

  const nameText = document.createElement("p");
  nameText.textContent = name;
  projectDiv.appendChild(nameText);

  const closeImg = new Image();
  closeImg.setAttribute("id", "close");
  closeImg.src = CloseImg;
  closeImg.dataset.index = idx;
  projectDiv.appendChild(closeImg);

  return projectDiv;
};

export {
  taskTemplate,
  taskButtonTemplate,
  taskDescriptionTemplate,
  bottomNavDivTemplate,
};