import { ProjectList } from './App/ProjectList.js';

class App {
  static init() {
    const activeProjLst = new ProjectList('active');
    const finishedProjLst = new ProjectList('finished');
    activeProjLst.setSwitchHandler(finishedProjLst.addProject.bind(finishedProjLst));
    finishedProjLst.setSwitchHandler(activeProjLst.addProject.bind(activeProjLst));
  }

  static startAnalytics() {
    const analyticScript = document.createElement('script');
    analyticScript.src = './Utility/Analytics.js';
    analyticScript.defer = true;
    document.head.append(analyticScript);
  }
}

App.init();