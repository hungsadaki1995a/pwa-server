exports.id = "main";
exports.modules = {

/***/ "./src/router/album.router.ts":
/*!************************************!*\
  !*** ./src/router/album.router.ts ***!
  \************************************/
/*! exports provided: albumRouter */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "albumRouter", function() { return albumRouter; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "tslib");
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(tslib__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var express__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! express */ "express");
/* harmony import */ var express__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(express__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var pg__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! pg */ "pg");
/* harmony import */ var pg__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(pg__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var http2__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! http2 */ "http2");
/* harmony import */ var http2__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(http2__WEBPACK_IMPORTED_MODULE_3__);




const albumRouter = express__WEBPACK_IMPORTED_MODULE_1___default.a.Router();
const pool = new pg__WEBPACK_IMPORTED_MODULE_2__["Pool"]({
    connectionString: 'postgres://ohzdvanjcvhgww:f2b54928cdbd5258f3a4e05c7c340d1c8d13a55186cab1a806bd0b089bca98de@ec2-3-214-3-162.compute-1.amazonaws.com:5432/d9dlljd2n92mbj',
    ssl: {
        rejectUnauthorized: false
    }
});
albumRouter.get('/', (req, res) => Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"])(void 0, void 0, void 0, function* () {
    try {
        const client = yield pool.connect();
        const result = yield client.query('SELECT * FROM album_category ORDER BY id DESC');
        res.status(http2__WEBPACK_IMPORTED_MODULE_3__["constants"].HTTP_STATUS_OK).send(result.rows);
        client.release();
    }
    catch (e) {
        res.status(http2__WEBPACK_IMPORTED_MODULE_3__["constants"].HTTP_STATUS_INTERNAL_SERVER_ERROR).send(e.message);
    }
}));
albumRouter.post('/', (req, res) => Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"])(void 0, void 0, void 0, function* () {
    try {
        const body = req.body;
        const client = yield pool.connect();
        const queryString = `INSERT INTO album_category(name) values(\'${body.name}\')`;
        const result = yield client.query(queryString);
        res.status(http2__WEBPACK_IMPORTED_MODULE_3__["constants"].HTTP_STATUS_OK).send({});
        client.release();
    }
    catch (e) {
        res.status(http2__WEBPACK_IMPORTED_MODULE_3__["constants"].HTTP_STATUS_INTERNAL_SERVER_ERROR).send(e.message);
    }
}));


/***/ })

};
//# sourceMappingURL=main.6938ab2b3fe4fb57a9bb.hot-update.js.map