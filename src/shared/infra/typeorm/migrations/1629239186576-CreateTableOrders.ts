import {
  MigrationInterface,
  QueryRunner,
  Table,
  TableForeignKey,
} from 'typeorm';

export default class CreateTableOrders1629239186576
  implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'orders',
        columns: [
          {
            name: 'id',
            type: 'uuid',
            isPrimary: true,
            generationStrategy: 'uuid',
            default: 'uuid_generate_v4()',
          },
          {
            name: 'numberOrder',
            type: 'int',
            isGenerated: true,
            generationStrategy: 'increment',
            isUnique: true,
            isNullable: false,
          },
          {
            name: 'statusCode',
            type: 'varchar',
            isNullable: false,
          },
          {
            name: 'customerId',
            type: 'uuid',
            isNullable: false,
          },
          {
            name: 'street',
            type: 'varchar',
            isNullable: false,
          },
          {
            name: 'district',
            type: 'varchar',
            isNullable: false,
          },
          {
            name: 'uf',
            type: 'varchar',
            isNullable: false,
          },
          {
            name: 'numberHouse',
            type: 'varchar',
            isNullable: false,
          },
          {
            name: 'cep',
            type: 'varchar',
            isNullable: false,
          },
          {
            name: 'city',
            type: 'varchar',
            isNullable: false,
          },
          {
            name: 'created_at',
            type: 'timestamp',
            default: 'now()',
          },
          {
            name: 'updated_at',
            type: 'timestamp',
            default: 'now()',
          },
        ],
      }),
    );

    await queryRunner.createForeignKey(
      'orders',
      new TableForeignKey({
        columnNames: ['customerId'],
        name: 'FkOrderCustomer',
        referencedColumnNames: ['id'],
        referencedTableName: 'customers',
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('orders');
  }
}
