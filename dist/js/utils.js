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

/***/ "./src/js/utils/accordion.js":
/*!***********************************!*\
  !*** ./src/js/utils/accordion.js ***!
  \***********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (selector => {
  const accordion = selector ? document.querySelector(selector) : document.querySelector('.accordion')

  const accordionItems = accordion.querySelectorAll('.accordion__item')

  accordionItems.forEach(item => {
    item.addEventListener('click', (e) => {

      if (item.classList.contains('active')) {
        item.classList.remove('active')
        return
      }

      accordionItems.forEach(item => item.classList.remove('active'))
      item.classList.add('active')
    })
  })

});

/***/ }),

/***/ "./src/js/utils/checkboxTree.js":
/*!**************************************!*\
  !*** ./src/js/utils/checkboxTree.js ***!
  \**************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
// one-level checkbox tree

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ((mainInput, childInputsContainer) => {

  const childInputsNodeList = childInputsContainer.querySelectorAll('input[type=checkbox]')

  // setup

  // check/uncheck all tree
  // accordTree(mainInput, childInputsNodeList)
  changeState(mainInput, childInputsNodeList)
  // 

  childInputsContainer.addEventListener('change', () => changeState(mainInput, childInputsNodeList))

  // check/uncheck all tree
  mainInput.addEventListener('change', () => accordTree(mainInput, childInputsNodeList))
});

function accordTree(parent, children) {
  children.forEach(input => input.checked = parent.checked)
}

function changeState(parent, children) {
  const checkList = Array.from(children).map(input => input.checked)
  const some = checkList.some(Boolean)
  const every = checkList.every(Boolean)
  parent.checked = every
  parent.indeterminate = some && some !== every
}


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

/***/ "./src/js/utils/customEvents.js":
/*!**************************************!*\
  !*** ./src/js/utils/customEvents.js ***!
  \**************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ({
  modalOpen: new Event('modalOpen', {bubbles: true}),
  modalClose: new Event('modalClose', {bubbles: true})
});

/***/ }),

/***/ "./src/js/utils/datemask.js":
/*!**********************************!*\
  !*** ./src/js/utils/datemask.js ***!
  \**********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (input => {
  input.addEventListener('keypress', function(e) {
    if(e.keyCode < 47 || e.keyCode > 57) {
      e.preventDefault();
    }
    
    const len = input.value.length;
    
    
    if(len !== 1 || len !== 3) {
      if(e.keyCode == 47) {
        e.preventDefault();
      }
    }
    
    if(len === 2) {
      input.value += '.';
    }

    if(len === 5) {
      input.value += '.';
    }

    if(len > 9) e.preventDefault()
  });
});

/***/ }),

/***/ "./src/js/utils/disableTableCheckboxes.js":
/*!************************************************!*\
  !*** ./src/js/utils/disableTableCheckboxes.js ***!
  \************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (selector => {
  const table = selector ? document.querySelector(selector) : document.querySelector('.table')

  const cbCollection = table.querySelectorAll('.cb')
  const mainCb = cbCollection[0]

  
  if (cbCollection.length) {
      
    cbCollection.forEach(cb => {
      const input = cb.querySelector('input[type=checkbox]')
      const parentCell = cb.parentElement
      // if table cell has class .disabled
      if (parentCell.classList.contains('disabled')) input.disabled = true
      // if checkbox disabled
      if(input.disabled) parentCell.classList.add('disabled')
    })
    
    if(mainCb.querySelector('input[type=checkbox]').disabled || mainCb.parentElement.classList.contains('disabled')) {
      cbCollection.forEach(cb => {
        const input = cb.querySelector('input[type=checkbox]')
        const parentCell = cb.parentElement
        parentCell.classList.add('disabled')
        input.disabled = true
      })
    }
  }
}); 

/***/ }),

/***/ "./src/js/utils/dropdown.js":
/*!**********************************!*\
  !*** ./src/js/utils/dropdown.js ***!
  \**********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ Dropdown)
/* harmony export */ });
/* harmony import */ var _clickOutside__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./clickOutside */ "./src/js/utils/clickOutside.js");


class Dropdown {
  constructor(selector = '', config = {}) {
    this.dropdown = selector ? document.querySelector(selector) : document.querySelector('.dd')
    this.disabled = false
    this.init(config)
  }

  open() {
    this.dropdown.classList.add('active')
  }

  close() {
    this.dropdown.classList.remove('active')
  }

  init(config) {
    this.trigger = this.dropdown.querySelector(':scope button')
    this.options = this.dropdown.querySelectorAll('.panel > *')

    this.trigger.addEventListener('click', (e) => {
      // remove condition if hard disable runs
      if (!this.disabled) this.dropdown.classList.toggle('active')
    })

    if(config.closeOnOptionClick) {
      this.options.forEach(item => {
        if (!item.classList.contains('disabled')) {
          item.addEventListener('click', () => this.close())
        }
      })
    }

    if (config.onClickOutside) {
      (0,_clickOutside__WEBPACK_IMPORTED_MODULE_0__["default"])(this.dropdown, () => this.close())
    }
  }
  // light disable with simpke flag checking



  disable() {
    // hard disable with deep cloning and patching DOM
    // const clone = this.dropdown.cloneNode(true)
    // this.dropdown.replaceWith(clone)
    // this.dropdown = clone
    this.disabled = true
    this.dropdown.classList.add('disabled')
  }

  enable() {
    this.disabled = false
    this.dropdown.classList.remove('disabled')
    // add init if hard disable runs
    // this.init()
  }
}

/***/ }),

/***/ "./src/js/utils/index.js":
/*!*******************************!*\
  !*** ./src/js/utils/index.js ***!
  \*******************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Dropdown": () => (/* reexport safe */ _dropdown__WEBPACK_IMPORTED_MODULE_10__["default"]),
/* harmony export */   "Modal": () => (/* reexport safe */ _modal__WEBPACK_IMPORTED_MODULE_2__["default"]),
/* harmony export */   "accordion": () => (/* reexport safe */ _accordion__WEBPACK_IMPORTED_MODULE_5__["default"]),
/* harmony export */   "checkboxTree": () => (/* reexport safe */ _checkboxTree__WEBPACK_IMPORTED_MODULE_8__["default"]),
/* harmony export */   "clickOutside": () => (/* reexport safe */ _clickOutside__WEBPACK_IMPORTED_MODULE_3__["default"]),
/* harmony export */   "dateMask": () => (/* reexport safe */ _datemask__WEBPACK_IMPORTED_MODULE_4__["default"]),
/* harmony export */   "disableTableCheckboxes": () => (/* reexport safe */ _disableTableCheckboxes__WEBPACK_IMPORTED_MODULE_9__["default"]),
/* harmony export */   "events": () => (/* reexport safe */ _customEvents__WEBPACK_IMPORTED_MODULE_0__["default"]),
/* harmony export */   "menu": () => (/* reexport safe */ _menu__WEBPACK_IMPORTED_MODULE_1__["default"]),
/* harmony export */   "selectize": () => (/* reexport safe */ _selectize__WEBPACK_IMPORTED_MODULE_7__["default"]),
/* harmony export */   "tabs": () => (/* reexport safe */ _tabs__WEBPACK_IMPORTED_MODULE_6__["default"])
/* harmony export */ });
/* harmony import */ var _customEvents__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./customEvents */ "./src/js/utils/customEvents.js");
/* harmony import */ var _menu__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./menu */ "./src/js/utils/menu.js");
/* harmony import */ var _modal__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./modal */ "./src/js/utils/modal.js");
/* harmony import */ var _clickOutside__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./clickOutside */ "./src/js/utils/clickOutside.js");
/* harmony import */ var _datemask__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./datemask */ "./src/js/utils/datemask.js");
/* harmony import */ var _accordion__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./accordion */ "./src/js/utils/accordion.js");
/* harmony import */ var _tabs__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./tabs */ "./src/js/utils/tabs.js");
/* harmony import */ var _selectize__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./selectize */ "./src/js/utils/selectize.js");
/* harmony import */ var _checkboxTree__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./checkboxTree */ "./src/js/utils/checkboxTree.js");
/* harmony import */ var _disableTableCheckboxes__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ./disableTableCheckboxes */ "./src/js/utils/disableTableCheckboxes.js");
/* harmony import */ var _dropdown__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ./dropdown */ "./src/js/utils/dropdown.js");







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
/* harmony import */ var utils__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! utils */ "./src/js/utils/index.js");


// const initInnerDropdown = item => {
//   const trigger = item.querySelector('button')

//   trigger.addEventListener('click', (e) => {
//     e.stopPropagation()
//     item.classList.toggle('active')
//   })

//   item.addEventListener('click', e => {
//     e.stopPropagation()
//   })
// }

