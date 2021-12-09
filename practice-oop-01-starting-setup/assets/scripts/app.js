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
    constructor(closeNotifierFunction, tooltipText, hostElementId) {
        super(hostElementId);
        this.closeNotifier = closeNotifierFunction;
        this.text = tooltipText;
        this.create();
    }

    closeTooltip = () =>  {
        this.detach();
        this.closeNotifier();
    }

    create() {
        const tooltipElem = document.createElement('div');
        tooltipElem.className = 'card';
        
        const tooltipTemplate = document.getElementById('tooltip');
        const tooltipBody = document.importNode(tooltipTemplate.content, true);
        const tooltipParagraph = tooltipBody.querySelector('p');
        tooltipParagraph.textContent = this.text;
        tooltipElem.append(tooltipBody);

        const hostElemPosLeft = this.hostElement.offsetLeft;
        const hostElemPosTop = this.hostElement.offsetTop;
        const hostElHeight = this.hostElement.clientHeight;
        const parentElementScrolling = this.hostElement.parentElement.scrollTop;

        const x = hostElemPosLeft + 20;
        const y = hostElemPosTop + hostElHeight - parentElementScrolling - 10;

        tooltipElem.style.position = 'absolute';
        tooltipElem.style.left = x + 'px';
        tooltipElem.style.top = y + 'px';

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
        moreInfoBtn.addEventListener('click', this.showMoreInfoHandler.bind(this));
    }

    showMoreInfoHandler() {
        if(this.hasActiveTooltip)
            return;

        const projElement = document.getElementById(this.id);
        const tooltipText = projElement.dataset.extraInfo
        const tooltip = new Tooltip(() =>
         {
             this.hasActiveTooltip = false;
          }, tooltipText, this.id);
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
        elem.scrollIntoView({behavior: 'smooth'});
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

       const timerId = setTimeout(this.startAnaitics, 3000);

       document.getElementById('clearTimeoutBtn').addEventListener('click', ()=>{
            clearTimeout(timerId);
       });
    }

    static startAnaitics() {
        const analyticsScript = document.createElement('script');
        analyticsScript.src = 'assets/scripts/analytics.js';
        analyticsScript.defer = true;
        document.head.append(analyticsScript);
    }
}

App.init();