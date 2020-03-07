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
var _jsxFileName = "C:\\Users\\lenovo\\source\\repos\\TypeScript\\src\\pages\\index.tsx";

var __jsx = react__WEBPACK_IMPORTED_MODULE_1__["createElement"];






var Nencho = function Nencho() {
  var statusNum = {
    EMPTY: 0,
    FINISHED: 1,
    TBC: 2
  }; // FIXME: 実データに入れ替えてください。

  var nenchoList = [{
    id: 'uuid1',
    title: '本人情報',
    status: statusNum.FINISHED
  }, {
    id: 'uuid2',
    title: '配偶者情報',
    status: statusNum.FINISHED
  }, {
    id: 'uuid3',
    title: '家族情報',
    status: statusNum.FINISHED
  }, {
    id: 'uuid4',
    title: '保険料控除',
    status: statusNum.EMPTY
  }, {
    id: 'uuid5',
    title: '住宅ローン控除',
    status: statusNum.TBC
  }];
  return __jsx(react__WEBPACK_IMPORTED_MODULE_1__["Fragment"], null, __jsx(_components_nenchoHeader__WEBPACK_IMPORTED_MODULE_5__["NenchoHeader"], {
    __source: {
      fileName: _jsxFileName,
      lineNumber: 26
    },
    __self: this
  }), __jsx(listCommon.StyledListBody, {
    __source: {
      fileName: _jsxFileName,
      lineNumber: 27
    },
    __self: this
  }, __jsx("div", {
    className: "page-background",
    __source: {
      fileName: _jsxFileName,
      lineNumber: 28
    },
    __self: this
  }, __jsx(listCommon.StyledListNencho, {
    __source: {
      fileName: _jsxFileName,
      lineNumber: 29
    },
    __self: this
  }, nenchoList.map(function (nencho) {
    return __jsx("div", {
      key: nencho.id,
      onClick: function onClick() {
        return next_router__WEBPACK_IMPORTED_MODULE_2___default.a.push('/nencho/insurances');
      },
      role: "button",
      __source: {
        fileName: _jsxFileName,
        lineNumber: 31
      },
      __self: this
    }, __jsx(_components_nenchoList__WEBPACK_IMPORTED_MODULE_4__["NenchoListItem"], {
      title: nencho.title,
      status: nencho.status,
      __source: {
        fileName: _jsxFileName,
        lineNumber: 32
      },
      __self: this
    }));
  }))), __jsx("footer", {
    className: "jsx-1127664562" + " " + 'page-footer',
    __source: {
      fileName: _jsxFileName,
      lineNumber: 37
    },
    __self: this
  }, __jsx("div", {
    className: "jsx-1127664562" + " " + 'submission-button',
    __source: {
      fileName: _jsxFileName,
      lineNumber: 38
    },
    __self: this
  }, __jsx(_styles_button__WEBPACK_IMPORTED_MODULE_3__["StyledButton"], {
    important: true,
    onClick: function onClick() {
      return next_router__WEBPACK_IMPORTED_MODULE_2___default.a.push('/tasks');
    },
    __source: {
      fileName: _jsxFileName,
      lineNumber: 39
    },
    __self: this
  }, "\u63D0\u51FA\u3059\u308B")), __jsx(styled_jsx_style__WEBPACK_IMPORTED_MODULE_0___default.a, {
    id: "1127664562",
    __self: this
  }, ".submission-button.jsx-1127664562{position:fixed;right:16px;left:16px;bottom:16px;text-align:center;padding:93px 0px 16px 0px;background:#ffffff;border-radius:0px 0px 8px 8px;width:(97% - 37.984px);height:93px;}\n/*# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIkM6XFxVc2Vyc1xcbGVub3ZvXFxzb3VyY2VcXHJlcG9zXFxUeXBlU2NyaXB0XFxzcmNcXHBhZ2VzXFxpbmRleC50c3giXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBMkNhLEFBR2dDLGVBQ0osV0FDRCxVQUNFLFlBQ00sa0JBQ1EsMEJBQ1AsbUJBQ1csOEJBQ1AsdUJBQ1gsWUFDZCIsImZpbGUiOiJDOlxcVXNlcnNcXGxlbm92b1xcc291cmNlXFxyZXBvc1xcVHlwZVNjcmlwdFxcc3JjXFxwYWdlc1xcaW5kZXgudHN4Iiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0ICogYXMgUmVhY3QgZnJvbSAncmVhY3QnO1xuaW1wb3J0IHsgTmV4dFBhZ2UgfSBmcm9tICduZXh0JztcbmltcG9ydCBSb3V0ZXIgZnJvbSAnbmV4dC9yb3V0ZXInO1xuaW1wb3J0IHsgU3R5bGVkQnV0dG9uIH0gZnJvbSAnLi4vc3R5bGVzL2J1dHRvbic7XG5pbXBvcnQgeyBOZW5jaG9MaXN0SXRlbSB9IGZyb20gJy4uL2NvbXBvbmVudHMvbmVuY2hvTGlzdCc7XG5pbXBvcnQgeyBOZW5jaG9IZWFkZXIgfSBmcm9tICcuLi9jb21wb25lbnRzL25lbmNob0hlYWRlcic7XG5cbmNvbnN0IE5lbmNobzogTmV4dFBhZ2UgPSAoKSA9PiB7XG4gIGNvbnN0IHN0YXR1c051bTogeyBba2V5OiBzdHJpbmddOiBudW1iZXIgfSA9IHtcbiAgICBFTVBUWTogMCxcbiAgICBGSU5JU0hFRDogMSxcbiAgICBUQkM6IDIsXG4gIH07XG5cbiAgLy8gRklYTUU6IOWun+ODh+ODvOOCv+OBq+WFpeOCjOabv+OBiOOBpuOBj+OBoOOBleOBhOOAglxuICBjb25zdCBuZW5jaG9MaXN0ID0gW1xuICAgIHsgaWQ6ICd1dWlkMScsIHRpdGxlOiAn5pys5Lq65oOF5aCxJywgc3RhdHVzOiBzdGF0dXNOdW0uRklOSVNIRUQgfSxcbiAgICB7IGlkOiAndXVpZDInLCB0aXRsZTogJ+mFjeWBtuiAheaDheWgsScsIHN0YXR1czogc3RhdHVzTnVtLkZJTklTSEVEIH0sXG4gICAgeyBpZDogJ3V1aWQzJywgdGl0bGU6ICflrrbml4/mg4XloLEnLCBzdGF0dXM6IHN0YXR1c051bS5GSU5JU0hFRCB9LFxuICAgIHsgaWQ6ICd1dWlkNCcsIHRpdGxlOiAn5L+d6Zm65paZ5o6n6ZmkJywgc3RhdHVzOiBzdGF0dXNOdW0uRU1QVFkgfSxcbiAgICB7IGlkOiAndXVpZDUnLCB0aXRsZTogJ+S9j+WuheODreODvOODs+aOp+mZpCcsIHN0YXR1czogc3RhdHVzTnVtLlRCQyB9LFxuICBdO1xuXG4gIHJldHVybiAoXG4gICAgPD5cbiAgICAgIDxOZW5jaG9IZWFkZXIgLz5cbiAgICAgIDxsaXN0Q29tbW9uLlN0eWxlZExpc3RCb2R5PlxuICAgICAgICA8ZGl2IGNsYXNzTmFtZT0ncGFnZS1iYWNrZ3JvdW5kJz5cbiAgICAgICAgICA8bGlzdENvbW1vbi5TdHlsZWRMaXN0TmVuY2hvPlxuICAgICAgICAgICAge25lbmNob0xpc3QubWFwKG5lbmNobyA9PiAoXG4gICAgICAgICAgICAgIDxkaXYga2V5PXtuZW5jaG8uaWR9IG9uQ2xpY2s9eygpID0+IFJvdXRlci5wdXNoKCcvbmVuY2hvL2luc3VyYW5jZXMnKX0gcm9sZT0nYnV0dG9uJz5cbiAgICAgICAgICAgICAgICA8TmVuY2hvTGlzdEl0ZW0gdGl0bGU9e25lbmNoby50aXRsZX0gc3RhdHVzPXtuZW5jaG8uc3RhdHVzfSAvPlxuICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICkpfVxuICAgICAgICAgIDwvbGlzdENvbW1vbi5TdHlsZWRMaXN0TmVuY2hvPlxuICAgICAgICA8L2Rpdj5cbiAgICAgICAgPGZvb3RlciBjbGFzc05hbWU9J3BhZ2UtZm9vdGVyJz5cbiAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT0nc3VibWlzc2lvbi1idXR0b24nPlxuICAgICAgICAgICAgPFN0eWxlZEJ1dHRvbiBpbXBvcnRhbnQgb25DbGljaz17KCkgPT4gUm91dGVyLnB1c2goJy90YXNrcycpfT5cbiAgICAgICAgICAgICAg5o+Q5Ye644GZ44KLXG4gICAgICAgICAgICA8L1N0eWxlZEJ1dHRvbj5cbiAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICA8c3R5bGUganN4PlxuICAgICAgICAgICAge2BcbiAgICAgICAgICAgICAgLnN1Ym1pc3Npb24tYnV0dG9uIHtcbiAgICAgICAgICAgICAgICBwb3NpdGlvbjogZml4ZWQ7XG4gICAgICAgICAgICAgICAgcmlnaHQ6IDE2cHg7XG4gICAgICAgICAgICAgICAgbGVmdDogMTZweDtcbiAgICAgICAgICAgICAgICBib3R0b206IDE2cHg7XG4gICAgICAgICAgICAgICAgdGV4dC1hbGlnbjogY2VudGVyO1xuICAgICAgICAgICAgICAgIHBhZGRpbmc6IDkzcHggMHB4IDE2cHggMHB4O1xuICAgICAgICAgICAgICAgIGJhY2tncm91bmQ6ICNmZmZmZmY7XG4gICAgICAgICAgICAgICAgYm9yZGVyLXJhZGl1czogMHB4IDBweCA4cHggOHB4O1xuICAgICAgICAgICAgICAgIHdpZHRoOiAoOTclIC0gMzcuOTg0cHgpO1xuICAgICAgICAgICAgICAgIGhlaWdodDogOTNweDtcbiAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAucGFnZS1mb290ZXIge1xuICAgICAgICAgICAgICB9XG4gICAgICAgICAgICBgfVxuICAgICAgICAgIDwvc3R5bGU+XG4gICAgICAgIDwvZm9vdGVyPlxuICAgICAgPC9saXN0Q29tbW9uLlN0eWxlZExpc3RCb2R5PlxuICAgIDwvPlxuICApO1xufTtcblxuZXhwb3J0IGRlZmF1bHQgd2l0aEF1dGhTeW5jKE5lbmNobyk7XG4iXX0= */\n/*@ sourceURL=C:\\\\Users\\\\lenovo\\\\source\\\\repos\\\\TypeScript\\\\src\\\\pages\\\\index.tsx */"))));
};

/* harmony default export */ __webpack_exports__["default"] = (withAuthSync(Nencho));

/***/ })

})
//# sourceMappingURL=index.js.3f3a7ee064a625b862c4.hot-update.js.map