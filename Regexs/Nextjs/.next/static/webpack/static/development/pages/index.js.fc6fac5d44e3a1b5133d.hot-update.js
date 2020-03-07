webpackHotUpdate("static\\development\\pages\\index.js",{

/***/ "./src/pages/index.tsx":
/*!*****************************!*\
  !*** ./src/pages/index.tsx ***!
  \*****************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var styled_jsx_style__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! styled-jsx/style */ "./node_modules/styled-jsx/style.js");
/* harmony import */ var styled_jsx_style__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(styled_jsx_style__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var next_router__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! next/router */ "./node_modules/next/dist/client/router.js");
/* harmony import */ var next_router__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(next_router__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _styles_button__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../styles/button */ "./src/styles/button.tsx");
/* harmony import */ var _components_nenchoList__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../components/nenchoList */ "./src/components/nenchoList.tsx");
/* harmony import */ var _components_nenchoHeader__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../components/nenchoHeader */ "./src/components/nenchoHeader.tsx");
/* harmony import */ var _styles_listCommon__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../styles/listCommon */ "./src/styles/listCommon.tsx");
var _jsxFileName = "C:\\Users\\lenovo\\source\\repos\\TypeScript\\src\\pages\\index.tsx";

var __jsx = react__WEBPACK_IMPORTED_MODULE_1__["createElement"];







