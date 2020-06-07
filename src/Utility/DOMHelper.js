export default class {
  static clearEveListener(element) {
    const clonedEle = element.cloneNode(true);
    element.replaceWith(clonedEle);

return clonedEle;
  }

  static moveElement(elementId, newDestSel) {
    const element = document.getElementById(elementId);
    const destElement = document.querySelector(newDestSel);
    destElement.append(element);
    element.scrollIntoView({ behavior: 'smooth' });
  }
}