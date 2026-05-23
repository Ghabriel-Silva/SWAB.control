import { date } from "yup"
import { MyJwtPayload } from "../../../shared/auth/types/auth.types"
import { Swab } from "../../../shared/database/entities/Swab"

import { FilterSwabsQueryType } from "../dto/schemas/filter.swabs.query.schema"
import { SwabResponseMapper } from "../mapper/swab.filter.response.mapper"
import SwabFilterRepository from "../repository/filter.swab.repository"
import { addDays, subDays, startOfDay } from "date-fns";


class FilterSwab {
    constructor(
        private swabFilterRepository: SwabFilterRepository
    ) { }

    execute = async (
        payload: MyJwtPayload,
        filterSwabs: FilterSwabsQueryType
    ) => {
        let startDate = subDays(
            startOfDay(new Date()),
            30
        )

        let endDate = addDays(
            startOfDay(new Date()),
            1
        )

        if (filterSwabs.startDate) {
            startOfDay(
                new Date(filterSwabs.startDate)
            )
        }

        if (filterSwabs.endDate) {
            endDate = addDays(
                startOfDay(
                    new Date(filterSwabs.endDate)
                ),
                1
            );
        }

        console.log(endDate)
        console.log(startDate)


        const resp: Swab[] = await this.swabFilterRepository.filter(filterSwabs, payload)

        const mapperRes = SwabResponseMapper.toResponseList(resp)
        return mapperRes
    }
}
export default FilterSwab