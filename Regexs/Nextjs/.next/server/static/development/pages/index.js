module.exports =
/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = require('../../../ssr-module-cache.js');
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
/******/ 		var threw = true;
/******/ 		try {
/******/ 			modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/ 			threw = false;
/******/ 		} finally {
/******/ 			if(threw) delete installedModules[moduleId];
/******/ 		}
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
/******/ 	return __webpack_require__(__webpack_require__.s = 4);
/******/ })
/************************************************************************/
/******/ ({

/***/ "./src/components/nenchoHeader.tsx":
/*!*****************************************!*\
  !*** ./src/components/nenchoHeader.tsx ***!
  \*****************************************/
/*! exports provided: NenchoHeader, default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "NenchoHeader", function() { return NenchoHeader; });
/* harmony import */ var styled_jsx_style__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! styled-jsx/style */ "styled-jsx/style");
/* harmony import */ var styled_jsx_style__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(styled_jsx_style__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _styles_label__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../styles/label */ "./src/styles/label.tsx");
var _jsxFileName = "C:\\Users\\lenovo\\source\\repos\\TypeScript\\src\\components\\nenchoHeader.tsx";

var __jsx = react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement;


const NenchoHeader = () => {
  return __jsx(react__WEBPACK_IMPORTED_MODULE_1___default.a.Fragment, null, __jsx("header", {
    className: "jsx-3896166723" + " " + "page-header",
    __source: {
      fileName: _jsxFileName,
      lineNumber: 7
    },
    __self: undefined
  }, __jsx(_styles_label__WEBPACK_IMPORTED_MODULE_2__["StyledTitle"], {
    __source: {
      fileName: _jsxFileName,
      lineNumber: 8
    },
    __self: undefined
  }, __jsx("div", {
    className: "jsx-3896166723" + " " + "page-title",
    __source: {
      fileName: _jsxFileName,
      lineNumber: 9
    },
    __self: undefined
  }, "2020\u5E74\u5206\u5E74\u672B\u8ABF\u6574")), __jsx(styled_jsx_style__WEBPACK_IMPORTED_MODULE_0___default.a, {
    id: "3896166723",
    __self: undefined
  }, ".page-header.jsx-3896166723{background:#edf4fa;position:fixed;width:100%;height:72px;margin:0;z-index:1;}.page-title.jsx-3896166723{position:absolute;top:16px;right:16px;left:16px;padding-top:20px;padding-bottom:12px;width:(97% - 37.984px);border-radius:8px 8px 0px 0px;background:#ffffff;}\n/*# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIkM6XFxVc2Vyc1xcbGVub3ZvXFxzb3VyY2VcXHJlcG9zXFxUeXBlU2NyaXB0XFxzcmNcXGNvbXBvbmVudHNcXG5lbmNob0hlYWRlci50c3giXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBV1csQUFHa0MsQUFRRCxrQkFDVCxDQVJNLFFBU0osT0FSQSxJQVNELE9BUkUsR0FTSyxTQVJSLFFBU1csQ0FSVixVQUNaLFNBUXlCLHVCQUNPLDhCQUNYLG1CQUNyQiIsImZpbGUiOiJDOlxcVXNlcnNcXGxlbm92b1xcc291cmNlXFxyZXBvc1xcVHlwZVNjcmlwdFxcc3JjXFxjb21wb25lbnRzXFxuZW5jaG9IZWFkZXIudHN4Iiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IFJlYWN0IGZyb20gXCJyZWFjdFwiO1xuaW1wb3J0IHsgU3R5bGVkVGl0bGUgfSBmcm9tIFwiLi4vc3R5bGVzL2xhYmVsXCI7XG5cbmV4cG9ydCBjb25zdCBOZW5jaG9IZWFkZXI6IFJlYWN0LkZDID0gKCkgPT4ge1xuICByZXR1cm4gKFxuICAgIDw+XG4gICAgICA8aGVhZGVyIGNsYXNzTmFtZT1cInBhZ2UtaGVhZGVyXCI+XG4gICAgICAgIDxTdHlsZWRUaXRsZT5cbiAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cInBhZ2UtdGl0bGVcIj4yMDIw5bm05YiG5bm05pyr6Kq/5pW0PC9kaXY+XG4gICAgICAgIDwvU3R5bGVkVGl0bGU+XG4gICAgICAgIDxzdHlsZSBqc3g+XG4gICAgICAgICAge2BcbiAgICAgICAgICAgIC5wYWdlLWhlYWRlciB7XG4gICAgICAgICAgICAgIGJhY2tncm91bmQ6ICNlZGY0ZmE7XG4gICAgICAgICAgICAgIHBvc2l0aW9uOiBmaXhlZDtcbiAgICAgICAgICAgICAgd2lkdGg6IDEwMCU7XG4gICAgICAgICAgICAgIGhlaWdodDogNzJweDtcbiAgICAgICAgICAgICAgbWFyZ2luOiAwO1xuICAgICAgICAgICAgICB6LWluZGV4OiAxO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgLnBhZ2UtdGl0bGUge1xuICAgICAgICAgICAgICBwb3NpdGlvbjogYWJzb2x1dGU7XG4gICAgICAgICAgICAgIHRvcDogMTZweDtcbiAgICAgICAgICAgICAgcmlnaHQ6IDE2cHg7XG4gICAgICAgICAgICAgIGxlZnQ6IDE2cHg7XG4gICAgICAgICAgICAgIHBhZGRpbmctdG9wOiAyMHB4O1xuICAgICAgICAgICAgICBwYWRkaW5nLWJvdHRvbTogMTJweDtcbiAgICAgICAgICAgICAgd2lkdGg6ICg5NyUgLSAzNy45ODRweCk7XG4gICAgICAgICAgICAgIGJvcmRlci1yYWRpdXM6IDhweCA4cHggMHB4IDBweDtcbiAgICAgICAgICAgICAgYmFja2dyb3VuZDogI2ZmZmZmZjtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICBgfVxuICAgICAgICA8L3N0eWxlPlxuICAgICAgPC9oZWFkZXI+XG4gICAgICA8ZGl2IHN0eWxlPXt7IHdpZHRoOiBcIjEwMCVcIiwgaGVpZ2h0OiBcIjcycHhcIiB9fSAvPlxuICAgIDwvPlxuICApO1xufTtcblxuZXhwb3J0IGRlZmF1bHQgTmVuY2hvSGVhZGVyO1xuIl19 */\n/*@ sourceURL=C:\\\\Users\\\\lenovo\\\\source\\\\repos\\\\TypeScript\\\\src\\\\components\\\\nenchoHeader.tsx */")), __jsx("div", {
    style: {
      width: "100%",
      height: "72px"
    },
    __source: {
      fileName: _jsxFileName,
      lineNumber: 35
    },
    __self: undefined
  }));
};
/* harmony default export */ __webpack_exports__["default"] = (NenchoHeader);

/***/ }),

