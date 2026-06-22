import { MigrationInterface, QueryRunner } from "typeorm";

export class UpdateNameTankTolocation1781627474249 implements MigrationInterface {
    name = 'UpdateNameTankTolocation1781627474249'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`swabs\` DROP FOREIGN KEY \`FK_1b51395cdcb1d6bc0a421781b37\``);
        await queryRunner.query(`ALTER TABLE \`swabs\` CHANGE \`tankId\` \`locationId\` varchar(36) NULL`);
        await queryRunner.query(`CREATE TABLE \`location\` (\`id\` varchar(36) NOT NULL, \`name\` varchar(100) NOT NULL, \`atpFrequency\` int NOT NULL DEFAULT '3', \`description\` varchar(600) NOT NULL, \`atpLimit\` int NULL, \`createdAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updatedAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`companyId\` varchar(36) NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`ALTER TABLE \`location\` ADD CONSTRAINT \`FK_f267b47598f6f0f69feaafaeaae\` FOREIGN KEY (\`companyId\`) REFERENCES \`company\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`swabs\` ADD CONSTRAINT \`FK_f3e74a8554aec6019fd8061a85a\` FOREIGN KEY (\`locationId\`) REFERENCES \`location\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`swabs\` DROP FOREIGN KEY \`FK_f3e74a8554aec6019fd8061a85a\``);
        await queryRunner.query(`ALTER TABLE \`location\` DROP FOREIGN KEY \`FK_f267b47598f6f0f69feaafaeaae\``);
        await queryRunner.query(`DROP TABLE \`location\``);
        await queryRunner.query(`ALTER TABLE \`swabs\` CHANGE \`locationId\` \`tankId\` varchar(36) NULL`);
        await queryRunner.query(`ALTER TABLE \`swabs\` ADD CONSTRAINT \`FK_1b51395cdcb1d6bc0a421781b37\` FOREIGN KEY (\`tankId\`) REFERENCES \`tank\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

}
