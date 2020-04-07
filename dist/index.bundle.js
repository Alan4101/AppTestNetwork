/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./public/js/index.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./public/js/index.js":
/*!****************************!*\
  !*** ./public/js/index.js ***!
  \****************************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _style_style_scss__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../style/style.scss */ \"./public/style/style.scss\");\n/* harmony import */ var _style_style_scss__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_style_style_scss__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var _insertDataInDB__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./insertDataInDB */ \"./public/js/insertDataInDB.js\");\n/* harmony import */ var _script__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./script */ \"./public/js/script.js\");\n\n\n\nconsole.log('index.js');\n\n//# sourceURL=webpack:///./public/js/index.js?");

/***/ }),

/***/ "./public/js/insertDataInDB.js":
/*!*************************************!*\
  !*** ./public/js/insertDataInDB.js ***!
  \*************************************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _rest__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./rest */ \"./public/js/rest.js\");\n/* harmony import */ var _message__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./message */ \"./public/js/message.js\");\n\n\n\n\nvar fillDatabase = document.querySelector('#fillDB');\n/*button for insert database*/\n\nif (window.location.pathname == '/') {\n  /*function*/\n\n  /* checking create or not database / disabled button*/\n  (function () {\n    if (window.localStorage.length > 0) {\n      fillDatabase.setAttribute('disabled', 'true');\n    } else {\n      fillDatabase.removeAttribute('disabled');\n    }\n  })();\n  /*handlers*/\n\n  /* filling/create database */\n\n\n  fillDatabase.addEventListener('click', function (e) {\n    window.localStorage.setItem('flag', 'true');\n    var isFillDb = JSON.stringify({\n      flag: window.localStorage.getItem('flag')\n    });\n    Object(_rest__WEBPACK_IMPORTED_MODULE_0__[\"Post\"])('/profile/users', isFillDb).then(function (res) {\n      window.localStorage.setItem('flag', 'false');\n      e.target.setAttribute(res, \"true\");\n      Object(_message__WEBPACK_IMPORTED_MODULE_1__[\"Message\"])('Success', 'Successful filling database.', false);\n    })[\"catch\"](function (err) {\n      console.log(err);\n    });\n  }, false);\n}\n\n//# sourceURL=webpack:///./public/js/insertDataInDB.js?");

/***/ }),

/***/ "./public/js/message.js":
/*!******************************!*\
  !*** ./public/js/message.js ***!
  \******************************/
/*! exports provided: Message */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"Message\", function() { return Message; });\n\n\nfunction Message(header, msg, err) {\n  var div = document.createElement('div');\n  div.classList.add('msg-body');\n  div.innerHTML = \"<h5>\".concat(header, \"</h5><p>\").concat(msg, \"</p>\");\n  document.body.appendChild(div);\n  setInterval(function () {\n    div.style.opacity = 0;\n  }, 2000);\n  div.addEventListener('mouseenter', function () {\n    return div.style.opacity = 0;\n  });\n\n  if (err) {\n    div.style.background = '#e57373';\n  } else {\n    div.style.background = \"#4285F4\";\n  }\n}\n\n//# sourceURL=webpack:///./public/js/message.js?");

/***/ }),

/***/ "./public/js/rest.js":
/*!***************************!*\
  !*** ./public/js/rest.js ***!
  \***************************/
/*! exports provided: Get, Post */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"Get\", function() { return Get; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"Post\", function() { return Post; });\n\n\nfunction Get(url) {\n  return new Promise(function (success, fail) {\n    var req = new XMLHttpRequest();\n    req.open('GET', url, true);\n    req.addEventListener('load', function () {\n      req.status < 400 ? success(req.responseText) : fail(new Error(\"Request failed: \".concat(req.status, \" \")));\n    });\n    req.addEventListener('error', function () {\n      fail(new Error(\"Network error\"));\n    });\n    req.send();\n  });\n}\nfunction Post(url, reqBody) {\n  return new Promise(function (success, fail) {\n    var req = new XMLHttpRequest();\n    req.open(\"POST\", url, true); // req.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');\n\n    req.setRequestHeader('Content-Type', 'application/json; charset=utf-8');\n    req.addEventListener('load', function () {\n      req.status < 400 ? success(req.responseText) : fail(new Error('Request failed: ' + req.status));\n    });\n    req.addEventListener('error', function () {\n      fail(new Error(\"network error!\"));\n    });\n    req.send(reqBody);\n  });\n}\n\n//# sourceURL=webpack:///./public/js/rest.js?");

