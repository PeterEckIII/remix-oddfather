import { useMemo } from "react";
import { Column, useTable } from "react-table";
import Table from "../Table";

type OverUnderDataProps = {
  totalOpen: number;
  totalClose: number;
  overPayoutOpen: number;
  overPayoutClose: number;
  underPayoutOpen: number;
  underPayoutClose: number;
};

type OverUnderTableProps = {
  overUnderData: OverUnderDataProps;
  tableName: string;
};

const OverUnderTable = ({ overUnderData, tableName }: OverUnderTableProps) => {
  const {
    totalOpen,
    totalClose,
    overPayoutOpen,
    overPayoutClose,
    underPayoutOpen,
    underPayoutClose,
  } = overUnderData;
  const columns: Column[] = useMemo(
    () => [
      {
        Header: "Open",
        accessor: "open",
      },
      {
        Header: "",
        accessor: "valueName",
      },
      {
        Header: "Close",
        accessor: "close",
      },
    ],
    []
  );
  const data: any[] = useMemo(
    () => [
      {
        open: totalOpen || "-",
        valueName: "Over/Under",
        close: totalClose || "-",
      },
      {
        open: overPayoutOpen || "-",
        valueName: "Over Payout",
        close: overPayoutClose || "-",
      },
      {
        open: underPayoutOpen || "-",
        valueName: "Under Payout",
        close: underPayoutClose || "-",
      },
    ],
    [
      totalOpen,
      totalClose,
      overPayoutOpen,
      overPayoutClose,
      underPayoutOpen,
      underPayoutClose,
    ]
  );

  const table = useTable({ columns, data });

  return (
    <Table
      getTableProps={table.getTableProps}
      getTableBodyProps={table.getTableBodyProps}
      headerGroups={table.headerGroups}
      rows={table.rows}
      prepareRow={table.prepareRow}
      tableName="Over Under"
    />
  );
};

export default OverUnderTable;
