"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _typeorm = require("typeorm");

var _Product = _interopRequireDefault(require("../entities/Product"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

class ProductRepository {
  constructor() {
    this.ormRepository = void 0;
    this.ormRepository = (0, _typeorm.getRepository)(_Product.default);
  }

  async create(data) {
    const product = this.ormRepository.create(data);
    await this.ormRepository.save(product);
    return product;
  }

  async findAll() {
    const products = this.ormRepository.find();
    return products;
  }

  async findById(id) {
    const product = this.ormRepository.findOne(id);
    return product;
  }

  async search(search) {
    const products = this.ormRepository.find({
      where: {
        name: (0, _typeorm.Like)(`%${search}%`)
      }
    });
    return products;
  }

  async deleteById(id) {
    await this.ormRepository.delete(id);
  }

  async update(data) {
    await this.ormRepository.save(data);
    return data;
  }

}

var _default = ProductRepository;
exports.default = _default;