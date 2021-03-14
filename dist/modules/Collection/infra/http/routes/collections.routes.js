"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _express = require("express");

var _CollectionsController = _interopRequireDefault(require("../controllers/CollectionsController"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const collectionController = new _CollectionsController.default();
const collectionRouter = (0, _express.Router)();
collectionRouter.post('/', collectionController.create);
collectionRouter.get('/', collectionController.index);
collectionRouter.delete('/:idCollection', collectionController.delete);
collectionRouter.get('/search', collectionController.search);
var _default = collectionRouter;
exports.default = _default;