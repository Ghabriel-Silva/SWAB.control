import { AppDataSource } from "../../../shared/database/data-source";
import { SwabSequence } from "../../../shared/database/entities/SwabSequence";

class SwabSequenceRepository {
    nextSequence = async (
        companyId: string,
        prefix: string
    ) => {

        const queryRunner = AppDataSource.createQueryRunner()

        await queryRunner.connect()
        await queryRunner.startTransaction()

        try {

            const existing = await queryRunner.manager.findOne(
                SwabSequence,
                {
                    where: {
                        companyId,
                        prefix
                    }
                }
            )

            if (!existing) {

                const newSequence = queryRunner.manager.create(
                    SwabSequence,
                    {
                        companyId,
                        prefix,
                        lastNumber: 0
                    }
                )

                await queryRunner.manager.save(newSequence)
            }

            await queryRunner.manager
                .createQueryBuilder()
                .update(SwabSequence)
                .set({
                    lastNumber: () => "lastNumber + 1"
                })
                .where(
                    "companyId = :companyId AND prefix = :prefix",
                    {
                        companyId,
                        prefix
                    }
                )
                .execute()

            const sequence = await queryRunner.manager.findOne(
                SwabSequence,
                {
                    where: {
                        companyId,
                        prefix
                    }
                }
            )

            await queryRunner.commitTransaction()

            return sequence!.lastNumber

        } catch (err) {

            await queryRunner.rollbackTransaction()
            throw err

        } finally {

            await queryRunner.release()
        }
    }
}

export default SwabSequenceRepository