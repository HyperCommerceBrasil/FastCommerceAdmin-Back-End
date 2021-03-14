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
    name,
    price,
    quantity,
    collectionId
  }) {
    const collection = await this.collectionsRepository.findById(collectionId);

    if (!collection) {
      throw new _AppError.default('A Coleção informada, não existe. Por favor verifique');
    }

    const productSameName = await this.productsRepository.search(name);

    if (productSameName.length > 0) {
      throw new _AppError.default('Ja existe um produto com este nome');
    }

    if (!price || price < 0) {
      throw new _AppError.default('Por favor, informe o preço do produto, este preço precisa ser maior que 0');
    }

    const productCreated = await this.productsRepository.create({
      collection,
      name,
      price,
      quantity
    });
    return productCreated;
  }

}) || _class) || _class) || _class) || _class) || _class);
var _default = CreateProductService;
exports.default = _default;