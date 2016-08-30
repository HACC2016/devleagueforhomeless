/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports) {

	"use strict";

	var MainContainer = React.createClass({
	  displayName: "MainContainer",

	  render: function render() {
	    return React.createElement(
	      "div",
	      { className: "mainContainer" },
	      React.createElement(
	        "h1",
	        null,
	        "Report Camp"
	      ),
	      React.createElement(
	        "form",
	        { className: "formContainer" },
	        React.createElement(
	          "div",
	          null,
	          "Location",
	          React.createElement("input", { type: "text", name: "location" })
	        ),
	        React.createElement(
	          "div",
	          null,
	          "Email",
	          React.createElement("input", { type: "text", name: "location" })
	        ),
	        React.createElement(
	          "div",
	          null,
	          "Phone Number",
	          React.createElement("input", { type: "text", name: "location" })
	        ),
	        React.createElement(
	          "button",
	          { type: "submit", className: "submitButton" },
	          "Submit"
	        )
	      ),
	      React.createElement("br", null),
	      React.createElement(
	        "p",
	        null,
	        " Mahalo for helping your community!"
	      )
	    );
	  }
	});

	ReactDOM.render(React.createElement(MainContainer, { url: "/", pollInterval: 2000 }), document.getElementById('app'));

/***/ }
/******/ ]);