import {MigrationInterface, QueryRunner, TableColumn} from "typeorm";

export default class CreateIsACtiveColumn1618685061631 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.addColumn("products", new TableColumn({
            name: "is_active",
            type: "boolean",
            isNullable: true
        }))
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropColumn("products", "is_active")
    }

}
