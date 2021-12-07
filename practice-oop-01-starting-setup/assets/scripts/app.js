class Component {
    constructor(hostElementId, insertBefore = false){
        if(hostElementId){
            this.hostElement = document.getElementById(hostElementId);
        } else {
            this.hostElement = document.body;
        }

        this.insertBefore = insertBefore;
    }

    detach() {
        if(this.element) {
            this.element.remove();
        }
    }

    attach() {
        this.hostElement.insertAdjacentElement(this.insertBefore ? 'beforebegin' : 'beforeend', 
            this.element
        );
    }
}

class Tooltip extends Component{
    constructor(closeNotifierFunction) {
        super('active-projects', true);
        this.closeNotifier = closeNotifierFunction;
        this.create();
    }

    closeTooltip = () =>  {
        this.detach();
        this.closeNotifier();
    }

    create() {
        const tooltipElem = document.createElement('div');
        tooltipElem.className = 'card';
        tooltipElem.textContent = 'Dummyy....';
        tooltipElem.addEventListener('click', this.closeTooltip);
        this.element = tooltipElem;
    }
}

class ProjectItem {
    hasActiveTooltip = false;

    constructor(id, updateProjectListsFunction, type){
        this.id = id;
        this.updateProjectListsHandler = updateProjectListsFunction;
        this.connectSwitchButton(type);
        this.connectMoreInfoButton();
    }

    connectMoreInfoButton() {
        const projItemElement = document.getElementById(this.id);
        const moreInfoBtn = projItemElement.querySelector('button:first-of-type');
        moreInfoBtn.addEventListener('click', this.showMoreInfoHandler);
    }

    showMoreInfoHandler() {
        if(this.hasActiveTooltip)
            return;
        const tooltip = new Tooltip(() => {this.hasActiveTooltip = false;});
        tooltip.attach();
        this.hasActiveTooltip = true;
    }

    connectSwitchButton(type) {
        const projItemElement = document.getElementById(this.id);
        let switchBtn = projItemElement.querySelector('button:last-of-type');
        switchBtn.textContent = type === 'active' ? 'Finish' : 'Activate';
        switchBtn = DOMHelper.clearEventListeners(switchBtn);
        switchBtn.addEventListener('click', this.updateProjectListsHandler.bind(null, this.id));
    }

    update(updateProjectListsFunction, type) {
        this.updateProjectListsHandler = updateProjectListsFunction;
        this.connectSwitchButton(type);
    }
}

class ProjectList {
    projects = [];

    constructor(type){
        this.type = type;
        const projItems = document.querySelectorAll(`#${type}-projects li`);
        for (const prjItem of projItems) {
            this.projects.push(new ProjectItem(prjItem.id, this.switchProject.bind(this), this.type));
        }
    }

    setSwitchHandlerFunction(switchHandlerFunction){
        this.switchHandler = switchHandlerFunction;
    }

    addProject(project) {
        this.projects.push(project);
        DOMHelper.moveElement(project.id, `#${this.type}-projects ul`)
        project.update(this.switchProject.bind(this), this.type);
    }

    switchProject(projectId) {
        this.switchHandler(this.projects.find(p => p.id === projectId));
        const projIndex = this.projects.findIndex(p => p.id === projectId);
        this.projects.splice(projIndex, 1);
    }
}

class DOMHelper {
    static moveElement(elementId, newDestinationSelector){
        const elem = document.getElementById(elementId);
        const newDest = document.querySelector(newDestinationSelector);
        newDest.append(elem);
    }

    static clearEventListeners(element) {
        const clonedElement = element.cloneNode(true);
        element.replaceWith(clonedElement);
        return clonedElement;
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