/***/ "./src/components/nenchoList.tsx":
/*!***************************************!*\
  !*** ./src/components/nenchoList.tsx ***!
  \***************************************/
/*! exports provided: NenchoListItem */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "NenchoListItem", function() { return NenchoListItem; });
/* harmony import */ var styled_jsx_style__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! styled-jsx/style */ "styled-jsx/style");
/* harmony import */ var styled_jsx_style__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(styled_jsx_style__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _styles_listCommon__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../styles/listCommon */ "./src/styles/listCommon.tsx");
var _jsxFileName = "C:\\Users\\lenovo\\source\\repos\\TypeScript\\src\\components\\nenchoList.tsx";

var __jsx = react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement;


const statusColor = ["#FFFFFF", "#FFFFFF", "#FFFFFF"];
const statusName = ["未入力", "入力済み", "修正してください"]; // FIXME:共通のCSSなどで対応？

const NenchoListItem = props => {
  return __jsx(react__WEBPACK_IMPORTED_MODULE_1___default.a.Fragment, null, __jsx("div", {
    className: styled_jsx_style__WEBPACK_IMPORTED_MODULE_0___default.a.dynamic([["2602658244", [statusColor[props.status]]]]) + " " + "nencholist-item",
    __source: {
      fileName: _jsxFileName,
      lineNumber: 17
    },
    __self: undefined
  }, __jsx("div", {
    className: styled_jsx_style__WEBPACK_IMPORTED_MODULE_0___default.a.dynamic([["2602658244", [statusColor[props.status]]]]) + " " + "nencholist-item-title",
    __source: {
      fileName: _jsxFileName,
      lineNumber: 18
    },
    __self: undefined
  }, __jsx(_styles_listCommon__WEBPACK_IMPORTED_MODULE_2__["StyledListItemTitleNencho"], {
    __source: {
      fileName: _jsxFileName,
      lineNumber: 19
    },
    __self: undefined
  }, props.title), " "), __jsx("div", {
    className: styled_jsx_style__WEBPACK_IMPORTED_MODULE_0___default.a.dynamic([["2602658244", [statusColor[props.status]]]]) + " " + "nencholist-item-status",
    __source: {
      fileName: _jsxFileName,
      lineNumber: 23
    },
    __self: undefined
  }, __jsx(_styles_listCommon__WEBPACK_IMPORTED_MODULE_2__["StyledListItemStatusNencho"], {
    __source: {
      fileName: _jsxFileName,
      lineNumber: 24
    },
    __self: undefined
  }, statusName[props.status]))), __jsx(styled_jsx_style__WEBPACK_IMPORTED_MODULE_0___default.a, {
    id: "2602658244",
    dynamic: [statusColor[props.status]],
    __self: undefined
  }, `.nencholist-item.__jsx-style-dynamic-selector{display:inline-block;position:relative;width:100%;height:72px;background:#ffffff;border-bottom:solid 1px #ebebeb;border-left:solid 0px ${statusColor[props.status]};box-sizing:border-box;}.nencholist-item-title.__jsx-style-dynamic-selector{position:absolute;top:16px;left:72px;}.nencholist-item-status.__jsx-style-dynamic-selector{position:absolute;bottom:15px;left:72px;text-align:left;color:#b3b3b3;}
/*# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIkM6XFxVc2Vyc1xcbGVub3ZvXFxzb3VyY2VcXHJlcG9zXFxUeXBlU2NyaXB0XFxzcmNcXGNvbXBvbmVudHNcXG5lbmNob0xpc3QudHN4Il0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQTZCUyxBQUdrQyxBQVdILEFBS0Esa0JBSlQsQUFLRyxHQWhCTSxNQVlSLEdBS0EsT0FKWixFQVphLENBaUJLLFVBaEJKLE1BaUJFLE1BaEJLLFFBaUJyQixXQWhCa0MsZ0NBRW1CLG1EQUM3QixzQkFDeEIiLCJmaWxlIjoiQzpcXFVzZXJzXFxsZW5vdm9cXHNvdXJjZVxccmVwb3NcXFR5cGVTY3JpcHRcXHNyY1xcY29tcG9uZW50c1xcbmVuY2hvTGlzdC50c3giLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgUmVhY3QgZnJvbSBcInJlYWN0XCI7XG5pbXBvcnQgKiBhcyBsaXN0Q29tbW9uIGZyb20gXCIuLi9zdHlsZXMvbGlzdENvbW1vblwiO1xuXG5pbnRlcmZhY2UgU3R5bGVkUHJpbWFyeUxpc3RQcm9wcyB7XG4gIHJlYWRvbmx5IHRpdGxlOiBzdHJpbmc7XG4gIHJlYWRvbmx5IHN0YXR1czogbnVtYmVyO1xufVxuXG5jb25zdCBzdGF0dXNDb2xvciA9IFtcIiNGRkZGRkZcIiwgXCIjRkZGRkZGXCIsIFwiI0ZGRkZGRlwiXTtcblxuY29uc3Qgc3RhdHVzTmFtZSA9IFtcIuacquWFpeWKm1wiLCBcIuWFpeWKm+a4iOOBv1wiLCBcIuS/ruato+OBl+OBpuOBj+OBoOOBleOBhFwiXTtcblxuLy8gRklYTUU65YWx6YCa44GuQ1NT44Gq44Gp44Gn5a++5b+c77yfXG5leHBvcnQgY29uc3QgTmVuY2hvTGlzdEl0ZW06IFJlYWN0LkZDPFN0eWxlZFByaW1hcnlMaXN0UHJvcHM+ID0gcHJvcHMgPT4ge1xuICByZXR1cm4gKFxuICAgIDw+XG4gICAgICA8ZGl2IGNsYXNzTmFtZT1cIm5lbmNob2xpc3QtaXRlbVwiPlxuICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cIm5lbmNob2xpc3QtaXRlbS10aXRsZVwiPlxuICAgICAgICAgIDxsaXN0Q29tbW9uLlN0eWxlZExpc3RJdGVtVGl0bGVOZW5jaG8+XG4gICAgICAgICAgICB7cHJvcHMudGl0bGV9XG4gICAgICAgICAgPC9saXN0Q29tbW9uLlN0eWxlZExpc3RJdGVtVGl0bGVOZW5jaG8+e1wiIFwifVxuICAgICAgICA8L2Rpdj5cbiAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJuZW5jaG9saXN0LWl0ZW0tc3RhdHVzXCI+XG4gICAgICAgICAgPGxpc3RDb21tb24uU3R5bGVkTGlzdEl0ZW1TdGF0dXNOZW5jaG8+XG4gICAgICAgICAgICB7c3RhdHVzTmFtZVtwcm9wcy5zdGF0dXNdfVxuICAgICAgICAgIDwvbGlzdENvbW1vbi5TdHlsZWRMaXN0SXRlbVN0YXR1c05lbmNobz5cbiAgICAgICAgPC9kaXY+XG4gICAgICA8L2Rpdj5cbiAgICAgIDxzdHlsZSBqc3g+XG4gICAgICAgIHtgXG4gICAgICAgICAgLm5lbmNob2xpc3QtaXRlbSB7XG4gICAgICAgICAgICBkaXNwbGF5OiBpbmxpbmUtYmxvY2s7XG4gICAgICAgICAgICBwb3NpdGlvbjogcmVsYXRpdmU7XG4gICAgICAgICAgICB3aWR0aDogMTAwJTtcbiAgICAgICAgICAgIGhlaWdodDogNzJweDtcbiAgICAgICAgICAgIGJhY2tncm91bmQ6ICNmZmZmZmY7XG4gICAgICAgICAgICBib3JkZXItYm90dG9tOiBzb2xpZCAxcHggI2ViZWJlYjtcbiAgICAgICAgICAgIC8vVE9ETzrihpPjga4x6KGM5LiN6KaBXG4gICAgICAgICAgICBib3JkZXItbGVmdDogc29saWQgMHB4ICR7c3RhdHVzQ29sb3JbcHJvcHMuc3RhdHVzXX07XG4gICAgICAgICAgICBib3gtc2l6aW5nOiBib3JkZXItYm94O1xuICAgICAgICAgIH1cbiAgICAgICAgICAubmVuY2hvbGlzdC1pdGVtLXRpdGxlIHtcbiAgICAgICAgICAgIHBvc2l0aW9uOiBhYnNvbHV0ZTtcbiAgICAgICAgICAgIHRvcDogMTZweDtcbiAgICAgICAgICAgIGxlZnQ6IDcycHg7XG4gICAgICAgICAgfVxuICAgICAgICAgIC5uZW5jaG9saXN0LWl0ZW0tc3RhdHVzIHtcbiAgICAgICAgICAgIHBvc2l0aW9uOiBhYnNvbHV0ZTtcbiAgICAgICAgICAgIGJvdHRvbTogMTVweDtcbiAgICAgICAgICAgIGxlZnQ6IDcycHg7XG4gICAgICAgICAgICB0ZXh0LWFsaWduOiBsZWZ0O1xuICAgICAgICAgICAgY29sb3I6ICNiM2IzYjM7XG4gICAgICAgICAgfVxuICAgICAgICBgfVxuICAgICAgPC9zdHlsZT5cbiAgICA8Lz5cbiAgKTtcbn07XG4iXX0= */
/*@ sourceURL=C:\\Users\\lenovo\\source\\repos\\TypeScript\\src\\components\\nenchoList.tsx */`));
};

