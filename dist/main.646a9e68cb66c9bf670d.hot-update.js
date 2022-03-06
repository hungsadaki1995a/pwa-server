exports.id = "main";
exports.modules = {

/***/ "./src/router/contact.router.ts":
/*!**************************************!*\
  !*** ./src/router/contact.router.ts ***!
  \**************************************/
/*! exports provided: contactRouter */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "contactRouter", function() { return contactRouter; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "tslib");
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(tslib__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var express__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! express */ "express");
/* harmony import */ var express__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(express__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var pg__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! pg */ "pg");
/* harmony import */ var pg__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(pg__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var http2__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! http2 */ "http2");
/* harmony import */ var http2__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(http2__WEBPACK_IMPORTED_MODULE_3__);




const contactRouter = express__WEBPACK_IMPORTED_MODULE_1___default.a.Router();
const pool = new pg__WEBPACK_IMPORTED_MODULE_2__["Pool"]({
    connectionString: 'postgres://ajoxgdsnxjmihp:2e26b14ceefdabcf3b4e047fedf9fa0c74286bf019c7484a17eae76e3179eed1@ec2-34-206-220-95.compute-1.amazonaws.com:5432/dbiv4s763p8fan',
    ssl: {
        rejectUnauthorized: false
    }
});
contactRouter.get('/', (req, res) => Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"])(void 0, void 0, void 0, function* () {
    try {
        const client = yield pool.connect();
        const result = yield client.query('SELECT * FROM contact');
        res.status(http2__WEBPACK_IMPORTED_MODULE_3__["constants"].HTTP_STATUS_OK).send(result.rows);
        client.release();
    }
    catch (e) {
        res.status(http2__WEBPACK_IMPORTED_MODULE_3__["constants"].HTTP_STATUS_INTERNAL_SERVER_ERROR).send(e.message);
    }
}));
contactRouter.post('/', (req, res) => Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"])(void 0, void 0, void 0, function* () {
    try {
        const introduceRequest = req.body;
        const client = yield pool.connect();
        let queryString = `INSERT INTO contact(name, phone_number, address, email, content) values(\'${introduceRequest.name}\', \'${introduceRequest.phone_number}\', \'${introduceRequest.address}\', \'${introduceRequest.email}\', \'${introduceRequest.content}\')`;
        const result = yield client.query(queryString);
        res.status(http2__WEBPACK_IMPORTED_MODULE_3__["constants"].HTTP_STATUS_OK).send({ result });
        client.release();
    }
    catch (e) {
        res.status(http2__WEBPACK_IMPORTED_MODULE_3__["constants"].HTTP_STATUS_INTERNAL_SERVER_ERROR).send(e.message);
    }
}));


/***/ })

};
//# sourceMappingURL=main.646a9e68cb66c9bf670d.hot-update.js.map