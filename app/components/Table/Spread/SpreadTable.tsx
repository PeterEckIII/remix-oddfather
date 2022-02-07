import { useMemo } from 'react';
import { Column, useTable } from 'react-table';
import Table from '../Table';

type TeamInfoProps = {
  homeTeamName: string;
  awayTeamName: string;
};

type SpreadDataProps = {
  homeOpen: number;
  homeClose: number;
  awayOpen: number;
  awayClose: number;
  homeOpenPayout: number;
  homeClosePayout: number;
  awayOpenPayout: number;
  awayClosePayout: number;
};

type SpreadTableProps = {
  teamInfo: TeamInfoProps;
  spreadData: SpreadDataProps;
  tableName: string;
};

const SpreadTable = ({ teamInfo, spreadData, tableName }: SpreadTableProps) => {
  const { homeTeamName, awayTeamName } = teamInfo;
  const {
    homeOpen,
    homeClose,
    awayOpen,
    awayClose,
    homeOpenPayout,
    homeClosePayout,
    awayOpenPayout,
    awayClosePayout,
  } = spreadData;
  const columns: Column[] = useMemo(
    () => [
      {
        Header: `${homeTeamName}`,
        columns: [
          {
            Header: 'Open',
            accessor: 'homeOpen',
          },
          {
            Header: 'Close',
            accessor: 'homeClose',
          },
        ],
      },
      {
        Header: '',
        accessor: 'valueName',
      },
      {
        Header: `${awayTeamName}`,
        columns: [
          {
            Header: 'Open',
            accessor: 'awayOpen',
          },
          {
            Header: 'Close',
            accessor: 'awayClose',
          },
        ],
      },
    ],
    []
  );
  const data: any[] = useMemo(
    () => [
      {
        homeOpen: homeOpen || '-',
        homeClose: homeClose || '-',
        valueName: 'Runline',
        awayOpen: awayOpen || '-',
        awayClose: awayClose || '-',
      },
      {
        homeOpen: homeOpenPayout || '-',
        homeClose: homeClosePayout || '-',
        valueName: 'Runline Payout',
        awayOpen: awayOpenPayout || '-',
        awayClose: awayClosePayout || '-',
      },
    ],
    [
      homeOpen,
      homeClose,
      awayOpen,
      awayClose,
      homeOpenPayout,
      homeClosePayout,
      awayOpenPayout,
      awayClosePayout,
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
      tableName='Spread'
    />
  );
};

export default SpreadTable;
