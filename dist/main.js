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
/******/ 	return __webpack_require__(__webpack_require__.s = "./src/scripts/app.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./src/scripts/app.js":
/*!****************************!*\
  !*** ./src/scripts/app.js ***!
  \****************************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _data__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./data */ \"./src/scripts/data.js\");\n/* harmony import */ var _ui_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./ui.js */ \"./src/scripts/ui.js\");\n/* harmony import */ var _notifications_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./notifications.js */ \"./src/scripts/notifications.js\");\n/* harmony import */ var _webauthn_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./webauthn.js */ \"./src/scripts/webauthn.js\");\n// Copyright 2016 Google Inc.\n//\n// Licensed under the Apache License, Version 2.0 (the \"License\");\n// you may not use this file except in compliance with the License.\n// You may obtain a copy of the License at\n//\n//      http://www.apache.org/licenses/LICENSE-2.0\n//\n// Unless required by applicable law or agreed to in writing, software\n// distributed under the License is distributed on an \"AS IS\" BASIS,\n// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.\n// See the License for the specific language governing permissions and\n// limitations under the License.\n\n\n\n\n\nlet swRegistration;\n\n(function () {\n  'use strict';\n\n  var app = {\n    isLoading: true,\n    visibleCards: {},\n    initialPlayground: [],\n    spinner: document.querySelector('.loader'),\n    cardTemplate: document.querySelector('.cardTemplate'),\n    container: document.querySelector('.main'),\n    debug: document.querySelector('.debug'),\n    addDialog: document.querySelector('.dialog-container'),\n    daysOfWeek: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']\n  };\n\n  /*****************************************************************************\n   *\n   * Event listeners for UI elements\n   *\n   ****************************************************************************/\n\n  document.getElementById('butRefresh').addEventListener('click', function () {\n    // Refresh all of the forecasts\n    console.log('butRefresh');\n    Object(_webauthn_js__WEBPACK_IMPORTED_MODULE_3__[\"registerUser\"])(\"friedger\");\n    // app.updatePlaygrounds();\n  });\n\n  /*****************************************************************************\n   *\n   * Methods to update/refresh the UI\n   *\n   ****************************************************************************/\n\n  // Toggles the visibility of the add new city dialog.\n  app.toggleAddDialog = function (visible) {\n    if (visible) {\n      app.addDialog.classList.add('dialog-container--visible');\n    } else {\n      app.addDialog.classList.remove('dialog-container--visible');\n    }\n  };\n\n  /*****************************************************************************\n   *\n   * Methods for dealing with the model\n   *\n   ****************************************************************************/\n\n  /*\n   * Gets details for a specific playground and updates the card with the data.\n   * getPlayground() first checks if the details are in the cache. If so,\n   * then it gets that data and populates the card with the cached data.\n   * Then, getPlayground() goes to the network for fresh data. If the network\n   * request goes through, then the card gets updated a second time with the\n   * freshest data.\n   */\n  app.getPlayground = function (recordid, label) {\n    Object(_data__WEBPACK_IMPORTED_MODULE_0__[\"getData\"])().then(data => {\n      data.records.map(record => Object(_ui_js__WEBPACK_IMPORTED_MODULE_1__[\"updateCard\"])(record, app.visibleCards, app.cardTemplate, app.container, 'fr'));\n      app.isLoading = false;\n      app.spinner.setAttribute('hidden', true);\n    });\n  };\n\n  // Iterate all of the cards and attempt to get the latest forecast data\n  app.updatePlaygrounds = function () {\n    var keys = Object.keys(app.visibleCards);\n    keys.forEach(function (key) {\n      app.getPlayground(key);\n    });\n  };\n\n  app.saveSelectedCities = function () {\n    var selectedCities = JSON.stringify(app.initialPlayground);\n    localStorage.selectedCities = selectedCities;\n  };\n\n  /*\n   * Fake weather data that is presented when the user first uses the app,\n   * or when the user has not saved any cities. See startup code for more\n   * discussion.\n   */\n  var initialPlayground = {\n    \"datasetid\": \"playgrounds\",\n    \"recordid\": \"359be7807d0108e540717123b3ca3920caa451c0\",\n    \"fields\": {\n      \"nom\": \"Jardins de la vallée du Maalbeek\",\n      \"code_postal\": \"1000\",\n      \"description\": \"3 Jeux sur ressort 1 bascule 1 mur d’escalade 2 combinaisons de grimpe et de glisse\",\n      \"adres\": \"Jozef II-straat ingang tegenover nr 108\",\n      \"naam\": \"Maalbeekdalhof\",\n      \"adresse\": \"Rue Jozef II - entrée face au n°108\",\n      \"tranche_d_age\": \"3>12\",\n      \"beschrijving\": \"3 veertoestellen 1 wip 1 klimmuur 2 glij-klim-combinatie\"\n    },\n    \"record_timestamp\": \"2015-06-22T12:11:25+00:00\"\n  };\n\n  Object(_ui_js__WEBPACK_IMPORTED_MODULE_1__[\"updateCard\"])(initialPlayground, app.visibleCards, app.cardTemplate, app.container, 'fr');\n\n  app.initialPlayground = localStorage.selectedCities;\n\n  if (app.initialPlayground) {\n    app.initialPlayground = JSON.parse(app.initialPlayground);\n    app.initialPlayground.forEach(function (playground) {\n      app.getPlayground(playground.recordid, playground.label);\n    });\n  } else {\n    Object(_ui_js__WEBPACK_IMPORTED_MODULE_1__[\"updateCard\"])(initialPlayground, app.visibleCards, app.cardTemplate, app.container, 'fr');\n    app.initialPlayground = [{ key: initialPlayground.recordid, label: initialPlayground.label }];\n    app.saveSelectedCities();\n  }\n\n  navigator.credentials.get({ password: true }).then(result => console.log(\"auth r:\", result), error => console.log(\"error\", error));\n  // S E R V I C E   W O R K E R\n\n  // if ('serviceWorker' in navigator && 'PushManager' in window) {\n  //   navigator.serviceWorker\n  //     .register('./service-worker.js')\n  //     .then((swReg) => {\n  //       swRegistration = swReg;\n  //       console.log('Service Worker Registered', swReg);\n\n  //       // Setup push notifications\n  //       initialiseSubs(swRegistration)\n  //         .then(sub => {\n  //           app.debug.textContent = JSON.stringify(sub);\n  //         });\n  //     });\n  // }\n})();\n\n//# sourceURL=webpack:///./src/scripts/app.js?");

