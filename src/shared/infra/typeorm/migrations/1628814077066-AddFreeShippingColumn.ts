import {MigrationInterface, QueryRunner, TableColumn} from "typeorm";


export default class AddFreeShippingColumn1628814077066 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {

        await queryRunner.addColumn('products', new TableColumn({
            name: 'isFreeShipping',
            type: 'boolean',
            isNullable: true

        }))
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropColumn('products', 'isFreeShipping')
    }

}