/***/ }),

/***/ "./src/pages/index.tsx":
/*!*****************************!*\
  !*** ./src/pages/index.tsx ***!
  \*****************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var styled_jsx_style__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! styled-jsx/style */ "styled-jsx/style");
/* harmony import */ var styled_jsx_style__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(styled_jsx_style__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var next_router__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! next/router */ "next/router");
/* harmony import */ var next_router__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(next_router__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _styles_button__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../styles/button */ "./src/styles/button.tsx");
/* harmony import */ var _components_nenchoList__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../components/nenchoList */ "./src/components/nenchoList.tsx");
/* harmony import */ var _components_nenchoHeader__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../components/nenchoHeader */ "./src/components/nenchoHeader.tsx");
/* harmony import */ var _styles_listCommon__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../styles/listCommon */ "./src/styles/listCommon.tsx");
var _jsxFileName = "C:\\Users\\lenovo\\source\\repos\\TypeScript\\src\\pages\\index.tsx";

var __jsx = react__WEBPACK_IMPORTED_MODULE_1__["createElement"];







const Nencho = () => {
  const statusNum = {
    EMPTY: 0,
    FINISHED: 1,
    TBC: 2
  }; // FIXME: 実データに入れ替えてください。

  const nenchoList = [{
    id: "uuid1",
    title: "本人情報",
    status: statusNum.FINISHED
  }, {
    id: "uuid2",
    title: "配偶者情報",
    status: statusNum.FINISHED
  }, {
    id: "uuid3",
    title: "家族情報",
    status: statusNum.FINISHED
  }, {
    id: "uuid4",
    title: "保険料控除",
    status: statusNum.EMPTY
  }, {
    id: "uuid5",
    title: "住宅ローン控除",
    status: statusNum.TBC
  }];
  return __jsx(react__WEBPACK_IMPORTED_MODULE_1__["Fragment"], null, __jsx(_components_nenchoHeader__WEBPACK_IMPORTED_MODULE_5__["NenchoHeader"], {
    __source: {
      fileName: _jsxFileName,
      lineNumber: 27
    },
    __self: undefined
  }), __jsx(_styles_listCommon__WEBPACK_IMPORTED_MODULE_6__["StyledListBody"], {
    __source: {
      fileName: _jsxFileName,
      lineNumber: 28
    },
    __self: undefined
  }, __jsx("div", {
    className: "page-background",
    __source: {
      fileName: _jsxFileName,
      lineNumber: 29
    },
    __self: undefined
  }, __jsx(_styles_listCommon__WEBPACK_IMPORTED_MODULE_6__["StyledListNencho"], {
    __source: {
      fileName: _jsxFileName,
      lineNumber: 30
    },
    __self: undefined
  }, nenchoList.map(nencho => __jsx("div", {
    key: nencho.id,
    onClick: () => next_router__WEBPACK_IMPORTED_MODULE_2___default.a.push("/nencho/insurances"),
    role: "button",
    __source: {
      fileName: _jsxFileName,
      lineNumber: 32
    },
    __self: undefined
  }, __jsx(_components_nenchoList__WEBPACK_IMPORTED_MODULE_4__["NenchoListItem"], {
    title: nencho.title,
    status: nencho.status,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 37
    },
    __self: undefined
  }))))), __jsx("footer", {
    className: "jsx-3904100263" + " " + "page-footer",
    __source: {
      fileName: _jsxFileName,
      lineNumber: 42
    },
    __self: undefined
  }, __jsx("div", {
    className: "jsx-3904100263" + " " + "submission-button",
    __source: {
      fileName: _jsxFileName,
      lineNumber: 43
    },
    __self: undefined
  }, __jsx(_styles_button__WEBPACK_IMPORTED_MODULE_3__["StyledButton"], {
    important: true,
    onClick: () => next_router__WEBPACK_IMPORTED_MODULE_2___default.a.push("/tasks"),
    __source: {
      fileName: _jsxFileName,
      lineNumber: 44
    },
    __self: undefined
  }, "\u63D0\u51FA\u3059\u308B")), __jsx(styled_jsx_style__WEBPACK_IMPORTED_MODULE_0___default.a, {
    id: "3904100263",
    __self: undefined
  }, ".submission-button.jsx-3904100263{position:fixed;right:16px;left:16px;bottom:16px;text-align:center;padding:93px 0px 16px 0px;background:#ffffff;border-radius:0px 0px 8px 8px;width:(97% - 37.984px);}\n/*# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIkM6XFxVc2Vyc1xcbGVub3ZvXFxzb3VyY2VcXHJlcG9zXFxUeXBlU2NyaXB0XFxzcmNcXHBhZ2VzXFxpbmRleC50c3giXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBZ0RhLEFBR2dDLGVBQ0osV0FDRCxVQUNFLFlBQ00sa0JBQ1EsMEJBQ1AsbUJBQ1csOEJBQ1AsdUJBRXpCIiwiZmlsZSI6IkM6XFxVc2Vyc1xcbGVub3ZvXFxzb3VyY2VcXHJlcG9zXFxUeXBlU2NyaXB0XFxzcmNcXHBhZ2VzXFxpbmRleC50c3giLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgKiBhcyBSZWFjdCBmcm9tIFwicmVhY3RcIjtcbmltcG9ydCB7IE5leHRQYWdlIH0gZnJvbSBcIm5leHRcIjtcbmltcG9ydCBSb3V0ZXIgZnJvbSBcIm5leHQvcm91dGVyXCI7XG5pbXBvcnQgeyBTdHlsZWRCdXR0b24gfSBmcm9tIFwiLi4vc3R5bGVzL2J1dHRvblwiO1xuaW1wb3J0IHsgTmVuY2hvTGlzdEl0ZW0gfSBmcm9tIFwiLi4vY29tcG9uZW50cy9uZW5jaG9MaXN0XCI7XG5pbXBvcnQgeyBOZW5jaG9IZWFkZXIgfSBmcm9tIFwiLi4vY29tcG9uZW50cy9uZW5jaG9IZWFkZXJcIjtcbmltcG9ydCAqIGFzIGxpc3RDb21tb24gZnJvbSBcIi4uL3N0eWxlcy9saXN0Q29tbW9uXCI7XG5cbmNvbnN0IE5lbmNobzogTmV4dFBhZ2UgPSAoKSA9PiB7XG4gIGNvbnN0IHN0YXR1c051bTogeyBba2V5OiBzdHJpbmddOiBudW1iZXIgfSA9IHtcbiAgICBFTVBUWTogMCxcbiAgICBGSU5JU0hFRDogMSxcbiAgICBUQkM6IDJcbiAgfTtcblxuICAvLyBGSVhNRTog5a6f44OH44O844K/44Gr5YWl44KM5pu/44GI44Gm44GP44Gg44GV44GE44CCXG4gIGNvbnN0IG5lbmNob0xpc3QgPSBbXG4gICAgeyBpZDogXCJ1dWlkMVwiLCB0aXRsZTogXCLmnKzkurrmg4XloLFcIiwgc3RhdHVzOiBzdGF0dXNOdW0uRklOSVNIRUQgfSxcbiAgICB7IGlkOiBcInV1aWQyXCIsIHRpdGxlOiBcIumFjeWBtuiAheaDheWgsVwiLCBzdGF0dXM6IHN0YXR1c051bS5GSU5JU0hFRCB9LFxuICAgIHsgaWQ6IFwidXVpZDNcIiwgdGl0bGU6IFwi5a625peP5oOF5aCxXCIsIHN0YXR1czogc3RhdHVzTnVtLkZJTklTSEVEIH0sXG4gICAgeyBpZDogXCJ1dWlkNFwiLCB0aXRsZTogXCLkv53pmbrmlpnmjqfpmaRcIiwgc3RhdHVzOiBzdGF0dXNOdW0uRU1QVFkgfSxcbiAgICB7IGlkOiBcInV1aWQ1XCIsIHRpdGxlOiBcIuS9j+WuheODreODvOODs+aOp+mZpFwiLCBzdGF0dXM6IHN0YXR1c051bS5UQkMgfVxuICBdO1xuXG4gIHJldHVybiAoXG4gICAgPD5cbiAgICAgIDxOZW5jaG9IZWFkZXIgLz5cbiAgICAgIDxsaXN0Q29tbW9uLlN0eWxlZExpc3RCb2R5PlxuICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cInBhZ2UtYmFja2dyb3VuZFwiPlxuICAgICAgICAgIDxsaXN0Q29tbW9uLlN0eWxlZExpc3ROZW5jaG8+XG4gICAgICAgICAgICB7bmVuY2hvTGlzdC5tYXAobmVuY2hvID0+IChcbiAgICAgICAgICAgICAgPGRpdlxuICAgICAgICAgICAgICAgIGtleT17bmVuY2hvLmlkfVxuICAgICAgICAgICAgICAgIG9uQ2xpY2s9eygpID0+IFJvdXRlci5wdXNoKFwiL25lbmNoby9pbnN1cmFuY2VzXCIpfVxuICAgICAgICAgICAgICAgIHJvbGU9XCJidXR0b25cIlxuICAgICAgICAgICAgICA+XG4gICAgICAgICAgICAgICAgPE5lbmNob0xpc3RJdGVtIHRpdGxlPXtuZW5jaG8udGl0bGV9IHN0YXR1cz17bmVuY2hvLnN0YXR1c30gLz5cbiAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICApKX1cbiAgICAgICAgICA8L2xpc3RDb21tb24uU3R5bGVkTGlzdE5lbmNobz5cbiAgICAgICAgPC9kaXY+XG4gICAgICAgIDxmb290ZXIgY2xhc3NOYW1lPVwicGFnZS1mb290ZXJcIj5cbiAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cInN1Ym1pc3Npb24tYnV0dG9uXCI+XG4gICAgICAgICAgICA8U3R5bGVkQnV0dG9uIGltcG9ydGFudCBvbkNsaWNrPXsoKSA9PiBSb3V0ZXIucHVzaChcIi90YXNrc1wiKX0+XG4gICAgICAgICAgICAgIOaPkOWHuuOBmeOCi1xuICAgICAgICAgICAgPC9TdHlsZWRCdXR0b24+XG4gICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgPHN0eWxlIGpzeD5cbiAgICAgICAgICAgIHtgXG4gICAgICAgICAgICAgIC5zdWJtaXNzaW9uLWJ1dHRvbiB7XG4gICAgICAgICAgICAgICAgcG9zaXRpb246IGZpeGVkO1xuICAgICAgICAgICAgICAgIHJpZ2h0OiAxNnB4O1xuICAgICAgICAgICAgICAgIGxlZnQ6IDE2cHg7XG4gICAgICAgICAgICAgICAgYm90dG9tOiAxNnB4O1xuICAgICAgICAgICAgICAgIHRleHQtYWxpZ246IGNlbnRlcjtcbiAgICAgICAgICAgICAgICBwYWRkaW5nOiA5M3B4IDBweCAxNnB4IDBweDtcbiAgICAgICAgICAgICAgICBiYWNrZ3JvdW5kOiAjZmZmZmZmO1xuICAgICAgICAgICAgICAgIGJvcmRlci1yYWRpdXM6IDBweCAwcHggOHB4IDhweDtcbiAgICAgICAgICAgICAgICB3aWR0aDogKDk3JSAtIDM3Ljk4NHB4KTtcbiAgICAgICAgICAgICAgICAvL2hlaWdodDogOTNweDtcbiAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAucGFnZS1mb290ZXIge1xuICAgICAgICAgICAgICB9XG4gICAgICAgICAgICBgfVxuICAgICAgICAgIDwvc3R5bGU+XG4gICAgICAgIDwvZm9vdGVyPlxuICAgICAgPC9saXN0Q29tbW9uLlN0eWxlZExpc3RCb2R5PlxuICAgIDwvPlxuICApO1xufTtcblxuZXhwb3J0IGRlZmF1bHQgTmVuY2hvO1xuIl19 */\n/*@ sourceURL=C:\\\\Users\\\\lenovo\\\\source\\\\repos\\\\TypeScript\\\\src\\\\pages\\\\index.tsx */"))));
};