/***/ }),

/***/ "./src/scripts/data.js":
/*!*****************************!*\
  !*** ./src/scripts/data.js ***!
  \*****************************/
/*! exports provided: getData */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"getData\", function() { return getData; });\nconst API_URL = 'https://opendata.brussels.be/api/records/1.0/search/?dataset=playgrounds&refine.code_postal=1000';\n\nfunction getData() {\n    return fetch(API_URL).then(response => {\n        return response.json();\n    });\n}\n\n//# sourceURL=webpack:///./src/scripts/data.js?");

/***/ }),

/***/ "./src/scripts/notifications.js":
/*!**************************************!*\
  !*** ./src/scripts/notifications.js ***!
  \**************************************/
/*! exports provided: initialiseSubs */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"initialiseSubs\", function() { return initialiseSubs; });\nlet isSubscribed;\n\n// From https://web-push-codelab.appspot.com/\nconst applicationServerPublicKey = \"BBMukMVSpAWcxwbNlNk9rktQwILUgEcsWD0tSNUIzOJSG7amLAKKwkDgqxrjuwiixbSCRRadNH0wpAXZP_1WUzw\";\n\nfunction initialiseSubs(swRegistration) {\n  // Set the initial subscription value\n  // Check whether the pushManager, which is part of the Service Worker, already has a subscription.\n  return swRegistration.pushManager.getSubscription().then(function (subscription) {\n    isSubscribed = !(subscription === null);\n\n    if (isSubscribed) {\n      console.log('User IS already subscribed.');\n    } else {\n      console.log('User is NOT subscribed.');\n    }\n\n    // Commenting out next function call as it currently does nothing\n    // updateSubscriptionOnServer(subscription);\n\n    // (Re-)subscribe user\n    return subscribeUser(swRegistration);\n  });\n}\n\nfunction subscribeUser(swRegistration) {\n  const applicationServerKey = urlB64ToUint8Array(applicationServerPublicKey);\n\n  return swRegistration.pushManager.subscribe({\n    userVisibleOnly: true,\n    applicationServerKey: applicationServerKey\n  }).then(function (subscription) {\n    // User has accepted notifications\n    // Browser has connected to push server\n    console.log('User is subscribed:', subscription);\n\n    updateSubscriptionOnServer(subscription);\n\n    isSubscribed = true;\n\n    // updateBtn();\n    return subscription;\n  }).catch(function (err) {\n    console.error('Failed to subscribe the user: ', err);\n    // updateBtn();\n  });\n}\n\nfunction updateSubscriptionOnServer(subscription) {\n  // TODO: Send subscription to our App's server\n  if (subscription) {\n    // console.log(\"Existing subscription\")\n    console.log(JSON.stringify(subscription));\n  } else {\n    console.log(\"No existing subscription\");\n  }\n}\n\nfunction urlB64ToUint8Array(base64String) {\n  const padding = '='.repeat((4 - base64String.length % 4) % 4);\n  const base64 = (base64String + padding).replace(/\\-/g, '+').replace(/_/g, '/');\n\n  const rawData = window.atob(base64);\n  const outputArray = new Uint8Array(rawData.length);\n\n  for (let i = 0; i < rawData.length; ++i) {\n    outputArray[i] = rawData.charCodeAt(i);\n  }\n  return outputArray;\n}\n\n// export function updateBtn() {\n//   if (isSubscribed) {\n//     pushButton.textContent = 'Disable Push Messaging';\n//   } else {\n//     pushButton.textContent = 'Enable Push Messaging';\n//   }\n\n//   pushButton.disabled = false;\n// }\n\n//# sourceURL=webpack:///./src/scripts/notifications.js?");

