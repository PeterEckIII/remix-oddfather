import { TableProps, HeaderGroup, TableBodyProps, Row } from "react-table";
import styles from "./styles.css";
import { LinksFunction } from "remix";

export const links: LinksFunction = () => [{ rel: "stylesheet", href: styles }];

type NewTableProps = {
  getTableProps: (props?: TableProps) => TableProps;
  headerGroups: HeaderGroup[];
  getTableBodyProps: (props?: TableBodyProps) => TableBodyProps;
  rows: Row[];
  prepareRow: (row: Row) => void;
  tableName: string;
};

const Table = ({
  getTableProps,
  headerGroups,
  getTableBodyProps,
  rows,
  prepareRow,
  tableName,
}: NewTableProps) => (
  <div>
    <h1 className="table-name">{tableName}</h1>
    <div className="table-container">
      <table className="table" {...getTableProps()}>
        <thead className="table-head">
          {headerGroups.map((headerGroup: HeaderGroup) => (
            <tr
              className="table-header-row"
              {...headerGroup.getHeaderGroupProps()}
            >
              {headerGroup.headers.map((column) => (
                <th className="table-header-cell" {...column.getHeaderProps()}>
                  {column.render("Header")}
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody className="table-body" {...getTableBodyProps()}>
          {rows.map((row) => {
            prepareRow(row);
            return (
              <tr className="table-body-row" {...row.getRowProps()}>
                {row.cells.map((cell) => {
                  return (
                    <td className="table-data" {...cell.getCellProps()}>
                      {cell.render("Cell")}
                    </td>
                  );
                })}
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  </div>
);

export default Table;
