"use strict";
/*
 * ATTENTION: An "eval-source-map" devtool has been used.
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file with attached SourceMaps in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
self["webpackHotUpdateevents_01_starting_setup"]("main",{

/***/ "./src/app.js":
/*!********************!*\
  !*** ./src/app.js ***!
  \********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var lodash__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! lodash */ \"./node_modules/lodash/lodash.js\");\n/* harmony import */ var lodash__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(lodash__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var _App_ProjectList__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./App/ProjectList */ \"./src/App/ProjectList.js\");\n/* eslint-disable linebreak-style */\n\n\n\nconsole.log(lodash__WEBPACK_IMPORTED_MODULE_0__.difference([1,2,3], [1,2]));\n\nclass App {\n  static init() {\n    const activeProjectsList = new _App_ProjectList__WEBPACK_IMPORTED_MODULE_1__.ProjectList('active');\n    const finishedProjectsList = new _App_ProjectList__WEBPACK_IMPORTED_MODULE_1__.ProjectList('finished');\n    activeProjectsList.setSwitchHandlerFunction(\n      finishedProjectsList.addProject.bind(finishedProjectsList)\n    );\n    finishedProjectsList.setSwitchHandlerFunction(\n      activeProjectsList.addProject.bind(activeProjectsList)\n    );\n\n    // const timerId = setTimeout(this.startAnalytics, 3000);\n\n    // document.getElementById('stop-analytics-btn').addEventListener('click', () => {\n    //   clearTimeout(timerId);\n    // });\n  }\n\n  static startAnalytics() {\n    const analyticsScript = document.createElement('script');\n    analyticsScript.src = 'assets/scripts/Utility/Analytics';\n    analyticsScript.defer = true;\n    document.head.append(analyticsScript);\n  }\n}\n\nApp.init();\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiLi9zcmMvYXBwLmpzLmpzIiwibWFwcGluZ3MiOiI7Ozs7QUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9ldmVudHMtMDEtc3RhcnRpbmctc2V0dXAvLi9zcmMvYXBwLmpzPzExMTIiXSwic291cmNlc0NvbnRlbnQiOlsiLyogZXNsaW50LWRpc2FibGUgbGluZWJyZWFrLXN0eWxlICovXG5pbXBvcnQgKiBhcyBfIGZyb20gJ2xvZGFzaCc7XG5pbXBvcnQge1Byb2plY3RMaXN0fSBmcm9tICcuL0FwcC9Qcm9qZWN0TGlzdCc7XG5cbmNvbnNvbGUubG9nKF8uZGlmZmVyZW5jZShbMSwyLDNdLCBbMSwyXSkpO1xuXG5jbGFzcyBBcHAge1xuICBzdGF0aWMgaW5pdCgpIHtcbiAgICBjb25zdCBhY3RpdmVQcm9qZWN0c0xpc3QgPSBuZXcgUHJvamVjdExpc3QoJ2FjdGl2ZScpO1xuICAgIGNvbnN0IGZpbmlzaGVkUHJvamVjdHNMaXN0ID0gbmV3IFByb2plY3RMaXN0KCdmaW5pc2hlZCcpO1xuICAgIGFjdGl2ZVByb2plY3RzTGlzdC5zZXRTd2l0Y2hIYW5kbGVyRnVuY3Rpb24oXG4gICAgICBmaW5pc2hlZFByb2plY3RzTGlzdC5hZGRQcm9qZWN0LmJpbmQoZmluaXNoZWRQcm9qZWN0c0xpc3QpXG4gICAgKTtcbiAgICBmaW5pc2hlZFByb2plY3RzTGlzdC5zZXRTd2l0Y2hIYW5kbGVyRnVuY3Rpb24oXG4gICAgICBhY3RpdmVQcm9qZWN0c0xpc3QuYWRkUHJvamVjdC5iaW5kKGFjdGl2ZVByb2plY3RzTGlzdClcbiAgICApO1xuXG4gICAgLy8gY29uc3QgdGltZXJJZCA9IHNldFRpbWVvdXQodGhpcy5zdGFydEFuYWx5dGljcywgMzAwMCk7XG5cbiAgICAvLyBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnc3RvcC1hbmFseXRpY3MtYnRuJykuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCAoKSA9PiB7XG4gICAgLy8gICBjbGVhclRpbWVvdXQodGltZXJJZCk7XG4gICAgLy8gfSk7XG4gIH1cblxuICBzdGF0aWMgc3RhcnRBbmFseXRpY3MoKSB7XG4gICAgY29uc3QgYW5hbHl0aWNzU2NyaXB0ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnc2NyaXB0Jyk7XG4gICAgYW5hbHl0aWNzU2NyaXB0LnNyYyA9ICdhc3NldHMvc2NyaXB0cy9VdGlsaXR5L0FuYWx5dGljcyc7XG4gICAgYW5hbHl0aWNzU2NyaXB0LmRlZmVyID0gdHJ1ZTtcbiAgICBkb2N1bWVudC5oZWFkLmFwcGVuZChhbmFseXRpY3NTY3JpcHQpO1xuICB9XG59XG5cbkFwcC5pbml0KCk7XG4iXSwibmFtZXMiOltdLCJzb3VyY2VSb290IjoiIn0=\n//# sourceURL=webpack-internal:///./src/app.js\n");

/***/ })

},
/******/ function(__webpack_require__) { // webpackRuntimeModules
/******/ /* webpack/runtime/getFullHash */
/******/ (() => {
/******/ 	__webpack_require__.h = () => ("14b98a4a9d16174365fb")
/******/ })();
/******/ 
/******/ }
);