var Nencho = function Nencho() {
  var statusNum = {
    EMPTY: 0,
    FINISHED: 1,
    TBC: 2
  }; // FIXME: 実データに入れ替えてください。

  var nenchoList = [{
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
    __self: this
  }), __jsx(_styles_listCommon__WEBPACK_IMPORTED_MODULE_6__["StyledListBody"], {
    __source: {
      fileName: _jsxFileName,
      lineNumber: 28
    },
    __self: this
  }, __jsx("div", {
    className: "page-background",
    __source: {
      fileName: _jsxFileName,
      lineNumber: 29
    },
    __self: this
  }, __jsx(_styles_listCommon__WEBPACK_IMPORTED_MODULE_6__["StyledListNencho"], {
    __source: {
      fileName: _jsxFileName,
      lineNumber: 30
    },
    __self: this
  }, nenchoList.map(function (nencho) {
    return __jsx("div", {
      key: nencho.id,
      onClick: function onClick() {
        return next_router__WEBPACK_IMPORTED_MODULE_2___default.a.push("/nencho/insurances");
      },
      role: "button",
      __source: {
        fileName: _jsxFileName,
        lineNumber: 32
      },
      __self: this
    }, __jsx(_components_nenchoList__WEBPACK_IMPORTED_MODULE_4__["NenchoListItem"], {
      title: nencho.title,
      status: nencho.status,
      __source: {
        fileName: _jsxFileName,
        lineNumber: 37
      },
      __self: this
    }));
  }))), __jsx("footer", {
    className: "jsx-3904100263" + " " + "page-footer",
    __source: {
      fileName: _jsxFileName,
      lineNumber: 42
    },
    __self: this
  }, __jsx("div", {
    className: "jsx-3904100263" + " " + "submission-button",
    __source: {
      fileName: _jsxFileName,
      lineNumber: 43
    },
    __self: this
  }, __jsx(_styles_button__WEBPACK_IMPORTED_MODULE_3__["StyledButton"], {
    important: true,
    onClick: function onClick() {
      return next_router__WEBPACK_IMPORTED_MODULE_2___default.a.push("/tasks");
    },
    __source: {
      fileName: _jsxFileName,
      lineNumber: 44
    },
    __self: this
  }, "\u63D0\u51FA\u3059\u308B")), __jsx(styled_jsx_style__WEBPACK_IMPORTED_MODULE_0___default.a, {
    id: "3904100263",
    __self: this
  }, ".submission-button.jsx-3904100263{position:fixed;right:16px;left:16px;bottom:16px;text-align:center;padding:93px 0px 16px 0px;background:#ffffff;border-radius:0px 0px 8px 8px;width:(97% - 37.984px);}\n/*# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIkM6XFxVc2Vyc1xcbGVub3ZvXFxzb3VyY2VcXHJlcG9zXFxUeXBlU2NyaXB0XFxzcmNcXHBhZ2VzXFxpbmRleC50c3giXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBZ0RhLEFBR2dDLGVBQ0osV0FDRCxVQUNFLFlBQ00sa0JBQ1EsMEJBQ1AsbUJBQ1csOEJBQ1AsdUJBRXpCIiwiZmlsZSI6IkM6XFxVc2Vyc1xcbGVub3ZvXFxzb3VyY2VcXHJlcG9zXFxUeXBlU2NyaXB0XFxzcmNcXHBhZ2VzXFxpbmRleC50c3giLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgKiBhcyBSZWFjdCBmcm9tIFwicmVhY3RcIjtcbmltcG9ydCB7IE5leHRQYWdlIH0gZnJvbSBcIm5leHRcIjtcbmltcG9ydCBSb3V0ZXIgZnJvbSBcIm5leHQvcm91dGVyXCI7XG5pbXBvcnQgeyBTdHlsZWRCdXR0b24gfSBmcm9tIFwiLi4vc3R5bGVzL2J1dHRvblwiO1xuaW1wb3J0IHsgTmVuY2hvTGlzdEl0ZW0gfSBmcm9tIFwiLi4vY29tcG9uZW50cy9uZW5jaG9MaXN0XCI7XG5pbXBvcnQgeyBOZW5jaG9IZWFkZXIgfSBmcm9tIFwiLi4vY29tcG9uZW50cy9uZW5jaG9IZWFkZXJcIjtcbmltcG9ydCAqIGFzIGxpc3RDb21tb24gZnJvbSBcIi4uL3N0eWxlcy9saXN0Q29tbW9uXCI7XG5cbmNvbnN0IE5lbmNobzogTmV4dFBhZ2UgPSAoKSA9PiB7XG4gIGNvbnN0IHN0YXR1c051bTogeyBba2V5OiBzdHJpbmddOiBudW1iZXIgfSA9IHtcbiAgICBFTVBUWTogMCxcbiAgICBGSU5JU0hFRDogMSxcbiAgICBUQkM6IDJcbiAgfTtcblxuICAvLyBGSVhNRTog5a6f44OH44O844K/44Gr5YWl44KM5pu/44GI44Gm44GP44Gg44GV44GE44CCXG4gIGNvbnN0IG5lbmNob0xpc3QgPSBbXG4gICAgeyBpZDogXCJ1dWlkMVwiLCB0aXRsZTogXCLmnKzkurrmg4XloLFcIiwgc3RhdHVzOiBzdGF0dXNOdW0uRklOSVNIRUQgfSxcbiAgICB7IGlkOiBcInV1aWQyXCIsIHRpdGxlOiBcIumFjeWBtuiAheaDheWgsVwiLCBzdGF0dXM6IHN0YXR1c051bS5GSU5JU0hFRCB9LFxuICAgIHsgaWQ6IFwidXVpZDNcIiwgdGl0bGU6IFwi5a625peP5oOF5aCxXCIsIHN0YXR1czogc3RhdHVzTnVtLkZJTklTSEVEIH0sXG4gICAgeyBpZDogXCJ1dWlkNFwiLCB0aXRsZTogXCLkv53pmbrmlpnmjqfpmaRcIiwgc3RhdHVzOiBzdGF0dXNOdW0uRU1QVFkgfSxcbiAgICB7IGlkOiBcInV1aWQ1XCIsIHRpdGxlOiBcIuS9j+WuheODreODvOODs+aOp+mZpFwiLCBzdGF0dXM6IHN0YXR1c051bS5UQkMgfVxuICBdO1xuXG4gIHJldHVybiAoXG4gICAgPD5cbiAgICAgIDxOZW5jaG9IZWFkZXIgLz5cbiAgICAgIDxsaXN0Q29tbW9uLlN0eWxlZExpc3RCb2R5PlxuICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cInBhZ2UtYmFja2dyb3VuZFwiPlxuICAgICAgICAgIDxsaXN0Q29tbW9uLlN0eWxlZExpc3ROZW5jaG8+XG4gICAgICAgICAgICB7bmVuY2hvTGlzdC5tYXAobmVuY2hvID0+IChcbiAgICAgICAgICAgICAgPGRpdlxuICAgICAgICAgICAgICAgIGtleT17bmVuY2hvLmlkfVxuICAgICAgICAgICAgICAgIG9uQ2xpY2s9eygpID0+IFJvdXRlci5wdXNoKFwiL25lbmNoby9pbnN1cmFuY2VzXCIpfVxuICAgICAgICAgICAgICAgIHJvbGU9XCJidXR0b25cIlxuICAgICAgICAgICAgICA+XG4gICAgICAgICAgICAgICAgPE5lbmNob0xpc3RJdGVtIHRpdGxlPXtuZW5jaG8udGl0bGV9IHN0YXR1cz17bmVuY2hvLnN0YXR1c30gLz5cbiAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICApKX1cbiAgICAgICAgICA8L2xpc3RDb21tb24uU3R5bGVkTGlzdE5lbmNobz5cbiAgICAgICAgPC9kaXY+XG4gICAgICAgIDxmb290ZXIgY2xhc3NOYW1lPVwicGFnZS1mb290ZXJcIj5cbiAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cInN1Ym1pc3Npb24tYnV0dG9uXCI+XG4gICAgICAgICAgICA8U3R5bGVkQnV0dG9uIGltcG9ydGFudCBvbkNsaWNrPXsoKSA9PiBSb3V0ZXIucHVzaChcIi90YXNrc1wiKX0+XG4gICAgICAgICAgICAgIOaPkOWHuuOBmeOCi1xuICAgICAgICAgICAgPC9TdHlsZWRCdXR0b24+XG4gICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgPHN0eWxlIGpzeD5cbiAgICAgICAgICAgIHtgXG4gICAgICAgICAgICAgIC5zdWJtaXNzaW9uLWJ1dHRvbiB7XG4gICAgICAgICAgICAgICAgcG9zaXRpb246IGZpeGVkO1xuICAgICAgICAgICAgICAgIHJpZ2h0OiAxNnB4O1xuICAgICAgICAgICAgICAgIGxlZnQ6IDE2cHg7XG4gICAgICAgICAgICAgICAgYm90dG9tOiAxNnB4O1xuICAgICAgICAgICAgICAgIHRleHQtYWxpZ246IGNlbnRlcjtcbiAgICAgICAgICAgICAgICBwYWRkaW5nOiA5M3B4IDBweCAxNnB4IDBweDtcbiAgICAgICAgICAgICAgICBiYWNrZ3JvdW5kOiAjZmZmZmZmO1xuICAgICAgICAgICAgICAgIGJvcmRlci1yYWRpdXM6IDBweCAwcHggOHB4IDhweDtcbiAgICAgICAgICAgICAgICB3aWR0aDogKDk3JSAtIDM3Ljk4NHB4KTtcbiAgICAgICAgICAgICAgICAvL2hlaWdodDogOTNweDtcbiAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAucGFnZS1mb290ZXIge1xuICAgICAgICAgICAgICB9XG4gICAgICAgICAgICBgfVxuICAgICAgICAgIDwvc3R5bGU+XG4gICAgICAgIDwvZm9vdGVyPlxuICAgICAgPC9saXN0Q29tbW9uLlN0eWxlZExpc3RCb2R5PlxuICAgIDwvPlxuICApO1xufTtcblxuZXhwb3J0IGRlZmF1bHQgTmVuY2hvO1xuIl19 */\n/*@ sourceURL=C:\\\\Users\\\\lenovo\\\\source\\\\repos\\\\TypeScript\\\\src\\\\pages\\\\index.tsx */"))));
};

/* harmony default export */ __webpack_exports__["default"] = (Nencho);

/***/ })

})
//# sourceMappingURL=index.js.fc6fac5d44e3a1b5133d.hot-update.js.map