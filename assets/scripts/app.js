class DOMHelper {
  static clearEveListener(element) {
    const clonedEle = element.cloneNode(true);
    element.replaceWith(clonedEle);
    return clonedEle;
  }

  static moveElement(elementId, newDestSel) {
    const element = document.getElementById(elementId);
    const destElement = document.querySelector(newDestSel);
    destElement.append(element);
    element.scrollIntoView({behavior: 'smooth'});
  }
}

class Component {

  constructor(hostEleId, insertBef = false) {
    if(hostEleId) {
      this.hostEle = document.getElementById(hostEleId);
    } else {
      this.hostEle = document.body;
    }
    this.insertBef = insertBef;
  }

  remove() {
    if(this.element) {
      this.element.remove();
    }
  }

  show(){
    this.hostEle.insertAdjacentElement(this.insertBef ? 'afterbegin' : 'beforeend', this.element);
  }
}

class ToolTip extends Component{
  
  constructor(closeNotifyFun, text, hostElementId){
    super(hostElementId);
    this.closeNoti = closeNotifyFun;
    this.text = text;
    this.create();
  }

  closeToolTip() {
    this.remove();
    this.closeNoti();
  }

  create() {
    const toolTipEle = document.createElement('div');
    toolTipEle.className = 'card';
    const toolTipTemp = document.getElementById('tooltip');
    const toolTipBody = document.importNode(toolTipTemp.content, true);
    toolTipBody.querySelector('p').textContent = this.text;
    toolTipEle.append(toolTipBody);

    const hostElPosLeft = this.hostEle.offsetLeft;
    const hostElPosTop = this.hostEle.offsetTop;
    const hostElPosHeight = this.hostEle.clientHeight;
    const parentElScrolling = this.hostEle.parentElement.scrollTop;

    const x = hostElPosLeft + 20;
    const y = hostElPosTop + hostElPosHeight - parentElScrolling - 10;

    toolTipEle.style.position = 'absolute';
    toolTipEle.style.left = x + 'px';
    toolTipEle.style.top = y + 'px';

    toolTipEle.addEventListener('click', this.closeToolTip.bind(this));
    this.element = toolTipEle;
  }
}

class ProjectItem {

  hasActiveToolTip = false;

  constructor (id, updateProjListFunc, type) {
    this.id = id;
    this.updateProjList = updateProjListFunc;
    this.connectMoreInfoBtn();
    this.connectSwitchBtn(type);
    this.connectDrag();
  }

  showMoreInfoHandler(){
    if(this.hasActiveToolTip) {
      return;
    }
    const projElement = document.getElementById(this.id);
    const toolTipText = projElement.dataset.extraInfo;
    const tooltip = new ToolTip(() => {this.hasActiveToolTip = false}, toolTipText, this.id);
    tooltip.show();
    this.hasActiveToolTip = true;
  }

  connectDrag() {
    const item = document.getElementById(this.id);
    item.addEventListener('dragstart', event => {
      event.dataTransfer.setData('text/plain', this.id);
      event.dataTransfer.effectAllowed = 'move';
    });
    item.addEventListener('dragged', event => {
      console.log(event);
    });
  }

  connectMoreInfoBtn(){
    const projItemElem = document.getElementById(this.id);
    const moreinfoBtn = projItemElem.querySelector('button:first-of-type');
    moreinfoBtn.addEventListener('click', this.showMoreInfoHandler.bind(this));
  }

  connectSwitchBtn(type){
    const projItemElem = document.getElementById(this.id);
    let switchBtn = projItemElem.querySelector('button:last-of-type');
    switchBtn = DOMHelper.clearEveListener(switchBtn);
    switchBtn.textContent = type === 'active' ? 'Finish' : 'Activate';
    switchBtn.addEventListener('click', this.updateProjList.bind(null, this.id));
  }

  update(updateProjListFn, type){
    this.updateProjList = updateProjListFn;
    this.connectSwitchBtn(type);
  }
}

class ProjectList {
  projects = [];

  constructor(type){
    this.type = type;

    const projItems = document.querySelectorAll(`#${type}-projects li`);
    for (const projItem of projItems) {
      this.projects.push(new ProjectItem(projItem.id, this.switchProject.bind(this), this.type));
    }
    console.log(this.projects);
    this.connectDroppable();
  }

  connectDroppable() {
    const list = document.querySelector(`#${this.type}-projects ul`);

    list.addEventListener('dragenter', event => {
      if(event.dataTransfer.types[0] === 'text/plain'){
        list.parentElement.classList.add('droppable');
        event.preventDefault();
      }
    });

    list.addEventListener('dragover', event => {
      if(event.dataTransfer.types[0] === 'text/plain'){
        event.preventDefault();
      }
    });

    list.addEventListener('dragleave', event => {
      if(event.relatedTarget.closest(`#${this.type}-projects ul`) !== list) {
        list.parentElement.classList.remove('droppable');
      }
    });

    list.addEventListener('drop', event => {
      const prjId = event.dataTransfer.getData('text/plain');
      if(this.projects.find(p => p.id === prjId)){
        return;
      }
      document.getElementById(prjId).querySelector('button:last-of-type').click();
      list.parentElement.classList.remove('droppable');
      event.preventDefault();
    });
  }

  setSwitchHandler (switchHanFunction) {
    this.switchHanFun = switchHanFunction;
  }

  addProject(project) {
    this.projects.push(project);
    DOMHelper.moveElement(project.id, `#${this.type}-projects ul`);
    project.update(this.switchProject.bind(this), this.type);
  }

  switchProject(pId) {
    // const projIndex = this.projects.findIndex( p => p.id === pId);
    // this.projects.splice(projIndex, 1);
    this.switchHanFun(this.projects.find(p => p.id === pId));
    this.projects = this.projects.filter(p => p.id !== pId);
  }
}

class App {
  static init() {
    const activeProjLst = new ProjectList('active');
    const finishedProjLst = new ProjectList('finished');
    activeProjLst.setSwitchHandler(finishedProjLst.addProject.bind(finishedProjLst));
    finishedProjLst.setSwitchHandler(activeProjLst.addProject.bind(activeProjLst));

    // setTimeout( this.startAnalytics, 5000);
  }

  static startAnalytics() {
    const analyticScript = document.createElement('script');
    analyticScript.src = 'assets/scripts/Utility/analytics.js';
    analyticScript.defer = true;
    document.head.append(analyticScript);
  }
}

App.init();