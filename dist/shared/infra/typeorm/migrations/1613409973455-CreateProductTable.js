"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _typeorm = require("typeorm");

class CreateProductTable1613409973455 {
  async up(queryRunner) {
    await queryRunner.createTable(new _typeorm.Table({
      name: 'products',
      columns: [{
        name: 'id',
        type: 'uuid',
        isPrimary: true,
        generationStrategy: 'uuid',
        default: 'uuid_generate_v4()'
      }, {
        name: 'name',
        type: 'varchar',
        isNullable: false
      }, {
        name: 'price',
        type: 'float',
        isNullable: false
      }, {
        name: 'quantity',
        type: 'integer',
        isNullable: false
      }, {
        name: 'collectionId',
        type: 'uuid',
        isNullable: false
      }, {
        name: 'created_at',
        type: 'timestamp',
        default: 'now()'
      }, {
        name: 'updated_at',
        type: 'timestamp',
        default: 'now()'
      }]
    }));
    await queryRunner.createForeignKey('products', new _typeorm.TableForeignKey({
      name: 'FkCollectionProduct',
      columnNames: ['collectionId'],
      referencedTableName: 'collections',
      referencedColumnNames: ['id']
    }));
  }

  async down(queryRunner) {
    await queryRunner.dropForeignKey('products', 'FkCollectionProduct');
    await queryRunner.dropTable('products');
  }

}

exports.default = CreateProductTable1613409973455;