/***/ }),

/***/ "./src/scripts/ui.js":
/*!***************************!*\
  !*** ./src/scripts/ui.js ***!
  \***************************/
/*! exports provided: updateCard */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"updateCard\", function() { return updateCard; });\n// Appends a card to the container\n\nfunction updateCard(data, cards, cardTemplate, container, language) {\n  var dataLastUpdated = new Date(data.record_timestamp);\n  var postalCode = data.fields.code_postal;\n  var age = data.fields.tranche_d_age;\n\n  var name;\n  var description;\n  var address;\n\n  if (language == \"fr\") {\n    name = data.fields.nom;\n    description = data.fields.description;\n    address = data.fields.addresse;\n  } else {\n    name = data.fieldsnaam;\n    description = data.fields.beschrijving;\n    address = data.fields.adres;\n  }\n\n  console.log(\"Updateing \", name);\n  var card = cards[data.recordid];\n  if (!card) {\n    card = cardTemplate.cloneNode(true);\n    card.classList.remove(\"cardTemplate\");\n    card.removeAttribute(\"hidden\");\n    container.appendChild(card);\n    cards[data.recordid] = card;\n  }\n\n  // Verifies the data provide is newer than what's already visible\n  // on the card, if it's not bail, if it is, continue and update the\n  // time saved in the card\n  var cardLastUpdatedElem = card.querySelector(\".card-last-updated\");\n  var cardLastUpdated = cardLastUpdatedElem.textContent;\n  if (cardLastUpdated) {\n    cardLastUpdated = new Date(cardLastUpdated);\n    // Bail if the card has more recent data then the data\n    if (dataLastUpdated.getTime() < cardLastUpdated.getTime()) {\n      return;\n    }\n  }\n  cardLastUpdatedElem.textContent = data.record_timestamp;\n\n  card.querySelector(\".name\").textContent = name;\n  card.querySelector(\".description\").textContent = description;\n  card.querySelector(\".address\").textContent = address;\n  card.querySelector(\".age\").textContent = age;\n  card.querySelector(\".postalCode\").textContent = postalCode;\n  card.querySelector(\".pay-button\").addEventListener(\"click\", evt => {\n    getPaymentDetails(name);\n  });\n}\n\nfunction getPaymentDetails(name) {\n  console.log(\"payment details for\", name);\n\n  var methodData = [{\n    supportedMethods: [\"basic-card\"],\n    data: {\n      supportedNetworks: [\"visa\", \"mastercard\"]\n    }\n  }];\n\n  var details = {\n    displayItems: [{\n      label: \"Original amount\",\n      amount: { currency: \"EUR\", value: \"0.01\" }\n    }],\n    total: {\n      label: \"Total\",\n      amount: { currency: \"EUR\", value: \"0.01\" }\n    }\n  };\n\n  var options = {};\n\n  var request = new PaymentRequest(methodData, // required payment method data\n  details, // required information about transaction\n  options // optional parameter for things like shipping, etc.\n  );\n\n  request.show().then(function (paymentResponse) {\n    // Process paymentResponse here\n\n    // console.log(JSON.stringify(paymentResponse));\n    console.log(paymentResponse);\n    paymentResponse.complete(\"success\");\n  }).catch(function (err) {\n    console.error(\"Uh oh, something bad happened\", err);\n    // alert(\"Uh oh, something bad happened\", err.message);\n  });\n}\n\n//# sourceURL=webpack:///./src/scripts/ui.js?");

