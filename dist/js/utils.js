/******/ (() => { // webpackBootstrap
/******/ 	var __webpack_modules__ = ({

/***/ "./.yarn/cache/custom-event-polyfill-npm-0.3.0-6a9715e632-449d8e8497.zip/node_modules/custom-event-polyfill/custom-event-polyfill.js":
/*!*******************************************************************************************************************************************!*\
  !*** ./.yarn/cache/custom-event-polyfill-npm-0.3.0-6a9715e632-449d8e8497.zip/node_modules/custom-event-polyfill/custom-event-polyfill.js ***!
  \*******************************************************************************************************************************************/
/***/ (() => {

// Polyfill for creating CustomEvents on IE9/10/11

// code pulled from:
// https://github.com/d4tocchini/customevent-polyfill
// https://developer.mozilla.org/en-US/docs/Web/API/CustomEvent#Polyfill

try {
    var ce = new window.CustomEvent('test');
    ce.preventDefault();
    if (ce.defaultPrevented !== true) {
        // IE has problems with .preventDefault() on custom events
        // http://stackoverflow.com/questions/23349191
        throw new Error('Could not prevent default');
    }
} catch(e) {
  var CustomEvent = function(event, params) {
    var evt, origPrevent;
    params = params || {
      bubbles: false,
      cancelable: false,
      detail: undefined
    };

    evt = document.createEvent("CustomEvent");
    evt.initCustomEvent(event, params.bubbles, params.cancelable, params.detail);
    origPrevent = evt.preventDefault;
    evt.preventDefault = function () {
      origPrevent.call(this);
      try {
        Object.defineProperty(this, 'defaultPrevented', {
          get: function () {
            return true;
          }
        });
      } catch(e) {
        this.defaultPrevented = true;
      }
    };
    return evt;
  };

  CustomEvent.prototype = window.Event.prototype;
  window.CustomEvent = CustomEvent; // expose definition to window
}


/***/ }),

/***/ "./.yarn/cache/custom-select-npm-1.1.15-e87477f266-dd8018de02.zip/node_modules/custom-select/build/index.js":
/*!******************************************************************************************************************!*\
  !*** ./.yarn/cache/custom-select-npm-1.1.15-e87477f266-dd8018de02.zip/node_modules/custom-select/build/index.js ***!
  \******************************************************************************************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";


Object.defineProperty(exports, "__esModule", ({
  value: true
}));

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }(); /**
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                          * custom-select
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                          * A lightweight JS script for custom select creation.
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                          * Needs no dependencies.
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                          *
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                          * v0.0.1
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                          * (https://github.com/custom-select/custom-select)
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                          *
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                          * Copyright (c) 2016 Gionatan Lombardi & Marco Nucara
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                          * MIT License
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                          */

exports["default"] = customSelect;

__webpack_require__(/*! custom-event-polyfill */ "./.yarn/cache/custom-event-polyfill-npm-0.3.0-6a9715e632-449d8e8497.zip/node_modules/custom-event-polyfill/custom-event-polyfill.js");

var defaultParams = {
  containerClass: 'custom-select-container',
  openerClass: 'custom-select-opener',
  panelClass: 'custom-select-panel',
  optionClass: 'custom-select-option',
  optgroupClass: 'custom-select-optgroup',
  isSelectedClass: 'is-selected',
  hasFocusClass: 'has-focus',
  isDisabledClass: 'is-disabled',
  isOpenClass: 'is-open'
};

function builder(el, builderParams) {
  var containerClass = 'customSelect';
  var isOpen = false;
  var uId = '';
  var select = el;
  var container = void 0;
  var opener = void 0;
  var focusedElement = void 0;
  var selectedElement = void 0;
  var panel = void 0;
  var currLabel = void 0;

  var resetSearchTimeout = void 0;
  var searchKey = '';

  //
  // Inner Functions
  //

  // Sets the focused element with the neccessary classes substitutions
  function setFocusedElement(cstOption) {
    if (focusedElement) {
      focusedElement.classList.remove(builderParams.hasFocusClass);
    }
    if (typeof cstOption !== 'undefined') {
      focusedElement = cstOption;
      focusedElement.classList.add(builderParams.hasFocusClass);
      // Offset update: checks if the focused element is in the visible part of the panelClass
      // if not dispatches a custom event
      if (isOpen) {
        if (cstOption.offsetTop < cstOption.offsetParent.scrollTop || cstOption.offsetTop > cstOption.offsetParent.scrollTop + cstOption.offsetParent.clientHeight - cstOption.clientHeight) {
          cstOption.dispatchEvent(new CustomEvent('custom-select:focus-outside-panel', { bubbles: true }));
        }
      }
    } else {
      focusedElement = undefined;
    }
  }

  // Reassigns the focused and selected custom option
  // Updates the opener text
  // IMPORTANT: the setSelectedElement function doesn't change the select value!
  function setSelectedElement(cstOption) {
    if (selectedElement) {
      selectedElement.classList.remove(builderParams.isSelectedClass);
      selectedElement.removeAttribute('id');
      opener.removeAttribute('aria-activedescendant');
    }
    if (typeof cstOption !== 'undefined') {
      cstOption.classList.add(builderParams.isSelectedClass);
      cstOption.setAttribute('id', containerClass + '-' + uId + '-selectedOption');
      opener.setAttribute('aria-activedescendant', containerClass + '-' + uId + '-selectedOption');
      selectedElement = cstOption;
      opener.children[0].textContent = selectedElement.customSelectOriginalOption.text;
    } else {
      selectedElement = undefined;
      opener.children[0].textContent = '';
    }
    setFocusedElement(cstOption);
  }

  function setValue(value) {
    // Gets the option with the provided value
    var toSelect = select.querySelector('option[value=\'' + value + '\']');
    // If no option has the provided value get the first
    if (!toSelect) {
      var _select$options = _slicedToArray(select.options, 1);

      toSelect = _select$options[0];
    }
    // The option with the provided value becomes the selected one
    // And changes the select current value
    toSelect.selected = true;

    setSelectedElement(select.options[select.selectedIndex].customSelectCstOption);
  }

  function moveFocuesedElement(direction) {
    // Get all the .custom-select-options
    // Get the index of the current focused one
    var currentFocusedIndex = [].indexOf.call(select.options, focusedElement.customSelectOriginalOption);
    // If the next or prev custom option exist
    // Sets it as the new focused one
    if (select.options[currentFocusedIndex + direction]) {
      setFocusedElement(select.options[currentFocusedIndex + direction].customSelectCstOption);
    }
  }

  // Open/Close function (toggle)
  function open(bool) {
    // Open
    if (bool || typeof bool === 'undefined') {
      // If present closes an opened instance of the plugin
      // Only one at time can be open
      var openedCustomSelect = document.querySelector('.' + containerClass + '.' + builderParams.isOpenClass);
      if (openedCustomSelect) {
        openedCustomSelect.customSelect.open = false;
      }

      // Opens only the clicked one
      container.classList.add(builderParams.isOpenClass);

      // aria-expanded update
      container.classList.add(builderParams.isOpenClass);
      opener.setAttribute('aria-expanded', 'true');

      // Updates the scrollTop position of the panel in relation with the focused option
      if (selectedElement) {
        panel.scrollTop = selectedElement.offsetTop;
      }

      // Dispatches the custom event open
      container.dispatchEvent(new CustomEvent('custom-select:open'));

      // Sets the global state
      isOpen = true;

      // Close
    } else {
      // Removes the css classes
      container.classList.remove(builderParams.isOpenClass);

      // aria-expanded update
      opener.setAttribute('aria-expanded', 'false');

      // Sets the global state
      isOpen = false;

      // When closing the panel the focused custom option must be the selected one
      setFocusedElement(selectedElement);

      // Dispatches the custom event close
      container.dispatchEvent(new CustomEvent('custom-select:close'));
    }
    return isOpen;
  }

  function clickEvent(e) {
    // Opener click
    if (e.target === opener || opener.contains(e.target)) {
      if (isOpen) {
        open(false);
      } else {
        open();
      }
      // Custom Option click
    } else if (e.target.classList && e.target.classList.contains(builderParams.optionClass) && panel.contains(e.target)) {
      setSelectedElement(e.target);
      // Sets the corrisponding select's option to selected updating the select's value too
      selectedElement.customSelectOriginalOption.selected = true;
      open(false);
      // Triggers the native change event of the select
      select.dispatchEvent(new CustomEvent('change'));
      // click on label or select (click on label corrispond to select click)
    } else if (e.target === select) {
      // if the original select is focusable (for any external reason) let the focus
      // else trigger the focus on opener
      if (opener !== document.activeElement && select !== document.activeElement) {
        opener.focus();
      }
      // Click outside the container closes the panel
    } else if (isOpen && !container.contains(e.target)) {
      open(false);
    }
  }

  function mouseoverEvent(e) {
    // On mouse move over and options it bacames the focused one
    if (e.target.classList && e.target.classList.contains(builderParams.optionClass)) {
      setFocusedElement(e.target);
    }
  }

  function keydownEvent(e) {
    if (!isOpen) {
      // On "Arrow down", "Arrow up" and "Space" keys opens the panel
      if (e.keyCode === 40 || e.keyCode === 38 || e.keyCode === 32) {
        open();
      }
    } else {
      switch (e.keyCode) {
        case 13:
        case 32:
          // On "Enter" or "Space" selects the focused element as the selected one
          setSelectedElement(focusedElement);
          // Sets the corrisponding select's option to selected updating the select's value too
          selectedElement.customSelectOriginalOption.selected = true;
          // Triggers the native change event of the select
          select.dispatchEvent(new CustomEvent('change'));
          open(false);
          break;
        case 27:
          // On "Escape" closes the panel
          open(false);
          break;

        case 38:
          // On "Arrow up" set focus to the prev option if present
          moveFocuesedElement(-1);
          break;
        case 40:
          // On "Arrow down" set focus to the next option if present
          moveFocuesedElement(+1);
          break;
        default:
          // search in panel (autocomplete)
          if (e.keyCode >= 48 && e.keyCode <= 90) {
            // clear existing reset timeout
            if (resetSearchTimeout) {
              clearTimeout(resetSearchTimeout);
            }

            // reset timeout for empty search key
            resetSearchTimeout = setTimeout(function () {
              searchKey = '';
            }, 1500);

            // update search keyword appending the current key
            searchKey += String.fromCharCode(e.keyCode);

            // search the element
            for (var i = 0, l = select.options.length; i < l; i++) {
              // removed cause not supported by IE:
              // if (options[i].text.startsWith(searchKey))
              if (select.options[i].text.toUpperCase().substr(0, searchKey.length) === searchKey) {
                setFocusedElement(select.options[i].customSelectCstOption);
                break;
              }
            }
          }
          break;
      }
    }
  }

  function changeEvent() {
    var index = select.selectedIndex;
    var element = index === -1 ? undefined : select.options[index].customSelectCstOption;

    setSelectedElement(element);
  }

  // When the option is outside the visible part of the opened panel, updates the scrollTop position
  // This is the default behaviour
  // To block it the plugin user must
  // add a "custom-select:focus-outside-panel" eventListener on the panel
  // with useCapture set to true
  // and stopPropagation
  function scrollToFocused(e) {
    var currPanel = e.currentTarget;
    var currOption = e.target;
    // Up
    if (currOption.offsetTop < currPanel.scrollTop) {
      currPanel.scrollTop = currOption.offsetTop;
      // Down
    } else {
      currPanel.scrollTop = currOption.offsetTop + currOption.clientHeight - currPanel.clientHeight;
    }
  }

  function addEvents() {
    document.addEventListener('click', clickEvent);
    panel.addEventListener('mouseover', mouseoverEvent);
    panel.addEventListener('custom-select:focus-outside-panel', scrollToFocused);
    select.addEventListener('change', changeEvent);
    container.addEventListener('keydown', keydownEvent);
  }

  function removeEvents() {
    document.removeEventListener('click', clickEvent);
    panel.removeEventListener('mouseover', mouseoverEvent);
    panel.removeEventListener('custom-select:focus-outside-panel', scrollToFocused);
    select.removeEventListener('change', changeEvent);
    container.removeEventListener('keydown', keydownEvent);
  }

  function disabled(bool) {
    if (bool && !select.disabled) {
      container.classList.add(builderParams.isDisabledClass);
      select.disabled = true;
      opener.removeAttribute('tabindex');
      container.dispatchEvent(new CustomEvent('custom-select:disabled'));
      removeEvents();
    } else if (!bool && select.disabled) {
      container.classList.remove(builderParams.isDisabledClass);
      select.disabled = false;
      opener.setAttribute('tabindex', '0');
      container.dispatchEvent(new CustomEvent('custom-select:enabled'));
      addEvents();
    }
  }

  // Form a given select children DOM tree (options and optgroup),
  // Creates the corresponding custom HTMLElements list (divs with different classes and attributes)
  function parseMarkup(children) {
    var nodeList = children;
    var cstList = [];

    if (typeof nodeList.length === 'undefined') {
      throw new TypeError('Invalid Argument');
    }

    for (var i = 0, li = nodeList.length; i < li; i++) {
      if (nodeList[i] instanceof HTMLElement && nodeList[i].tagName.toUpperCase() === 'OPTGROUP') {
        var cstOptgroup = document.createElement('div');
        cstOptgroup.classList.add(builderParams.optgroupClass);
        cstOptgroup.setAttribute('data-label', nodeList[i].label);

        // IMPORTANT: Stores in a property of the created custom option group
        // a hook to the the corrisponding select's option group
        cstOptgroup.customSelectOriginalOptgroup = nodeList[i];

        // IMPORTANT: Stores in a property of select's option group
        // a hook to the created custom option group
        nodeList[i].customSelectCstOptgroup = cstOptgroup;

        var subNodes = parseMarkup(nodeList[i].children);
        for (var j = 0, lj = subNodes.length; j < lj; j++) {
          cstOptgroup.appendChild(subNodes[j]);
        }

        cstList.push(cstOptgroup);
      } else if (nodeList[i] instanceof HTMLElement && nodeList[i].tagName.toUpperCase() === 'OPTION') {
        var cstOption = document.createElement('div');
        cstOption.classList.add(builderParams.optionClass);
        cstOption.textContent = nodeList[i].text;
        cstOption.setAttribute('data-value', nodeList[i].value);
        cstOption.setAttribute('role', 'option');

        // IMPORTANT: Stores in a property of the created custom option
        // a hook to the the corrisponding select's option
        cstOption.customSelectOriginalOption = nodeList[i];

        // IMPORTANT: Stores in a property of select's option
        // a hook to the created custom option
        nodeList[i].customSelectCstOption = cstOption;

        // If the select's option is selected
        if (nodeList[i].selected) {
          setSelectedElement(cstOption);
        }
        cstList.push(cstOption);
      } else {
        throw new TypeError('Invalid Argument');
      }
    }
    return cstList;
  }

  function _append(nodePar, appendIntoOriginal, targetPar) {
    var target = void 0;
    if (typeof targetPar === 'undefined' || targetPar === select) {
      target = panel;
    } else if (targetPar instanceof HTMLElement && targetPar.tagName.toUpperCase() === 'OPTGROUP' && select.contains(targetPar)) {
      target = targetPar.customSelectCstOptgroup;
    } else {
      throw new TypeError('Invalid Argument');
    }

    // If the node provided is a single HTMLElement it is stored in an array
    var node = nodePar instanceof HTMLElement ? [nodePar] : nodePar;

    // Injects the options|optgroup in the select
    if (appendIntoOriginal) {
      for (var i = 0, l = node.length; i < l; i++) {
        if (target === panel) {
          select.appendChild(node[i]);
        } else {
          target.customSelectOriginalOptgroup.appendChild(node[i]);
        }
      }
    }

    // The custom markup to append
    var markupToInsert = parseMarkup(node);

    // Injects the created DOM content in the panel
    for (var _i = 0, _l = markupToInsert.length; _i < _l; _i++) {
      target.appendChild(markupToInsert[_i]);
    }

    return node;
  }

  function _insertBefore(node, targetPar) {
    var target = void 0;
    if (targetPar instanceof HTMLElement && targetPar.tagName.toUpperCase() === 'OPTION' && select.contains(targetPar)) {
      target = targetPar.customSelectCstOption;
    } else if (targetPar instanceof HTMLElement && targetPar.tagName.toUpperCase() === 'OPTGROUP' && select.contains(targetPar)) {
      target = targetPar.customSelectCstOptgroup;
    } else {
      throw new TypeError('Invalid Argument');
    }

    // The custom markup to append
    var markupToInsert = parseMarkup(node.length ? node : [node]);

    target.parentNode.insertBefore(markupToInsert[0], target);

    // Injects the option or optgroup node in the original select and returns the injected node
    return targetPar.parentNode.insertBefore(node.length ? node[0] : node, targetPar);
  }

  function remove(node) {
    var cstNode = void 0;
    if (node instanceof HTMLElement && node.tagName.toUpperCase() === 'OPTION' && select.contains(node)) {
      cstNode = node.customSelectCstOption;
    } else if (node instanceof HTMLElement && node.tagName.toUpperCase() === 'OPTGROUP' && select.contains(node)) {
      cstNode = node.customSelectCstOptgroup;
    } else {
      throw new TypeError('Invalid Argument');
    }
    cstNode.parentNode.removeChild(cstNode);
    var removedNode = node.parentNode.removeChild(node);
    changeEvent();
    return removedNode;
  }

  function empty() {
    var removed = [];
    while (select.children.length) {
      panel.removeChild(panel.children[0]);
      removed.push(select.removeChild(select.children[0]));
    }
    setSelectedElement();
    return removed;
  }

  function destroy() {
    for (var i = 0, l = select.options.length; i < l; i++) {
      delete select.options[i].customSelectCstOption;
    }
    var optGroup = select.getElementsByTagName('optgroup');
    for (var _i2 = 0, _l2 = optGroup.length; _i2 < _l2; _i2++) {
      delete optGroup.customSelectCstOptgroup;
    }

    removeEvents();

    return container.parentNode.replaceChild(select, container);
  }
  //
  // Custom Select DOM tree creation
  //

  // Creates the container/wrapper
  container = document.createElement('div');
  container.classList.add(builderParams.containerClass, containerClass);

  // Creates the opener
  opener = document.createElement('span');
  opener.className = builderParams.openerClass;
  opener.setAttribute('role', 'combobox');
  opener.setAttribute('aria-autocomplete', 'list');
  opener.setAttribute('aria-expanded', 'false');
  opener.innerHTML = '<span>\n   ' + (select.selectedIndex !== -1 ? select.options[select.selectedIndex].text : '') + '\n   </span>';

  // Creates the panel
  // and injects the markup of the select inside
  // with some tag and attributes replacement
  panel = document.createElement('div');
  // Create random id
  var possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  for (var i = 0; i < 5; i++) {
    uId += possible.charAt(Math.floor(Math.random() * possible.length));
  }
  panel.id = containerClass + '-' + uId + '-panel';
  panel.className = builderParams.panelClass;
  panel.setAttribute('role', 'listbox');
  opener.setAttribute('aria-owns', panel.id);

  _append(select.children, false);

  // Injects the container in the original DOM position of the select
  container.appendChild(opener);
  select.parentNode.replaceChild(container, select);
  container.appendChild(select);
  container.appendChild(panel);

  // ARIA labelledby - label
  if (document.querySelector('label[for="' + select.id + '"]')) {
    currLabel = document.querySelector('label[for="' + select.id + '"]');
  } else if (container.parentNode.tagName.toUpperCase() === 'LABEL') {
    currLabel = container.parentNode;
  }
  if (typeof currLabel !== 'undefined') {
    currLabel.setAttribute('id', containerClass + '-' + uId + '-label');
    opener.setAttribute('aria-labelledby', containerClass + '-' + uId + '-label');
  }

  // Event Init
  if (select.disabled) {
    container.classList.add(builderParams.isDisabledClass);
  } else {
    opener.setAttribute('tabindex', '0');
    select.setAttribute('tabindex', '-1');
    addEvents();
  }

  // Stores the plugin public exposed methods and properties, directly in the container HTMLElement
  container.customSelect = {
    get pluginOptions() {
      return builderParams;
    },
    get open() {
      return isOpen;
    },
    set open(bool) {
      open(bool);
    },
    get disabled() {
      return select.disabled;
    },
    set disabled(bool) {
      disabled(bool);
    },
    get value() {
      return select.value;
    },
    set value(val) {
      setValue(val);
    },
    append: function append(node, target) {
      return _append(node, true, target);
    },
    insertBefore: function insertBefore(node, target) {
      return _insertBefore(node, target);
    },
    remove: remove,
    empty: empty,
    destroy: destroy,
    opener: opener,
    select: select,
    panel: panel,
    container: container
  };

  // Stores the plugin directly in the original select
  select.customSelect = container.customSelect;

  // Returns the plugin instance, with the public exposed methods and properties
  return container.customSelect;
}

function customSelect(element, customParams) {
  // Overrides the default options with the ones provided by the user
  var nodeList = [];
  var selects = [];

  return function init() {
    // The plugin is called on a single HTMLElement
    if (element && element instanceof HTMLElement && element.tagName.toUpperCase() === 'SELECT') {
      nodeList.push(element);
      // The plugin is called on a selector
    } else if (element && typeof element === 'string') {
      var elementsList = document.querySelectorAll(element);
      for (var i = 0, l = elementsList.length; i < l; ++i) {
        if (elementsList[i] instanceof HTMLElement && elementsList[i].tagName.toUpperCase() === 'SELECT') {
          nodeList.push(elementsList[i]);
        }
      }
      // The plugin is called on any HTMLElements list (NodeList, HTMLCollection, Array, etc.)
    } else if (element && element.length) {
      for (var _i3 = 0, _l3 = element.length; _i3 < _l3; ++_i3) {
        if (element[_i3] instanceof HTMLElement && element[_i3].tagName.toUpperCase() === 'SELECT') {
          nodeList.push(element[_i3]);
        }
      }
    }

    // Launches the plugin over every HTMLElement
    // And stores every plugin instance
    for (var _i4 = 0, _l4 = nodeList.length; _i4 < _l4; ++_i4) {
      selects.push(builder(nodeList[_i4], _extends({}, defaultParams, customParams)));
    }

    // Returns all plugin instances
    return selects;
  }();
}

//# sourceMappingURL=index.js.map

/***/ }),

/***/ "./src/js/utils/clickOutside.js":
/*!**************************************!*\
  !*** ./src/js/utils/clickOutside.js ***!
  \**************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ((item, cb) => {
  window.addEventListener('click', e => {
    if (!(item.contains(e.target) || e.target === item)) {
      cb()
    }
  })
});

/***/ }),

