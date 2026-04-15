import { MigrationInterface, QueryRunner } from "typeorm";

export class CreatColumns1776289762426 implements MigrationInterface {
    name = 'CreatColumns1776289762426'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE \`operator-position\` (\`id\` varchar(36) NOT NULL, \`name\` varchar(255) NOT NULL, \`createdAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updatedAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`companyId\` varchar(36) NULL, UNIQUE INDEX \`IDX_0be43e00ad261d7e23fb14182a\` (\`name\`), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`tank\` (\`id\` varchar(36) NOT NULL, \`name\` varchar(100) NOT NULL, \`description\` varchar(600) NOT NULL, \`createdAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updatedAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`companyId\` varchar(36) NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`swab_checks\` (\`id\` varchar(36) NOT NULL, \`type\` enum ('VISUAL', 'ATP', 'MICRO') NOT NULL, \`result\` enum ('PENDING', 'IN_PROGRESS', 'APPROVED', 'REPROVED') NOT NULL, \`batch\` varchar(255) NULL, \`createdAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`swabId\` varchar(36) NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`swabs\` (\`id\` varchar(36) NOT NULL, \`createdAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updatedAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`operatorId\` varchar(36) NULL, \`tankId\` varchar(36) NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`operator\` (\`id\` varchar(36) NOT NULL, \`name\` varchar(50) NOT NULL, \`createdAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updatedAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`positionId\` varchar(36) NULL, \`companyId\` varchar(36) NULL, \`laboratoryId\` varchar(36) NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`laboratory\` (\`id\` varchar(36) NOT NULL, \`name\` varchar(100) NOT NULL, \`createdAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updatedAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`companyId\` varchar(36) NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`ALTER TABLE \`user\` CHANGE \`id\` \`id\` int NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`user\` DROP PRIMARY KEY`);
        await queryRunner.query(`ALTER TABLE \`user\` DROP COLUMN \`id\``);
        await queryRunner.query(`ALTER TABLE \`user\` ADD \`id\` varchar(36) NOT NULL PRIMARY KEY`);
        await queryRunner.query(`ALTER TABLE \`operator-position\` ADD CONSTRAINT \`FK_2938e4555d4c3265fbe8e2f06c0\` FOREIGN KEY (\`companyId\`) REFERENCES \`company\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`tank\` ADD CONSTRAINT \`FK_00e8e8284791f23325747c39315\` FOREIGN KEY (\`companyId\`) REFERENCES \`company\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`swab_checks\` ADD CONSTRAINT \`FK_190133dce9343919f7a453cd31a\` FOREIGN KEY (\`swabId\`) REFERENCES \`swabs\`(\`id\`) ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`swabs\` ADD CONSTRAINT \`FK_561722e2378531c0617992aeaaf\` FOREIGN KEY (\`operatorId\`) REFERENCES \`operator\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`swabs\` ADD CONSTRAINT \`FK_1b51395cdcb1d6bc0a421781b37\` FOREIGN KEY (\`tankId\`) REFERENCES \`tank\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`operator\` ADD CONSTRAINT \`FK_4a88b4ba69a3b497fc810dea7e6\` FOREIGN KEY (\`positionId\`) REFERENCES \`operator-position\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`operator\` ADD CONSTRAINT \`FK_a8eb62659dfb7dbe980f7ba46b8\` FOREIGN KEY (\`companyId\`) REFERENCES \`company\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`operator\` ADD CONSTRAINT \`FK_2e0629500692a470b47f8bb0fe4\` FOREIGN KEY (\`laboratoryId\`) REFERENCES \`laboratory\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`laboratory\` ADD CONSTRAINT \`FK_546b835dbcbe3c8046934f6f57b\` FOREIGN KEY (\`companyId\`) REFERENCES \`company\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`laboratory\` DROP FOREIGN KEY \`FK_546b835dbcbe3c8046934f6f57b\``);
        await queryRunner.query(`ALTER TABLE \`operator\` DROP FOREIGN KEY \`FK_2e0629500692a470b47f8bb0fe4\``);
        await queryRunner.query(`ALTER TABLE \`operator\` DROP FOREIGN KEY \`FK_a8eb62659dfb7dbe980f7ba46b8\``);
        await queryRunner.query(`ALTER TABLE \`operator\` DROP FOREIGN KEY \`FK_4a88b4ba69a3b497fc810dea7e6\``);
        await queryRunner.query(`ALTER TABLE \`swabs\` DROP FOREIGN KEY \`FK_1b51395cdcb1d6bc0a421781b37\``);
        await queryRunner.query(`ALTER TABLE \`swabs\` DROP FOREIGN KEY \`FK_561722e2378531c0617992aeaaf\``);
        await queryRunner.query(`ALTER TABLE \`swab_checks\` DROP FOREIGN KEY \`FK_190133dce9343919f7a453cd31a\``);
        await queryRunner.query(`ALTER TABLE \`tank\` DROP FOREIGN KEY \`FK_00e8e8284791f23325747c39315\``);
        await queryRunner.query(`ALTER TABLE \`operator-position\` DROP FOREIGN KEY \`FK_2938e4555d4c3265fbe8e2f06c0\``);
        await queryRunner.query(`ALTER TABLE \`user\` DROP COLUMN \`id\``);
        await queryRunner.query(`ALTER TABLE \`user\` ADD \`id\` int NOT NULL AUTO_INCREMENT`);
        await queryRunner.query(`ALTER TABLE \`user\` ADD PRIMARY KEY (\`id\`)`);
        await queryRunner.query(`ALTER TABLE \`user\` CHANGE \`id\` \`id\` int NOT NULL AUTO_INCREMENT`);
        await queryRunner.query(`DROP TABLE \`laboratory\``);
        await queryRunner.query(`DROP TABLE \`operator\``);
        await queryRunner.query(`DROP TABLE \`swabs\``);
        await queryRunner.query(`DROP TABLE \`swab_checks\``);
        await queryRunner.query(`DROP TABLE \`tank\``);
        await queryRunner.query(`DROP INDEX \`IDX_0be43e00ad261d7e23fb14182a\` ON \`operator-position\``);
        await queryRunner.query(`DROP TABLE \`operator-position\``);
    }

}
