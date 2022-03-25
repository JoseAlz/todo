// module for the object factories(tasks, projects) and the project manager

const taskFactory = (title, description, dueDate, important, finished) => {
    function changeFinished() {
      this.finished = this.finished !== true;
    }
  
    function changeImportance() {
      this.important = this.important !== true;
    }
  
    return {
      title,
      description,
      dueDate,
      important,
      finished,
      changeFinished,
      changeImportance,
    };
  };
  
  const projectFactory = (name) => {
    const tasks = [];
  
    function addTask(task) {
      tasks.push(task);
    }
  
    function getName() {
      return name;
    }
  
    function getTasks() {
      return tasks;
    }
  
    function deleteTask(index) {
      tasks.splice(index, 1);
    }
  
    function getTaskIndex(task) {
      return tasks.findIndex((element) => element === task);
    }
  
    // if i dont return tasks, the local storage wont save them???
    return {
      name,
      tasks,
      addTask,
      getName,
      getTasks,
      deleteTask,
      getTaskIndex,
    };
  };
  
  // this really helps to keep projects and tasks in one place for the all tasks,
  // today, and this week displays. as well as for having a centralized object that
  // contains all data to save to local storage.
  const projectManager = (() => {
    const projects = [];
  
    function getProjects() {
      return projects;
    }
  
    function addProject(project) {
      projects.push(project);
    }
  
    function deleteProject(index) {
      projects.splice(index, 1);
    }
  
    function getProjectIndex(project) {
      return projects.indexOf(project);
    }
  
    function getProject(projectName) {
      return projects.find((project) => project.getName() === projectName);
    }
  
    return {
      getProjects,
      addProject,
      deleteProject,
      getProjectIndex,
      getProject,
    };
  })();
  
  export { taskFactory, projectFactory, projectManager };