/* harmony default export */ __webpack_exports__["default"] = (Nencho);

/***/ }),

/***/ "./src/styles/button.tsx":
/*!*******************************!*\
  !*** ./src/styles/button.tsx ***!
  \*******************************/
/*! exports provided: StyledButton */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "StyledButton", function() { return StyledButton; });
/* harmony import */ var styled_components__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! styled-components */ "styled-components");
/* harmony import */ var styled_components__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(styled_components__WEBPACK_IMPORTED_MODULE_0__);

const StyledButton = styled_components__WEBPACK_IMPORTED_MODULE_0___default.a.button`
  font-weight: bold;
  font-style: normal;
  font-family: Noto Sans JP, sans-serif;
  color: #000000;
  line-height: 16px;
  text-align: center;
  background: #cccccc;
  outline: none;
  border: none;
  border-radius: 24px;
  letter-spacing: 0.06em;

  ${props => {
  var _props$fontSize, _props$width, _props$height;

  return styled_components__WEBPACK_IMPORTED_MODULE_0__["css"]`
      font-size: ${(_props$fontSize = props.fontSize) !== null && _props$fontSize !== void 0 ? _props$fontSize : '16px'};
      width: ${(_props$width = props.width) !== null && _props$width !== void 0 ? _props$width : '283px'};
      height: ${(_props$height = props.height) !== null && _props$height !== void 0 ? _props$height : '48px'};
    `;
}}
  ${props => props.important && styled_components__WEBPACK_IMPORTED_MODULE_0__["css"]`
      background: #0f84ec;
      color: #ffffff;
      :focus {
        background: #188ef5;
      }
      :disabled {
        background: #dedede;
      }
    `}
  ${props => props.primary && styled_components__WEBPACK_IMPORTED_MODULE_0__["css"]`
      border: 2px solid #525252;
      box-sizing: border-box;
      color: #525252;
      background: none;
      :focus {
        color: #ffffff;
        background: #525252;
      }
      :disabled {
        background: #dedede;
      }
    `}
  ${props => props.warning && styled_components__WEBPACK_IMPORTED_MODULE_0__["css"]`
      border: 2px solid #ed463e;
      box-sizing: border-box;
      color: #ed463e;
      background: none;
    `}
`;