const isDropdown = item => item.classList.contains('submenu')

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (() => {
  const collection = document.querySelectorAll('.menu-item')

  collection.forEach(item => {

    if (!isDropdown(item)) {
      item.addEventListener('click', () => {
        collection.forEach(item => {
          if (!isDropdown(item))
            item.classList.remove('active')
        })
        item.classList.add('active')
      })
    } else {
      const submenu = new utils__WEBPACK_IMPORTED_MODULE_0__.Dropdown('.submenu', {
        closeOnOptionClick: false,
        onCLickOutside: false
      })
      // submenu.trigger.addEventListener('click', (e) => {
      //   e.stopPropagation()
      // })

      // submenu.dropdown.addEventListener('click', e => {
      //   e.stopPropagation()
      // })
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

const { modalClose, modalOpen } = utils__WEBPACK_IMPORTED_MODULE_0__.events

class Modal {
  constructor(selector = '') {
    if (selector) {
      this.modal = document.querySelector(selector)
    } else {
      this.modal = document.querySelector('.modal')
    }
    // init modal
    this.dialog = this.modal.querySelector('.modal__dialog')
    this.closeBtn = this.modal.querySelector('.modal__close')

    // overlay click
    if (this.dialog) {
      this.modal.addEventListener('click', e => {
        if (e.target === this.modal) this.close()
      })
    }

    this.closeBtn.addEventListener('click', () => this.close())
  }

  open() {
    // this.modal.parentElement.style = 'overflow: hidden'
    this.modal.classList.add('open')
    this.modal.dispatchEvent(modalOpen)
  }

  close() {
    // this.modal.parentElement.style = ''
    this.modal.classList.remove('open')
    this.modal.dispatchEvent(modalClose)
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
  containerClass: 'js-select',
  openerClass: 'js-select__opener plug',
  panelClass: 'js-select__panel',
  optionClass: 'js-select__option',
  // optgroupClass: 'select__optgroup',
  isSelectedClass: 'selected',
  hasFocusClass: 'focus',
  isDisabledClass: 'disabled',
  isOpenClass: 'open'
}

function addListeners(select, i, selectized) {

  select.opener.addEventListener('focus', (e) => {
    if (selectized) {
      selectized.forEach((select) => {
        select.open = false
      })
    } else {
      select.open = false
    }
  })

  select.select.addEventListener('change', (e) => {
    if (e.target.value) {
      select.opener.classList.remove('plug')
    }
  })
}

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (node => {
  const selectized = (0,custom_select__WEBPACK_IMPORTED_MODULE_0__["default"])(node, config)

  if (selectized instanceof Array)
    selectized.forEach(addListeners)
  else
    addListeners(selectized)

  return selectized
});

/***/ }),

/***/ "./src/js/utils/tabs.js":
/*!******************************!*\
  !*** ./src/js/utils/tabs.js ***!
  \******************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (selector => {
  const tabs = selector ? document.querySelector(selector) : document.querySelector('.tabs')

  const tabsItems = tabs.querySelectorAll('.tabs__item')

  tabsItems.forEach(item => {
    item.addEventListener('click', (e) => {
      if (e.target.tagName === 'A') {
        e.preventDefault()
      }

      tabsItems.forEach(item => item.classList.remove('active'))
      item.classList.add('active')
    })
  })

  return tabs
});

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
/******/ 	__webpack_require__("./src/js/utils/accordion.js");
/******/ 	__webpack_require__("./src/js/utils/checkboxTree.js");
/******/ 	__webpack_require__("./src/js/utils/clickOutside.js");
/******/ 	__webpack_require__("./src/js/utils/customEvents.js");
/******/ 	__webpack_require__("./src/js/utils/datemask.js");
/******/ 	__webpack_require__("./src/js/utils/disableTableCheckboxes.js");
/******/ 	__webpack_require__("./src/js/utils/dropdown.js");
/******/ 	__webpack_require__("./src/js/utils/menu.js");
/******/ 	__webpack_require__("./src/js/utils/modal.js");
/******/ 	__webpack_require__("./src/js/utils/selectize.js");
/******/ 	var __webpack_exports__ = __webpack_require__("./src/js/utils/tabs.js");
/******/ 	__webpack_exports__ = __webpack_require__.O(__webpack_exports__);
/******/ 	
/******/ })()
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidXRpbHMuanMiLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7O0FBQUE7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxFQUFFO0FBQ0Y7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1QsUUFBUTtBQUNSO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQSxvQ0FBb0M7QUFDcEM7Ozs7Ozs7Ozs7OztBQzNDYTs7QUFFYiw4Q0FBNkM7QUFDN0M7QUFDQSxDQUFDLEVBQUM7O0FBRUYsb0RBQW9ELGdCQUFnQixzQkFBc0IsT0FBTywyQkFBMkIsMEJBQTBCLHlEQUF5RCxpQ0FBaUM7O0FBRWhQLG1DQUFtQyxpQ0FBaUMsZUFBZSxlQUFlLGdCQUFnQixvQkFBb0IsTUFBTSwwQ0FBMEMsK0JBQStCLGFBQWEscUJBQXFCLHVDQUF1QyxjQUFjLFdBQVcsWUFBWSxVQUFVLE1BQU0sMkNBQTJDLFVBQVUsc0JBQXNCLGVBQWUsMkJBQTJCLDBCQUEwQixjQUFjLDJDQUEyQyxnQ0FBZ0MsT0FBTyxtRkFBbUYsSUFBSTtBQUN6cEI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUEsa0JBQWU7O0FBRWYsbUJBQU8sQ0FBQyxrS0FBdUI7O0FBRS9CO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSx5RkFBeUYsZUFBZTtBQUN4RztBQUNBO0FBQ0EsTUFBTTtBQUNOO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxNQUFNO0FBQ047QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBLE1BQU07QUFDTjtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFFBQVE7QUFDUjtBQUNBO0FBQ0E7QUFDQSxNQUFNO0FBQ047QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxNQUFNO0FBQ047QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsTUFBTTtBQUNOO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsTUFBTTtBQUNOO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsYUFBYTs7QUFFYjtBQUNBOztBQUVBO0FBQ0EsdURBQXVELE9BQU87QUFDOUQ7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsTUFBTTtBQUNOO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLE1BQU07QUFDTjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQSwwQ0FBMEMsUUFBUTtBQUNsRDtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0EsOENBQThDLFFBQVE7QUFDdEQ7QUFDQTs7QUFFQTtBQUNBLFFBQVE7QUFDUjtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFFBQVE7QUFDUjtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsTUFBTTtBQUNOO0FBQ0EsTUFBTTtBQUNOO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0EsdUNBQXVDLE9BQU87QUFDOUM7QUFDQTtBQUNBLFVBQVU7QUFDVjtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0EsaURBQWlELFNBQVM7QUFDMUQ7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsTUFBTTtBQUNOO0FBQ0EsTUFBTTtBQUNOO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQSxNQUFNO0FBQ047QUFDQSxNQUFNO0FBQ047QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0EsK0NBQStDLE9BQU87QUFDdEQ7QUFDQTtBQUNBO0FBQ0EsNkNBQTZDLFdBQVc7QUFDeEQ7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxrQkFBa0IsT0FBTztBQUN6QjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxJQUFJO0FBQ0o7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLElBQUk7QUFDSjtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsTUFBTTtBQUNOO0FBQ0EsK0NBQStDLE9BQU87QUFDdEQ7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLE1BQU07QUFDTiw4Q0FBOEMsV0FBVztBQUN6RDtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQSw2Q0FBNkMsV0FBVztBQUN4RCxxREFBcUQ7QUFDckQ7O0FBRUE7QUFDQTtBQUNBLEdBQUc7QUFDSDs7QUFFQTs7Ozs7Ozs7Ozs7Ozs7O0FDem1CQSxpRUFBZTtBQUNmO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0wsR0FBRztBQUNIO0FBQ0E7Ozs7Ozs7Ozs7Ozs7OztBQ2xCQTtBQUNBO0FBQ0EsaUVBQWU7QUFDZjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsQ0FBQztBQUNEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7Ozs7Ozs7Ozs7OztBQzdCQSxpRUFBZTtBQUNmO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsR0FBRztBQUNIOzs7Ozs7Ozs7Ozs7Ozs7QUNOQSxpRUFBZTtBQUNmLHFDQUFxQyxjQUFjO0FBQ25ELHVDQUF1QyxjQUFjO0FBQ3JEOzs7Ozs7Ozs7Ozs7Ozs7QUNIQSxpRUFBZTtBQUNmO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxHQUFHO0FBQ0gsQ0FBQzs7Ozs7Ozs7Ozs7Ozs7O0FDekJELGlFQUFlO0FBQ2Y7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsT0FBTztBQUNQO0FBQ0E7QUFDQSxDQUFDOzs7Ozs7Ozs7Ozs7Ozs7O0FDM0J3QztBQUN6QztBQUNlO0FBQ2Ysd0NBQXdDO0FBQ3hDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsT0FBTztBQUNQO0FBQ0E7QUFDQTtBQUNBLE1BQU0seURBQVk7QUFDbEI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQ3pEZ0Q7QUFDVjtBQUNFO0FBQ2M7QUFDUjtBQUNFO0FBQ1Y7QUFDdEM7QUFDZ0Q7QUFDTTtBQUNvQjs7Ozs7Ozs7Ozs7Ozs7Ozs7QUNWMUM7QUFDaEM7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxNQUFNO0FBQ047QUFDQTtBQUNBO0FBQ0EsTUFBTTtBQUNOO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsaUVBQWU7QUFDZjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQSxPQUFPO0FBQ1AsTUFBTTtBQUNOLDBCQUEwQiwyQ0FBUTtBQUNsQztBQUNBO0FBQ0EsT0FBTztBQUNQO0FBQ0E7QUFDQSxVQUFVO0FBQ1Y7QUFDQTtBQUNBO0FBQ0EsVUFBVTtBQUNWO0FBQ0EsR0FBRztBQUNIOzs7Ozs7Ozs7Ozs7Ozs7O0FDNUM4QjtBQUM5QixRQUFRLHdCQUF3QixFQUFFLHlDQUFNO0FBQ3hDO0FBQ2U7QUFDZjtBQUNBO0FBQ0E7QUFDQSxNQUFNO0FBQ047QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxPQUFPO0FBQ1A7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7Ozs7Ozs7Ozs7OztBQ25Dd0M7QUFDeEM7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxPQUFPO0FBQ1AsTUFBTTtBQUNOO0FBQ0E7QUFDQSxHQUFHO0FBQ0g7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEdBQUc7QUFDSDtBQUNBO0FBQ0EsaUVBQWU7QUFDZixxQkFBcUIseURBQVk7QUFDakM7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7Ozs7Ozs7Ozs7O0FDMUNBLGlFQUFlO0FBQ2Y7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMLEdBQUc7QUFDSDtBQUNBO0FBQ0E7Ozs7OztVQ2pCQTtVQUNBOztVQUVBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBOztVQUVBO1VBQ0E7O1VBRUE7VUFDQTtVQUNBOztVQUVBO1VBQ0E7Ozs7O1dDekJBO1dBQ0E7V0FDQTtXQUNBO1dBQ0EsK0JBQStCLHdDQUF3QztXQUN2RTtXQUNBO1dBQ0E7V0FDQTtXQUNBLGlCQUFpQixxQkFBcUI7V0FDdEM7V0FDQTtXQUNBLGtCQUFrQixxQkFBcUI7V0FDdkM7V0FDQTtXQUNBLEtBQUs7V0FDTDtXQUNBO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7Ozs7O1dDM0JBO1dBQ0E7V0FDQTtXQUNBO1dBQ0EseUNBQXlDLHdDQUF3QztXQUNqRjtXQUNBO1dBQ0E7Ozs7O1dDUEE7Ozs7O1dDQUE7V0FDQTtXQUNBO1dBQ0EsdURBQXVELGlCQUFpQjtXQUN4RTtXQUNBLGdEQUFnRCxhQUFhO1dBQzdEOzs7OztXQ05BOztXQUVBO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7V0FDQTs7V0FFQTs7V0FFQTs7V0FFQTs7V0FFQTs7V0FFQTs7V0FFQTs7V0FFQTtXQUNBO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7V0FDQSxNQUFNLHFCQUFxQjtXQUMzQjtXQUNBO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7V0FDQTtXQUNBOztXQUVBO1dBQ0E7V0FDQTs7Ozs7VUVoREE7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vNHRyb2NrZXQtZGFzaGJvYXJkLy4vLnlhcm4vY2FjaGUvY3VzdG9tLWV2ZW50LXBvbHlmaWxsLW5wbS0wLjMuMC02YTk3MTVlNjMyLTQ0OWQ4ZTg0OTcuemlwL25vZGVfbW9kdWxlcy9jdXN0b20tZXZlbnQtcG9seWZpbGwvY3VzdG9tLWV2ZW50LXBvbHlmaWxsLmpzIiwid2VicGFjazovLzR0cm9ja2V0LWRhc2hib2FyZC8uLy55YXJuL2NhY2hlL2N1c3RvbS1zZWxlY3QtbnBtLTEuMS4xNS1lODc0NzdmMjY2LWRkODAxOGRlMDIuemlwL25vZGVfbW9kdWxlcy9jdXN0b20tc2VsZWN0L2J1aWxkL2luZGV4LmpzIiwid2VicGFjazovLzR0cm9ja2V0LWRhc2hib2FyZC8uL3NyYy9qcy91dGlscy9hY2NvcmRpb24uanMiLCJ3ZWJwYWNrOi8vNHRyb2NrZXQtZGFzaGJvYXJkLy4vc3JjL2pzL3V0aWxzL2NoZWNrYm94VHJlZS5qcyIsIndlYnBhY2s6Ly80dHJvY2tldC1kYXNoYm9hcmQvLi9zcmMvanMvdXRpbHMvY2xpY2tPdXRzaWRlLmpzIiwid2VicGFjazovLzR0cm9ja2V0LWRhc2hib2FyZC8uL3NyYy9qcy91dGlscy9jdXN0b21FdmVudHMuanMiLCJ3ZWJwYWNrOi8vNHRyb2NrZXQtZGFzaGJvYXJkLy4vc3JjL2pzL3V0aWxzL2RhdGVtYXNrLmpzIiwid2VicGFjazovLzR0cm9ja2V0LWRhc2hib2FyZC8uL3NyYy9qcy91dGlscy9kaXNhYmxlVGFibGVDaGVja2JveGVzLmpzIiwid2VicGFjazovLzR0cm9ja2V0LWRhc2hib2FyZC8uL3NyYy9qcy91dGlscy9kcm9wZG93bi5qcyIsIndlYnBhY2s6Ly80dHJvY2tldC1kYXNoYm9hcmQvLi9zcmMvanMvdXRpbHMvaW5kZXguanMiLCJ3ZWJwYWNrOi8vNHRyb2NrZXQtZGFzaGJvYXJkLy4vc3JjL2pzL3V0aWxzL21lbnUuanMiLCJ3ZWJwYWNrOi8vNHRyb2NrZXQtZGFzaGJvYXJkLy4vc3JjL2pzL3V0aWxzL21vZGFsLmpzIiwid2VicGFjazovLzR0cm9ja2V0LWRhc2hib2FyZC8uL3NyYy9qcy91dGlscy9zZWxlY3RpemUuanMiLCJ3ZWJwYWNrOi8vNHRyb2NrZXQtZGFzaGJvYXJkLy4vc3JjL2pzL3V0aWxzL3RhYnMuanMiLCJ3ZWJwYWNrOi8vNHRyb2NrZXQtZGFzaGJvYXJkL3dlYnBhY2svYm9vdHN0cmFwIiwid2VicGFjazovLzR0cm9ja2V0LWRhc2hib2FyZC93ZWJwYWNrL3J1bnRpbWUvY2h1bmsgbG9hZGVkIiwid2VicGFjazovLzR0cm9ja2V0LWRhc2hib2FyZC93ZWJwYWNrL3J1bnRpbWUvZGVmaW5lIHByb3BlcnR5IGdldHRlcnMiLCJ3ZWJwYWNrOi8vNHRyb2NrZXQtZGFzaGJvYXJkL3dlYnBhY2svcnVudGltZS9oYXNPd25Qcm9wZXJ0eSBzaG9ydGhhbmQiLCJ3ZWJwYWNrOi8vNHRyb2NrZXQtZGFzaGJvYXJkL3dlYnBhY2svcnVudGltZS9tYWtlIG5hbWVzcGFjZSBvYmplY3QiLCJ3ZWJwYWNrOi8vNHRyb2NrZXQtZGFzaGJvYXJkL3dlYnBhY2svcnVudGltZS9qc29ucCBjaHVuayBsb2FkaW5nIiwid2VicGFjazovLzR0cm9ja2V0LWRhc2hib2FyZC93ZWJwYWNrL2JlZm9yZS1zdGFydHVwIiwid2VicGFjazovLzR0cm9ja2V0LWRhc2hib2FyZC93ZWJwYWNrL3N0YXJ0dXAiLCJ3ZWJwYWNrOi8vNHRyb2NrZXQtZGFzaGJvYXJkL3dlYnBhY2svYWZ0ZXItc3RhcnR1cCJdLCJzb3VyY2VzQ29udGVudCI6WyIvLyBQb2x5ZmlsbCBmb3IgY3JlYXRpbmcgQ3VzdG9tRXZlbnRzIG9uIElFOS8xMC8xMVxuXG4vLyBjb2RlIHB1bGxlZCBmcm9tOlxuLy8gaHR0cHM6Ly9naXRodWIuY29tL2Q0dG9jY2hpbmkvY3VzdG9tZXZlbnQtcG9seWZpbGxcbi8vIGh0dHBzOi8vZGV2ZWxvcGVyLm1vemlsbGEub3JnL2VuLVVTL2RvY3MvV2ViL0FQSS9DdXN0b21FdmVudCNQb2x5ZmlsbFxuXG50cnkge1xuICAgIHZhciBjZSA9IG5ldyB3aW5kb3cuQ3VzdG9tRXZlbnQoJ3Rlc3QnKTtcbiAgICBjZS5wcmV2ZW50RGVmYXVsdCgpO1xuICAgIGlmIChjZS5kZWZhdWx0UHJldmVudGVkICE9PSB0cnVlKSB7XG4gICAgICAgIC8vIElFIGhhcyBwcm9ibGVtcyB3aXRoIC5wcmV2ZW50RGVmYXVsdCgpIG9uIGN1c3RvbSBldmVudHNcbiAgICAgICAgLy8gaHR0cDovL3N0YWNrb3ZlcmZsb3cuY29tL3F1ZXN0aW9ucy8yMzM0OTE5MVxuICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJ0NvdWxkIG5vdCBwcmV2ZW50IGRlZmF1bHQnKTtcbiAgICB9XG59IGNhdGNoKGUpIHtcbiAgdmFyIEN1c3RvbUV2ZW50ID0gZnVuY3Rpb24oZXZlbnQsIHBhcmFtcykge1xuICAgIHZhciBldnQsIG9yaWdQcmV2ZW50O1xuICAgIHBhcmFtcyA9IHBhcmFtcyB8fCB7XG4gICAgICBidWJibGVzOiBmYWxzZSxcbiAgICAgIGNhbmNlbGFibGU6IGZhbHNlLFxuICAgICAgZGV0YWlsOiB1bmRlZmluZWRcbiAgICB9O1xuXG4gICAgZXZ0ID0gZG9jdW1lbnQuY3JlYXRlRXZlbnQoXCJDdXN0b21FdmVudFwiKTtcbiAgICBldnQuaW5pdEN1c3RvbUV2ZW50KGV2ZW50LCBwYXJhbXMuYnViYmxlcywgcGFyYW1zLmNhbmNlbGFibGUsIHBhcmFtcy5kZXRhaWwpO1xuICAgIG9yaWdQcmV2ZW50ID0gZXZ0LnByZXZlbnREZWZhdWx0O1xuICAgIGV2dC5wcmV2ZW50RGVmYXVsdCA9IGZ1bmN0aW9uICgpIHtcbiAgICAgIG9yaWdQcmV2ZW50LmNhbGwodGhpcyk7XG4gICAgICB0cnkge1xuICAgICAgICBPYmplY3QuZGVmaW5lUHJvcGVydHkodGhpcywgJ2RlZmF1bHRQcmV2ZW50ZWQnLCB7XG4gICAgICAgICAgZ2V0OiBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgICAgICB9XG4gICAgICAgIH0pO1xuICAgICAgfSBjYXRjaChlKSB7XG4gICAgICAgIHRoaXMuZGVmYXVsdFByZXZlbnRlZCA9IHRydWU7XG4gICAgICB9XG4gICAgfTtcbiAgICByZXR1cm4gZXZ0O1xuICB9O1xuXG4gIEN1c3RvbUV2ZW50LnByb3RvdHlwZSA9IHdpbmRvdy5FdmVudC5wcm90b3R5cGU7XG4gIHdpbmRvdy5DdXN0b21FdmVudCA9IEN1c3RvbUV2ZW50OyAvLyBleHBvc2UgZGVmaW5pdGlvbiB0byB3aW5kb3dcbn1cbiIsIid1c2Ugc3RyaWN0JztcblxuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7XG4gIHZhbHVlOiB0cnVlXG59KTtcblxudmFyIF9leHRlbmRzID0gT2JqZWN0LmFzc2lnbiB8fCBmdW5jdGlvbiAodGFyZ2V0KSB7IGZvciAodmFyIGkgPSAxOyBpIDwgYXJndW1lbnRzLmxlbmd0aDsgaSsrKSB7IHZhciBzb3VyY2UgPSBhcmd1bWVudHNbaV07IGZvciAodmFyIGtleSBpbiBzb3VyY2UpIHsgaWYgKE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChzb3VyY2UsIGtleSkpIHsgdGFyZ2V0W2tleV0gPSBzb3VyY2Vba2V5XTsgfSB9IH0gcmV0dXJuIHRhcmdldDsgfTtcblxudmFyIF9zbGljZWRUb0FycmF5ID0gZnVuY3Rpb24gKCkgeyBmdW5jdGlvbiBzbGljZUl0ZXJhdG9yKGFyciwgaSkgeyB2YXIgX2FyciA9IFtdOyB2YXIgX24gPSB0cnVlOyB2YXIgX2QgPSBmYWxzZTsgdmFyIF9lID0gdW5kZWZpbmVkOyB0cnkgeyBmb3IgKHZhciBfaSA9IGFycltTeW1ib2wuaXRlcmF0b3JdKCksIF9zOyAhKF9uID0gKF9zID0gX2kubmV4dCgpKS5kb25lKTsgX24gPSB0cnVlKSB7IF9hcnIucHVzaChfcy52YWx1ZSk7IGlmIChpICYmIF9hcnIubGVuZ3RoID09PSBpKSBicmVhazsgfSB9IGNhdGNoIChlcnIpIHsgX2QgPSB0cnVlOyBfZSA9IGVycjsgfSBmaW5hbGx5IHsgdHJ5IHsgaWYgKCFfbiAmJiBfaVtcInJldHVyblwiXSkgX2lbXCJyZXR1cm5cIl0oKTsgfSBmaW5hbGx5IHsgaWYgKF9kKSB0aHJvdyBfZTsgfSB9IHJldHVybiBfYXJyOyB9IHJldHVybiBmdW5jdGlvbiAoYXJyLCBpKSB7IGlmIChBcnJheS5pc0FycmF5KGFycikpIHsgcmV0dXJuIGFycjsgfSBlbHNlIGlmIChTeW1ib2wuaXRlcmF0b3IgaW4gT2JqZWN0KGFycikpIHsgcmV0dXJuIHNsaWNlSXRlcmF0b3IoYXJyLCBpKTsgfSBlbHNlIHsgdGhyb3cgbmV3IFR5cGVFcnJvcihcIkludmFsaWQgYXR0ZW1wdCB0byBkZXN0cnVjdHVyZSBub24taXRlcmFibGUgaW5zdGFuY2VcIik7IH0gfTsgfSgpOyAvKipcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICogY3VzdG9tLXNlbGVjdFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgKiBBIGxpZ2h0d2VpZ2h0IEpTIHNjcmlwdCBmb3IgY3VzdG9tIHNlbGVjdCBjcmVhdGlvbi5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICogTmVlZHMgbm8gZGVwZW5kZW5jaWVzLlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgKlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgKiB2MC4wLjFcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICogKGh0dHBzOi8vZ2l0aHViLmNvbS9jdXN0b20tc2VsZWN0L2N1c3RvbS1zZWxlY3QpXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAqXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAqIENvcHlyaWdodCAoYykgMjAxNiBHaW9uYXRhbiBMb21iYXJkaSAmIE1hcmNvIE51Y2FyYVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgKiBNSVQgTGljZW5zZVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgKi9cblxuZXhwb3J0cy5kZWZhdWx0ID0gY3VzdG9tU2VsZWN0O1xuXG5yZXF1aXJlKCdjdXN0b20tZXZlbnQtcG9seWZpbGwnKTtcblxudmFyIGRlZmF1bHRQYXJhbXMgPSB7XG4gIGNvbnRhaW5lckNsYXNzOiAnY3VzdG9tLXNlbGVjdC1jb250YWluZXInLFxuICBvcGVuZXJDbGFzczogJ2N1c3RvbS1zZWxlY3Qtb3BlbmVyJyxcbiAgcGFuZWxDbGFzczogJ2N1c3RvbS1zZWxlY3QtcGFuZWwnLFxuICBvcHRpb25DbGFzczogJ2N1c3RvbS1zZWxlY3Qtb3B0aW9uJyxcbiAgb3B0Z3JvdXBDbGFzczogJ2N1c3RvbS1zZWxlY3Qtb3B0Z3JvdXAnLFxuICBpc1NlbGVjdGVkQ2xhc3M6ICdpcy1zZWxlY3RlZCcsXG4gIGhhc0ZvY3VzQ2xhc3M6ICdoYXMtZm9jdXMnLFxuICBpc0Rpc2FibGVkQ2xhc3M6ICdpcy1kaXNhYmxlZCcsXG4gIGlzT3BlbkNsYXNzOiAnaXMtb3Blbidcbn07XG5cbmZ1bmN0aW9uIGJ1aWxkZXIoZWwsIGJ1aWxkZXJQYXJhbXMpIHtcbiAgdmFyIGNvbnRhaW5lckNsYXNzID0gJ2N1c3RvbVNlbGVjdCc7XG4gIHZhciBpc09wZW4gPSBmYWxzZTtcbiAgdmFyIHVJZCA9ICcnO1xuICB2YXIgc2VsZWN0ID0gZWw7XG4gIHZhciBjb250YWluZXIgPSB2b2lkIDA7XG4gIHZhciBvcGVuZXIgPSB2b2lkIDA7XG4gIHZhciBmb2N1c2VkRWxlbWVudCA9IHZvaWQgMDtcbiAgdmFyIHNlbGVjdGVkRWxlbWVudCA9IHZvaWQgMDtcbiAgdmFyIHBhbmVsID0gdm9pZCAwO1xuICB2YXIgY3VyckxhYmVsID0gdm9pZCAwO1xuXG4gIHZhciByZXNldFNlYXJjaFRpbWVvdXQgPSB2b2lkIDA7XG4gIHZhciBzZWFyY2hLZXkgPSAnJztcblxuICAvL1xuICAvLyBJbm5lciBGdW5jdGlvbnNcbiAgLy9cblxuICAvLyBTZXRzIHRoZSBmb2N1c2VkIGVsZW1lbnQgd2l0aCB0aGUgbmVjY2Vzc2FyeSBjbGFzc2VzIHN1YnN0aXR1dGlvbnNcbiAgZnVuY3Rpb24gc2V0Rm9jdXNlZEVsZW1lbnQoY3N0T3B0aW9uKSB7XG4gICAgaWYgKGZvY3VzZWRFbGVtZW50KSB7XG4gICAgICBmb2N1c2VkRWxlbWVudC5jbGFzc0xpc3QucmVtb3ZlKGJ1aWxkZXJQYXJhbXMuaGFzRm9jdXNDbGFzcyk7XG4gICAgfVxuICAgIGlmICh0eXBlb2YgY3N0T3B0aW9uICE9PSAndW5kZWZpbmVkJykge1xuICAgICAgZm9jdXNlZEVsZW1lbnQgPSBjc3RPcHRpb247XG4gICAgICBmb2N1c2VkRWxlbWVudC5jbGFzc0xpc3QuYWRkKGJ1aWxkZXJQYXJhbXMuaGFzRm9jdXNDbGFzcyk7XG4gICAgICAvLyBPZmZzZXQgdXBkYXRlOiBjaGVja3MgaWYgdGhlIGZvY3VzZWQgZWxlbWVudCBpcyBpbiB0aGUgdmlzaWJsZSBwYXJ0IG9mIHRoZSBwYW5lbENsYXNzXG4gICAgICAvLyBpZiBub3QgZGlzcGF0Y2hlcyBhIGN1c3RvbSBldmVudFxuICAgICAgaWYgKGlzT3Blbikge1xuICAgICAgICBpZiAoY3N0T3B0aW9uLm9mZnNldFRvcCA8IGNzdE9wdGlvbi5vZmZzZXRQYXJlbnQuc2Nyb2xsVG9wIHx8IGNzdE9wdGlvbi5vZmZzZXRUb3AgPiBjc3RPcHRpb24ub2Zmc2V0UGFyZW50LnNjcm9sbFRvcCArIGNzdE9wdGlvbi5vZmZzZXRQYXJlbnQuY2xpZW50SGVpZ2h0IC0gY3N0T3B0aW9uLmNsaWVudEhlaWdodCkge1xuICAgICAgICAgIGNzdE9wdGlvbi5kaXNwYXRjaEV2ZW50KG5ldyBDdXN0b21FdmVudCgnY3VzdG9tLXNlbGVjdDpmb2N1cy1vdXRzaWRlLXBhbmVsJywgeyBidWJibGVzOiB0cnVlIH0pKTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH0gZWxzZSB7XG4gICAgICBmb2N1c2VkRWxlbWVudCA9IHVuZGVmaW5lZDtcbiAgICB9XG4gIH1cblxuICAvLyBSZWFzc2lnbnMgdGhlIGZvY3VzZWQgYW5kIHNlbGVjdGVkIGN1c3RvbSBvcHRpb25cbiAgLy8gVXBkYXRlcyB0aGUgb3BlbmVyIHRleHRcbiAgLy8gSU1QT1JUQU5UOiB0aGUgc2V0U2VsZWN0ZWRFbGVtZW50IGZ1bmN0aW9uIGRvZXNuJ3QgY2hhbmdlIHRoZSBzZWxlY3QgdmFsdWUhXG4gIGZ1bmN0aW9uIHNldFNlbGVjdGVkRWxlbWVudChjc3RPcHRpb24pIHtcbiAgICBpZiAoc2VsZWN0ZWRFbGVtZW50KSB7XG4gICAgICBzZWxlY3RlZEVsZW1lbnQuY2xhc3NMaXN0LnJlbW92ZShidWlsZGVyUGFyYW1zLmlzU2VsZWN0ZWRDbGFzcyk7XG4gICAgICBzZWxlY3RlZEVsZW1lbnQucmVtb3ZlQXR0cmlidXRlKCdpZCcpO1xuICAgICAgb3BlbmVyLnJlbW92ZUF0dHJpYnV0ZSgnYXJpYS1hY3RpdmVkZXNjZW5kYW50Jyk7XG4gICAgfVxuICAgIGlmICh0eXBlb2YgY3N0T3B0aW9uICE9PSAndW5kZWZpbmVkJykge1xuICAgICAgY3N0T3B0aW9uLmNsYXNzTGlzdC5hZGQoYnVpbGRlclBhcmFtcy5pc1NlbGVjdGVkQ2xhc3MpO1xuICAgICAgY3N0T3B0aW9uLnNldEF0dHJpYnV0ZSgnaWQnLCBjb250YWluZXJDbGFzcyArICctJyArIHVJZCArICctc2VsZWN0ZWRPcHRpb24nKTtcbiAgICAgIG9wZW5lci5zZXRBdHRyaWJ1dGUoJ2FyaWEtYWN0aXZlZGVzY2VuZGFudCcsIGNvbnRhaW5lckNsYXNzICsgJy0nICsgdUlkICsgJy1zZWxlY3RlZE9wdGlvbicpO1xuICAgICAgc2VsZWN0ZWRFbGVtZW50ID0gY3N0T3B0aW9uO1xuICAgICAgb3BlbmVyLmNoaWxkcmVuWzBdLnRleHRDb250ZW50ID0gc2VsZWN0ZWRFbGVtZW50LmN1c3RvbVNlbGVjdE9yaWdpbmFsT3B0aW9uLnRleHQ7XG4gICAgfSBlbHNlIHtcbiAgICAgIHNlbGVjdGVkRWxlbWVudCA9IHVuZGVmaW5lZDtcbiAgICAgIG9wZW5lci5jaGlsZHJlblswXS50ZXh0Q29udGVudCA9ICcnO1xuICAgIH1cbiAgICBzZXRGb2N1c2VkRWxlbWVudChjc3RPcHRpb24pO1xuICB9XG5cbiAgZnVuY3Rpb24gc2V0VmFsdWUodmFsdWUpIHtcbiAgICAvLyBHZXRzIHRoZSBvcHRpb24gd2l0aCB0aGUgcHJvdmlkZWQgdmFsdWVcbiAgICB2YXIgdG9TZWxlY3QgPSBzZWxlY3QucXVlcnlTZWxlY3Rvcignb3B0aW9uW3ZhbHVlPVxcJycgKyB2YWx1ZSArICdcXCddJyk7XG4gICAgLy8gSWYgbm8gb3B0aW9uIGhhcyB0aGUgcHJvdmlkZWQgdmFsdWUgZ2V0IHRoZSBmaXJzdFxuICAgIGlmICghdG9TZWxlY3QpIHtcbiAgICAgIHZhciBfc2VsZWN0JG9wdGlvbnMgPSBfc2xpY2VkVG9BcnJheShzZWxlY3Qub3B0aW9ucywgMSk7XG5cbiAgICAgIHRvU2VsZWN0ID0gX3NlbGVjdCRvcHRpb25zWzBdO1xuICAgIH1cbiAgICAvLyBUaGUgb3B0aW9uIHdpdGggdGhlIHByb3ZpZGVkIHZhbHVlIGJlY29tZXMgdGhlIHNlbGVjdGVkIG9uZVxuICAgIC8vIEFuZCBjaGFuZ2VzIHRoZSBzZWxlY3QgY3VycmVudCB2YWx1ZVxuICAgIHRvU2VsZWN0LnNlbGVjdGVkID0gdHJ1ZTtcblxuICAgIHNldFNlbGVjdGVkRWxlbWVudChzZWxlY3Qub3B0aW9uc1tzZWxlY3Quc2VsZWN0ZWRJbmRleF0uY3VzdG9tU2VsZWN0Q3N0T3B0aW9uKTtcbiAgfVxuXG4gIGZ1bmN0aW9uIG1vdmVGb2N1ZXNlZEVsZW1lbnQoZGlyZWN0aW9uKSB7XG4gICAgLy8gR2V0IGFsbCB0aGUgLmN1c3RvbS1zZWxlY3Qtb3B0aW9uc1xuICAgIC8vIEdldCB0aGUgaW5kZXggb2YgdGhlIGN1cnJlbnQgZm9jdXNlZCBvbmVcbiAgICB2YXIgY3VycmVudEZvY3VzZWRJbmRleCA9IFtdLmluZGV4T2YuY2FsbChzZWxlY3Qub3B0aW9ucywgZm9jdXNlZEVsZW1lbnQuY3VzdG9tU2VsZWN0T3JpZ2luYWxPcHRpb24pO1xuICAgIC8vIElmIHRoZSBuZXh0IG9yIHByZXYgY3VzdG9tIG9wdGlvbiBleGlzdFxuICAgIC8vIFNldHMgaXQgYXMgdGhlIG5ldyBmb2N1c2VkIG9uZVxuICAgIGlmIChzZWxlY3Qub3B0aW9uc1tjdXJyZW50Rm9jdXNlZEluZGV4ICsgZGlyZWN0aW9uXSkge1xuICAgICAgc2V0Rm9jdXNlZEVsZW1lbnQoc2VsZWN0Lm9wdGlvbnNbY3VycmVudEZvY3VzZWRJbmRleCArIGRpcmVjdGlvbl0uY3VzdG9tU2VsZWN0Q3N0T3B0aW9uKTtcbiAgICB9XG4gIH1cblxuICAvLyBPcGVuL0Nsb3NlIGZ1bmN0aW9uICh0b2dnbGUpXG4gIGZ1bmN0aW9uIG9wZW4oYm9vbCkge1xuICAgIC8vIE9wZW5cbiAgICBpZiAoYm9vbCB8fCB0eXBlb2YgYm9vbCA9PT0gJ3VuZGVmaW5lZCcpIHtcbiAgICAgIC8vIElmIHByZXNlbnQgY2xvc2VzIGFuIG9wZW5lZCBpbnN0YW5jZSBvZiB0aGUgcGx1Z2luXG4gICAgICAvLyBPbmx5IG9uZSBhdCB0aW1lIGNhbiBiZSBvcGVuXG4gICAgICB2YXIgb3BlbmVkQ3VzdG9tU2VsZWN0ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLicgKyBjb250YWluZXJDbGFzcyArICcuJyArIGJ1aWxkZXJQYXJhbXMuaXNPcGVuQ2xhc3MpO1xuICAgICAgaWYgKG9wZW5lZEN1c3RvbVNlbGVjdCkge1xuICAgICAgICBvcGVuZWRDdXN0b21TZWxlY3QuY3VzdG9tU2VsZWN0Lm9wZW4gPSBmYWxzZTtcbiAgICAgIH1cblxuICAgICAgLy8gT3BlbnMgb25seSB0aGUgY2xpY2tlZCBvbmVcbiAgICAgIGNvbnRhaW5lci5jbGFzc0xpc3QuYWRkKGJ1aWxkZXJQYXJhbXMuaXNPcGVuQ2xhc3MpO1xuXG4gICAgICAvLyBhcmlhLWV4cGFuZGVkIHVwZGF0ZVxuICAgICAgY29udGFpbmVyLmNsYXNzTGlzdC5hZGQoYnVpbGRlclBhcmFtcy5pc09wZW5DbGFzcyk7XG4gICAgICBvcGVuZXIuc2V0QXR0cmlidXRlKCdhcmlhLWV4cGFuZGVkJywgJ3RydWUnKTtcblxuICAgICAgLy8gVXBkYXRlcyB0aGUgc2Nyb2xsVG9wIHBvc2l0aW9uIG9mIHRoZSBwYW5lbCBpbiByZWxhdGlvbiB3aXRoIHRoZSBmb2N1c2VkIG9wdGlvblxuICAgICAgaWYgKHNlbGVjdGVkRWxlbWVudCkge1xuICAgICAgICBwYW5lbC5zY3JvbGxUb3AgPSBzZWxlY3RlZEVsZW1lbnQub2Zmc2V0VG9wO1xuICAgICAgfVxuXG4gICAgICAvLyBEaXNwYXRjaGVzIHRoZSBjdXN0b20gZXZlbnQgb3BlblxuICAgICAgY29udGFpbmVyLmRpc3BhdGNoRXZlbnQobmV3IEN1c3RvbUV2ZW50KCdjdXN0b20tc2VsZWN0Om9wZW4nKSk7XG5cbiAgICAgIC8vIFNldHMgdGhlIGdsb2JhbCBzdGF0ZVxuICAgICAgaXNPcGVuID0gdHJ1ZTtcblxuICAgICAgLy8gQ2xvc2VcbiAgICB9IGVsc2Uge1xuICAgICAgLy8gUmVtb3ZlcyB0aGUgY3NzIGNsYXNzZXNcbiAgICAgIGNvbnRhaW5lci5jbGFzc0xpc3QucmVtb3ZlKGJ1aWxkZXJQYXJhbXMuaXNPcGVuQ2xhc3MpO1xuXG4gICAgICAvLyBhcmlhLWV4cGFuZGVkIHVwZGF0ZVxuICAgICAgb3BlbmVyLnNldEF0dHJpYnV0ZSgnYXJpYS1leHBhbmRlZCcsICdmYWxzZScpO1xuXG4gICAgICAvLyBTZXRzIHRoZSBnbG9iYWwgc3RhdGVcbiAgICAgIGlzT3BlbiA9IGZhbHNlO1xuXG4gICAgICAvLyBXaGVuIGNsb3NpbmcgdGhlIHBhbmVsIHRoZSBmb2N1c2VkIGN1c3RvbSBvcHRpb24gbXVzdCBiZSB0aGUgc2VsZWN0ZWQgb25lXG4gICAgICBzZXRGb2N1c2VkRWxlbWVudChzZWxlY3RlZEVsZW1lbnQpO1xuXG4gICAgICAvLyBEaXNwYXRjaGVzIHRoZSBjdXN0b20gZXZlbnQgY2xvc2VcbiAgICAgIGNvbnRhaW5lci5kaXNwYXRjaEV2ZW50KG5ldyBDdXN0b21FdmVudCgnY3VzdG9tLXNlbGVjdDpjbG9zZScpKTtcbiAgICB9XG4gICAgcmV0dXJuIGlzT3BlbjtcbiAgfVxuXG4gIGZ1bmN0aW9uIGNsaWNrRXZlbnQoZSkge1xuICAgIC8vIE9wZW5lciBjbGlja1xuICAgIGlmIChlLnRhcmdldCA9PT0gb3BlbmVyIHx8IG9wZW5lci5jb250YWlucyhlLnRhcmdldCkpIHtcbiAgICAgIGlmIChpc09wZW4pIHtcbiAgICAgICAgb3BlbihmYWxzZSk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBvcGVuKCk7XG4gICAgICB9XG4gICAgICAvLyBDdXN0b20gT3B0aW9uIGNsaWNrXG4gICAgfSBlbHNlIGlmIChlLnRhcmdldC5jbGFzc0xpc3QgJiYgZS50YXJnZXQuY2xhc3NMaXN0LmNvbnRhaW5zKGJ1aWxkZXJQYXJhbXMub3B0aW9uQ2xhc3MpICYmIHBhbmVsLmNvbnRhaW5zKGUudGFyZ2V0KSkge1xuICAgICAgc2V0U2VsZWN0ZWRFbGVtZW50KGUudGFyZ2V0KTtcbiAgICAgIC8vIFNldHMgdGhlIGNvcnJpc3BvbmRpbmcgc2VsZWN0J3Mgb3B0aW9uIHRvIHNlbGVjdGVkIHVwZGF0aW5nIHRoZSBzZWxlY3QncyB2YWx1ZSB0b29cbiAgICAgIHNlbGVjdGVkRWxlbWVudC5jdXN0b21TZWxlY3RPcmlnaW5hbE9wdGlvbi5zZWxlY3RlZCA9IHRydWU7XG4gICAgICBvcGVuKGZhbHNlKTtcbiAgICAgIC8vIFRyaWdnZXJzIHRoZSBuYXRpdmUgY2hhbmdlIGV2ZW50IG9mIHRoZSBzZWxlY3RcbiAgICAgIHNlbGVjdC5kaXNwYXRjaEV2ZW50KG5ldyBDdXN0b21FdmVudCgnY2hhbmdlJykpO1xuICAgICAgLy8gY2xpY2sgb24gbGFiZWwgb3Igc2VsZWN0IChjbGljayBvbiBsYWJlbCBjb3JyaXNwb25kIHRvIHNlbGVjdCBjbGljaylcbiAgICB9IGVsc2UgaWYgKGUudGFyZ2V0ID09PSBzZWxlY3QpIHtcbiAgICAgIC8vIGlmIHRoZSBvcmlnaW5hbCBzZWxlY3QgaXMgZm9jdXNhYmxlIChmb3IgYW55IGV4dGVybmFsIHJlYXNvbikgbGV0IHRoZSBmb2N1c1xuICAgICAgLy8gZWxzZSB0cmlnZ2VyIHRoZSBmb2N1cyBvbiBvcGVuZXJcbiAgICAgIGlmIChvcGVuZXIgIT09IGRvY3VtZW50LmFjdGl2ZUVsZW1lbnQgJiYgc2VsZWN0ICE9PSBkb2N1bWVudC5hY3RpdmVFbGVtZW50KSB7XG4gICAgICAgIG9wZW5lci5mb2N1cygpO1xuICAgICAgfVxuICAgICAgLy8gQ2xpY2sgb3V0c2lkZSB0aGUgY29udGFpbmVyIGNsb3NlcyB0aGUgcGFuZWxcbiAgICB9IGVsc2UgaWYgKGlzT3BlbiAmJiAhY29udGFpbmVyLmNvbnRhaW5zKGUudGFyZ2V0KSkge1xuICAgICAgb3BlbihmYWxzZSk7XG4gICAgfVxuICB9XG5cbiAgZnVuY3Rpb24gbW91c2VvdmVyRXZlbnQoZSkge1xuICAgIC8vIE9uIG1vdXNlIG1vdmUgb3ZlciBhbmQgb3B0aW9ucyBpdCBiYWNhbWVzIHRoZSBmb2N1c2VkIG9uZVxuICAgIGlmIChlLnRhcmdldC5jbGFzc0xpc3QgJiYgZS50YXJnZXQuY2xhc3NMaXN0LmNvbnRhaW5zKGJ1aWxkZXJQYXJhbXMub3B0aW9uQ2xhc3MpKSB7XG4gICAgICBzZXRGb2N1c2VkRWxlbWVudChlLnRhcmdldCk7XG4gICAgfVxuICB9XG5cbiAgZnVuY3Rpb24ga2V5ZG93bkV2ZW50KGUpIHtcbiAgICBpZiAoIWlzT3Blbikge1xuICAgICAgLy8gT24gXCJBcnJvdyBkb3duXCIsIFwiQXJyb3cgdXBcIiBhbmQgXCJTcGFjZVwiIGtleXMgb3BlbnMgdGhlIHBhbmVsXG4gICAgICBpZiAoZS5rZXlDb2RlID09PSA0MCB8fCBlLmtleUNvZGUgPT09IDM4IHx8IGUua2V5Q29kZSA9PT0gMzIpIHtcbiAgICAgICAgb3BlbigpO1xuICAgICAgfVxuICAgIH0gZWxzZSB7XG4gICAgICBzd2l0Y2ggKGUua2V5Q29kZSkge1xuICAgICAgICBjYXNlIDEzOlxuICAgICAgICBjYXNlIDMyOlxuICAgICAgICAgIC8vIE9uIFwiRW50ZXJcIiBvciBcIlNwYWNlXCIgc2VsZWN0cyB0aGUgZm9jdXNlZCBlbGVtZW50IGFzIHRoZSBzZWxlY3RlZCBvbmVcbiAgICAgICAgICBzZXRTZWxlY3RlZEVsZW1lbnQoZm9jdXNlZEVsZW1lbnQpO1xuICAgICAgICAgIC8vIFNldHMgdGhlIGNvcnJpc3BvbmRpbmcgc2VsZWN0J3Mgb3B0aW9uIHRvIHNlbGVjdGVkIHVwZGF0aW5nIHRoZSBzZWxlY3QncyB2YWx1ZSB0b29cbiAgICAgICAgICBzZWxlY3RlZEVsZW1lbnQuY3VzdG9tU2VsZWN0T3JpZ2luYWxPcHRpb24uc2VsZWN0ZWQgPSB0cnVlO1xuICAgICAgICAgIC8vIFRyaWdnZXJzIHRoZSBuYXRpdmUgY2hhbmdlIGV2ZW50IG9mIHRoZSBzZWxlY3RcbiAgICAgICAgICBzZWxlY3QuZGlzcGF0Y2hFdmVudChuZXcgQ3VzdG9tRXZlbnQoJ2NoYW5nZScpKTtcbiAgICAgICAgICBvcGVuKGZhbHNlKTtcbiAgICAgICAgICBicmVhaztcbiAgICAgICAgY2FzZSAyNzpcbiAgICAgICAgICAvLyBPbiBcIkVzY2FwZVwiIGNsb3NlcyB0aGUgcGFuZWxcbiAgICAgICAgICBvcGVuKGZhbHNlKTtcbiAgICAgICAgICBicmVhaztcblxuICAgICAgICBjYXNlIDM4OlxuICAgICAgICAgIC8vIE9uIFwiQXJyb3cgdXBcIiBzZXQgZm9jdXMgdG8gdGhlIHByZXYgb3B0aW9uIGlmIHByZXNlbnRcbiAgICAgICAgICBtb3ZlRm9jdWVzZWRFbGVtZW50KC0xKTtcbiAgICAgICAgICBicmVhaztcbiAgICAgICAgY2FzZSA0MDpcbiAgICAgICAgICAvLyBPbiBcIkFycm93IGRvd25cIiBzZXQgZm9jdXMgdG8gdGhlIG5leHQgb3B0aW9uIGlmIHByZXNlbnRcbiAgICAgICAgICBtb3ZlRm9jdWVzZWRFbGVtZW50KCsxKTtcbiAgICAgICAgICBicmVhaztcbiAgICAgICAgZGVmYXVsdDpcbiAgICAgICAgICAvLyBzZWFyY2ggaW4gcGFuZWwgKGF1dG9jb21wbGV0ZSlcbiAgICAgICAgICBpZiAoZS5rZXlDb2RlID49IDQ4ICYmIGUua2V5Q29kZSA8PSA5MCkge1xuICAgICAgICAgICAgLy8gY2xlYXIgZXhpc3RpbmcgcmVzZXQgdGltZW91dFxuICAgICAgICAgICAgaWYgKHJlc2V0U2VhcmNoVGltZW91dCkge1xuICAgICAgICAgICAgICBjbGVhclRpbWVvdXQocmVzZXRTZWFyY2hUaW1lb3V0KTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgLy8gcmVzZXQgdGltZW91dCBmb3IgZW1wdHkgc2VhcmNoIGtleVxuICAgICAgICAgICAgcmVzZXRTZWFyY2hUaW1lb3V0ID0gc2V0VGltZW91dChmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICAgIHNlYXJjaEtleSA9ICcnO1xuICAgICAgICAgICAgfSwgMTUwMCk7XG5cbiAgICAgICAgICAgIC8vIHVwZGF0ZSBzZWFyY2gga2V5d29yZCBhcHBlbmRpbmcgdGhlIGN1cnJlbnQga2V5XG4gICAgICAgICAgICBzZWFyY2hLZXkgKz0gU3RyaW5nLmZyb21DaGFyQ29kZShlLmtleUNvZGUpO1xuXG4gICAgICAgICAgICAvLyBzZWFyY2ggdGhlIGVsZW1lbnRcbiAgICAgICAgICAgIGZvciAodmFyIGkgPSAwLCBsID0gc2VsZWN0Lm9wdGlvbnMubGVuZ3RoOyBpIDwgbDsgaSsrKSB7XG4gICAgICAgICAgICAgIC8vIHJlbW92ZWQgY2F1c2Ugbm90IHN1cHBvcnRlZCBieSBJRTpcbiAgICAgICAgICAgICAgLy8gaWYgKG9wdGlvbnNbaV0udGV4dC5zdGFydHNXaXRoKHNlYXJjaEtleSkpXG4gICAgICAgICAgICAgIGlmIChzZWxlY3Qub3B0aW9uc1tpXS50ZXh0LnRvVXBwZXJDYXNlKCkuc3Vic3RyKDAsIHNlYXJjaEtleS5sZW5ndGgpID09PSBzZWFyY2hLZXkpIHtcbiAgICAgICAgICAgICAgICBzZXRGb2N1c2VkRWxlbWVudChzZWxlY3Qub3B0aW9uc1tpXS5jdXN0b21TZWxlY3RDc3RPcHRpb24pO1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfVxuICAgICAgICAgIGJyZWFrO1xuICAgICAgfVxuICAgIH1cbiAgfVxuXG4gIGZ1bmN0aW9uIGNoYW5nZUV2ZW50KCkge1xuICAgIHZhciBpbmRleCA9IHNlbGVjdC5zZWxlY3RlZEluZGV4O1xuICAgIHZhciBlbGVtZW50ID0gaW5kZXggPT09IC0xID8gdW5kZWZpbmVkIDogc2VsZWN0Lm9wdGlvbnNbaW5kZXhdLmN1c3RvbVNlbGVjdENzdE9wdGlvbjtcblxuICAgIHNldFNlbGVjdGVkRWxlbWVudChlbGVtZW50KTtcbiAgfVxuXG4gIC8vIFdoZW4gdGhlIG9wdGlvbiBpcyBvdXRzaWRlIHRoZSB2aXNpYmxlIHBhcnQgb2YgdGhlIG9wZW5lZCBwYW5lbCwgdXBkYXRlcyB0aGUgc2Nyb2xsVG9wIHBvc2l0aW9uXG4gIC8vIFRoaXMgaXMgdGhlIGRlZmF1bHQgYmVoYXZpb3VyXG4gIC8vIFRvIGJsb2NrIGl0IHRoZSBwbHVnaW4gdXNlciBtdXN0XG4gIC8vIGFkZCBhIFwiY3VzdG9tLXNlbGVjdDpmb2N1cy1vdXRzaWRlLXBhbmVsXCIgZXZlbnRMaXN0ZW5lciBvbiB0aGUgcGFuZWxcbiAgLy8gd2l0aCB1c2VDYXB0dXJlIHNldCB0byB0cnVlXG4gIC8vIGFuZCBzdG9wUHJvcGFnYXRpb25cbiAgZnVuY3Rpb24gc2Nyb2xsVG9Gb2N1c2VkKGUpIHtcbiAgICB2YXIgY3VyclBhbmVsID0gZS5jdXJyZW50VGFyZ2V0O1xuICAgIHZhciBjdXJyT3B0aW9uID0gZS50YXJnZXQ7XG4gICAgLy8gVXBcbiAgICBpZiAoY3Vyck9wdGlvbi5vZmZzZXRUb3AgPCBjdXJyUGFuZWwuc2Nyb2xsVG9wKSB7XG4gICAgICBjdXJyUGFuZWwuc2Nyb2xsVG9wID0gY3Vyck9wdGlvbi5vZmZzZXRUb3A7XG4gICAgICAvLyBEb3duXG4gICAgfSBlbHNlIHtcbiAgICAgIGN1cnJQYW5lbC5zY3JvbGxUb3AgPSBjdXJyT3B0aW9uLm9mZnNldFRvcCArIGN1cnJPcHRpb24uY2xpZW50SGVpZ2h0IC0gY3VyclBhbmVsLmNsaWVudEhlaWdodDtcbiAgICB9XG4gIH1cblxuICBmdW5jdGlvbiBhZGRFdmVudHMoKSB7XG4gICAgZG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCBjbGlja0V2ZW50KTtcbiAgICBwYW5lbC5hZGRFdmVudExpc3RlbmVyKCdtb3VzZW92ZXInLCBtb3VzZW92ZXJFdmVudCk7XG4gICAgcGFuZWwuYWRkRXZlbnRMaXN0ZW5lcignY3VzdG9tLXNlbGVjdDpmb2N1cy1vdXRzaWRlLXBhbmVsJywgc2Nyb2xsVG9Gb2N1c2VkKTtcbiAgICBzZWxlY3QuYWRkRXZlbnRMaXN0ZW5lcignY2hhbmdlJywgY2hhbmdlRXZlbnQpO1xuICAgIGNvbnRhaW5lci5hZGRFdmVudExpc3RlbmVyKCdrZXlkb3duJywga2V5ZG93bkV2ZW50KTtcbiAgfVxuXG4gIGZ1bmN0aW9uIHJlbW92ZUV2ZW50cygpIHtcbiAgICBkb2N1bWVudC5yZW1vdmVFdmVudExpc3RlbmVyKCdjbGljaycsIGNsaWNrRXZlbnQpO1xuICAgIHBhbmVsLnJlbW92ZUV2ZW50TGlzdGVuZXIoJ21vdXNlb3ZlcicsIG1vdXNlb3ZlckV2ZW50KTtcbiAgICBwYW5lbC5yZW1vdmVFdmVudExpc3RlbmVyKCdjdXN0b20tc2VsZWN0OmZvY3VzLW91dHNpZGUtcGFuZWwnLCBzY3JvbGxUb0ZvY3VzZWQpO1xuICAgIHNlbGVjdC5yZW1vdmVFdmVudExpc3RlbmVyKCdjaGFuZ2UnLCBjaGFuZ2VFdmVudCk7XG4gICAgY29udGFpbmVyLnJlbW92ZUV2ZW50TGlzdGVuZXIoJ2tleWRvd24nLCBrZXlkb3duRXZlbnQpO1xuICB9XG5cbiAgZnVuY3Rpb24gZGlzYWJsZWQoYm9vbCkge1xuICAgIGlmIChib29sICYmICFzZWxlY3QuZGlzYWJsZWQpIHtcbiAgICAgIGNvbnRhaW5lci5jbGFzc0xpc3QuYWRkKGJ1aWxkZXJQYXJhbXMuaXNEaXNhYmxlZENsYXNzKTtcbiAgICAgIHNlbGVjdC5kaXNhYmxlZCA9IHRydWU7XG4gICAgICBvcGVuZXIucmVtb3ZlQXR0cmlidXRlKCd0YWJpbmRleCcpO1xuICAgICAgY29udGFpbmVyLmRpc3BhdGNoRXZlbnQobmV3IEN1c3RvbUV2ZW50KCdjdXN0b20tc2VsZWN0OmRpc2FibGVkJykpO1xuICAgICAgcmVtb3ZlRXZlbnRzKCk7XG4gICAgfSBlbHNlIGlmICghYm9vbCAmJiBzZWxlY3QuZGlzYWJsZWQpIHtcbiAgICAgIGNvbnRhaW5lci5jbGFzc0xpc3QucmVtb3ZlKGJ1aWxkZXJQYXJhbXMuaXNEaXNhYmxlZENsYXNzKTtcbiAgICAgIHNlbGVjdC5kaXNhYmxlZCA9IGZhbHNlO1xuICAgICAgb3BlbmVyLnNldEF0dHJpYnV0ZSgndGFiaW5kZXgnLCAnMCcpO1xuICAgICAgY29udGFpbmVyLmRpc3BhdGNoRXZlbnQobmV3IEN1c3RvbUV2ZW50KCdjdXN0b20tc2VsZWN0OmVuYWJsZWQnKSk7XG4gICAgICBhZGRFdmVudHMoKTtcbiAgICB9XG4gIH1cblxuICAvLyBGb3JtIGEgZ2l2ZW4gc2VsZWN0IGNoaWxkcmVuIERPTSB0cmVlIChvcHRpb25zIGFuZCBvcHRncm91cCksXG4gIC8vIENyZWF0ZXMgdGhlIGNvcnJlc3BvbmRpbmcgY3VzdG9tIEhUTUxFbGVtZW50cyBsaXN0IChkaXZzIHdpdGggZGlmZmVyZW50IGNsYXNzZXMgYW5kIGF0dHJpYnV0ZXMpXG4gIGZ1bmN0aW9uIHBhcnNlTWFya3VwKGNoaWxkcmVuKSB7XG4gICAgdmFyIG5vZGVMaXN0ID0gY2hpbGRyZW47XG4gICAgdmFyIGNzdExpc3QgPSBbXTtcblxuICAgIGlmICh0eXBlb2Ygbm9kZUxpc3QubGVuZ3RoID09PSAndW5kZWZpbmVkJykge1xuICAgICAgdGhyb3cgbmV3IFR5cGVFcnJvcignSW52YWxpZCBBcmd1bWVudCcpO1xuICAgIH1cblxuICAgIGZvciAodmFyIGkgPSAwLCBsaSA9IG5vZGVMaXN0Lmxlbmd0aDsgaSA8IGxpOyBpKyspIHtcbiAgICAgIGlmIChub2RlTGlzdFtpXSBpbnN0YW5jZW9mIEhUTUxFbGVtZW50ICYmIG5vZGVMaXN0W2ldLnRhZ05hbWUudG9VcHBlckNhc2UoKSA9PT0gJ09QVEdST1VQJykge1xuICAgICAgICB2YXIgY3N0T3B0Z3JvdXAgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcbiAgICAgICAgY3N0T3B0Z3JvdXAuY2xhc3NMaXN0LmFkZChidWlsZGVyUGFyYW1zLm9wdGdyb3VwQ2xhc3MpO1xuICAgICAgICBjc3RPcHRncm91cC5zZXRBdHRyaWJ1dGUoJ2RhdGEtbGFiZWwnLCBub2RlTGlzdFtpXS5sYWJlbCk7XG5cbiAgICAgICAgLy8gSU1QT1JUQU5UOiBTdG9yZXMgaW4gYSBwcm9wZXJ0eSBvZiB0aGUgY3JlYXRlZCBjdXN0b20gb3B0aW9uIGdyb3VwXG4gICAgICAgIC8vIGEgaG9vayB0byB0aGUgdGhlIGNvcnJpc3BvbmRpbmcgc2VsZWN0J3Mgb3B0aW9uIGdyb3VwXG4gICAgICAgIGNzdE9wdGdyb3VwLmN1c3RvbVNlbGVjdE9yaWdpbmFsT3B0Z3JvdXAgPSBub2RlTGlzdFtpXTtcblxuICAgICAgICAvLyBJTVBPUlRBTlQ6IFN0b3JlcyBpbiBhIHByb3BlcnR5IG9mIHNlbGVjdCdzIG9wdGlvbiBncm91cFxuICAgICAgICAvLyBhIGhvb2sgdG8gdGhlIGNyZWF0ZWQgY3VzdG9tIG9wdGlvbiBncm91cFxuICAgICAgICBub2RlTGlzdFtpXS5jdXN0b21TZWxlY3RDc3RPcHRncm91cCA9IGNzdE9wdGdyb3VwO1xuXG4gICAgICAgIHZhciBzdWJOb2RlcyA9IHBhcnNlTWFya3VwKG5vZGVMaXN0W2ldLmNoaWxkcmVuKTtcbiAgICAgICAgZm9yICh2YXIgaiA9IDAsIGxqID0gc3ViTm9kZXMubGVuZ3RoOyBqIDwgbGo7IGorKykge1xuICAgICAgICAgIGNzdE9wdGdyb3VwLmFwcGVuZENoaWxkKHN1Yk5vZGVzW2pdKTtcbiAgICAgICAgfVxuXG4gICAgICAgIGNzdExpc3QucHVzaChjc3RPcHRncm91cCk7XG4gICAgICB9IGVsc2UgaWYgKG5vZGVMaXN0W2ldIGluc3RhbmNlb2YgSFRNTEVsZW1lbnQgJiYgbm9kZUxpc3RbaV0udGFnTmFtZS50b1VwcGVyQ2FzZSgpID09PSAnT1BUSU9OJykge1xuICAgICAgICB2YXIgY3N0T3B0aW9uID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XG4gICAgICAgIGNzdE9wdGlvbi5jbGFzc0xpc3QuYWRkKGJ1aWxkZXJQYXJhbXMub3B0aW9uQ2xhc3MpO1xuICAgICAgICBjc3RPcHRpb24udGV4dENvbnRlbnQgPSBub2RlTGlzdFtpXS50ZXh0O1xuICAgICAgICBjc3RPcHRpb24uc2V0QXR0cmlidXRlKCdkYXRhLXZhbHVlJywgbm9kZUxpc3RbaV0udmFsdWUpO1xuICAgICAgICBjc3RPcHRpb24uc2V0QXR0cmlidXRlKCdyb2xlJywgJ29wdGlvbicpO1xuXG4gICAgICAgIC8vIElNUE9SVEFOVDogU3RvcmVzIGluIGEgcHJvcGVydHkgb2YgdGhlIGNyZWF0ZWQgY3VzdG9tIG9wdGlvblxuICAgICAgICAvLyBhIGhvb2sgdG8gdGhlIHRoZSBjb3JyaXNwb25kaW5nIHNlbGVjdCdzIG9wdGlvblxuICAgICAgICBjc3RPcHRpb24uY3VzdG9tU2VsZWN0T3JpZ2luYWxPcHRpb24gPSBub2RlTGlzdFtpXTtcblxuICAgICAgICAvLyBJTVBPUlRBTlQ6IFN0b3JlcyBpbiBhIHByb3BlcnR5IG9mIHNlbGVjdCdzIG9wdGlvblxuICAgICAgICAvLyBhIGhvb2sgdG8gdGhlIGNyZWF0ZWQgY3VzdG9tIG9wdGlvblxuICAgICAgICBub2RlTGlzdFtpXS5jdXN0b21TZWxlY3RDc3RPcHRpb24gPSBjc3RPcHRpb247XG5cbiAgICAgICAgLy8gSWYgdGhlIHNlbGVjdCdzIG9wdGlvbiBpcyBzZWxlY3RlZFxuICAgICAgICBpZiAobm9kZUxpc3RbaV0uc2VsZWN0ZWQpIHtcbiAgICAgICAgICBzZXRTZWxlY3RlZEVsZW1lbnQoY3N0T3B0aW9uKTtcbiAgICAgICAgfVxuICAgICAgICBjc3RMaXN0LnB1c2goY3N0T3B0aW9uKTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHRocm93IG5ldyBUeXBlRXJyb3IoJ0ludmFsaWQgQXJndW1lbnQnKTtcbiAgICAgIH1cbiAgICB9XG4gICAgcmV0dXJuIGNzdExpc3Q7XG4gIH1cblxuICBmdW5jdGlvbiBfYXBwZW5kKG5vZGVQYXIsIGFwcGVuZEludG9PcmlnaW5hbCwgdGFyZ2V0UGFyKSB7XG4gICAgdmFyIHRhcmdldCA9IHZvaWQgMDtcbiAgICBpZiAodHlwZW9mIHRhcmdldFBhciA9PT0gJ3VuZGVmaW5lZCcgfHwgdGFyZ2V0UGFyID09PSBzZWxlY3QpIHtcbiAgICAgIHRhcmdldCA9IHBhbmVsO1xuICAgIH0gZWxzZSBpZiAodGFyZ2V0UGFyIGluc3RhbmNlb2YgSFRNTEVsZW1lbnQgJiYgdGFyZ2V0UGFyLnRhZ05hbWUudG9VcHBlckNhc2UoKSA9PT0gJ09QVEdST1VQJyAmJiBzZWxlY3QuY29udGFpbnModGFyZ2V0UGFyKSkge1xuICAgICAgdGFyZ2V0ID0gdGFyZ2V0UGFyLmN1c3RvbVNlbGVjdENzdE9wdGdyb3VwO1xuICAgIH0gZWxzZSB7XG4gICAgICB0aHJvdyBuZXcgVHlwZUVycm9yKCdJbnZhbGlkIEFyZ3VtZW50Jyk7XG4gICAgfVxuXG4gICAgLy8gSWYgdGhlIG5vZGUgcHJvdmlkZWQgaXMgYSBzaW5nbGUgSFRNTEVsZW1lbnQgaXQgaXMgc3RvcmVkIGluIGFuIGFycmF5XG4gICAgdmFyIG5vZGUgPSBub2RlUGFyIGluc3RhbmNlb2YgSFRNTEVsZW1lbnQgPyBbbm9kZVBhcl0gOiBub2RlUGFyO1xuXG4gICAgLy8gSW5qZWN0cyB0aGUgb3B0aW9uc3xvcHRncm91cCBpbiB0aGUgc2VsZWN0XG4gICAgaWYgKGFwcGVuZEludG9PcmlnaW5hbCkge1xuICAgICAgZm9yICh2YXIgaSA9IDAsIGwgPSBub2RlLmxlbmd0aDsgaSA8IGw7IGkrKykge1xuICAgICAgICBpZiAodGFyZ2V0ID09PSBwYW5lbCkge1xuICAgICAgICAgIHNlbGVjdC5hcHBlbmRDaGlsZChub2RlW2ldKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICB0YXJnZXQuY3VzdG9tU2VsZWN0T3JpZ2luYWxPcHRncm91cC5hcHBlbmRDaGlsZChub2RlW2ldKTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cblxuICAgIC8vIFRoZSBjdXN0b20gbWFya3VwIHRvIGFwcGVuZFxuICAgIHZhciBtYXJrdXBUb0luc2VydCA9IHBhcnNlTWFya3VwKG5vZGUpO1xuXG4gICAgLy8gSW5qZWN0cyB0aGUgY3JlYXRlZCBET00gY29udGVudCBpbiB0aGUgcGFuZWxcbiAgICBmb3IgKHZhciBfaSA9IDAsIF9sID0gbWFya3VwVG9JbnNlcnQubGVuZ3RoOyBfaSA8IF9sOyBfaSsrKSB7XG4gICAgICB0YXJnZXQuYXBwZW5kQ2hpbGQobWFya3VwVG9JbnNlcnRbX2ldKTtcbiAgICB9XG5cbiAgICByZXR1cm4gbm9kZTtcbiAgfVxuXG4gIGZ1bmN0aW9uIF9pbnNlcnRCZWZvcmUobm9kZSwgdGFyZ2V0UGFyKSB7XG4gICAgdmFyIHRhcmdldCA9IHZvaWQgMDtcbiAgICBpZiAodGFyZ2V0UGFyIGluc3RhbmNlb2YgSFRNTEVsZW1lbnQgJiYgdGFyZ2V0UGFyLnRhZ05hbWUudG9VcHBlckNhc2UoKSA9PT0gJ09QVElPTicgJiYgc2VsZWN0LmNvbnRhaW5zKHRhcmdldFBhcikpIHtcbiAgICAgIHRhcmdldCA9IHRhcmdldFBhci5jdXN0b21TZWxlY3RDc3RPcHRpb247XG4gICAgfSBlbHNlIGlmICh0YXJnZXRQYXIgaW5zdGFuY2VvZiBIVE1MRWxlbWVudCAmJiB0YXJnZXRQYXIudGFnTmFtZS50b1VwcGVyQ2FzZSgpID09PSAnT1BUR1JPVVAnICYmIHNlbGVjdC5jb250YWlucyh0YXJnZXRQYXIpKSB7XG4gICAgICB0YXJnZXQgPSB0YXJnZXRQYXIuY3VzdG9tU2VsZWN0Q3N0T3B0Z3JvdXA7XG4gICAgfSBlbHNlIHtcbiAgICAgIHRocm93IG5ldyBUeXBlRXJyb3IoJ0ludmFsaWQgQXJndW1lbnQnKTtcbiAgICB9XG5cbiAgICAvLyBUaGUgY3VzdG9tIG1hcmt1cCB0byBhcHBlbmRcbiAgICB2YXIgbWFya3VwVG9JbnNlcnQgPSBwYXJzZU1hcmt1cChub2RlLmxlbmd0aCA/IG5vZGUgOiBbbm9kZV0pO1xuXG4gICAgdGFyZ2V0LnBhcmVudE5vZGUuaW5zZXJ0QmVmb3JlKG1hcmt1cFRvSW5zZXJ0WzBdLCB0YXJnZXQpO1xuXG4gICAgLy8gSW5qZWN0cyB0aGUgb3B0aW9uIG9yIG9wdGdyb3VwIG5vZGUgaW4gdGhlIG9yaWdpbmFsIHNlbGVjdCBhbmQgcmV0dXJucyB0aGUgaW5qZWN0ZWQgbm9kZVxuICAgIHJldHVybiB0YXJnZXRQYXIucGFyZW50Tm9kZS5pbnNlcnRCZWZvcmUobm9kZS5sZW5ndGggPyBub2RlWzBdIDogbm9kZSwgdGFyZ2V0UGFyKTtcbiAgfVxuXG4gIGZ1bmN0aW9uIHJlbW92ZShub2RlKSB7XG4gICAgdmFyIGNzdE5vZGUgPSB2b2lkIDA7XG4gICAgaWYgKG5vZGUgaW5zdGFuY2VvZiBIVE1MRWxlbWVudCAmJiBub2RlLnRhZ05hbWUudG9VcHBlckNhc2UoKSA9PT0gJ09QVElPTicgJiYgc2VsZWN0LmNvbnRhaW5zKG5vZGUpKSB7XG4gICAgICBjc3ROb2RlID0gbm9kZS5jdXN0b21TZWxlY3RDc3RPcHRpb247XG4gICAgfSBlbHNlIGlmIChub2RlIGluc3RhbmNlb2YgSFRNTEVsZW1lbnQgJiYgbm9kZS50YWdOYW1lLnRvVXBwZXJDYXNlKCkgPT09ICdPUFRHUk9VUCcgJiYgc2VsZWN0LmNvbnRhaW5zKG5vZGUpKSB7XG4gICAgICBjc3ROb2RlID0gbm9kZS5jdXN0b21TZWxlY3RDc3RPcHRncm91cDtcbiAgICB9IGVsc2Uge1xuICAgICAgdGhyb3cgbmV3IFR5cGVFcnJvcignSW52YWxpZCBBcmd1bWVudCcpO1xuICAgIH1cbiAgICBjc3ROb2RlLnBhcmVudE5vZGUucmVtb3ZlQ2hpbGQoY3N0Tm9kZSk7XG4gICAgdmFyIHJlbW92ZWROb2RlID0gbm9kZS5wYXJlbnROb2RlLnJlbW92ZUNoaWxkKG5vZGUpO1xuICAgIGNoYW5nZUV2ZW50KCk7XG4gICAgcmV0dXJuIHJlbW92ZWROb2RlO1xuICB9XG5cbiAgZnVuY3Rpb24gZW1wdHkoKSB7XG4gICAgdmFyIHJlbW92ZWQgPSBbXTtcbiAgICB3aGlsZSAoc2VsZWN0LmNoaWxkcmVuLmxlbmd0aCkge1xuICAgICAgcGFuZWwucmVtb3ZlQ2hpbGQocGFuZWwuY2hpbGRyZW5bMF0pO1xuICAgICAgcmVtb3ZlZC5wdXNoKHNlbGVjdC5yZW1vdmVDaGlsZChzZWxlY3QuY2hpbGRyZW5bMF0pKTtcbiAgICB9XG4gICAgc2V0U2VsZWN0ZWRFbGVtZW50KCk7XG4gICAgcmV0dXJuIHJlbW92ZWQ7XG4gIH1cblxuICBmdW5jdGlvbiBkZXN0cm95KCkge1xuICAgIGZvciAodmFyIGkgPSAwLCBsID0gc2VsZWN0Lm9wdGlvbnMubGVuZ3RoOyBpIDwgbDsgaSsrKSB7XG4gICAgICBkZWxldGUgc2VsZWN0Lm9wdGlvbnNbaV0uY3VzdG9tU2VsZWN0Q3N0T3B0aW9uO1xuICAgIH1cbiAgICB2YXIgb3B0R3JvdXAgPSBzZWxlY3QuZ2V0RWxlbWVudHNCeVRhZ05hbWUoJ29wdGdyb3VwJyk7XG4gICAgZm9yICh2YXIgX2kyID0gMCwgX2wyID0gb3B0R3JvdXAubGVuZ3RoOyBfaTIgPCBfbDI7IF9pMisrKSB7XG4gICAgICBkZWxldGUgb3B0R3JvdXAuY3VzdG9tU2VsZWN0Q3N0T3B0Z3JvdXA7XG4gICAgfVxuXG4gICAgcmVtb3ZlRXZlbnRzKCk7XG5cbiAgICByZXR1cm4gY29udGFpbmVyLnBhcmVudE5vZGUucmVwbGFjZUNoaWxkKHNlbGVjdCwgY29udGFpbmVyKTtcbiAgfVxuICAvL1xuICAvLyBDdXN0b20gU2VsZWN0IERPTSB0cmVlIGNyZWF0aW9uXG4gIC8vXG5cbiAgLy8gQ3JlYXRlcyB0aGUgY29udGFpbmVyL3dyYXBwZXJcbiAgY29udGFpbmVyID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XG4gIGNvbnRhaW5lci5jbGFzc0xpc3QuYWRkKGJ1aWxkZXJQYXJhbXMuY29udGFpbmVyQ2xhc3MsIGNvbnRhaW5lckNsYXNzKTtcblxuICAvLyBDcmVhdGVzIHRoZSBvcGVuZXJcbiAgb3BlbmVyID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnc3BhbicpO1xuICBvcGVuZXIuY2xhc3NOYW1lID0gYnVpbGRlclBhcmFtcy5vcGVuZXJDbGFzcztcbiAgb3BlbmVyLnNldEF0dHJpYnV0ZSgncm9sZScsICdjb21ib2JveCcpO1xuICBvcGVuZXIuc2V0QXR0cmlidXRlKCdhcmlhLWF1dG9jb21wbGV0ZScsICdsaXN0Jyk7XG4gIG9wZW5lci5zZXRBdHRyaWJ1dGUoJ2FyaWEtZXhwYW5kZWQnLCAnZmFsc2UnKTtcbiAgb3BlbmVyLmlubmVySFRNTCA9ICc8c3Bhbj5cXG4gICAnICsgKHNlbGVjdC5zZWxlY3RlZEluZGV4ICE9PSAtMSA/IHNlbGVjdC5vcHRpb25zW3NlbGVjdC5zZWxlY3RlZEluZGV4XS50ZXh0IDogJycpICsgJ1xcbiAgIDwvc3Bhbj4nO1xuXG4gIC8vIENyZWF0ZXMgdGhlIHBhbmVsXG4gIC8vIGFuZCBpbmplY3RzIHRoZSBtYXJrdXAgb2YgdGhlIHNlbGVjdCBpbnNpZGVcbiAgLy8gd2l0aCBzb21lIHRhZyBhbmQgYXR0cmlidXRlcyByZXBsYWNlbWVudFxuICBwYW5lbCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xuICAvLyBDcmVhdGUgcmFuZG9tIGlkXG4gIHZhciBwb3NzaWJsZSA9ICdBQkNERUZHSElKS0xNTk9QUVJTVFVWV1hZWmFiY2RlZmdoaWprbG1ub3BxcnN0dXZ3eHl6MDEyMzQ1Njc4OSc7XG4gIGZvciAodmFyIGkgPSAwOyBpIDwgNTsgaSsrKSB7XG4gICAgdUlkICs9IHBvc3NpYmxlLmNoYXJBdChNYXRoLmZsb29yKE1hdGgucmFuZG9tKCkgKiBwb3NzaWJsZS5sZW5ndGgpKTtcbiAgfVxuICBwYW5lbC5pZCA9IGNvbnRhaW5lckNsYXNzICsgJy0nICsgdUlkICsgJy1wYW5lbCc7XG4gIHBhbmVsLmNsYXNzTmFtZSA9IGJ1aWxkZXJQYXJhbXMucGFuZWxDbGFzcztcbiAgcGFuZWwuc2V0QXR0cmlidXRlKCdyb2xlJywgJ2xpc3Rib3gnKTtcbiAgb3BlbmVyLnNldEF0dHJpYnV0ZSgnYXJpYS1vd25zJywgcGFuZWwuaWQpO1xuXG4gIF9hcHBlbmQoc2VsZWN0LmNoaWxkcmVuLCBmYWxzZSk7XG5cbiAgLy8gSW5qZWN0cyB0aGUgY29udGFpbmVyIGluIHRoZSBvcmlnaW5hbCBET00gcG9zaXRpb24gb2YgdGhlIHNlbGVjdFxuICBjb250YWluZXIuYXBwZW5kQ2hpbGQob3BlbmVyKTtcbiAgc2VsZWN0LnBhcmVudE5vZGUucmVwbGFjZUNoaWxkKGNvbnRhaW5lciwgc2VsZWN0KTtcbiAgY29udGFpbmVyLmFwcGVuZENoaWxkKHNlbGVjdCk7XG4gIGNvbnRhaW5lci5hcHBlbmRDaGlsZChwYW5lbCk7XG5cbiAgLy8gQVJJQSBsYWJlbGxlZGJ5IC0gbGFiZWxcbiAgaWYgKGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJ2xhYmVsW2Zvcj1cIicgKyBzZWxlY3QuaWQgKyAnXCJdJykpIHtcbiAgICBjdXJyTGFiZWwgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCdsYWJlbFtmb3I9XCInICsgc2VsZWN0LmlkICsgJ1wiXScpO1xuICB9IGVsc2UgaWYgKGNvbnRhaW5lci5wYXJlbnROb2RlLnRhZ05hbWUudG9VcHBlckNhc2UoKSA9PT0gJ0xBQkVMJykge1xuICAgIGN1cnJMYWJlbCA9IGNvbnRhaW5lci5wYXJlbnROb2RlO1xuICB9XG4gIGlmICh0eXBlb2YgY3VyckxhYmVsICE9PSAndW5kZWZpbmVkJykge1xuICAgIGN1cnJMYWJlbC5zZXRBdHRyaWJ1dGUoJ2lkJywgY29udGFpbmVyQ2xhc3MgKyAnLScgKyB1SWQgKyAnLWxhYmVsJyk7XG4gICAgb3BlbmVyLnNldEF0dHJpYnV0ZSgnYXJpYS1sYWJlbGxlZGJ5JywgY29udGFpbmVyQ2xhc3MgKyAnLScgKyB1SWQgKyAnLWxhYmVsJyk7XG4gIH1cblxuICAvLyBFdmVudCBJbml0XG4gIGlmIChzZWxlY3QuZGlzYWJsZWQpIHtcbiAgICBjb250YWluZXIuY2xhc3NMaXN0LmFkZChidWlsZGVyUGFyYW1zLmlzRGlzYWJsZWRDbGFzcyk7XG4gIH0gZWxzZSB7XG4gICAgb3BlbmVyLnNldEF0dHJpYnV0ZSgndGFiaW5kZXgnLCAnMCcpO1xuICAgIHNlbGVjdC5zZXRBdHRyaWJ1dGUoJ3RhYmluZGV4JywgJy0xJyk7XG4gICAgYWRkRXZlbnRzKCk7XG4gIH1cblxuICAvLyBTdG9yZXMgdGhlIHBsdWdpbiBwdWJsaWMgZXhwb3NlZCBtZXRob2RzIGFuZCBwcm9wZXJ0aWVzLCBkaXJlY3RseSBpbiB0aGUgY29udGFpbmVyIEhUTUxFbGVtZW50XG4gIGNvbnRhaW5lci5jdXN0b21TZWxlY3QgPSB7XG4gICAgZ2V0IHBsdWdpbk9wdGlvbnMoKSB7XG4gICAgICByZXR1cm4gYnVpbGRlclBhcmFtcztcbiAgICB9LFxuICAgIGdldCBvcGVuKCkge1xuICAgICAgcmV0dXJuIGlzT3BlbjtcbiAgICB9LFxuICAgIHNldCBvcGVuKGJvb2wpIHtcbiAgICAgIG9wZW4oYm9vbCk7XG4gICAgfSxcbiAgICBnZXQgZGlzYWJsZWQoKSB7XG4gICAgICByZXR1cm4gc2VsZWN0LmRpc2FibGVkO1xuICAgIH0sXG4gICAgc2V0IGRpc2FibGVkKGJvb2wpIHtcbiAgICAgIGRpc2FibGVkKGJvb2wpO1xuICAgIH0sXG4gICAgZ2V0IHZhbHVlKCkge1xuICAgICAgcmV0dXJuIHNlbGVjdC52YWx1ZTtcbiAgICB9LFxuICAgIHNldCB2YWx1ZSh2YWwpIHtcbiAgICAgIHNldFZhbHVlKHZhbCk7XG4gICAgfSxcbiAgICBhcHBlbmQ6IGZ1bmN0aW9uIGFwcGVuZChub2RlLCB0YXJnZXQpIHtcbiAgICAgIHJldHVybiBfYXBwZW5kKG5vZGUsIHRydWUsIHRhcmdldCk7XG4gICAgfSxcbiAgICBpbnNlcnRCZWZvcmU6IGZ1bmN0aW9uIGluc2VydEJlZm9yZShub2RlLCB0YXJnZXQpIHtcbiAgICAgIHJldHVybiBfaW5zZXJ0QmVmb3JlKG5vZGUsIHRhcmdldCk7XG4gICAgfSxcbiAgICByZW1vdmU6IHJlbW92ZSxcbiAgICBlbXB0eTogZW1wdHksXG4gICAgZGVzdHJveTogZGVzdHJveSxcbiAgICBvcGVuZXI6IG9wZW5lcixcbiAgICBzZWxlY3Q6IHNlbGVjdCxcbiAgICBwYW5lbDogcGFuZWwsXG4gICAgY29udGFpbmVyOiBjb250YWluZXJcbiAgfTtcblxuICAvLyBTdG9yZXMgdGhlIHBsdWdpbiBkaXJlY3RseSBpbiB0aGUgb3JpZ2luYWwgc2VsZWN0XG4gIHNlbGVjdC5jdXN0b21TZWxlY3QgPSBjb250YWluZXIuY3VzdG9tU2VsZWN0O1xuXG4gIC8vIFJldHVybnMgdGhlIHBsdWdpbiBpbnN0YW5jZSwgd2l0aCB0aGUgcHVibGljIGV4cG9zZWQgbWV0aG9kcyBhbmQgcHJvcGVydGllc1xuICByZXR1cm4gY29udGFpbmVyLmN1c3RvbVNlbGVjdDtcbn1cblxuZnVuY3Rpb24gY3VzdG9tU2VsZWN0KGVsZW1lbnQsIGN1c3RvbVBhcmFtcykge1xuICAvLyBPdmVycmlkZXMgdGhlIGRlZmF1bHQgb3B0aW9ucyB3aXRoIHRoZSBvbmVzIHByb3ZpZGVkIGJ5IHRoZSB1c2VyXG4gIHZhciBub2RlTGlzdCA9IFtdO1xuICB2YXIgc2VsZWN0cyA9IFtdO1xuXG4gIHJldHVybiBmdW5jdGlvbiBpbml0KCkge1xuICAgIC8vIFRoZSBwbHVnaW4gaXMgY2FsbGVkIG9uIGEgc2luZ2xlIEhUTUxFbGVtZW50XG4gICAgaWYgKGVsZW1lbnQgJiYgZWxlbWVudCBpbnN0YW5jZW9mIEhUTUxFbGVtZW50ICYmIGVsZW1lbnQudGFnTmFtZS50b1VwcGVyQ2FzZSgpID09PSAnU0VMRUNUJykge1xuICAgICAgbm9kZUxpc3QucHVzaChlbGVtZW50KTtcbiAgICAgIC8vIFRoZSBwbHVnaW4gaXMgY2FsbGVkIG9uIGEgc2VsZWN0b3JcbiAgICB9IGVsc2UgaWYgKGVsZW1lbnQgJiYgdHlwZW9mIGVsZW1lbnQgPT09ICdzdHJpbmcnKSB7XG4gICAgICB2YXIgZWxlbWVudHNMaXN0ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbChlbGVtZW50KTtcbiAgICAgIGZvciAodmFyIGkgPSAwLCBsID0gZWxlbWVudHNMaXN0Lmxlbmd0aDsgaSA8IGw7ICsraSkge1xuICAgICAgICBpZiAoZWxlbWVudHNMaXN0W2ldIGluc3RhbmNlb2YgSFRNTEVsZW1lbnQgJiYgZWxlbWVudHNMaXN0W2ldLnRhZ05hbWUudG9VcHBlckNhc2UoKSA9PT0gJ1NFTEVDVCcpIHtcbiAgICAgICAgICBub2RlTGlzdC5wdXNoKGVsZW1lbnRzTGlzdFtpXSk7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICAgIC8vIFRoZSBwbHVnaW4gaXMgY2FsbGVkIG9uIGFueSBIVE1MRWxlbWVudHMgbGlzdCAoTm9kZUxpc3QsIEhUTUxDb2xsZWN0aW9uLCBBcnJheSwgZXRjLilcbiAgICB9IGVsc2UgaWYgKGVsZW1lbnQgJiYgZWxlbWVudC5sZW5ndGgpIHtcbiAgICAgIGZvciAodmFyIF9pMyA9IDAsIF9sMyA9IGVsZW1lbnQubGVuZ3RoOyBfaTMgPCBfbDM7ICsrX2kzKSB7XG4gICAgICAgIGlmIChlbGVtZW50W19pM10gaW5zdGFuY2VvZiBIVE1MRWxlbWVudCAmJiBlbGVtZW50W19pM10udGFnTmFtZS50b1VwcGVyQ2FzZSgpID09PSAnU0VMRUNUJykge1xuICAgICAgICAgIG5vZGVMaXN0LnB1c2goZWxlbWVudFtfaTNdKTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cblxuICAgIC8vIExhdW5jaGVzIHRoZSBwbHVnaW4gb3ZlciBldmVyeSBIVE1MRWxlbWVudFxuICAgIC8vIEFuZCBzdG9yZXMgZXZlcnkgcGx1Z2luIGluc3RhbmNlXG4gICAgZm9yICh2YXIgX2k0ID0gMCwgX2w0ID0gbm9kZUxpc3QubGVuZ3RoOyBfaTQgPCBfbDQ7ICsrX2k0KSB7XG4gICAgICBzZWxlY3RzLnB1c2goYnVpbGRlcihub2RlTGlzdFtfaTRdLCBfZXh0ZW5kcyh7fSwgZGVmYXVsdFBhcmFtcywgY3VzdG9tUGFyYW1zKSkpO1xuICAgIH1cblxuICAgIC8vIFJldHVybnMgYWxsIHBsdWdpbiBpbnN0YW5jZXNcbiAgICByZXR1cm4gc2VsZWN0cztcbiAgfSgpO1xufVxuXG4vLyMgc291cmNlTWFwcGluZ1VSTD1pbmRleC5qcy5tYXAiLCJleHBvcnQgZGVmYXVsdCBzZWxlY3RvciA9PiB7XHJcbiAgY29uc3QgYWNjb3JkaW9uID0gc2VsZWN0b3IgPyBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKHNlbGVjdG9yKSA6IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5hY2NvcmRpb24nKVxyXG5cclxuICBjb25zdCBhY2NvcmRpb25JdGVtcyA9IGFjY29yZGlvbi5xdWVyeVNlbGVjdG9yQWxsKCcuYWNjb3JkaW9uX19pdGVtJylcclxuXHJcbiAgYWNjb3JkaW9uSXRlbXMuZm9yRWFjaChpdGVtID0+IHtcclxuICAgIGl0ZW0uYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCAoZSkgPT4ge1xyXG5cclxuICAgICAgaWYgKGl0ZW0uY2xhc3NMaXN0LmNvbnRhaW5zKCdhY3RpdmUnKSkge1xyXG4gICAgICAgIGl0ZW0uY2xhc3NMaXN0LnJlbW92ZSgnYWN0aXZlJylcclxuICAgICAgICByZXR1cm5cclxuICAgICAgfVxyXG5cclxuICAgICAgYWNjb3JkaW9uSXRlbXMuZm9yRWFjaChpdGVtID0+IGl0ZW0uY2xhc3NMaXN0LnJlbW92ZSgnYWN0aXZlJykpXHJcbiAgICAgIGl0ZW0uY2xhc3NMaXN0LmFkZCgnYWN0aXZlJylcclxuICAgIH0pXHJcbiAgfSlcclxuXHJcbn0iLCIvLyBvbmUtbGV2ZWwgY2hlY2tib3ggdHJlZVxyXG5cclxuZXhwb3J0IGRlZmF1bHQgKG1haW5JbnB1dCwgY2hpbGRJbnB1dHNDb250YWluZXIpID0+IHtcclxuXHJcbiAgY29uc3QgY2hpbGRJbnB1dHNOb2RlTGlzdCA9IGNoaWxkSW5wdXRzQ29udGFpbmVyLnF1ZXJ5U2VsZWN0b3JBbGwoJ2lucHV0W3R5cGU9Y2hlY2tib3hdJylcclxuXHJcbiAgLy8gc2V0dXBcclxuXHJcbiAgLy8gY2hlY2svdW5jaGVjayBhbGwgdHJlZVxyXG4gIC8vIGFjY29yZFRyZWUobWFpbklucHV0LCBjaGlsZElucHV0c05vZGVMaXN0KVxyXG4gIGNoYW5nZVN0YXRlKG1haW5JbnB1dCwgY2hpbGRJbnB1dHNOb2RlTGlzdClcclxuICAvLyBcclxuXHJcbiAgY2hpbGRJbnB1dHNDb250YWluZXIuYWRkRXZlbnRMaXN0ZW5lcignY2hhbmdlJywgKCkgPT4gY2hhbmdlU3RhdGUobWFpbklucHV0LCBjaGlsZElucHV0c05vZGVMaXN0KSlcclxuXHJcbiAgLy8gY2hlY2svdW5jaGVjayBhbGwgdHJlZVxyXG4gIG1haW5JbnB1dC5hZGRFdmVudExpc3RlbmVyKCdjaGFuZ2UnLCAoKSA9PiBhY2NvcmRUcmVlKG1haW5JbnB1dCwgY2hpbGRJbnB1dHNOb2RlTGlzdCkpXHJcbn1cclxuXHJcbmZ1bmN0aW9uIGFjY29yZFRyZWUocGFyZW50LCBjaGlsZHJlbikge1xyXG4gIGNoaWxkcmVuLmZvckVhY2goaW5wdXQgPT4gaW5wdXQuY2hlY2tlZCA9IHBhcmVudC5jaGVja2VkKVxyXG59XHJcblxyXG5mdW5jdGlvbiBjaGFuZ2VTdGF0ZShwYXJlbnQsIGNoaWxkcmVuKSB7XHJcbiAgY29uc3QgY2hlY2tMaXN0ID0gQXJyYXkuZnJvbShjaGlsZHJlbikubWFwKGlucHV0ID0+IGlucHV0LmNoZWNrZWQpXHJcbiAgY29uc3Qgc29tZSA9IGNoZWNrTGlzdC5zb21lKEJvb2xlYW4pXHJcbiAgY29uc3QgZXZlcnkgPSBjaGVja0xpc3QuZXZlcnkoQm9vbGVhbilcclxuICBwYXJlbnQuY2hlY2tlZCA9IGV2ZXJ5XHJcbiAgcGFyZW50LmluZGV0ZXJtaW5hdGUgPSBzb21lICYmIHNvbWUgIT09IGV2ZXJ5XHJcbn1cclxuIiwiZXhwb3J0IGRlZmF1bHQgKGl0ZW0sIGNiKSA9PiB7XHJcbiAgd2luZG93LmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgZSA9PiB7XHJcbiAgICBpZiAoIShpdGVtLmNvbnRhaW5zKGUudGFyZ2V0KSB8fCBlLnRhcmdldCA9PT0gaXRlbSkpIHtcclxuICAgICAgY2IoKVxyXG4gICAgfVxyXG4gIH0pXHJcbn0iLCJleHBvcnQgZGVmYXVsdCB7XHJcbiAgbW9kYWxPcGVuOiBuZXcgRXZlbnQoJ21vZGFsT3BlbicsIHtidWJibGVzOiB0cnVlfSksXHJcbiAgbW9kYWxDbG9zZTogbmV3IEV2ZW50KCdtb2RhbENsb3NlJywge2J1YmJsZXM6IHRydWV9KVxyXG59IiwiZXhwb3J0IGRlZmF1bHQgaW5wdXQgPT4ge1xyXG4gIGlucHV0LmFkZEV2ZW50TGlzdGVuZXIoJ2tleXByZXNzJywgZnVuY3Rpb24oZSkge1xyXG4gICAgaWYoZS5rZXlDb2RlIDwgNDcgfHwgZS5rZXlDb2RlID4gNTcpIHtcclxuICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xyXG4gICAgfVxyXG4gICAgXHJcbiAgICBjb25zdCBsZW4gPSBpbnB1dC52YWx1ZS5sZW5ndGg7XHJcbiAgICBcclxuICAgIFxyXG4gICAgaWYobGVuICE9PSAxIHx8IGxlbiAhPT0gMykge1xyXG4gICAgICBpZihlLmtleUNvZGUgPT0gNDcpIHtcclxuICAgICAgICBlLnByZXZlbnREZWZhdWx0KCk7XHJcbiAgICAgIH1cclxuICAgIH1cclxuICAgIFxyXG4gICAgaWYobGVuID09PSAyKSB7XHJcbiAgICAgIGlucHV0LnZhbHVlICs9ICcuJztcclxuICAgIH1cclxuXHJcbiAgICBpZihsZW4gPT09IDUpIHtcclxuICAgICAgaW5wdXQudmFsdWUgKz0gJy4nO1xyXG4gICAgfVxyXG5cclxuICAgIGlmKGxlbiA+IDkpIGUucHJldmVudERlZmF1bHQoKVxyXG4gIH0pO1xyXG59OyIsImV4cG9ydCBkZWZhdWx0IHNlbGVjdG9yID0+IHtcclxuICBjb25zdCB0YWJsZSA9IHNlbGVjdG9yID8gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihzZWxlY3RvcikgOiBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcudGFibGUnKVxyXG5cclxuICBjb25zdCBjYkNvbGxlY3Rpb24gPSB0YWJsZS5xdWVyeVNlbGVjdG9yQWxsKCcuY2InKVxyXG4gIGNvbnN0IG1haW5DYiA9IGNiQ29sbGVjdGlvblswXVxyXG5cclxuICBcclxuICBpZiAoY2JDb2xsZWN0aW9uLmxlbmd0aCkge1xyXG4gICAgICBcclxuICAgIGNiQ29sbGVjdGlvbi5mb3JFYWNoKGNiID0+IHtcclxuICAgICAgY29uc3QgaW5wdXQgPSBjYi5xdWVyeVNlbGVjdG9yKCdpbnB1dFt0eXBlPWNoZWNrYm94XScpXHJcbiAgICAgIGNvbnN0IHBhcmVudENlbGwgPSBjYi5wYXJlbnRFbGVtZW50XHJcbiAgICAgIC8vIGlmIHRhYmxlIGNlbGwgaGFzIGNsYXNzIC5kaXNhYmxlZFxyXG4gICAgICBpZiAocGFyZW50Q2VsbC5jbGFzc0xpc3QuY29udGFpbnMoJ2Rpc2FibGVkJykpIGlucHV0LmRpc2FibGVkID0gdHJ1ZVxyXG4gICAgICAvLyBpZiBjaGVja2JveCBkaXNhYmxlZFxyXG4gICAgICBpZihpbnB1dC5kaXNhYmxlZCkgcGFyZW50Q2VsbC5jbGFzc0xpc3QuYWRkKCdkaXNhYmxlZCcpXHJcbiAgICB9KVxyXG4gICAgXHJcbiAgICBpZihtYWluQ2IucXVlcnlTZWxlY3RvcignaW5wdXRbdHlwZT1jaGVja2JveF0nKS5kaXNhYmxlZCB8fCBtYWluQ2IucGFyZW50RWxlbWVudC5jbGFzc0xpc3QuY29udGFpbnMoJ2Rpc2FibGVkJykpIHtcclxuICAgICAgY2JDb2xsZWN0aW9uLmZvckVhY2goY2IgPT4ge1xyXG4gICAgICAgIGNvbnN0IGlucHV0ID0gY2IucXVlcnlTZWxlY3RvcignaW5wdXRbdHlwZT1jaGVja2JveF0nKVxyXG4gICAgICAgIGNvbnN0IHBhcmVudENlbGwgPSBjYi5wYXJlbnRFbGVtZW50XHJcbiAgICAgICAgcGFyZW50Q2VsbC5jbGFzc0xpc3QuYWRkKCdkaXNhYmxlZCcpXHJcbiAgICAgICAgaW5wdXQuZGlzYWJsZWQgPSB0cnVlXHJcbiAgICAgIH0pXHJcbiAgICB9XHJcbiAgfVxyXG59ICIsImltcG9ydCBjbGlja091dHNpZGUgZnJvbSBcIi4vY2xpY2tPdXRzaWRlXCJcclxuXHJcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIERyb3Bkb3duIHtcclxuICBjb25zdHJ1Y3RvcihzZWxlY3RvciA9ICcnLCBjb25maWcgPSB7fSkge1xyXG4gICAgdGhpcy5kcm9wZG93biA9IHNlbGVjdG9yID8gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihzZWxlY3RvcikgOiBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuZGQnKVxyXG4gICAgdGhpcy5kaXNhYmxlZCA9IGZhbHNlXHJcbiAgICB0aGlzLmluaXQoY29uZmlnKVxyXG4gIH1cclxuXHJcbiAgb3BlbigpIHtcclxuICAgIHRoaXMuZHJvcGRvd24uY2xhc3NMaXN0LmFkZCgnYWN0aXZlJylcclxuICB9XHJcblxyXG4gIGNsb3NlKCkge1xyXG4gICAgdGhpcy5kcm9wZG93bi5jbGFzc0xpc3QucmVtb3ZlKCdhY3RpdmUnKVxyXG4gIH1cclxuXHJcbiAgaW5pdChjb25maWcpIHtcclxuICAgIHRoaXMudHJpZ2dlciA9IHRoaXMuZHJvcGRvd24ucXVlcnlTZWxlY3RvcignOnNjb3BlIGJ1dHRvbicpXHJcbiAgICB0aGlzLm9wdGlvbnMgPSB0aGlzLmRyb3Bkb3duLnF1ZXJ5U2VsZWN0b3JBbGwoJy5wYW5lbCA+IConKVxyXG5cclxuICAgIHRoaXMudHJpZ2dlci5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIChlKSA9PiB7XHJcbiAgICAgIC8vIHJlbW92ZSBjb25kaXRpb24gaWYgaGFyZCBkaXNhYmxlIHJ1bnNcclxuICAgICAgaWYgKCF0aGlzLmRpc2FibGVkKSB0aGlzLmRyb3Bkb3duLmNsYXNzTGlzdC50b2dnbGUoJ2FjdGl2ZScpXHJcbiAgICB9KVxyXG5cclxuICAgIGlmKGNvbmZpZy5jbG9zZU9uT3B0aW9uQ2xpY2spIHtcclxuICAgICAgdGhpcy5vcHRpb25zLmZvckVhY2goaXRlbSA9PiB7XHJcbiAgICAgICAgaWYgKCFpdGVtLmNsYXNzTGlzdC5jb250YWlucygnZGlzYWJsZWQnKSkge1xyXG4gICAgICAgICAgaXRlbS5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsICgpID0+IHRoaXMuY2xvc2UoKSlcclxuICAgICAgICB9XHJcbiAgICAgIH0pXHJcbiAgICB9XHJcblxyXG4gICAgaWYgKGNvbmZpZy5vbkNsaWNrT3V0c2lkZSkge1xyXG4gICAgICBjbGlja091dHNpZGUodGhpcy5kcm9wZG93biwgKCkgPT4gdGhpcy5jbG9zZSgpKVxyXG4gICAgfVxyXG4gIH1cclxuICAvLyBsaWdodCBkaXNhYmxlIHdpdGggc2ltcGtlIGZsYWcgY2hlY2tpbmdcclxuXHJcblxyXG5cclxuICBkaXNhYmxlKCkge1xyXG4gICAgLy8gaGFyZCBkaXNhYmxlIHdpdGggZGVlcCBjbG9uaW5nIGFuZCBwYXRjaGluZyBET01cclxuICAgIC8vIGNvbnN0IGNsb25lID0gdGhpcy5kcm9wZG93bi5jbG9uZU5vZGUodHJ1ZSlcclxuICAgIC8vIHRoaXMuZHJvcGRvd24ucmVwbGFjZVdpdGgoY2xvbmUpXHJcbiAgICAvLyB0aGlzLmRyb3Bkb3duID0gY2xvbmVcclxuICAgIHRoaXMuZGlzYWJsZWQgPSB0cnVlXHJcbiAgICB0aGlzLmRyb3Bkb3duLmNsYXNzTGlzdC5hZGQoJ2Rpc2FibGVkJylcclxuICB9XHJcblxyXG4gIGVuYWJsZSgpIHtcclxuICAgIHRoaXMuZGlzYWJsZWQgPSBmYWxzZVxyXG4gICAgdGhpcy5kcm9wZG93bi5jbGFzc0xpc3QucmVtb3ZlKCdkaXNhYmxlZCcpXHJcbiAgICAvLyBhZGQgaW5pdCBpZiBoYXJkIGRpc2FibGUgcnVuc1xyXG4gICAgLy8gdGhpcy5pbml0KClcclxuICB9XHJcbn0iLCJleHBvcnQge2RlZmF1bHQgYXMgZXZlbnRzfSBmcm9tICcuL2N1c3RvbUV2ZW50cydcclxuZXhwb3J0IHtkZWZhdWx0IGFzIG1lbnV9IGZyb20gJy4vbWVudSdcclxuZXhwb3J0IHtkZWZhdWx0IGFzIE1vZGFsfSBmcm9tICcuL21vZGFsJ1xyXG5leHBvcnQge2RlZmF1bHQgYXMgY2xpY2tPdXRzaWRlfSBmcm9tICcuL2NsaWNrT3V0c2lkZSdcclxuZXhwb3J0IHtkZWZhdWx0IGFzIGRhdGVNYXNrfSBmcm9tICcuL2RhdGVtYXNrJ1xyXG5leHBvcnQge2RlZmF1bHQgYXMgYWNjb3JkaW9ufSBmcm9tICcuL2FjY29yZGlvbidcclxuZXhwb3J0IHtkZWZhdWx0IGFzIHRhYnN9IGZyb20gJy4vdGFicydcclxuLy8gdmVuZG9yID09PSBjdXN0b20gc2VsZWN0XHJcbmV4cG9ydCB7ZGVmYXVsdCBhcyBzZWxlY3RpemV9IGZyb20gJy4vc2VsZWN0aXplJ1xyXG5leHBvcnQge2RlZmF1bHQgYXMgY2hlY2tib3hUcmVlfSBmcm9tICcuL2NoZWNrYm94VHJlZSdcclxuZXhwb3J0IHtkZWZhdWx0IGFzIGRpc2FibGVUYWJsZUNoZWNrYm94ZXN9IGZyb20gJy4vZGlzYWJsZVRhYmxlQ2hlY2tib3hlcydcclxuZXhwb3J0IHtkZWZhdWx0IGFzIERyb3Bkb3dufSBmcm9tICcuL2Ryb3Bkb3duJyIsImltcG9ydCB7IERyb3Bkb3duIH0gZnJvbSAndXRpbHMnXHJcblxyXG4vLyBjb25zdCBpbml0SW5uZXJEcm9wZG93biA9IGl0ZW0gPT4ge1xyXG4vLyAgIGNvbnN0IHRyaWdnZXIgPSBpdGVtLnF1ZXJ5U2VsZWN0b3IoJ2J1dHRvbicpXHJcblxyXG4vLyAgIHRyaWdnZXIuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCAoZSkgPT4ge1xyXG4vLyAgICAgZS5zdG9wUHJvcGFnYXRpb24oKVxyXG4vLyAgICAgaXRlbS5jbGFzc0xpc3QudG9nZ2xlKCdhY3RpdmUnKVxyXG4vLyAgIH0pXHJcblxyXG4vLyAgIGl0ZW0uYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCBlID0+IHtcclxuLy8gICAgIGUuc3RvcFByb3BhZ2F0aW9uKClcclxuLy8gICB9KVxyXG4vLyB9XHJcblxyXG5jb25zdCBpc0Ryb3Bkb3duID0gaXRlbSA9PiBpdGVtLmNsYXNzTGlzdC5jb250YWlucygnc3VibWVudScpXHJcblxyXG5leHBvcnQgZGVmYXVsdCAoKSA9PiB7XHJcbiAgY29uc3QgY29sbGVjdGlvbiA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoJy5tZW51LWl0ZW0nKVxyXG5cclxuICBjb2xsZWN0aW9uLmZvckVhY2goaXRlbSA9PiB7XHJcblxyXG4gICAgaWYgKCFpc0Ryb3Bkb3duKGl0ZW0pKSB7XHJcbiAgICAgIGl0ZW0uYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCAoKSA9PiB7XHJcbiAgICAgICAgY29sbGVjdGlvbi5mb3JFYWNoKGl0ZW0gPT4ge1xyXG4gICAgICAgICAgaWYgKCFpc0Ryb3Bkb3duKGl0ZW0pKVxyXG4gICAgICAgICAgICBpdGVtLmNsYXNzTGlzdC5yZW1vdmUoJ2FjdGl2ZScpXHJcbiAgICAgICAgfSlcclxuICAgICAgICBpdGVtLmNsYXNzTGlzdC5hZGQoJ2FjdGl2ZScpXHJcbiAgICAgIH0pXHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICBjb25zdCBzdWJtZW51ID0gbmV3IERyb3Bkb3duKCcuc3VibWVudScsIHtcclxuICAgICAgICBjbG9zZU9uT3B0aW9uQ2xpY2s6IGZhbHNlLFxyXG4gICAgICAgIG9uQ0xpY2tPdXRzaWRlOiBmYWxzZVxyXG4gICAgICB9KVxyXG4gICAgICAvLyBzdWJtZW51LnRyaWdnZXIuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCAoZSkgPT4ge1xyXG4gICAgICAvLyAgIGUuc3RvcFByb3BhZ2F0aW9uKClcclxuICAgICAgLy8gfSlcclxuXHJcbiAgICAgIC8vIHN1Ym1lbnUuZHJvcGRvd24uYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCBlID0+IHtcclxuICAgICAgLy8gICBlLnN0b3BQcm9wYWdhdGlvbigpXHJcbiAgICAgIC8vIH0pXHJcbiAgICB9XHJcbiAgfSlcclxufSIsImltcG9ydCB7IGV2ZW50cyB9IGZyb20gJ3V0aWxzJ1xyXG5jb25zdCB7IG1vZGFsQ2xvc2UsIG1vZGFsT3BlbiB9ID0gZXZlbnRzXHJcblxyXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBNb2RhbCB7XHJcbiAgY29uc3RydWN0b3Ioc2VsZWN0b3IgPSAnJykge1xyXG4gICAgaWYgKHNlbGVjdG9yKSB7XHJcbiAgICAgIHRoaXMubW9kYWwgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKHNlbGVjdG9yKVxyXG4gICAgfSBlbHNlIHtcclxuICAgICAgdGhpcy5tb2RhbCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5tb2RhbCcpXHJcbiAgICB9XHJcbiAgICAvLyBpbml0IG1vZGFsXHJcbiAgICB0aGlzLmRpYWxvZyA9IHRoaXMubW9kYWwucXVlcnlTZWxlY3RvcignLm1vZGFsX19kaWFsb2cnKVxyXG4gICAgdGhpcy5jbG9zZUJ0biA9IHRoaXMubW9kYWwucXVlcnlTZWxlY3RvcignLm1vZGFsX19jbG9zZScpXHJcblxyXG4gICAgLy8gb3ZlcmxheSBjbGlja1xyXG4gICAgaWYgKHRoaXMuZGlhbG9nKSB7XHJcbiAgICAgIHRoaXMubW9kYWwuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCBlID0+IHtcclxuICAgICAgICBpZiAoZS50YXJnZXQgPT09IHRoaXMubW9kYWwpIHRoaXMuY2xvc2UoKVxyXG4gICAgICB9KVxyXG4gICAgfVxyXG5cclxuICAgIHRoaXMuY2xvc2VCdG4uYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCAoKSA9PiB0aGlzLmNsb3NlKCkpXHJcbiAgfVxyXG5cclxuICBvcGVuKCkge1xyXG4gICAgLy8gdGhpcy5tb2RhbC5wYXJlbnRFbGVtZW50LnN0eWxlID0gJ292ZXJmbG93OiBoaWRkZW4nXHJcbiAgICB0aGlzLm1vZGFsLmNsYXNzTGlzdC5hZGQoJ29wZW4nKVxyXG4gICAgdGhpcy5tb2RhbC5kaXNwYXRjaEV2ZW50KG1vZGFsT3BlbilcclxuICB9XHJcblxyXG4gIGNsb3NlKCkge1xyXG4gICAgLy8gdGhpcy5tb2RhbC5wYXJlbnRFbGVtZW50LnN0eWxlID0gJydcclxuICAgIHRoaXMubW9kYWwuY2xhc3NMaXN0LnJlbW92ZSgnb3BlbicpXHJcbiAgICB0aGlzLm1vZGFsLmRpc3BhdGNoRXZlbnQobW9kYWxDbG9zZSlcclxuICB9XHJcbn0iLCJpbXBvcnQgY3VzdG9tU2VsZWN0IGZyb20gJ2N1c3RvbS1zZWxlY3QnXHJcblxyXG5jb25zdCBjb25maWcgPSB7XHJcbiAgY29udGFpbmVyQ2xhc3M6ICdqcy1zZWxlY3QnLFxyXG4gIG9wZW5lckNsYXNzOiAnanMtc2VsZWN0X19vcGVuZXIgcGx1ZycsXHJcbiAgcGFuZWxDbGFzczogJ2pzLXNlbGVjdF9fcGFuZWwnLFxyXG4gIG9wdGlvbkNsYXNzOiAnanMtc2VsZWN0X19vcHRpb24nLFxyXG4gIC8vIG9wdGdyb3VwQ2xhc3M6ICdzZWxlY3RfX29wdGdyb3VwJyxcclxuICBpc1NlbGVjdGVkQ2xhc3M6ICdzZWxlY3RlZCcsXHJcbiAgaGFzRm9jdXNDbGFzczogJ2ZvY3VzJyxcclxuICBpc0Rpc2FibGVkQ2xhc3M6ICdkaXNhYmxlZCcsXHJcbiAgaXNPcGVuQ2xhc3M6ICdvcGVuJ1xyXG59XHJcblxyXG5mdW5jdGlvbiBhZGRMaXN0ZW5lcnMoc2VsZWN0LCBpLCBzZWxlY3RpemVkKSB7XHJcblxyXG4gIHNlbGVjdC5vcGVuZXIuYWRkRXZlbnRMaXN0ZW5lcignZm9jdXMnLCAoZSkgPT4ge1xyXG4gICAgaWYgKHNlbGVjdGl6ZWQpIHtcclxuICAgICAgc2VsZWN0aXplZC5mb3JFYWNoKChzZWxlY3QpID0+IHtcclxuICAgICAgICBzZWxlY3Qub3BlbiA9IGZhbHNlXHJcbiAgICAgIH0pXHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICBzZWxlY3Qub3BlbiA9IGZhbHNlXHJcbiAgICB9XHJcbiAgfSlcclxuXHJcbiAgc2VsZWN0LnNlbGVjdC5hZGRFdmVudExpc3RlbmVyKCdjaGFuZ2UnLCAoZSkgPT4ge1xyXG4gICAgaWYgKGUudGFyZ2V0LnZhbHVlKSB7XHJcbiAgICAgIHNlbGVjdC5vcGVuZXIuY2xhc3NMaXN0LnJlbW92ZSgncGx1ZycpXHJcbiAgICB9XHJcbiAgfSlcclxufVxyXG5cclxuZXhwb3J0IGRlZmF1bHQgbm9kZSA9PiB7XHJcbiAgY29uc3Qgc2VsZWN0aXplZCA9IGN1c3RvbVNlbGVjdChub2RlLCBjb25maWcpXHJcblxyXG4gIGlmIChzZWxlY3RpemVkIGluc3RhbmNlb2YgQXJyYXkpXHJcbiAgICBzZWxlY3RpemVkLmZvckVhY2goYWRkTGlzdGVuZXJzKVxyXG4gIGVsc2VcclxuICAgIGFkZExpc3RlbmVycyhzZWxlY3RpemVkKVxyXG5cclxuICByZXR1cm4gc2VsZWN0aXplZFxyXG59IiwiZXhwb3J0IGRlZmF1bHQgc2VsZWN0b3IgPT4ge1xyXG4gIGNvbnN0IHRhYnMgPSBzZWxlY3RvciA/IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3Ioc2VsZWN0b3IpIDogZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLnRhYnMnKVxyXG5cclxuICBjb25zdCB0YWJzSXRlbXMgPSB0YWJzLnF1ZXJ5U2VsZWN0b3JBbGwoJy50YWJzX19pdGVtJylcclxuXHJcbiAgdGFic0l0ZW1zLmZvckVhY2goaXRlbSA9PiB7XHJcbiAgICBpdGVtLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgKGUpID0+IHtcclxuICAgICAgaWYgKGUudGFyZ2V0LnRhZ05hbWUgPT09ICdBJykge1xyXG4gICAgICAgIGUucHJldmVudERlZmF1bHQoKVxyXG4gICAgICB9XHJcblxyXG4gICAgICB0YWJzSXRlbXMuZm9yRWFjaChpdGVtID0+IGl0ZW0uY2xhc3NMaXN0LnJlbW92ZSgnYWN0aXZlJykpXHJcbiAgICAgIGl0ZW0uY2xhc3NMaXN0LmFkZCgnYWN0aXZlJylcclxuICAgIH0pXHJcbiAgfSlcclxuXHJcbiAgcmV0dXJuIHRhYnNcclxufSIsIi8vIFRoZSBtb2R1bGUgY2FjaGVcbnZhciBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX18gPSB7fTtcblxuLy8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbmZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG5cdHZhciBjYWNoZWRNb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdO1xuXHRpZiAoY2FjaGVkTW9kdWxlICE9PSB1bmRlZmluZWQpIHtcblx0XHRyZXR1cm4gY2FjaGVkTW9kdWxlLmV4cG9ydHM7XG5cdH1cblx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcblx0dmFyIG1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF0gPSB7XG5cdFx0Ly8gbm8gbW9kdWxlLmlkIG5lZWRlZFxuXHRcdC8vIG5vIG1vZHVsZS5sb2FkZWQgbmVlZGVkXG5cdFx0ZXhwb3J0czoge31cblx0fTtcblxuXHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cblx0X193ZWJwYWNrX21vZHVsZXNfX1ttb2R1bGVJZF0obW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cblx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcblx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xufVxuXG4vLyBleHBvc2UgdGhlIG1vZHVsZXMgb2JqZWN0IChfX3dlYnBhY2tfbW9kdWxlc19fKVxuX193ZWJwYWNrX3JlcXVpcmVfXy5tID0gX193ZWJwYWNrX21vZHVsZXNfXztcblxuIiwidmFyIGRlZmVycmVkID0gW107XG5fX3dlYnBhY2tfcmVxdWlyZV9fLk8gPSAocmVzdWx0LCBjaHVua0lkcywgZm4sIHByaW9yaXR5KSA9PiB7XG5cdGlmKGNodW5rSWRzKSB7XG5cdFx0cHJpb3JpdHkgPSBwcmlvcml0eSB8fCAwO1xuXHRcdGZvcih2YXIgaSA9IGRlZmVycmVkLmxlbmd0aDsgaSA+IDAgJiYgZGVmZXJyZWRbaSAtIDFdWzJdID4gcHJpb3JpdHk7IGktLSkgZGVmZXJyZWRbaV0gPSBkZWZlcnJlZFtpIC0gMV07XG5cdFx0ZGVmZXJyZWRbaV0gPSBbY2h1bmtJZHMsIGZuLCBwcmlvcml0eV07XG5cdFx0cmV0dXJuO1xuXHR9XG5cdHZhciBub3RGdWxmaWxsZWQgPSBJbmZpbml0eTtcblx0Zm9yICh2YXIgaSA9IDA7IGkgPCBkZWZlcnJlZC5sZW5ndGg7IGkrKykge1xuXHRcdHZhciBbY2h1bmtJZHMsIGZuLCBwcmlvcml0eV0gPSBkZWZlcnJlZFtpXTtcblx0XHR2YXIgZnVsZmlsbGVkID0gdHJ1ZTtcblx0XHRmb3IgKHZhciBqID0gMDsgaiA8IGNodW5rSWRzLmxlbmd0aDsgaisrKSB7XG5cdFx0XHRpZiAoKHByaW9yaXR5ICYgMSA9PT0gMCB8fCBub3RGdWxmaWxsZWQgPj0gcHJpb3JpdHkpICYmIE9iamVjdC5rZXlzKF9fd2VicGFja19yZXF1aXJlX18uTykuZXZlcnkoKGtleSkgPT4gKF9fd2VicGFja19yZXF1aXJlX18uT1trZXldKGNodW5rSWRzW2pdKSkpKSB7XG5cdFx0XHRcdGNodW5rSWRzLnNwbGljZShqLS0sIDEpO1xuXHRcdFx0fSBlbHNlIHtcblx0XHRcdFx0ZnVsZmlsbGVkID0gZmFsc2U7XG5cdFx0XHRcdGlmKHByaW9yaXR5IDwgbm90RnVsZmlsbGVkKSBub3RGdWxmaWxsZWQgPSBwcmlvcml0eTtcblx0XHRcdH1cblx0XHR9XG5cdFx0aWYoZnVsZmlsbGVkKSB7XG5cdFx0XHRkZWZlcnJlZC5zcGxpY2UoaS0tLCAxKVxuXHRcdFx0dmFyIHIgPSBmbigpO1xuXHRcdFx0aWYgKHIgIT09IHVuZGVmaW5lZCkgcmVzdWx0ID0gcjtcblx0XHR9XG5cdH1cblx0cmV0dXJuIHJlc3VsdDtcbn07IiwiLy8gZGVmaW5lIGdldHRlciBmdW5jdGlvbnMgZm9yIGhhcm1vbnkgZXhwb3J0c1xuX193ZWJwYWNrX3JlcXVpcmVfXy5kID0gKGV4cG9ydHMsIGRlZmluaXRpb24pID0+IHtcblx0Zm9yKHZhciBrZXkgaW4gZGVmaW5pdGlvbikge1xuXHRcdGlmKF9fd2VicGFja19yZXF1aXJlX18ubyhkZWZpbml0aW9uLCBrZXkpICYmICFfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZXhwb3J0cywga2V5KSkge1xuXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIGtleSwgeyBlbnVtZXJhYmxlOiB0cnVlLCBnZXQ6IGRlZmluaXRpb25ba2V5XSB9KTtcblx0XHR9XG5cdH1cbn07IiwiX193ZWJwYWNrX3JlcXVpcmVfXy5vID0gKG9iaiwgcHJvcCkgPT4gKE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvYmosIHByb3ApKSIsIi8vIGRlZmluZSBfX2VzTW9kdWxlIG9uIGV4cG9ydHNcbl9fd2VicGFja19yZXF1aXJlX18uciA9IChleHBvcnRzKSA9PiB7XG5cdGlmKHR5cGVvZiBTeW1ib2wgIT09ICd1bmRlZmluZWQnICYmIFN5bWJvbC50b1N0cmluZ1RhZykge1xuXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBTeW1ib2wudG9TdHJpbmdUYWcsIHsgdmFsdWU6ICdNb2R1bGUnIH0pO1xuXHR9XG5cdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCAnX19lc01vZHVsZScsIHsgdmFsdWU6IHRydWUgfSk7XG59OyIsIi8vIG5vIGJhc2VVUklcblxuLy8gb2JqZWN0IHRvIHN0b3JlIGxvYWRlZCBhbmQgbG9hZGluZyBjaHVua3Ncbi8vIHVuZGVmaW5lZCA9IGNodW5rIG5vdCBsb2FkZWQsIG51bGwgPSBjaHVuayBwcmVsb2FkZWQvcHJlZmV0Y2hlZFxuLy8gW3Jlc29sdmUsIHJlamVjdCwgUHJvbWlzZV0gPSBjaHVuayBsb2FkaW5nLCAwID0gY2h1bmsgbG9hZGVkXG52YXIgaW5zdGFsbGVkQ2h1bmtzID0ge1xuXHRcInV0aWxzXCI6IDBcbn07XG5cbi8vIG5vIGNodW5rIG9uIGRlbWFuZCBsb2FkaW5nXG5cbi8vIG5vIHByZWZldGNoaW5nXG5cbi8vIG5vIHByZWxvYWRlZFxuXG4vLyBubyBITVJcblxuLy8gbm8gSE1SIG1hbmlmZXN0XG5cbl9fd2VicGFja19yZXF1aXJlX18uTy5qID0gKGNodW5rSWQpID0+IChpbnN0YWxsZWRDaHVua3NbY2h1bmtJZF0gPT09IDApO1xuXG4vLyBpbnN0YWxsIGEgSlNPTlAgY2FsbGJhY2sgZm9yIGNodW5rIGxvYWRpbmdcbnZhciB3ZWJwYWNrSnNvbnBDYWxsYmFjayA9IChwYXJlbnRDaHVua0xvYWRpbmdGdW5jdGlvbiwgZGF0YSkgPT4ge1xuXHR2YXIgW2NodW5rSWRzLCBtb3JlTW9kdWxlcywgcnVudGltZV0gPSBkYXRhO1xuXHQvLyBhZGQgXCJtb3JlTW9kdWxlc1wiIHRvIHRoZSBtb2R1bGVzIG9iamVjdCxcblx0Ly8gdGhlbiBmbGFnIGFsbCBcImNodW5rSWRzXCIgYXMgbG9hZGVkIGFuZCBmaXJlIGNhbGxiYWNrXG5cdHZhciBtb2R1bGVJZCwgY2h1bmtJZCwgaSA9IDA7XG5cdGlmKGNodW5rSWRzLnNvbWUoKGlkKSA9PiAoaW5zdGFsbGVkQ2h1bmtzW2lkXSAhPT0gMCkpKSB7XG5cdFx0Zm9yKG1vZHVsZUlkIGluIG1vcmVNb2R1bGVzKSB7XG5cdFx0XHRpZihfX3dlYnBhY2tfcmVxdWlyZV9fLm8obW9yZU1vZHVsZXMsIG1vZHVsZUlkKSkge1xuXHRcdFx0XHRfX3dlYnBhY2tfcmVxdWlyZV9fLm1bbW9kdWxlSWRdID0gbW9yZU1vZHVsZXNbbW9kdWxlSWRdO1xuXHRcdFx0fVxuXHRcdH1cblx0XHRpZihydW50aW1lKSB2YXIgcmVzdWx0ID0gcnVudGltZShfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblx0fVxuXHRpZihwYXJlbnRDaHVua0xvYWRpbmdGdW5jdGlvbikgcGFyZW50Q2h1bmtMb2FkaW5nRnVuY3Rpb24oZGF0YSk7XG5cdGZvcig7aSA8IGNodW5rSWRzLmxlbmd0aDsgaSsrKSB7XG5cdFx0Y2h1bmtJZCA9IGNodW5rSWRzW2ldO1xuXHRcdGlmKF9fd2VicGFja19yZXF1aXJlX18ubyhpbnN0YWxsZWRDaHVua3MsIGNodW5rSWQpICYmIGluc3RhbGxlZENodW5rc1tjaHVua0lkXSkge1xuXHRcdFx0aW5zdGFsbGVkQ2h1bmtzW2NodW5rSWRdWzBdKCk7XG5cdFx0fVxuXHRcdGluc3RhbGxlZENodW5rc1tjaHVua0lkXSA9IDA7XG5cdH1cblx0cmV0dXJuIF9fd2VicGFja19yZXF1aXJlX18uTyhyZXN1bHQpO1xufVxuXG52YXIgY2h1bmtMb2FkaW5nR2xvYmFsID0gc2VsZltcIndlYnBhY2tDaHVua180dHJvY2tldF9kYXNoYm9hcmRcIl0gPSBzZWxmW1wid2VicGFja0NodW5rXzR0cm9ja2V0X2Rhc2hib2FyZFwiXSB8fCBbXTtcbmNodW5rTG9hZGluZ0dsb2JhbC5mb3JFYWNoKHdlYnBhY2tKc29ucENhbGxiYWNrLmJpbmQobnVsbCwgMCkpO1xuY2h1bmtMb2FkaW5nR2xvYmFsLnB1c2ggPSB3ZWJwYWNrSnNvbnBDYWxsYmFjay5iaW5kKG51bGwsIGNodW5rTG9hZGluZ0dsb2JhbC5wdXNoLmJpbmQoY2h1bmtMb2FkaW5nR2xvYmFsKSk7IiwiIiwiLy8gc3RhcnR1cFxuLy8gTG9hZCBlbnRyeSBtb2R1bGUgYW5kIHJldHVybiBleHBvcnRzXG4vLyBUaGlzIGVudHJ5IG1vZHVsZSBpcyByZWZlcmVuY2VkIGJ5IG90aGVyIG1vZHVsZXMgc28gaXQgY2FuJ3QgYmUgaW5saW5lZFxuX193ZWJwYWNrX3JlcXVpcmVfXyhcIi4vc3JjL2pzL3V0aWxzL2FjY29yZGlvbi5qc1wiKTtcbl9fd2VicGFja19yZXF1aXJlX18oXCIuL3NyYy9qcy91dGlscy9jaGVja2JveFRyZWUuanNcIik7XG5fX3dlYnBhY2tfcmVxdWlyZV9fKFwiLi9zcmMvanMvdXRpbHMvY2xpY2tPdXRzaWRlLmpzXCIpO1xuX193ZWJwYWNrX3JlcXVpcmVfXyhcIi4vc3JjL2pzL3V0aWxzL2N1c3RvbUV2ZW50cy5qc1wiKTtcbl9fd2VicGFja19yZXF1aXJlX18oXCIuL3NyYy9qcy91dGlscy9kYXRlbWFzay5qc1wiKTtcbl9fd2VicGFja19yZXF1aXJlX18oXCIuL3NyYy9qcy91dGlscy9kaXNhYmxlVGFibGVDaGVja2JveGVzLmpzXCIpO1xuX193ZWJwYWNrX3JlcXVpcmVfXyhcIi4vc3JjL2pzL3V0aWxzL2Ryb3Bkb3duLmpzXCIpO1xuX193ZWJwYWNrX3JlcXVpcmVfXyhcIi4vc3JjL2pzL3V0aWxzL21lbnUuanNcIik7XG5fX3dlYnBhY2tfcmVxdWlyZV9fKFwiLi9zcmMvanMvdXRpbHMvbW9kYWwuanNcIik7XG5fX3dlYnBhY2tfcmVxdWlyZV9fKFwiLi9zcmMvanMvdXRpbHMvc2VsZWN0aXplLmpzXCIpO1xudmFyIF9fd2VicGFja19leHBvcnRzX18gPSBfX3dlYnBhY2tfcmVxdWlyZV9fKFwiLi9zcmMvanMvdXRpbHMvdGFicy5qc1wiKTtcbl9fd2VicGFja19leHBvcnRzX18gPSBfX3dlYnBhY2tfcmVxdWlyZV9fLk8oX193ZWJwYWNrX2V4cG9ydHNfXyk7XG4iLCIiXSwibmFtZXMiOltdLCJzb3VyY2VSb290IjoiIn0=