/***/ }),

/***/ "./src/scripts/webauthn.js":
/*!*********************************!*\
  !*** ./src/scripts/webauthn.js ***!
  \*********************************/
/*! exports provided: registerUser */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"registerUser\", function() { return registerUser; });\nlet registerUserClient = (() => {\n    var _ref2 = _asyncToGenerator(function* (challenge, user) {\n        console.log(\"try to create credentials \", window.isSecureContext);\n        return navigator.credentials.create({ publicKey: {\n                challenge,\n                rp: { id: \"localhost\", name: \"PWA Playgrounds\" },\n                user,\n                pubKeyCredParams: [{ type: \"public-key\", alg: -7 }]\n            } });\n    });\n\n    return function registerUserClient(_x2, _x3) {\n        return _ref2.apply(this, arguments);\n    };\n})();\n\nfunction _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step(\"next\", value); }, function (err) { step(\"throw\", err); }); } } return step(\"next\"); }); }; }\n\nlet registerUser = (() => {\n    var _ref = _asyncToGenerator(function* (name) {\n        // server part\n        console.log(\"challenge\", name);\n        var challenge = new Uint8Array(32);\n        crypto.getRandomValues(challenge);\n        console.log(\"challenge\", challenge);\n\n        // client part\n        var encoder = new TextEncoder(\"uft-8\");\n        registerUserClient(challenge, {\n            id: encoder.encode(name),\n            name,\n            displayName: name\n        }).then(function (credentials) {\n            console.log(\"credentials \", credentials);\n            // server part\n            localStorage.setItem(\"credentials.\" + name, credentials);\n\n            var challenge = new Uint8Array(32);\n            crypto.getRandomValues(challenge);\n\n            authenticate(challenge, credentials.rawId).then(function (response) {\n                console.log(\"auth\", response);\n            }, function (error) {\n                console.log(\"auth error\", error);\n            });\n        }, function (error) {\n            return console.log(\"error \", error);\n        });\n    });\n\n    return function registerUser(_x) {\n        return _ref.apply(this, arguments);\n    };\n})();\n\nfunction authenticate(challenge, credentialId) {\n    return navigator.credentials.get({\n        publicKey: {\n            challenge,\n            rpId: \"localhost\",\n            allowCredentials: [{\n                type: \"public-key\",\n                id: credentialId\n            }],\n            userVerification: \"preferred\" //one of \"required\", \"preferred\", \"discouraged\"\n        } });\n}\n\n//# sourceURL=webpack:///./src/scripts/webauthn.js?");

/***/ })

/******/ });