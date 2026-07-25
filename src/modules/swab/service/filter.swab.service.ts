import { MyJwtPayload } from "../../../shared/auth/types/auth.types"
import { FilterSwabsQueryType } from "../dto/schemas/filter.swabs.query.schema"
import { DateFilter } from "../dto/types/filter/date.filter"
import { RepositoryResponse } from "../dto/types/filter/respository.response"
import { MetaSwabFilter, SwabFilterResponse } from "../dto/types/filter/swab.filter.response"
import { SwabResponseDTO } from "../dto/types/filter/swab.filter.response.dto"
import { SwabResponseMapper } from "../mapper/swab.filter.response.mapper"
import SwabFilterRepository from "../repository/filter.swab.repository"
import { addDays, subDays, startOfDay } from "date-fns";
import SwabRepository from "../repository/swab.repository"

class FilterSwab {
    constructor(
        private swabFilterRepository: SwabFilterRepository,
    ) { }

    execute = async (payload: MyJwtPayload, filterSwabs: FilterSwabsQueryType): Promise<SwabFilterResponse> => {
        const { startDate, endDate }: DateFilter = this.validateDate(filterSwabs.startDate, filterSwabs.endDate)

        filterSwabs.startDate = startDate,
            filterSwabs.endDate = endDate

        const page = filterSwabs.page ? filterSwabs.page : 1
        const limit = filterSwabs.limit ? filterSwabs.limit : 10

        filterSwabs.page = page
        filterSwabs.limit = limit


        const resp: RepositoryResponse = await this.swabFilterRepository.filter(filterSwabs, payload)

        const mapperRes: SwabResponseDTO[] = SwabResponseMapper.toResponseList(resp.swabs)
      
        const meta: MetaSwabFilter = {
            limit: filterSwabs.limit,
            page: filterSwabs.page,
            total: resp.total,
            totalPages: Math.ceil((resp.total / filterSwabs.limit))
        }

        return {
            data: mapperRes,
            meta: meta
        } as SwabFilterResponse
    }


    validateDate = (startDate?: Date, endDate?: Date): DateFilter => {
        let startDateDefault = subDays(
            startOfDay(new Date()),
            30
        )

        let endDateDefault = addDays(
            startOfDay(new Date()),
            1
        )
        if (startDate) {
            startDate = startOfDay(
                new Date(startDate)
            )
        } else {
            startDate = startDateDefault
        }
        if (endDate) {
            endDate = addDays(
                startOfDay(
                    new Date(endDate)
                ),
                1
            )
        } else {
            endDate = endDateDefault
        }

        return {
            startDate,
            endDate
        } as DateFilter

    }

}
export default FilterSwab