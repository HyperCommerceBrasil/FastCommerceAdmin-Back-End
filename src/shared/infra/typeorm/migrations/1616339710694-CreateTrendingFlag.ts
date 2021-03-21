import {MigrationInterface, QueryRunner, TableColumn} from "typeorm";

export default class CreateTrendingFlag1616339710694 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.addColumn('products', new TableColumn({
            name: 'trending',
            type: 'boolean',
            isNullable: true
        }))
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropColumn('products', 'trending');
    }

}