/***/ "./src/js/utils/index.js":
/*!*******************************!*\
  !*** ./src/js/utils/index.js ***!
  \*******************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Modal": () => (/* reexport safe */ _modal_js__WEBPACK_IMPORTED_MODULE_1__["default"]),
/* harmony export */   "clickOutside": () => (/* reexport safe */ _clickOutside_js__WEBPACK_IMPORTED_MODULE_2__["default"]),
/* harmony export */   "menu": () => (/* reexport safe */ _menu_js__WEBPACK_IMPORTED_MODULE_0__["default"]),
/* harmony export */   "selectize": () => (/* reexport safe */ _selectize_js__WEBPACK_IMPORTED_MODULE_3__["default"])
/* harmony export */ });
/* harmony import */ var _menu_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./menu.js */ "./src/js/utils/menu.js");
/* harmony import */ var _modal_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./modal.js */ "./src/js/utils/modal.js");
/* harmony import */ var _clickOutside_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./clickOutside.js */ "./src/js/utils/clickOutside.js");
/* harmony import */ var _selectize_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./selectize.js */ "./src/js/utils/selectize.js");



// vendor === custom select


/***/ }),

/***/ "./src/js/utils/menu.js":
/*!******************************!*\
  !*** ./src/js/utils/menu.js ***!
  \******************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
const initInnerDropdown = item => {
  const trigger = item.querySelector('.submenu__trigger')

  trigger.addEventListener('click', (e) => {
    e.stopPropagation()
    item.classList.toggle('active')
  })

  item.addEventListener('click', e => {
    e.stopPropagation()
  })
}

const isDropdown = item => item.classList.contains('submenu')

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (() => {
  const collection = document.querySelectorAll('.menu-item')
 
  collection.forEach(item => {

    if (!isDropdown(item)) {
      item.addEventListener('click', () => {
        collection.forEach(item => {
          if(!isDropdown(item))
            item.classList.remove('active')
          })
        item.classList.add('active')
      })
    } else {
      initInnerDropdown(item)
    }
  })
});

/***/ }),

/***/ "./src/js/utils/modal.js":
/*!*******************************!*\
  !*** ./src/js/utils/modal.js ***!
  \*******************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ Modal)
/* harmony export */ });
/* harmony import */ var utils__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! utils */ "./src/js/utils/index.js");


class Modal {
  constructor(selector = '') {
    if (selector) {
      this.modal = document.querySelector(selector)
    } else {
      this.modal = document.querySelector('.modal')
    }
    // init modal
    const dialog = this.modal.querySelector('.modal__dialog')
    const closeBtn = this.modal.querySelector('.modal__close')

    ;(0,utils__WEBPACK_IMPORTED_MODULE_0__.clickOutside)(dialog, this.close)
    closeBtn.addEventListener('click', this.close)
  }

  open() {
    this.modal.classList.add('open')
  }

  close() {
    this.modal.classList.remove('open')
  }
}

/***/ }),

/***/ "./src/js/utils/selectize.js":
/*!***********************************!*\
  !*** ./src/js/utils/selectize.js ***!
  \***********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var custom_select__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! custom-select */ "./.yarn/cache/custom-select-npm-1.1.15-e87477f266-dd8018de02.zip/node_modules/custom-select/build/index.js");


