class Tooltip {}

class ProjectItem {
    constructor(id, updateProjectListsFunction){
        this.id = id;
        this.updateProjectListsHandler = updateProjectListsFunction;
        this.connectSwitchButton();
        this.connectMoreInfoButton();
    }

    connectMoreInfoButton() {}
    connectSwitchButton() {
        const projItemElement = document.getElementById(this.id);
        const switchBtn = projItemElement.querySelector('button:last-of-type');
        switchBtn.addEventListener('click', this.updateProjectListsHandler);
    }
}

class ProjectList {
    projects = [];

    constructor(type){
        this.type = type;
        const projItems = document.querySelectorAll(`#${type}-projects li`);
        for (const prjItem of projItems) {
            this.projects.push(new ProjectItem(prjItem.id, this.switchProject.bind(this)));
        }
    }

    setSwitchHandlerFunction(switchHandlerFunction){
        this.switchHandler = switchHandlerFunction;
    }

    addProject() {
        console.log(this.projects);
    }

    switchProject(projectId) {
        this.switchHandler(this.projects.find(p => p.id === projectId));
        const projIndex = this.projects.findIndex(p => p.id === projectId);
        this.projects.splice(projIndex, 1);
    }
}

class App {
    static init(){
        const activeProjectList = new ProjectList('active');
        const finishedProjectList = new ProjectList('finished');
        activeProjectList.setSwitchHandlerFunction(finishedProjectList.addProject.bind(finishedProjectList));
        finishedProjectList.setSwitchHandlerFunction(activeProjectList.addProject.bind(activeProjectList));
    }
}

App.init();