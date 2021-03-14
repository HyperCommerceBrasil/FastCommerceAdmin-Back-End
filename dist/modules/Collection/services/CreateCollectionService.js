"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _AppError = _interopRequireDefault(require("../../../shared/errors/AppError"));

var _tsyringe = require("tsyringe");

var _ICollectionRepository = _interopRequireDefault(require("../repositories/ICollectionRepository"));

var _dec, _dec2, _dec3, _dec4, _class;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

let CreateCollectionService = (_dec = (0, _tsyringe.injectable)(), _dec2 = function (target, key) {
  return (0, _tsyringe.inject)('CollectionsRepository')(target, undefined, 0);
}, _dec3 = Reflect.metadata("design:type", Function), _dec4 = Reflect.metadata("design:paramtypes", [typeof _ICollectionRepository.default === "undefined" ? Object : _ICollectionRepository.default]), _dec(_class = _dec2(_class = _dec3(_class = _dec4(_class = class CreateCollectionService {
  constructor(collectionsRepository) {
    this.collectionsRepository = collectionsRepository;
  }

  async execute(name) {
    const existentSameName = await this.collectionsRepository.findByName(name);

    if (existentSameName) {
      throw new _AppError.default('Ja existe uma coleção com este nome :(');
    }

    const collection = await this.collectionsRepository.create(name);
    return collection;
  }

}) || _class) || _class) || _class) || _class);
exports.default = CreateCollectionService;