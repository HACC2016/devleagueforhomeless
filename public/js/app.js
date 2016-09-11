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

	'use strict';

	var MainContainer = React.createClass({
	  displayName: 'MainContainer',

	  watchID: null,

	  getInitialState: function getInitialState() {
	    return {
	      initialPosition: 'unknown',
	      lastPosition: 'unknown'
	    };
	  },

	  componentDidMount: function componentDidMount() {
	    var _this = this;

	    console.log("yo");
	    navigator.geolocation.getCurrentPosition(function (position) {
	      console.log(position);
	      var initialPosition = JSON.stringify(position);
	      _this.setState({ initialPosition: initialPosition });
	    }, function (error) {
	      return alert(error.message);
	    }, { enableHighAccuracy: true, timeout: 20000, maximumAge: 1000 });
	    this.watchID = navigator.geolocation.watchPosition(function (position) {
	      var lastPosition = JSON.stringify(position);
	      _this.setState({ lastPosition: lastPosition });
	    });
	  },

	  componentWillUnmount: function componentWillUnmount() {
	    navigator.geolocation.clearWatch(this.watchID);
	  },

	  render: function render() {
	    return React.createElement(
	      'div',
	      { className: 'mainContainer' },
	      React.createElement(
	        'h1',
	        null,
	        'Report Camp!!'
	      ),
	      React.createElement('br', null),
	      React.createElement(
	        'form',
	        { className: 'form' },
	        React.createElement(
	          'div',
	          { className: 'location' },
	          React.createElement(
	            'label',
	            { htmlFor: 'location' },
	            'Location'
	          ),
	          React.createElement('input', {
	            type: 'text',
	            name: 'location',
	            placeholder: '1234 Street Name, City, State, Zipcode'
	          })
	        ),
	        React.createElement(
	          'div',
	          { className: 'email' },
	          React.createElement(
	            'label',
	            { htmlFor: 'email' },
	            'E-mail'
	          ),
	          React.createElement('input', {
	            type: 'text',
	            name: 'location',
	            placeholder: 'yourname@example.com'
	          })
	        ),
	        React.createElement(
	          'div',
	          { className: 'phone' },
	          React.createElement(
	            'label',
	            { htmlFor: 'phone' },
	            'Phone Number'
	          ),
	          React.createElement('input', {
	            type: 'text',
	            name: 'location',
	            placeholder: '(###) ###-####'
	          })
	        ),
	        React.createElement(
	          'div',
	          { className: 'description' },
	          React.createElement(
	            'label',
	            { htmlFor: 'description' },
	            'Description'
	          ),
	          React.createElement('textarea', {
	            name: 'description',
	            placeholder: 'Please write a detailed description of what you see.'
	          })
	        ),
	        React.createElement(
	          'button',
	          { type: 'submit', className: 'submit' },
	          'Submit'
	        )
	      ),
	      React.createElement('br', null),
	      React.createElement(
	        'p',
	        { className: 'mahalo' },
	        ' Mahalo for helping your community!'
	      )
	    );
	  }
	});

	ReactDOM.render(React.createElement(MainContainer, { url: '/', pollInterval: 2000 }), document.getElementById('app'));

/***/ }
/******/ ]);