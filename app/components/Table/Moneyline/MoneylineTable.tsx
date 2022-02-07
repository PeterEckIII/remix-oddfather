import { useMemo } from "react";
import { Column, useTable } from "react-table";
import Table from "../Table";

type MoneylineTableProps = {
  homeOpen: number;
  homeClose: number;
  awayOpen: number;
  awayClose: number;
  homeTeamName: string;
  awayTeamName: string;
};

const MoneylineTable = ({
  homeOpen,
  homeClose,
  awayOpen,
  awayClose,
  homeTeamName,
  awayTeamName,
}: MoneylineTableProps) => {
  const columns: Column[] = useMemo(
    () => [
      {
        Header: `${homeTeamName}`,
        columns: [
          {
            Header: "Open",
            accessor: "homeOpen",
          },
          {
            Header: "Close",
            accessor: "homeClose",
          },
        ],
      },
      {
        Header: "",
        accessor: "valueName",
      },
      {
        Header: `${awayTeamName}`,
        columns: [
          {
            Header: "Open",
            accessor: "awayOpen",
          },
          {
            Header: "Close",
            accessor: "awayClose",
          },
        ],
      },
    ],
    [homeOpen, homeClose, awayOpen, awayClose]
  );
  const data: any[] = useMemo(
    () => [
      {
        homeOpen: homeOpen || "-",
        homeClose: homeClose || "-",
        valueName: "Moneyline",
        awayOpen: awayOpen || "-",
        awayClose: awayClose || "-",
      },
    ],
    [homeTeamName, awayTeamName]
  );
  const table = useTable({ columns, data });

  return (
    <Table
      getTableProps={table.getTableProps}
      getTableBodyProps={table.getTableBodyProps}
      headerGroups={table.headerGroups}
      rows={table.rows}
      prepareRow={table.prepareRow}
      tableName="Moneyline"
    />
  );
};

export default MoneylineTable;
