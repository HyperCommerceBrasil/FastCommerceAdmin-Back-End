import {MigrationInterface, QueryRunner, Table, TableForeignKey} from "typeorm";

export default class CreateStatusCodeTable1629239702467 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(new Table({
            name: 'status',
            columns: [
                {
                    name: 'id',
                    type: 'uuid',
                    isPrimary: true,
                    generationStrategy: 'uuid',
                    default: 'uuid_generate_v4()',
                },
                {
                    name: 'code',
                    type: 'varchar',
                    isNullable: false,
                    isUnique: true,
                },
                {
                    name: 'description',
                    type: 'varchar',
                    isNullable: false,
                },
                {
                    name: 'type',
                    type: 'varchar',
                    isNullable: false,
                },
                {
                    name: 'origin',
                    type: 'varchar',
                    isNullable: true,
                },
                
            ]
        }))


        await queryRunner.createForeignKey('orders',  new TableForeignKey({
            columnNames: ['statusCode'],
            name: 'FkStatusCode',
            referencedColumnNames: ['code'],
            referencedTableName: 'status',
        }))


    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropForeignKey('orders', 'FkStatusCode');
        await queryRunner.dropTable('status')
    }

}
