"use strict";
(() => {
var exports = {};
exports.id = 624;
exports.ids = [624];
exports.modules = {

/***/ 9648:
/***/ ((module) => {

module.exports = import("axios");;

/***/ }),

/***/ 975:
/***/ ((module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.a(module, async (__webpack_handle_async_dependencies__, __webpack_async_result__) => { try {
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ charge)
/* harmony export */ });
/* harmony import */ var axios__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(9648);
var __webpack_async_dependencies__ = __webpack_handle_async_dependencies__([axios__WEBPACK_IMPORTED_MODULE_0__]);
axios__WEBPACK_IMPORTED_MODULE_0__ = (__webpack_async_dependencies__.then ? (await __webpack_async_dependencies__)() : __webpack_async_dependencies__)[0];

async function charge(req, res) {
    if (req.method === "POST") {
        const { token , amountInCents , currency , name , description , metadata  } = req.body;
        try {
            const response = await axios__WEBPACK_IMPORTED_MODULE_0__["default"].post("https://online.yoco.com/v1/charges/", {
                token,
                amountInCents,
                currency,
                name,
                description,
                metadata: {
                    email: metadata.email,
                    username: metadata.username
                }
            }, {
                headers: {
                    "X-Auth-Secret-Key": process.env.NEXT_PUBLIC_YOCO_SK
                }
            });
            res.status(200).json({
                message: "[API] - Successful payment"
            });
        } catch (error) {
            res.status(500).json({
                message: "Oops, there was a problem"
            });
        }
    }
}

__webpack_async_result__();
} catch(e) { __webpack_async_result__(e); } });

/***/ })

};
;

// load runtime
var __webpack_require__ = require("../../webpack-api-runtime.js");
__webpack_require__.C(exports);
var __webpack_exec__ = (moduleId) => (__webpack_require__(__webpack_require__.s = moduleId))
var __webpack_exports__ = (__webpack_exec__(975));
module.exports = __webpack_exports__;

})();