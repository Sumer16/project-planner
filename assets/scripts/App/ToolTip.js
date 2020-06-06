import { Component as Compo } from './Component.js';

export class ToolTip extends Compo{
  
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
