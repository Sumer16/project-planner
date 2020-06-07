export class Component {

  constructor(hostEleId, insertBef = false) {
    if (hostEleId) {
      this.hostEle = document.getElementById(hostEleId);
    } else {
      this.hostEle = document.body;
    }
    this.insertBef = insertBef;
  }

  remove() {
    if (this.element) {
      this.element.remove();
    }
  }

  show() {
    this.hostEle.insertAdjacentElement(this.insertBef ? 'afterbegin' : 'beforeend', this.element);
  }
}