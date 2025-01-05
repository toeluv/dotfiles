/******/ (() => { // webpackBootstrap
/******/ 	var __webpack_modules__ = ({

/***/ 7449:
/***/ ((module) => {

"use strict";


/*
  MIT License http://www.opensource.org/licenses/mit-license.php
  Author Tobias Koppers @sokra
*/
module.exports = function (cssWithMappingToString) {
  var list = [];

  // return the list of modules as css string
  list.toString = function toString() {
    return this.map(function (item) {
      var content = "";
      var needLayer = typeof item[5] !== "undefined";
      if (item[4]) {
        content += "@supports (".concat(item[4], ") {");
      }
      if (item[2]) {
        content += "@media ".concat(item[2], " {");
      }
      if (needLayer) {
        content += "@layer".concat(item[5].length > 0 ? " ".concat(item[5]) : "", " {");
      }
      content += cssWithMappingToString(item);
      if (needLayer) {
        content += "}";
      }
      if (item[2]) {
        content += "}";
      }
      if (item[4]) {
        content += "}";
      }
      return content;
    }).join("");
  };

  // import a list of modules into the list
  list.i = function i(modules, media, dedupe, supports, layer) {
    if (typeof modules === "string") {
      modules = [[null, modules, undefined]];
    }
    var alreadyImportedModules = {};
    if (dedupe) {
      for (var k = 0; k < this.length; k++) {
        var id = this[k][0];
        if (id != null) {
          alreadyImportedModules[id] = true;
        }
      }
    }
    for (var _k = 0; _k < modules.length; _k++) {
      var item = [].concat(modules[_k]);
      if (dedupe && alreadyImportedModules[item[0]]) {
        continue;
      }
      if (typeof layer !== "undefined") {
        if (typeof item[5] === "undefined") {
          item[5] = layer;
        } else {
          item[1] = "@layer".concat(item[5].length > 0 ? " ".concat(item[5]) : "", " {").concat(item[1], "}");
          item[5] = layer;
        }
      }
      if (media) {
        if (!item[2]) {
          item[2] = media;
        } else {
          item[1] = "@media ".concat(item[2], " {").concat(item[1], "}");
          item[2] = media;
        }
      }
      if (supports) {
        if (!item[4]) {
          item[4] = "".concat(supports);
        } else {
          item[1] = "@supports (".concat(item[4], ") {").concat(item[1], "}");
          item[4] = supports;
        }
      }
      list.push(item);
    }
  };
  return list;
};

/***/ }),

/***/ 2619:
/***/ ((module) => {

"use strict";


module.exports = function (item) {
  var content = item[1];
  var cssMapping = item[3];
  if (!cssMapping) {
    return content;
  }
  if (typeof btoa === "function") {
    var base64 = btoa(unescape(encodeURIComponent(JSON.stringify(cssMapping))));
    var data = "sourceMappingURL=data:application/json;charset=utf-8;base64,".concat(base64);
    var sourceMapping = "/*# ".concat(data, " */");
    return [content].concat([sourceMapping]).join("\n");
  }
  return [content].join("\n");
};

/***/ }),

/***/ 3465:
/***/ ((module) => {

"use strict";


var stylesInDOM = [];
function getIndexByIdentifier(identifier) {
  var result = -1;
  for (var i = 0; i < stylesInDOM.length; i++) {
    if (stylesInDOM[i].identifier === identifier) {
      result = i;
      break;
    }
  }
  return result;
}
function modulesToDom(list, options) {
  var idCountMap = {};
  var identifiers = [];
  for (var i = 0; i < list.length; i++) {
    var item = list[i];
    var id = options.base ? item[0] + options.base : item[0];
    var count = idCountMap[id] || 0;
    var identifier = "".concat(id, " ").concat(count);
    idCountMap[id] = count + 1;
    var indexByIdentifier = getIndexByIdentifier(identifier);
    var obj = {
      css: item[1],
      media: item[2],
      sourceMap: item[3],
      supports: item[4],
      layer: item[5]
    };
    if (indexByIdentifier !== -1) {
      stylesInDOM[indexByIdentifier].references++;
      stylesInDOM[indexByIdentifier].updater(obj);
    } else {
      var updater = addElementStyle(obj, options);
      options.byIndex = i;
      stylesInDOM.splice(i, 0, {
        identifier: identifier,
        updater: updater,
        references: 1
      });
    }
    identifiers.push(identifier);
  }
  return identifiers;
}
function addElementStyle(obj, options) {
  var api = options.domAPI(options);
  api.update(obj);
  var updater = function updater(newObj) {
    if (newObj) {
      if (newObj.css === obj.css && newObj.media === obj.media && newObj.sourceMap === obj.sourceMap && newObj.supports === obj.supports && newObj.layer === obj.layer) {
        return;
      }
      api.update(obj = newObj);
    } else {
      api.remove();
    }
  };
  return updater;
}
module.exports = function (list, options) {
  options = options || {};
  list = list || [];
  var lastIdentifiers = modulesToDom(list, options);
  return function update(newList) {
    newList = newList || [];
    for (var i = 0; i < lastIdentifiers.length; i++) {
      var identifier = lastIdentifiers[i];
      var index = getIndexByIdentifier(identifier);
      stylesInDOM[index].references--;
    }
    var newLastIdentifiers = modulesToDom(newList, options);
    for (var _i = 0; _i < lastIdentifiers.length; _i++) {
      var _identifier = lastIdentifiers[_i];
      var _index = getIndexByIdentifier(_identifier);
      if (stylesInDOM[_index].references === 0) {
        stylesInDOM[_index].updater();
        stylesInDOM.splice(_index, 1);
      }
    }
    lastIdentifiers = newLastIdentifiers;
  };
};

/***/ }),

/***/ 5814:
/***/ ((module) => {

"use strict";


var memo = {};

/* istanbul ignore next  */
function getTarget(target) {
  if (typeof memo[target] === "undefined") {
    var styleTarget = document.querySelector(target);

    // Special case to return head of iframe instead of iframe itself
    if (window.HTMLIFrameElement && styleTarget instanceof window.HTMLIFrameElement) {
      try {
        // This will throw an exception if access to iframe is blocked
        // due to cross-origin restrictions
        styleTarget = styleTarget.contentDocument.head;
      } catch (e) {
        // istanbul ignore next
        styleTarget = null;
      }
    }
    memo[target] = styleTarget;
  }
  return memo[target];
}

/* istanbul ignore next  */
function insertBySelector(insert, style) {
  var target = getTarget(insert);
  if (!target) {
    throw new Error("Couldn't find a style target. This probably means that the value for the 'insert' parameter is invalid.");
  }
  target.appendChild(style);
}
module.exports = insertBySelector;

/***/ }),

/***/ 2389:
/***/ ((module) => {

"use strict";


/* istanbul ignore next  */
function insertStyleElement(options) {
  var element = document.createElement("style");
  options.setAttributes(element, options.attributes);
  options.insert(element, options.options);
  return element;
}
module.exports = insertStyleElement;

/***/ }),

/***/ 9337:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";


/* istanbul ignore next  */
function setAttributesWithoutAttributes(styleElement) {
  var nonce =  true ? __webpack_require__.nc : 0;
  if (nonce) {
    styleElement.setAttribute("nonce", nonce);
  }
}
module.exports = setAttributesWithoutAttributes;

/***/ }),

/***/ 6622:
/***/ ((module) => {

"use strict";


/* istanbul ignore next  */
function apply(styleElement, options, obj) {
  var css = "";
  if (obj.supports) {
    css += "@supports (".concat(obj.supports, ") {");
  }
  if (obj.media) {
    css += "@media ".concat(obj.media, " {");
  }
  var needLayer = typeof obj.layer !== "undefined";
  if (needLayer) {
    css += "@layer".concat(obj.layer.length > 0 ? " ".concat(obj.layer) : "", " {");
  }
  css += obj.css;
  if (needLayer) {
    css += "}";
  }
  if (obj.media) {
    css += "}";
  }
  if (obj.supports) {
    css += "}";
  }
  var sourceMap = obj.sourceMap;
  if (sourceMap && typeof btoa !== "undefined") {
    css += "\n/*# sourceMappingURL=data:application/json;base64,".concat(btoa(unescape(encodeURIComponent(JSON.stringify(sourceMap)))), " */");
  }

  // For old IE
  /* istanbul ignore if  */
  options.styleTagTransform(css, styleElement, options.options);
}
function removeStyleElement(styleElement) {
  // istanbul ignore if
  if (styleElement.parentNode === null) {
    return false;
  }
  styleElement.parentNode.removeChild(styleElement);
}

/* istanbul ignore next  */
function domAPI(options) {
  if (typeof document === "undefined") {
    return {
      update: function update() {},
      remove: function remove() {}
    };
  }
  var styleElement = options.insertStyleElement(options);
  return {
    update: function update(obj) {
      apply(styleElement, options, obj);
    },
    remove: function remove() {
      removeStyleElement(styleElement);
    }
  };
}
module.exports = domAPI;

/***/ }),

/***/ 8722:
/***/ ((module) => {

"use strict";


/* istanbul ignore next  */
function styleTagTransform(css, styleElement) {
  if (styleElement.styleSheet) {
    styleElement.styleSheet.cssText = css;
  } else {
    while (styleElement.firstChild) {
      styleElement.removeChild(styleElement.firstChild);
    }
    styleElement.appendChild(document.createTextNode(css));
  }
}
module.exports = styleTagTransform;

/***/ }),

/***/ 528:
/***/ (function(module, exports) {

var __WEBPACK_AMD_DEFINE_FACTORY__, __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;(function (global, factory) {
  if (true) {
    !(__WEBPACK_AMD_DEFINE_ARRAY__ = [module], __WEBPACK_AMD_DEFINE_FACTORY__ = (factory),
		__WEBPACK_AMD_DEFINE_RESULT__ = (typeof __WEBPACK_AMD_DEFINE_FACTORY__ === 'function' ?
		(__WEBPACK_AMD_DEFINE_FACTORY__.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__)) : __WEBPACK_AMD_DEFINE_FACTORY__),
		__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
  } else { var mod; }
})(typeof globalThis !== "undefined" ? globalThis : typeof self !== "undefined" ? self : this, function (module) {
  /* webextension-polyfill - v0.8.0 - Tue Apr 20 2021 11:27:38 */

  /* -*- Mode: indent-tabs-mode: nil; js-indent-level: 2 -*- */

  /* vim: set sts=2 sw=2 et tw=80: */

  /* This Source Code Form is subject to the terms of the Mozilla Public
   * License, v. 2.0. If a copy of the MPL was not distributed with this
   * file, You can obtain one at http://mozilla.org/MPL/2.0/. */
  "use strict";

  if (typeof browser === "undefined" || Object.getPrototypeOf(browser) !== Object.prototype) {
    const CHROME_SEND_MESSAGE_CALLBACK_NO_RESPONSE_MESSAGE = "The message port closed before a response was received.";
    const SEND_RESPONSE_DEPRECATION_WARNING = "Returning a Promise is the preferred way to send a reply from an onMessage/onMessageExternal listener, as the sendResponse will be removed from the specs (See https://developer.mozilla.org/docs/Mozilla/Add-ons/WebExtensions/API/runtime/onMessage)"; // Wrapping the bulk of this polyfill in a one-time-use function is a minor
    // optimization for Firefox. Since Spidermonkey does not fully parse the
    // contents of a function until the first time it's called, and since it will
    // never actually need to be called, this allows the polyfill to be included
    // in Firefox nearly for free.

    const wrapAPIs = extensionAPIs => {
      // NOTE: apiMetadata is associated to the content of the api-metadata.json file
      // at build time by replacing the following "include" with the content of the
      // JSON file.
      const apiMetadata = {
        "alarms": {
          "clear": {
            "minArgs": 0,
            "maxArgs": 1
          },
          "clearAll": {
            "minArgs": 0,
            "maxArgs": 0
          },
          "get": {
            "minArgs": 0,
            "maxArgs": 1
          },
          "getAll": {
            "minArgs": 0,
            "maxArgs": 0
          }
        },
        "bookmarks": {
          "create": {
            "minArgs": 1,
            "maxArgs": 1
          },
          "get": {
            "minArgs": 1,
            "maxArgs": 1
          },
          "getChildren": {
            "minArgs": 1,
            "maxArgs": 1
          },
          "getRecent": {
            "minArgs": 1,
            "maxArgs": 1
          },
          "getSubTree": {
            "minArgs": 1,
            "maxArgs": 1
          },
          "getTree": {
            "minArgs": 0,
            "maxArgs": 0
          },
          "move": {
            "minArgs": 2,
            "maxArgs": 2
          },
          "remove": {
            "minArgs": 1,
            "maxArgs": 1
          },
          "removeTree": {
            "minArgs": 1,
            "maxArgs": 1
          },
          "search": {
            "minArgs": 1,
            "maxArgs": 1
          },
          "update": {
            "minArgs": 2,
            "maxArgs": 2
          }
        },
        "browserAction": {
          "disable": {
            "minArgs": 0,
            "maxArgs": 1,
            "fallbackToNoCallback": true
          },
          "enable": {
            "minArgs": 0,
            "maxArgs": 1,
            "fallbackToNoCallback": true
          },
          "getBadgeBackgroundColor": {
            "minArgs": 1,
            "maxArgs": 1
          },
          "getBadgeText": {
            "minArgs": 1,
            "maxArgs": 1
          },
          "getPopup": {
            "minArgs": 1,
            "maxArgs": 1
          },
          "getTitle": {
            "minArgs": 1,
            "maxArgs": 1
          },
          "openPopup": {
            "minArgs": 0,
            "maxArgs": 0
          },
          "setBadgeBackgroundColor": {
            "minArgs": 1,
            "maxArgs": 1,
            "fallbackToNoCallback": true
          },
          "setBadgeText": {
            "minArgs": 1,
            "maxArgs": 1,
            "fallbackToNoCallback": true
          },
          "setIcon": {
            "minArgs": 1,
            "maxArgs": 1
          },
          "setPopup": {
            "minArgs": 1,
            "maxArgs": 1,
            "fallbackToNoCallback": true
          },
          "setTitle": {
            "minArgs": 1,
            "maxArgs": 1,
            "fallbackToNoCallback": true
          }
        },
        "browsingData": {
          "remove": {
            "minArgs": 2,
            "maxArgs": 2
          },
          "removeCache": {
            "minArgs": 1,
            "maxArgs": 1
          },
          "removeCookies": {
            "minArgs": 1,
            "maxArgs": 1
          },
          "removeDownloads": {
            "minArgs": 1,
            "maxArgs": 1
          },
          "removeFormData": {
            "minArgs": 1,
            "maxArgs": 1
          },
          "removeHistory": {
            "minArgs": 1,
            "maxArgs": 1
          },
          "removeLocalStorage": {
            "minArgs": 1,
            "maxArgs": 1
          },
          "removePasswords": {
            "minArgs": 1,
            "maxArgs": 1
          },
          "removePluginData": {
            "minArgs": 1,
            "maxArgs": 1
          },
          "settings": {
            "minArgs": 0,
            "maxArgs": 0
          }
        },
        "commands": {
          "getAll": {
            "minArgs": 0,
            "maxArgs": 0
          }
        },
        "contextMenus": {
          "remove": {
            "minArgs": 1,
            "maxArgs": 1
          },
          "removeAll": {
            "minArgs": 0,
            "maxArgs": 0
          },
          "update": {
            "minArgs": 2,
            "maxArgs": 2
          }
        },
        "cookies": {
          "get": {
            "minArgs": 1,
            "maxArgs": 1
          },
          "getAll": {
            "minArgs": 1,
            "maxArgs": 1
          },
          "getAllCookieStores": {
            "minArgs": 0,
            "maxArgs": 0
          },
          "remove": {
            "minArgs": 1,
            "maxArgs": 1
          },
          "set": {
            "minArgs": 1,
            "maxArgs": 1
          }
        },
        "devtools": {
          "inspectedWindow": {
            "eval": {
              "minArgs": 1,
              "maxArgs": 2,
              "singleCallbackArg": false
            }
          },
          "panels": {
            "create": {
              "minArgs": 3,
              "maxArgs": 3,
              "singleCallbackArg": true
            },
            "elements": {
              "createSidebarPane": {
                "minArgs": 1,
                "maxArgs": 1
              }
            }
          }
        },
        "downloads": {
          "cancel": {
            "minArgs": 1,
            "maxArgs": 1
          },
          "download": {
            "minArgs": 1,
            "maxArgs": 1
          },
          "erase": {
            "minArgs": 1,
            "maxArgs": 1
          },
          "getFileIcon": {
            "minArgs": 1,
            "maxArgs": 2
          },
          "open": {
            "minArgs": 1,
            "maxArgs": 1,
            "fallbackToNoCallback": true
          },
          "pause": {
            "minArgs": 1,
            "maxArgs": 1
          },
          "removeFile": {
            "minArgs": 1,
            "maxArgs": 1
          },
          "resume": {
            "minArgs": 1,
            "maxArgs": 1
          },
          "search": {
            "minArgs": 1,
            "maxArgs": 1
          },
          "show": {
            "minArgs": 1,
            "maxArgs": 1,
            "fallbackToNoCallback": true
          }
        },
        "extension": {
          "isAllowedFileSchemeAccess": {
            "minArgs": 0,
            "maxArgs": 0
          },
          "isAllowedIncognitoAccess": {
            "minArgs": 0,
            "maxArgs": 0
          }
        },
        "history": {
          "addUrl": {
            "minArgs": 1,
            "maxArgs": 1
          },
          "deleteAll": {
            "minArgs": 0,
            "maxArgs": 0
          },
          "deleteRange": {
            "minArgs": 1,
            "maxArgs": 1
          },
          "deleteUrl": {
            "minArgs": 1,
            "maxArgs": 1
          },
          "getVisits": {
            "minArgs": 1,
            "maxArgs": 1
          },
          "search": {
            "minArgs": 1,
            "maxArgs": 1
          }
        },
        "i18n": {
          "detectLanguage": {
            "minArgs": 1,
            "maxArgs": 1
          },
          "getAcceptLanguages": {
            "minArgs": 0,
            "maxArgs": 0
          }
        },
        "identity": {
          "launchWebAuthFlow": {
            "minArgs": 1,
            "maxArgs": 1
          }
        },
        "idle": {
          "queryState": {
            "minArgs": 1,
            "maxArgs": 1
          }
        },
        "management": {
          "get": {
            "minArgs": 1,
            "maxArgs": 1
          },
          "getAll": {
            "minArgs": 0,
            "maxArgs": 0
          },
          "getSelf": {
            "minArgs": 0,
            "maxArgs": 0
          },
          "setEnabled": {
            "minArgs": 2,
            "maxArgs": 2
          },
          "uninstallSelf": {
            "minArgs": 0,
            "maxArgs": 1
          }
        },
        "notifications": {
          "clear": {
            "minArgs": 1,
            "maxArgs": 1
          },
          "create": {
            "minArgs": 1,
            "maxArgs": 2
          },
          "getAll": {
            "minArgs": 0,
            "maxArgs": 0
          },
          "getPermissionLevel": {
            "minArgs": 0,
            "maxArgs": 0
          },
          "update": {
            "minArgs": 2,
            "maxArgs": 2
          }
        },
        "pageAction": {
          "getPopup": {
            "minArgs": 1,
            "maxArgs": 1
          },
          "getTitle": {
            "minArgs": 1,
            "maxArgs": 1
          },
          "hide": {
            "minArgs": 1,
            "maxArgs": 1,
            "fallbackToNoCallback": true
          },
          "setIcon": {
            "minArgs": 1,
            "maxArgs": 1
          },
          "setPopup": {
            "minArgs": 1,
            "maxArgs": 1,
            "fallbackToNoCallback": true
          },
          "setTitle": {
            "minArgs": 1,
            "maxArgs": 1,
            "fallbackToNoCallback": true
          },
          "show": {
            "minArgs": 1,
            "maxArgs": 1,
            "fallbackToNoCallback": true
          }
        },
        "permissions": {
          "contains": {
            "minArgs": 1,
            "maxArgs": 1
          },
          "getAll": {
            "minArgs": 0,
            "maxArgs": 0
          },
          "remove": {
            "minArgs": 1,
            "maxArgs": 1
          },
          "request": {
            "minArgs": 1,
            "maxArgs": 1
          }
        },
        "runtime": {
          "getBackgroundPage": {
            "minArgs": 0,
            "maxArgs": 0
          },
          "getPlatformInfo": {
            "minArgs": 0,
            "maxArgs": 0
          },
          "openOptionsPage": {
            "minArgs": 0,
            "maxArgs": 0
          },
          "requestUpdateCheck": {
            "minArgs": 0,
            "maxArgs": 0
          },
          "sendMessage": {
            "minArgs": 1,
            "maxArgs": 3
          },
          "sendNativeMessage": {
            "minArgs": 2,
            "maxArgs": 2
          },
          "setUninstallURL": {
            "minArgs": 1,
            "maxArgs": 1
          }
        },
        "sessions": {
          "getDevices": {
            "minArgs": 0,
            "maxArgs": 1
          },
          "getRecentlyClosed": {
            "minArgs": 0,
            "maxArgs": 1
          },
          "restore": {
            "minArgs": 0,
            "maxArgs": 1
          }
        },
        "storage": {
          "local": {
            "clear": {
              "minArgs": 0,
              "maxArgs": 0
            },
            "get": {
              "minArgs": 0,
              "maxArgs": 1
            },
            "getBytesInUse": {
              "minArgs": 0,
              "maxArgs": 1
            },
            "remove": {
              "minArgs": 1,
              "maxArgs": 1
            },
            "set": {
              "minArgs": 1,
              "maxArgs": 1
            }
          },
          "managed": {
            "get": {
              "minArgs": 0,
              "maxArgs": 1
            },
            "getBytesInUse": {
              "minArgs": 0,
              "maxArgs": 1
            }
          },
          "sync": {
            "clear": {
              "minArgs": 0,
              "maxArgs": 0
            },
            "get": {
              "minArgs": 0,
              "maxArgs": 1
            },
            "getBytesInUse": {
              "minArgs": 0,
              "maxArgs": 1
            },
            "remove": {
              "minArgs": 1,
              "maxArgs": 1
            },
            "set": {
              "minArgs": 1,
              "maxArgs": 1
            }
          }
        },
        "tabs": {
          "captureVisibleTab": {
            "minArgs": 0,
            "maxArgs": 2
          },
          "create": {
            "minArgs": 1,
            "maxArgs": 1
          },
          "detectLanguage": {
            "minArgs": 0,
            "maxArgs": 1
          },
          "discard": {
            "minArgs": 0,
            "maxArgs": 1
          },
          "duplicate": {
            "minArgs": 1,
            "maxArgs": 1
          },
          "executeScript": {
            "minArgs": 1,
            "maxArgs": 2
          },
          "get": {
            "minArgs": 1,
            "maxArgs": 1
          },
          "getCurrent": {
            "minArgs": 0,
            "maxArgs": 0
          },
          "getZoom": {
            "minArgs": 0,
            "maxArgs": 1
          },
          "getZoomSettings": {
            "minArgs": 0,
            "maxArgs": 1
          },
          "goBack": {
            "minArgs": 0,
            "maxArgs": 1
          },
          "goForward": {
            "minArgs": 0,
            "maxArgs": 1
          },
          "highlight": {
            "minArgs": 1,
            "maxArgs": 1
          },
          "insertCSS": {
            "minArgs": 1,
            "maxArgs": 2
          },
          "move": {
            "minArgs": 2,
            "maxArgs": 2
          },
          "query": {
            "minArgs": 1,
            "maxArgs": 1
          },
          "reload": {
            "minArgs": 0,
            "maxArgs": 2
          },
          "remove": {
            "minArgs": 1,
            "maxArgs": 1
          },
          "removeCSS": {
            "minArgs": 1,
            "maxArgs": 2
          },
          "sendMessage": {
            "minArgs": 2,
            "maxArgs": 3
          },
          "setZoom": {
            "minArgs": 1,
            "maxArgs": 2
          },
          "setZoomSettings": {
            "minArgs": 1,
            "maxArgs": 2
          },
          "update": {
            "minArgs": 1,
            "maxArgs": 2
          }
        },
        "topSites": {
          "get": {
            "minArgs": 0,
            "maxArgs": 0
          }
        },
        "webNavigation": {
          "getAllFrames": {
            "minArgs": 1,
            "maxArgs": 1
          },
          "getFrame": {
            "minArgs": 1,
            "maxArgs": 1
          }
        },
        "webRequest": {
          "handlerBehaviorChanged": {
            "minArgs": 0,
            "maxArgs": 0
          }
        },
        "windows": {
          "create": {
            "minArgs": 0,
            "maxArgs": 1
          },
          "get": {
            "minArgs": 1,
            "maxArgs": 2
          },
          "getAll": {
            "minArgs": 0,
            "maxArgs": 1
          },
          "getCurrent": {
            "minArgs": 0,
            "maxArgs": 1
          },
          "getLastFocused": {
            "minArgs": 0,
            "maxArgs": 1
          },
          "remove": {
            "minArgs": 1,
            "maxArgs": 1
          },
          "update": {
            "minArgs": 2,
            "maxArgs": 2
          }
        }
      };

      if (Object.keys(apiMetadata).length === 0) {
        throw new Error("api-metadata.json has not been included in browser-polyfill");
      }
      /**
       * A WeakMap subclass which creates and stores a value for any key which does
       * not exist when accessed, but behaves exactly as an ordinary WeakMap
       * otherwise.
       *
       * @param {function} createItem
       *        A function which will be called in order to create the value for any
       *        key which does not exist, the first time it is accessed. The
       *        function receives, as its only argument, the key being created.
       */


      class DefaultWeakMap extends WeakMap {
        constructor(createItem, items = undefined) {
          super(items);
          this.createItem = createItem;
        }

        get(key) {
          if (!this.has(key)) {
            this.set(key, this.createItem(key));
          }

          return super.get(key);
        }

      }
      /**
       * Returns true if the given object is an object with a `then` method, and can
       * therefore be assumed to behave as a Promise.
       *
       * @param {*} value The value to test.
       * @returns {boolean} True if the value is thenable.
       */


      const isThenable = value => {
        return value && typeof value === "object" && typeof value.then === "function";
      };
      /**
       * Creates and returns a function which, when called, will resolve or reject
       * the given promise based on how it is called:
       *
       * - If, when called, `chrome.runtime.lastError` contains a non-null object,
       *   the promise is rejected with that value.
       * - If the function is called with exactly one argument, the promise is
       *   resolved to that value.
       * - Otherwise, the promise is resolved to an array containing all of the
       *   function's arguments.
       *
       * @param {object} promise
       *        An object containing the resolution and rejection functions of a
       *        promise.
       * @param {function} promise.resolve
       *        The promise's resolution function.
       * @param {function} promise.reject
       *        The promise's rejection function.
       * @param {object} metadata
       *        Metadata about the wrapped method which has created the callback.
       * @param {boolean} metadata.singleCallbackArg
       *        Whether or not the promise is resolved with only the first
       *        argument of the callback, alternatively an array of all the
       *        callback arguments is resolved. By default, if the callback
       *        function is invoked with only a single argument, that will be
       *        resolved to the promise, while all arguments will be resolved as
       *        an array if multiple are given.
       *
       * @returns {function}
       *        The generated callback function.
       */


      const makeCallback = (promise, metadata) => {
        return (...callbackArgs) => {
          if (extensionAPIs.runtime.lastError) {
            promise.reject(new Error(extensionAPIs.runtime.lastError.message));
          } else if (metadata.singleCallbackArg || callbackArgs.length <= 1 && metadata.singleCallbackArg !== false) {
            promise.resolve(callbackArgs[0]);
          } else {
            promise.resolve(callbackArgs);
          }
        };
      };

      const pluralizeArguments = numArgs => numArgs == 1 ? "argument" : "arguments";
      /**
       * Creates a wrapper function for a method with the given name and metadata.
       *
       * @param {string} name
       *        The name of the method which is being wrapped.
       * @param {object} metadata
       *        Metadata about the method being wrapped.
       * @param {integer} metadata.minArgs
       *        The minimum number of arguments which must be passed to the
       *        function. If called with fewer than this number of arguments, the
       *        wrapper will raise an exception.
       * @param {integer} metadata.maxArgs
       *        The maximum number of arguments which may be passed to the
       *        function. If called with more than this number of arguments, the
       *        wrapper will raise an exception.
       * @param {boolean} metadata.singleCallbackArg
       *        Whether or not the promise is resolved with only the first
       *        argument of the callback, alternatively an array of all the
       *        callback arguments is resolved. By default, if the callback
       *        function is invoked with only a single argument, that will be
       *        resolved to the promise, while all arguments will be resolved as
       *        an array if multiple are given.
       *
       * @returns {function(object, ...*)}
       *       The generated wrapper function.
       */


      const wrapAsyncFunction = (name, metadata) => {
        return function asyncFunctionWrapper(target, ...args) {
          if (args.length < metadata.minArgs) {
            throw new Error(`Expected at least ${metadata.minArgs} ${pluralizeArguments(metadata.minArgs)} for ${name}(), got ${args.length}`);
          }

          if (args.length > metadata.maxArgs) {
            throw new Error(`Expected at most ${metadata.maxArgs} ${pluralizeArguments(metadata.maxArgs)} for ${name}(), got ${args.length}`);
          }

          return new Promise((resolve, reject) => {
            if (metadata.fallbackToNoCallback) {
              // This API method has currently no callback on Chrome, but it return a promise on Firefox,
              // and so the polyfill will try to call it with a callback first, and it will fallback
              // to not passing the callback if the first call fails.
              try {
                target[name](...args, makeCallback({
                  resolve,
                  reject
                }, metadata));
              } catch (cbError) {
                console.warn(`${name} API method doesn't seem to support the callback parameter, ` + "falling back to call it without a callback: ", cbError);
                target[name](...args); // Update the API method metadata, so that the next API calls will not try to
                // use the unsupported callback anymore.

                metadata.fallbackToNoCallback = false;
                metadata.noCallback = true;
                resolve();
              }
            } else if (metadata.noCallback) {
              target[name](...args);
              resolve();
            } else {
              target[name](...args, makeCallback({
                resolve,
                reject
              }, metadata));
            }
          });
        };
      };
      /**
       * Wraps an existing method of the target object, so that calls to it are
       * intercepted by the given wrapper function. The wrapper function receives,
       * as its first argument, the original `target` object, followed by each of
       * the arguments passed to the original method.
       *
       * @param {object} target
       *        The original target object that the wrapped method belongs to.
       * @param {function} method
       *        The method being wrapped. This is used as the target of the Proxy
       *        object which is created to wrap the method.
       * @param {function} wrapper
       *        The wrapper function which is called in place of a direct invocation
       *        of the wrapped method.
       *
       * @returns {Proxy<function>}
       *        A Proxy object for the given method, which invokes the given wrapper
       *        method in its place.
       */


      const wrapMethod = (target, method, wrapper) => {
        return new Proxy(method, {
          apply(targetMethod, thisObj, args) {
            return wrapper.call(thisObj, target, ...args);
          }

        });
      };

      let hasOwnProperty = Function.call.bind(Object.prototype.hasOwnProperty);
      /**
       * Wraps an object in a Proxy which intercepts and wraps certain methods
       * based on the given `wrappers` and `metadata` objects.
       *
       * @param {object} target
       *        The target object to wrap.
       *
       * @param {object} [wrappers = {}]
       *        An object tree containing wrapper functions for special cases. Any
       *        function present in this object tree is called in place of the
       *        method in the same location in the `target` object tree. These
       *        wrapper methods are invoked as described in {@see wrapMethod}.
       *
       * @param {object} [metadata = {}]
       *        An object tree containing metadata used to automatically generate
       *        Promise-based wrapper functions for asynchronous. Any function in
       *        the `target` object tree which has a corresponding metadata object
       *        in the same location in the `metadata` tree is replaced with an
       *        automatically-generated wrapper function, as described in
       *        {@see wrapAsyncFunction}
       *
       * @returns {Proxy<object>}
       */

      const wrapObject = (target, wrappers = {}, metadata = {}) => {
        let cache = Object.create(null);
        let handlers = {
          has(proxyTarget, prop) {
            return prop in target || prop in cache;
          },

          get(proxyTarget, prop, receiver) {
            if (prop in cache) {
              return cache[prop];
            }

            if (!(prop in target)) {
              return undefined;
            }

            let value = target[prop];

            if (typeof value === "function") {
              // This is a method on the underlying object. Check if we need to do
              // any wrapping.
              if (typeof wrappers[prop] === "function") {
                // We have a special-case wrapper for this method.
                value = wrapMethod(target, target[prop], wrappers[prop]);
              } else if (hasOwnProperty(metadata, prop)) {
                // This is an async method that we have metadata for. Create a
                // Promise wrapper for it.
                let wrapper = wrapAsyncFunction(prop, metadata[prop]);
                value = wrapMethod(target, target[prop], wrapper);
              } else {
                // This is a method that we don't know or care about. Return the
                // original method, bound to the underlying object.
                value = value.bind(target);
              }
            } else if (typeof value === "object" && value !== null && (hasOwnProperty(wrappers, prop) || hasOwnProperty(metadata, prop))) {
              // This is an object that we need to do some wrapping for the children
              // of. Create a sub-object wrapper for it with the appropriate child
              // metadata.
              value = wrapObject(value, wrappers[prop], metadata[prop]);
            } else if (hasOwnProperty(metadata, "*")) {
              // Wrap all properties in * namespace.
              value = wrapObject(value, wrappers[prop], metadata["*"]);
            } else {
              // We don't need to do any wrapping for this property,
              // so just forward all access to the underlying object.
              Object.defineProperty(cache, prop, {
                configurable: true,
                enumerable: true,

                get() {
                  return target[prop];
                },

                set(value) {
                  target[prop] = value;
                }

              });
              return value;
            }

            cache[prop] = value;
            return value;
          },

          set(proxyTarget, prop, value, receiver) {
            if (prop in cache) {
              cache[prop] = value;
            } else {
              target[prop] = value;
            }

            return true;
          },

          defineProperty(proxyTarget, prop, desc) {
            return Reflect.defineProperty(cache, prop, desc);
          },

          deleteProperty(proxyTarget, prop) {
            return Reflect.deleteProperty(cache, prop);
          }

        }; // Per contract of the Proxy API, the "get" proxy handler must return the
        // original value of the target if that value is declared read-only and
        // non-configurable. For this reason, we create an object with the
        // prototype set to `target` instead of using `target` directly.
        // Otherwise we cannot return a custom object for APIs that
        // are declared read-only and non-configurable, such as `chrome.devtools`.
        //
        // The proxy handlers themselves will still use the original `target`
        // instead of the `proxyTarget`, so that the methods and properties are
        // dereferenced via the original targets.

        let proxyTarget = Object.create(target);
        return new Proxy(proxyTarget, handlers);
      };
      /**
       * Creates a set of wrapper functions for an event object, which handles
       * wrapping of listener functions that those messages are passed.
       *
       * A single wrapper is created for each listener function, and stored in a
       * map. Subsequent calls to `addListener`, `hasListener`, or `removeListener`
       * retrieve the original wrapper, so that  attempts to remove a
       * previously-added listener work as expected.
       *
       * @param {DefaultWeakMap<function, function>} wrapperMap
       *        A DefaultWeakMap object which will create the appropriate wrapper
       *        for a given listener function when one does not exist, and retrieve
       *        an existing one when it does.
       *
       * @returns {object}
       */


      const wrapEvent = wrapperMap => ({
        addListener(target, listener, ...args) {
          target.addListener(wrapperMap.get(listener), ...args);
        },

        hasListener(target, listener) {
          return target.hasListener(wrapperMap.get(listener));
        },

        removeListener(target, listener) {
          target.removeListener(wrapperMap.get(listener));
        }

      });

      const onRequestFinishedWrappers = new DefaultWeakMap(listener => {
        if (typeof listener !== "function") {
          return listener;
        }
        /**
         * Wraps an onRequestFinished listener function so that it will return a
         * `getContent()` property which returns a `Promise` rather than using a
         * callback API.
         *
         * @param {object} req
         *        The HAR entry object representing the network request.
         */


        return function onRequestFinished(req) {
          const wrappedReq = wrapObject(req, {}
          /* wrappers */
          , {
            getContent: {
              minArgs: 0,
              maxArgs: 0
            }
          });
          listener(wrappedReq);
        };
      }); // Keep track if the deprecation warning has been logged at least once.

      let loggedSendResponseDeprecationWarning = false;
      const onMessageWrappers = new DefaultWeakMap(listener => {
        if (typeof listener !== "function") {
          return listener;
        }
        /**
         * Wraps a message listener function so that it may send responses based on
         * its return value, rather than by returning a sentinel value and calling a
         * callback. If the listener function returns a Promise, the response is
         * sent when the promise either resolves or rejects.
         *
         * @param {*} message
         *        The message sent by the other end of the channel.
         * @param {object} sender
         *        Details about the sender of the message.
         * @param {function(*)} sendResponse
         *        A callback which, when called with an arbitrary argument, sends
         *        that value as a response.
         * @returns {boolean}
         *        True if the wrapped listener returned a Promise, which will later
         *        yield a response. False otherwise.
         */


        return function onMessage(message, sender, sendResponse) {
          let didCallSendResponse = false;
          let wrappedSendResponse;
          let sendResponsePromise = new Promise(resolve => {
            wrappedSendResponse = function (response) {
              if (!loggedSendResponseDeprecationWarning) {
                console.warn(SEND_RESPONSE_DEPRECATION_WARNING, new Error().stack);
                loggedSendResponseDeprecationWarning = true;
              }

              didCallSendResponse = true;
              resolve(response);
            };
          });
          let result;

          try {
            result = listener(message, sender, wrappedSendResponse);
          } catch (err) {
            result = Promise.reject(err);
          }

          const isResultThenable = result !== true && isThenable(result); // If the listener didn't returned true or a Promise, or called
          // wrappedSendResponse synchronously, we can exit earlier
          // because there will be no response sent from this listener.

          if (result !== true && !isResultThenable && !didCallSendResponse) {
            return false;
          } // A small helper to send the message if the promise resolves
          // and an error if the promise rejects (a wrapped sendMessage has
          // to translate the message into a resolved promise or a rejected
          // promise).


          const sendPromisedResult = promise => {
            promise.then(msg => {
              // send the message value.
              sendResponse(msg);
            }, error => {
              // Send a JSON representation of the error if the rejected value
              // is an instance of error, or the object itself otherwise.
              let message;

              if (error && (error instanceof Error || typeof error.message === "string")) {
                message = error.message;
              } else {
                message = "An unexpected error occurred";
              }

              sendResponse({
                __mozWebExtensionPolyfillReject__: true,
                message
              });
            }).catch(err => {
              // Print an error on the console if unable to send the response.
              console.error("Failed to send onMessage rejected reply", err);
            });
          }; // If the listener returned a Promise, send the resolved value as a
          // result, otherwise wait the promise related to the wrappedSendResponse
          // callback to resolve and send it as a response.


          if (isResultThenable) {
            sendPromisedResult(result);
          } else {
            sendPromisedResult(sendResponsePromise);
          } // Let Chrome know that the listener is replying.


          return true;
        };
      });

      const wrappedSendMessageCallback = ({
        reject,
        resolve
      }, reply) => {
        if (extensionAPIs.runtime.lastError) {
          // Detect when none of the listeners replied to the sendMessage call and resolve
          // the promise to undefined as in Firefox.
          // See https://github.com/mozilla/webextension-polyfill/issues/130
          if (extensionAPIs.runtime.lastError.message === CHROME_SEND_MESSAGE_CALLBACK_NO_RESPONSE_MESSAGE) {
            resolve();
          } else {
            reject(new Error(extensionAPIs.runtime.lastError.message));
          }
        } else if (reply && reply.__mozWebExtensionPolyfillReject__) {
          // Convert back the JSON representation of the error into
          // an Error instance.
          reject(new Error(reply.message));
        } else {
          resolve(reply);
        }
      };

      const wrappedSendMessage = (name, metadata, apiNamespaceObj, ...args) => {
        if (args.length < metadata.minArgs) {
          throw new Error(`Expected at least ${metadata.minArgs} ${pluralizeArguments(metadata.minArgs)} for ${name}(), got ${args.length}`);
        }

        if (args.length > metadata.maxArgs) {
          throw new Error(`Expected at most ${metadata.maxArgs} ${pluralizeArguments(metadata.maxArgs)} for ${name}(), got ${args.length}`);
        }

        return new Promise((resolve, reject) => {
          const wrappedCb = wrappedSendMessageCallback.bind(null, {
            resolve,
            reject
          });
          args.push(wrappedCb);
          apiNamespaceObj.sendMessage(...args);
        });
      };

      const staticWrappers = {
        devtools: {
          network: {
            onRequestFinished: wrapEvent(onRequestFinishedWrappers)
          }
        },
        runtime: {
          onMessage: wrapEvent(onMessageWrappers),
          onMessageExternal: wrapEvent(onMessageWrappers),
          sendMessage: wrappedSendMessage.bind(null, "sendMessage", {
            minArgs: 1,
            maxArgs: 3
          })
        },
        tabs: {
          sendMessage: wrappedSendMessage.bind(null, "sendMessage", {
            minArgs: 2,
            maxArgs: 3
          })
        }
      };
      const settingMetadata = {
        clear: {
          minArgs: 1,
          maxArgs: 1
        },
        get: {
          minArgs: 1,
          maxArgs: 1
        },
        set: {
          minArgs: 1,
          maxArgs: 1
        }
      };
      apiMetadata.privacy = {
        network: {
          "*": settingMetadata
        },
        services: {
          "*": settingMetadata
        },
        websites: {
          "*": settingMetadata
        }
      };
      return wrapObject(extensionAPIs, staticWrappers, apiMetadata);
    };

    if (typeof chrome != "object" || !chrome || !chrome.runtime || !chrome.runtime.id) {
      throw new Error("This script should only be loaded in a browser extension.");
    } // The build process adds a UMD wrapper around this file, which makes the
    // `module` variable available.


    module.exports = wrapAPIs(chrome);
  } else {
    module.exports = browser;
  }
});


/***/ }),

/***/ 5637:
/***/ ((module, __webpack_exports__, __webpack_require__) => {

"use strict";
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   A: () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _node_modules_css_loader_dist_runtime_sourceMaps_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(2619);
/* harmony import */ var _node_modules_css_loader_dist_runtime_sourceMaps_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_css_loader_dist_runtime_sourceMaps_js__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(7449);
/* harmony import */ var _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _node_modules_css_loader_dist_cjs_js_ruleSet_1_rules_1_use_1_theme_ui_font_css__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(3723);
/* harmony import */ var _node_modules_css_loader_dist_cjs_js_ruleSet_1_rules_1_use_1_theme_ui_landing_css__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(2839);
// Imports




var ___CSS_LOADER_EXPORT___ = _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1___default()((_node_modules_css_loader_dist_runtime_sourceMaps_js__WEBPACK_IMPORTED_MODULE_0___default()));
___CSS_LOADER_EXPORT___.i(_node_modules_css_loader_dist_cjs_js_ruleSet_1_rules_1_use_1_theme_ui_font_css__WEBPACK_IMPORTED_MODULE_2__/* ["default"] */ .A);
___CSS_LOADER_EXPORT___.i(_node_modules_css_loader_dist_cjs_js_ruleSet_1_rules_1_use_1_theme_ui_landing_css__WEBPACK_IMPORTED_MODULE_3__/* ["default"] */ .A);
// Module
___CSS_LOADER_EXPORT___.push([module.id, `/*
 * This file is part of Adblock Plus <https://adblockplus.org/>,
 * Copyright (C) 2006-present eyeo GmbH
 *
 * Adblock Plus is free software: you can redistribute it and/or modify
 * it under the terms of the GNU General Public License version 3 as
 * published by the Free Software Foundation.
 *
 * Adblock Plus is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU General Public License for more details.
 *
 * You should have received a copy of the GNU General Public License
 * along with Adblock Plus.  If not, see <http://www.gnu.org/licenses/>.
 */

/*******************************************************************************
 * Header
 ******************************************************************************/

#title::before {
  margin-top: 15px;
}

#title.block-icon::before {
  background-image: url(/skin/icons/warning.svg);
}

.note {
  padding: 1em;
  border: 1px solid #ffc478;
  border-radius: 6px;
  font-size: 0.9em;
  color: #000;
  background-color: #fff1df;
}

/*******************************************************************************
 * Content
 ******************************************************************************/

#solution > .block-icon::before {
  background-image: url(/skin/icons/checkmark-green.svg);
}

#solution ol {
  position: relative;
  padding: 0;
  margin-top: 2em;
  color: #5a5a5a;
}

#solution ol::before {
  position: absolute;
  top: 0;
  bottom: 0;
  width: 3px;
  height: auto;
  background-color: #e8e8e8;
  content: "";
}

html[dir="ltr"] #solution ol::before {
  left: -2.5em;
}

html[dir="rtl"] #solution ol::before {
  right: -2.5em;
}

#solution li {
  margin: 0 -0.5em;
  padding: 0 0.5em;
}

#solution li:not(:last-child) {
  margin-bottom: 1.5em;
}

#solution a {
  font-weight: 700;
}

#solution :not(li) > a {
  font-size: 30px;
}

#solution a::after {
  display: inline-block;
  width: 0.7em;
  height: 0.7em;
  vertical-align: middle;
  background-image: url(/skin/icons/open-link.svg);
  background-size: contain;
  background-repeat: no-repeat;
  content: "";
}

html[dir="ltr"] #solution a::after {
  margin-left: 0.3em;
}

html[dir="rtl"] #solution a::after {
  margin-right: 0.3em;
  transform: scaleX(-1);
}

#solution .os {
  font-style: normal;
}

#solution .os::after {
  display: inline-block;
  width: 0.8em;
  height: 0.8em;
  background-size: contain;
  background-position: center;
  background-repeat: no-repeat;
  content: "";
}

html[dir="ltr"] #solution .os::after {
  margin-left: 0.3em;
}

html[dir="rtl"] #solution .os::after {
  margin-right: 0.3em;
}

#solution .os.mac::after {
  background-image: url(/skin/icons/mac.svg);
}

#solution .os.windows::after {
  background-image: url(/skin/icons/windows.svg);
}

body[data-application="opera"] [data-hide="opera"],
body:not([data-application="opera"]) [data-show="opera"] {
  display: none;
}
`, "",{"version":3,"sources":["webpack://./src/problem/ui/problem.css"],"names":[],"mappings":"AAAA;;;;;;;;;;;;;;;EAeE;;AAKF;;+EAE+E;;AAE/E;EACE,gBAAgB;AAClB;;AAEA;EACE,8CAA8C;AAChD;;AAEA;EACE,YAAY;EACZ,yBAAyB;EACzB,kBAAkB;EAClB,gBAAgB;EAChB,WAAW;EACX,yBAAyB;AAC3B;;AAEA;;+EAE+E;;AAE/E;EACE,sDAAsD;AACxD;;AAEA;EACE,kBAAkB;EAClB,UAAU;EACV,eAAe;EACf,cAAc;AAChB;;AAEA;EACE,kBAAkB;EAClB,MAAM;EACN,SAAS;EACT,UAAU;EACV,YAAY;EACZ,yBAAyB;EACzB,WAAW;AACb;;AAEA;EACE,YAAY;AACd;;AAEA;EACE,aAAa;AACf;;AAEA;EACE,gBAAgB;EAChB,gBAAgB;AAClB;;AAEA;EACE,oBAAoB;AACtB;;AAEA;EACE,gBAAgB;AAClB;;AAEA;EACE,eAAe;AACjB;;AAEA;EACE,qBAAqB;EACrB,YAAY;EACZ,aAAa;EACb,sBAAsB;EACtB,gDAAgD;EAChD,wBAAwB;EACxB,4BAA4B;EAC5B,WAAW;AACb;;AAEA;EACE,kBAAkB;AACpB;;AAEA;EACE,mBAAmB;EACnB,qBAAqB;AACvB;;AAEA;EACE,kBAAkB;AACpB;;AAEA;EACE,qBAAqB;EACrB,YAAY;EACZ,aAAa;EACb,wBAAwB;EACxB,2BAA2B;EAC3B,4BAA4B;EAC5B,WAAW;AACb;;AAEA;EACE,kBAAkB;AACpB;;AAEA;EACE,mBAAmB;AACrB;;AAEA;EACE,0CAA0C;AAC5C;;AAEA;EACE,8CAA8C;AAChD;;AAEA;;EAEE,aAAa;AACf","sourcesContent":["/*\n * This file is part of Adblock Plus <https://adblockplus.org/>,\n * Copyright (C) 2006-present eyeo GmbH\n *\n * Adblock Plus is free software: you can redistribute it and/or modify\n * it under the terms of the GNU General Public License version 3 as\n * published by the Free Software Foundation.\n *\n * Adblock Plus is distributed in the hope that it will be useful,\n * but WITHOUT ANY WARRANTY; without even the implied warranty of\n * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the\n * GNU General Public License for more details.\n *\n * You should have received a copy of the GNU General Public License\n * along with Adblock Plus.  If not, see <http://www.gnu.org/licenses/>.\n */\n\n@import \"../../theme/ui/font.css\";\n@import \"../../theme/ui/landing.css\";\n\n/*******************************************************************************\n * Header\n ******************************************************************************/\n\n#title::before {\n  margin-top: 15px;\n}\n\n#title.block-icon::before {\n  background-image: url(/skin/icons/warning.svg);\n}\n\n.note {\n  padding: 1em;\n  border: 1px solid #ffc478;\n  border-radius: 6px;\n  font-size: 0.9em;\n  color: #000;\n  background-color: #fff1df;\n}\n\n/*******************************************************************************\n * Content\n ******************************************************************************/\n\n#solution > .block-icon::before {\n  background-image: url(/skin/icons/checkmark-green.svg);\n}\n\n#solution ol {\n  position: relative;\n  padding: 0;\n  margin-top: 2em;\n  color: #5a5a5a;\n}\n\n#solution ol::before {\n  position: absolute;\n  top: 0;\n  bottom: 0;\n  width: 3px;\n  height: auto;\n  background-color: #e8e8e8;\n  content: \"\";\n}\n\nhtml[dir=\"ltr\"] #solution ol::before {\n  left: -2.5em;\n}\n\nhtml[dir=\"rtl\"] #solution ol::before {\n  right: -2.5em;\n}\n\n#solution li {\n  margin: 0 -0.5em;\n  padding: 0 0.5em;\n}\n\n#solution li:not(:last-child) {\n  margin-bottom: 1.5em;\n}\n\n#solution a {\n  font-weight: 700;\n}\n\n#solution :not(li) > a {\n  font-size: 30px;\n}\n\n#solution a::after {\n  display: inline-block;\n  width: 0.7em;\n  height: 0.7em;\n  vertical-align: middle;\n  background-image: url(/skin/icons/open-link.svg);\n  background-size: contain;\n  background-repeat: no-repeat;\n  content: \"\";\n}\n\nhtml[dir=\"ltr\"] #solution a::after {\n  margin-left: 0.3em;\n}\n\nhtml[dir=\"rtl\"] #solution a::after {\n  margin-right: 0.3em;\n  transform: scaleX(-1);\n}\n\n#solution .os {\n  font-style: normal;\n}\n\n#solution .os::after {\n  display: inline-block;\n  width: 0.8em;\n  height: 0.8em;\n  background-size: contain;\n  background-position: center;\n  background-repeat: no-repeat;\n  content: \"\";\n}\n\nhtml[dir=\"ltr\"] #solution .os::after {\n  margin-left: 0.3em;\n}\n\nhtml[dir=\"rtl\"] #solution .os::after {\n  margin-right: 0.3em;\n}\n\n#solution .os.mac::after {\n  background-image: url(/skin/icons/mac.svg);\n}\n\n#solution .os.windows::after {\n  background-image: url(/skin/icons/windows.svg);\n}\n\nbody[data-application=\"opera\"] [data-hide=\"opera\"],\nbody:not([data-application=\"opera\"]) [data-show=\"opera\"] {\n  display: none;\n}\n"],"sourceRoot":""}]);
// Exports
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (___CSS_LOADER_EXPORT___);


/***/ }),

/***/ 3723:
/***/ ((module, __webpack_exports__, __webpack_require__) => {

"use strict";
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   A: () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _node_modules_css_loader_dist_runtime_sourceMaps_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(2619);
/* harmony import */ var _node_modules_css_loader_dist_runtime_sourceMaps_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_css_loader_dist_runtime_sourceMaps_js__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(7449);
/* harmony import */ var _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1__);
// Imports


var ___CSS_LOADER_EXPORT___ = _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1___default()((_node_modules_css_loader_dist_runtime_sourceMaps_js__WEBPACK_IMPORTED_MODULE_0___default()));
// Module
___CSS_LOADER_EXPORT___.push([module.id, `/*
 * This file is part of Adblock Plus <https://adblockplus.org/>,
 * Copyright (C) 2006-present eyeo GmbH
 *
 * Adblock Plus is free software: you can redistribute it and/or modify
 * it under the terms of the GNU General Public License version 3 as
 * published by the Free Software Foundation.
 *
 * Adblock Plus is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU General Public License for more details.
 *
 * You should have received a copy of the GNU General Public License
 * along with Adblock Plus.  If not, see <http://www.gnu.org/licenses/>.
 */

@font-face {
  font-family: "Source Sans Pro";
  font-style: normal;
  font-weight: 300;
  src:
    local("Source Sans Pro Light"),
    local("SourceSansPro-Light"),
    url(/skin/fonts/source-sans-pro-300.woff2) format("woff2");
}

@font-face {
  font-family: "Source Sans Pro";
  font-style: normal;
  font-weight: 400;
  src:
    local("Source Sans Pro Regular"),
    local("SourceSansPro-Regular"),
    url(/skin/fonts/source-sans-pro-400.woff2) format("woff2");
}

@font-face {
  font-family: "Source Sans Pro";
  font-style: normal;
  font-weight: 700;
  src:
    local("Source Sans Pro Bold"),
    local("SourceSansPro-Bold"),
    url(/skin/fonts/source-sans-pro-700.woff2) format("woff2");
}

body {
  font-family: "Source Sans Pro", sans-serif;
  font-size: inherit;
}
`, "",{"version":3,"sources":["webpack://./src/theme/ui/font.css"],"names":[],"mappings":"AAAA;;;;;;;;;;;;;;;EAeE;;AAEF;EACE,8BAA8B;EAC9B,kBAAkB;EAClB,gBAAgB;EAChB;;;8DAG4D;AAC9D;;AAEA;EACE,8BAA8B;EAC9B,kBAAkB;EAClB,gBAAgB;EAChB;;;8DAG4D;AAC9D;;AAEA;EACE,8BAA8B;EAC9B,kBAAkB;EAClB,gBAAgB;EAChB;;;8DAG4D;AAC9D;;AAEA;EACE,0CAA0C;EAC1C,kBAAkB;AACpB","sourcesContent":["/*\n * This file is part of Adblock Plus <https://adblockplus.org/>,\n * Copyright (C) 2006-present eyeo GmbH\n *\n * Adblock Plus is free software: you can redistribute it and/or modify\n * it under the terms of the GNU General Public License version 3 as\n * published by the Free Software Foundation.\n *\n * Adblock Plus is distributed in the hope that it will be useful,\n * but WITHOUT ANY WARRANTY; without even the implied warranty of\n * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the\n * GNU General Public License for more details.\n *\n * You should have received a copy of the GNU General Public License\n * along with Adblock Plus.  If not, see <http://www.gnu.org/licenses/>.\n */\n\n@font-face {\n  font-family: \"Source Sans Pro\";\n  font-style: normal;\n  font-weight: 300;\n  src:\n    local(\"Source Sans Pro Light\"),\n    local(\"SourceSansPro-Light\"),\n    url(/skin/fonts/source-sans-pro-300.woff2) format(\"woff2\");\n}\n\n@font-face {\n  font-family: \"Source Sans Pro\";\n  font-style: normal;\n  font-weight: 400;\n  src:\n    local(\"Source Sans Pro Regular\"),\n    local(\"SourceSansPro-Regular\"),\n    url(/skin/fonts/source-sans-pro-400.woff2) format(\"woff2\");\n}\n\n@font-face {\n  font-family: \"Source Sans Pro\";\n  font-style: normal;\n  font-weight: 700;\n  src:\n    local(\"Source Sans Pro Bold\"),\n    local(\"SourceSansPro-Bold\"),\n    url(/skin/fonts/source-sans-pro-700.woff2) format(\"woff2\");\n}\n\nbody {\n  font-family: \"Source Sans Pro\", sans-serif;\n  font-size: inherit;\n}\n"],"sourceRoot":""}]);
// Exports
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (___CSS_LOADER_EXPORT___);


/***/ }),

/***/ 2839:
/***/ ((module, __webpack_exports__, __webpack_require__) => {

"use strict";
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   A: () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _node_modules_css_loader_dist_runtime_sourceMaps_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(2619);
/* harmony import */ var _node_modules_css_loader_dist_runtime_sourceMaps_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_css_loader_dist_runtime_sourceMaps_js__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(7449);
/* harmony import */ var _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _node_modules_css_loader_dist_cjs_js_ruleSet_1_rules_1_use_1_light_css__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(4146);
// Imports



var ___CSS_LOADER_EXPORT___ = _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1___default()((_node_modules_css_loader_dist_runtime_sourceMaps_js__WEBPACK_IMPORTED_MODULE_0___default()));
___CSS_LOADER_EXPORT___.i(_node_modules_css_loader_dist_cjs_js_ruleSet_1_rules_1_use_1_light_css__WEBPACK_IMPORTED_MODULE_2__/* ["default"] */ .A);
// Module
___CSS_LOADER_EXPORT___.push([module.id, `/*
 * This file is part of Adblock Plus <https://adblockplus.org/>,
 * Copyright (C) 2006-present eyeo GmbH
 *
 * Adblock Plus is free software: you can redistribute it and/or modify
 * it under the terms of the GNU General Public License version 3 as
 * published by the Free Software Foundation.
 *
 * Adblock Plus is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU General Public License for more details.
 *
 * You should have received a copy of the GNU General Public License
 * along with Adblock Plus.  If not, see <http://www.gnu.org/licenses/>.
 */

/*******************************************************************************
 * General
 ******************************************************************************/

:root {
  --color-content: #fff;
  --color-footer: #000;
  --color-highlight: var(--color-brand-primary);
  --color-primary: #0797e1;
  --color-primary-hover: #0789ca;
  --color-secondary: #fafafa;
  --margin: 60px;
  font-size: 16px;
}

body {
  margin: 0;
}

a {
  color: var(--color-link);
}

a.button {
  display: inline-block;
  padding: 1em 2.5em;
  border: 3px solid var(--color-content);
  border-radius: 0.5em;
  font-weight: 600;
  color: var(--color-content);
  background-color: var(--color-primary);
  text-transform: uppercase;
  text-decoration: none;
  transition: all 200ms;
}

a.button:hover {
  background-color: var(--color-primary-hover);
}

a.button.secondary {
  border-color: var(--color-primary);
  color: var(--color-primary);
  background-color: var(--color-content);
}

a.button.secondary:hover {
  border-color: var(--color-primary-hover);
  color: var(--color-content);
  background-color: var(--color-primary-hover);
}

h1,
h2 {
  margin: 0 0 1rem;
}

h1 {
  font-size: 60px;
  line-height: 70px;
}

h2 {
  font-size: 30px;
  line-height: 40px;
}

h2.icon::before {
  display: inline-block;
  width: 23px;
  height: 23px;
  vertical-align: middle;
  background-size: 100%;
  content: "";
}

html[dir="ltr"] h2.icon::before {
  margin-right: 10px;
}

html[dir="rtl"] h2.icon::before {
  margin-left: 10px;
}

.block-icon {
  --icon-width: 40px;
  position: relative;
}

html[dir="ltr"] .block-icon {
  padding-left: calc(var(--icon-width) + 20px);
}

html[dir="rtl"] .block-icon {
  padding-right: calc(var(--icon-width) + 20px);
}

.block-icon::before {
  position: absolute;
  width: var(--icon-width);
  height: var(--icon-width);
  background-size: 100%;
  background-repeat: no-repeat;
  content: "";
}

html[dir="ltr"] .block-icon::before {
  left: 0;
}

html[dir="rtl"] .block-icon::before {
  right: 0;
}

/*******************************************************************************
 * Header
 ******************************************************************************/

header p {
  margin: 1.5em 0;
  color: #5a5a5a;
}

header .block-icon {
  --icon-width: 50px;
}

header a.logo {
  display: inline-block;
  margin-bottom: 70px;
}

header a.logo img {
  width: 200px;
}

#hero {
  flex: 0;
}

html[dir="ltr"] #hero {
  margin-left: 40px;
}

html[dir="rtl"] #hero {
  margin-right: 40px;
}

/*******************************************************************************
 * Footer
 ******************************************************************************/

footer {
  padding: 30px;
  font-size: 0.8rem;
  text-align: center;
  color: var(--color-content);
  background-color: var(--color-footer);
}

#copyright-notice a {
  font-weight: 600;
  text-decoration: none;
  color: inherit;
}

#copyright-notice a:hover {
  text-decoration: underline;
}

/*******************************************************************************
 * Content
 ******************************************************************************/

.content {
  position: relative;
  box-sizing: border-box;
  max-width: 940px;
  margin: auto;
  padding: var(--margin) 0 50px;
}

.content:not(:first-child) {
  padding-top: 0;
}

.content.columns {
  display: flex;
}

.content p {
  margin-top: 0;
  line-height: 26px;
}

.content.columns > div {
  display: flex;
  flex-direction: column;
  flex: 1;
  align-items: flex-start;
  justify-content: center;
}

.content.columns > div:last-child {
  align-items: flex-end;
}

@media (max-width: 960px) {
  .content.columns {
    flex-direction: column;
  }

  .content.columns > div:last-child {
    margin-top: 1em;
    align-items: flex-start;
  }
}

/*******************************************************************************
 * Sections
 ******************************************************************************/

article {
  position: relative;
}

article.primary,
article:last-child {
  margin-bottom: var(--margin);
}

article.primary::after,
article.secondary::before,
article:last-child::after {
  position: absolute;
  width: 100%;
  height: var(--margin);
  content: "";
}

article.primary::after,
article:last-child::after {
  top: 100%;
}

article.secondary::before {
  top: calc(var(--margin) * -1);
}

:not(.columns) > section:not(:first-of-type) {
  margin-top: 75px;
}

article.primary {
  margin-top: calc(100px + var(--margin));
  color: var(--color-content);
  background-color: var(--color-primary);
}

article.primary::after {
  background-image: linear-gradient(
    to bottom right,
    var(--color-primary) 49%,
    var(--color-content) 50%
  );
}

article.secondary {
  background-color: var(--color-secondary);
}

article.secondary::before {
  background-image: linear-gradient(
    to bottom right,
    var(--color-content) 49%,
    var(--color-secondary) 50%
  );
}

article:last-child::after {
  background-image: linear-gradient(
    to bottom right,
    var(--color-content) 49%,
    var(--color-footer) 50%
  );
}

/*******************************************************************************
 * Social
 ******************************************************************************/

#social .content {
  max-width: 230px;
  text-align: center;
}

#social p {
  color: #5a5a5a;
}

#social a {
  display: inline-block;
  width: 3em;
  height: 3em;
  margin: 1em 10px 0;
  border-radius: 1.5em;
  background-color: #000;
  background-position: center;
  background-repeat: no-repeat;
}

#social a.email {
  background-image: url(/skin/icons/email-white.svg);
}

#social a.facebook {
  background-image: url(/skin/icons/facebook-white.svg);
}

#social a.twitter {
  background-image: url(/skin/icons/twitter-white.svg);
}
`, "",{"version":3,"sources":["webpack://./src/theme/ui/landing.css"],"names":[],"mappings":"AAAA;;;;;;;;;;;;;;;EAeE;;AAIF;;+EAE+E;;AAE/E;EACE,qBAAqB;EACrB,oBAAoB;EACpB,6CAA6C;EAC7C,wBAAwB;EACxB,8BAA8B;EAC9B,0BAA0B;EAC1B,cAAc;EACd,eAAe;AACjB;;AAEA;EACE,SAAS;AACX;;AAEA;EACE,wBAAwB;AAC1B;;AAEA;EACE,qBAAqB;EACrB,kBAAkB;EAClB,sCAAsC;EACtC,oBAAoB;EACpB,gBAAgB;EAChB,2BAA2B;EAC3B,sCAAsC;EACtC,yBAAyB;EACzB,qBAAqB;EACrB,qBAAqB;AACvB;;AAEA;EACE,4CAA4C;AAC9C;;AAEA;EACE,kCAAkC;EAClC,2BAA2B;EAC3B,sCAAsC;AACxC;;AAEA;EACE,wCAAwC;EACxC,2BAA2B;EAC3B,4CAA4C;AAC9C;;AAEA;;EAEE,gBAAgB;AAClB;;AAEA;EACE,eAAe;EACf,iBAAiB;AACnB;;AAEA;EACE,eAAe;EACf,iBAAiB;AACnB;;AAEA;EACE,qBAAqB;EACrB,WAAW;EACX,YAAY;EACZ,sBAAsB;EACtB,qBAAqB;EACrB,WAAW;AACb;;AAEA;EACE,kBAAkB;AACpB;;AAEA;EACE,iBAAiB;AACnB;;AAEA;EACE,kBAAkB;EAClB,kBAAkB;AACpB;;AAEA;EACE,4CAA4C;AAC9C;;AAEA;EACE,6CAA6C;AAC/C;;AAEA;EACE,kBAAkB;EAClB,wBAAwB;EACxB,yBAAyB;EACzB,qBAAqB;EACrB,4BAA4B;EAC5B,WAAW;AACb;;AAEA;EACE,OAAO;AACT;;AAEA;EACE,QAAQ;AACV;;AAEA;;+EAE+E;;AAE/E;EACE,eAAe;EACf,cAAc;AAChB;;AAEA;EACE,kBAAkB;AACpB;;AAEA;EACE,qBAAqB;EACrB,mBAAmB;AACrB;;AAEA;EACE,YAAY;AACd;;AAEA;EACE,OAAO;AACT;;AAEA;EACE,iBAAiB;AACnB;;AAEA;EACE,kBAAkB;AACpB;;AAEA;;+EAE+E;;AAE/E;EACE,aAAa;EACb,iBAAiB;EACjB,kBAAkB;EAClB,2BAA2B;EAC3B,qCAAqC;AACvC;;AAEA;EACE,gBAAgB;EAChB,qBAAqB;EACrB,cAAc;AAChB;;AAEA;EACE,0BAA0B;AAC5B;;AAEA;;+EAE+E;;AAE/E;EACE,kBAAkB;EAClB,sBAAsB;EACtB,gBAAgB;EAChB,YAAY;EACZ,6BAA6B;AAC/B;;AAEA;EACE,cAAc;AAChB;;AAEA;EACE,aAAa;AACf;;AAEA;EACE,aAAa;EACb,iBAAiB;AACnB;;AAEA;EACE,aAAa;EACb,sBAAsB;EACtB,OAAO;EACP,uBAAuB;EACvB,uBAAuB;AACzB;;AAEA;EACE,qBAAqB;AACvB;;AAEA;EACE;IACE,sBAAsB;EACxB;;EAEA;IACE,eAAe;IACf,uBAAuB;EACzB;AACF;;AAEA;;+EAE+E;;AAE/E;EACE,kBAAkB;AACpB;;AAEA;;EAEE,4BAA4B;AAC9B;;AAEA;;;EAGE,kBAAkB;EAClB,WAAW;EACX,qBAAqB;EACrB,WAAW;AACb;;AAEA;;EAEE,SAAS;AACX;;AAEA;EACE,6BAA6B;AAC/B;;AAEA;EACE,gBAAgB;AAClB;;AAEA;EACE,uCAAuC;EACvC,2BAA2B;EAC3B,sCAAsC;AACxC;;AAEA;EACE;;;;GAIC;AACH;;AAEA;EACE,wCAAwC;AAC1C;;AAEA;EACE;;;;GAIC;AACH;;AAEA;EACE;;;;GAIC;AACH;;AAEA;;+EAE+E;;AAE/E;EACE,gBAAgB;EAChB,kBAAkB;AACpB;;AAEA;EACE,cAAc;AAChB;;AAEA;EACE,qBAAqB;EACrB,UAAU;EACV,WAAW;EACX,kBAAkB;EAClB,oBAAoB;EACpB,sBAAsB;EACtB,2BAA2B;EAC3B,4BAA4B;AAC9B;;AAEA;EACE,kDAAkD;AACpD;;AAEA;EACE,qDAAqD;AACvD;;AAEA;EACE,oDAAoD;AACtD","sourcesContent":["/*\n * This file is part of Adblock Plus <https://adblockplus.org/>,\n * Copyright (C) 2006-present eyeo GmbH\n *\n * Adblock Plus is free software: you can redistribute it and/or modify\n * it under the terms of the GNU General Public License version 3 as\n * published by the Free Software Foundation.\n *\n * Adblock Plus is distributed in the hope that it will be useful,\n * but WITHOUT ANY WARRANTY; without even the implied warranty of\n * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the\n * GNU General Public License for more details.\n *\n * You should have received a copy of the GNU General Public License\n * along with Adblock Plus.  If not, see <http://www.gnu.org/licenses/>.\n */\n\n@import \"./light.css\";\n\n/*******************************************************************************\n * General\n ******************************************************************************/\n\n:root {\n  --color-content: #fff;\n  --color-footer: #000;\n  --color-highlight: var(--color-brand-primary);\n  --color-primary: #0797e1;\n  --color-primary-hover: #0789ca;\n  --color-secondary: #fafafa;\n  --margin: 60px;\n  font-size: 16px;\n}\n\nbody {\n  margin: 0;\n}\n\na {\n  color: var(--color-link);\n}\n\na.button {\n  display: inline-block;\n  padding: 1em 2.5em;\n  border: 3px solid var(--color-content);\n  border-radius: 0.5em;\n  font-weight: 600;\n  color: var(--color-content);\n  background-color: var(--color-primary);\n  text-transform: uppercase;\n  text-decoration: none;\n  transition: all 200ms;\n}\n\na.button:hover {\n  background-color: var(--color-primary-hover);\n}\n\na.button.secondary {\n  border-color: var(--color-primary);\n  color: var(--color-primary);\n  background-color: var(--color-content);\n}\n\na.button.secondary:hover {\n  border-color: var(--color-primary-hover);\n  color: var(--color-content);\n  background-color: var(--color-primary-hover);\n}\n\nh1,\nh2 {\n  margin: 0 0 1rem;\n}\n\nh1 {\n  font-size: 60px;\n  line-height: 70px;\n}\n\nh2 {\n  font-size: 30px;\n  line-height: 40px;\n}\n\nh2.icon::before {\n  display: inline-block;\n  width: 23px;\n  height: 23px;\n  vertical-align: middle;\n  background-size: 100%;\n  content: \"\";\n}\n\nhtml[dir=\"ltr\"] h2.icon::before {\n  margin-right: 10px;\n}\n\nhtml[dir=\"rtl\"] h2.icon::before {\n  margin-left: 10px;\n}\n\n.block-icon {\n  --icon-width: 40px;\n  position: relative;\n}\n\nhtml[dir=\"ltr\"] .block-icon {\n  padding-left: calc(var(--icon-width) + 20px);\n}\n\nhtml[dir=\"rtl\"] .block-icon {\n  padding-right: calc(var(--icon-width) + 20px);\n}\n\n.block-icon::before {\n  position: absolute;\n  width: var(--icon-width);\n  height: var(--icon-width);\n  background-size: 100%;\n  background-repeat: no-repeat;\n  content: \"\";\n}\n\nhtml[dir=\"ltr\"] .block-icon::before {\n  left: 0;\n}\n\nhtml[dir=\"rtl\"] .block-icon::before {\n  right: 0;\n}\n\n/*******************************************************************************\n * Header\n ******************************************************************************/\n\nheader p {\n  margin: 1.5em 0;\n  color: #5a5a5a;\n}\n\nheader .block-icon {\n  --icon-width: 50px;\n}\n\nheader a.logo {\n  display: inline-block;\n  margin-bottom: 70px;\n}\n\nheader a.logo img {\n  width: 200px;\n}\n\n#hero {\n  flex: 0;\n}\n\nhtml[dir=\"ltr\"] #hero {\n  margin-left: 40px;\n}\n\nhtml[dir=\"rtl\"] #hero {\n  margin-right: 40px;\n}\n\n/*******************************************************************************\n * Footer\n ******************************************************************************/\n\nfooter {\n  padding: 30px;\n  font-size: 0.8rem;\n  text-align: center;\n  color: var(--color-content);\n  background-color: var(--color-footer);\n}\n\n#copyright-notice a {\n  font-weight: 600;\n  text-decoration: none;\n  color: inherit;\n}\n\n#copyright-notice a:hover {\n  text-decoration: underline;\n}\n\n/*******************************************************************************\n * Content\n ******************************************************************************/\n\n.content {\n  position: relative;\n  box-sizing: border-box;\n  max-width: 940px;\n  margin: auto;\n  padding: var(--margin) 0 50px;\n}\n\n.content:not(:first-child) {\n  padding-top: 0;\n}\n\n.content.columns {\n  display: flex;\n}\n\n.content p {\n  margin-top: 0;\n  line-height: 26px;\n}\n\n.content.columns > div {\n  display: flex;\n  flex-direction: column;\n  flex: 1;\n  align-items: flex-start;\n  justify-content: center;\n}\n\n.content.columns > div:last-child {\n  align-items: flex-end;\n}\n\n@media (max-width: 960px) {\n  .content.columns {\n    flex-direction: column;\n  }\n\n  .content.columns > div:last-child {\n    margin-top: 1em;\n    align-items: flex-start;\n  }\n}\n\n/*******************************************************************************\n * Sections\n ******************************************************************************/\n\narticle {\n  position: relative;\n}\n\narticle.primary,\narticle:last-child {\n  margin-bottom: var(--margin);\n}\n\narticle.primary::after,\narticle.secondary::before,\narticle:last-child::after {\n  position: absolute;\n  width: 100%;\n  height: var(--margin);\n  content: \"\";\n}\n\narticle.primary::after,\narticle:last-child::after {\n  top: 100%;\n}\n\narticle.secondary::before {\n  top: calc(var(--margin) * -1);\n}\n\n:not(.columns) > section:not(:first-of-type) {\n  margin-top: 75px;\n}\n\narticle.primary {\n  margin-top: calc(100px + var(--margin));\n  color: var(--color-content);\n  background-color: var(--color-primary);\n}\n\narticle.primary::after {\n  background-image: linear-gradient(\n    to bottom right,\n    var(--color-primary) 49%,\n    var(--color-content) 50%\n  );\n}\n\narticle.secondary {\n  background-color: var(--color-secondary);\n}\n\narticle.secondary::before {\n  background-image: linear-gradient(\n    to bottom right,\n    var(--color-content) 49%,\n    var(--color-secondary) 50%\n  );\n}\n\narticle:last-child::after {\n  background-image: linear-gradient(\n    to bottom right,\n    var(--color-content) 49%,\n    var(--color-footer) 50%\n  );\n}\n\n/*******************************************************************************\n * Social\n ******************************************************************************/\n\n#social .content {\n  max-width: 230px;\n  text-align: center;\n}\n\n#social p {\n  color: #5a5a5a;\n}\n\n#social a {\n  display: inline-block;\n  width: 3em;\n  height: 3em;\n  margin: 1em 10px 0;\n  border-radius: 1.5em;\n  background-color: #000;\n  background-position: center;\n  background-repeat: no-repeat;\n}\n\n#social a.email {\n  background-image: url(/skin/icons/email-white.svg);\n}\n\n#social a.facebook {\n  background-image: url(/skin/icons/facebook-white.svg);\n}\n\n#social a.twitter {\n  background-image: url(/skin/icons/twitter-white.svg);\n}\n"],"sourceRoot":""}]);
// Exports
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (___CSS_LOADER_EXPORT___);


/***/ }),

/***/ 4146:
/***/ ((module, __webpack_exports__, __webpack_require__) => {

"use strict";
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   A: () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _node_modules_css_loader_dist_runtime_sourceMaps_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(2619);
/* harmony import */ var _node_modules_css_loader_dist_runtime_sourceMaps_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_css_loader_dist_runtime_sourceMaps_js__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(7449);
/* harmony import */ var _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1__);
// Imports


var ___CSS_LOADER_EXPORT___ = _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1___default()((_node_modules_css_loader_dist_runtime_sourceMaps_js__WEBPACK_IMPORTED_MODULE_0___default()));
// Module
___CSS_LOADER_EXPORT___.push([module.id, `/*
 * This file is part of Adblock Plus <https://adblockplus.org/>,
 * Copyright (C) 2006-present eyeo GmbH
 *
 * Adblock Plus is free software: you can redistribute it and/or modify
 * it under the terms of the GNU General Public License version 3 as
 * published by the Free Software Foundation.
 *
 * Adblock Plus is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU General Public License for more details.
 *
 * You should have received a copy of the GNU General Public License
 * along with Adblock Plus.  If not, see <http://www.gnu.org/licenses/>.
 */

:root {
  --background-color-cta-primary: #0797e1;
  --background-color-cta-primary-hover: #0797e1ee;
  --background-color-cta-secondary: #fff;
  --background-color-cta-secondary-hover: #0001;
  --background-color-error: #f7dde1;
  --background-color-info: #0797e1;
  --background-color-secondary: #f7f7f7;
  --background-color-primary: #fff;
  --background-color-ternary: #edf9ff;
  --border-color-cta-primary: var(--background-color-cta-primary);
  --border-color-cta-secondary: var(--color-primary);
  --border-color-secondary: #d2d2d2;
  --border-color-primary: #cdcdcd;
  --border-color-ternary: #c0e6f9;
  --border-color-outline: #acacac;
  --border-radius: 4px;
  --border-radius-primary: 6px;
  --border-style-primary: solid;
  --border-width-thick: 4px;
  --border-width-thin: 1px;
  --box-shadow-primary: 0 2px 4px 0 hsla(0, 0%, 84%, 0.5);
  --color-brand-primary: #ed1e45;
  --color-cta-primary: #fff;
  --color-cta-secondary: #666;
  --color-primary: #585858;
  --color-secondary: #000;
  --color-dimmed: #4a4a4a;
  --color-critical: var(--color-brand-primary);
  --color-default: #ff8f00;
  --color-error: var(--color-brand-primary);
  --color-link: #0797e1;
  --color-info: #0797e1;
  --color-premium: #eda51e;
  --color-premium-hover: #eb9b05;
  --font-size-heavy: 20px;
  --font-size-big: 17px;
  --font-size-medium: 16px;
  --font-size-primary: 13px;
  --font-size-small: 12px;
  --margin-primary: 16px;
  --margin-secondary: calc(var(--margin-primary) / 2);
  --padding-primary: 16px;
  --padding-secondary: calc(var(--padding-primary) / 2);
  --primary-outline: var(--border-color-outline) dotted 1px;
}
`, "",{"version":3,"sources":["webpack://./src/theme/ui/light.css"],"names":[],"mappings":"AAAA;;;;;;;;;;;;;;;EAeE;;AAEF;EACE,uCAAuC;EACvC,+CAA+C;EAC/C,sCAAsC;EACtC,6CAA6C;EAC7C,iCAAiC;EACjC,gCAAgC;EAChC,qCAAqC;EACrC,gCAAgC;EAChC,mCAAmC;EACnC,+DAA+D;EAC/D,kDAAkD;EAClD,iCAAiC;EACjC,+BAA+B;EAC/B,+BAA+B;EAC/B,+BAA+B;EAC/B,oBAAoB;EACpB,4BAA4B;EAC5B,6BAA6B;EAC7B,yBAAyB;EACzB,wBAAwB;EACxB,uDAAuD;EACvD,8BAA8B;EAC9B,yBAAyB;EACzB,2BAA2B;EAC3B,wBAAwB;EACxB,uBAAuB;EACvB,uBAAuB;EACvB,4CAA4C;EAC5C,wBAAwB;EACxB,yCAAyC;EACzC,qBAAqB;EACrB,qBAAqB;EACrB,wBAAwB;EACxB,8BAA8B;EAC9B,uBAAuB;EACvB,qBAAqB;EACrB,wBAAwB;EACxB,yBAAyB;EACzB,uBAAuB;EACvB,sBAAsB;EACtB,mDAAmD;EACnD,uBAAuB;EACvB,qDAAqD;EACrD,yDAAyD;AAC3D","sourcesContent":["/*\n * This file is part of Adblock Plus <https://adblockplus.org/>,\n * Copyright (C) 2006-present eyeo GmbH\n *\n * Adblock Plus is free software: you can redistribute it and/or modify\n * it under the terms of the GNU General Public License version 3 as\n * published by the Free Software Foundation.\n *\n * Adblock Plus is distributed in the hope that it will be useful,\n * but WITHOUT ANY WARRANTY; without even the implied warranty of\n * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the\n * GNU General Public License for more details.\n *\n * You should have received a copy of the GNU General Public License\n * along with Adblock Plus.  If not, see <http://www.gnu.org/licenses/>.\n */\n\n:root {\n  --background-color-cta-primary: #0797e1;\n  --background-color-cta-primary-hover: #0797e1ee;\n  --background-color-cta-secondary: #fff;\n  --background-color-cta-secondary-hover: #0001;\n  --background-color-error: #f7dde1;\n  --background-color-info: #0797e1;\n  --background-color-secondary: #f7f7f7;\n  --background-color-primary: #fff;\n  --background-color-ternary: #edf9ff;\n  --border-color-cta-primary: var(--background-color-cta-primary);\n  --border-color-cta-secondary: var(--color-primary);\n  --border-color-secondary: #d2d2d2;\n  --border-color-primary: #cdcdcd;\n  --border-color-ternary: #c0e6f9;\n  --border-color-outline: #acacac;\n  --border-radius: 4px;\n  --border-radius-primary: 6px;\n  --border-style-primary: solid;\n  --border-width-thick: 4px;\n  --border-width-thin: 1px;\n  --box-shadow-primary: 0 2px 4px 0 hsla(0, 0%, 84%, 0.5);\n  --color-brand-primary: #ed1e45;\n  --color-cta-primary: #fff;\n  --color-cta-secondary: #666;\n  --color-primary: #585858;\n  --color-secondary: #000;\n  --color-dimmed: #4a4a4a;\n  --color-critical: var(--color-brand-primary);\n  --color-default: #ff8f00;\n  --color-error: var(--color-brand-primary);\n  --color-link: #0797e1;\n  --color-info: #0797e1;\n  --color-premium: #eda51e;\n  --color-premium-hover: #eb9b05;\n  --font-size-heavy: 20px;\n  --font-size-big: 17px;\n  --font-size-medium: 16px;\n  --font-size-primary: 13px;\n  --font-size-small: 12px;\n  --margin-primary: 16px;\n  --margin-secondary: calc(var(--margin-primary) / 2);\n  --padding-primary: 16px;\n  --padding-secondary: calc(var(--padding-primary) / 2);\n  --primary-outline: var(--border-color-outline) dotted 1px;\n}\n"],"sourceRoot":""}]);
// Exports
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (___CSS_LOADER_EXPORT___);


/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			id: moduleId,
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/compat get default export */
/******/ 	(() => {
/******/ 		// getDefaultExport function for compatibility with non-harmony modules
/******/ 		__webpack_require__.n = (module) => {
/******/ 			var getter = module && module.__esModule ?
/******/ 				() => (module['default']) :
/******/ 				() => (module);
/******/ 			__webpack_require__.d(getter, { a: getter });
/******/ 			return getter;
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/nonce */
/******/ 	(() => {
/******/ 		__webpack_require__.nc = undefined;
/******/ 	})();
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be in strict mode.
(() => {
"use strict";

;// CONCATENATED MODULE: ./src/core/messaging/shared/emitter.ts
class MessageEmitter {
    constructor() {
        this.listeners = new Set();
    }
    addListener(listener) {
        this.listeners.add(listener);
    }
    removeListener(listener) {
        this.listeners.delete(listener);
    }
    dispatch(message, sender) {
        const results = [];
        for (const listener of this.listeners) {
            results.push(listener(message, sender));
        }
        return results;
    }
}

;// CONCATENATED MODULE: ./src/core/messaging/shared/messaging.ts
function getMessageResponse(responses) {
    for (const response of responses) {
        if (typeof response !== "undefined") {
            return response;
        }
    }
}
function isEventMessage(candidate) {
    return isMessage(candidate) && "action" in candidate && "args" in candidate;
}
function isMessage(candidate) {
    return (candidate !== null && typeof candidate === "object" && "type" in candidate);
}
function isListenMessage(candidate) {
    return isMessage(candidate) && "filter" in candidate;
}
function isPremiumActivateOptions(candidate) {
    return (candidate !== null && typeof candidate === "object" && "userId" in candidate);
}
function isPremiumSubscriptionsAddRemoveOptions(candidate) {
    return (candidate !== null &&
        typeof candidate === "object" &&
        "subscriptionType" in candidate);
}

;// CONCATENATED MODULE: ./src/core/messaging/front/messaging.ts

let port;
const connectListeners = new Set();
const disconnectListeners = new Set();
const messageListeners = new Set();
const messageEmitter = new MessageEmitter();
function addConnectListener(listener) {
    connectListeners.add(listener);
    listener();
}
function addDisconnectListener(listener) {
    disconnectListeners.add(listener);
}
function addMessageListener(listener) {
    messageListeners.add(listener);
}
const connect = () => {
    if (port) {
        return port;
    }
    try {
        port = browser.runtime.connect({ name: "ui" });
    }
    catch (ex) {
        port = null;
        disconnectListeners.forEach((listener) => {
            listener();
        });
        return port;
    }
    port.onMessage.addListener((message) => {
        onMessage(message);
    });
    port.onDisconnect.addListener(onDisconnect);
    connectListeners.forEach((listener) => {
        listener();
    });
    return port;
};
function listen({ type, filter, ...options }) {
    addConnectListener(() => {
        if (port) {
            port.postMessage({
                type: `${type}.listen`,
                filter,
                ...options
            });
        }
    });
}
function onDisconnect() {
    port = null;
    setTimeout(() => connect(), 100);
}
function onMessage(message) {
    if (!message.type.endsWith(".respond")) {
        return;
    }
    messageListeners.forEach((listener) => {
        listener(message);
    });
}
function removeDisconnectListener(listener) {
    disconnectListeners.delete(listener);
}
function start() {
    connect();
    if (typeof browser.devtools === "undefined") {
        browser.runtime.onMessage.addListener((message, sender) => {
            if (!isMessage(message)) {
                return;
            }
            const responses = messageEmitter.dispatch(message, sender);
            const response = getMessageResponse(responses);
            if (typeof response === "undefined") {
                return;
            }
            return Promise.resolve(response);
        });
    }
}
start();

;// CONCATENATED MODULE: ./src/core/messaging/front/utils.ts
async function utils_send(sendType, options = {}) {
    const args = {
        ...options,
        type: sendType
    };
    return await browser.runtime.sendMessage(args);
}

;// CONCATENATED MODULE: ./src/core/messaging/front/category-app.ts


const platformToStore = new Map([
    ["chromium", "chrome"],
    ["edgehtml", "edge"],
    ["gecko", "firefox"]
]);
async function get(what) {
    const options = { what };
    return await utils_send("app.get", options);
}
async function getInfo() {
    var _a;
    const [application, platform] = await Promise.all([
        get("application"),
        get("platform")
    ]);
    let store;
    if (application !== "edge" && application !== "opera") {
        store = (_a = platformToStore.get(platform)) !== null && _a !== void 0 ? _a : "chrome";
    }
    else {
        store = application;
    }
    return {
        application,
        manifestVersion: browser.runtime.getManifest().manifest_version,
        platform,
        store
    };
}
function category_app_listen(filter) {
    listen({ type: "app", filter });
}
async function category_app_open(what, parameters = {}) {
    const options = { what, ...parameters };
    await utils_send("app.open", options);
}

;// CONCATENATED MODULE: ./src/core/messaging/front/category-doclinks.ts

async function category_doclinks_get(link) {
    const options = { what: "doclink", link };
    return await utils_send("app.get", options);
}

;// CONCATENATED MODULE: ./src/core/messaging/front/category-filters.ts


async function category_filters_get() {
    return await send("filters.get");
}
function category_filters_listen(filter) {
    messaging.listen({ type: "filters", filter });
}

;// CONCATENATED MODULE: ./src/core/messaging/front/category-prefs.ts


async function category_prefs_get(key) {
    const options = { key };
    return await send("prefs.get", options);
}
function category_prefs_listen(filter) {
    messaging.listen({ type: "prefs", filter });
}

;// CONCATENATED MODULE: ./src/core/messaging/front/category-premium.ts


async function activate(userId) {
    const options = { userId };
    return await send("premium.activate", options);
}
async function add(subscriptionType) {
    const options = { subscriptionType };
    await send("premium.subscriptions.add", options);
}
async function category_premium_get() {
    return await send("premium.get");
}
async function getPremiumSubscriptionsState() {
    return await send("premium.subscriptions.getState");
}
function category_premium_listen(filter) {
    messaging.listen({ type: "premium", filter });
}
async function remove(subscriptionType) {
    const options = { subscriptionType };
    await send("premium.subscriptions.remove", options);
}

;// CONCATENATED MODULE: ./src/core/messaging/front/category-requests.ts

function category_requests_listen(filter, tabId) {
    messaging.listen({ type: "requests", filter, tabId });
}

;// CONCATENATED MODULE: ./src/core/messaging/front/category-stats.ts


async function getBlockedPerPage(tab) {
    const options = { tab };
    return await send("stats.getBlockedPerPage", options);
}
async function getBlockedTotal() {
    return await send("stats.getBlockedTotal");
}
function category_stats_listen(filter) {
    messaging.listen({ type: "stats", filter });
}

;// CONCATENATED MODULE: ./src/core/messaging/front/category-subscriptions.ts


async function category_subscriptions_add(url) {
    const options = { url };
    return await send("subscriptions.add", options);
}
async function category_subscriptions_get(options) {
    return await send("subscriptions.get", options !== null && options !== void 0 ? options : {});
}
async function getInitIssues() {
    return await send("subscriptions.getInitIssues");
}
async function getRecommendations() {
    return await send("subscriptions.getRecommendations");
}
function category_subscriptions_listen(filter) {
    messaging.listen({ type: "subscriptions", filter });
}
async function category_subscriptions_remove(url) {
    const options = { url };
    await send("subscriptions.remove", options);
}

;// CONCATENATED MODULE: ./src/core/messaging/front/index.ts



















;// CONCATENATED MODULE: ./js/common.mjs
/*
 * This file is part of Adblock Plus <https://adblockplus.org/>,
 * Copyright (C) 2006-present eyeo GmbH
 *
 * Adblock Plus is free software: you can redistribute it and/or modify
 * it under the terms of the GNU General Public License version 3 as
 * published by the Free Software Foundation.
 *
 * Adblock Plus is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU General Public License for more details.
 *
 * You should have received a copy of the GNU General Public License
 * along with Adblock Plus.  If not, see <http://www.gnu.org/licenses/>.
 */

function convertDoclinks() {
  const links = document.querySelectorAll("a[data-doclink]");
  for (const link of links) {
    getDoclink(link.dataset.doclink).then((url) => {
      link.target = link.target || "_blank";
      link.href = url;
    });
  }
}

function getDoclink(link) {
  return browser.runtime.sendMessage({
    type: "app.get",
    what: "doclink",
    link
  });
}

function getErrorMessage(error) {
  let message = null;
  if (error) {
    let messageId = error.reason || error.type;
    let placeholders = [];
    if (error.reason === "filter_unknown_option") {
      if (error.option) placeholders = [error.option];
      else messageId = "filter_invalid_option";
    }

    message = browser.i18n.getMessage(messageId, placeholders);
  }

  // Use a generic error message if we don't have one available yet
  if (!message) {
    message = browser.i18n.getMessage("filter_action_failed");
  }

  if (!error || typeof error.lineno !== "number") return message;

  return browser.i18n.getMessage("line", [
    error.lineno.toLocaleString(),
    message
  ]);
}

function getSourceAttribute(element) {
  const sourceContainer = element.closest("[data-source]");

  if (!sourceContainer) return null;

  return sourceContainer.dataset.source;
}

;// CONCATENATED MODULE: ./js/dom.mjs
/*
 * This file is part of Adblock Plus <https://adblockplus.org/>,
 * Copyright (C) 2006-present eyeo GmbH
 *
 * Adblock Plus is free software: you can redistribute it and/or modify
 * it under the terms of the GNU General Public License version 3 as
 * published by the Free Software Foundation.
 *
 * Adblock Plus is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU General Public License for more details.
 *
 * You should have received a copy of the GNU General Public License
 * along with Adblock Plus.  If not, see <http://www.gnu.org/licenses/>.
 */

const $ = (selector, container) => {
  if (!container) container = document;
  return container.querySelector(selector);
};
const $$ = (selector, container) => {
  if (!container) container = document;
  return container.querySelectorAll(selector);
};

// basic copy and paste clipboard utility
const clipboard = {
  // warning: Firefox needs a proper event to work
  //          such click or mousedown or similar.
  copy(text) {
    const selection = document.getSelection();
    const selected = selection.rangeCount > 0 ? selection.getRangeAt(0) : null;
    const el = document.createElement("textarea");
    el.value = text;
    el.setAttribute("readonly", "");
    el.style.cssText = "position:fixed;top:-999px";
    document.body.appendChild(el).select();
    document.execCommand("copy");
    document.body.removeChild(el);
    if (selected) {
      selection.removeAllRanges();
      // simply putting back selected doesn't work anymore
      const range = document.createRange();
      range.setStart(selected.startContainer, selected.startOffset);
      range.setEnd(selected.endContainer, selected.endOffset);
      selection.addRange(range);
    }
  },
  // optionally accepts a `paste` DOM event
  // it uses global clipboardData, if available, otherwise.
  // i.e. input.onpaste = event => console.log(dom.clipboard.paste(event));
  paste(event) {
    if (!event) event = window;
    const clipboardData = event.clipboardData || window.clipboardData;
    return clipboardData ? clipboardData.getData("text") : "";
  }
};

// helper to provide the relative coordinates
// to the closest positioned containing element
function relativeCoordinates(event) {
  return { x: event.offsetX, y: event.offsetY };
}

// helper to format as indented string any HTML/XML node
function asIndentedString(element, indentation = 0) {
  // only the first time it's called
  if (!indentation) {
    // get the top meaningful element to parse
    if (element.nodeType === Node.DOCUMENT_NODE)
      element = element.documentElement;
    // accept only elements
    if (element.nodeType !== Node.ELEMENT_NODE)
      throw new Error("Unable to serialize " + element);
    // avoid original XML pollution at first iteration
    element = element.cloneNode(true);
  }
  const before = "  ".repeat(indentation + 1);
  const after = "  ".repeat(indentation);
  const doc = element.ownerDocument;
  for (const child of Array.from(element.childNodes)) {
    const { nodeType } = child;
    if (nodeType === Node.ELEMENT_NODE || nodeType === Node.TEXT_NODE) {
      if (nodeType === Node.TEXT_NODE) {
        const content = child.textContent.trim();
        child.textContent = content.length ? `\n${before}${content}` : "";
      } else {
        element.insertBefore(doc.createTextNode(`\n${before}`), child);
        asIndentedString(child, indentation + 1);
      }
    }
    if (child === element.lastChild)
      element.appendChild(doc.createTextNode(`\n${after}`));
  }
  // inner calls don't need to bother serialization
  if (indentation) return "";
  // easiest way to recognize an HTML element from an XML one
  if (/^https?:\/\/www\.w3\.org\/1999\/xhtml$/.test(element.namespaceURI))
    return element.outerHTML;
  // all other elements should use XML serializer
  return new XMLSerializer().serializeToString(element);
}

// EXTERNAL MODULE: ../../node_modules/webextension-polyfill/dist/browser-polyfill.js
var browser_polyfill = __webpack_require__(528);
var browser_polyfill_default = /*#__PURE__*/__webpack_require__.n(browser_polyfill);
;// CONCATENATED MODULE: ./src/i18n/i18n.ts

const i18nAttributes = ["alt", "placeholder", "title", "value"];
function assignAction(elements, action) {
    for (const element of elements) {
        switch (typeof action) {
            case "string":
                element.href = action;
                element.target = "_blank";
                break;
            case "function":
                element.href = "#";
                element.addEventListener("click", (ev) => {
                    ev.preventDefault();
                    action();
                });
                break;
        }
    }
}
function* getRemainingLinks(parent) {
    const links = parent.querySelectorAll("a:not([data-i18n-index])");
    for (const link of links) {
        yield link;
    }
}
function setElementLinks(idOrElement, ...actions) {
    var _a;
    const element = typeof idOrElement === "string"
        ? document.getElementById(idOrElement)
        : idOrElement;
    if (element === null) {
        return;
    }
    const remainingLinks = getRemainingLinks(element);
    for (let i = 0; i < actions.length; i++) {
        const links = element.querySelectorAll(`a[data-i18n-index='${i}']`);
        if (links.length > 0) {
            assignAction(links, actions[i]);
            continue;
        }
        const link = remainingLinks.next();
        if ((_a = link.done) !== null && _a !== void 0 ? _a : false)
            continue;
        assignAction([link.value], actions[i]);
    }
}
function stripTagsUnsafe(text) {
    return text.replace(/<\/?[^>]+>/g, "");
}
function setElementText(element, stringName, args, children = []) {
    function processString(str, currentElement) {
        const match = /^(.*?)<(a|em|slot|strong)(\d)?>(.*?)<\/\2\3>(.*)$/.exec(str);
        if (match !== null) {
            const [, before, name, index, innerText, after] = match;
            processString(before, currentElement);
            if (name === "slot") {
                const e = children[Number(index)];
                if (e !== undefined) {
                    currentElement.appendChild(e);
                }
            }
            else {
                const e = document.createElement(name);
                if (typeof index !== "undefined") {
                    e.dataset.i18nIndex = index;
                }
                processString(innerText, e);
                currentElement.appendChild(e);
            }
            processString(after, currentElement);
        }
        else
            currentElement.appendChild(document.createTextNode(str));
    }
    while (element.lastChild !== null) {
        element.removeChild(element.lastChild);
    }
    processString(browser_polyfill_default().i18n.getMessage(stringName, args), element);
}
function loadI18nStrings() {
    function resolveStringNames(container) {
        var _a, _b;
        if (container === null || container === undefined) {
            return;
        }
        {
            const elements = container.querySelectorAll("[data-i18n]");
            for (const element of elements) {
                const children = Array.from(element.children);
                setElementText(element, (_a = element.dataset.i18n) !== null && _a !== void 0 ? _a : "", null, children);
            }
        }
        for (const attr of i18nAttributes) {
            const elements = container.querySelectorAll(`[data-i18n-${attr}]`);
            for (const element of elements) {
                const stringName = (_b = element.getAttribute(`data-i18n-${attr}`)) !== null && _b !== void 0 ? _b : "";
                element.setAttribute(attr, browser_polyfill_default().i18n.getMessage(stringName));
            }
        }
    }
    resolveStringNames(document);
    for (const template of document.querySelectorAll("template")) {
        resolveStringNames(template.content);
    }
}
async function setLanguageAttributes() {
    const localeInfo = await browser_polyfill_default().runtime.sendMessage({
        type: "app.get",
        what: "localeInfo"
    });
    document.documentElement.lang = localeInfo.locale;
    document.documentElement.dir = localeInfo.bidiDir;
}
function initI18n() {
    void setLanguageAttributes();
    loadI18nStrings();
}

;// CONCATENATED MODULE: ./src/i18n/index.ts


// EXTERNAL MODULE: ../../node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js
var injectStylesIntoStyleTag = __webpack_require__(3465);
var injectStylesIntoStyleTag_default = /*#__PURE__*/__webpack_require__.n(injectStylesIntoStyleTag);
// EXTERNAL MODULE: ../../node_modules/style-loader/dist/runtime/styleDomAPI.js
var styleDomAPI = __webpack_require__(6622);
var styleDomAPI_default = /*#__PURE__*/__webpack_require__.n(styleDomAPI);
// EXTERNAL MODULE: ../../node_modules/style-loader/dist/runtime/insertBySelector.js
var insertBySelector = __webpack_require__(5814);
var insertBySelector_default = /*#__PURE__*/__webpack_require__.n(insertBySelector);
// EXTERNAL MODULE: ../../node_modules/style-loader/dist/runtime/setAttributesWithoutAttributes.js
var setAttributesWithoutAttributes = __webpack_require__(9337);
var setAttributesWithoutAttributes_default = /*#__PURE__*/__webpack_require__.n(setAttributesWithoutAttributes);
// EXTERNAL MODULE: ../../node_modules/style-loader/dist/runtime/insertStyleElement.js
var insertStyleElement = __webpack_require__(2389);
var insertStyleElement_default = /*#__PURE__*/__webpack_require__.n(insertStyleElement);
// EXTERNAL MODULE: ../../node_modules/style-loader/dist/runtime/styleTagTransform.js
var styleTagTransform = __webpack_require__(8722);
var styleTagTransform_default = /*#__PURE__*/__webpack_require__.n(styleTagTransform);
// EXTERNAL MODULE: ../../node_modules/css-loader/dist/cjs.js??ruleSet[1].rules[1].use[1]!./src/problem/ui/problem.css
var problem = __webpack_require__(5637);
;// CONCATENATED MODULE: ./src/problem/ui/problem.css

      
      
      
      
      
      
      
      
      

var options = {};

options.styleTagTransform = (styleTagTransform_default());
options.setAttributes = (setAttributesWithoutAttributes_default());

      options.insert = insertBySelector_default().bind(null, "head");
    
options.domAPI = (styleDomAPI_default());
options.insertStyleElement = (insertStyleElement_default());

var update = injectStylesIntoStyleTag_default()(problem/* default */.A, options);




       /* harmony default export */ const ui_problem = (problem/* default */.A && problem/* default */.A.locals ? problem/* default */.A.locals : undefined);

;// CONCATENATED MODULE: ./js/landing.mjs
/*
 * This file is part of Adblock Plus <https://adblockplus.org/>,
 * Copyright (C) 2006-present eyeo GmbH
 *
 * Adblock Plus is free software: you can redistribute it and/or modify
 * it under the terms of the GNU General Public License version 3 as
 * published by the Free Software Foundation.
 *
 * Adblock Plus is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU General Public License for more details.
 *
 * You should have received a copy of the GNU General Public License
 * along with Adblock Plus.  If not, see <http://www.gnu.org/licenses/>.
 */




function initCopyrightNotice() {
  category_doclinks_get("eyeo").then((url) => {
    const year = new Date().getFullYear().toString();
    const notice = document.getElementById("copyright-notice");
    setElementText(notice, "common_copyright", year);
    setElementLinks("copyright-notice", url);
  });
}

initCopyrightNotice();

;// CONCATENATED MODULE: ./js/pages/problem.mjs
/*
 * This file is part of Adblock Plus <https://adblockplus.org/>,
 * Copyright (C) 2006-present eyeo GmbH
 *
 * Adblock Plus is free software: you can redistribute it and/or modify
 * it under the terms of the GNU General Public License version 3 as
 * published by the Free Software Foundation.
 *
 * Adblock Plus is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU General Public License for more details.
 *
 * You should have received a copy of the GNU General Public License
 * along with Adblock Plus.  If not, see <http://www.gnu.org/licenses/>.
 */









getInfo().then((info) => {
  document.body.dataset.application = info.application;

  category_doclinks_get(`${info.store}_store`).then((url) => {
    $("#store-link").href = url;
  });
});

function initOSReference(name, idx) {
  const element = $(`#solution em[data-i18n-index="${idx}"]`);
  element.classList.add("os", name);
  element.title = browser.i18n.getMessage(`problem_os_${name}`);
}

convertDoclinks();
initI18n();
["windows", "mac"].forEach(initOSReference);
document.body.hidden = false;

})();

/******/ })()
;
//# sourceMappingURL=problem.js.map