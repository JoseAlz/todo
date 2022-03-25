import { projectManager, projectFactory, taskFactory } from "./objStuff";
import { allTasksDisplay } from "./topNavStuff";
import { displayBottomNavDivs } from "./bottomNavStuff";
import "./style.css";

// projects in local storage are first created using the projectFactory, then each
// of their tasks are created, then finally they are added to the project manager and
// their nav divs rendered as well as the all tasks homepage
const load = () => {
  if (!localStorage.getItem("projects")) {
    allTasksDisplay();
  } else {
    let projects = localStorage.getItem("projects");

    projects = JSON.parse(projects);

    projects.forEach((project) => {
      const proj = projectFactory(project.name);

      project.tasks.forEach((task) => {
        const tsk = taskFactory(
          task.title,
          task.description,
          new Date(task.dueDate),
          task.important,
          task.finished
        );
        proj.addTask(tsk);
      });

      projectManager.addProject(proj);
    });
  }
  displayBottomNavDivs();
  allTasksDisplay();
};

load();