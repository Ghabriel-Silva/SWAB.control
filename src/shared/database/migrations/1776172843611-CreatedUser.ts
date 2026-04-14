import { MigrationInterface, QueryRunner } from "typeorm";

export class CreatedUser1776172843611 implements MigrationInterface {
    name = 'CreateCompany1776172843611'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`user\` DROP COLUMN \`firstName\``);
        await queryRunner.query(`ALTER TABLE \`user\` DROP COLUMN \`lastName\``);
        await queryRunner.query(`ALTER TABLE \`user\` DROP COLUMN \`age\``);
        await queryRunner.query(`ALTER TABLE \`user\` ADD \`name\` varchar(50) NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`user\` ADD \`email\` varchar(50) NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`user\` ADD UNIQUE INDEX \`IDX_e12875dfb3b1d92d7d7c5377e2\` (\`email\`)`);
        await queryRunner.query(`ALTER TABLE \`user\` ADD \`password\` varchar(100) NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`user\` ADD \`role\` enum ('OWNER', 'ADMIN', 'LAB') NOT NULL DEFAULT 'LAB'`);
        await queryRunner.query(`ALTER TABLE \`user\` ADD \`createdAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6)`);
        await queryRunner.query(`ALTER TABLE \`user\` ADD \`updatedAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6)`);
        await queryRunner.query(`ALTER TABLE \`user\` ADD \`companyId\` varchar(36) NULL`);
        await queryRunner.query(`ALTER TABLE \`user\` ADD CONSTRAINT \`FK_86586021a26d1180b0968f98502\` FOREIGN KEY (\`companyId\`) REFERENCES \`company\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`user\` DROP FOREIGN KEY \`FK_86586021a26d1180b0968f98502\``);
        await queryRunner.query(`ALTER TABLE \`user\` DROP COLUMN \`companyId\``);
        await queryRunner.query(`ALTER TABLE \`user\` DROP COLUMN \`updatedAt\``);
        await queryRunner.query(`ALTER TABLE \`user\` DROP COLUMN \`createdAt\``);
        await queryRunner.query(`ALTER TABLE \`user\` DROP COLUMN \`role\``);
        await queryRunner.query(`ALTER TABLE \`user\` DROP COLUMN \`password\``);
        await queryRunner.query(`ALTER TABLE \`user\` DROP INDEX \`IDX_e12875dfb3b1d92d7d7c5377e2\``);
        await queryRunner.query(`ALTER TABLE \`user\` DROP COLUMN \`email\``);
        await queryRunner.query(`ALTER TABLE \`user\` DROP COLUMN \`name\``);
        await queryRunner.query(`ALTER TABLE \`user\` ADD \`age\` int NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`user\` ADD \`lastName\` varchar(255) NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`user\` ADD \`firstName\` varchar(255) NOT NULL`);
    }

}
