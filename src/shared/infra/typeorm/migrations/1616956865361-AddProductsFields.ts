import {MigrationInterface, QueryRunner, TableColumn} from "typeorm";

export default class AddProductsFields1616956865361 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.addColumn("products", new TableColumn({
            name: "details",
            type: "text",
            isNullable: true,
        }))

        await queryRunner.addColumn("products", new TableColumn({
            name: "ean",
            type: "varchar",
            isNullable: true,
        }))

         await queryRunner.addColumn("products", new TableColumn({
            name: "price_promotional",
            type: "varchar",
            isNullable: true,
        }))

         await queryRunner.addColumn("products", new TableColumn({
            name: "description",
            type: "varchar",
            isNullable: true,
        }))
    }

    public async down(queryRunner: QueryRunner): Promise<void> {

        await queryRunner.dropColumn("products", "details")
        await queryRunner.dropColumn("products", "ean")
        await queryRunner.dropColumn("products", "price_promotional")
        await queryRunner.dropColumn("products", "description")
    }

}
