import { MigrationInterface, QueryRunner, Table } from "typeorm";

export class CreateProductsTable1721061017157 implements MigrationInterface {
    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(new Table({
            name: 'product',
            columns: [
                {
                    name: 'id',
                    type: 'varchar',
                    length: '36',
                    isPrimary: true,
                },
                {
                    name: 'name',
                    type: 'varchar',
                },
                {
                    name: 'description',
                    type: 'text',
                },
                {
                    name: 'price',
                    type: 'decimal',
                },
                {
                    name: 'stock_quantity',
                    type: 'int',
                },
                {
                    name: 'created_at',
                    type: 'timestamp',
                    default: 'CURRENT_TIMESTAMP',
                },
                {
                    name: 'updated_at',
                    type: 'timestamp',
                    default: 'CURRENT_TIMESTAMP',
                },
            ],
        }), true);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable('product');
    }
}
