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