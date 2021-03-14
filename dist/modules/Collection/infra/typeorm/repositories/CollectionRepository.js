"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _typeorm = require("typeorm");

var _Collection = _interopRequireDefault(require("../entities/Collection"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

class CollectionRepository {
  constructor() {
    this.ormRepository = void 0;
    this.ormRepository = (0, _typeorm.getRepository)(_Collection.default);
  }

  async create(name) {
    const collection = this.ormRepository.create({
      name
    });
    await this.ormRepository.save(collection);
    return collection;
  }

  async findById(id) {
    const collection = await this.ormRepository.findOne(id);
    return collection;
  }

  async findByName(name) {
    const collection = await this.ormRepository.findOne({
      where: {
        name
      }
    });
    return collection;
  }

  async findAll() {
    const collections = await this.ormRepository.find();
    return collections;
  }

  async deleteById(id) {
    await this.ormRepository.delete(id);
  }

  async search(name) {
    const result = await this.ormRepository.find({
      where: {
        name: (0, _typeorm.Like)(`%${name}%`)
      }
    });
    return result;
  }

}

var _default = CollectionRepository;
exports.default = _default;