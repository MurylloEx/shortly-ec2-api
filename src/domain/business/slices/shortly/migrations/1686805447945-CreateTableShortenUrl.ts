import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateTableShortenUrlMigration1686805447945 implements MigrationInterface {

  async up(queryRunner: QueryRunner): Promise<void> {
    queryRunner.query(`
      CREATE TABLE IF NOT EXISTS 'message' (
        'id'	varchar NOT NULL,
        'createdAt'	datetime NOT NULL DEFAULT (datetime('now')),
        'updatedAt'	datetime NOT NULL DEFAULT (datetime('now')),
        'deletedAt'	datetime,
        'title'	varchar NOT NULL,
        'description'	varchar NOT NULL,
        PRIMARY KEY('id')
      );
    `);
  }

  async down(queryRunner: QueryRunner): Promise<void> {
    queryRunner.query(`DROP TABLE IF EXISTS 'shorten_url'`);
  }

}