"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _tsyringe = require("tsyringe");

var _CreateProductService = _interopRequireDefault(require("../../../services/CreateProductService"));

var _ListProductService = _interopRequireDefault(require("../../../services/ListProductService"));

var _DeleteProductService = _interopRequireDefault(require("../../../services/DeleteProductService"));

var _UpdateProductService = _interopRequireDefault(require("../../../services/UpdateProductService"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

class ProductController {
  async create(request, response) {
    const createProduct = _tsyringe.container.resolve(_CreateProductService.default);

    const {
      name,
      quantity,
      price,
      collectionId
    } = request.body;
    const product = await createProduct.execute({
      collectionId,
      name,
      price,
      quantity
    });
    return response.status(201).json(product);
  }

  async index(request, response) {
    const listProducts = _tsyringe.container.resolve(_ListProductService.default);

    const products = await listProducts.execute();
    return response.status(200).json(products);
  }

  async delete(request, response) {
    const deleteProduct = _tsyringe.container.resolve(_DeleteProductService.default);

    const {
      id
    } = request.params;
    await deleteProduct.execute(id);
    return response.status(200).json();
  }

  async update(request, response) {
    const updateProduct = _tsyringe.container.resolve(_UpdateProductService.default);

    const {
      id
    } = request.params;
    const {
      name,
      price,
      quantity,
      collectionId
    } = request.body;
    const product = await updateProduct.execute({
      collectionId,
      id,
      name,
      price,
      quantity
    });
    return response.status(200).json(product);
  }

}

exports.default = ProductController;