/***/ }),

/***/ "./public/js/script.js":
/*!*****************************!*\
  !*** ./public/js/script.js ***!
  \*****************************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _rest__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./rest */ \"./public/js/rest.js\");\n/* harmony import */ var _message__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./message */ \"./public/js/message.js\");\nconsole.log('script.js..');\n'use strict';\n\n\n\n/* variables */\n\nvar loginBtn = document.querySelector('.sign-in__btn-submit');\nvar tabcontent = document.querySelectorAll(\".tabs-content\");\nvar tablinks = document.querySelectorAll(\".container-nav__links\");\nvar tabUser = document.querySelector('#tabUser');\nvar tabFriend = document.querySelector('#tabFriend');\nvar divUsers = document.querySelector('.user-block__list');\nvar friendsBlock = document.querySelector('.frd-frd_list');\nvar incomingBlock = document.querySelector('.pd-rq_ind');\nvar outgoingBlock = document.querySelector('.pd-rq_out');\nvar outgoingBlock2 = document.querySelector('.usr-block-o');\nvar friendsBlock2 = document.querySelector('.usr-block-f');\n/* functions */\n\n/*insert data from database*/\n\nfunction InsertUsersToPage(data, to, btn, msg) {\n  var users = JSON.parse(data);\n  users.map(function (user) {\n    var div = \"<li class=\\\"user-block__item user-item\\\" >\\n                        <div class=\\\"user-item__block\\\">\\n                            <img class=\\\"user-item__picture\\\" src=\\\"\".concat(user.icon, \"\\\" alt=\\\"\").concat(user._id, \"\\\">\\n                            <p class=\\\"user-item__name\\\">\").concat(user.name, \" </p>\\n                            <p class=\\\"status-message\\\">\").concat(msg ? msg : '', \"</p>\\n                        </div>\\n                        <button data-id=\\\"\").concat(user._id, \"\\\" class=\\\"user-item__bnt\\\">\").concat(btn, \"</button>\\n                    </li>\");\n    to.insertAdjacentHTML('beforeend', div);\n  });\n}\n\nfunction InsertToIncomingBlock(data, to) {\n  var users = JSON.parse(data);\n  users.map(function (user) {\n    var div = \"<li class=\\\"user-block__item user-item\\\" >\\n                        <div class=\\\"user-item__block\\\">\\n                            <img class=\\\"user-item__picture\\\" src=\\\"\".concat(user.icon, \"\\\" alt=\\\"\").concat(user._id, \"\\\">\\n                            <p class=\\\"user-item__name\\\">\").concat(user.name, \" </p>\\n                        </div>\\n                        <button data-id=\\\"\").concat(user._id, \"\\\" class=\\\"user-item__bnt ignore\\\">Ignore</button>\\n                        <button data-id=\\\"\").concat(user._id, \"\\\" class=\\\"user-item__bnt accept\\\">Accept</button>\\n                    </li>\");\n    to.insertAdjacentHTML('beforeend', div);\n  });\n}\n/* handlers */\n\n\nif (window.location.pathname == '/profile') {\n  /*****METHODS******/\n\n  /*get all user and insert from page*/\n  Object(_rest__WEBPACK_IMPORTED_MODULE_0__[\"Get\"])('/profile/people').then(function (data) {\n    return InsertUsersToPage(data, divUsers, 'Add Friend');\n  })[\"catch\"](function (error) {\n    return console.log(error);\n  });\n  /*get all friends*/\n\n  Object(_rest__WEBPACK_IMPORTED_MODULE_0__[\"Get\"])(\"/profile/friends\").then(function (users) {\n    console.log('remove fri');\n    InsertUsersToPage(users, friendsBlock, 'Remove friend', \"friend\");\n    InsertUsersToPage(users, friendsBlock2, 'Remove friend', \"friend\");\n  })[\"catch\"](function (error) {\n    return console.log(error);\n  });\n  /*get all incoming req*/\n\n  Object(_rest__WEBPACK_IMPORTED_MODULE_0__[\"Get\"])(\"/profile/friendin\").then(function (data) {\n    return InsertToIncomingBlock(data, incomingBlock);\n  })[\"catch\"](function (error) {\n    return console.log(error);\n  });\n  Object(_rest__WEBPACK_IMPORTED_MODULE_0__[\"Get\"])(\"/profile/friendout\").then(function (data) {\n    InsertUsersToPage(data, outgoingBlock, 'Cancel request', 'pending request');\n    InsertUsersToPage(data, outgoingBlock2, 'Cancel request', 'pending request');\n  })[\"catch\"](function (error) {\n    return console.log(error);\n  });\n  document.querySelector('#search').addEventListener('keyup', function () {\n    Object(_rest__WEBPACK_IMPORTED_MODULE_0__[\"Get\"])('/profile/search?q=' + this.value).then(function (data) {\n      console.log(data);\n      outgoingBlock2.remove();\n      friendsBlock2.remove();\n      divUsers.innerHTML = '';\n      InsertUsersToPage(data, divUsers, 'Add Friend');\n    });\n  }, false);\n  /******END METHODS*****/\n\n  /*add to friend request*/\n\n  divUsers.addEventListener('click', function (e) {\n    if (e.target.tagName === \"BUTTON\") {\n      var state = JSON.stringify({\n        recipient_id: e.target.getAttribute('data-id'),\n        status: 'request_sent'\n      });\n      Object(_rest__WEBPACK_IMPORTED_MODULE_0__[\"Post\"])('/profile/people', state).then(function (action) {\n        if (action == 'request_sent') {\n          e.target.innerHTML = 'Cancel request';\n          e.target.previousElementSibling.children[2].innerHTML = \"req sending\";\n          Object(_message__WEBPACK_IMPORTED_MODULE_1__[\"Message\"])(\"Success\", \"Request successfully sent\", false);\n          setTimeout(function () {\n            e.target.parentNode.remove();\n          }, 2000);\n        } else if (action == 'cancel') {\n          e.target.innerHTML = 'Add friend';\n          Object(_message__WEBPACK_IMPORTED_MODULE_1__[\"Message\"])(\"Success\", \"Request successfully cancel\", true);\n          setTimeout(function () {\n            e.target.parentNode.remove();\n          }, 2000);\n        }\n      });\n    }\n  }, false);\n  /* remove from friend */\n\n  friendsBlock.addEventListener('click', function (e) {\n    if (e.target.tagName === \"BUTTON\") {\n      var state = JSON.stringify({\n        id_rep: e.target.getAttribute('data-id'),\n        status: 'removed'\n      });\n      console.log(state);\n      Object(_rest__WEBPACK_IMPORTED_MODULE_0__[\"Post\"])('/profile/friend', state).then(function (data) {\n        Object(_message__WEBPACK_IMPORTED_MODULE_1__[\"Message\"])(\"Removed\", \"User succesufully removed\", false);\n        setTimeout(function () {\n          e.target.parentNode.remove();\n        }, 2000);\n        console.log(data);\n      })[\"catch\"](function (err) {\n        return console.log(err);\n      });\n    }\n  }, false);\n  friendsBlock2.addEventListener('click', function (e) {\n    if (e.target.tagName === \"BUTTON\") {\n      var state = JSON.stringify({\n        id_rep: e.target.getAttribute('data-id'),\n        status: 'removed'\n      });\n      console.log(state);\n      Object(_rest__WEBPACK_IMPORTED_MODULE_0__[\"Post\"])('/profile/friend', state).then(function (data) {\n        Object(_message__WEBPACK_IMPORTED_MODULE_1__[\"Message\"])(\"Removed\", \"User succesufully removed\", false);\n        setTimeout(function () {\n          e.target.parentNode.remove();\n        }, 2000);\n        console.log(data);\n      })[\"catch\"](function (err) {\n        return console.log(err);\n      });\n    }\n  }, false);\n  /* select incoming block accept/ignore*/\n\n  incomingBlock.addEventListener('click', function (e) {\n    if (e.target.tagName === \"BUTTON\" && e.target.classList.contains('ignore')) {\n      var state = JSON.stringify({\n        id_rep: e.target.getAttribute('data-id'),\n        status: 'ignore'\n      });\n      console.log(state);\n      Object(_rest__WEBPACK_IMPORTED_MODULE_0__[\"Post\"])('/profile/friendin', state).then(function (data) {\n        Object(_message__WEBPACK_IMPORTED_MODULE_1__[\"Message\"])(\"Removed\", \"Request succesufully removed\", false);\n        setTimeout(function () {\n          e.target.parentNode.remove();\n        }, 2000);\n        console.log(data);\n      })[\"catch\"](function (err) {\n        return console.log(err);\n      });\n    } else if (e.target.tagName === \"BUTTON\" && e.target.classList.contains('accept')) {\n      var _state = JSON.stringify({\n        id_rep: e.target.getAttribute('data-id'),\n        status: 'accept'\n      });\n\n      Object(_rest__WEBPACK_IMPORTED_MODULE_0__[\"Post\"])('/profile/friendin', _state).then(function (data) {\n        Object(_message__WEBPACK_IMPORTED_MODULE_1__[\"Message\"])(\"Accept\", \"Request succesufully accepted\", false);\n        setTimeout(function () {\n          e.target.parentNode.remove();\n        }, 2000);\n        console.log(data);\n      })[\"catch\"](function (err) {\n        return console.log(err);\n      });\n    }\n  }, false);\n  /* select outgoing block */\n\n  outgoingBlock.addEventListener('click', function (e) {\n    if (e.target.tagName === \"BUTTON\") {\n      var state = JSON.stringify({\n        id_rep: e.target.getAttribute('data-id'),\n        status: 'cancel'\n      });\n      console.log(state);\n      Object(_rest__WEBPACK_IMPORTED_MODULE_0__[\"Post\"])('/profile/friendout', state).then(function (data) {\n        console.log(data);\n        setTimeout(function () {\n          e.target.parentNode.remove();\n        }, 2000);\n      })[\"catch\"](function (err) {\n        return console.log(err);\n      });\n    }\n  }, false);\n  outgoingBlock2.addEventListener('click', function (e) {\n    if (e.target.tagName === \"BUTTON\") {\n      var state = JSON.stringify({\n        id_rep: e.target.getAttribute('data-id'),\n        status: 'cancel'\n      });\n      console.log(state);\n      Object(_rest__WEBPACK_IMPORTED_MODULE_0__[\"Post\"])('/profile/friendout', state).then(function (data) {\n        console.log(data);\n        setTimeout(function () {\n          e.target.parentNode.remove();\n        }, 2000);\n      })[\"catch\"](function (err) {\n        return console.log(err);\n      });\n    }\n  }, false);\n  /*tab user*/\n\n  tabUser.addEventListener('click', function (e) {\n    tabcontent.forEach(function (item) {\n      item.style.display = \"none\";\n      item.style.transform = \".3s\";\n    });\n    tablinks.forEach(function (item) {\n      return item.className = item.className.replace(\" active\", \"\");\n    });\n    document.getElementById('userBlock').style.display = \"block\";\n    e.target.className += \" active\";\n  }, false);\n  /*tab friends*/\n\n  tabFriend.addEventListener('click', function (e) {\n    tabcontent.forEach(function (item) {\n      item.style.display = \"none\";\n      item.style.transform = \".3s\";\n    });\n    tablinks.forEach(function (item) {\n      return item.className = item.className.replace(\" active\", \"\");\n    });\n    document.getElementById('friendsBlock').style.display = \"block\";\n    e.target.className += \" active\";\n  }, false);\n}\n\nif (window.location.pathname === '//users/login') {\n  loginBtn.addEventListener('click', function () {\n    Object(_rest__WEBPACK_IMPORTED_MODULE_0__[\"Get\"])('/users/profile').then(function (data) {\n      return console.log(data);\n    });\n  }, false);\n}\n\n//# sourceURL=webpack:///./public/js/script.js?");

/***/ }),

/***/ "./public/style/style.scss":
/*!*********************************!*\
  !*** ./public/style/style.scss ***!
  \*********************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("// removed by extract-text-webpack-plugin\n\n//# sourceURL=webpack:///./public/style/style.scss?");

/***/ })

/******/ });