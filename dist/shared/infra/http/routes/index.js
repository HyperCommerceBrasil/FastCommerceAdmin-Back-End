"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _express = require("express");

var _collections = _interopRequireDefault(require("../../../../modules/Collection/infra/http/routes/collections.routes"));

var _product = _interopRequireDefault(require("../../../../modules/Product/infra/http/routes/product.routes"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const routes = (0, _express.Router)();
routes.use('/collections', _collections.default);
routes.use('/products', _product.default);
var _default = routes;
exports.default = _default;