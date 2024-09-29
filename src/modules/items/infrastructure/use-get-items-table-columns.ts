import { ColumnDef } from "@tanstack/react-table";
import { useMemo } from "react";
import { ItemResponse } from "../types";

export function useGetItemsTableColumns() {
    return useMemo<ColumnDef<ItemResponse>[]>(() => [
        {
            accessorKey: "title",
            header: "Title"
        },
        {
            accessorKey: "category",
            header: "Category"
        }
    ], [])
}