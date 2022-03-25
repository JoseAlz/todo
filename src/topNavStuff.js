import isSameDay from "date-fns/isSameDay";
import isSameWeek from "date-fns/isSameWeek";
import { projectFactory, projectManager } from "./objStuff";
import { handleSelections, removeNotNeeded } from "./helpers";
import taskDisplay from "./taskDisplay";

// sets up the page to prepare for displaying tasks
const topNavDisplayHandler = (project) => {
  const content = document.querySelector(".task-content");

  document.querySelector(".task-heading").textContent = project.name;

  const tasksDiv = document.createElement("div");
  tasksDiv.setAttribute("id", "tasks-div");

  const formContainer = document.querySelector(".form-container");
  content.insertBefore(tasksDiv, formContainer);

  taskDisplay(project);
};

// sets up the all tasks project using project manager
const allTasksDisplay = () => {
  const allTasksProject = projectFactory("All Tasks");

  projectManager.getProjects().forEach((project) => {
    project.getTasks().forEach((task) => allTasksProject.addTask(task));
  });

  topNavDisplayHandler(allTasksProject);
};

// sets up the today tasks project using project manager
const todayTasksDisplay = () => {
  const today = new Date();
  const todayTasksProject = projectFactory("Today");

  projectManager.getProjects().forEach((project) => {
    project.getTasks().forEach((task) => {
      if (isSameDay(today, task.dueDate)) {
        todayTasksProject.addTask(task);
      }
    });
  });

  topNavDisplayHandler(todayTasksProject);
};

// sets up this weeks tasks project
const thisWeeksDisplay = () => {
  const today = new Date();
  const thisWeeksProject = projectFactory("This Week");

  projectManager.getProjects().forEach((project) => {
    project.getTasks().forEach((task) => {
      if (isSameWeek(today, task.dueDate)) {
        thisWeeksProject.addTask(task);
      }
    });
  });

  topNavDisplayHandler(thisWeeksProject);
};

// sets up the important tasks project
const importantTasksDisplay = () => {
  const importantTasksProject = projectFactory("Important");

  projectManager.getProjects().forEach((project) => {
    project.getTasks().forEach((task) => {
      if (task.important === true) {
        importantTasksProject.addTask(task);
      }
    });
  });

  topNavDisplayHandler(importantTasksProject);
};

// event listeners for each topNav div
const topNavStuff = (() => {
  const allTaskBtn = document.querySelector(".all-tasks");
  const todayTaskBtn = document.querySelector(".today");
  const weekTaskBtn = document.querySelector(".week");
  const importantTaskBtn = document.querySelector(".important");

  allTaskBtn.addEventListener("click", (e) => {
    removeNotNeeded();

    allTasksDisplay();
    handleSelections(e);
  });

  todayTaskBtn.addEventListener("click", (e) => {
    removeNotNeeded();

    todayTasksDisplay();
    handleSelections(e);
  });

  weekTaskBtn.addEventListener("click", (e) => {
    removeNotNeeded();

    thisWeeksDisplay();
    handleSelections(e);
  });

  importantTaskBtn.addEventListener("click", (e) => {
    removeNotNeeded();

    importantTasksDisplay();
    handleSelections(e);
  });
})();

export { topNavStuff, allTasksDisplay };
