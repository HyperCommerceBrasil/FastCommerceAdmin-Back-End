"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _typeorm = require("typeorm");

class CreateProductsImagesTable1613415789765 {
  async up(queryRunner) {
    await queryRunner.createTable(new _typeorm.Table({
      name: 'product_images',
      columns: [{
        name: 'id',
        type: 'uuid',
        isPrimary: true,
        generationStrategy: 'uuid',
        default: 'uuid_generate_v4()'
      }, {
        name: 'image',
        type: 'varchar',
        isNullable: false
      }, {
        name: 'productId',
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
    await queryRunner.createForeignKey('product_images', new _typeorm.TableForeignKey({
      columnNames: ['productId'],
      name: 'FkProductImage',
      referencedColumnNames: ['id'],
      referencedTableName: 'products'
    }));
  }

  async down(queryRunner) {
    await queryRunner.dropForeignKey('product_images', 'FkProductImage');
    await queryRunner.dropTable('product_images');
  }

}

exports.default = CreateProductsImagesTable1613415789765;