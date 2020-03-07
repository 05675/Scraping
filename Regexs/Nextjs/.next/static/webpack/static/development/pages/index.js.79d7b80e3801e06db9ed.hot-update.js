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
    className: "jsx-1127664562" + " " + "page-footer",
    __source: {
      fileName: _jsxFileName,
      lineNumber: 42
    },
    __self: this
  }, __jsx("div", {
    className: "jsx-1127664562" + " " + "submission-button",
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
    id: "1127664562",
    __self: this
  }, ".submission-button.jsx-1127664562{position:fixed;right:16px;left:16px;bottom:16px;text-align:center;padding:93px 0px 16px 0px;background:#ffffff;border-radius:0px 0px 8px 8px;width:(97% - 37.984px);height:93px;}\n/*# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIkM6XFxVc2Vyc1xcbGVub3ZvXFxzb3VyY2VcXHJlcG9zXFxUeXBlU2NyaXB0XFxzcmNcXHBhZ2VzXFxpbmRleC50c3giXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBZ0RhLEFBR2dDLGVBQ0osV0FDRCxVQUNFLFlBQ00sa0JBQ1EsMEJBQ1AsbUJBQ1csOEJBQ1AsdUJBQ1gsWUFDZCIsImZpbGUiOiJDOlxcVXNlcnNcXGxlbm92b1xcc291cmNlXFxyZXBvc1xcVHlwZVNjcmlwdFxcc3JjXFxwYWdlc1xcaW5kZXgudHN4Iiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0ICogYXMgUmVhY3QgZnJvbSBcInJlYWN0XCI7XG5pbXBvcnQgeyBOZXh0UGFnZSB9IGZyb20gXCJuZXh0XCI7XG5pbXBvcnQgUm91dGVyIGZyb20gXCJuZXh0L3JvdXRlclwiO1xuaW1wb3J0IHsgU3R5bGVkQnV0dG9uIH0gZnJvbSBcIi4uL3N0eWxlcy9idXR0b25cIjtcbmltcG9ydCB7IE5lbmNob0xpc3RJdGVtIH0gZnJvbSBcIi4uL2NvbXBvbmVudHMvbmVuY2hvTGlzdFwiO1xuaW1wb3J0IHsgTmVuY2hvSGVhZGVyIH0gZnJvbSBcIi4uL2NvbXBvbmVudHMvbmVuY2hvSGVhZGVyXCI7XG5pbXBvcnQgKiBhcyBsaXN0Q29tbW9uIGZyb20gXCIuLi9zdHlsZXMvbGlzdENvbW1vblwiO1xuXG5jb25zdCBOZW5jaG86IE5leHRQYWdlID0gKCkgPT4ge1xuICBjb25zdCBzdGF0dXNOdW06IHsgW2tleTogc3RyaW5nXTogbnVtYmVyIH0gPSB7XG4gICAgRU1QVFk6IDAsXG4gICAgRklOSVNIRUQ6IDEsXG4gICAgVEJDOiAyXG4gIH07XG5cbiAgLy8gRklYTUU6IOWun+ODh+ODvOOCv+OBq+WFpeOCjOabv+OBiOOBpuOBj+OBoOOBleOBhOOAglxuICBjb25zdCBuZW5jaG9MaXN0ID0gW1xuICAgIHsgaWQ6IFwidXVpZDFcIiwgdGl0bGU6IFwi5pys5Lq65oOF5aCxXCIsIHN0YXR1czogc3RhdHVzTnVtLkZJTklTSEVEIH0sXG4gICAgeyBpZDogXCJ1dWlkMlwiLCB0aXRsZTogXCLphY3lgbbogIXmg4XloLFcIiwgc3RhdHVzOiBzdGF0dXNOdW0uRklOSVNIRUQgfSxcbiAgICB7IGlkOiBcInV1aWQzXCIsIHRpdGxlOiBcIuWutuaXj+aDheWgsVwiLCBzdGF0dXM6IHN0YXR1c051bS5GSU5JU0hFRCB9LFxuICAgIHsgaWQ6IFwidXVpZDRcIiwgdGl0bGU6IFwi5L+d6Zm65paZ5o6n6ZmkXCIsIHN0YXR1czogc3RhdHVzTnVtLkVNUFRZIH0sXG4gICAgeyBpZDogXCJ1dWlkNVwiLCB0aXRsZTogXCLkvY/lroXjg63jg7zjg7PmjqfpmaRcIiwgc3RhdHVzOiBzdGF0dXNOdW0uVEJDIH1cbiAgXTtcblxuICByZXR1cm4gKFxuICAgIDw+XG4gICAgICA8TmVuY2hvSGVhZGVyIC8+XG4gICAgICA8bGlzdENvbW1vbi5TdHlsZWRMaXN0Qm9keT5cbiAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJwYWdlLWJhY2tncm91bmRcIj5cbiAgICAgICAgICA8bGlzdENvbW1vbi5TdHlsZWRMaXN0TmVuY2hvPlxuICAgICAgICAgICAge25lbmNob0xpc3QubWFwKG5lbmNobyA9PiAoXG4gICAgICAgICAgICAgIDxkaXZcbiAgICAgICAgICAgICAgICBrZXk9e25lbmNoby5pZH1cbiAgICAgICAgICAgICAgICBvbkNsaWNrPXsoKSA9PiBSb3V0ZXIucHVzaChcIi9uZW5jaG8vaW5zdXJhbmNlc1wiKX1cbiAgICAgICAgICAgICAgICByb2xlPVwiYnV0dG9uXCJcbiAgICAgICAgICAgICAgPlxuICAgICAgICAgICAgICAgIDxOZW5jaG9MaXN0SXRlbSB0aXRsZT17bmVuY2hvLnRpdGxlfSBzdGF0dXM9e25lbmNoby5zdGF0dXN9IC8+XG4gICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgKSl9XG4gICAgICAgICAgPC9saXN0Q29tbW9uLlN0eWxlZExpc3ROZW5jaG8+XG4gICAgICAgIDwvZGl2PlxuICAgICAgICA8Zm9vdGVyIGNsYXNzTmFtZT1cInBhZ2UtZm9vdGVyXCI+XG4gICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJzdWJtaXNzaW9uLWJ1dHRvblwiPlxuICAgICAgICAgICAgPFN0eWxlZEJ1dHRvbiBpbXBvcnRhbnQgb25DbGljaz17KCkgPT4gUm91dGVyLnB1c2goXCIvdGFza3NcIil9PlxuICAgICAgICAgICAgICDmj5Dlh7rjgZnjgotcbiAgICAgICAgICAgIDwvU3R5bGVkQnV0dG9uPlxuICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgIDxzdHlsZSBqc3g+XG4gICAgICAgICAgICB7YFxuICAgICAgICAgICAgICAuc3VibWlzc2lvbi1idXR0b24ge1xuICAgICAgICAgICAgICAgIHBvc2l0aW9uOiBmaXhlZDtcbiAgICAgICAgICAgICAgICByaWdodDogMTZweDtcbiAgICAgICAgICAgICAgICBsZWZ0OiAxNnB4O1xuICAgICAgICAgICAgICAgIGJvdHRvbTogMTZweDtcbiAgICAgICAgICAgICAgICB0ZXh0LWFsaWduOiBjZW50ZXI7XG4gICAgICAgICAgICAgICAgcGFkZGluZzogOTNweCAwcHggMTZweCAwcHg7XG4gICAgICAgICAgICAgICAgYmFja2dyb3VuZDogI2ZmZmZmZjtcbiAgICAgICAgICAgICAgICBib3JkZXItcmFkaXVzOiAwcHggMHB4IDhweCA4cHg7XG4gICAgICAgICAgICAgICAgd2lkdGg6ICg5NyUgLSAzNy45ODRweCk7XG4gICAgICAgICAgICAgICAgaGVpZ2h0OiA5M3B4O1xuICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgIC5wYWdlLWZvb3RlciB7XG4gICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGB9XG4gICAgICAgICAgPC9zdHlsZT5cbiAgICAgICAgPC9mb290ZXI+XG4gICAgICA8L2xpc3RDb21tb24uU3R5bGVkTGlzdEJvZHk+XG4gICAgPC8+XG4gICk7XG59O1xuXG5leHBvcnQgZGVmYXVsdCBOZW5jaG87XG4iXX0= */\n/*@ sourceURL=C:\\\\Users\\\\lenovo\\\\source\\\\repos\\\\TypeScript\\\\src\\\\pages\\\\index.tsx */"))));
};

/* harmony default export */ __webpack_exports__["default"] = (Nencho);

/***/ })

})
//# sourceMappingURL=index.js.79d7b80e3801e06db9ed.hot-update.js.map