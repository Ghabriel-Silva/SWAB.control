import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateCompany1776092268839 implements MigrationInterface {
    name = 'CreateCompany1776092268839'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE \`company\` (\`id\` varchar(36) NOT NULL, \`name\` varchar(50) NOT NULL, \`slug\` varchar(255) NOT NULL, \`address\` varchar(100) NOT NULL, \`isActive\` tinyint NOT NULL DEFAULT 1, \`createdAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updatedAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), UNIQUE INDEX \`IDX_47216baa0f0c8ebc6ee5a74989\` (\`slug\`), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP INDEX \`IDX_47216baa0f0c8ebc6ee5a74989\` ON \`company\``);
        await queryRunner.query(`DROP TABLE \`company\``);
    }

}
