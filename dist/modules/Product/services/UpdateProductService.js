"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _ICollectionRepository = _interopRequireDefault(require("../../Collection/repositories/ICollectionRepository"));

var _AppError = _interopRequireDefault(require("../../../shared/errors/AppError"));

var _tsyringe = require("tsyringe");

var _IProductRepository = _interopRequireDefault(require("../repositories/IProductRepository"));

var _dec, _dec2, _dec3, _dec4, _dec5, _class;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

let CreateProductService = (_dec = (0, _tsyringe.injectable)(), _dec2 = function (target, key) {
  return (0, _tsyringe.inject)('ProductsRepository')(target, undefined, 0);
}, _dec3 = function (target, key) {
  return (0, _tsyringe.inject)('CollectionsRepository')(target, undefined, 1);
}, _dec4 = Reflect.metadata("design:type", Function), _dec5 = Reflect.metadata("design:paramtypes", [typeof _IProductRepository.default === "undefined" ? Object : _IProductRepository.default, typeof _ICollectionRepository.default === "undefined" ? Object : _ICollectionRepository.default]), _dec(_class = _dec2(_class = _dec3(_class = _dec4(_class = _dec5(_class = class CreateProductService {
  constructor(productsRepository, collectionsRepository) {
    this.productsRepository = productsRepository;
    this.collectionsRepository = collectionsRepository;
  }

  async execute({
    id,
    name,
    price,
    quantity,
    collectionId
  }) {
    const product = await this.productsRepository.findById(id);
    const collection = await this.collectionsRepository.findById(collectionId);

    if (!product) {
      throw new _AppError.default('Este produto não existe :(');
    }

    product.collection = collection || product.collection;
    product.name = name;
    product.price = price;
    product.quantity = quantity;
    await this.productsRepository.update(product);
    return product;
  }

}) || _class) || _class) || _class) || _class) || _class);
var _default = CreateProductService;
exports.default = _default;