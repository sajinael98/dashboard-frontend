import React from "react";
import { Row, flexRender } from "@tanstack/react-table";
import { Checkbox, Flex, Stack, Text, ThemeIcon } from "@mantine/core";
import { IconDatabase } from "@tabler/icons-react";

export interface TableBodyProps {
  rows: Row<any>[];
}

const TableBody = ({ rows }: TableBodyProps) => {
  return (
    <tbody>

      {rows.map((row) => (
        <tr key={row.id}>
          <td>

            <Checkbox />

          </td>
          {row.getVisibleCells().map((cell) => (
            <>

              <td key={cell.id}>
                {flexRender(cell.column.columnDef.cell, cell.getContext())}
              </td></>
          ))}
        </tr>
      ))}
      {rows.length == 0 && (
        <tr>
          <td colSpan={3}>
            <Flex w="100%" h={400} justify="center" align="center">
              <Stack align="center">
                <ThemeIcon size="xl" variant="light">
                  <IconDatabase />
                </ThemeIcon>
                <Text fw={700}>No Data</Text>
              </Stack>
            </Flex>
          </td>
        </tr>
      )}
    </tbody>
  );
};

export default TableBody;
