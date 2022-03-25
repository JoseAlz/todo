import { projectManager } from "./objStuff";
import { taskTemplate, taskDescriptionTemplate } from "./divTemplates";
import { clearTasks, saveStorage } from "./helpers";
import GreenCheck from "./img/green-checkbox.svg";
import Unchecked from "./img/unchecked.svg";
import StarOutline from "./img/starOutline.svg";
import StarFilled from "./img/starFilled.svg";

// runs when the project page being displayed belongs to the bottom nav
// attaches a different listener than the top display
const bottomCloseBtnListener = (project, index) => {
  const closeTaskImg = document.querySelector(
    `#close-task[data-index="${index}"]`
  );
  closeTaskImg.addEventListener("click", (e) => {
    e.stopPropagation();
    project.deleteTask(index);
    saveStorage();
    clearTasks();
    taskDisplay(project, true);
  });
};

// since the top nav displays are in seperate projects, I have to find the tasks
// in their original projects whenever the task is deleted. Therefore i have 2
// seperate functions to handle these 2 scenarios
const topCloseBtnListener = (project, task, index) => {
  const closeTaskImg = document.querySelector(
    `#close-task[data-index="${index}"]`
  );
  closeTaskImg.addEventListener("click", (e) => {
    e.stopPropagation();
    projectManager.getProjects().forEach((pmProject) => {
      pmProject.getTasks().forEach((projTask) => {
        if (projTask === task) {
          pmProject.deleteTask(pmProject.getTaskIndex(projTask));
          clearTasks();
          project.deleteTask(index);
          saveStorage();
          taskDisplay(project);
        }
      });
    });
  });
};

// handles tasks displays for both nop nav buttons and bottom nav buttons
// each task with their own listener for all 3 of their buttons
const taskDisplay = (project, bottom = false) => {
  const tasksDiv = document.querySelector("#tasks-div");
  project.getTasks().forEach((task, index) => {
    const taskDiv = taskTemplate(task, index);
    tasksDiv.appendChild(taskDiv);

    const descriptionDiv = taskDescriptionTemplate(task, index);
    tasksDiv.appendChild(descriptionDiv);

    const checkImg = document.querySelector(
      `#check-img[data-index="${index}"]`
    );
    if (task.finished === true) {
      checkImg.src = GreenCheck;
    } else {
      checkImg.src = Unchecked;
    }

    const starImg = document.querySelector(`#star-img[data-index="${index}"]`);
    if (task.important === true) {
      starImg.src = StarFilled;
    } else {
      starImg.src = StarOutline;
    }

    taskDiv.addEventListener("click", () => {
      descriptionDiv.style.display =
        getComputedStyle(descriptionDiv).display === "none" ? "flex" : "none";
    });

    checkImg.addEventListener("click", (e) => {
      e.stopPropagation();
      checkImg.src = checkImg.src === GreenCheck ? Unchecked : GreenCheck;
      task.changeFinished();
      saveStorage();
    });

    starImg.addEventListener("click", (e) => {
      e.stopPropagation();
      starImg.src = starImg.src === StarFilled ? StarOutline : StarFilled;
      task.changeImportance();
      saveStorage();
    });

    if (bottom) {
      bottomCloseBtnListener(project, index);
    } else {
      topCloseBtnListener(project, task, index);
    }
  });
};

export default taskDisplay;