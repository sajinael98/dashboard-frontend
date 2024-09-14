import React from "react";
import { Table as MantineTable, Pagination } from "@mantine/core";
import TableHeader from "./TableHeader";
import TableBody from "./TableBody";
import { HeaderGroup, Row } from "@tanstack/react-table";

interface TableProps {
  headerGroups: HeaderGroup<any>[];
  rows: Row<any>[];
  total: number;
  page: number;
  setPage: ((page: number) => void) | undefined;
}

const Table = ({ headerGroups, rows, total, page, setPage }: TableProps) => {
  return (
    <>
      <MantineTable striped highlightOnHover withBorder withColumnBorders>
        <TableHeader headerGroups={headerGroups} />
        <TableBody rows={rows} />
      </MantineTable>
      <Pagination
        mt="md"
        position="right"
        total={total || 1}
        page={page}
        onChange={setPage}
      />
    </>
  );
};

export default Table;
