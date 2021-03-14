"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _express = require("express");

var _ProductController = _interopRequireDefault(require("../controllers/ProductController"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const productController = new _ProductController.default();
const productRouter = (0, _express.Router)();
productRouter.post('/', productController.create);
productRouter.get('/', productController.index);
productRouter.delete('/:id', productController.delete);
productRouter.put('/:id', productController.update);
var _default = productRouter;
exports.default = _default;