const config = {
  containerClass: 'select',
  openerClass: 'select__opener plug',
  panelClass: 'select__panel',
  optionClass: 'select__option',
  // optgroupClass: 'select__optgroup',
  isSelectedClass: 'selected',
  hasFocusClass: 'focused',
  isDisabledClass: 'disabled',
  isOpenClass: 'open'
}

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (node => (0,custom_select__WEBPACK_IMPORTED_MODULE_0__["default"])(node, config));

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
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = __webpack_modules__;
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/chunk loaded */
/******/ 	(() => {
/******/ 		var deferred = [];
/******/ 		__webpack_require__.O = (result, chunkIds, fn, priority) => {
/******/ 			if(chunkIds) {
/******/ 				priority = priority || 0;
/******/ 				for(var i = deferred.length; i > 0 && deferred[i - 1][2] > priority; i--) deferred[i] = deferred[i - 1];
/******/ 				deferred[i] = [chunkIds, fn, priority];
/******/ 				return;
/******/ 			}
/******/ 			var notFulfilled = Infinity;
/******/ 			for (var i = 0; i < deferred.length; i++) {
/******/ 				var [chunkIds, fn, priority] = deferred[i];
/******/ 				var fulfilled = true;
/******/ 				for (var j = 0; j < chunkIds.length; j++) {
/******/ 					if ((priority & 1 === 0 || notFulfilled >= priority) && Object.keys(__webpack_require__.O).every((key) => (__webpack_require__.O[key](chunkIds[j])))) {
/******/ 						chunkIds.splice(j--, 1);
/******/ 					} else {
/******/ 						fulfilled = false;
/******/ 						if(priority < notFulfilled) notFulfilled = priority;
/******/ 					}
/******/ 				}
/******/ 				if(fulfilled) {
/******/ 					deferred.splice(i--, 1)
/******/ 					var r = fn();
/******/ 					if (r !== undefined) result = r;
/******/ 				}
/******/ 			}
/******/ 			return result;
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
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/jsonp chunk loading */
/******/ 	(() => {
/******/ 		// no baseURI
/******/ 		
/******/ 		// object to store loaded and loading chunks
/******/ 		// undefined = chunk not loaded, null = chunk preloaded/prefetched
/******/ 		// [resolve, reject, Promise] = chunk loading, 0 = chunk loaded
/******/ 		var installedChunks = {
/******/ 			"utils": 0
/******/ 		};
/******/ 		
/******/ 		// no chunk on demand loading
/******/ 		
/******/ 		// no prefetching
/******/ 		
/******/ 		// no preloaded
/******/ 		
/******/ 		// no HMR
/******/ 		
/******/ 		// no HMR manifest
/******/ 		
/******/ 		__webpack_require__.O.j = (chunkId) => (installedChunks[chunkId] === 0);
/******/ 		
/******/ 		// install a JSONP callback for chunk loading
/******/ 		var webpackJsonpCallback = (parentChunkLoadingFunction, data) => {
/******/ 			var [chunkIds, moreModules, runtime] = data;
/******/ 			// add "moreModules" to the modules object,
/******/ 			// then flag all "chunkIds" as loaded and fire callback
/******/ 			var moduleId, chunkId, i = 0;
/******/ 			if(chunkIds.some((id) => (installedChunks[id] !== 0))) {
/******/ 				for(moduleId in moreModules) {
/******/ 					if(__webpack_require__.o(moreModules, moduleId)) {
/******/ 						__webpack_require__.m[moduleId] = moreModules[moduleId];
/******/ 					}
/******/ 				}
/******/ 				if(runtime) var result = runtime(__webpack_require__);
/******/ 			}
/******/ 			if(parentChunkLoadingFunction) parentChunkLoadingFunction(data);
/******/ 			for(;i < chunkIds.length; i++) {
/******/ 				chunkId = chunkIds[i];
/******/ 				if(__webpack_require__.o(installedChunks, chunkId) && installedChunks[chunkId]) {
/******/ 					installedChunks[chunkId][0]();
/******/ 				}
/******/ 				installedChunks[chunkId] = 0;
/******/ 			}
/******/ 			return __webpack_require__.O(result);
/******/ 		}
/******/ 		
/******/ 		var chunkLoadingGlobal = self["webpackChunk_4trocket_dashboard"] = self["webpackChunk_4trocket_dashboard"] || [];
/******/ 		chunkLoadingGlobal.forEach(webpackJsonpCallback.bind(null, 0));
/******/ 		chunkLoadingGlobal.push = webpackJsonpCallback.bind(null, chunkLoadingGlobal.push.bind(chunkLoadingGlobal));
/******/ 	})();
/******/ 	
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module is referenced by other modules so it can't be inlined
/******/ 	__webpack_require__("./src/js/utils/clickOutside.js");
/******/ 	__webpack_require__("./src/js/utils/menu.js");
/******/ 	__webpack_require__("./src/js/utils/modal.js");
/******/ 	var __webpack_exports__ = __webpack_require__("./src/js/utils/selectize.js");
/******/ 	__webpack_exports__ = __webpack_require__.O(__webpack_exports__);
/******/ 	
/******/ })()
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidXRpbHMuanMiLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7O0FBQUE7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxFQUFFO0FBQ0Y7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1QsUUFBUTtBQUNSO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQSxvQ0FBb0M7QUFDcEM7Ozs7Ozs7Ozs7OztBQzNDYTs7QUFFYiw4Q0FBNkM7QUFDN0M7QUFDQSxDQUFDLEVBQUM7O0FBRUYsb0RBQW9ELGdCQUFnQixzQkFBc0IsT0FBTywyQkFBMkIsMEJBQTBCLHlEQUF5RCxpQ0FBaUM7O0FBRWhQLG1DQUFtQyxpQ0FBaUMsZUFBZSxlQUFlLGdCQUFnQixvQkFBb0IsTUFBTSwwQ0FBMEMsK0JBQStCLGFBQWEscUJBQXFCLHVDQUF1QyxjQUFjLFdBQVcsWUFBWSxVQUFVLE1BQU0sMkNBQTJDLFVBQVUsc0JBQXNCLGVBQWUsMkJBQTJCLDBCQUEwQixjQUFjLDJDQUEyQyxnQ0FBZ0MsT0FBTyxtRkFBbUYsSUFBSTtBQUN6cEI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUEsa0JBQWU7O0FBRWYsbUJBQU8sQ0FBQyxrS0FBdUI7O0FBRS9CO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSx5RkFBeUYsZUFBZTtBQUN4RztBQUNBO0FBQ0EsTUFBTTtBQUNOO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxNQUFNO0FBQ047QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBLE1BQU07QUFDTjtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFFBQVE7QUFDUjtBQUNBO0FBQ0E7QUFDQSxNQUFNO0FBQ047QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxNQUFNO0FBQ047QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsTUFBTTtBQUNOO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsTUFBTTtBQUNOO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsYUFBYTs7QUFFYjtBQUNBOztBQUVBO0FBQ0EsdURBQXVELE9BQU87QUFDOUQ7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsTUFBTTtBQUNOO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLE1BQU07QUFDTjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQSwwQ0FBMEMsUUFBUTtBQUNsRDtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0EsOENBQThDLFFBQVE7QUFDdEQ7QUFDQTs7QUFFQTtBQUNBLFFBQVE7QUFDUjtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFFBQVE7QUFDUjtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsTUFBTTtBQUNOO0FBQ0EsTUFBTTtBQUNOO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0EsdUNBQXVDLE9BQU87QUFDOUM7QUFDQTtBQUNBLFVBQVU7QUFDVjtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0EsaURBQWlELFNBQVM7QUFDMUQ7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsTUFBTTtBQUNOO0FBQ0EsTUFBTTtBQUNOO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQSxNQUFNO0FBQ047QUFDQSxNQUFNO0FBQ047QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0EsK0NBQStDLE9BQU87QUFDdEQ7QUFDQTtBQUNBO0FBQ0EsNkNBQTZDLFdBQVc7QUFDeEQ7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxrQkFBa0IsT0FBTztBQUN6QjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxJQUFJO0FBQ0o7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLElBQUk7QUFDSjtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsTUFBTTtBQUNOO0FBQ0EsK0NBQStDLE9BQU87QUFDdEQ7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLE1BQU07QUFDTiw4Q0FBOEMsV0FBVztBQUN6RDtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQSw2Q0FBNkMsV0FBVztBQUN4RCxxREFBcUQ7QUFDckQ7O0FBRUE7QUFDQTtBQUNBLEdBQUc7QUFDSDs7QUFFQTs7Ozs7Ozs7Ozs7Ozs7O0FDem1CQSxpRUFBZTtBQUNmO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsR0FBRztBQUNIOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FDTnlDO0FBQ0U7QUFDYztBQUN6RDs7Ozs7Ozs7Ozs7Ozs7OztBQ0hBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEdBQUc7QUFDSDtBQUNBO0FBQ0E7QUFDQSxHQUFHO0FBQ0g7QUFDQTtBQUNBO0FBQ0E7QUFDQSxpRUFBZTtBQUNmO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFdBQVc7QUFDWDtBQUNBLE9BQU87QUFDUCxNQUFNO0FBQ047QUFDQTtBQUNBLEdBQUc7QUFDSDs7Ozs7Ozs7Ozs7Ozs7OztBQ2hDb0M7QUFDcEM7QUFDZTtBQUNmO0FBQ0E7QUFDQTtBQUNBLE1BQU07QUFDTjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxJQUFJLG9EQUFZO0FBQ2hCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7Ozs7Ozs7Ozs7Ozs7QUN4QndDO0FBQ3hDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsaUVBQWUsUUFBUSx5REFBWTs7Ozs7O1VDZG5DO1VBQ0E7O1VBRUE7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7O1VBRUE7VUFDQTs7VUFFQTtVQUNBO1VBQ0E7O1VBRUE7VUFDQTs7Ozs7V0N6QkE7V0FDQTtXQUNBO1dBQ0E7V0FDQSwrQkFBK0Isd0NBQXdDO1dBQ3ZFO1dBQ0E7V0FDQTtXQUNBO1dBQ0EsaUJBQWlCLHFCQUFxQjtXQUN0QztXQUNBO1dBQ0Esa0JBQWtCLHFCQUFxQjtXQUN2QztXQUNBO1dBQ0EsS0FBSztXQUNMO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7V0FDQTs7Ozs7V0MzQkE7V0FDQTtXQUNBO1dBQ0E7V0FDQSx5Q0FBeUMsd0NBQXdDO1dBQ2pGO1dBQ0E7V0FDQTs7Ozs7V0NQQTs7Ozs7V0NBQTtXQUNBO1dBQ0E7V0FDQSx1REFBdUQsaUJBQWlCO1dBQ3hFO1dBQ0EsZ0RBQWdELGFBQWE7V0FDN0Q7Ozs7O1dDTkE7O1dBRUE7V0FDQTtXQUNBO1dBQ0E7V0FDQTtXQUNBOztXQUVBOztXQUVBOztXQUVBOztXQUVBOztXQUVBOztXQUVBOztXQUVBO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7V0FDQTtXQUNBLE1BQU0scUJBQXFCO1dBQzNCO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7O1dBRUE7V0FDQTtXQUNBOzs7OztVRWhEQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vNHRyb2NrZXQtZGFzaGJvYXJkLy4vLnlhcm4vY2FjaGUvY3VzdG9tLWV2ZW50LXBvbHlmaWxsLW5wbS0wLjMuMC02YTk3MTVlNjMyLTQ0OWQ4ZTg0OTcuemlwL25vZGVfbW9kdWxlcy9jdXN0b20tZXZlbnQtcG9seWZpbGwvY3VzdG9tLWV2ZW50LXBvbHlmaWxsLmpzIiwid2VicGFjazovLzR0cm9ja2V0LWRhc2hib2FyZC8uLy55YXJuL2NhY2hlL2N1c3RvbS1zZWxlY3QtbnBtLTEuMS4xNS1lODc0NzdmMjY2LWRkODAxOGRlMDIuemlwL25vZGVfbW9kdWxlcy9jdXN0b20tc2VsZWN0L2J1aWxkL2luZGV4LmpzIiwid2VicGFjazovLzR0cm9ja2V0LWRhc2hib2FyZC8uL3NyYy9qcy91dGlscy9jbGlja091dHNpZGUuanMiLCJ3ZWJwYWNrOi8vNHRyb2NrZXQtZGFzaGJvYXJkLy4vc3JjL2pzL3V0aWxzL2luZGV4LmpzIiwid2VicGFjazovLzR0cm9ja2V0LWRhc2hib2FyZC8uL3NyYy9qcy91dGlscy9tZW51LmpzIiwid2VicGFjazovLzR0cm9ja2V0LWRhc2hib2FyZC8uL3NyYy9qcy91dGlscy9tb2RhbC5qcyIsIndlYnBhY2s6Ly80dHJvY2tldC1kYXNoYm9hcmQvLi9zcmMvanMvdXRpbHMvc2VsZWN0aXplLmpzIiwid2VicGFjazovLzR0cm9ja2V0LWRhc2hib2FyZC93ZWJwYWNrL2Jvb3RzdHJhcCIsIndlYnBhY2s6Ly80dHJvY2tldC1kYXNoYm9hcmQvd2VicGFjay9ydW50aW1lL2NodW5rIGxvYWRlZCIsIndlYnBhY2s6Ly80dHJvY2tldC1kYXNoYm9hcmQvd2VicGFjay9ydW50aW1lL2RlZmluZSBwcm9wZXJ0eSBnZXR0ZXJzIiwid2VicGFjazovLzR0cm9ja2V0LWRhc2hib2FyZC93ZWJwYWNrL3J1bnRpbWUvaGFzT3duUHJvcGVydHkgc2hvcnRoYW5kIiwid2VicGFjazovLzR0cm9ja2V0LWRhc2hib2FyZC93ZWJwYWNrL3J1bnRpbWUvbWFrZSBuYW1lc3BhY2Ugb2JqZWN0Iiwid2VicGFjazovLzR0cm9ja2V0LWRhc2hib2FyZC93ZWJwYWNrL3J1bnRpbWUvanNvbnAgY2h1bmsgbG9hZGluZyIsIndlYnBhY2s6Ly80dHJvY2tldC1kYXNoYm9hcmQvd2VicGFjay9iZWZvcmUtc3RhcnR1cCIsIndlYnBhY2s6Ly80dHJvY2tldC1kYXNoYm9hcmQvd2VicGFjay9zdGFydHVwIiwid2VicGFjazovLzR0cm9ja2V0LWRhc2hib2FyZC93ZWJwYWNrL2FmdGVyLXN0YXJ0dXAiXSwic291cmNlc0NvbnRlbnQiOlsiLy8gUG9seWZpbGwgZm9yIGNyZWF0aW5nIEN1c3RvbUV2ZW50cyBvbiBJRTkvMTAvMTFcblxuLy8gY29kZSBwdWxsZWQgZnJvbTpcbi8vIGh0dHBzOi8vZ2l0aHViLmNvbS9kNHRvY2NoaW5pL2N1c3RvbWV2ZW50LXBvbHlmaWxsXG4vLyBodHRwczovL2RldmVsb3Blci5tb3ppbGxhLm9yZy9lbi1VUy9kb2NzL1dlYi9BUEkvQ3VzdG9tRXZlbnQjUG9seWZpbGxcblxudHJ5IHtcbiAgICB2YXIgY2UgPSBuZXcgd2luZG93LkN1c3RvbUV2ZW50KCd0ZXN0Jyk7XG4gICAgY2UucHJldmVudERlZmF1bHQoKTtcbiAgICBpZiAoY2UuZGVmYXVsdFByZXZlbnRlZCAhPT0gdHJ1ZSkge1xuICAgICAgICAvLyBJRSBoYXMgcHJvYmxlbXMgd2l0aCAucHJldmVudERlZmF1bHQoKSBvbiBjdXN0b20gZXZlbnRzXG4gICAgICAgIC8vIGh0dHA6Ly9zdGFja292ZXJmbG93LmNvbS9xdWVzdGlvbnMvMjMzNDkxOTFcbiAgICAgICAgdGhyb3cgbmV3IEVycm9yKCdDb3VsZCBub3QgcHJldmVudCBkZWZhdWx0Jyk7XG4gICAgfVxufSBjYXRjaChlKSB7XG4gIHZhciBDdXN0b21FdmVudCA9IGZ1bmN0aW9uKGV2ZW50LCBwYXJhbXMpIHtcbiAgICB2YXIgZXZ0LCBvcmlnUHJldmVudDtcbiAgICBwYXJhbXMgPSBwYXJhbXMgfHwge1xuICAgICAgYnViYmxlczogZmFsc2UsXG4gICAgICBjYW5jZWxhYmxlOiBmYWxzZSxcbiAgICAgIGRldGFpbDogdW5kZWZpbmVkXG4gICAgfTtcblxuICAgIGV2dCA9IGRvY3VtZW50LmNyZWF0ZUV2ZW50KFwiQ3VzdG9tRXZlbnRcIik7XG4gICAgZXZ0LmluaXRDdXN0b21FdmVudChldmVudCwgcGFyYW1zLmJ1YmJsZXMsIHBhcmFtcy5jYW5jZWxhYmxlLCBwYXJhbXMuZGV0YWlsKTtcbiAgICBvcmlnUHJldmVudCA9IGV2dC5wcmV2ZW50RGVmYXVsdDtcbiAgICBldnQucHJldmVudERlZmF1bHQgPSBmdW5jdGlvbiAoKSB7XG4gICAgICBvcmlnUHJldmVudC5jYWxsKHRoaXMpO1xuICAgICAgdHJ5IHtcbiAgICAgICAgT2JqZWN0LmRlZmluZVByb3BlcnR5KHRoaXMsICdkZWZhdWx0UHJldmVudGVkJywge1xuICAgICAgICAgIGdldDogZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICAgICAgfVxuICAgICAgICB9KTtcbiAgICAgIH0gY2F0Y2goZSkge1xuICAgICAgICB0aGlzLmRlZmF1bHRQcmV2ZW50ZWQgPSB0cnVlO1xuICAgICAgfVxuICAgIH07XG4gICAgcmV0dXJuIGV2dDtcbiAgfTtcblxuICBDdXN0b21FdmVudC5wcm90b3R5cGUgPSB3aW5kb3cuRXZlbnQucHJvdG90eXBlO1xuICB3aW5kb3cuQ3VzdG9tRXZlbnQgPSBDdXN0b21FdmVudDsgLy8gZXhwb3NlIGRlZmluaXRpb24gdG8gd2luZG93XG59XG4iLCIndXNlIHN0cmljdCc7XG5cbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwge1xuICB2YWx1ZTogdHJ1ZVxufSk7XG5cbnZhciBfZXh0ZW5kcyA9IE9iamVjdC5hc3NpZ24gfHwgZnVuY3Rpb24gKHRhcmdldCkgeyBmb3IgKHZhciBpID0gMTsgaSA8IGFyZ3VtZW50cy5sZW5ndGg7IGkrKykgeyB2YXIgc291cmNlID0gYXJndW1lbnRzW2ldOyBmb3IgKHZhciBrZXkgaW4gc291cmNlKSB7IGlmIChPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwoc291cmNlLCBrZXkpKSB7IHRhcmdldFtrZXldID0gc291cmNlW2tleV07IH0gfSB9IHJldHVybiB0YXJnZXQ7IH07XG5cbnZhciBfc2xpY2VkVG9BcnJheSA9IGZ1bmN0aW9uICgpIHsgZnVuY3Rpb24gc2xpY2VJdGVyYXRvcihhcnIsIGkpIHsgdmFyIF9hcnIgPSBbXTsgdmFyIF9uID0gdHJ1ZTsgdmFyIF9kID0gZmFsc2U7IHZhciBfZSA9IHVuZGVmaW5lZDsgdHJ5IHsgZm9yICh2YXIgX2kgPSBhcnJbU3ltYm9sLml0ZXJhdG9yXSgpLCBfczsgIShfbiA9IChfcyA9IF9pLm5leHQoKSkuZG9uZSk7IF9uID0gdHJ1ZSkgeyBfYXJyLnB1c2goX3MudmFsdWUpOyBpZiAoaSAmJiBfYXJyLmxlbmd0aCA9PT0gaSkgYnJlYWs7IH0gfSBjYXRjaCAoZXJyKSB7IF9kID0gdHJ1ZTsgX2UgPSBlcnI7IH0gZmluYWxseSB7IHRyeSB7IGlmICghX24gJiYgX2lbXCJyZXR1cm5cIl0pIF9pW1wicmV0dXJuXCJdKCk7IH0gZmluYWxseSB7IGlmIChfZCkgdGhyb3cgX2U7IH0gfSByZXR1cm4gX2FycjsgfSByZXR1cm4gZnVuY3Rpb24gKGFyciwgaSkgeyBpZiAoQXJyYXkuaXNBcnJheShhcnIpKSB7IHJldHVybiBhcnI7IH0gZWxzZSBpZiAoU3ltYm9sLml0ZXJhdG9yIGluIE9iamVjdChhcnIpKSB7IHJldHVybiBzbGljZUl0ZXJhdG9yKGFyciwgaSk7IH0gZWxzZSB7IHRocm93IG5ldyBUeXBlRXJyb3IoXCJJbnZhbGlkIGF0dGVtcHQgdG8gZGVzdHJ1Y3R1cmUgbm9uLWl0ZXJhYmxlIGluc3RhbmNlXCIpOyB9IH07IH0oKTsgLyoqXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAqIGN1c3RvbS1zZWxlY3RcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICogQSBsaWdodHdlaWdodCBKUyBzY3JpcHQgZm9yIGN1c3RvbSBzZWxlY3QgY3JlYXRpb24uXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAqIE5lZWRzIG5vIGRlcGVuZGVuY2llcy5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICpcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICogdjAuMC4xXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAqIChodHRwczovL2dpdGh1Yi5jb20vY3VzdG9tLXNlbGVjdC9jdXN0b20tc2VsZWN0KVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgKlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgKiBDb3B5cmlnaHQgKGMpIDIwMTYgR2lvbmF0YW4gTG9tYmFyZGkgJiBNYXJjbyBOdWNhcmFcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICogTUlUIExpY2Vuc2VcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICovXG5cbmV4cG9ydHMuZGVmYXVsdCA9IGN1c3RvbVNlbGVjdDtcblxucmVxdWlyZSgnY3VzdG9tLWV2ZW50LXBvbHlmaWxsJyk7XG5cbnZhciBkZWZhdWx0UGFyYW1zID0ge1xuICBjb250YWluZXJDbGFzczogJ2N1c3RvbS1zZWxlY3QtY29udGFpbmVyJyxcbiAgb3BlbmVyQ2xhc3M6ICdjdXN0b20tc2VsZWN0LW9wZW5lcicsXG4gIHBhbmVsQ2xhc3M6ICdjdXN0b20tc2VsZWN0LXBhbmVsJyxcbiAgb3B0aW9uQ2xhc3M6ICdjdXN0b20tc2VsZWN0LW9wdGlvbicsXG4gIG9wdGdyb3VwQ2xhc3M6ICdjdXN0b20tc2VsZWN0LW9wdGdyb3VwJyxcbiAgaXNTZWxlY3RlZENsYXNzOiAnaXMtc2VsZWN0ZWQnLFxuICBoYXNGb2N1c0NsYXNzOiAnaGFzLWZvY3VzJyxcbiAgaXNEaXNhYmxlZENsYXNzOiAnaXMtZGlzYWJsZWQnLFxuICBpc09wZW5DbGFzczogJ2lzLW9wZW4nXG59O1xuXG5mdW5jdGlvbiBidWlsZGVyKGVsLCBidWlsZGVyUGFyYW1zKSB7XG4gIHZhciBjb250YWluZXJDbGFzcyA9ICdjdXN0b21TZWxlY3QnO1xuICB2YXIgaXNPcGVuID0gZmFsc2U7XG4gIHZhciB1SWQgPSAnJztcbiAgdmFyIHNlbGVjdCA9IGVsO1xuICB2YXIgY29udGFpbmVyID0gdm9pZCAwO1xuICB2YXIgb3BlbmVyID0gdm9pZCAwO1xuICB2YXIgZm9jdXNlZEVsZW1lbnQgPSB2b2lkIDA7XG4gIHZhciBzZWxlY3RlZEVsZW1lbnQgPSB2b2lkIDA7XG4gIHZhciBwYW5lbCA9IHZvaWQgMDtcbiAgdmFyIGN1cnJMYWJlbCA9IHZvaWQgMDtcblxuICB2YXIgcmVzZXRTZWFyY2hUaW1lb3V0ID0gdm9pZCAwO1xuICB2YXIgc2VhcmNoS2V5ID0gJyc7XG5cbiAgLy9cbiAgLy8gSW5uZXIgRnVuY3Rpb25zXG4gIC8vXG5cbiAgLy8gU2V0cyB0aGUgZm9jdXNlZCBlbGVtZW50IHdpdGggdGhlIG5lY2Nlc3NhcnkgY2xhc3NlcyBzdWJzdGl0dXRpb25zXG4gIGZ1bmN0aW9uIHNldEZvY3VzZWRFbGVtZW50KGNzdE9wdGlvbikge1xuICAgIGlmIChmb2N1c2VkRWxlbWVudCkge1xuICAgICAgZm9jdXNlZEVsZW1lbnQuY2xhc3NMaXN0LnJlbW92ZShidWlsZGVyUGFyYW1zLmhhc0ZvY3VzQ2xhc3MpO1xuICAgIH1cbiAgICBpZiAodHlwZW9mIGNzdE9wdGlvbiAhPT0gJ3VuZGVmaW5lZCcpIHtcbiAgICAgIGZvY3VzZWRFbGVtZW50ID0gY3N0T3B0aW9uO1xuICAgICAgZm9jdXNlZEVsZW1lbnQuY2xhc3NMaXN0LmFkZChidWlsZGVyUGFyYW1zLmhhc0ZvY3VzQ2xhc3MpO1xuICAgICAgLy8gT2Zmc2V0IHVwZGF0ZTogY2hlY2tzIGlmIHRoZSBmb2N1c2VkIGVsZW1lbnQgaXMgaW4gdGhlIHZpc2libGUgcGFydCBvZiB0aGUgcGFuZWxDbGFzc1xuICAgICAgLy8gaWYgbm90IGRpc3BhdGNoZXMgYSBjdXN0b20gZXZlbnRcbiAgICAgIGlmIChpc09wZW4pIHtcbiAgICAgICAgaWYgKGNzdE9wdGlvbi5vZmZzZXRUb3AgPCBjc3RPcHRpb24ub2Zmc2V0UGFyZW50LnNjcm9sbFRvcCB8fCBjc3RPcHRpb24ub2Zmc2V0VG9wID4gY3N0T3B0aW9uLm9mZnNldFBhcmVudC5zY3JvbGxUb3AgKyBjc3RPcHRpb24ub2Zmc2V0UGFyZW50LmNsaWVudEhlaWdodCAtIGNzdE9wdGlvbi5jbGllbnRIZWlnaHQpIHtcbiAgICAgICAgICBjc3RPcHRpb24uZGlzcGF0Y2hFdmVudChuZXcgQ3VzdG9tRXZlbnQoJ2N1c3RvbS1zZWxlY3Q6Zm9jdXMtb3V0c2lkZS1wYW5lbCcsIHsgYnViYmxlczogdHJ1ZSB9KSk7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9IGVsc2Uge1xuICAgICAgZm9jdXNlZEVsZW1lbnQgPSB1bmRlZmluZWQ7XG4gICAgfVxuICB9XG5cbiAgLy8gUmVhc3NpZ25zIHRoZSBmb2N1c2VkIGFuZCBzZWxlY3RlZCBjdXN0b20gb3B0aW9uXG4gIC8vIFVwZGF0ZXMgdGhlIG9wZW5lciB0ZXh0XG4gIC8vIElNUE9SVEFOVDogdGhlIHNldFNlbGVjdGVkRWxlbWVudCBmdW5jdGlvbiBkb2Vzbid0IGNoYW5nZSB0aGUgc2VsZWN0IHZhbHVlIVxuICBmdW5jdGlvbiBzZXRTZWxlY3RlZEVsZW1lbnQoY3N0T3B0aW9uKSB7XG4gICAgaWYgKHNlbGVjdGVkRWxlbWVudCkge1xuICAgICAgc2VsZWN0ZWRFbGVtZW50LmNsYXNzTGlzdC5yZW1vdmUoYnVpbGRlclBhcmFtcy5pc1NlbGVjdGVkQ2xhc3MpO1xuICAgICAgc2VsZWN0ZWRFbGVtZW50LnJlbW92ZUF0dHJpYnV0ZSgnaWQnKTtcbiAgICAgIG9wZW5lci5yZW1vdmVBdHRyaWJ1dGUoJ2FyaWEtYWN0aXZlZGVzY2VuZGFudCcpO1xuICAgIH1cbiAgICBpZiAodHlwZW9mIGNzdE9wdGlvbiAhPT0gJ3VuZGVmaW5lZCcpIHtcbiAgICAgIGNzdE9wdGlvbi5jbGFzc0xpc3QuYWRkKGJ1aWxkZXJQYXJhbXMuaXNTZWxlY3RlZENsYXNzKTtcbiAgICAgIGNzdE9wdGlvbi5zZXRBdHRyaWJ1dGUoJ2lkJywgY29udGFpbmVyQ2xhc3MgKyAnLScgKyB1SWQgKyAnLXNlbGVjdGVkT3B0aW9uJyk7XG4gICAgICBvcGVuZXIuc2V0QXR0cmlidXRlKCdhcmlhLWFjdGl2ZWRlc2NlbmRhbnQnLCBjb250YWluZXJDbGFzcyArICctJyArIHVJZCArICctc2VsZWN0ZWRPcHRpb24nKTtcbiAgICAgIHNlbGVjdGVkRWxlbWVudCA9IGNzdE9wdGlvbjtcbiAgICAgIG9wZW5lci5jaGlsZHJlblswXS50ZXh0Q29udGVudCA9IHNlbGVjdGVkRWxlbWVudC5jdXN0b21TZWxlY3RPcmlnaW5hbE9wdGlvbi50ZXh0O1xuICAgIH0gZWxzZSB7XG4gICAgICBzZWxlY3RlZEVsZW1lbnQgPSB1bmRlZmluZWQ7XG4gICAgICBvcGVuZXIuY2hpbGRyZW5bMF0udGV4dENvbnRlbnQgPSAnJztcbiAgICB9XG4gICAgc2V0Rm9jdXNlZEVsZW1lbnQoY3N0T3B0aW9uKTtcbiAgfVxuXG4gIGZ1bmN0aW9uIHNldFZhbHVlKHZhbHVlKSB7XG4gICAgLy8gR2V0cyB0aGUgb3B0aW9uIHdpdGggdGhlIHByb3ZpZGVkIHZhbHVlXG4gICAgdmFyIHRvU2VsZWN0ID0gc2VsZWN0LnF1ZXJ5U2VsZWN0b3IoJ29wdGlvblt2YWx1ZT1cXCcnICsgdmFsdWUgKyAnXFwnXScpO1xuICAgIC8vIElmIG5vIG9wdGlvbiBoYXMgdGhlIHByb3ZpZGVkIHZhbHVlIGdldCB0aGUgZmlyc3RcbiAgICBpZiAoIXRvU2VsZWN0KSB7XG4gICAgICB2YXIgX3NlbGVjdCRvcHRpb25zID0gX3NsaWNlZFRvQXJyYXkoc2VsZWN0Lm9wdGlvbnMsIDEpO1xuXG4gICAgICB0b1NlbGVjdCA9IF9zZWxlY3Qkb3B0aW9uc1swXTtcbiAgICB9XG4gICAgLy8gVGhlIG9wdGlvbiB3aXRoIHRoZSBwcm92aWRlZCB2YWx1ZSBiZWNvbWVzIHRoZSBzZWxlY3RlZCBvbmVcbiAgICAvLyBBbmQgY2hhbmdlcyB0aGUgc2VsZWN0IGN1cnJlbnQgdmFsdWVcbiAgICB0b1NlbGVjdC5zZWxlY3RlZCA9IHRydWU7XG5cbiAgICBzZXRTZWxlY3RlZEVsZW1lbnQoc2VsZWN0Lm9wdGlvbnNbc2VsZWN0LnNlbGVjdGVkSW5kZXhdLmN1c3RvbVNlbGVjdENzdE9wdGlvbik7XG4gIH1cblxuICBmdW5jdGlvbiBtb3ZlRm9jdWVzZWRFbGVtZW50KGRpcmVjdGlvbikge1xuICAgIC8vIEdldCBhbGwgdGhlIC5jdXN0b20tc2VsZWN0LW9wdGlvbnNcbiAgICAvLyBHZXQgdGhlIGluZGV4IG9mIHRoZSBjdXJyZW50IGZvY3VzZWQgb25lXG4gICAgdmFyIGN1cnJlbnRGb2N1c2VkSW5kZXggPSBbXS5pbmRleE9mLmNhbGwoc2VsZWN0Lm9wdGlvbnMsIGZvY3VzZWRFbGVtZW50LmN1c3RvbVNlbGVjdE9yaWdpbmFsT3B0aW9uKTtcbiAgICAvLyBJZiB0aGUgbmV4dCBvciBwcmV2IGN1c3RvbSBvcHRpb24gZXhpc3RcbiAgICAvLyBTZXRzIGl0IGFzIHRoZSBuZXcgZm9jdXNlZCBvbmVcbiAgICBpZiAoc2VsZWN0Lm9wdGlvbnNbY3VycmVudEZvY3VzZWRJbmRleCArIGRpcmVjdGlvbl0pIHtcbiAgICAgIHNldEZvY3VzZWRFbGVtZW50KHNlbGVjdC5vcHRpb25zW2N1cnJlbnRGb2N1c2VkSW5kZXggKyBkaXJlY3Rpb25dLmN1c3RvbVNlbGVjdENzdE9wdGlvbik7XG4gICAgfVxuICB9XG5cbiAgLy8gT3Blbi9DbG9zZSBmdW5jdGlvbiAodG9nZ2xlKVxuICBmdW5jdGlvbiBvcGVuKGJvb2wpIHtcbiAgICAvLyBPcGVuXG4gICAgaWYgKGJvb2wgfHwgdHlwZW9mIGJvb2wgPT09ICd1bmRlZmluZWQnKSB7XG4gICAgICAvLyBJZiBwcmVzZW50IGNsb3NlcyBhbiBvcGVuZWQgaW5zdGFuY2Ugb2YgdGhlIHBsdWdpblxuICAgICAgLy8gT25seSBvbmUgYXQgdGltZSBjYW4gYmUgb3BlblxuICAgICAgdmFyIG9wZW5lZEN1c3RvbVNlbGVjdCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy4nICsgY29udGFpbmVyQ2xhc3MgKyAnLicgKyBidWlsZGVyUGFyYW1zLmlzT3BlbkNsYXNzKTtcbiAgICAgIGlmIChvcGVuZWRDdXN0b21TZWxlY3QpIHtcbiAgICAgICAgb3BlbmVkQ3VzdG9tU2VsZWN0LmN1c3RvbVNlbGVjdC5vcGVuID0gZmFsc2U7XG4gICAgICB9XG5cbiAgICAgIC8vIE9wZW5zIG9ubHkgdGhlIGNsaWNrZWQgb25lXG4gICAgICBjb250YWluZXIuY2xhc3NMaXN0LmFkZChidWlsZGVyUGFyYW1zLmlzT3BlbkNsYXNzKTtcblxuICAgICAgLy8gYXJpYS1leHBhbmRlZCB1cGRhdGVcbiAgICAgIGNvbnRhaW5lci5jbGFzc0xpc3QuYWRkKGJ1aWxkZXJQYXJhbXMuaXNPcGVuQ2xhc3MpO1xuICAgICAgb3BlbmVyLnNldEF0dHJpYnV0ZSgnYXJpYS1leHBhbmRlZCcsICd0cnVlJyk7XG5cbiAgICAgIC8vIFVwZGF0ZXMgdGhlIHNjcm9sbFRvcCBwb3NpdGlvbiBvZiB0aGUgcGFuZWwgaW4gcmVsYXRpb24gd2l0aCB0aGUgZm9jdXNlZCBvcHRpb25cbiAgICAgIGlmIChzZWxlY3RlZEVsZW1lbnQpIHtcbiAgICAgICAgcGFuZWwuc2Nyb2xsVG9wID0gc2VsZWN0ZWRFbGVtZW50Lm9mZnNldFRvcDtcbiAgICAgIH1cblxuICAgICAgLy8gRGlzcGF0Y2hlcyB0aGUgY3VzdG9tIGV2ZW50IG9wZW5cbiAgICAgIGNvbnRhaW5lci5kaXNwYXRjaEV2ZW50KG5ldyBDdXN0b21FdmVudCgnY3VzdG9tLXNlbGVjdDpvcGVuJykpO1xuXG4gICAgICAvLyBTZXRzIHRoZSBnbG9iYWwgc3RhdGVcbiAgICAgIGlzT3BlbiA9IHRydWU7XG5cbiAgICAgIC8vIENsb3NlXG4gICAgfSBlbHNlIHtcbiAgICAgIC8vIFJlbW92ZXMgdGhlIGNzcyBjbGFzc2VzXG4gICAgICBjb250YWluZXIuY2xhc3NMaXN0LnJlbW92ZShidWlsZGVyUGFyYW1zLmlzT3BlbkNsYXNzKTtcblxuICAgICAgLy8gYXJpYS1leHBhbmRlZCB1cGRhdGVcbiAgICAgIG9wZW5lci5zZXRBdHRyaWJ1dGUoJ2FyaWEtZXhwYW5kZWQnLCAnZmFsc2UnKTtcblxuICAgICAgLy8gU2V0cyB0aGUgZ2xvYmFsIHN0YXRlXG4gICAgICBpc09wZW4gPSBmYWxzZTtcblxuICAgICAgLy8gV2hlbiBjbG9zaW5nIHRoZSBwYW5lbCB0aGUgZm9jdXNlZCBjdXN0b20gb3B0aW9uIG11c3QgYmUgdGhlIHNlbGVjdGVkIG9uZVxuICAgICAgc2V0Rm9jdXNlZEVsZW1lbnQoc2VsZWN0ZWRFbGVtZW50KTtcblxuICAgICAgLy8gRGlzcGF0Y2hlcyB0aGUgY3VzdG9tIGV2ZW50IGNsb3NlXG4gICAgICBjb250YWluZXIuZGlzcGF0Y2hFdmVudChuZXcgQ3VzdG9tRXZlbnQoJ2N1c3RvbS1zZWxlY3Q6Y2xvc2UnKSk7XG4gICAgfVxuICAgIHJldHVybiBpc09wZW47XG4gIH1cblxuICBmdW5jdGlvbiBjbGlja0V2ZW50KGUpIHtcbiAgICAvLyBPcGVuZXIgY2xpY2tcbiAgICBpZiAoZS50YXJnZXQgPT09IG9wZW5lciB8fCBvcGVuZXIuY29udGFpbnMoZS50YXJnZXQpKSB7XG4gICAgICBpZiAoaXNPcGVuKSB7XG4gICAgICAgIG9wZW4oZmFsc2UpO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgb3BlbigpO1xuICAgICAgfVxuICAgICAgLy8gQ3VzdG9tIE9wdGlvbiBjbGlja1xuICAgIH0gZWxzZSBpZiAoZS50YXJnZXQuY2xhc3NMaXN0ICYmIGUudGFyZ2V0LmNsYXNzTGlzdC5jb250YWlucyhidWlsZGVyUGFyYW1zLm9wdGlvbkNsYXNzKSAmJiBwYW5lbC5jb250YWlucyhlLnRhcmdldCkpIHtcbiAgICAgIHNldFNlbGVjdGVkRWxlbWVudChlLnRhcmdldCk7XG4gICAgICAvLyBTZXRzIHRoZSBjb3JyaXNwb25kaW5nIHNlbGVjdCdzIG9wdGlvbiB0byBzZWxlY3RlZCB1cGRhdGluZyB0aGUgc2VsZWN0J3MgdmFsdWUgdG9vXG4gICAgICBzZWxlY3RlZEVsZW1lbnQuY3VzdG9tU2VsZWN0T3JpZ2luYWxPcHRpb24uc2VsZWN0ZWQgPSB0cnVlO1xuICAgICAgb3BlbihmYWxzZSk7XG4gICAgICAvLyBUcmlnZ2VycyB0aGUgbmF0aXZlIGNoYW5nZSBldmVudCBvZiB0aGUgc2VsZWN0XG4gICAgICBzZWxlY3QuZGlzcGF0Y2hFdmVudChuZXcgQ3VzdG9tRXZlbnQoJ2NoYW5nZScpKTtcbiAgICAgIC8vIGNsaWNrIG9uIGxhYmVsIG9yIHNlbGVjdCAoY2xpY2sgb24gbGFiZWwgY29ycmlzcG9uZCB0byBzZWxlY3QgY2xpY2spXG4gICAgfSBlbHNlIGlmIChlLnRhcmdldCA9PT0gc2VsZWN0KSB7XG4gICAgICAvLyBpZiB0aGUgb3JpZ2luYWwgc2VsZWN0IGlzIGZvY3VzYWJsZSAoZm9yIGFueSBleHRlcm5hbCByZWFzb24pIGxldCB0aGUgZm9jdXNcbiAgICAgIC8vIGVsc2UgdHJpZ2dlciB0aGUgZm9jdXMgb24gb3BlbmVyXG4gICAgICBpZiAob3BlbmVyICE9PSBkb2N1bWVudC5hY3RpdmVFbGVtZW50ICYmIHNlbGVjdCAhPT0gZG9jdW1lbnQuYWN0aXZlRWxlbWVudCkge1xuICAgICAgICBvcGVuZXIuZm9jdXMoKTtcbiAgICAgIH1cbiAgICAgIC8vIENsaWNrIG91dHNpZGUgdGhlIGNvbnRhaW5lciBjbG9zZXMgdGhlIHBhbmVsXG4gICAgfSBlbHNlIGlmIChpc09wZW4gJiYgIWNvbnRhaW5lci5jb250YWlucyhlLnRhcmdldCkpIHtcbiAgICAgIG9wZW4oZmFsc2UpO1xuICAgIH1cbiAgfVxuXG4gIGZ1bmN0aW9uIG1vdXNlb3ZlckV2ZW50KGUpIHtcbiAgICAvLyBPbiBtb3VzZSBtb3ZlIG92ZXIgYW5kIG9wdGlvbnMgaXQgYmFjYW1lcyB0aGUgZm9jdXNlZCBvbmVcbiAgICBpZiAoZS50YXJnZXQuY2xhc3NMaXN0ICYmIGUudGFyZ2V0LmNsYXNzTGlzdC5jb250YWlucyhidWlsZGVyUGFyYW1zLm9wdGlvbkNsYXNzKSkge1xuICAgICAgc2V0Rm9jdXNlZEVsZW1lbnQoZS50YXJnZXQpO1xuICAgIH1cbiAgfVxuXG4gIGZ1bmN0aW9uIGtleWRvd25FdmVudChlKSB7XG4gICAgaWYgKCFpc09wZW4pIHtcbiAgICAgIC8vIE9uIFwiQXJyb3cgZG93blwiLCBcIkFycm93IHVwXCIgYW5kIFwiU3BhY2VcIiBrZXlzIG9wZW5zIHRoZSBwYW5lbFxuICAgICAgaWYgKGUua2V5Q29kZSA9PT0gNDAgfHwgZS5rZXlDb2RlID09PSAzOCB8fCBlLmtleUNvZGUgPT09IDMyKSB7XG4gICAgICAgIG9wZW4oKTtcbiAgICAgIH1cbiAgICB9IGVsc2Uge1xuICAgICAgc3dpdGNoIChlLmtleUNvZGUpIHtcbiAgICAgICAgY2FzZSAxMzpcbiAgICAgICAgY2FzZSAzMjpcbiAgICAgICAgICAvLyBPbiBcIkVudGVyXCIgb3IgXCJTcGFjZVwiIHNlbGVjdHMgdGhlIGZvY3VzZWQgZWxlbWVudCBhcyB0aGUgc2VsZWN0ZWQgb25lXG4gICAgICAgICAgc2V0U2VsZWN0ZWRFbGVtZW50KGZvY3VzZWRFbGVtZW50KTtcbiAgICAgICAgICAvLyBTZXRzIHRoZSBjb3JyaXNwb25kaW5nIHNlbGVjdCdzIG9wdGlvbiB0byBzZWxlY3RlZCB1cGRhdGluZyB0aGUgc2VsZWN0J3MgdmFsdWUgdG9vXG4gICAgICAgICAgc2VsZWN0ZWRFbGVtZW50LmN1c3RvbVNlbGVjdE9yaWdpbmFsT3B0aW9uLnNlbGVjdGVkID0gdHJ1ZTtcbiAgICAgICAgICAvLyBUcmlnZ2VycyB0aGUgbmF0aXZlIGNoYW5nZSBldmVudCBvZiB0aGUgc2VsZWN0XG4gICAgICAgICAgc2VsZWN0LmRpc3BhdGNoRXZlbnQobmV3IEN1c3RvbUV2ZW50KCdjaGFuZ2UnKSk7XG4gICAgICAgICAgb3BlbihmYWxzZSk7XG4gICAgICAgICAgYnJlYWs7XG4gICAgICAgIGNhc2UgMjc6XG4gICAgICAgICAgLy8gT24gXCJFc2NhcGVcIiBjbG9zZXMgdGhlIHBhbmVsXG4gICAgICAgICAgb3BlbihmYWxzZSk7XG4gICAgICAgICAgYnJlYWs7XG5cbiAgICAgICAgY2FzZSAzODpcbiAgICAgICAgICAvLyBPbiBcIkFycm93IHVwXCIgc2V0IGZvY3VzIHRvIHRoZSBwcmV2IG9wdGlvbiBpZiBwcmVzZW50XG4gICAgICAgICAgbW92ZUZvY3Vlc2VkRWxlbWVudCgtMSk7XG4gICAgICAgICAgYnJlYWs7XG4gICAgICAgIGNhc2UgNDA6XG4gICAgICAgICAgLy8gT24gXCJBcnJvdyBkb3duXCIgc2V0IGZvY3VzIHRvIHRoZSBuZXh0IG9wdGlvbiBpZiBwcmVzZW50XG4gICAgICAgICAgbW92ZUZvY3Vlc2VkRWxlbWVudCgrMSk7XG4gICAgICAgICAgYnJlYWs7XG4gICAgICAgIGRlZmF1bHQ6XG4gICAgICAgICAgLy8gc2VhcmNoIGluIHBhbmVsIChhdXRvY29tcGxldGUpXG4gICAgICAgICAgaWYgKGUua2V5Q29kZSA+PSA0OCAmJiBlLmtleUNvZGUgPD0gOTApIHtcbiAgICAgICAgICAgIC8vIGNsZWFyIGV4aXN0aW5nIHJlc2V0IHRpbWVvdXRcbiAgICAgICAgICAgIGlmIChyZXNldFNlYXJjaFRpbWVvdXQpIHtcbiAgICAgICAgICAgICAgY2xlYXJUaW1lb3V0KHJlc2V0U2VhcmNoVGltZW91dCk7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIC8vIHJlc2V0IHRpbWVvdXQgZm9yIGVtcHR5IHNlYXJjaCBrZXlcbiAgICAgICAgICAgIHJlc2V0U2VhcmNoVGltZW91dCA9IHNldFRpbWVvdXQoZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgICBzZWFyY2hLZXkgPSAnJztcbiAgICAgICAgICAgIH0sIDE1MDApO1xuXG4gICAgICAgICAgICAvLyB1cGRhdGUgc2VhcmNoIGtleXdvcmQgYXBwZW5kaW5nIHRoZSBjdXJyZW50IGtleVxuICAgICAgICAgICAgc2VhcmNoS2V5ICs9IFN0cmluZy5mcm9tQ2hhckNvZGUoZS5rZXlDb2RlKTtcblxuICAgICAgICAgICAgLy8gc2VhcmNoIHRoZSBlbGVtZW50XG4gICAgICAgICAgICBmb3IgKHZhciBpID0gMCwgbCA9IHNlbGVjdC5vcHRpb25zLmxlbmd0aDsgaSA8IGw7IGkrKykge1xuICAgICAgICAgICAgICAvLyByZW1vdmVkIGNhdXNlIG5vdCBzdXBwb3J0ZWQgYnkgSUU6XG4gICAgICAgICAgICAgIC8vIGlmIChvcHRpb25zW2ldLnRleHQuc3RhcnRzV2l0aChzZWFyY2hLZXkpKVxuICAgICAgICAgICAgICBpZiAoc2VsZWN0Lm9wdGlvbnNbaV0udGV4dC50b1VwcGVyQ2FzZSgpLnN1YnN0cigwLCBzZWFyY2hLZXkubGVuZ3RoKSA9PT0gc2VhcmNoS2V5KSB7XG4gICAgICAgICAgICAgICAgc2V0Rm9jdXNlZEVsZW1lbnQoc2VsZWN0Lm9wdGlvbnNbaV0uY3VzdG9tU2VsZWN0Q3N0T3B0aW9uKTtcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICAgIH1cbiAgICAgICAgICBicmVhaztcbiAgICAgIH1cbiAgICB9XG4gIH1cblxuICBmdW5jdGlvbiBjaGFuZ2VFdmVudCgpIHtcbiAgICB2YXIgaW5kZXggPSBzZWxlY3Quc2VsZWN0ZWRJbmRleDtcbiAgICB2YXIgZWxlbWVudCA9IGluZGV4ID09PSAtMSA/IHVuZGVmaW5lZCA6IHNlbGVjdC5vcHRpb25zW2luZGV4XS5jdXN0b21TZWxlY3RDc3RPcHRpb247XG5cbiAgICBzZXRTZWxlY3RlZEVsZW1lbnQoZWxlbWVudCk7XG4gIH1cblxuICAvLyBXaGVuIHRoZSBvcHRpb24gaXMgb3V0c2lkZSB0aGUgdmlzaWJsZSBwYXJ0IG9mIHRoZSBvcGVuZWQgcGFuZWwsIHVwZGF0ZXMgdGhlIHNjcm9sbFRvcCBwb3NpdGlvblxuICAvLyBUaGlzIGlzIHRoZSBkZWZhdWx0IGJlaGF2aW91clxuICAvLyBUbyBibG9jayBpdCB0aGUgcGx1Z2luIHVzZXIgbXVzdFxuICAvLyBhZGQgYSBcImN1c3RvbS1zZWxlY3Q6Zm9jdXMtb3V0c2lkZS1wYW5lbFwiIGV2ZW50TGlzdGVuZXIgb24gdGhlIHBhbmVsXG4gIC8vIHdpdGggdXNlQ2FwdHVyZSBzZXQgdG8gdHJ1ZVxuICAvLyBhbmQgc3RvcFByb3BhZ2F0aW9uXG4gIGZ1bmN0aW9uIHNjcm9sbFRvRm9jdXNlZChlKSB7XG4gICAgdmFyIGN1cnJQYW5lbCA9IGUuY3VycmVudFRhcmdldDtcbiAgICB2YXIgY3Vyck9wdGlvbiA9IGUudGFyZ2V0O1xuICAgIC8vIFVwXG4gICAgaWYgKGN1cnJPcHRpb24ub2Zmc2V0VG9wIDwgY3VyclBhbmVsLnNjcm9sbFRvcCkge1xuICAgICAgY3VyclBhbmVsLnNjcm9sbFRvcCA9IGN1cnJPcHRpb24ub2Zmc2V0VG9wO1xuICAgICAgLy8gRG93blxuICAgIH0gZWxzZSB7XG4gICAgICBjdXJyUGFuZWwuc2Nyb2xsVG9wID0gY3Vyck9wdGlvbi5vZmZzZXRUb3AgKyBjdXJyT3B0aW9uLmNsaWVudEhlaWdodCAtIGN1cnJQYW5lbC5jbGllbnRIZWlnaHQ7XG4gICAgfVxuICB9XG5cbiAgZnVuY3Rpb24gYWRkRXZlbnRzKCkge1xuICAgIGRvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgY2xpY2tFdmVudCk7XG4gICAgcGFuZWwuYWRkRXZlbnRMaXN0ZW5lcignbW91c2VvdmVyJywgbW91c2VvdmVyRXZlbnQpO1xuICAgIHBhbmVsLmFkZEV2ZW50TGlzdGVuZXIoJ2N1c3RvbS1zZWxlY3Q6Zm9jdXMtb3V0c2lkZS1wYW5lbCcsIHNjcm9sbFRvRm9jdXNlZCk7XG4gICAgc2VsZWN0LmFkZEV2ZW50TGlzdGVuZXIoJ2NoYW5nZScsIGNoYW5nZUV2ZW50KTtcbiAgICBjb250YWluZXIuYWRkRXZlbnRMaXN0ZW5lcigna2V5ZG93bicsIGtleWRvd25FdmVudCk7XG4gIH1cblxuICBmdW5jdGlvbiByZW1vdmVFdmVudHMoKSB7XG4gICAgZG9jdW1lbnQucmVtb3ZlRXZlbnRMaXN0ZW5lcignY2xpY2snLCBjbGlja0V2ZW50KTtcbiAgICBwYW5lbC5yZW1vdmVFdmVudExpc3RlbmVyKCdtb3VzZW92ZXInLCBtb3VzZW92ZXJFdmVudCk7XG4gICAgcGFuZWwucmVtb3ZlRXZlbnRMaXN0ZW5lcignY3VzdG9tLXNlbGVjdDpmb2N1cy1vdXRzaWRlLXBhbmVsJywgc2Nyb2xsVG9Gb2N1c2VkKTtcbiAgICBzZWxlY3QucmVtb3ZlRXZlbnRMaXN0ZW5lcignY2hhbmdlJywgY2hhbmdlRXZlbnQpO1xuICAgIGNvbnRhaW5lci5yZW1vdmVFdmVudExpc3RlbmVyKCdrZXlkb3duJywga2V5ZG93bkV2ZW50KTtcbiAgfVxuXG4gIGZ1bmN0aW9uIGRpc2FibGVkKGJvb2wpIHtcbiAgICBpZiAoYm9vbCAmJiAhc2VsZWN0LmRpc2FibGVkKSB7XG4gICAgICBjb250YWluZXIuY2xhc3NMaXN0LmFkZChidWlsZGVyUGFyYW1zLmlzRGlzYWJsZWRDbGFzcyk7XG4gICAgICBzZWxlY3QuZGlzYWJsZWQgPSB0cnVlO1xuICAgICAgb3BlbmVyLnJlbW92ZUF0dHJpYnV0ZSgndGFiaW5kZXgnKTtcbiAgICAgIGNvbnRhaW5lci5kaXNwYXRjaEV2ZW50KG5ldyBDdXN0b21FdmVudCgnY3VzdG9tLXNlbGVjdDpkaXNhYmxlZCcpKTtcbiAgICAgIHJlbW92ZUV2ZW50cygpO1xuICAgIH0gZWxzZSBpZiAoIWJvb2wgJiYgc2VsZWN0LmRpc2FibGVkKSB7XG4gICAgICBjb250YWluZXIuY2xhc3NMaXN0LnJlbW92ZShidWlsZGVyUGFyYW1zLmlzRGlzYWJsZWRDbGFzcyk7XG4gICAgICBzZWxlY3QuZGlzYWJsZWQgPSBmYWxzZTtcbiAgICAgIG9wZW5lci5zZXRBdHRyaWJ1dGUoJ3RhYmluZGV4JywgJzAnKTtcbiAgICAgIGNvbnRhaW5lci5kaXNwYXRjaEV2ZW50KG5ldyBDdXN0b21FdmVudCgnY3VzdG9tLXNlbGVjdDplbmFibGVkJykpO1xuICAgICAgYWRkRXZlbnRzKCk7XG4gICAgfVxuICB9XG5cbiAgLy8gRm9ybSBhIGdpdmVuIHNlbGVjdCBjaGlsZHJlbiBET00gdHJlZSAob3B0aW9ucyBhbmQgb3B0Z3JvdXApLFxuICAvLyBDcmVhdGVzIHRoZSBjb3JyZXNwb25kaW5nIGN1c3RvbSBIVE1MRWxlbWVudHMgbGlzdCAoZGl2cyB3aXRoIGRpZmZlcmVudCBjbGFzc2VzIGFuZCBhdHRyaWJ1dGVzKVxuICBmdW5jdGlvbiBwYXJzZU1hcmt1cChjaGlsZHJlbikge1xuICAgIHZhciBub2RlTGlzdCA9IGNoaWxkcmVuO1xuICAgIHZhciBjc3RMaXN0ID0gW107XG5cbiAgICBpZiAodHlwZW9mIG5vZGVMaXN0Lmxlbmd0aCA9PT0gJ3VuZGVmaW5lZCcpIHtcbiAgICAgIHRocm93IG5ldyBUeXBlRXJyb3IoJ0ludmFsaWQgQXJndW1lbnQnKTtcbiAgICB9XG5cbiAgICBmb3IgKHZhciBpID0gMCwgbGkgPSBub2RlTGlzdC5sZW5ndGg7IGkgPCBsaTsgaSsrKSB7XG4gICAgICBpZiAobm9kZUxpc3RbaV0gaW5zdGFuY2VvZiBIVE1MRWxlbWVudCAmJiBub2RlTGlzdFtpXS50YWdOYW1lLnRvVXBwZXJDYXNlKCkgPT09ICdPUFRHUk9VUCcpIHtcbiAgICAgICAgdmFyIGNzdE9wdGdyb3VwID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XG4gICAgICAgIGNzdE9wdGdyb3VwLmNsYXNzTGlzdC5hZGQoYnVpbGRlclBhcmFtcy5vcHRncm91cENsYXNzKTtcbiAgICAgICAgY3N0T3B0Z3JvdXAuc2V0QXR0cmlidXRlKCdkYXRhLWxhYmVsJywgbm9kZUxpc3RbaV0ubGFiZWwpO1xuXG4gICAgICAgIC8vIElNUE9SVEFOVDogU3RvcmVzIGluIGEgcHJvcGVydHkgb2YgdGhlIGNyZWF0ZWQgY3VzdG9tIG9wdGlvbiBncm91cFxuICAgICAgICAvLyBhIGhvb2sgdG8gdGhlIHRoZSBjb3JyaXNwb25kaW5nIHNlbGVjdCdzIG9wdGlvbiBncm91cFxuICAgICAgICBjc3RPcHRncm91cC5jdXN0b21TZWxlY3RPcmlnaW5hbE9wdGdyb3VwID0gbm9kZUxpc3RbaV07XG5cbiAgICAgICAgLy8gSU1QT1JUQU5UOiBTdG9yZXMgaW4gYSBwcm9wZXJ0eSBvZiBzZWxlY3QncyBvcHRpb24gZ3JvdXBcbiAgICAgICAgLy8gYSBob29rIHRvIHRoZSBjcmVhdGVkIGN1c3RvbSBvcHRpb24gZ3JvdXBcbiAgICAgICAgbm9kZUxpc3RbaV0uY3VzdG9tU2VsZWN0Q3N0T3B0Z3JvdXAgPSBjc3RPcHRncm91cDtcblxuICAgICAgICB2YXIgc3ViTm9kZXMgPSBwYXJzZU1hcmt1cChub2RlTGlzdFtpXS5jaGlsZHJlbik7XG4gICAgICAgIGZvciAodmFyIGogPSAwLCBsaiA9IHN1Yk5vZGVzLmxlbmd0aDsgaiA8IGxqOyBqKyspIHtcbiAgICAgICAgICBjc3RPcHRncm91cC5hcHBlbmRDaGlsZChzdWJOb2Rlc1tqXSk7XG4gICAgICAgIH1cblxuICAgICAgICBjc3RMaXN0LnB1c2goY3N0T3B0Z3JvdXApO1xuICAgICAgfSBlbHNlIGlmIChub2RlTGlzdFtpXSBpbnN0YW5jZW9mIEhUTUxFbGVtZW50ICYmIG5vZGVMaXN0W2ldLnRhZ05hbWUudG9VcHBlckNhc2UoKSA9PT0gJ09QVElPTicpIHtcbiAgICAgICAgdmFyIGNzdE9wdGlvbiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xuICAgICAgICBjc3RPcHRpb24uY2xhc3NMaXN0LmFkZChidWlsZGVyUGFyYW1zLm9wdGlvbkNsYXNzKTtcbiAgICAgICAgY3N0T3B0aW9uLnRleHRDb250ZW50ID0gbm9kZUxpc3RbaV0udGV4dDtcbiAgICAgICAgY3N0T3B0aW9uLnNldEF0dHJpYnV0ZSgnZGF0YS12YWx1ZScsIG5vZGVMaXN0W2ldLnZhbHVlKTtcbiAgICAgICAgY3N0T3B0aW9uLnNldEF0dHJpYnV0ZSgncm9sZScsICdvcHRpb24nKTtcblxuICAgICAgICAvLyBJTVBPUlRBTlQ6IFN0b3JlcyBpbiBhIHByb3BlcnR5IG9mIHRoZSBjcmVhdGVkIGN1c3RvbSBvcHRpb25cbiAgICAgICAgLy8gYSBob29rIHRvIHRoZSB0aGUgY29ycmlzcG9uZGluZyBzZWxlY3QncyBvcHRpb25cbiAgICAgICAgY3N0T3B0aW9uLmN1c3RvbVNlbGVjdE9yaWdpbmFsT3B0aW9uID0gbm9kZUxpc3RbaV07XG5cbiAgICAgICAgLy8gSU1QT1JUQU5UOiBTdG9yZXMgaW4gYSBwcm9wZXJ0eSBvZiBzZWxlY3QncyBvcHRpb25cbiAgICAgICAgLy8gYSBob29rIHRvIHRoZSBjcmVhdGVkIGN1c3RvbSBvcHRpb25cbiAgICAgICAgbm9kZUxpc3RbaV0uY3VzdG9tU2VsZWN0Q3N0T3B0aW9uID0gY3N0T3B0aW9uO1xuXG4gICAgICAgIC8vIElmIHRoZSBzZWxlY3QncyBvcHRpb24gaXMgc2VsZWN0ZWRcbiAgICAgICAgaWYgKG5vZGVMaXN0W2ldLnNlbGVjdGVkKSB7XG4gICAgICAgICAgc2V0U2VsZWN0ZWRFbGVtZW50KGNzdE9wdGlvbik7XG4gICAgICAgIH1cbiAgICAgICAgY3N0TGlzdC5wdXNoKGNzdE9wdGlvbik7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICB0aHJvdyBuZXcgVHlwZUVycm9yKCdJbnZhbGlkIEFyZ3VtZW50Jyk7XG4gICAgICB9XG4gICAgfVxuICAgIHJldHVybiBjc3RMaXN0O1xuICB9XG5cbiAgZnVuY3Rpb24gX2FwcGVuZChub2RlUGFyLCBhcHBlbmRJbnRvT3JpZ2luYWwsIHRhcmdldFBhcikge1xuICAgIHZhciB0YXJnZXQgPSB2b2lkIDA7XG4gICAgaWYgKHR5cGVvZiB0YXJnZXRQYXIgPT09ICd1bmRlZmluZWQnIHx8IHRhcmdldFBhciA9PT0gc2VsZWN0KSB7XG4gICAgICB0YXJnZXQgPSBwYW5lbDtcbiAgICB9IGVsc2UgaWYgKHRhcmdldFBhciBpbnN0YW5jZW9mIEhUTUxFbGVtZW50ICYmIHRhcmdldFBhci50YWdOYW1lLnRvVXBwZXJDYXNlKCkgPT09ICdPUFRHUk9VUCcgJiYgc2VsZWN0LmNvbnRhaW5zKHRhcmdldFBhcikpIHtcbiAgICAgIHRhcmdldCA9IHRhcmdldFBhci5jdXN0b21TZWxlY3RDc3RPcHRncm91cDtcbiAgICB9IGVsc2Uge1xuICAgICAgdGhyb3cgbmV3IFR5cGVFcnJvcignSW52YWxpZCBBcmd1bWVudCcpO1xuICAgIH1cblxuICAgIC8vIElmIHRoZSBub2RlIHByb3ZpZGVkIGlzIGEgc2luZ2xlIEhUTUxFbGVtZW50IGl0IGlzIHN0b3JlZCBpbiBhbiBhcnJheVxuICAgIHZhciBub2RlID0gbm9kZVBhciBpbnN0YW5jZW9mIEhUTUxFbGVtZW50ID8gW25vZGVQYXJdIDogbm9kZVBhcjtcblxuICAgIC8vIEluamVjdHMgdGhlIG9wdGlvbnN8b3B0Z3JvdXAgaW4gdGhlIHNlbGVjdFxuICAgIGlmIChhcHBlbmRJbnRvT3JpZ2luYWwpIHtcbiAgICAgIGZvciAodmFyIGkgPSAwLCBsID0gbm9kZS5sZW5ndGg7IGkgPCBsOyBpKyspIHtcbiAgICAgICAgaWYgKHRhcmdldCA9PT0gcGFuZWwpIHtcbiAgICAgICAgICBzZWxlY3QuYXBwZW5kQ2hpbGQobm9kZVtpXSk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgdGFyZ2V0LmN1c3RvbVNlbGVjdE9yaWdpbmFsT3B0Z3JvdXAuYXBwZW5kQ2hpbGQobm9kZVtpXSk7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG5cbiAgICAvLyBUaGUgY3VzdG9tIG1hcmt1cCB0byBhcHBlbmRcbiAgICB2YXIgbWFya3VwVG9JbnNlcnQgPSBwYXJzZU1hcmt1cChub2RlKTtcblxuICAgIC8vIEluamVjdHMgdGhlIGNyZWF0ZWQgRE9NIGNvbnRlbnQgaW4gdGhlIHBhbmVsXG4gICAgZm9yICh2YXIgX2kgPSAwLCBfbCA9IG1hcmt1cFRvSW5zZXJ0Lmxlbmd0aDsgX2kgPCBfbDsgX2krKykge1xuICAgICAgdGFyZ2V0LmFwcGVuZENoaWxkKG1hcmt1cFRvSW5zZXJ0W19pXSk7XG4gICAgfVxuXG4gICAgcmV0dXJuIG5vZGU7XG4gIH1cblxuICBmdW5jdGlvbiBfaW5zZXJ0QmVmb3JlKG5vZGUsIHRhcmdldFBhcikge1xuICAgIHZhciB0YXJnZXQgPSB2b2lkIDA7XG4gICAgaWYgKHRhcmdldFBhciBpbnN0YW5jZW9mIEhUTUxFbGVtZW50ICYmIHRhcmdldFBhci50YWdOYW1lLnRvVXBwZXJDYXNlKCkgPT09ICdPUFRJT04nICYmIHNlbGVjdC5jb250YWlucyh0YXJnZXRQYXIpKSB7XG4gICAgICB0YXJnZXQgPSB0YXJnZXRQYXIuY3VzdG9tU2VsZWN0Q3N0T3B0aW9uO1xuICAgIH0gZWxzZSBpZiAodGFyZ2V0UGFyIGluc3RhbmNlb2YgSFRNTEVsZW1lbnQgJiYgdGFyZ2V0UGFyLnRhZ05hbWUudG9VcHBlckNhc2UoKSA9PT0gJ09QVEdST1VQJyAmJiBzZWxlY3QuY29udGFpbnModGFyZ2V0UGFyKSkge1xuICAgICAgdGFyZ2V0ID0gdGFyZ2V0UGFyLmN1c3RvbVNlbGVjdENzdE9wdGdyb3VwO1xuICAgIH0gZWxzZSB7XG4gICAgICB0aHJvdyBuZXcgVHlwZUVycm9yKCdJbnZhbGlkIEFyZ3VtZW50Jyk7XG4gICAgfVxuXG4gICAgLy8gVGhlIGN1c3RvbSBtYXJrdXAgdG8gYXBwZW5kXG4gICAgdmFyIG1hcmt1cFRvSW5zZXJ0ID0gcGFyc2VNYXJrdXAobm9kZS5sZW5ndGggPyBub2RlIDogW25vZGVdKTtcblxuICAgIHRhcmdldC5wYXJlbnROb2RlLmluc2VydEJlZm9yZShtYXJrdXBUb0luc2VydFswXSwgdGFyZ2V0KTtcblxuICAgIC8vIEluamVjdHMgdGhlIG9wdGlvbiBvciBvcHRncm91cCBub2RlIGluIHRoZSBvcmlnaW5hbCBzZWxlY3QgYW5kIHJldHVybnMgdGhlIGluamVjdGVkIG5vZGVcbiAgICByZXR1cm4gdGFyZ2V0UGFyLnBhcmVudE5vZGUuaW5zZXJ0QmVmb3JlKG5vZGUubGVuZ3RoID8gbm9kZVswXSA6IG5vZGUsIHRhcmdldFBhcik7XG4gIH1cblxuICBmdW5jdGlvbiByZW1vdmUobm9kZSkge1xuICAgIHZhciBjc3ROb2RlID0gdm9pZCAwO1xuICAgIGlmIChub2RlIGluc3RhbmNlb2YgSFRNTEVsZW1lbnQgJiYgbm9kZS50YWdOYW1lLnRvVXBwZXJDYXNlKCkgPT09ICdPUFRJT04nICYmIHNlbGVjdC5jb250YWlucyhub2RlKSkge1xuICAgICAgY3N0Tm9kZSA9IG5vZGUuY3VzdG9tU2VsZWN0Q3N0T3B0aW9uO1xuICAgIH0gZWxzZSBpZiAobm9kZSBpbnN0YW5jZW9mIEhUTUxFbGVtZW50ICYmIG5vZGUudGFnTmFtZS50b1VwcGVyQ2FzZSgpID09PSAnT1BUR1JPVVAnICYmIHNlbGVjdC5jb250YWlucyhub2RlKSkge1xuICAgICAgY3N0Tm9kZSA9IG5vZGUuY3VzdG9tU2VsZWN0Q3N0T3B0Z3JvdXA7XG4gICAgfSBlbHNlIHtcbiAgICAgIHRocm93IG5ldyBUeXBlRXJyb3IoJ0ludmFsaWQgQXJndW1lbnQnKTtcbiAgICB9XG4gICAgY3N0Tm9kZS5wYXJlbnROb2RlLnJlbW92ZUNoaWxkKGNzdE5vZGUpO1xuICAgIHZhciByZW1vdmVkTm9kZSA9IG5vZGUucGFyZW50Tm9kZS5yZW1vdmVDaGlsZChub2RlKTtcbiAgICBjaGFuZ2VFdmVudCgpO1xuICAgIHJldHVybiByZW1vdmVkTm9kZTtcbiAgfVxuXG4gIGZ1bmN0aW9uIGVtcHR5KCkge1xuICAgIHZhciByZW1vdmVkID0gW107XG4gICAgd2hpbGUgKHNlbGVjdC5jaGlsZHJlbi5sZW5ndGgpIHtcbiAgICAgIHBhbmVsLnJlbW92ZUNoaWxkKHBhbmVsLmNoaWxkcmVuWzBdKTtcbiAgICAgIHJlbW92ZWQucHVzaChzZWxlY3QucmVtb3ZlQ2hpbGQoc2VsZWN0LmNoaWxkcmVuWzBdKSk7XG4gICAgfVxuICAgIHNldFNlbGVjdGVkRWxlbWVudCgpO1xuICAgIHJldHVybiByZW1vdmVkO1xuICB9XG5cbiAgZnVuY3Rpb24gZGVzdHJveSgpIHtcbiAgICBmb3IgKHZhciBpID0gMCwgbCA9IHNlbGVjdC5vcHRpb25zLmxlbmd0aDsgaSA8IGw7IGkrKykge1xuICAgICAgZGVsZXRlIHNlbGVjdC5vcHRpb25zW2ldLmN1c3RvbVNlbGVjdENzdE9wdGlvbjtcbiAgICB9XG4gICAgdmFyIG9wdEdyb3VwID0gc2VsZWN0LmdldEVsZW1lbnRzQnlUYWdOYW1lKCdvcHRncm91cCcpO1xuICAgIGZvciAodmFyIF9pMiA9IDAsIF9sMiA9IG9wdEdyb3VwLmxlbmd0aDsgX2kyIDwgX2wyOyBfaTIrKykge1xuICAgICAgZGVsZXRlIG9wdEdyb3VwLmN1c3RvbVNlbGVjdENzdE9wdGdyb3VwO1xuICAgIH1cblxuICAgIHJlbW92ZUV2ZW50cygpO1xuXG4gICAgcmV0dXJuIGNvbnRhaW5lci5wYXJlbnROb2RlLnJlcGxhY2VDaGlsZChzZWxlY3QsIGNvbnRhaW5lcik7XG4gIH1cbiAgLy9cbiAgLy8gQ3VzdG9tIFNlbGVjdCBET00gdHJlZSBjcmVhdGlvblxuICAvL1xuXG4gIC8vIENyZWF0ZXMgdGhlIGNvbnRhaW5lci93cmFwcGVyXG4gIGNvbnRhaW5lciA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xuICBjb250YWluZXIuY2xhc3NMaXN0LmFkZChidWlsZGVyUGFyYW1zLmNvbnRhaW5lckNsYXNzLCBjb250YWluZXJDbGFzcyk7XG5cbiAgLy8gQ3JlYXRlcyB0aGUgb3BlbmVyXG4gIG9wZW5lciA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3NwYW4nKTtcbiAgb3BlbmVyLmNsYXNzTmFtZSA9IGJ1aWxkZXJQYXJhbXMub3BlbmVyQ2xhc3M7XG4gIG9wZW5lci5zZXRBdHRyaWJ1dGUoJ3JvbGUnLCAnY29tYm9ib3gnKTtcbiAgb3BlbmVyLnNldEF0dHJpYnV0ZSgnYXJpYS1hdXRvY29tcGxldGUnLCAnbGlzdCcpO1xuICBvcGVuZXIuc2V0QXR0cmlidXRlKCdhcmlhLWV4cGFuZGVkJywgJ2ZhbHNlJyk7XG4gIG9wZW5lci5pbm5lckhUTUwgPSAnPHNwYW4+XFxuICAgJyArIChzZWxlY3Quc2VsZWN0ZWRJbmRleCAhPT0gLTEgPyBzZWxlY3Qub3B0aW9uc1tzZWxlY3Quc2VsZWN0ZWRJbmRleF0udGV4dCA6ICcnKSArICdcXG4gICA8L3NwYW4+JztcblxuICAvLyBDcmVhdGVzIHRoZSBwYW5lbFxuICAvLyBhbmQgaW5qZWN0cyB0aGUgbWFya3VwIG9mIHRoZSBzZWxlY3QgaW5zaWRlXG4gIC8vIHdpdGggc29tZSB0YWcgYW5kIGF0dHJpYnV0ZXMgcmVwbGFjZW1lbnRcbiAgcGFuZWwgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcbiAgLy8gQ3JlYXRlIHJhbmRvbSBpZFxuICB2YXIgcG9zc2libGUgPSAnQUJDREVGR0hJSktMTU5PUFFSU1RVVldYWVphYmNkZWZnaGlqa2xtbm9wcXJzdHV2d3h5ejAxMjM0NTY3ODknO1xuICBmb3IgKHZhciBpID0gMDsgaSA8IDU7IGkrKykge1xuICAgIHVJZCArPSBwb3NzaWJsZS5jaGFyQXQoTWF0aC5mbG9vcihNYXRoLnJhbmRvbSgpICogcG9zc2libGUubGVuZ3RoKSk7XG4gIH1cbiAgcGFuZWwuaWQgPSBjb250YWluZXJDbGFzcyArICctJyArIHVJZCArICctcGFuZWwnO1xuICBwYW5lbC5jbGFzc05hbWUgPSBidWlsZGVyUGFyYW1zLnBhbmVsQ2xhc3M7XG4gIHBhbmVsLnNldEF0dHJpYnV0ZSgncm9sZScsICdsaXN0Ym94Jyk7XG4gIG9wZW5lci5zZXRBdHRyaWJ1dGUoJ2FyaWEtb3ducycsIHBhbmVsLmlkKTtcblxuICBfYXBwZW5kKHNlbGVjdC5jaGlsZHJlbiwgZmFsc2UpO1xuXG4gIC8vIEluamVjdHMgdGhlIGNvbnRhaW5lciBpbiB0aGUgb3JpZ2luYWwgRE9NIHBvc2l0aW9uIG9mIHRoZSBzZWxlY3RcbiAgY29udGFpbmVyLmFwcGVuZENoaWxkKG9wZW5lcik7XG4gIHNlbGVjdC5wYXJlbnROb2RlLnJlcGxhY2VDaGlsZChjb250YWluZXIsIHNlbGVjdCk7XG4gIGNvbnRhaW5lci5hcHBlbmRDaGlsZChzZWxlY3QpO1xuICBjb250YWluZXIuYXBwZW5kQ2hpbGQocGFuZWwpO1xuXG4gIC8vIEFSSUEgbGFiZWxsZWRieSAtIGxhYmVsXG4gIGlmIChkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCdsYWJlbFtmb3I9XCInICsgc2VsZWN0LmlkICsgJ1wiXScpKSB7XG4gICAgY3VyckxhYmVsID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignbGFiZWxbZm9yPVwiJyArIHNlbGVjdC5pZCArICdcIl0nKTtcbiAgfSBlbHNlIGlmIChjb250YWluZXIucGFyZW50Tm9kZS50YWdOYW1lLnRvVXBwZXJDYXNlKCkgPT09ICdMQUJFTCcpIHtcbiAgICBjdXJyTGFiZWwgPSBjb250YWluZXIucGFyZW50Tm9kZTtcbiAgfVxuICBpZiAodHlwZW9mIGN1cnJMYWJlbCAhPT0gJ3VuZGVmaW5lZCcpIHtcbiAgICBjdXJyTGFiZWwuc2V0QXR0cmlidXRlKCdpZCcsIGNvbnRhaW5lckNsYXNzICsgJy0nICsgdUlkICsgJy1sYWJlbCcpO1xuICAgIG9wZW5lci5zZXRBdHRyaWJ1dGUoJ2FyaWEtbGFiZWxsZWRieScsIGNvbnRhaW5lckNsYXNzICsgJy0nICsgdUlkICsgJy1sYWJlbCcpO1xuICB9XG5cbiAgLy8gRXZlbnQgSW5pdFxuICBpZiAoc2VsZWN0LmRpc2FibGVkKSB7XG4gICAgY29udGFpbmVyLmNsYXNzTGlzdC5hZGQoYnVpbGRlclBhcmFtcy5pc0Rpc2FibGVkQ2xhc3MpO1xuICB9IGVsc2Uge1xuICAgIG9wZW5lci5zZXRBdHRyaWJ1dGUoJ3RhYmluZGV4JywgJzAnKTtcbiAgICBzZWxlY3Quc2V0QXR0cmlidXRlKCd0YWJpbmRleCcsICctMScpO1xuICAgIGFkZEV2ZW50cygpO1xuICB9XG5cbiAgLy8gU3RvcmVzIHRoZSBwbHVnaW4gcHVibGljIGV4cG9zZWQgbWV0aG9kcyBhbmQgcHJvcGVydGllcywgZGlyZWN0bHkgaW4gdGhlIGNvbnRhaW5lciBIVE1MRWxlbWVudFxuICBjb250YWluZXIuY3VzdG9tU2VsZWN0ID0ge1xuICAgIGdldCBwbHVnaW5PcHRpb25zKCkge1xuICAgICAgcmV0dXJuIGJ1aWxkZXJQYXJhbXM7XG4gICAgfSxcbiAgICBnZXQgb3BlbigpIHtcbiAgICAgIHJldHVybiBpc09wZW47XG4gICAgfSxcbiAgICBzZXQgb3Blbihib29sKSB7XG4gICAgICBvcGVuKGJvb2wpO1xuICAgIH0sXG4gICAgZ2V0IGRpc2FibGVkKCkge1xuICAgICAgcmV0dXJuIHNlbGVjdC5kaXNhYmxlZDtcbiAgICB9LFxuICAgIHNldCBkaXNhYmxlZChib29sKSB7XG4gICAgICBkaXNhYmxlZChib29sKTtcbiAgICB9LFxuICAgIGdldCB2YWx1ZSgpIHtcbiAgICAgIHJldHVybiBzZWxlY3QudmFsdWU7XG4gICAgfSxcbiAgICBzZXQgdmFsdWUodmFsKSB7XG4gICAgICBzZXRWYWx1ZSh2YWwpO1xuICAgIH0sXG4gICAgYXBwZW5kOiBmdW5jdGlvbiBhcHBlbmQobm9kZSwgdGFyZ2V0KSB7XG4gICAgICByZXR1cm4gX2FwcGVuZChub2RlLCB0cnVlLCB0YXJnZXQpO1xuICAgIH0sXG4gICAgaW5zZXJ0QmVmb3JlOiBmdW5jdGlvbiBpbnNlcnRCZWZvcmUobm9kZSwgdGFyZ2V0KSB7XG4gICAgICByZXR1cm4gX2luc2VydEJlZm9yZShub2RlLCB0YXJnZXQpO1xuICAgIH0sXG4gICAgcmVtb3ZlOiByZW1vdmUsXG4gICAgZW1wdHk6IGVtcHR5LFxuICAgIGRlc3Ryb3k6IGRlc3Ryb3ksXG4gICAgb3BlbmVyOiBvcGVuZXIsXG4gICAgc2VsZWN0OiBzZWxlY3QsXG4gICAgcGFuZWw6IHBhbmVsLFxuICAgIGNvbnRhaW5lcjogY29udGFpbmVyXG4gIH07XG5cbiAgLy8gU3RvcmVzIHRoZSBwbHVnaW4gZGlyZWN0bHkgaW4gdGhlIG9yaWdpbmFsIHNlbGVjdFxuICBzZWxlY3QuY3VzdG9tU2VsZWN0ID0gY29udGFpbmVyLmN1c3RvbVNlbGVjdDtcblxuICAvLyBSZXR1cm5zIHRoZSBwbHVnaW4gaW5zdGFuY2UsIHdpdGggdGhlIHB1YmxpYyBleHBvc2VkIG1ldGhvZHMgYW5kIHByb3BlcnRpZXNcbiAgcmV0dXJuIGNvbnRhaW5lci5jdXN0b21TZWxlY3Q7XG59XG5cbmZ1bmN0aW9uIGN1c3RvbVNlbGVjdChlbGVtZW50LCBjdXN0b21QYXJhbXMpIHtcbiAgLy8gT3ZlcnJpZGVzIHRoZSBkZWZhdWx0IG9wdGlvbnMgd2l0aCB0aGUgb25lcyBwcm92aWRlZCBieSB0aGUgdXNlclxuICB2YXIgbm9kZUxpc3QgPSBbXTtcbiAgdmFyIHNlbGVjdHMgPSBbXTtcblxuICByZXR1cm4gZnVuY3Rpb24gaW5pdCgpIHtcbiAgICAvLyBUaGUgcGx1Z2luIGlzIGNhbGxlZCBvbiBhIHNpbmdsZSBIVE1MRWxlbWVudFxuICAgIGlmIChlbGVtZW50ICYmIGVsZW1lbnQgaW5zdGFuY2VvZiBIVE1MRWxlbWVudCAmJiBlbGVtZW50LnRhZ05hbWUudG9VcHBlckNhc2UoKSA9PT0gJ1NFTEVDVCcpIHtcbiAgICAgIG5vZGVMaXN0LnB1c2goZWxlbWVudCk7XG4gICAgICAvLyBUaGUgcGx1Z2luIGlzIGNhbGxlZCBvbiBhIHNlbGVjdG9yXG4gICAgfSBlbHNlIGlmIChlbGVtZW50ICYmIHR5cGVvZiBlbGVtZW50ID09PSAnc3RyaW5nJykge1xuICAgICAgdmFyIGVsZW1lbnRzTGlzdCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoZWxlbWVudCk7XG4gICAgICBmb3IgKHZhciBpID0gMCwgbCA9IGVsZW1lbnRzTGlzdC5sZW5ndGg7IGkgPCBsOyArK2kpIHtcbiAgICAgICAgaWYgKGVsZW1lbnRzTGlzdFtpXSBpbnN0YW5jZW9mIEhUTUxFbGVtZW50ICYmIGVsZW1lbnRzTGlzdFtpXS50YWdOYW1lLnRvVXBwZXJDYXNlKCkgPT09ICdTRUxFQ1QnKSB7XG4gICAgICAgICAgbm9kZUxpc3QucHVzaChlbGVtZW50c0xpc3RbaV0pO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgICAvLyBUaGUgcGx1Z2luIGlzIGNhbGxlZCBvbiBhbnkgSFRNTEVsZW1lbnRzIGxpc3QgKE5vZGVMaXN0LCBIVE1MQ29sbGVjdGlvbiwgQXJyYXksIGV0Yy4pXG4gICAgfSBlbHNlIGlmIChlbGVtZW50ICYmIGVsZW1lbnQubGVuZ3RoKSB7XG4gICAgICBmb3IgKHZhciBfaTMgPSAwLCBfbDMgPSBlbGVtZW50Lmxlbmd0aDsgX2kzIDwgX2wzOyArK19pMykge1xuICAgICAgICBpZiAoZWxlbWVudFtfaTNdIGluc3RhbmNlb2YgSFRNTEVsZW1lbnQgJiYgZWxlbWVudFtfaTNdLnRhZ05hbWUudG9VcHBlckNhc2UoKSA9PT0gJ1NFTEVDVCcpIHtcbiAgICAgICAgICBub2RlTGlzdC5wdXNoKGVsZW1lbnRbX2kzXSk7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG5cbiAgICAvLyBMYXVuY2hlcyB0aGUgcGx1Z2luIG92ZXIgZXZlcnkgSFRNTEVsZW1lbnRcbiAgICAvLyBBbmQgc3RvcmVzIGV2ZXJ5IHBsdWdpbiBpbnN0YW5jZVxuICAgIGZvciAodmFyIF9pNCA9IDAsIF9sNCA9IG5vZGVMaXN0Lmxlbmd0aDsgX2k0IDwgX2w0OyArK19pNCkge1xuICAgICAgc2VsZWN0cy5wdXNoKGJ1aWxkZXIobm9kZUxpc3RbX2k0XSwgX2V4dGVuZHMoe30sIGRlZmF1bHRQYXJhbXMsIGN1c3RvbVBhcmFtcykpKTtcbiAgICB9XG5cbiAgICAvLyBSZXR1cm5zIGFsbCBwbHVnaW4gaW5zdGFuY2VzXG4gICAgcmV0dXJuIHNlbGVjdHM7XG4gIH0oKTtcbn1cblxuLy8jIHNvdXJjZU1hcHBpbmdVUkw9aW5kZXguanMubWFwIiwiZXhwb3J0IGRlZmF1bHQgKGl0ZW0sIGNiKSA9PiB7XHJcbiAgd2luZG93LmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgZSA9PiB7XHJcbiAgICBpZiAoIShpdGVtLmNvbnRhaW5zKGUudGFyZ2V0KSB8fCBlLnRhcmdldCA9PT0gaXRlbSkpIHtcclxuICAgICAgY2IoKVxyXG4gICAgfVxyXG4gIH0pXHJcbn0iLCJleHBvcnQge2RlZmF1bHQgYXMgbWVudX0gZnJvbSAnLi9tZW51LmpzJ1xyXG5leHBvcnQge2RlZmF1bHQgYXMgTW9kYWx9IGZyb20gJy4vbW9kYWwuanMnXHJcbmV4cG9ydCB7ZGVmYXVsdCBhcyBjbGlja091dHNpZGV9IGZyb20gJy4vY2xpY2tPdXRzaWRlLmpzJ1xyXG4vLyB2ZW5kb3IgPT09IGN1c3RvbSBzZWxlY3RcclxuZXhwb3J0IHtkZWZhdWx0IGFzIHNlbGVjdGl6ZX0gZnJvbSAnLi9zZWxlY3RpemUuanMnIiwiY29uc3QgaW5pdElubmVyRHJvcGRvd24gPSBpdGVtID0+IHtcclxuICBjb25zdCB0cmlnZ2VyID0gaXRlbS5xdWVyeVNlbGVjdG9yKCcuc3VibWVudV9fdHJpZ2dlcicpXHJcblxyXG4gIHRyaWdnZXIuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCAoZSkgPT4ge1xyXG4gICAgZS5zdG9wUHJvcGFnYXRpb24oKVxyXG4gICAgaXRlbS5jbGFzc0xpc3QudG9nZ2xlKCdhY3RpdmUnKVxyXG4gIH0pXHJcblxyXG4gIGl0ZW0uYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCBlID0+IHtcclxuICAgIGUuc3RvcFByb3BhZ2F0aW9uKClcclxuICB9KVxyXG59XHJcblxyXG5jb25zdCBpc0Ryb3Bkb3duID0gaXRlbSA9PiBpdGVtLmNsYXNzTGlzdC5jb250YWlucygnc3VibWVudScpXHJcblxyXG5leHBvcnQgZGVmYXVsdCAoKSA9PiB7XHJcbiAgY29uc3QgY29sbGVjdGlvbiA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoJy5tZW51LWl0ZW0nKVxyXG4gXHJcbiAgY29sbGVjdGlvbi5mb3JFYWNoKGl0ZW0gPT4ge1xyXG5cclxuICAgIGlmICghaXNEcm9wZG93bihpdGVtKSkge1xyXG4gICAgICBpdGVtLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgKCkgPT4ge1xyXG4gICAgICAgIGNvbGxlY3Rpb24uZm9yRWFjaChpdGVtID0+IHtcclxuICAgICAgICAgIGlmKCFpc0Ryb3Bkb3duKGl0ZW0pKVxyXG4gICAgICAgICAgICBpdGVtLmNsYXNzTGlzdC5yZW1vdmUoJ2FjdGl2ZScpXHJcbiAgICAgICAgICB9KVxyXG4gICAgICAgIGl0ZW0uY2xhc3NMaXN0LmFkZCgnYWN0aXZlJylcclxuICAgICAgfSlcclxuICAgIH0gZWxzZSB7XHJcbiAgICAgIGluaXRJbm5lckRyb3Bkb3duKGl0ZW0pXHJcbiAgICB9XHJcbiAgfSlcclxufSIsImltcG9ydCB7IGNsaWNrT3V0c2lkZSB9IGZyb20gJ3V0aWxzJ1xyXG5cclxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgTW9kYWwge1xyXG4gIGNvbnN0cnVjdG9yKHNlbGVjdG9yID0gJycpIHtcclxuICAgIGlmIChzZWxlY3Rvcikge1xyXG4gICAgICB0aGlzLm1vZGFsID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihzZWxlY3RvcilcclxuICAgIH0gZWxzZSB7XHJcbiAgICAgIHRoaXMubW9kYWwgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcubW9kYWwnKVxyXG4gICAgfVxyXG4gICAgLy8gaW5pdCBtb2RhbFxyXG4gICAgY29uc3QgZGlhbG9nID0gdGhpcy5tb2RhbC5xdWVyeVNlbGVjdG9yKCcubW9kYWxfX2RpYWxvZycpXHJcbiAgICBjb25zdCBjbG9zZUJ0biA9IHRoaXMubW9kYWwucXVlcnlTZWxlY3RvcignLm1vZGFsX19jbG9zZScpXHJcblxyXG4gICAgY2xpY2tPdXRzaWRlKGRpYWxvZywgdGhpcy5jbG9zZSlcclxuICAgIGNsb3NlQnRuLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgdGhpcy5jbG9zZSlcclxuICB9XHJcblxyXG4gIG9wZW4oKSB7XHJcbiAgICB0aGlzLm1vZGFsLmNsYXNzTGlzdC5hZGQoJ29wZW4nKVxyXG4gIH1cclxuXHJcbiAgY2xvc2UoKSB7XHJcbiAgICB0aGlzLm1vZGFsLmNsYXNzTGlzdC5yZW1vdmUoJ29wZW4nKVxyXG4gIH1cclxufSIsImltcG9ydCBjdXN0b21TZWxlY3QgZnJvbSAnY3VzdG9tLXNlbGVjdCdcclxuXHJcbmNvbnN0IGNvbmZpZyA9IHtcclxuICBjb250YWluZXJDbGFzczogJ3NlbGVjdCcsXHJcbiAgb3BlbmVyQ2xhc3M6ICdzZWxlY3RfX29wZW5lciBwbHVnJyxcclxuICBwYW5lbENsYXNzOiAnc2VsZWN0X19wYW5lbCcsXHJcbiAgb3B0aW9uQ2xhc3M6ICdzZWxlY3RfX29wdGlvbicsXHJcbiAgLy8gb3B0Z3JvdXBDbGFzczogJ3NlbGVjdF9fb3B0Z3JvdXAnLFxyXG4gIGlzU2VsZWN0ZWRDbGFzczogJ3NlbGVjdGVkJyxcclxuICBoYXNGb2N1c0NsYXNzOiAnZm9jdXNlZCcsXHJcbiAgaXNEaXNhYmxlZENsYXNzOiAnZGlzYWJsZWQnLFxyXG4gIGlzT3BlbkNsYXNzOiAnb3BlbidcclxufVxyXG5cclxuZXhwb3J0IGRlZmF1bHQgbm9kZSA9PiBjdXN0b21TZWxlY3Qobm9kZSwgY29uZmlnKSIsIi8vIFRoZSBtb2R1bGUgY2FjaGVcbnZhciBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX18gPSB7fTtcblxuLy8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbmZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG5cdHZhciBjYWNoZWRNb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdO1xuXHRpZiAoY2FjaGVkTW9kdWxlICE9PSB1bmRlZmluZWQpIHtcblx0XHRyZXR1cm4gY2FjaGVkTW9kdWxlLmV4cG9ydHM7XG5cdH1cblx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcblx0dmFyIG1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF0gPSB7XG5cdFx0Ly8gbm8gbW9kdWxlLmlkIG5lZWRlZFxuXHRcdC8vIG5vIG1vZHVsZS5sb2FkZWQgbmVlZGVkXG5cdFx0ZXhwb3J0czoge31cblx0fTtcblxuXHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cblx0X193ZWJwYWNrX21vZHVsZXNfX1ttb2R1bGVJZF0obW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cblx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcblx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xufVxuXG4vLyBleHBvc2UgdGhlIG1vZHVsZXMgb2JqZWN0IChfX3dlYnBhY2tfbW9kdWxlc19fKVxuX193ZWJwYWNrX3JlcXVpcmVfXy5tID0gX193ZWJwYWNrX21vZHVsZXNfXztcblxuIiwidmFyIGRlZmVycmVkID0gW107XG5fX3dlYnBhY2tfcmVxdWlyZV9fLk8gPSAocmVzdWx0LCBjaHVua0lkcywgZm4sIHByaW9yaXR5KSA9PiB7XG5cdGlmKGNodW5rSWRzKSB7XG5cdFx0cHJpb3JpdHkgPSBwcmlvcml0eSB8fCAwO1xuXHRcdGZvcih2YXIgaSA9IGRlZmVycmVkLmxlbmd0aDsgaSA+IDAgJiYgZGVmZXJyZWRbaSAtIDFdWzJdID4gcHJpb3JpdHk7IGktLSkgZGVmZXJyZWRbaV0gPSBkZWZlcnJlZFtpIC0gMV07XG5cdFx0ZGVmZXJyZWRbaV0gPSBbY2h1bmtJZHMsIGZuLCBwcmlvcml0eV07XG5cdFx0cmV0dXJuO1xuXHR9XG5cdHZhciBub3RGdWxmaWxsZWQgPSBJbmZpbml0eTtcblx0Zm9yICh2YXIgaSA9IDA7IGkgPCBkZWZlcnJlZC5sZW5ndGg7IGkrKykge1xuXHRcdHZhciBbY2h1bmtJZHMsIGZuLCBwcmlvcml0eV0gPSBkZWZlcnJlZFtpXTtcblx0XHR2YXIgZnVsZmlsbGVkID0gdHJ1ZTtcblx0XHRmb3IgKHZhciBqID0gMDsgaiA8IGNodW5rSWRzLmxlbmd0aDsgaisrKSB7XG5cdFx0XHRpZiAoKHByaW9yaXR5ICYgMSA9PT0gMCB8fCBub3RGdWxmaWxsZWQgPj0gcHJpb3JpdHkpICYmIE9iamVjdC5rZXlzKF9fd2VicGFja19yZXF1aXJlX18uTykuZXZlcnkoKGtleSkgPT4gKF9fd2VicGFja19yZXF1aXJlX18uT1trZXldKGNodW5rSWRzW2pdKSkpKSB7XG5cdFx0XHRcdGNodW5rSWRzLnNwbGljZShqLS0sIDEpO1xuXHRcdFx0fSBlbHNlIHtcblx0XHRcdFx0ZnVsZmlsbGVkID0gZmFsc2U7XG5cdFx0XHRcdGlmKHByaW9yaXR5IDwgbm90RnVsZmlsbGVkKSBub3RGdWxmaWxsZWQgPSBwcmlvcml0eTtcblx0XHRcdH1cblx0XHR9XG5cdFx0aWYoZnVsZmlsbGVkKSB7XG5cdFx0XHRkZWZlcnJlZC5zcGxpY2UoaS0tLCAxKVxuXHRcdFx0dmFyIHIgPSBmbigpO1xuXHRcdFx0aWYgKHIgIT09IHVuZGVmaW5lZCkgcmVzdWx0ID0gcjtcblx0XHR9XG5cdH1cblx0cmV0dXJuIHJlc3VsdDtcbn07IiwiLy8gZGVmaW5lIGdldHRlciBmdW5jdGlvbnMgZm9yIGhhcm1vbnkgZXhwb3J0c1xuX193ZWJwYWNrX3JlcXVpcmVfXy5kID0gKGV4cG9ydHMsIGRlZmluaXRpb24pID0+IHtcblx0Zm9yKHZhciBrZXkgaW4gZGVmaW5pdGlvbikge1xuXHRcdGlmKF9fd2VicGFja19yZXF1aXJlX18ubyhkZWZpbml0aW9uLCBrZXkpICYmICFfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZXhwb3J0cywga2V5KSkge1xuXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIGtleSwgeyBlbnVtZXJhYmxlOiB0cnVlLCBnZXQ6IGRlZmluaXRpb25ba2V5XSB9KTtcblx0XHR9XG5cdH1cbn07IiwiX193ZWJwYWNrX3JlcXVpcmVfXy5vID0gKG9iaiwgcHJvcCkgPT4gKE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvYmosIHByb3ApKSIsIi8vIGRlZmluZSBfX2VzTW9kdWxlIG9uIGV4cG9ydHNcbl9fd2VicGFja19yZXF1aXJlX18uciA9IChleHBvcnRzKSA9PiB7XG5cdGlmKHR5cGVvZiBTeW1ib2wgIT09ICd1bmRlZmluZWQnICYmIFN5bWJvbC50b1N0cmluZ1RhZykge1xuXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBTeW1ib2wudG9TdHJpbmdUYWcsIHsgdmFsdWU6ICdNb2R1bGUnIH0pO1xuXHR9XG5cdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCAnX19lc01vZHVsZScsIHsgdmFsdWU6IHRydWUgfSk7XG59OyIsIi8vIG5vIGJhc2VVUklcblxuLy8gb2JqZWN0IHRvIHN0b3JlIGxvYWRlZCBhbmQgbG9hZGluZyBjaHVua3Ncbi8vIHVuZGVmaW5lZCA9IGNodW5rIG5vdCBsb2FkZWQsIG51bGwgPSBjaHVuayBwcmVsb2FkZWQvcHJlZmV0Y2hlZFxuLy8gW3Jlc29sdmUsIHJlamVjdCwgUHJvbWlzZV0gPSBjaHVuayBsb2FkaW5nLCAwID0gY2h1bmsgbG9hZGVkXG52YXIgaW5zdGFsbGVkQ2h1bmtzID0ge1xuXHRcInV0aWxzXCI6IDBcbn07XG5cbi8vIG5vIGNodW5rIG9uIGRlbWFuZCBsb2FkaW5nXG5cbi8vIG5vIHByZWZldGNoaW5nXG5cbi8vIG5vIHByZWxvYWRlZFxuXG4vLyBubyBITVJcblxuLy8gbm8gSE1SIG1hbmlmZXN0XG5cbl9fd2VicGFja19yZXF1aXJlX18uTy5qID0gKGNodW5rSWQpID0+IChpbnN0YWxsZWRDaHVua3NbY2h1bmtJZF0gPT09IDApO1xuXG4vLyBpbnN0YWxsIGEgSlNPTlAgY2FsbGJhY2sgZm9yIGNodW5rIGxvYWRpbmdcbnZhciB3ZWJwYWNrSnNvbnBDYWxsYmFjayA9IChwYXJlbnRDaHVua0xvYWRpbmdGdW5jdGlvbiwgZGF0YSkgPT4ge1xuXHR2YXIgW2NodW5rSWRzLCBtb3JlTW9kdWxlcywgcnVudGltZV0gPSBkYXRhO1xuXHQvLyBhZGQgXCJtb3JlTW9kdWxlc1wiIHRvIHRoZSBtb2R1bGVzIG9iamVjdCxcblx0Ly8gdGhlbiBmbGFnIGFsbCBcImNodW5rSWRzXCIgYXMgbG9hZGVkIGFuZCBmaXJlIGNhbGxiYWNrXG5cdHZhciBtb2R1bGVJZCwgY2h1bmtJZCwgaSA9IDA7XG5cdGlmKGNodW5rSWRzLnNvbWUoKGlkKSA9PiAoaW5zdGFsbGVkQ2h1bmtzW2lkXSAhPT0gMCkpKSB7XG5cdFx0Zm9yKG1vZHVsZUlkIGluIG1vcmVNb2R1bGVzKSB7XG5cdFx0XHRpZihfX3dlYnBhY2tfcmVxdWlyZV9fLm8obW9yZU1vZHVsZXMsIG1vZHVsZUlkKSkge1xuXHRcdFx0XHRfX3dlYnBhY2tfcmVxdWlyZV9fLm1bbW9kdWxlSWRdID0gbW9yZU1vZHVsZXNbbW9kdWxlSWRdO1xuXHRcdFx0fVxuXHRcdH1cblx0XHRpZihydW50aW1lKSB2YXIgcmVzdWx0ID0gcnVudGltZShfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblx0fVxuXHRpZihwYXJlbnRDaHVua0xvYWRpbmdGdW5jdGlvbikgcGFyZW50Q2h1bmtMb2FkaW5nRnVuY3Rpb24oZGF0YSk7XG5cdGZvcig7aSA8IGNodW5rSWRzLmxlbmd0aDsgaSsrKSB7XG5cdFx0Y2h1bmtJZCA9IGNodW5rSWRzW2ldO1xuXHRcdGlmKF9fd2VicGFja19yZXF1aXJlX18ubyhpbnN0YWxsZWRDaHVua3MsIGNodW5rSWQpICYmIGluc3RhbGxlZENodW5rc1tjaHVua0lkXSkge1xuXHRcdFx0aW5zdGFsbGVkQ2h1bmtzW2NodW5rSWRdWzBdKCk7XG5cdFx0fVxuXHRcdGluc3RhbGxlZENodW5rc1tjaHVua0lkXSA9IDA7XG5cdH1cblx0cmV0dXJuIF9fd2VicGFja19yZXF1aXJlX18uTyhyZXN1bHQpO1xufVxuXG52YXIgY2h1bmtMb2FkaW5nR2xvYmFsID0gc2VsZltcIndlYnBhY2tDaHVua180dHJvY2tldF9kYXNoYm9hcmRcIl0gPSBzZWxmW1wid2VicGFja0NodW5rXzR0cm9ja2V0X2Rhc2hib2FyZFwiXSB8fCBbXTtcbmNodW5rTG9hZGluZ0dsb2JhbC5mb3JFYWNoKHdlYnBhY2tKc29ucENhbGxiYWNrLmJpbmQobnVsbCwgMCkpO1xuY2h1bmtMb2FkaW5nR2xvYmFsLnB1c2ggPSB3ZWJwYWNrSnNvbnBDYWxsYmFjay5iaW5kKG51bGwsIGNodW5rTG9hZGluZ0dsb2JhbC5wdXNoLmJpbmQoY2h1bmtMb2FkaW5nR2xvYmFsKSk7IiwiIiwiLy8gc3RhcnR1cFxuLy8gTG9hZCBlbnRyeSBtb2R1bGUgYW5kIHJldHVybiBleHBvcnRzXG4vLyBUaGlzIGVudHJ5IG1vZHVsZSBpcyByZWZlcmVuY2VkIGJ5IG90aGVyIG1vZHVsZXMgc28gaXQgY2FuJ3QgYmUgaW5saW5lZFxuX193ZWJwYWNrX3JlcXVpcmVfXyhcIi4vc3JjL2pzL3V0aWxzL2NsaWNrT3V0c2lkZS5qc1wiKTtcbl9fd2VicGFja19yZXF1aXJlX18oXCIuL3NyYy9qcy91dGlscy9tZW51LmpzXCIpO1xuX193ZWJwYWNrX3JlcXVpcmVfXyhcIi4vc3JjL2pzL3V0aWxzL21vZGFsLmpzXCIpO1xudmFyIF9fd2VicGFja19leHBvcnRzX18gPSBfX3dlYnBhY2tfcmVxdWlyZV9fKFwiLi9zcmMvanMvdXRpbHMvc2VsZWN0aXplLmpzXCIpO1xuX193ZWJwYWNrX2V4cG9ydHNfXyA9IF9fd2VicGFja19yZXF1aXJlX18uTyhfX3dlYnBhY2tfZXhwb3J0c19fKTtcbiIsIiJdLCJuYW1lcyI6W10sInNvdXJjZVJvb3QiOiIifQ==