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