/***/ }),

/***/ "./src/styles/label.tsx":
/*!******************************!*\
  !*** ./src/styles/label.tsx ***!
  \******************************/
/*! exports provided: StyledLabel, StyledTitle, StyledText */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "StyledLabel", function() { return StyledLabel; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "StyledTitle", function() { return StyledTitle; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "StyledText", function() { return StyledText; });
/* harmony import */ var styled_components__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! styled-components */ "styled-components");
/* harmony import */ var styled_components__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(styled_components__WEBPACK_IMPORTED_MODULE_0__);

const StyledLabel = styled_components__WEBPACK_IMPORTED_MODULE_0___default.a.label`
  font-size: 12px;
  font-style: normal;
  font-weight: normal;
  font-family: Noto Sans JP, sans-serif;
  color: #797979;
  line-height: 150%;
  letter-spacing: 0.06em;
`;
const StyledTitle = styled_components__WEBPACK_IMPORTED_MODULE_0___default.a.title`
  display: block;
  font-family: Noto Sans JP, sans-serif;
  font-style: normal;
  font-weight: bold;
  font-size: 16px;
  line-height: 100%;
  text-align: center;
  color: #333333;
  margin-top: 12px;
  margin-bottom: 12px;
  width: 100%;
`;
const StyledText = styled_components__WEBPACK_IMPORTED_MODULE_0___default.a.div`
  font-size: 12px;
  font-style: normal;
  font-weight: normal;
  font-family: Noto Sans JP, sans-serif;
  color: #333333;
  line-height: 150%;
  letter-spacing: 0.06em;
`;

