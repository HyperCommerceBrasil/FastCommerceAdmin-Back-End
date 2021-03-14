"use strict";

var _CollectionRepository = _interopRequireDefault(require("../../modules/Collection/infra/typeorm/repositories/CollectionRepository"));

var _ProductRepository = _interopRequireDefault(require("../../modules/Product/infra/typeorm/repositories/ProductRepository"));

var _tsyringe = require("tsyringe");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

_tsyringe.container.registerSingleton('CollectionsRepository', _CollectionRepository.default);

_tsyringe.container.registerSingleton('ProductsRepository', _ProductRepository.default);