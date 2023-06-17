import { MigrationInterface, QueryRunner, Table, TableColumn } from 'typeorm';

export class CreateTableShortUrlMigration1686805447945 implements MigrationInterface {

  async up(queryRunner: QueryRunner): Promise<void> {
    const table = new Table({
      name: 'short_url',
      engine: 'InnoDB',
    });

    table.addColumn(new TableColumn({
      name: 'short_id',
      type: 'varchar',
      length: '36',
      charset: 'utf8mb4',
      isNullable: false,
      isPrimary: true,
      isUnique: true,
    }));

    table.addColumn(new TableColumn({
      name: 'short_code',
      type: 'varchar',
      length: '6',
      charset: 'utf8mb4',
      isNullable: false,
      isUnique: true,
    }));

    table.addColumn(new TableColumn({
      name: 'created_at',
      type: 'datetime',
      precision: 6,
      default: 'CURRENT_TIMESTAMP(6)',
      isNullable: false,
    }));

    table.addColumn(new TableColumn({
      name: 'updated_at',
      type: 'datetime',
      precision: 6,
      default: 'CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6)',
      isNullable: false,
    }));

    table.addColumn(new TableColumn({
      name: 'deleted_at',
      type: 'datetime',
      precision: 6,
      isNullable: true,
    }));

    table.addColumn(new TableColumn({
      name: 'real_url',
      type: 'varchar',
      charset: 'utf8mb4',
      length: '2048',
      isNullable: false,
    }));

    table.addColumn(new TableColumn({
      name: 'access_count',
      type: 'int',
      default: 0,
      isNullable: false,
    }));

    await queryRunner.createTable(table, true);
  }

  async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('short_url', true);
  }

}