/***/ }),

/***/ "./src/styles/listCommon.tsx":
/*!***********************************!*\
  !*** ./src/styles/listCommon.tsx ***!
  \***********************************/
/*! exports provided: StyledList, StyledListNencho, StyledListItemTitle, StyledListItemTitleNencho, StyledListItemNewly, StyledListItemStatus, StyledListItemStatusNencho, StyledListItemDueDate, StyledListItemArrow, StyledListBody */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "StyledList", function() { return StyledList; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "StyledListNencho", function() { return StyledListNencho; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "StyledListItemTitle", function() { return StyledListItemTitle; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "StyledListItemTitleNencho", function() { return StyledListItemTitleNencho; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "StyledListItemNewly", function() { return StyledListItemNewly; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "StyledListItemStatus", function() { return StyledListItemStatus; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "StyledListItemStatusNencho", function() { return StyledListItemStatusNencho; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "StyledListItemDueDate", function() { return StyledListItemDueDate; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "StyledListItemArrow", function() { return StyledListItemArrow; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "StyledListBody", function() { return StyledListBody; });
/* harmony import */ var styled_components__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! styled-components */ "styled-components");
/* harmony import */ var styled_components__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(styled_components__WEBPACK_IMPORTED_MODULE_0__);

const StyledList = styled_components__WEBPACK_IMPORTED_MODULE_0___default.a.ul`
  width: 100%;
  height: 100%;
  margin: 0;
  font-size: 0;
  list-style: none;
  border: solid 1px #ebebeb;
  box-sizing: border-box;
`;
const StyledListNencho = styled_components__WEBPACK_IMPORTED_MODULE_0___default.a.ul`
  width: 100%;
  height: 100%;
  margin: 0;
  padding: 0 16px;
  font-size: 0;
  list-style: none;
  box-sizing: border-box;
  min-height: 100%;
`;
const StyledListItemTitle = styled_components__WEBPACK_IMPORTED_MODULE_0___default.a.div`
  font-family: Noto Sans JP, sans-serif;
  font-style: normal;
  font-weight: normal;
  font-size: 16px;
  line-height: 180%;
  letter-spacing: 0.06em;
  color: #333333;
  margin: 0;
  padding: 0;
  white-space: nowrap;
  verflow: hidden;
  text-overflow: ellipsis;
`;
const StyledListItemTitleNencho = styled_components__WEBPACK_IMPORTED_MODULE_0___default.a.div`
  font-family: Noto Sans JP, sans-serif;
  font-style: normal;
  font-weight: normal;
  font-size: 16px;
  line-height: 100%;
  letter-spacing: 0.06em;
  color: #525252;
  margin: 0;
  padding: 0;
  white-space: nowrap;
  //TODO:不要
  //overflow: hidden;
  text-overflow: ellipsis;
`;
const StyledListItemNewly = styled_components__WEBPACK_IMPORTED_MODULE_0___default.a.span`
  font-family: Noto Sans JP, sans-serif;
  font-style: normal;
  font-weight: bold;
  font-size: 12px;
  line-height: 18px;
  letter-spacing: 0.06em;
  color: #0f84ec;
  margin: 0;
  padding: 0;
`;
const StyledListItemStatus = styled_components__WEBPACK_IMPORTED_MODULE_0___default.a.h5`
  width: 100%;
  font-family: Noto Sans JP, sans-serif;
  font-style: normal;
  font-weight: normal;
  font-size: 12px;
  line-height: 180%;
  letter-spacing: 0.06em;
  margin: 0;
  padding: 0;
`;
const StyledListItemStatusNencho = styled_components__WEBPACK_IMPORTED_MODULE_0___default.a.h5`
  width: 100%;
  font-family: Noto Sans JP, sans-serif;
  font-style: normal;
  font-weight: normal;
  font-size: 12px;
  line-height: 100%;
  letter-spacing: 0.06em;
  color: #949494;
  margin: 0;
  padding: 0;
`;
const StyledListItemDueDate = styled_components__WEBPACK_IMPORTED_MODULE_0___default.a.h5`
  font-family: Noto Sans JP, sans-serif;
  font-style: normal;
  font-weight: normal;
  font-size: 12px;
  line-height: 150%;
  letter-spacing: 0.06em;
  color: #333333;
  margin: 0;
  padding: 0;
`;
const StyledListItemArrow = styled_components__WEBPACK_IMPORTED_MODULE_0___default.a.svg`
  width: 13.41px;
  height: 13.41px;
  margin: 0;
  padding: 0;
`;
const StyledListBody = styled_components__WEBPACK_IMPORTED_MODULE_0___default.a.body`
  background-color: #edf4fa;
`;

/***/ }),

/***/ 4:
/*!***********************************!*\
  !*** multi ./src/pages/index.tsx ***!
  \***********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(/*! C:\Users\lenovo\source\repos\TypeScript\src\pages\index.tsx */"./src/pages/index.tsx");


/***/ }),

/***/ "next/router":
/*!******************************!*\
  !*** external "next/router" ***!
  \******************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("next/router");

/***/ }),

/***/ "react":
/*!************************!*\
  !*** external "react" ***!
  \************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("react");

/***/ }),

/***/ "styled-components":
/*!************************************!*\
  !*** external "styled-components" ***!
  \************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("styled-components");

/***/ }),

/***/ "styled-jsx/style":
/*!***********************************!*\
  !*** external "styled-jsx/style" ***!
  \***********************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("styled-jsx/style");

/***/ })

/******/ });
//# sourceMappingURL=index.js.map