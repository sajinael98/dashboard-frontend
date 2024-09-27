import { ColumnDef } from "@tanstack/react-table"
import { useMemo } from "react"
import { CategoryResponse } from "../types"
import { Checkbox } from "@mantine/core"

export function useGetCategoryColumns() {
    return useMemo<ColumnDef<CategoryResponse>[]>(() => [
        {
            accessorKey: "title",
            header: "Title",
            
        },
        {
            accessorKey: "enabled",
            header: "Enabled",
            cell({ getValue }) {
                return <Checkbox size='xs' disabled checked={getValue() as boolean} />
            },
        },
    ], [])
}