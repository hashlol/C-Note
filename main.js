// console.log("This prints to the console of the page (injected only if the page url matched)");

// class UserData {
//   constructor() {
//     this.textDocuments = [];
//   }
// }

// class Main {
//   constructor() {
//     this.DOMInstance = new DOMElements();
//     this.courseApiInstance = new CourseNameApiCall();
//   }

//   async courseLoader() {
//     let dirtyData = await this.courseApiInstance.fetchDataWithCookie(
//       this.courseApiInstance.concatenatedCookies
//     );
//     this.DOMInstance.classList = this.courseApiInstance.cleanData(dirtyData);
//   }

//   mainEnsemble() {
//     this.DOMInstance.createAndPropagateDomElements();
//     this.courseLoader();
//   }
// }


$(document).ready(function() {
  const courseService = new CourseService();
  const app = new App($('#main'), courseService);
  // const runTime = new Main();
  // runTime.mainEnsemble();
});