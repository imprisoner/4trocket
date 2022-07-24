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

    // overlay click
    if (dialog) {
      this.modal.addEventListener('click', e => {
        if(e.target === this.modal) this.close()
      })
    }

    closeBtn.addEventListener('click', () => this.close())
  }

  open() {
    console.log(this.modal)
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
  containerClass: 'js-select',
  openerClass: 'js-select__opener plug',
  panelClass: 'js-select__panel',
  optionClass: 'js-select__option',
  // optgroupClass: 'select__optgroup',
  isSelectedClass: 'selected',
  hasFocusClass: 'focused',
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
/******/ 	__webpack_require__("./src/js/utils/clickOutside.js");
/******/ 	__webpack_require__("./src/js/utils/datemask.js");
/******/ 	__webpack_require__("./src/js/utils/menu.js");
/******/ 	__webpack_require__("./src/js/utils/modal.js");
/******/ 	__webpack_require__("./src/js/utils/selectize.js");
/******/ 	var __webpack_exports__ = __webpack_require__("./src/js/utils/tabs.js");
/******/ 	__webpack_exports__ = __webpack_require__.O(__webpack_exports__);
/******/ 	
/******/ })()
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidXRpbHMuanMiLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7O0FBQUE7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxFQUFFO0FBQ0Y7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1QsUUFBUTtBQUNSO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQSxvQ0FBb0M7QUFDcEM7Ozs7Ozs7Ozs7OztBQzNDYTs7QUFFYiw4Q0FBNkM7QUFDN0M7QUFDQSxDQUFDLEVBQUM7O0FBRUYsb0RBQW9ELGdCQUFnQixzQkFBc0IsT0FBTywyQkFBMkIsMEJBQTBCLHlEQUF5RCxpQ0FBaUM7O0FBRWhQLG1DQUFtQyxpQ0FBaUMsZUFBZSxlQUFlLGdCQUFnQixvQkFBb0IsTUFBTSwwQ0FBMEMsK0JBQStCLGFBQWEscUJBQXFCLHVDQUF1QyxjQUFjLFdBQVcsWUFBWSxVQUFVLE1BQU0sMkNBQTJDLFVBQVUsc0JBQXNCLGVBQWUsMkJBQTJCLDBCQUEwQixjQUFjLDJDQUEyQyxnQ0FBZ0MsT0FBTyxtRkFBbUYsSUFBSTtBQUN6cEI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUEsa0JBQWU7O0FBRWYsbUJBQU8sQ0FBQyxrS0FBdUI7O0FBRS9CO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSx5RkFBeUYsZUFBZTtBQUN4RztBQUNBO0FBQ0EsTUFBTTtBQUNOO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxNQUFNO0FBQ047QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBLE1BQU07QUFDTjtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFFBQVE7QUFDUjtBQUNBO0FBQ0E7QUFDQSxNQUFNO0FBQ047QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxNQUFNO0FBQ047QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsTUFBTTtBQUNOO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsTUFBTTtBQUNOO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsYUFBYTs7QUFFYjtBQUNBOztBQUVBO0FBQ0EsdURBQXVELE9BQU87QUFDOUQ7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsTUFBTTtBQUNOO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLE1BQU07QUFDTjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQSwwQ0FBMEMsUUFBUTtBQUNsRDtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0EsOENBQThDLFFBQVE7QUFDdEQ7QUFDQTs7QUFFQTtBQUNBLFFBQVE7QUFDUjtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFFBQVE7QUFDUjtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsTUFBTTtBQUNOO0FBQ0EsTUFBTTtBQUNOO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0EsdUNBQXVDLE9BQU87QUFDOUM7QUFDQTtBQUNBLFVBQVU7QUFDVjtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0EsaURBQWlELFNBQVM7QUFDMUQ7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsTUFBTTtBQUNOO0FBQ0EsTUFBTTtBQUNOO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQSxNQUFNO0FBQ047QUFDQSxNQUFNO0FBQ047QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0EsK0NBQStDLE9BQU87QUFDdEQ7QUFDQTtBQUNBO0FBQ0EsNkNBQTZDLFdBQVc7QUFDeEQ7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxrQkFBa0IsT0FBTztBQUN6QjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxJQUFJO0FBQ0o7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLElBQUk7QUFDSjtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsTUFBTTtBQUNOO0FBQ0EsK0NBQStDLE9BQU87QUFDdEQ7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLE1BQU07QUFDTiw4Q0FBOEMsV0FBVztBQUN6RDtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQSw2Q0FBNkMsV0FBVztBQUN4RCxxREFBcUQ7QUFDckQ7O0FBRUE7QUFDQTtBQUNBLEdBQUc7QUFDSDs7QUFFQTs7Ozs7Ozs7Ozs7Ozs7O0FDem1CQSxpRUFBZTtBQUNmO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0wsR0FBRztBQUNIO0FBQ0E7Ozs7Ozs7Ozs7Ozs7OztBQ2xCQSxpRUFBZTtBQUNmO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsR0FBRztBQUNIOzs7Ozs7Ozs7Ozs7Ozs7QUNOQSxpRUFBZTtBQUNmO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxHQUFHO0FBQ0gsQ0FBQzs7Ozs7Ozs7Ozs7Ozs7O0FDekJEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEdBQUc7QUFDSDtBQUNBO0FBQ0E7QUFDQSxHQUFHO0FBQ0g7QUFDQTtBQUNBO0FBQ0E7QUFDQSxpRUFBZTtBQUNmO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFdBQVc7QUFDWDtBQUNBLE9BQU87QUFDUCxNQUFNO0FBQ047QUFDQTtBQUNBLEdBQUc7QUFDSDs7Ozs7Ozs7Ozs7Ozs7O0FDaENlO0FBQ2Y7QUFDQTtBQUNBO0FBQ0EsTUFBTTtBQUNOO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsT0FBTztBQUNQO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7Ozs7Ozs7Ozs7Ozs7QUM3QndDO0FBQ3hDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsT0FBTztBQUNQLE1BQU07QUFDTjtBQUNBO0FBQ0EsR0FBRztBQUNIO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxHQUFHO0FBQ0g7QUFDQTtBQUNBLGlFQUFlO0FBQ2YscUJBQXFCLHlEQUFZO0FBQ2pDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7Ozs7Ozs7Ozs7OztBQzFDQSxpRUFBZTtBQUNmO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTCxHQUFHO0FBQ0g7QUFDQTtBQUNBOzs7Ozs7VUNqQkE7VUFDQTs7VUFFQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTs7VUFFQTtVQUNBOztVQUVBO1VBQ0E7VUFDQTs7VUFFQTtVQUNBOzs7OztXQ3pCQTtXQUNBO1dBQ0E7V0FDQTtXQUNBLCtCQUErQix3Q0FBd0M7V0FDdkU7V0FDQTtXQUNBO1dBQ0E7V0FDQSxpQkFBaUIscUJBQXFCO1dBQ3RDO1dBQ0E7V0FDQSxrQkFBa0IscUJBQXFCO1dBQ3ZDO1dBQ0E7V0FDQSxLQUFLO1dBQ0w7V0FDQTtXQUNBO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7V0FDQTtXQUNBOzs7OztXQzNCQTtXQUNBO1dBQ0E7V0FDQTtXQUNBLHlDQUF5Qyx3Q0FBd0M7V0FDakY7V0FDQTtXQUNBOzs7OztXQ1BBOzs7OztXQ0FBO1dBQ0E7V0FDQTtXQUNBLHVEQUF1RCxpQkFBaUI7V0FDeEU7V0FDQSxnREFBZ0QsYUFBYTtXQUM3RDs7Ozs7V0NOQTs7V0FFQTtXQUNBO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7O1dBRUE7O1dBRUE7O1dBRUE7O1dBRUE7O1dBRUE7O1dBRUE7O1dBRUE7V0FDQTtXQUNBO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7V0FDQTtXQUNBO1dBQ0EsTUFBTSxxQkFBcUI7V0FDM0I7V0FDQTtXQUNBO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7V0FDQTs7V0FFQTtXQUNBO1dBQ0E7Ozs7O1VFaERBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0EiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly80dHJvY2tldC1kYXNoYm9hcmQvLi8ueWFybi9jYWNoZS9jdXN0b20tZXZlbnQtcG9seWZpbGwtbnBtLTAuMy4wLTZhOTcxNWU2MzItNDQ5ZDhlODQ5Ny56aXAvbm9kZV9tb2R1bGVzL2N1c3RvbS1ldmVudC1wb2x5ZmlsbC9jdXN0b20tZXZlbnQtcG9seWZpbGwuanMiLCJ3ZWJwYWNrOi8vNHRyb2NrZXQtZGFzaGJvYXJkLy4vLnlhcm4vY2FjaGUvY3VzdG9tLXNlbGVjdC1ucG0tMS4xLjE1LWU4NzQ3N2YyNjYtZGQ4MDE4ZGUwMi56aXAvbm9kZV9tb2R1bGVzL2N1c3RvbS1zZWxlY3QvYnVpbGQvaW5kZXguanMiLCJ3ZWJwYWNrOi8vNHRyb2NrZXQtZGFzaGJvYXJkLy4vc3JjL2pzL3V0aWxzL2FjY29yZGlvbi5qcyIsIndlYnBhY2s6Ly80dHJvY2tldC1kYXNoYm9hcmQvLi9zcmMvanMvdXRpbHMvY2xpY2tPdXRzaWRlLmpzIiwid2VicGFjazovLzR0cm9ja2V0LWRhc2hib2FyZC8uL3NyYy9qcy91dGlscy9kYXRlbWFzay5qcyIsIndlYnBhY2s6Ly80dHJvY2tldC1kYXNoYm9hcmQvLi9zcmMvanMvdXRpbHMvbWVudS5qcyIsIndlYnBhY2s6Ly80dHJvY2tldC1kYXNoYm9hcmQvLi9zcmMvanMvdXRpbHMvbW9kYWwuanMiLCJ3ZWJwYWNrOi8vNHRyb2NrZXQtZGFzaGJvYXJkLy4vc3JjL2pzL3V0aWxzL3NlbGVjdGl6ZS5qcyIsIndlYnBhY2s6Ly80dHJvY2tldC1kYXNoYm9hcmQvLi9zcmMvanMvdXRpbHMvdGFicy5qcyIsIndlYnBhY2s6Ly80dHJvY2tldC1kYXNoYm9hcmQvd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vNHRyb2NrZXQtZGFzaGJvYXJkL3dlYnBhY2svcnVudGltZS9jaHVuayBsb2FkZWQiLCJ3ZWJwYWNrOi8vNHRyb2NrZXQtZGFzaGJvYXJkL3dlYnBhY2svcnVudGltZS9kZWZpbmUgcHJvcGVydHkgZ2V0dGVycyIsIndlYnBhY2s6Ly80dHJvY2tldC1kYXNoYm9hcmQvd2VicGFjay9ydW50aW1lL2hhc093blByb3BlcnR5IHNob3J0aGFuZCIsIndlYnBhY2s6Ly80dHJvY2tldC1kYXNoYm9hcmQvd2VicGFjay9ydW50aW1lL21ha2UgbmFtZXNwYWNlIG9iamVjdCIsIndlYnBhY2s6Ly80dHJvY2tldC1kYXNoYm9hcmQvd2VicGFjay9ydW50aW1lL2pzb25wIGNodW5rIGxvYWRpbmciLCJ3ZWJwYWNrOi8vNHRyb2NrZXQtZGFzaGJvYXJkL3dlYnBhY2svYmVmb3JlLXN0YXJ0dXAiLCJ3ZWJwYWNrOi8vNHRyb2NrZXQtZGFzaGJvYXJkL3dlYnBhY2svc3RhcnR1cCIsIndlYnBhY2s6Ly80dHJvY2tldC1kYXNoYm9hcmQvd2VicGFjay9hZnRlci1zdGFydHVwIl0sInNvdXJjZXNDb250ZW50IjpbIi8vIFBvbHlmaWxsIGZvciBjcmVhdGluZyBDdXN0b21FdmVudHMgb24gSUU5LzEwLzExXG5cbi8vIGNvZGUgcHVsbGVkIGZyb206XG4vLyBodHRwczovL2dpdGh1Yi5jb20vZDR0b2NjaGluaS9jdXN0b21ldmVudC1wb2x5ZmlsbFxuLy8gaHR0cHM6Ly9kZXZlbG9wZXIubW96aWxsYS5vcmcvZW4tVVMvZG9jcy9XZWIvQVBJL0N1c3RvbUV2ZW50I1BvbHlmaWxsXG5cbnRyeSB7XG4gICAgdmFyIGNlID0gbmV3IHdpbmRvdy5DdXN0b21FdmVudCgndGVzdCcpO1xuICAgIGNlLnByZXZlbnREZWZhdWx0KCk7XG4gICAgaWYgKGNlLmRlZmF1bHRQcmV2ZW50ZWQgIT09IHRydWUpIHtcbiAgICAgICAgLy8gSUUgaGFzIHByb2JsZW1zIHdpdGggLnByZXZlbnREZWZhdWx0KCkgb24gY3VzdG9tIGV2ZW50c1xuICAgICAgICAvLyBodHRwOi8vc3RhY2tvdmVyZmxvdy5jb20vcXVlc3Rpb25zLzIzMzQ5MTkxXG4gICAgICAgIHRocm93IG5ldyBFcnJvcignQ291bGQgbm90IHByZXZlbnQgZGVmYXVsdCcpO1xuICAgIH1cbn0gY2F0Y2goZSkge1xuICB2YXIgQ3VzdG9tRXZlbnQgPSBmdW5jdGlvbihldmVudCwgcGFyYW1zKSB7XG4gICAgdmFyIGV2dCwgb3JpZ1ByZXZlbnQ7XG4gICAgcGFyYW1zID0gcGFyYW1zIHx8IHtcbiAgICAgIGJ1YmJsZXM6IGZhbHNlLFxuICAgICAgY2FuY2VsYWJsZTogZmFsc2UsXG4gICAgICBkZXRhaWw6IHVuZGVmaW5lZFxuICAgIH07XG5cbiAgICBldnQgPSBkb2N1bWVudC5jcmVhdGVFdmVudChcIkN1c3RvbUV2ZW50XCIpO1xuICAgIGV2dC5pbml0Q3VzdG9tRXZlbnQoZXZlbnQsIHBhcmFtcy5idWJibGVzLCBwYXJhbXMuY2FuY2VsYWJsZSwgcGFyYW1zLmRldGFpbCk7XG4gICAgb3JpZ1ByZXZlbnQgPSBldnQucHJldmVudERlZmF1bHQ7XG4gICAgZXZ0LnByZXZlbnREZWZhdWx0ID0gZnVuY3Rpb24gKCkge1xuICAgICAgb3JpZ1ByZXZlbnQuY2FsbCh0aGlzKTtcbiAgICAgIHRyeSB7XG4gICAgICAgIE9iamVjdC5kZWZpbmVQcm9wZXJ0eSh0aGlzLCAnZGVmYXVsdFByZXZlbnRlZCcsIHtcbiAgICAgICAgICBnZXQ6IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgICAgIH1cbiAgICAgICAgfSk7XG4gICAgICB9IGNhdGNoKGUpIHtcbiAgICAgICAgdGhpcy5kZWZhdWx0UHJldmVudGVkID0gdHJ1ZTtcbiAgICAgIH1cbiAgICB9O1xuICAgIHJldHVybiBldnQ7XG4gIH07XG5cbiAgQ3VzdG9tRXZlbnQucHJvdG90eXBlID0gd2luZG93LkV2ZW50LnByb3RvdHlwZTtcbiAgd2luZG93LkN1c3RvbUV2ZW50ID0gQ3VzdG9tRXZlbnQ7IC8vIGV4cG9zZSBkZWZpbml0aW9uIHRvIHdpbmRvd1xufVxuIiwiJ3VzZSBzdHJpY3QnO1xuXG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHtcbiAgdmFsdWU6IHRydWVcbn0pO1xuXG52YXIgX2V4dGVuZHMgPSBPYmplY3QuYXNzaWduIHx8IGZ1bmN0aW9uICh0YXJnZXQpIHsgZm9yICh2YXIgaSA9IDE7IGkgPCBhcmd1bWVudHMubGVuZ3RoOyBpKyspIHsgdmFyIHNvdXJjZSA9IGFyZ3VtZW50c1tpXTsgZm9yICh2YXIga2V5IGluIHNvdXJjZSkgeyBpZiAoT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKHNvdXJjZSwga2V5KSkgeyB0YXJnZXRba2V5XSA9IHNvdXJjZVtrZXldOyB9IH0gfSByZXR1cm4gdGFyZ2V0OyB9O1xuXG52YXIgX3NsaWNlZFRvQXJyYXkgPSBmdW5jdGlvbiAoKSB7IGZ1bmN0aW9uIHNsaWNlSXRlcmF0b3IoYXJyLCBpKSB7IHZhciBfYXJyID0gW107IHZhciBfbiA9IHRydWU7IHZhciBfZCA9IGZhbHNlOyB2YXIgX2UgPSB1bmRlZmluZWQ7IHRyeSB7IGZvciAodmFyIF9pID0gYXJyW1N5bWJvbC5pdGVyYXRvcl0oKSwgX3M7ICEoX24gPSAoX3MgPSBfaS5uZXh0KCkpLmRvbmUpOyBfbiA9IHRydWUpIHsgX2Fyci5wdXNoKF9zLnZhbHVlKTsgaWYgKGkgJiYgX2Fyci5sZW5ndGggPT09IGkpIGJyZWFrOyB9IH0gY2F0Y2ggKGVycikgeyBfZCA9IHRydWU7IF9lID0gZXJyOyB9IGZpbmFsbHkgeyB0cnkgeyBpZiAoIV9uICYmIF9pW1wicmV0dXJuXCJdKSBfaVtcInJldHVyblwiXSgpOyB9IGZpbmFsbHkgeyBpZiAoX2QpIHRocm93IF9lOyB9IH0gcmV0dXJuIF9hcnI7IH0gcmV0dXJuIGZ1bmN0aW9uIChhcnIsIGkpIHsgaWYgKEFycmF5LmlzQXJyYXkoYXJyKSkgeyByZXR1cm4gYXJyOyB9IGVsc2UgaWYgKFN5bWJvbC5pdGVyYXRvciBpbiBPYmplY3QoYXJyKSkgeyByZXR1cm4gc2xpY2VJdGVyYXRvcihhcnIsIGkpOyB9IGVsc2UgeyB0aHJvdyBuZXcgVHlwZUVycm9yKFwiSW52YWxpZCBhdHRlbXB0IHRvIGRlc3RydWN0dXJlIG5vbi1pdGVyYWJsZSBpbnN0YW5jZVwiKTsgfSB9OyB9KCk7IC8qKlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgKiBjdXN0b20tc2VsZWN0XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAqIEEgbGlnaHR3ZWlnaHQgSlMgc2NyaXB0IGZvciBjdXN0b20gc2VsZWN0IGNyZWF0aW9uLlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgKiBOZWVkcyBubyBkZXBlbmRlbmNpZXMuXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAqXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAqIHYwLjAuMVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgKiAoaHR0cHM6Ly9naXRodWIuY29tL2N1c3RvbS1zZWxlY3QvY3VzdG9tLXNlbGVjdClcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICpcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICogQ29weXJpZ2h0IChjKSAyMDE2IEdpb25hdGFuIExvbWJhcmRpICYgTWFyY28gTnVjYXJhXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAqIE1JVCBMaWNlbnNlXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAqL1xuXG5leHBvcnRzLmRlZmF1bHQgPSBjdXN0b21TZWxlY3Q7XG5cbnJlcXVpcmUoJ2N1c3RvbS1ldmVudC1wb2x5ZmlsbCcpO1xuXG52YXIgZGVmYXVsdFBhcmFtcyA9IHtcbiAgY29udGFpbmVyQ2xhc3M6ICdjdXN0b20tc2VsZWN0LWNvbnRhaW5lcicsXG4gIG9wZW5lckNsYXNzOiAnY3VzdG9tLXNlbGVjdC1vcGVuZXInLFxuICBwYW5lbENsYXNzOiAnY3VzdG9tLXNlbGVjdC1wYW5lbCcsXG4gIG9wdGlvbkNsYXNzOiAnY3VzdG9tLXNlbGVjdC1vcHRpb24nLFxuICBvcHRncm91cENsYXNzOiAnY3VzdG9tLXNlbGVjdC1vcHRncm91cCcsXG4gIGlzU2VsZWN0ZWRDbGFzczogJ2lzLXNlbGVjdGVkJyxcbiAgaGFzRm9jdXNDbGFzczogJ2hhcy1mb2N1cycsXG4gIGlzRGlzYWJsZWRDbGFzczogJ2lzLWRpc2FibGVkJyxcbiAgaXNPcGVuQ2xhc3M6ICdpcy1vcGVuJ1xufTtcblxuZnVuY3Rpb24gYnVpbGRlcihlbCwgYnVpbGRlclBhcmFtcykge1xuICB2YXIgY29udGFpbmVyQ2xhc3MgPSAnY3VzdG9tU2VsZWN0JztcbiAgdmFyIGlzT3BlbiA9IGZhbHNlO1xuICB2YXIgdUlkID0gJyc7XG4gIHZhciBzZWxlY3QgPSBlbDtcbiAgdmFyIGNvbnRhaW5lciA9IHZvaWQgMDtcbiAgdmFyIG9wZW5lciA9IHZvaWQgMDtcbiAgdmFyIGZvY3VzZWRFbGVtZW50ID0gdm9pZCAwO1xuICB2YXIgc2VsZWN0ZWRFbGVtZW50ID0gdm9pZCAwO1xuICB2YXIgcGFuZWwgPSB2b2lkIDA7XG4gIHZhciBjdXJyTGFiZWwgPSB2b2lkIDA7XG5cbiAgdmFyIHJlc2V0U2VhcmNoVGltZW91dCA9IHZvaWQgMDtcbiAgdmFyIHNlYXJjaEtleSA9ICcnO1xuXG4gIC8vXG4gIC8vIElubmVyIEZ1bmN0aW9uc1xuICAvL1xuXG4gIC8vIFNldHMgdGhlIGZvY3VzZWQgZWxlbWVudCB3aXRoIHRoZSBuZWNjZXNzYXJ5IGNsYXNzZXMgc3Vic3RpdHV0aW9uc1xuICBmdW5jdGlvbiBzZXRGb2N1c2VkRWxlbWVudChjc3RPcHRpb24pIHtcbiAgICBpZiAoZm9jdXNlZEVsZW1lbnQpIHtcbiAgICAgIGZvY3VzZWRFbGVtZW50LmNsYXNzTGlzdC5yZW1vdmUoYnVpbGRlclBhcmFtcy5oYXNGb2N1c0NsYXNzKTtcbiAgICB9XG4gICAgaWYgKHR5cGVvZiBjc3RPcHRpb24gIT09ICd1bmRlZmluZWQnKSB7XG4gICAgICBmb2N1c2VkRWxlbWVudCA9IGNzdE9wdGlvbjtcbiAgICAgIGZvY3VzZWRFbGVtZW50LmNsYXNzTGlzdC5hZGQoYnVpbGRlclBhcmFtcy5oYXNGb2N1c0NsYXNzKTtcbiAgICAgIC8vIE9mZnNldCB1cGRhdGU6IGNoZWNrcyBpZiB0aGUgZm9jdXNlZCBlbGVtZW50IGlzIGluIHRoZSB2aXNpYmxlIHBhcnQgb2YgdGhlIHBhbmVsQ2xhc3NcbiAgICAgIC8vIGlmIG5vdCBkaXNwYXRjaGVzIGEgY3VzdG9tIGV2ZW50XG4gICAgICBpZiAoaXNPcGVuKSB7XG4gICAgICAgIGlmIChjc3RPcHRpb24ub2Zmc2V0VG9wIDwgY3N0T3B0aW9uLm9mZnNldFBhcmVudC5zY3JvbGxUb3AgfHwgY3N0T3B0aW9uLm9mZnNldFRvcCA+IGNzdE9wdGlvbi5vZmZzZXRQYXJlbnQuc2Nyb2xsVG9wICsgY3N0T3B0aW9uLm9mZnNldFBhcmVudC5jbGllbnRIZWlnaHQgLSBjc3RPcHRpb24uY2xpZW50SGVpZ2h0KSB7XG4gICAgICAgICAgY3N0T3B0aW9uLmRpc3BhdGNoRXZlbnQobmV3IEN1c3RvbUV2ZW50KCdjdXN0b20tc2VsZWN0OmZvY3VzLW91dHNpZGUtcGFuZWwnLCB7IGJ1YmJsZXM6IHRydWUgfSkpO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfSBlbHNlIHtcbiAgICAgIGZvY3VzZWRFbGVtZW50ID0gdW5kZWZpbmVkO1xuICAgIH1cbiAgfVxuXG4gIC8vIFJlYXNzaWducyB0aGUgZm9jdXNlZCBhbmQgc2VsZWN0ZWQgY3VzdG9tIG9wdGlvblxuICAvLyBVcGRhdGVzIHRoZSBvcGVuZXIgdGV4dFxuICAvLyBJTVBPUlRBTlQ6IHRoZSBzZXRTZWxlY3RlZEVsZW1lbnQgZnVuY3Rpb24gZG9lc24ndCBjaGFuZ2UgdGhlIHNlbGVjdCB2YWx1ZSFcbiAgZnVuY3Rpb24gc2V0U2VsZWN0ZWRFbGVtZW50KGNzdE9wdGlvbikge1xuICAgIGlmIChzZWxlY3RlZEVsZW1lbnQpIHtcbiAgICAgIHNlbGVjdGVkRWxlbWVudC5jbGFzc0xpc3QucmVtb3ZlKGJ1aWxkZXJQYXJhbXMuaXNTZWxlY3RlZENsYXNzKTtcbiAgICAgIHNlbGVjdGVkRWxlbWVudC5yZW1vdmVBdHRyaWJ1dGUoJ2lkJyk7XG4gICAgICBvcGVuZXIucmVtb3ZlQXR0cmlidXRlKCdhcmlhLWFjdGl2ZWRlc2NlbmRhbnQnKTtcbiAgICB9XG4gICAgaWYgKHR5cGVvZiBjc3RPcHRpb24gIT09ICd1bmRlZmluZWQnKSB7XG4gICAgICBjc3RPcHRpb24uY2xhc3NMaXN0LmFkZChidWlsZGVyUGFyYW1zLmlzU2VsZWN0ZWRDbGFzcyk7XG4gICAgICBjc3RPcHRpb24uc2V0QXR0cmlidXRlKCdpZCcsIGNvbnRhaW5lckNsYXNzICsgJy0nICsgdUlkICsgJy1zZWxlY3RlZE9wdGlvbicpO1xuICAgICAgb3BlbmVyLnNldEF0dHJpYnV0ZSgnYXJpYS1hY3RpdmVkZXNjZW5kYW50JywgY29udGFpbmVyQ2xhc3MgKyAnLScgKyB1SWQgKyAnLXNlbGVjdGVkT3B0aW9uJyk7XG4gICAgICBzZWxlY3RlZEVsZW1lbnQgPSBjc3RPcHRpb247XG4gICAgICBvcGVuZXIuY2hpbGRyZW5bMF0udGV4dENvbnRlbnQgPSBzZWxlY3RlZEVsZW1lbnQuY3VzdG9tU2VsZWN0T3JpZ2luYWxPcHRpb24udGV4dDtcbiAgICB9IGVsc2Uge1xuICAgICAgc2VsZWN0ZWRFbGVtZW50ID0gdW5kZWZpbmVkO1xuICAgICAgb3BlbmVyLmNoaWxkcmVuWzBdLnRleHRDb250ZW50ID0gJyc7XG4gICAgfVxuICAgIHNldEZvY3VzZWRFbGVtZW50KGNzdE9wdGlvbik7XG4gIH1cblxuICBmdW5jdGlvbiBzZXRWYWx1ZSh2YWx1ZSkge1xuICAgIC8vIEdldHMgdGhlIG9wdGlvbiB3aXRoIHRoZSBwcm92aWRlZCB2YWx1ZVxuICAgIHZhciB0b1NlbGVjdCA9IHNlbGVjdC5xdWVyeVNlbGVjdG9yKCdvcHRpb25bdmFsdWU9XFwnJyArIHZhbHVlICsgJ1xcJ10nKTtcbiAgICAvLyBJZiBubyBvcHRpb24gaGFzIHRoZSBwcm92aWRlZCB2YWx1ZSBnZXQgdGhlIGZpcnN0XG4gICAgaWYgKCF0b1NlbGVjdCkge1xuICAgICAgdmFyIF9zZWxlY3Qkb3B0aW9ucyA9IF9zbGljZWRUb0FycmF5KHNlbGVjdC5vcHRpb25zLCAxKTtcblxuICAgICAgdG9TZWxlY3QgPSBfc2VsZWN0JG9wdGlvbnNbMF07XG4gICAgfVxuICAgIC8vIFRoZSBvcHRpb24gd2l0aCB0aGUgcHJvdmlkZWQgdmFsdWUgYmVjb21lcyB0aGUgc2VsZWN0ZWQgb25lXG4gICAgLy8gQW5kIGNoYW5nZXMgdGhlIHNlbGVjdCBjdXJyZW50IHZhbHVlXG4gICAgdG9TZWxlY3Quc2VsZWN0ZWQgPSB0cnVlO1xuXG4gICAgc2V0U2VsZWN0ZWRFbGVtZW50KHNlbGVjdC5vcHRpb25zW3NlbGVjdC5zZWxlY3RlZEluZGV4XS5jdXN0b21TZWxlY3RDc3RPcHRpb24pO1xuICB9XG5cbiAgZnVuY3Rpb24gbW92ZUZvY3Vlc2VkRWxlbWVudChkaXJlY3Rpb24pIHtcbiAgICAvLyBHZXQgYWxsIHRoZSAuY3VzdG9tLXNlbGVjdC1vcHRpb25zXG4gICAgLy8gR2V0IHRoZSBpbmRleCBvZiB0aGUgY3VycmVudCBmb2N1c2VkIG9uZVxuICAgIHZhciBjdXJyZW50Rm9jdXNlZEluZGV4ID0gW10uaW5kZXhPZi5jYWxsKHNlbGVjdC5vcHRpb25zLCBmb2N1c2VkRWxlbWVudC5jdXN0b21TZWxlY3RPcmlnaW5hbE9wdGlvbik7XG4gICAgLy8gSWYgdGhlIG5leHQgb3IgcHJldiBjdXN0b20gb3B0aW9uIGV4aXN0XG4gICAgLy8gU2V0cyBpdCBhcyB0aGUgbmV3IGZvY3VzZWQgb25lXG4gICAgaWYgKHNlbGVjdC5vcHRpb25zW2N1cnJlbnRGb2N1c2VkSW5kZXggKyBkaXJlY3Rpb25dKSB7XG4gICAgICBzZXRGb2N1c2VkRWxlbWVudChzZWxlY3Qub3B0aW9uc1tjdXJyZW50Rm9jdXNlZEluZGV4ICsgZGlyZWN0aW9uXS5jdXN0b21TZWxlY3RDc3RPcHRpb24pO1xuICAgIH1cbiAgfVxuXG4gIC8vIE9wZW4vQ2xvc2UgZnVuY3Rpb24gKHRvZ2dsZSlcbiAgZnVuY3Rpb24gb3Blbihib29sKSB7XG4gICAgLy8gT3BlblxuICAgIGlmIChib29sIHx8IHR5cGVvZiBib29sID09PSAndW5kZWZpbmVkJykge1xuICAgICAgLy8gSWYgcHJlc2VudCBjbG9zZXMgYW4gb3BlbmVkIGluc3RhbmNlIG9mIHRoZSBwbHVnaW5cbiAgICAgIC8vIE9ubHkgb25lIGF0IHRpbWUgY2FuIGJlIG9wZW5cbiAgICAgIHZhciBvcGVuZWRDdXN0b21TZWxlY3QgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuJyArIGNvbnRhaW5lckNsYXNzICsgJy4nICsgYnVpbGRlclBhcmFtcy5pc09wZW5DbGFzcyk7XG4gICAgICBpZiAob3BlbmVkQ3VzdG9tU2VsZWN0KSB7XG4gICAgICAgIG9wZW5lZEN1c3RvbVNlbGVjdC5jdXN0b21TZWxlY3Qub3BlbiA9IGZhbHNlO1xuICAgICAgfVxuXG4gICAgICAvLyBPcGVucyBvbmx5IHRoZSBjbGlja2VkIG9uZVxuICAgICAgY29udGFpbmVyLmNsYXNzTGlzdC5hZGQoYnVpbGRlclBhcmFtcy5pc09wZW5DbGFzcyk7XG5cbiAgICAgIC8vIGFyaWEtZXhwYW5kZWQgdXBkYXRlXG4gICAgICBjb250YWluZXIuY2xhc3NMaXN0LmFkZChidWlsZGVyUGFyYW1zLmlzT3BlbkNsYXNzKTtcbiAgICAgIG9wZW5lci5zZXRBdHRyaWJ1dGUoJ2FyaWEtZXhwYW5kZWQnLCAndHJ1ZScpO1xuXG4gICAgICAvLyBVcGRhdGVzIHRoZSBzY3JvbGxUb3AgcG9zaXRpb24gb2YgdGhlIHBhbmVsIGluIHJlbGF0aW9uIHdpdGggdGhlIGZvY3VzZWQgb3B0aW9uXG4gICAgICBpZiAoc2VsZWN0ZWRFbGVtZW50KSB7XG4gICAgICAgIHBhbmVsLnNjcm9sbFRvcCA9IHNlbGVjdGVkRWxlbWVudC5vZmZzZXRUb3A7XG4gICAgICB9XG5cbiAgICAgIC8vIERpc3BhdGNoZXMgdGhlIGN1c3RvbSBldmVudCBvcGVuXG4gICAgICBjb250YWluZXIuZGlzcGF0Y2hFdmVudChuZXcgQ3VzdG9tRXZlbnQoJ2N1c3RvbS1zZWxlY3Q6b3BlbicpKTtcblxuICAgICAgLy8gU2V0cyB0aGUgZ2xvYmFsIHN0YXRlXG4gICAgICBpc09wZW4gPSB0cnVlO1xuXG4gICAgICAvLyBDbG9zZVxuICAgIH0gZWxzZSB7XG4gICAgICAvLyBSZW1vdmVzIHRoZSBjc3MgY2xhc3Nlc1xuICAgICAgY29udGFpbmVyLmNsYXNzTGlzdC5yZW1vdmUoYnVpbGRlclBhcmFtcy5pc09wZW5DbGFzcyk7XG5cbiAgICAgIC8vIGFyaWEtZXhwYW5kZWQgdXBkYXRlXG4gICAgICBvcGVuZXIuc2V0QXR0cmlidXRlKCdhcmlhLWV4cGFuZGVkJywgJ2ZhbHNlJyk7XG5cbiAgICAgIC8vIFNldHMgdGhlIGdsb2JhbCBzdGF0ZVxuICAgICAgaXNPcGVuID0gZmFsc2U7XG5cbiAgICAgIC8vIFdoZW4gY2xvc2luZyB0aGUgcGFuZWwgdGhlIGZvY3VzZWQgY3VzdG9tIG9wdGlvbiBtdXN0IGJlIHRoZSBzZWxlY3RlZCBvbmVcbiAgICAgIHNldEZvY3VzZWRFbGVtZW50KHNlbGVjdGVkRWxlbWVudCk7XG5cbiAgICAgIC8vIERpc3BhdGNoZXMgdGhlIGN1c3RvbSBldmVudCBjbG9zZVxuICAgICAgY29udGFpbmVyLmRpc3BhdGNoRXZlbnQobmV3IEN1c3RvbUV2ZW50KCdjdXN0b20tc2VsZWN0OmNsb3NlJykpO1xuICAgIH1cbiAgICByZXR1cm4gaXNPcGVuO1xuICB9XG5cbiAgZnVuY3Rpb24gY2xpY2tFdmVudChlKSB7XG4gICAgLy8gT3BlbmVyIGNsaWNrXG4gICAgaWYgKGUudGFyZ2V0ID09PSBvcGVuZXIgfHwgb3BlbmVyLmNvbnRhaW5zKGUudGFyZ2V0KSkge1xuICAgICAgaWYgKGlzT3Blbikge1xuICAgICAgICBvcGVuKGZhbHNlKTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIG9wZW4oKTtcbiAgICAgIH1cbiAgICAgIC8vIEN1c3RvbSBPcHRpb24gY2xpY2tcbiAgICB9IGVsc2UgaWYgKGUudGFyZ2V0LmNsYXNzTGlzdCAmJiBlLnRhcmdldC5jbGFzc0xpc3QuY29udGFpbnMoYnVpbGRlclBhcmFtcy5vcHRpb25DbGFzcykgJiYgcGFuZWwuY29udGFpbnMoZS50YXJnZXQpKSB7XG4gICAgICBzZXRTZWxlY3RlZEVsZW1lbnQoZS50YXJnZXQpO1xuICAgICAgLy8gU2V0cyB0aGUgY29ycmlzcG9uZGluZyBzZWxlY3QncyBvcHRpb24gdG8gc2VsZWN0ZWQgdXBkYXRpbmcgdGhlIHNlbGVjdCdzIHZhbHVlIHRvb1xuICAgICAgc2VsZWN0ZWRFbGVtZW50LmN1c3RvbVNlbGVjdE9yaWdpbmFsT3B0aW9uLnNlbGVjdGVkID0gdHJ1ZTtcbiAgICAgIG9wZW4oZmFsc2UpO1xuICAgICAgLy8gVHJpZ2dlcnMgdGhlIG5hdGl2ZSBjaGFuZ2UgZXZlbnQgb2YgdGhlIHNlbGVjdFxuICAgICAgc2VsZWN0LmRpc3BhdGNoRXZlbnQobmV3IEN1c3RvbUV2ZW50KCdjaGFuZ2UnKSk7XG4gICAgICAvLyBjbGljayBvbiBsYWJlbCBvciBzZWxlY3QgKGNsaWNrIG9uIGxhYmVsIGNvcnJpc3BvbmQgdG8gc2VsZWN0IGNsaWNrKVxuICAgIH0gZWxzZSBpZiAoZS50YXJnZXQgPT09IHNlbGVjdCkge1xuICAgICAgLy8gaWYgdGhlIG9yaWdpbmFsIHNlbGVjdCBpcyBmb2N1c2FibGUgKGZvciBhbnkgZXh0ZXJuYWwgcmVhc29uKSBsZXQgdGhlIGZvY3VzXG4gICAgICAvLyBlbHNlIHRyaWdnZXIgdGhlIGZvY3VzIG9uIG9wZW5lclxuICAgICAgaWYgKG9wZW5lciAhPT0gZG9jdW1lbnQuYWN0aXZlRWxlbWVudCAmJiBzZWxlY3QgIT09IGRvY3VtZW50LmFjdGl2ZUVsZW1lbnQpIHtcbiAgICAgICAgb3BlbmVyLmZvY3VzKCk7XG4gICAgICB9XG4gICAgICAvLyBDbGljayBvdXRzaWRlIHRoZSBjb250YWluZXIgY2xvc2VzIHRoZSBwYW5lbFxuICAgIH0gZWxzZSBpZiAoaXNPcGVuICYmICFjb250YWluZXIuY29udGFpbnMoZS50YXJnZXQpKSB7XG4gICAgICBvcGVuKGZhbHNlKTtcbiAgICB9XG4gIH1cblxuICBmdW5jdGlvbiBtb3VzZW92ZXJFdmVudChlKSB7XG4gICAgLy8gT24gbW91c2UgbW92ZSBvdmVyIGFuZCBvcHRpb25zIGl0IGJhY2FtZXMgdGhlIGZvY3VzZWQgb25lXG4gICAgaWYgKGUudGFyZ2V0LmNsYXNzTGlzdCAmJiBlLnRhcmdldC5jbGFzc0xpc3QuY29udGFpbnMoYnVpbGRlclBhcmFtcy5vcHRpb25DbGFzcykpIHtcbiAgICAgIHNldEZvY3VzZWRFbGVtZW50KGUudGFyZ2V0KTtcbiAgICB9XG4gIH1cblxuICBmdW5jdGlvbiBrZXlkb3duRXZlbnQoZSkge1xuICAgIGlmICghaXNPcGVuKSB7XG4gICAgICAvLyBPbiBcIkFycm93IGRvd25cIiwgXCJBcnJvdyB1cFwiIGFuZCBcIlNwYWNlXCIga2V5cyBvcGVucyB0aGUgcGFuZWxcbiAgICAgIGlmIChlLmtleUNvZGUgPT09IDQwIHx8IGUua2V5Q29kZSA9PT0gMzggfHwgZS5rZXlDb2RlID09PSAzMikge1xuICAgICAgICBvcGVuKCk7XG4gICAgICB9XG4gICAgfSBlbHNlIHtcbiAgICAgIHN3aXRjaCAoZS5rZXlDb2RlKSB7XG4gICAgICAgIGNhc2UgMTM6XG4gICAgICAgIGNhc2UgMzI6XG4gICAgICAgICAgLy8gT24gXCJFbnRlclwiIG9yIFwiU3BhY2VcIiBzZWxlY3RzIHRoZSBmb2N1c2VkIGVsZW1lbnQgYXMgdGhlIHNlbGVjdGVkIG9uZVxuICAgICAgICAgIHNldFNlbGVjdGVkRWxlbWVudChmb2N1c2VkRWxlbWVudCk7XG4gICAgICAgICAgLy8gU2V0cyB0aGUgY29ycmlzcG9uZGluZyBzZWxlY3QncyBvcHRpb24gdG8gc2VsZWN0ZWQgdXBkYXRpbmcgdGhlIHNlbGVjdCdzIHZhbHVlIHRvb1xuICAgICAgICAgIHNlbGVjdGVkRWxlbWVudC5jdXN0b21TZWxlY3RPcmlnaW5hbE9wdGlvbi5zZWxlY3RlZCA9IHRydWU7XG4gICAgICAgICAgLy8gVHJpZ2dlcnMgdGhlIG5hdGl2ZSBjaGFuZ2UgZXZlbnQgb2YgdGhlIHNlbGVjdFxuICAgICAgICAgIHNlbGVjdC5kaXNwYXRjaEV2ZW50KG5ldyBDdXN0b21FdmVudCgnY2hhbmdlJykpO1xuICAgICAgICAgIG9wZW4oZmFsc2UpO1xuICAgICAgICAgIGJyZWFrO1xuICAgICAgICBjYXNlIDI3OlxuICAgICAgICAgIC8vIE9uIFwiRXNjYXBlXCIgY2xvc2VzIHRoZSBwYW5lbFxuICAgICAgICAgIG9wZW4oZmFsc2UpO1xuICAgICAgICAgIGJyZWFrO1xuXG4gICAgICAgIGNhc2UgMzg6XG4gICAgICAgICAgLy8gT24gXCJBcnJvdyB1cFwiIHNldCBmb2N1cyB0byB0aGUgcHJldiBvcHRpb24gaWYgcHJlc2VudFxuICAgICAgICAgIG1vdmVGb2N1ZXNlZEVsZW1lbnQoLTEpO1xuICAgICAgICAgIGJyZWFrO1xuICAgICAgICBjYXNlIDQwOlxuICAgICAgICAgIC8vIE9uIFwiQXJyb3cgZG93blwiIHNldCBmb2N1cyB0byB0aGUgbmV4dCBvcHRpb24gaWYgcHJlc2VudFxuICAgICAgICAgIG1vdmVGb2N1ZXNlZEVsZW1lbnQoKzEpO1xuICAgICAgICAgIGJyZWFrO1xuICAgICAgICBkZWZhdWx0OlxuICAgICAgICAgIC8vIHNlYXJjaCBpbiBwYW5lbCAoYXV0b2NvbXBsZXRlKVxuICAgICAgICAgIGlmIChlLmtleUNvZGUgPj0gNDggJiYgZS5rZXlDb2RlIDw9IDkwKSB7XG4gICAgICAgICAgICAvLyBjbGVhciBleGlzdGluZyByZXNldCB0aW1lb3V0XG4gICAgICAgICAgICBpZiAocmVzZXRTZWFyY2hUaW1lb3V0KSB7XG4gICAgICAgICAgICAgIGNsZWFyVGltZW91dChyZXNldFNlYXJjaFRpbWVvdXQpO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAvLyByZXNldCB0aW1lb3V0IGZvciBlbXB0eSBzZWFyY2gga2V5XG4gICAgICAgICAgICByZXNldFNlYXJjaFRpbWVvdXQgPSBzZXRUaW1lb3V0KGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgICAgc2VhcmNoS2V5ID0gJyc7XG4gICAgICAgICAgICB9LCAxNTAwKTtcblxuICAgICAgICAgICAgLy8gdXBkYXRlIHNlYXJjaCBrZXl3b3JkIGFwcGVuZGluZyB0aGUgY3VycmVudCBrZXlcbiAgICAgICAgICAgIHNlYXJjaEtleSArPSBTdHJpbmcuZnJvbUNoYXJDb2RlKGUua2V5Q29kZSk7XG5cbiAgICAgICAgICAgIC8vIHNlYXJjaCB0aGUgZWxlbWVudFxuICAgICAgICAgICAgZm9yICh2YXIgaSA9IDAsIGwgPSBzZWxlY3Qub3B0aW9ucy5sZW5ndGg7IGkgPCBsOyBpKyspIHtcbiAgICAgICAgICAgICAgLy8gcmVtb3ZlZCBjYXVzZSBub3Qgc3VwcG9ydGVkIGJ5IElFOlxuICAgICAgICAgICAgICAvLyBpZiAob3B0aW9uc1tpXS50ZXh0LnN0YXJ0c1dpdGgoc2VhcmNoS2V5KSlcbiAgICAgICAgICAgICAgaWYgKHNlbGVjdC5vcHRpb25zW2ldLnRleHQudG9VcHBlckNhc2UoKS5zdWJzdHIoMCwgc2VhcmNoS2V5Lmxlbmd0aCkgPT09IHNlYXJjaEtleSkge1xuICAgICAgICAgICAgICAgIHNldEZvY3VzZWRFbGVtZW50KHNlbGVjdC5vcHRpb25zW2ldLmN1c3RvbVNlbGVjdENzdE9wdGlvbik7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9XG4gICAgICAgICAgYnJlYWs7XG4gICAgICB9XG4gICAgfVxuICB9XG5cbiAgZnVuY3Rpb24gY2hhbmdlRXZlbnQoKSB7XG4gICAgdmFyIGluZGV4ID0gc2VsZWN0LnNlbGVjdGVkSW5kZXg7XG4gICAgdmFyIGVsZW1lbnQgPSBpbmRleCA9PT0gLTEgPyB1bmRlZmluZWQgOiBzZWxlY3Qub3B0aW9uc1tpbmRleF0uY3VzdG9tU2VsZWN0Q3N0T3B0aW9uO1xuXG4gICAgc2V0U2VsZWN0ZWRFbGVtZW50KGVsZW1lbnQpO1xuICB9XG5cbiAgLy8gV2hlbiB0aGUgb3B0aW9uIGlzIG91dHNpZGUgdGhlIHZpc2libGUgcGFydCBvZiB0aGUgb3BlbmVkIHBhbmVsLCB1cGRhdGVzIHRoZSBzY3JvbGxUb3AgcG9zaXRpb25cbiAgLy8gVGhpcyBpcyB0aGUgZGVmYXVsdCBiZWhhdmlvdXJcbiAgLy8gVG8gYmxvY2sgaXQgdGhlIHBsdWdpbiB1c2VyIG11c3RcbiAgLy8gYWRkIGEgXCJjdXN0b20tc2VsZWN0OmZvY3VzLW91dHNpZGUtcGFuZWxcIiBldmVudExpc3RlbmVyIG9uIHRoZSBwYW5lbFxuICAvLyB3aXRoIHVzZUNhcHR1cmUgc2V0IHRvIHRydWVcbiAgLy8gYW5kIHN0b3BQcm9wYWdhdGlvblxuICBmdW5jdGlvbiBzY3JvbGxUb0ZvY3VzZWQoZSkge1xuICAgIHZhciBjdXJyUGFuZWwgPSBlLmN1cnJlbnRUYXJnZXQ7XG4gICAgdmFyIGN1cnJPcHRpb24gPSBlLnRhcmdldDtcbiAgICAvLyBVcFxuICAgIGlmIChjdXJyT3B0aW9uLm9mZnNldFRvcCA8IGN1cnJQYW5lbC5zY3JvbGxUb3ApIHtcbiAgICAgIGN1cnJQYW5lbC5zY3JvbGxUb3AgPSBjdXJyT3B0aW9uLm9mZnNldFRvcDtcbiAgICAgIC8vIERvd25cbiAgICB9IGVsc2Uge1xuICAgICAgY3VyclBhbmVsLnNjcm9sbFRvcCA9IGN1cnJPcHRpb24ub2Zmc2V0VG9wICsgY3Vyck9wdGlvbi5jbGllbnRIZWlnaHQgLSBjdXJyUGFuZWwuY2xpZW50SGVpZ2h0O1xuICAgIH1cbiAgfVxuXG4gIGZ1bmN0aW9uIGFkZEV2ZW50cygpIHtcbiAgICBkb2N1bWVudC5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIGNsaWNrRXZlbnQpO1xuICAgIHBhbmVsLmFkZEV2ZW50TGlzdGVuZXIoJ21vdXNlb3ZlcicsIG1vdXNlb3ZlckV2ZW50KTtcbiAgICBwYW5lbC5hZGRFdmVudExpc3RlbmVyKCdjdXN0b20tc2VsZWN0OmZvY3VzLW91dHNpZGUtcGFuZWwnLCBzY3JvbGxUb0ZvY3VzZWQpO1xuICAgIHNlbGVjdC5hZGRFdmVudExpc3RlbmVyKCdjaGFuZ2UnLCBjaGFuZ2VFdmVudCk7XG4gICAgY29udGFpbmVyLmFkZEV2ZW50TGlzdGVuZXIoJ2tleWRvd24nLCBrZXlkb3duRXZlbnQpO1xuICB9XG5cbiAgZnVuY3Rpb24gcmVtb3ZlRXZlbnRzKCkge1xuICAgIGRvY3VtZW50LnJlbW92ZUV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgY2xpY2tFdmVudCk7XG4gICAgcGFuZWwucmVtb3ZlRXZlbnRMaXN0ZW5lcignbW91c2VvdmVyJywgbW91c2VvdmVyRXZlbnQpO1xuICAgIHBhbmVsLnJlbW92ZUV2ZW50TGlzdGVuZXIoJ2N1c3RvbS1zZWxlY3Q6Zm9jdXMtb3V0c2lkZS1wYW5lbCcsIHNjcm9sbFRvRm9jdXNlZCk7XG4gICAgc2VsZWN0LnJlbW92ZUV2ZW50TGlzdGVuZXIoJ2NoYW5nZScsIGNoYW5nZUV2ZW50KTtcbiAgICBjb250YWluZXIucmVtb3ZlRXZlbnRMaXN0ZW5lcigna2V5ZG93bicsIGtleWRvd25FdmVudCk7XG4gIH1cblxuICBmdW5jdGlvbiBkaXNhYmxlZChib29sKSB7XG4gICAgaWYgKGJvb2wgJiYgIXNlbGVjdC5kaXNhYmxlZCkge1xuICAgICAgY29udGFpbmVyLmNsYXNzTGlzdC5hZGQoYnVpbGRlclBhcmFtcy5pc0Rpc2FibGVkQ2xhc3MpO1xuICAgICAgc2VsZWN0LmRpc2FibGVkID0gdHJ1ZTtcbiAgICAgIG9wZW5lci5yZW1vdmVBdHRyaWJ1dGUoJ3RhYmluZGV4Jyk7XG4gICAgICBjb250YWluZXIuZGlzcGF0Y2hFdmVudChuZXcgQ3VzdG9tRXZlbnQoJ2N1c3RvbS1zZWxlY3Q6ZGlzYWJsZWQnKSk7XG4gICAgICByZW1vdmVFdmVudHMoKTtcbiAgICB9IGVsc2UgaWYgKCFib29sICYmIHNlbGVjdC5kaXNhYmxlZCkge1xuICAgICAgY29udGFpbmVyLmNsYXNzTGlzdC5yZW1vdmUoYnVpbGRlclBhcmFtcy5pc0Rpc2FibGVkQ2xhc3MpO1xuICAgICAgc2VsZWN0LmRpc2FibGVkID0gZmFsc2U7XG4gICAgICBvcGVuZXIuc2V0QXR0cmlidXRlKCd0YWJpbmRleCcsICcwJyk7XG4gICAgICBjb250YWluZXIuZGlzcGF0Y2hFdmVudChuZXcgQ3VzdG9tRXZlbnQoJ2N1c3RvbS1zZWxlY3Q6ZW5hYmxlZCcpKTtcbiAgICAgIGFkZEV2ZW50cygpO1xuICAgIH1cbiAgfVxuXG4gIC8vIEZvcm0gYSBnaXZlbiBzZWxlY3QgY2hpbGRyZW4gRE9NIHRyZWUgKG9wdGlvbnMgYW5kIG9wdGdyb3VwKSxcbiAgLy8gQ3JlYXRlcyB0aGUgY29ycmVzcG9uZGluZyBjdXN0b20gSFRNTEVsZW1lbnRzIGxpc3QgKGRpdnMgd2l0aCBkaWZmZXJlbnQgY2xhc3NlcyBhbmQgYXR0cmlidXRlcylcbiAgZnVuY3Rpb24gcGFyc2VNYXJrdXAoY2hpbGRyZW4pIHtcbiAgICB2YXIgbm9kZUxpc3QgPSBjaGlsZHJlbjtcbiAgICB2YXIgY3N0TGlzdCA9IFtdO1xuXG4gICAgaWYgKHR5cGVvZiBub2RlTGlzdC5sZW5ndGggPT09ICd1bmRlZmluZWQnKSB7XG4gICAgICB0aHJvdyBuZXcgVHlwZUVycm9yKCdJbnZhbGlkIEFyZ3VtZW50Jyk7XG4gICAgfVxuXG4gICAgZm9yICh2YXIgaSA9IDAsIGxpID0gbm9kZUxpc3QubGVuZ3RoOyBpIDwgbGk7IGkrKykge1xuICAgICAgaWYgKG5vZGVMaXN0W2ldIGluc3RhbmNlb2YgSFRNTEVsZW1lbnQgJiYgbm9kZUxpc3RbaV0udGFnTmFtZS50b1VwcGVyQ2FzZSgpID09PSAnT1BUR1JPVVAnKSB7XG4gICAgICAgIHZhciBjc3RPcHRncm91cCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xuICAgICAgICBjc3RPcHRncm91cC5jbGFzc0xpc3QuYWRkKGJ1aWxkZXJQYXJhbXMub3B0Z3JvdXBDbGFzcyk7XG4gICAgICAgIGNzdE9wdGdyb3VwLnNldEF0dHJpYnV0ZSgnZGF0YS1sYWJlbCcsIG5vZGVMaXN0W2ldLmxhYmVsKTtcblxuICAgICAgICAvLyBJTVBPUlRBTlQ6IFN0b3JlcyBpbiBhIHByb3BlcnR5IG9mIHRoZSBjcmVhdGVkIGN1c3RvbSBvcHRpb24gZ3JvdXBcbiAgICAgICAgLy8gYSBob29rIHRvIHRoZSB0aGUgY29ycmlzcG9uZGluZyBzZWxlY3QncyBvcHRpb24gZ3JvdXBcbiAgICAgICAgY3N0T3B0Z3JvdXAuY3VzdG9tU2VsZWN0T3JpZ2luYWxPcHRncm91cCA9IG5vZGVMaXN0W2ldO1xuXG4gICAgICAgIC8vIElNUE9SVEFOVDogU3RvcmVzIGluIGEgcHJvcGVydHkgb2Ygc2VsZWN0J3Mgb3B0aW9uIGdyb3VwXG4gICAgICAgIC8vIGEgaG9vayB0byB0aGUgY3JlYXRlZCBjdXN0b20gb3B0aW9uIGdyb3VwXG4gICAgICAgIG5vZGVMaXN0W2ldLmN1c3RvbVNlbGVjdENzdE9wdGdyb3VwID0gY3N0T3B0Z3JvdXA7XG5cbiAgICAgICAgdmFyIHN1Yk5vZGVzID0gcGFyc2VNYXJrdXAobm9kZUxpc3RbaV0uY2hpbGRyZW4pO1xuICAgICAgICBmb3IgKHZhciBqID0gMCwgbGogPSBzdWJOb2Rlcy5sZW5ndGg7IGogPCBsajsgaisrKSB7XG4gICAgICAgICAgY3N0T3B0Z3JvdXAuYXBwZW5kQ2hpbGQoc3ViTm9kZXNbal0pO1xuICAgICAgICB9XG5cbiAgICAgICAgY3N0TGlzdC5wdXNoKGNzdE9wdGdyb3VwKTtcbiAgICAgIH0gZWxzZSBpZiAobm9kZUxpc3RbaV0gaW5zdGFuY2VvZiBIVE1MRWxlbWVudCAmJiBub2RlTGlzdFtpXS50YWdOYW1lLnRvVXBwZXJDYXNlKCkgPT09ICdPUFRJT04nKSB7XG4gICAgICAgIHZhciBjc3RPcHRpb24gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcbiAgICAgICAgY3N0T3B0aW9uLmNsYXNzTGlzdC5hZGQoYnVpbGRlclBhcmFtcy5vcHRpb25DbGFzcyk7XG4gICAgICAgIGNzdE9wdGlvbi50ZXh0Q29udGVudCA9IG5vZGVMaXN0W2ldLnRleHQ7XG4gICAgICAgIGNzdE9wdGlvbi5zZXRBdHRyaWJ1dGUoJ2RhdGEtdmFsdWUnLCBub2RlTGlzdFtpXS52YWx1ZSk7XG4gICAgICAgIGNzdE9wdGlvbi5zZXRBdHRyaWJ1dGUoJ3JvbGUnLCAnb3B0aW9uJyk7XG5cbiAgICAgICAgLy8gSU1QT1JUQU5UOiBTdG9yZXMgaW4gYSBwcm9wZXJ0eSBvZiB0aGUgY3JlYXRlZCBjdXN0b20gb3B0aW9uXG4gICAgICAgIC8vIGEgaG9vayB0byB0aGUgdGhlIGNvcnJpc3BvbmRpbmcgc2VsZWN0J3Mgb3B0aW9uXG4gICAgICAgIGNzdE9wdGlvbi5jdXN0b21TZWxlY3RPcmlnaW5hbE9wdGlvbiA9IG5vZGVMaXN0W2ldO1xuXG4gICAgICAgIC8vIElNUE9SVEFOVDogU3RvcmVzIGluIGEgcHJvcGVydHkgb2Ygc2VsZWN0J3Mgb3B0aW9uXG4gICAgICAgIC8vIGEgaG9vayB0byB0aGUgY3JlYXRlZCBjdXN0b20gb3B0aW9uXG4gICAgICAgIG5vZGVMaXN0W2ldLmN1c3RvbVNlbGVjdENzdE9wdGlvbiA9IGNzdE9wdGlvbjtcblxuICAgICAgICAvLyBJZiB0aGUgc2VsZWN0J3Mgb3B0aW9uIGlzIHNlbGVjdGVkXG4gICAgICAgIGlmIChub2RlTGlzdFtpXS5zZWxlY3RlZCkge1xuICAgICAgICAgIHNldFNlbGVjdGVkRWxlbWVudChjc3RPcHRpb24pO1xuICAgICAgICB9XG4gICAgICAgIGNzdExpc3QucHVzaChjc3RPcHRpb24pO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgdGhyb3cgbmV3IFR5cGVFcnJvcignSW52YWxpZCBBcmd1bWVudCcpO1xuICAgICAgfVxuICAgIH1cbiAgICByZXR1cm4gY3N0TGlzdDtcbiAgfVxuXG4gIGZ1bmN0aW9uIF9hcHBlbmQobm9kZVBhciwgYXBwZW5kSW50b09yaWdpbmFsLCB0YXJnZXRQYXIpIHtcbiAgICB2YXIgdGFyZ2V0ID0gdm9pZCAwO1xuICAgIGlmICh0eXBlb2YgdGFyZ2V0UGFyID09PSAndW5kZWZpbmVkJyB8fCB0YXJnZXRQYXIgPT09IHNlbGVjdCkge1xuICAgICAgdGFyZ2V0ID0gcGFuZWw7XG4gICAgfSBlbHNlIGlmICh0YXJnZXRQYXIgaW5zdGFuY2VvZiBIVE1MRWxlbWVudCAmJiB0YXJnZXRQYXIudGFnTmFtZS50b1VwcGVyQ2FzZSgpID09PSAnT1BUR1JPVVAnICYmIHNlbGVjdC5jb250YWlucyh0YXJnZXRQYXIpKSB7XG4gICAgICB0YXJnZXQgPSB0YXJnZXRQYXIuY3VzdG9tU2VsZWN0Q3N0T3B0Z3JvdXA7XG4gICAgfSBlbHNlIHtcbiAgICAgIHRocm93IG5ldyBUeXBlRXJyb3IoJ0ludmFsaWQgQXJndW1lbnQnKTtcbiAgICB9XG5cbiAgICAvLyBJZiB0aGUgbm9kZSBwcm92aWRlZCBpcyBhIHNpbmdsZSBIVE1MRWxlbWVudCBpdCBpcyBzdG9yZWQgaW4gYW4gYXJyYXlcbiAgICB2YXIgbm9kZSA9IG5vZGVQYXIgaW5zdGFuY2VvZiBIVE1MRWxlbWVudCA/IFtub2RlUGFyXSA6IG5vZGVQYXI7XG5cbiAgICAvLyBJbmplY3RzIHRoZSBvcHRpb25zfG9wdGdyb3VwIGluIHRoZSBzZWxlY3RcbiAgICBpZiAoYXBwZW5kSW50b09yaWdpbmFsKSB7XG4gICAgICBmb3IgKHZhciBpID0gMCwgbCA9IG5vZGUubGVuZ3RoOyBpIDwgbDsgaSsrKSB7XG4gICAgICAgIGlmICh0YXJnZXQgPT09IHBhbmVsKSB7XG4gICAgICAgICAgc2VsZWN0LmFwcGVuZENoaWxkKG5vZGVbaV0pO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIHRhcmdldC5jdXN0b21TZWxlY3RPcmlnaW5hbE9wdGdyb3VwLmFwcGVuZENoaWxkKG5vZGVbaV0pO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuXG4gICAgLy8gVGhlIGN1c3RvbSBtYXJrdXAgdG8gYXBwZW5kXG4gICAgdmFyIG1hcmt1cFRvSW5zZXJ0ID0gcGFyc2VNYXJrdXAobm9kZSk7XG5cbiAgICAvLyBJbmplY3RzIHRoZSBjcmVhdGVkIERPTSBjb250ZW50IGluIHRoZSBwYW5lbFxuICAgIGZvciAodmFyIF9pID0gMCwgX2wgPSBtYXJrdXBUb0luc2VydC5sZW5ndGg7IF9pIDwgX2w7IF9pKyspIHtcbiAgICAgIHRhcmdldC5hcHBlbmRDaGlsZChtYXJrdXBUb0luc2VydFtfaV0pO1xuICAgIH1cblxuICAgIHJldHVybiBub2RlO1xuICB9XG5cbiAgZnVuY3Rpb24gX2luc2VydEJlZm9yZShub2RlLCB0YXJnZXRQYXIpIHtcbiAgICB2YXIgdGFyZ2V0ID0gdm9pZCAwO1xuICAgIGlmICh0YXJnZXRQYXIgaW5zdGFuY2VvZiBIVE1MRWxlbWVudCAmJiB0YXJnZXRQYXIudGFnTmFtZS50b1VwcGVyQ2FzZSgpID09PSAnT1BUSU9OJyAmJiBzZWxlY3QuY29udGFpbnModGFyZ2V0UGFyKSkge1xuICAgICAgdGFyZ2V0ID0gdGFyZ2V0UGFyLmN1c3RvbVNlbGVjdENzdE9wdGlvbjtcbiAgICB9IGVsc2UgaWYgKHRhcmdldFBhciBpbnN0YW5jZW9mIEhUTUxFbGVtZW50ICYmIHRhcmdldFBhci50YWdOYW1lLnRvVXBwZXJDYXNlKCkgPT09ICdPUFRHUk9VUCcgJiYgc2VsZWN0LmNvbnRhaW5zKHRhcmdldFBhcikpIHtcbiAgICAgIHRhcmdldCA9IHRhcmdldFBhci5jdXN0b21TZWxlY3RDc3RPcHRncm91cDtcbiAgICB9IGVsc2Uge1xuICAgICAgdGhyb3cgbmV3IFR5cGVFcnJvcignSW52YWxpZCBBcmd1bWVudCcpO1xuICAgIH1cblxuICAgIC8vIFRoZSBjdXN0b20gbWFya3VwIHRvIGFwcGVuZFxuICAgIHZhciBtYXJrdXBUb0luc2VydCA9IHBhcnNlTWFya3VwKG5vZGUubGVuZ3RoID8gbm9kZSA6IFtub2RlXSk7XG5cbiAgICB0YXJnZXQucGFyZW50Tm9kZS5pbnNlcnRCZWZvcmUobWFya3VwVG9JbnNlcnRbMF0sIHRhcmdldCk7XG5cbiAgICAvLyBJbmplY3RzIHRoZSBvcHRpb24gb3Igb3B0Z3JvdXAgbm9kZSBpbiB0aGUgb3JpZ2luYWwgc2VsZWN0IGFuZCByZXR1cm5zIHRoZSBpbmplY3RlZCBub2RlXG4gICAgcmV0dXJuIHRhcmdldFBhci5wYXJlbnROb2RlLmluc2VydEJlZm9yZShub2RlLmxlbmd0aCA/IG5vZGVbMF0gOiBub2RlLCB0YXJnZXRQYXIpO1xuICB9XG5cbiAgZnVuY3Rpb24gcmVtb3ZlKG5vZGUpIHtcbiAgICB2YXIgY3N0Tm9kZSA9IHZvaWQgMDtcbiAgICBpZiAobm9kZSBpbnN0YW5jZW9mIEhUTUxFbGVtZW50ICYmIG5vZGUudGFnTmFtZS50b1VwcGVyQ2FzZSgpID09PSAnT1BUSU9OJyAmJiBzZWxlY3QuY29udGFpbnMobm9kZSkpIHtcbiAgICAgIGNzdE5vZGUgPSBub2RlLmN1c3RvbVNlbGVjdENzdE9wdGlvbjtcbiAgICB9IGVsc2UgaWYgKG5vZGUgaW5zdGFuY2VvZiBIVE1MRWxlbWVudCAmJiBub2RlLnRhZ05hbWUudG9VcHBlckNhc2UoKSA9PT0gJ09QVEdST1VQJyAmJiBzZWxlY3QuY29udGFpbnMobm9kZSkpIHtcbiAgICAgIGNzdE5vZGUgPSBub2RlLmN1c3RvbVNlbGVjdENzdE9wdGdyb3VwO1xuICAgIH0gZWxzZSB7XG4gICAgICB0aHJvdyBuZXcgVHlwZUVycm9yKCdJbnZhbGlkIEFyZ3VtZW50Jyk7XG4gICAgfVxuICAgIGNzdE5vZGUucGFyZW50Tm9kZS5yZW1vdmVDaGlsZChjc3ROb2RlKTtcbiAgICB2YXIgcmVtb3ZlZE5vZGUgPSBub2RlLnBhcmVudE5vZGUucmVtb3ZlQ2hpbGQobm9kZSk7XG4gICAgY2hhbmdlRXZlbnQoKTtcbiAgICByZXR1cm4gcmVtb3ZlZE5vZGU7XG4gIH1cblxuICBmdW5jdGlvbiBlbXB0eSgpIHtcbiAgICB2YXIgcmVtb3ZlZCA9IFtdO1xuICAgIHdoaWxlIChzZWxlY3QuY2hpbGRyZW4ubGVuZ3RoKSB7XG4gICAgICBwYW5lbC5yZW1vdmVDaGlsZChwYW5lbC5jaGlsZHJlblswXSk7XG4gICAgICByZW1vdmVkLnB1c2goc2VsZWN0LnJlbW92ZUNoaWxkKHNlbGVjdC5jaGlsZHJlblswXSkpO1xuICAgIH1cbiAgICBzZXRTZWxlY3RlZEVsZW1lbnQoKTtcbiAgICByZXR1cm4gcmVtb3ZlZDtcbiAgfVxuXG4gIGZ1bmN0aW9uIGRlc3Ryb3koKSB7XG4gICAgZm9yICh2YXIgaSA9IDAsIGwgPSBzZWxlY3Qub3B0aW9ucy5sZW5ndGg7IGkgPCBsOyBpKyspIHtcbiAgICAgIGRlbGV0ZSBzZWxlY3Qub3B0aW9uc1tpXS5jdXN0b21TZWxlY3RDc3RPcHRpb247XG4gICAgfVxuICAgIHZhciBvcHRHcm91cCA9IHNlbGVjdC5nZXRFbGVtZW50c0J5VGFnTmFtZSgnb3B0Z3JvdXAnKTtcbiAgICBmb3IgKHZhciBfaTIgPSAwLCBfbDIgPSBvcHRHcm91cC5sZW5ndGg7IF9pMiA8IF9sMjsgX2kyKyspIHtcbiAgICAgIGRlbGV0ZSBvcHRHcm91cC5jdXN0b21TZWxlY3RDc3RPcHRncm91cDtcbiAgICB9XG5cbiAgICByZW1vdmVFdmVudHMoKTtcblxuICAgIHJldHVybiBjb250YWluZXIucGFyZW50Tm9kZS5yZXBsYWNlQ2hpbGQoc2VsZWN0LCBjb250YWluZXIpO1xuICB9XG4gIC8vXG4gIC8vIEN1c3RvbSBTZWxlY3QgRE9NIHRyZWUgY3JlYXRpb25cbiAgLy9cblxuICAvLyBDcmVhdGVzIHRoZSBjb250YWluZXIvd3JhcHBlclxuICBjb250YWluZXIgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcbiAgY29udGFpbmVyLmNsYXNzTGlzdC5hZGQoYnVpbGRlclBhcmFtcy5jb250YWluZXJDbGFzcywgY29udGFpbmVyQ2xhc3MpO1xuXG4gIC8vIENyZWF0ZXMgdGhlIG9wZW5lclxuICBvcGVuZXIgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdzcGFuJyk7XG4gIG9wZW5lci5jbGFzc05hbWUgPSBidWlsZGVyUGFyYW1zLm9wZW5lckNsYXNzO1xuICBvcGVuZXIuc2V0QXR0cmlidXRlKCdyb2xlJywgJ2NvbWJvYm94Jyk7XG4gIG9wZW5lci5zZXRBdHRyaWJ1dGUoJ2FyaWEtYXV0b2NvbXBsZXRlJywgJ2xpc3QnKTtcbiAgb3BlbmVyLnNldEF0dHJpYnV0ZSgnYXJpYS1leHBhbmRlZCcsICdmYWxzZScpO1xuICBvcGVuZXIuaW5uZXJIVE1MID0gJzxzcGFuPlxcbiAgICcgKyAoc2VsZWN0LnNlbGVjdGVkSW5kZXggIT09IC0xID8gc2VsZWN0Lm9wdGlvbnNbc2VsZWN0LnNlbGVjdGVkSW5kZXhdLnRleHQgOiAnJykgKyAnXFxuICAgPC9zcGFuPic7XG5cbiAgLy8gQ3JlYXRlcyB0aGUgcGFuZWxcbiAgLy8gYW5kIGluamVjdHMgdGhlIG1hcmt1cCBvZiB0aGUgc2VsZWN0IGluc2lkZVxuICAvLyB3aXRoIHNvbWUgdGFnIGFuZCBhdHRyaWJ1dGVzIHJlcGxhY2VtZW50XG4gIHBhbmVsID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XG4gIC8vIENyZWF0ZSByYW5kb20gaWRcbiAgdmFyIHBvc3NpYmxlID0gJ0FCQ0RFRkdISUpLTE1OT1BRUlNUVVZXWFlaYWJjZGVmZ2hpamtsbW5vcHFyc3R1dnd4eXowMTIzNDU2Nzg5JztcbiAgZm9yICh2YXIgaSA9IDA7IGkgPCA1OyBpKyspIHtcbiAgICB1SWQgKz0gcG9zc2libGUuY2hhckF0KE1hdGguZmxvb3IoTWF0aC5yYW5kb20oKSAqIHBvc3NpYmxlLmxlbmd0aCkpO1xuICB9XG4gIHBhbmVsLmlkID0gY29udGFpbmVyQ2xhc3MgKyAnLScgKyB1SWQgKyAnLXBhbmVsJztcbiAgcGFuZWwuY2xhc3NOYW1lID0gYnVpbGRlclBhcmFtcy5wYW5lbENsYXNzO1xuICBwYW5lbC5zZXRBdHRyaWJ1dGUoJ3JvbGUnLCAnbGlzdGJveCcpO1xuICBvcGVuZXIuc2V0QXR0cmlidXRlKCdhcmlhLW93bnMnLCBwYW5lbC5pZCk7XG5cbiAgX2FwcGVuZChzZWxlY3QuY2hpbGRyZW4sIGZhbHNlKTtcblxuICAvLyBJbmplY3RzIHRoZSBjb250YWluZXIgaW4gdGhlIG9yaWdpbmFsIERPTSBwb3NpdGlvbiBvZiB0aGUgc2VsZWN0XG4gIGNvbnRhaW5lci5hcHBlbmRDaGlsZChvcGVuZXIpO1xuICBzZWxlY3QucGFyZW50Tm9kZS5yZXBsYWNlQ2hpbGQoY29udGFpbmVyLCBzZWxlY3QpO1xuICBjb250YWluZXIuYXBwZW5kQ2hpbGQoc2VsZWN0KTtcbiAgY29udGFpbmVyLmFwcGVuZENoaWxkKHBhbmVsKTtcblxuICAvLyBBUklBIGxhYmVsbGVkYnkgLSBsYWJlbFxuICBpZiAoZG9jdW1lbnQucXVlcnlTZWxlY3RvcignbGFiZWxbZm9yPVwiJyArIHNlbGVjdC5pZCArICdcIl0nKSkge1xuICAgIGN1cnJMYWJlbCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJ2xhYmVsW2Zvcj1cIicgKyBzZWxlY3QuaWQgKyAnXCJdJyk7XG4gIH0gZWxzZSBpZiAoY29udGFpbmVyLnBhcmVudE5vZGUudGFnTmFtZS50b1VwcGVyQ2FzZSgpID09PSAnTEFCRUwnKSB7XG4gICAgY3VyckxhYmVsID0gY29udGFpbmVyLnBhcmVudE5vZGU7XG4gIH1cbiAgaWYgKHR5cGVvZiBjdXJyTGFiZWwgIT09ICd1bmRlZmluZWQnKSB7XG4gICAgY3VyckxhYmVsLnNldEF0dHJpYnV0ZSgnaWQnLCBjb250YWluZXJDbGFzcyArICctJyArIHVJZCArICctbGFiZWwnKTtcbiAgICBvcGVuZXIuc2V0QXR0cmlidXRlKCdhcmlhLWxhYmVsbGVkYnknLCBjb250YWluZXJDbGFzcyArICctJyArIHVJZCArICctbGFiZWwnKTtcbiAgfVxuXG4gIC8vIEV2ZW50IEluaXRcbiAgaWYgKHNlbGVjdC5kaXNhYmxlZCkge1xuICAgIGNvbnRhaW5lci5jbGFzc0xpc3QuYWRkKGJ1aWxkZXJQYXJhbXMuaXNEaXNhYmxlZENsYXNzKTtcbiAgfSBlbHNlIHtcbiAgICBvcGVuZXIuc2V0QXR0cmlidXRlKCd0YWJpbmRleCcsICcwJyk7XG4gICAgc2VsZWN0LnNldEF0dHJpYnV0ZSgndGFiaW5kZXgnLCAnLTEnKTtcbiAgICBhZGRFdmVudHMoKTtcbiAgfVxuXG4gIC8vIFN0b3JlcyB0aGUgcGx1Z2luIHB1YmxpYyBleHBvc2VkIG1ldGhvZHMgYW5kIHByb3BlcnRpZXMsIGRpcmVjdGx5IGluIHRoZSBjb250YWluZXIgSFRNTEVsZW1lbnRcbiAgY29udGFpbmVyLmN1c3RvbVNlbGVjdCA9IHtcbiAgICBnZXQgcGx1Z2luT3B0aW9ucygpIHtcbiAgICAgIHJldHVybiBidWlsZGVyUGFyYW1zO1xuICAgIH0sXG4gICAgZ2V0IG9wZW4oKSB7XG4gICAgICByZXR1cm4gaXNPcGVuO1xuICAgIH0sXG4gICAgc2V0IG9wZW4oYm9vbCkge1xuICAgICAgb3Blbihib29sKTtcbiAgICB9LFxuICAgIGdldCBkaXNhYmxlZCgpIHtcbiAgICAgIHJldHVybiBzZWxlY3QuZGlzYWJsZWQ7XG4gICAgfSxcbiAgICBzZXQgZGlzYWJsZWQoYm9vbCkge1xuICAgICAgZGlzYWJsZWQoYm9vbCk7XG4gICAgfSxcbiAgICBnZXQgdmFsdWUoKSB7XG4gICAgICByZXR1cm4gc2VsZWN0LnZhbHVlO1xuICAgIH0sXG4gICAgc2V0IHZhbHVlKHZhbCkge1xuICAgICAgc2V0VmFsdWUodmFsKTtcbiAgICB9LFxuICAgIGFwcGVuZDogZnVuY3Rpb24gYXBwZW5kKG5vZGUsIHRhcmdldCkge1xuICAgICAgcmV0dXJuIF9hcHBlbmQobm9kZSwgdHJ1ZSwgdGFyZ2V0KTtcbiAgICB9LFxuICAgIGluc2VydEJlZm9yZTogZnVuY3Rpb24gaW5zZXJ0QmVmb3JlKG5vZGUsIHRhcmdldCkge1xuICAgICAgcmV0dXJuIF9pbnNlcnRCZWZvcmUobm9kZSwgdGFyZ2V0KTtcbiAgICB9LFxuICAgIHJlbW92ZTogcmVtb3ZlLFxuICAgIGVtcHR5OiBlbXB0eSxcbiAgICBkZXN0cm95OiBkZXN0cm95LFxuICAgIG9wZW5lcjogb3BlbmVyLFxuICAgIHNlbGVjdDogc2VsZWN0LFxuICAgIHBhbmVsOiBwYW5lbCxcbiAgICBjb250YWluZXI6IGNvbnRhaW5lclxuICB9O1xuXG4gIC8vIFN0b3JlcyB0aGUgcGx1Z2luIGRpcmVjdGx5IGluIHRoZSBvcmlnaW5hbCBzZWxlY3RcbiAgc2VsZWN0LmN1c3RvbVNlbGVjdCA9IGNvbnRhaW5lci5jdXN0b21TZWxlY3Q7XG5cbiAgLy8gUmV0dXJucyB0aGUgcGx1Z2luIGluc3RhbmNlLCB3aXRoIHRoZSBwdWJsaWMgZXhwb3NlZCBtZXRob2RzIGFuZCBwcm9wZXJ0aWVzXG4gIHJldHVybiBjb250YWluZXIuY3VzdG9tU2VsZWN0O1xufVxuXG5mdW5jdGlvbiBjdXN0b21TZWxlY3QoZWxlbWVudCwgY3VzdG9tUGFyYW1zKSB7XG4gIC8vIE92ZXJyaWRlcyB0aGUgZGVmYXVsdCBvcHRpb25zIHdpdGggdGhlIG9uZXMgcHJvdmlkZWQgYnkgdGhlIHVzZXJcbiAgdmFyIG5vZGVMaXN0ID0gW107XG4gIHZhciBzZWxlY3RzID0gW107XG5cbiAgcmV0dXJuIGZ1bmN0aW9uIGluaXQoKSB7XG4gICAgLy8gVGhlIHBsdWdpbiBpcyBjYWxsZWQgb24gYSBzaW5nbGUgSFRNTEVsZW1lbnRcbiAgICBpZiAoZWxlbWVudCAmJiBlbGVtZW50IGluc3RhbmNlb2YgSFRNTEVsZW1lbnQgJiYgZWxlbWVudC50YWdOYW1lLnRvVXBwZXJDYXNlKCkgPT09ICdTRUxFQ1QnKSB7XG4gICAgICBub2RlTGlzdC5wdXNoKGVsZW1lbnQpO1xuICAgICAgLy8gVGhlIHBsdWdpbiBpcyBjYWxsZWQgb24gYSBzZWxlY3RvclxuICAgIH0gZWxzZSBpZiAoZWxlbWVudCAmJiB0eXBlb2YgZWxlbWVudCA9PT0gJ3N0cmluZycpIHtcbiAgICAgIHZhciBlbGVtZW50c0xpc3QgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKGVsZW1lbnQpO1xuICAgICAgZm9yICh2YXIgaSA9IDAsIGwgPSBlbGVtZW50c0xpc3QubGVuZ3RoOyBpIDwgbDsgKytpKSB7XG4gICAgICAgIGlmIChlbGVtZW50c0xpc3RbaV0gaW5zdGFuY2VvZiBIVE1MRWxlbWVudCAmJiBlbGVtZW50c0xpc3RbaV0udGFnTmFtZS50b1VwcGVyQ2FzZSgpID09PSAnU0VMRUNUJykge1xuICAgICAgICAgIG5vZGVMaXN0LnB1c2goZWxlbWVudHNMaXN0W2ldKTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgICAgLy8gVGhlIHBsdWdpbiBpcyBjYWxsZWQgb24gYW55IEhUTUxFbGVtZW50cyBsaXN0IChOb2RlTGlzdCwgSFRNTENvbGxlY3Rpb24sIEFycmF5LCBldGMuKVxuICAgIH0gZWxzZSBpZiAoZWxlbWVudCAmJiBlbGVtZW50Lmxlbmd0aCkge1xuICAgICAgZm9yICh2YXIgX2kzID0gMCwgX2wzID0gZWxlbWVudC5sZW5ndGg7IF9pMyA8IF9sMzsgKytfaTMpIHtcbiAgICAgICAgaWYgKGVsZW1lbnRbX2kzXSBpbnN0YW5jZW9mIEhUTUxFbGVtZW50ICYmIGVsZW1lbnRbX2kzXS50YWdOYW1lLnRvVXBwZXJDYXNlKCkgPT09ICdTRUxFQ1QnKSB7XG4gICAgICAgICAgbm9kZUxpc3QucHVzaChlbGVtZW50W19pM10pO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuXG4gICAgLy8gTGF1bmNoZXMgdGhlIHBsdWdpbiBvdmVyIGV2ZXJ5IEhUTUxFbGVtZW50XG4gICAgLy8gQW5kIHN0b3JlcyBldmVyeSBwbHVnaW4gaW5zdGFuY2VcbiAgICBmb3IgKHZhciBfaTQgPSAwLCBfbDQgPSBub2RlTGlzdC5sZW5ndGg7IF9pNCA8IF9sNDsgKytfaTQpIHtcbiAgICAgIHNlbGVjdHMucHVzaChidWlsZGVyKG5vZGVMaXN0W19pNF0sIF9leHRlbmRzKHt9LCBkZWZhdWx0UGFyYW1zLCBjdXN0b21QYXJhbXMpKSk7XG4gICAgfVxuXG4gICAgLy8gUmV0dXJucyBhbGwgcGx1Z2luIGluc3RhbmNlc1xuICAgIHJldHVybiBzZWxlY3RzO1xuICB9KCk7XG59XG5cbi8vIyBzb3VyY2VNYXBwaW5nVVJMPWluZGV4LmpzLm1hcCIsImV4cG9ydCBkZWZhdWx0IHNlbGVjdG9yID0+IHtcclxuICBjb25zdCBhY2NvcmRpb24gPSBzZWxlY3RvciA/IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3Ioc2VsZWN0b3IpIDogZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLmFjY29yZGlvbicpXHJcblxyXG4gIGNvbnN0IGFjY29yZGlvbkl0ZW1zID0gYWNjb3JkaW9uLnF1ZXJ5U2VsZWN0b3JBbGwoJy5hY2NvcmRpb25fX2l0ZW0nKVxyXG5cclxuICBhY2NvcmRpb25JdGVtcy5mb3JFYWNoKGl0ZW0gPT4ge1xyXG4gICAgaXRlbS5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIChlKSA9PiB7XHJcblxyXG4gICAgICBpZiAoaXRlbS5jbGFzc0xpc3QuY29udGFpbnMoJ2FjdGl2ZScpKSB7XHJcbiAgICAgICAgaXRlbS5jbGFzc0xpc3QucmVtb3ZlKCdhY3RpdmUnKVxyXG4gICAgICAgIHJldHVyblxyXG4gICAgICB9XHJcblxyXG4gICAgICBhY2NvcmRpb25JdGVtcy5mb3JFYWNoKGl0ZW0gPT4gaXRlbS5jbGFzc0xpc3QucmVtb3ZlKCdhY3RpdmUnKSlcclxuICAgICAgaXRlbS5jbGFzc0xpc3QuYWRkKCdhY3RpdmUnKVxyXG4gICAgfSlcclxuICB9KVxyXG5cclxufSIsImV4cG9ydCBkZWZhdWx0IChpdGVtLCBjYikgPT4ge1xyXG4gIHdpbmRvdy5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIGUgPT4ge1xyXG4gICAgaWYgKCEoaXRlbS5jb250YWlucyhlLnRhcmdldCkgfHwgZS50YXJnZXQgPT09IGl0ZW0pKSB7XHJcbiAgICAgIGNiKClcclxuICAgIH1cclxuICB9KVxyXG59IiwiZXhwb3J0IGRlZmF1bHQgaW5wdXQgPT4ge1xyXG4gIGlucHV0LmFkZEV2ZW50TGlzdGVuZXIoJ2tleXByZXNzJywgZnVuY3Rpb24oZSkge1xyXG4gICAgaWYoZS5rZXlDb2RlIDwgNDcgfHwgZS5rZXlDb2RlID4gNTcpIHtcclxuICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xyXG4gICAgfVxyXG4gICAgXHJcbiAgICBjb25zdCBsZW4gPSBpbnB1dC52YWx1ZS5sZW5ndGg7XHJcbiAgICBcclxuICAgIFxyXG4gICAgaWYobGVuICE9PSAxIHx8IGxlbiAhPT0gMykge1xyXG4gICAgICBpZihlLmtleUNvZGUgPT0gNDcpIHtcclxuICAgICAgICBlLnByZXZlbnREZWZhdWx0KCk7XHJcbiAgICAgIH1cclxuICAgIH1cclxuICAgIFxyXG4gICAgaWYobGVuID09PSAyKSB7XHJcbiAgICAgIGlucHV0LnZhbHVlICs9ICcuJztcclxuICAgIH1cclxuXHJcbiAgICBpZihsZW4gPT09IDUpIHtcclxuICAgICAgaW5wdXQudmFsdWUgKz0gJy4nO1xyXG4gICAgfVxyXG5cclxuICAgIGlmKGxlbiA+IDkpIGUucHJldmVudERlZmF1bHQoKVxyXG4gIH0pO1xyXG59OyIsImNvbnN0IGluaXRJbm5lckRyb3Bkb3duID0gaXRlbSA9PiB7XHJcbiAgY29uc3QgdHJpZ2dlciA9IGl0ZW0ucXVlcnlTZWxlY3RvcignLnN1Ym1lbnVfX3RyaWdnZXInKVxyXG5cclxuICB0cmlnZ2VyLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgKGUpID0+IHtcclxuICAgIGUuc3RvcFByb3BhZ2F0aW9uKClcclxuICAgIGl0ZW0uY2xhc3NMaXN0LnRvZ2dsZSgnYWN0aXZlJylcclxuICB9KVxyXG5cclxuICBpdGVtLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgZSA9PiB7XHJcbiAgICBlLnN0b3BQcm9wYWdhdGlvbigpXHJcbiAgfSlcclxufVxyXG5cclxuY29uc3QgaXNEcm9wZG93biA9IGl0ZW0gPT4gaXRlbS5jbGFzc0xpc3QuY29udGFpbnMoJ3N1Ym1lbnUnKVxyXG5cclxuZXhwb3J0IGRlZmF1bHQgKCkgPT4ge1xyXG4gIGNvbnN0IGNvbGxlY3Rpb24gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKCcubWVudS1pdGVtJylcclxuIFxyXG4gIGNvbGxlY3Rpb24uZm9yRWFjaChpdGVtID0+IHtcclxuXHJcbiAgICBpZiAoIWlzRHJvcGRvd24oaXRlbSkpIHtcclxuICAgICAgaXRlbS5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsICgpID0+IHtcclxuICAgICAgICBjb2xsZWN0aW9uLmZvckVhY2goaXRlbSA9PiB7XHJcbiAgICAgICAgICBpZighaXNEcm9wZG93bihpdGVtKSlcclxuICAgICAgICAgICAgaXRlbS5jbGFzc0xpc3QucmVtb3ZlKCdhY3RpdmUnKVxyXG4gICAgICAgICAgfSlcclxuICAgICAgICBpdGVtLmNsYXNzTGlzdC5hZGQoJ2FjdGl2ZScpXHJcbiAgICAgIH0pXHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICBpbml0SW5uZXJEcm9wZG93bihpdGVtKVxyXG4gICAgfVxyXG4gIH0pXHJcbn0iLCJleHBvcnQgZGVmYXVsdCBjbGFzcyBNb2RhbCB7XHJcbiAgY29uc3RydWN0b3Ioc2VsZWN0b3IgPSAnJykge1xyXG4gICAgaWYgKHNlbGVjdG9yKSB7XHJcbiAgICAgIHRoaXMubW9kYWwgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKHNlbGVjdG9yKVxyXG4gICAgfSBlbHNlIHtcclxuICAgICAgdGhpcy5tb2RhbCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5tb2RhbCcpXHJcbiAgICB9XHJcbiAgICAvLyBpbml0IG1vZGFsXHJcbiAgICBjb25zdCBkaWFsb2cgPSB0aGlzLm1vZGFsLnF1ZXJ5U2VsZWN0b3IoJy5tb2RhbF9fZGlhbG9nJylcclxuICAgIGNvbnN0IGNsb3NlQnRuID0gdGhpcy5tb2RhbC5xdWVyeVNlbGVjdG9yKCcubW9kYWxfX2Nsb3NlJylcclxuXHJcbiAgICAvLyBvdmVybGF5IGNsaWNrXHJcbiAgICBpZiAoZGlhbG9nKSB7XHJcbiAgICAgIHRoaXMubW9kYWwuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCBlID0+IHtcclxuICAgICAgICBpZihlLnRhcmdldCA9PT0gdGhpcy5tb2RhbCkgdGhpcy5jbG9zZSgpXHJcbiAgICAgIH0pXHJcbiAgICB9XHJcblxyXG4gICAgY2xvc2VCdG4uYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCAoKSA9PiB0aGlzLmNsb3NlKCkpXHJcbiAgfVxyXG5cclxuICBvcGVuKCkge1xyXG4gICAgY29uc29sZS5sb2codGhpcy5tb2RhbClcclxuICAgIHRoaXMubW9kYWwuY2xhc3NMaXN0LmFkZCgnb3BlbicpXHJcbiAgfVxyXG5cclxuICBjbG9zZSgpIHtcclxuICAgIHRoaXMubW9kYWwuY2xhc3NMaXN0LnJlbW92ZSgnb3BlbicpXHJcbiAgfVxyXG59IiwiaW1wb3J0IGN1c3RvbVNlbGVjdCBmcm9tICdjdXN0b20tc2VsZWN0J1xyXG5cclxuY29uc3QgY29uZmlnID0ge1xyXG4gIGNvbnRhaW5lckNsYXNzOiAnanMtc2VsZWN0JyxcclxuICBvcGVuZXJDbGFzczogJ2pzLXNlbGVjdF9fb3BlbmVyIHBsdWcnLFxyXG4gIHBhbmVsQ2xhc3M6ICdqcy1zZWxlY3RfX3BhbmVsJyxcclxuICBvcHRpb25DbGFzczogJ2pzLXNlbGVjdF9fb3B0aW9uJyxcclxuICAvLyBvcHRncm91cENsYXNzOiAnc2VsZWN0X19vcHRncm91cCcsXHJcbiAgaXNTZWxlY3RlZENsYXNzOiAnc2VsZWN0ZWQnLFxyXG4gIGhhc0ZvY3VzQ2xhc3M6ICdmb2N1c2VkJyxcclxuICBpc0Rpc2FibGVkQ2xhc3M6ICdkaXNhYmxlZCcsXHJcbiAgaXNPcGVuQ2xhc3M6ICdvcGVuJ1xyXG59XHJcblxyXG5mdW5jdGlvbiBhZGRMaXN0ZW5lcnMoc2VsZWN0LCBpLCBzZWxlY3RpemVkKSB7XHJcblxyXG4gIHNlbGVjdC5vcGVuZXIuYWRkRXZlbnRMaXN0ZW5lcignZm9jdXMnLCAoZSkgPT4ge1xyXG4gICAgaWYgKHNlbGVjdGl6ZWQpIHtcclxuICAgICAgc2VsZWN0aXplZC5mb3JFYWNoKChzZWxlY3QpID0+IHtcclxuICAgICAgICBzZWxlY3Qub3BlbiA9IGZhbHNlXHJcbiAgICAgIH0pXHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICBzZWxlY3Qub3BlbiA9IGZhbHNlXHJcbiAgICB9XHJcbiAgfSlcclxuXHJcbiAgc2VsZWN0LnNlbGVjdC5hZGRFdmVudExpc3RlbmVyKCdjaGFuZ2UnLCAoZSkgPT4ge1xyXG4gICAgaWYgKGUudGFyZ2V0LnZhbHVlKSB7XHJcbiAgICAgIHNlbGVjdC5vcGVuZXIuY2xhc3NMaXN0LnJlbW92ZSgncGx1ZycpXHJcbiAgICB9XHJcbiAgfSlcclxufVxyXG5cclxuZXhwb3J0IGRlZmF1bHQgbm9kZSA9PiB7XHJcbiAgY29uc3Qgc2VsZWN0aXplZCA9IGN1c3RvbVNlbGVjdChub2RlLCBjb25maWcpXHJcblxyXG4gIGlmIChzZWxlY3RpemVkIGluc3RhbmNlb2YgQXJyYXkpXHJcbiAgICBzZWxlY3RpemVkLmZvckVhY2goYWRkTGlzdGVuZXJzKVxyXG4gIGVsc2VcclxuICAgIGFkZExpc3RlbmVycyhzZWxlY3RpemVkKVxyXG5cclxuICByZXR1cm4gc2VsZWN0aXplZFxyXG59IiwiZXhwb3J0IGRlZmF1bHQgc2VsZWN0b3IgPT4ge1xyXG4gIGNvbnN0IHRhYnMgPSBzZWxlY3RvciA/IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3Ioc2VsZWN0b3IpIDogZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLnRhYnMnKVxyXG5cclxuICBjb25zdCB0YWJzSXRlbXMgPSB0YWJzLnF1ZXJ5U2VsZWN0b3JBbGwoJy50YWJzX19pdGVtJylcclxuXHJcbiAgdGFic0l0ZW1zLmZvckVhY2goaXRlbSA9PiB7XHJcbiAgICBpdGVtLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgKGUpID0+IHtcclxuICAgICAgaWYgKGUudGFyZ2V0LnRhZ05hbWUgPT09ICdBJykge1xyXG4gICAgICAgIGUucHJldmVudERlZmF1bHQoKVxyXG4gICAgICB9XHJcblxyXG4gICAgICB0YWJzSXRlbXMuZm9yRWFjaChpdGVtID0+IGl0ZW0uY2xhc3NMaXN0LnJlbW92ZSgnYWN0aXZlJykpXHJcbiAgICAgIGl0ZW0uY2xhc3NMaXN0LmFkZCgnYWN0aXZlJylcclxuICAgIH0pXHJcbiAgfSlcclxuXHJcbiAgcmV0dXJuIHRhYnNcclxufSIsIi8vIFRoZSBtb2R1bGUgY2FjaGVcbnZhciBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX18gPSB7fTtcblxuLy8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbmZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG5cdHZhciBjYWNoZWRNb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdO1xuXHRpZiAoY2FjaGVkTW9kdWxlICE9PSB1bmRlZmluZWQpIHtcblx0XHRyZXR1cm4gY2FjaGVkTW9kdWxlLmV4cG9ydHM7XG5cdH1cblx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcblx0dmFyIG1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF0gPSB7XG5cdFx0Ly8gbm8gbW9kdWxlLmlkIG5lZWRlZFxuXHRcdC8vIG5vIG1vZHVsZS5sb2FkZWQgbmVlZGVkXG5cdFx0ZXhwb3J0czoge31cblx0fTtcblxuXHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cblx0X193ZWJwYWNrX21vZHVsZXNfX1ttb2R1bGVJZF0obW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cblx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcblx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xufVxuXG4vLyBleHBvc2UgdGhlIG1vZHVsZXMgb2JqZWN0IChfX3dlYnBhY2tfbW9kdWxlc19fKVxuX193ZWJwYWNrX3JlcXVpcmVfXy5tID0gX193ZWJwYWNrX21vZHVsZXNfXztcblxuIiwidmFyIGRlZmVycmVkID0gW107XG5fX3dlYnBhY2tfcmVxdWlyZV9fLk8gPSAocmVzdWx0LCBjaHVua0lkcywgZm4sIHByaW9yaXR5KSA9PiB7XG5cdGlmKGNodW5rSWRzKSB7XG5cdFx0cHJpb3JpdHkgPSBwcmlvcml0eSB8fCAwO1xuXHRcdGZvcih2YXIgaSA9IGRlZmVycmVkLmxlbmd0aDsgaSA+IDAgJiYgZGVmZXJyZWRbaSAtIDFdWzJdID4gcHJpb3JpdHk7IGktLSkgZGVmZXJyZWRbaV0gPSBkZWZlcnJlZFtpIC0gMV07XG5cdFx0ZGVmZXJyZWRbaV0gPSBbY2h1bmtJZHMsIGZuLCBwcmlvcml0eV07XG5cdFx0cmV0dXJuO1xuXHR9XG5cdHZhciBub3RGdWxmaWxsZWQgPSBJbmZpbml0eTtcblx0Zm9yICh2YXIgaSA9IDA7IGkgPCBkZWZlcnJlZC5sZW5ndGg7IGkrKykge1xuXHRcdHZhciBbY2h1bmtJZHMsIGZuLCBwcmlvcml0eV0gPSBkZWZlcnJlZFtpXTtcblx0XHR2YXIgZnVsZmlsbGVkID0gdHJ1ZTtcblx0XHRmb3IgKHZhciBqID0gMDsgaiA8IGNodW5rSWRzLmxlbmd0aDsgaisrKSB7XG5cdFx0XHRpZiAoKHByaW9yaXR5ICYgMSA9PT0gMCB8fCBub3RGdWxmaWxsZWQgPj0gcHJpb3JpdHkpICYmIE9iamVjdC5rZXlzKF9fd2VicGFja19yZXF1aXJlX18uTykuZXZlcnkoKGtleSkgPT4gKF9fd2VicGFja19yZXF1aXJlX18uT1trZXldKGNodW5rSWRzW2pdKSkpKSB7XG5cdFx0XHRcdGNodW5rSWRzLnNwbGljZShqLS0sIDEpO1xuXHRcdFx0fSBlbHNlIHtcblx0XHRcdFx0ZnVsZmlsbGVkID0gZmFsc2U7XG5cdFx0XHRcdGlmKHByaW9yaXR5IDwgbm90RnVsZmlsbGVkKSBub3RGdWxmaWxsZWQgPSBwcmlvcml0eTtcblx0XHRcdH1cblx0XHR9XG5cdFx0aWYoZnVsZmlsbGVkKSB7XG5cdFx0XHRkZWZlcnJlZC5zcGxpY2UoaS0tLCAxKVxuXHRcdFx0dmFyIHIgPSBmbigpO1xuXHRcdFx0aWYgKHIgIT09IHVuZGVmaW5lZCkgcmVzdWx0ID0gcjtcblx0XHR9XG5cdH1cblx0cmV0dXJuIHJlc3VsdDtcbn07IiwiLy8gZGVmaW5lIGdldHRlciBmdW5jdGlvbnMgZm9yIGhhcm1vbnkgZXhwb3J0c1xuX193ZWJwYWNrX3JlcXVpcmVfXy5kID0gKGV4cG9ydHMsIGRlZmluaXRpb24pID0+IHtcblx0Zm9yKHZhciBrZXkgaW4gZGVmaW5pdGlvbikge1xuXHRcdGlmKF9fd2VicGFja19yZXF1aXJlX18ubyhkZWZpbml0aW9uLCBrZXkpICYmICFfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZXhwb3J0cywga2V5KSkge1xuXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIGtleSwgeyBlbnVtZXJhYmxlOiB0cnVlLCBnZXQ6IGRlZmluaXRpb25ba2V5XSB9KTtcblx0XHR9XG5cdH1cbn07IiwiX193ZWJwYWNrX3JlcXVpcmVfXy5vID0gKG9iaiwgcHJvcCkgPT4gKE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvYmosIHByb3ApKSIsIi8vIGRlZmluZSBfX2VzTW9kdWxlIG9uIGV4cG9ydHNcbl9fd2VicGFja19yZXF1aXJlX18uciA9IChleHBvcnRzKSA9PiB7XG5cdGlmKHR5cGVvZiBTeW1ib2wgIT09ICd1bmRlZmluZWQnICYmIFN5bWJvbC50b1N0cmluZ1RhZykge1xuXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBTeW1ib2wudG9TdHJpbmdUYWcsIHsgdmFsdWU6ICdNb2R1bGUnIH0pO1xuXHR9XG5cdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCAnX19lc01vZHVsZScsIHsgdmFsdWU6IHRydWUgfSk7XG59OyIsIi8vIG5vIGJhc2VVUklcblxuLy8gb2JqZWN0IHRvIHN0b3JlIGxvYWRlZCBhbmQgbG9hZGluZyBjaHVua3Ncbi8vIHVuZGVmaW5lZCA9IGNodW5rIG5vdCBsb2FkZWQsIG51bGwgPSBjaHVuayBwcmVsb2FkZWQvcHJlZmV0Y2hlZFxuLy8gW3Jlc29sdmUsIHJlamVjdCwgUHJvbWlzZV0gPSBjaHVuayBsb2FkaW5nLCAwID0gY2h1bmsgbG9hZGVkXG52YXIgaW5zdGFsbGVkQ2h1bmtzID0ge1xuXHRcInV0aWxzXCI6IDBcbn07XG5cbi8vIG5vIGNodW5rIG9uIGRlbWFuZCBsb2FkaW5nXG5cbi8vIG5vIHByZWZldGNoaW5nXG5cbi8vIG5vIHByZWxvYWRlZFxuXG4vLyBubyBITVJcblxuLy8gbm8gSE1SIG1hbmlmZXN0XG5cbl9fd2VicGFja19yZXF1aXJlX18uTy5qID0gKGNodW5rSWQpID0+IChpbnN0YWxsZWRDaHVua3NbY2h1bmtJZF0gPT09IDApO1xuXG4vLyBpbnN0YWxsIGEgSlNPTlAgY2FsbGJhY2sgZm9yIGNodW5rIGxvYWRpbmdcbnZhciB3ZWJwYWNrSnNvbnBDYWxsYmFjayA9IChwYXJlbnRDaHVua0xvYWRpbmdGdW5jdGlvbiwgZGF0YSkgPT4ge1xuXHR2YXIgW2NodW5rSWRzLCBtb3JlTW9kdWxlcywgcnVudGltZV0gPSBkYXRhO1xuXHQvLyBhZGQgXCJtb3JlTW9kdWxlc1wiIHRvIHRoZSBtb2R1bGVzIG9iamVjdCxcblx0Ly8gdGhlbiBmbGFnIGFsbCBcImNodW5rSWRzXCIgYXMgbG9hZGVkIGFuZCBmaXJlIGNhbGxiYWNrXG5cdHZhciBtb2R1bGVJZCwgY2h1bmtJZCwgaSA9IDA7XG5cdGlmKGNodW5rSWRzLnNvbWUoKGlkKSA9PiAoaW5zdGFsbGVkQ2h1bmtzW2lkXSAhPT0gMCkpKSB7XG5cdFx0Zm9yKG1vZHVsZUlkIGluIG1vcmVNb2R1bGVzKSB7XG5cdFx0XHRpZihfX3dlYnBhY2tfcmVxdWlyZV9fLm8obW9yZU1vZHVsZXMsIG1vZHVsZUlkKSkge1xuXHRcdFx0XHRfX3dlYnBhY2tfcmVxdWlyZV9fLm1bbW9kdWxlSWRdID0gbW9yZU1vZHVsZXNbbW9kdWxlSWRdO1xuXHRcdFx0fVxuXHRcdH1cblx0XHRpZihydW50aW1lKSB2YXIgcmVzdWx0ID0gcnVudGltZShfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblx0fVxuXHRpZihwYXJlbnRDaHVua0xvYWRpbmdGdW5jdGlvbikgcGFyZW50Q2h1bmtMb2FkaW5nRnVuY3Rpb24oZGF0YSk7XG5cdGZvcig7aSA8IGNodW5rSWRzLmxlbmd0aDsgaSsrKSB7XG5cdFx0Y2h1bmtJZCA9IGNodW5rSWRzW2ldO1xuXHRcdGlmKF9fd2VicGFja19yZXF1aXJlX18ubyhpbnN0YWxsZWRDaHVua3MsIGNodW5rSWQpICYmIGluc3RhbGxlZENodW5rc1tjaHVua0lkXSkge1xuXHRcdFx0aW5zdGFsbGVkQ2h1bmtzW2NodW5rSWRdWzBdKCk7XG5cdFx0fVxuXHRcdGluc3RhbGxlZENodW5rc1tjaHVua0lkXSA9IDA7XG5cdH1cblx0cmV0dXJuIF9fd2VicGFja19yZXF1aXJlX18uTyhyZXN1bHQpO1xufVxuXG52YXIgY2h1bmtMb2FkaW5nR2xvYmFsID0gc2VsZltcIndlYnBhY2tDaHVua180dHJvY2tldF9kYXNoYm9hcmRcIl0gPSBzZWxmW1wid2VicGFja0NodW5rXzR0cm9ja2V0X2Rhc2hib2FyZFwiXSB8fCBbXTtcbmNodW5rTG9hZGluZ0dsb2JhbC5mb3JFYWNoKHdlYnBhY2tKc29ucENhbGxiYWNrLmJpbmQobnVsbCwgMCkpO1xuY2h1bmtMb2FkaW5nR2xvYmFsLnB1c2ggPSB3ZWJwYWNrSnNvbnBDYWxsYmFjay5iaW5kKG51bGwsIGNodW5rTG9hZGluZ0dsb2JhbC5wdXNoLmJpbmQoY2h1bmtMb2FkaW5nR2xvYmFsKSk7IiwiIiwiLy8gc3RhcnR1cFxuLy8gTG9hZCBlbnRyeSBtb2R1bGUgYW5kIHJldHVybiBleHBvcnRzXG4vLyBUaGlzIGVudHJ5IG1vZHVsZSBpcyByZWZlcmVuY2VkIGJ5IG90aGVyIG1vZHVsZXMgc28gaXQgY2FuJ3QgYmUgaW5saW5lZFxuX193ZWJwYWNrX3JlcXVpcmVfXyhcIi4vc3JjL2pzL3V0aWxzL2FjY29yZGlvbi5qc1wiKTtcbl9fd2VicGFja19yZXF1aXJlX18oXCIuL3NyYy9qcy91dGlscy9jbGlja091dHNpZGUuanNcIik7XG5fX3dlYnBhY2tfcmVxdWlyZV9fKFwiLi9zcmMvanMvdXRpbHMvZGF0ZW1hc2suanNcIik7XG5fX3dlYnBhY2tfcmVxdWlyZV9fKFwiLi9zcmMvanMvdXRpbHMvbWVudS5qc1wiKTtcbl9fd2VicGFja19yZXF1aXJlX18oXCIuL3NyYy9qcy91dGlscy9tb2RhbC5qc1wiKTtcbl9fd2VicGFja19yZXF1aXJlX18oXCIuL3NyYy9qcy91dGlscy9zZWxlY3RpemUuanNcIik7XG52YXIgX193ZWJwYWNrX2V4cG9ydHNfXyA9IF9fd2VicGFja19yZXF1aXJlX18oXCIuL3NyYy9qcy91dGlscy90YWJzLmpzXCIpO1xuX193ZWJwYWNrX2V4cG9ydHNfXyA9IF9fd2VicGFja19yZXF1aXJlX18uTyhfX3dlYnBhY2tfZXhwb3J0c19fKTtcbiIsIiJdLCJuYW1lcyI6W10sInNvdXJjZVJvb3QiOiIifQ==