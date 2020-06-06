import { ProjectItem } from './ProjectItem.js';
import DOMH from '../Utility/DOMHelper.js';

export class ProjectList {
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
    DOMH.moveElement(project.id, `#${this.type}-projects ul`);
    project.update(this.switchProject.bind(this), this.type);
  }

  switchProject(pId) {
    // const projIndex = this.projects.findIndex( p => p.id === pId);
    // this.projects.splice(projIndex, 1);
    this.switchHanFun(this.projects.find(p => p.id === pId));
    this.projects = this.projects.filter(p => p.id !== pId);
  }
}